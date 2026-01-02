import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const SalonServices = ({ route, navigation }) => {
  const { salonId, salonName, city, SalonPhoneNumber } = route.params;
  const { customer } = useAuth();
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

  console.log("Salon phoneNumber:", phoneNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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
        const usersResponse = await axios.get('https://yaslaservice.com:81/users/');
        const allUsers = usersResponse.data.data || [];

        const salonStylists = allUsers.filter(user =>
          user.user_role === 'Stylist' && user.salon == salonId
        ).map(stylist => ({
          id: stylist.id,
          name: stylist.full_name,
          specialty: stylist.user_role,
          rating: '4.5'
        }));

        setStylists(salonStylists);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
        Alert.alert("Error", "Failed to load data from server.");
      }
    };

    fetchData();
  }, [salonId, activeTab]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedStylist || !selectedDate) return;
      
      setLoadingSlots(true);
      setSelectedTime(null);
      
      try {
        // Generate all possible time slots
        const allSlots = generateTimeSlots();
        setTimeSlots(allSlots);

        // Fetch booked appointments for this stylist on selected date
        const response = await axios.get(
          `https://yaslaservice.com:81/appointments/stylist/${selectedStylist.id}/?start_date=${selectedDate}`
        );
        
        // Process booked appointments to get unavailable time slots
        const bookedSlots = response.data || [];
        const unavailableSlots = processBookedSlots(bookedSlots);
        
        // Filter out unavailable slots from all slots
        const available = allSlots.filter(slot => !unavailableSlots.includes(slot));
        setAvailableSlots(available);
      } catch (error) {
        console.error('Error fetching time slots:', error);
        Alert.alert("Error", "Failed to load available time slots");
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedStylist, selectedDate]);

 const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 7; hour < 19; hour++) {
    const displayHour = hour % 12 === 0 ? 12 : hour % 12; // convert 13 → 1, 0 → 12
    const ampm = hour < 12 ? 'AM' : 'PM';

    slots.push(`${displayHour.toString().padStart(2, '0')}:00 ${ampm}`);
    slots.push(`${displayHour.toString().padStart(2, '0')}:30 ${ampm}`);
  }
  return slots;
};

console.log(generateTimeSlots());


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
      [today]: { selected: true, selectedColor: '#FF6B6B' }
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
      [day.dateString]: { selected: true, selectedColor: '#FF6B6B' }
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

  const handleBookAppointment = async () => {
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

    setLoading(true);

    try {
      const startDateTimeISO = convertToISOString(selectedTime);

      const validServices = servicesData.map(s => s.service);
      const appointmentServices = selectedServices
        .filter(s => validServices.includes(s.service))
        .map(s => ({ service: s.service }));

      const payload = {
        salon: salonId,
        stylist: selectedStylist.id,
        customer: customerId,
        start_datetime: startDateTimeISO,
        status: "Pending",
        payment_status: "Unpaid",
        payment_mode: "Card",
        customer_message: "Please don't delay the appointment.",
        staff_notes: "Customer prefers quiet service.",
        appointment_services: appointmentServices
      };

      const response = await axios.post(
        "https://yaslaservice.com:81/appointments/",
        payload
      );

      setLoading(false);
       // Reset all selections
    setSelectedServices([]);
    setSelectedStylist(null);
    setSelectedTime(null);
    setSelectedDate(new Date().toISOString().split('T')[0]); // Reset to today
    
    Alert.alert(
      "Booking Successful",
      `Your appointment has been booked!`,
      [{ 
        text: "OK", 
        onPress: () => navigation.navigate("BookingsStack") 
      }]
    );
    } catch (error) {
      setLoading(false);
      console.error("Appointment post error:", error);

      if (error.response) {
        Alert.alert(
          "Error",
          `Failed to book appointment.\nServer responded with: ${JSON.stringify(error.response.data)}`
        );
      } else if (error.request) {
        Alert.alert("Error", "No response from server. Check your network.");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  const formatTime = (time) => {
    return time.replace(/\s([AP]M)$/, '$1');
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
              const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
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
                  <FontAwesome name="times" size={16} color="#FF6B6B" />
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
                  color={isServiceSelected(service) ? "#4CAF50" : "#FF6B6B"}
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
              <FontAwesome name="calendar" size={20} color="#FF6B6B" />
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
                    selectedDayBackgroundColor: '#FF6B6B',
                    todayTextColor: '#FF6B6B',
                    arrowColor: '#FF6B6B',
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
                  <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/women/' + stylist.id + '.jpg' }}
                    style={styles.stylistImage}
                  />
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
              <ActivityIndicator size="small" color="#FF6B6B" />
            ) : (
              <View style={styles.timeSlotsGrid}>
                {timeSlots.map((time, index) => (
                <TouchableOpacity
  key={index}
  style={[
    styles.timeSlot,
    selectedTime === time && styles.selectedTimeSlot,
    !availableSlots.includes(time) && styles.unavailableTimeSlot
  ]}
  onPress={() => availableSlots.includes(time) && handleTimeSelect(time)}
  disabled={!availableSlots.includes(time)}
>
  {availableSlots.includes(time) ? (
    <Text style={[
      styles.timeSlotText,
      selectedTime === time && styles.selectedTimeSlotText
    ]}>
      {formatTime(time)}
    </Text>
  ) : (
    <Text style={styles.bookedText}>Booked</Text>
  )}
</TouchableOpacity>
                ))}
              </View>
            )}

            {/* Book Button */}
            {selectedTime && (
              <TouchableOpacity
                style={styles.bookButton}
                onPress={handleBookAppointment}
              >
                <Text style={styles.bookButtonText}>
                  {selectedStylist
                    ? `Book with ${selectedStylist.name} at ${formatTime(selectedTime)}`
                    : `Book at ${formatTime(selectedTime)}`
                  }
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
    backgroundColor: '#fff',
  },
  bookedText: {
  color: 'red',
  fontSize: 12,
  fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#333',
  },
  salonLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  headerIconsContainer: {
    flexDirection: 'row',
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
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryTab: {
    backgroundColor: '#FF6B6B',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  selectedServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceCheckIcon: {
    marginRight: 10,
  },
  serviceDetails: {
    flex: 1,
  },
  selectedServiceName: {
    fontSize: 14,
    color: '#333',
  },
  selectedServiceDetails: {
    fontSize: 12,
    color: '#666',
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
    fontWeight: 'bold',
    color: '#333',
  },
  servicesContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  serviceMeta: {
    flexDirection: 'row',
  },
  serviceDuration: {
    fontSize: 12,
    color: '#666',
    marginRight: 15,
  },
  servicePrice: {
    fontSize: 12,
    color: '#666',
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
  stylistName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  stylistSpecialty: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  stylistRating: {
    fontSize: 10,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 5,
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
    height: 40, // Added fixed height for consistency
  },
  timeSlotText: {
    fontSize: 12,
    color: '#333',
  },
  selectedTimeSlot: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  unavailableTimeSlot: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  bookedText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeSlotText: {
    fontSize: 12,
    color: '#333',
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  unavailableTimeSlotText: {
    color: '#aaa',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default SalonServices;