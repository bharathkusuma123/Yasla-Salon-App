import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const SalonServices = ({ route, navigation }) => {
  const { salonId, salonName, city, SalonPhoneNumber, SalonLatitude, SalonLongitude, salonStatus  } = route.params;
  const { customer, logout  } = useAuth();
  const customerId = customer?.data?.customer_id;
  const [activeTab, setActiveTab] = useState('Male');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [markedDates, setMarkedDates] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const phoneNumber = SalonPhoneNumber;

  // Base URL for constructing full image URLs
  const BASE_URL = 'https://yaslaservice.com:81';

  // Use the same time slots as in CScreen1.js
  const timeSlotsFromCScreen1 = [
    "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Check if salon is offline - don't fetch data if offline
        if (salonStatus === "Offline") {
          console.log('Salon is offline, skipping data fetch');
          setServicesData([]);
          setCategories([]);
          setStylists([]);
          setLoading(false);
          return;
        }


        // Fetch services for the salon and gender
        const servicesResponse = await axios.get(
          `https://yaslaservice.com:81/salon/${salonId}/services/${activeTab.toLowerCase()}/`
        );

        // Process services data
        const services = servicesResponse.data || [];
        setServicesData(services);

        // Extract unique categories
        const uniqueCategories = [...new Set(services.map(service => service.category_name))];
        setCategories(uniqueCategories.map((category, index) => ({
          id: index + 1,
          name: category || 'Other Services'
        })));

        // Select the first category by default
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0] || 'Other Services');
        }

        // Fetch stylists for this salon
        // const usersResponse = await axios.get('https://yaslaservice.com:81/users/');
        // const allUsers = usersResponse.data.data || [];

        // const salonStylists = allUsers.filter(user =>
        //   user.user_role === 'Stylist' && user.salon == salonId
        // ).map(stylist => ({
        //   id: stylist.id,
        //   name: stylist.full_name,
        //   specialty: stylist.user_role,
        //   rating: '4.5',
        //   profile_image: stylist.profile_image ? `${BASE_URL}${stylist.profile_image}` : null
        // }));
// Fetch stylists for this salon
const usersResponse = await axios.get('https://yaslaservice.com:81/users/');
const allUsers = usersResponse.data.data || [];

// UPDATED: Include both 'Stylist' and 'Stylist/Admin' roles
const salonStylists = allUsers.filter(user =>
  (user.user_role === 'Stylist' || user.user_role === 'Stylist/Admin') && user.salon == salonId && 
  user.status === 'Active'
).map(stylist => ({
  id: stylist.id,
  name: stylist.full_name,
  specialty: stylist.user_role,
  rating: '4.5',
  profile_image: stylist.profile_image ? `${BASE_URL}${stylist.profile_image}` : null
}));

console.log('👨‍💼 Stylists found:', {
  total: salonStylists.length,
  byRole: salonStylists.reduce((acc, stylist) => {
    acc[stylist.specialty] = (acc[stylist.specialty] || 0) + 1;
    return acc;
  }, {})
});


        setStylists(salonStylists);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
        Alert.alert("Error", "Failed to load data from server.");
      }
    };
      // Only fetch if salon is online
    if (salonStatus !== "Offline") {
      fetchData();
    }

    fetchData();
  },  [salonId, activeTab, salonStatus]);

useEffect(() => {
  const fetchAvailableSlots = async () => {
    if (!selectedStylist || !selectedDate) {
      console.log("⏳ Skipping fetch: stylist or date not selected");
      return;
    }

    console.log("🔍 Fetching slots for stylist:", selectedStylist.id, "on date:", selectedDate);

    setLoadingSlots(true);
    setSelectedTime(null);

    try {
      // Use the time slots from CScreen1.js
      console.log("📌 Time slots from CScreen1:", timeSlotsFromCScreen1);
      setTimeSlots(timeSlotsFromCScreen1);

      // Fetch booked appointments for this stylist on selected date
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/stylist/${selectedStylist.id}/?start_date=${selectedDate}`
      );

      console.log("📥 API raw response:", response.data);

      // ✅ Filter out Cancelled (and optionally Declined) appointments
      const validAppointments = (response.data || []).filter(
        appt => appt.status !== "Cancelled" 
      );

      console.log("✅ Valid appointments (not Cancelled/Declined):", JSON.stringify(validAppointments, null, 2));

      // Process booked appointments
      const unavailableSlots = processBookedSlots(validAppointments);
      console.log("⛔ Unavailable slots:", unavailableSlots);

      // Filter out unavailable slots
      const available = timeSlotsFromCScreen1.filter(
        slot => !unavailableSlots.includes(slot)
      );
      console.log("✅ Available slots after filtering:", available);

      setAvailableSlots(available);
    } catch (error) {
      console.error("❌ Error fetching time slots:", error);
      Alert.alert("Error", "Failed to load available time slots");
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
      console.log("✅ Finished fetching slots");
    }
  };

  fetchAvailableSlots();
}, [selectedStylist, selectedDate]);

  const processBookedSlots = (appointments) => {
    const bookedSlots = [];
    
    appointments.forEach(appointment => {
      const startTime = new Date(appointment.start_datetime);
      const endTime = new Date(appointment.end_datetime);
      
      // Convert to 12-hour format with AM/PM
      let currentTime = new Date(startTime);
      
      while (currentTime < endTime) {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const timeStr = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        
        bookedSlots.push(timeStr);
        currentTime = new Date(currentTime.getTime() + 30 * 60000); // Add 30 minutes
      }
    });
    
    return bookedSlots;
  };

  // Check if salon is offline - show message if offline
useEffect(() => {
  if (salonStatus === "Offline") {
    Alert.alert(
      "Salon Offline",
      "This salon is currently offline. Please choose another salon.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack()
        }
      ]
    );
  }
}, [salonStatus]);

  // Function to check if a time slot is in the past (same logic as CScreen1.js)
  const isTimeSlotInPast = (timeSlot) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate);
    selectedDay.setHours(0, 0, 0, 0);

    // If the selected date is today
    if (selectedDay.getTime() === today.getTime()) {
      const [time, modifier] = timeSlot.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      // Convert to 24-hour format
      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      // Create a Date object for the time slot
      const slotTime = new Date(now);
      slotTime.setHours(hours, minutes, 0, 0);

      // Add 9 minutes grace period (same as CScreen1.js)
      const slotAvailableUntil = new Date(slotTime.getTime() + 9 * 60 * 1000);

      // Disable only if current time is beyond the grace window
      return now > slotAvailableUntil;
    }

    // If the selected date is before today, disable
    return selectedDay < today;
  };

  const groupServicesByCategory = () => {
    return servicesData.reduce((acc, service) => {
      const category = service.category_name || 'Other Services';
      if (!acc[category]) {
        acc[category] = [];
      }

      const [hours, minutes] = service.completion_time.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      acc[category].push({
        id: service.id,
        service: service.service,
        name: service.service_name,
        duration: `${totalMinutes} mins`,
        price: `₹${service.cost}`,
        category: category
      });
      return acc;
    }, {});
  };

  const servicesByCategory = groupServicesByCategory();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMarkedDates({
      [today]: { selected: true, selectedColor: '#2F4EAA' }
    });
  }, []);

  useEffect(() => {
    setSelectedServices([]);
    setSelectedStylist(null);
    setSelectedTime(null);
    setSelectedCategory(null);
  }, [activeTab]);

  const makeCall = () => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Calling not supported on this device');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: { selected: true, selectedColor: '#2F4EAA' }
    });
    setShowCalendar(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === service.id);
      let updatedServices;

      if (isSelected) {
        updatedServices = prev.filter(s => s.id !== service.id);
      } else {
        updatedServices = [...prev, service];
      }

      return updatedServices;
    });
  };

  const isServiceSelected = (service) => {
    return selectedServices.some(s => s.id === service.id);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
  };

  const calculateTotals = () => {
    return selectedServices.reduce((totals, service) => {
      const durationMatch = service.duration.match(/(\d+)/);
      const priceMatch = service.price.match(/(\d+)/);

      const duration = durationMatch ? parseInt(durationMatch[0]) : 0;
      const price = priceMatch ? parseInt(priceMatch[0]) : 0;

      return {
        totalDuration: totals.totalDuration + duration,
        totalPrice: totals.totalPrice + price
      };
    }, { totalDuration: 0, totalPrice: 0 });
  };

  const { totalDuration, totalPrice } = calculateTotals();

  const convertToISOString = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const date = new Date(selectedDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
  };


    // ADDED: Guest authentication handler
  const handleGuestAction = (action) => {
    if (customer?.isGuest) {
      Alert.alert(
        "Login Required",
        "Please register or login to continue.",
        [
          { text: "Cancel", style: "cancel" },
         
          { 
            text: "Login", 
            onPress: async () => {
              // Logout guest first, then navigate to Login
              await logout();
              navigation.navigate('Login');
            }
          },
        ]
      );
      return true;
    }
    return false;
  };

  const handleReviewBooking = () => {
        if (handleGuestAction('review appointment')) return;

    if (selectedServices.length === 0) {
      Alert.alert("Error", "Please select at least one service");
      return;
    }
    if (!selectedTime) {
      Alert.alert("Error", "Please select a time slot");
      return;
    }
    if (!selectedStylist) {
      Alert.alert("Error", "Please select a stylist");
      return;
    }

    // Navigate to confirmation screen with all booking details
    navigation.navigate('ReviewAppointment2', {
      salonId,
      salonName,
      city,
      customerId,
      selectedServices,
      selectedDate,
      selectedStylist,
      selectedTime,
      totalDuration,
      totalPrice
    });
  };

  const formatTime = (time) => {
    return time.replace(/\s([AP]M)$/, '$1');
  };

  // Function to render stylist image or default icon
  const renderStylistImage = (stylist) => {
    if (stylist.profile_image) {
      return (
        <Image
          source={{ uri: stylist.profile_image }}
          style={styles.stylistImage}
          onError={(e) => {
            console.log(`Failed to load image for ${stylist.name}:`, e.nativeEvent.error);
            console.log('Image URL:', stylist.profile_image);
          }}
        />
      );
    } else {
      return (
        <View style={styles.defaultIconContainer}>
          <FontAwesome name="user" size={30} color="#666" />
        </View>
      );
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Error loading data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Salon Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.salonName}>{salonName}</Text>
          <Text style={styles.salonLocation}>{city}</Text>
        </View>
        <View style={styles.headerIconsContainer}>
          <TouchableOpacity
            onPress={() => {
              const lat = 28.6139;
              const lng = 77.2090;
              const url = `https://www.google.com/maps/search/?api=1&query=${SalonLatitude},${SalonLongitude}`;
              Linking.openURL(url).catch(err => Alert.alert("Error", "Could not open maps"));
            }}
            style={styles.iconButton}
          >
            <FontAwesome name="map-marker" size={24} color="#ff0000ff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const url = `https://wa.me/${phoneNumber}`;
              Linking.openURL(url).catch(err => Alert.alert("Error", "WhatsApp is not installed"));
            }}
            style={styles.iconButton}
          >
            <FontAwesome name="whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>

          <TouchableOpacity onPress={makeCall} style={styles.iconButton}>
            <FontAwesome name="phone" size={24} color="#000000ff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Gender Tabs */}
      <View style={styles.tabsWrapper}>
        <FlatList
          horizontal
          data={['Male', 'Female']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === item && styles.activeTab
              ]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[
                styles.tabText,
                activeTab === item && styles.activeTabText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.tabContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Service Category Tabs */}
      <View style={styles.tabsWrapper}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                selectedCategory === item.name && styles.activeCategoryTab
              ]}
              onPress={() => setSelectedCategory(item.name)}
            >
              <Text style={[
                styles.categoryTabText,
                selectedCategory === item.name && styles.activeCategoryTabText
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.tabContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Services List */}
      <ScrollView>
        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (
          <View style={styles.selectedServicesSummary}>
            <Text style={styles.summaryTitle}>Your Selected Services</Text>
            {selectedServices.map(service => (
              <View key={service.id} style={styles.selectedServiceItem}>
                <FontAwesome
                  name="check-circle"
                  size={16}
                  color="#4CAF50"
                  style={styles.serviceCheckIcon}
                />
                <View style={styles.serviceDetails}>
                  <Text style={styles.selectedServiceName}>{service.name}</Text>
                  <Text style={styles.selectedServiceDetails}>
                    {service.duration} • {service.price}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleServiceSelect(service)}
                  style={styles.removeServiceBtn}
                >
                  <FontAwesome name="times" size={16} color="#2F4EAA" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.totalsContainer}>
              <Text style={styles.totalText}>Total: ~{totalDuration} mins • ₹{totalPrice}</Text>
            </View>
          </View>
        )}

        {/* Services for Selected Category */}
        {selectedCategory && servicesByCategory[selectedCategory] && (
          <View style={styles.servicesContainer}>
            {servicesByCategory[selectedCategory].map(service => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  isServiceSelected(service) && styles.selectedServiceCard
                ]}
                onPress={() => handleServiceSelect(service)}
              >
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.serviceMeta}>
                    <Text style={styles.serviceDuration}>{service.duration}</Text>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                  </View>
                </View>
                <FontAwesome
                  name={isServiceSelected(service) ? 'check-circle' : 'plus-circle'}
                  size={20}
                  color={isServiceSelected(service) ? "#4CAF50" : "#2F4EAA"}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Booking Section */}
        {selectedServices.length > 0 && (
          <View style={styles.bookingSection}>
            {/* Date Selection */}
            <Text style={styles.sectionTitle}>Select Date</Text>
            <TouchableOpacity
              style={styles.dateSelector}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <FontAwesome name="calendar" size={20} color="#2F4EAA" />
              <Text style={styles.dateText}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </TouchableOpacity>

            {showCalendar && (
              <View style={styles.calendarContainer}>
                <Calendar
                  current={selectedDate}
                  minDate={new Date().toISOString().split('T')[0]}
                  onDayPress={handleDateSelect}
                  markedDates={markedDates}
                  theme={{
                    selectedDayBackgroundColor: '#2F4EAA',
                    todayTextColor: '#2F4EAA',
                    arrowColor: '#2F4EAA',
                  }}
                />
              </View>
            )}

            {/* Stylist Selection */}
            <Text style={styles.sectionTitle}>Preferred Stylist</Text>
            <FlatList
              horizontal
              data={stylists}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: stylist }) => (
                <TouchableOpacity
                  style={[
                    styles.stylistCard,
                    selectedStylist?.id === stylist.id && styles.selectedStylistCard
                  ]}
                  onPress={() => handleStylistSelect(stylist)}
                >
                  {renderStylistImage(stylist)}
                  <Text style={styles.stylistName}>{stylist.name}</Text>
                  <Text style={styles.stylistSpecialty}>{stylist.specialty}</Text>
                  <Text style={styles.stylistRating}>★ {stylist.rating}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.stylistContainer}
              showsHorizontalScrollIndicator={false}
            />

            {/* Time Slots */}
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            {loadingSlots ? (
              <ActivityIndicator size="small" color="#2F4EAA" />
            ) : (
              <View style={styles.timeSlotsGrid}>
                {timeSlotsFromCScreen1.map((time, index) => {
                  const isPastTime = isTimeSlotInPast(time);
                  const isBooked = !availableSlots.includes(time);
                  const isDisabled = isPastTime || isBooked;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeSlot,
                        selectedTime === time && styles.selectedTimeSlot,
                        isDisabled && styles.unavailableTimeSlot
                      ]}
                      onPress={() => !isDisabled && handleTimeSelect(time)}
                      disabled={isDisabled}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        selectedTime === time && styles.selectedTimeSlotText,
                        isDisabled && { color: '#bbb' }
                      ]}>
                        {formatTime(time)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* Review Booking Button */}
            {selectedTime && (
              <TouchableOpacity
                style={styles.bookButton}
                onPress={handleReviewBooking}
              >
                <Text style={styles.bookButtonText}>
                  Review Booking
                </Text>
                <Text style={styles.bookButtonSubtext}>
                  {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecf0ff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTextContainer: {
    flex: 1,
  },
  salonName: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  salonLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Inter_400Regular', 
  },
  headerIconsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    marginLeft: 15,
  },
  tabsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabContainer: {
    paddingHorizontal: 15,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2F4EAA',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  activeTabText: {
    color: '#2F4EAA',
    fontFamily: 'Inter_600SemiBold',
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryTab: {
    backgroundColor: '#2F4EAA',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_500Medium',
  },
  activeCategoryTabText: {
    color: '#fff',
  },
  selectedServicesSummary: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    margin: 15,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
    color: '#333',
  },
  selectedServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontFamily: 'Inter_600SemiBold',
  },
  serviceCheckIcon: {
    marginRight: 10,
  },
  serviceDetails: {
    flex: 1,
  },
  selectedServiceName: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
  },
  selectedServiceDetails: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  removeServiceBtn: {
    padding: 5,
  },
  totalsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  servicesContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginVertical: 15,
    marginHorizontal: 15,
    color: '#333',
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  selectedServiceCard: {
    backgroundColor: '#f0f7ff',
    borderWidth: 1,
    borderColor: '#d0e3ff',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Inter_500Medium', 
  },
  serviceMeta: {
    flexDirection: 'row',
  },
  serviceDuration: {
    fontSize: 12,
    color: '#666',
    marginRight: 15,
    fontFamily: 'Inter_400Regular', 
  },
  servicePrice: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_400Regular', 
  },
  bookingSection: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_500Medium',
  },
  calendarContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  stylistContainer: {
    paddingVertical: 10,
  },
  stylistCard: {
    width: 120,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  selectedStylistCard: {
    backgroundColor: '#f0f7ff',
    borderWidth: 1,
    borderColor: '#d0e3ff',
  },
  stylistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  defaultIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stylistName: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  stylistSpecialty: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular', 
  },
  stylistRating: {
    fontSize: 10,
    color: '#2F4EAA',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Inter_500Medium',
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeSlot: {
    width: '30%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  timeSlotText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_500Medium',
  },
  selectedTimeSlot: {
    backgroundColor: '#2F4EAA',
    borderColor: '#2F4EAA',
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold', 
  },
  unavailableTimeSlot: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  bookedText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  pastTimeText: {
    color: '#999',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold', 
  },
  bookButton: {
    backgroundColor: '#2F4EAA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  bookButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
});

export default SalonServices;