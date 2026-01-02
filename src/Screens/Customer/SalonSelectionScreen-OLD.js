// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, ScrollView
// } from 'react-native';
// import axios from 'axios';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Calendar } from 'react-native-calendars';
// import styles from './SalonSelection.styles';
// import { useAuth } from '../../Context/AuthContext';
// import { useNavigation } from '@react-navigation/native';
// import AvailabilityModal from './AvailabilityModal';
// import { Ionicons } from '@expo/vector-icons';
// import FilterTabs from './FilterTabs';

// // Random salon images
// const salonImages = [
//   'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500',
//   'https://images.unsplash.com/photo-1519664824562-b4bc73f9795a?w=500',
//   'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
//   'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500',
//   'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500'
// ];

// // Random stylist images
// const stylistImages = [
//   'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500',
//   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
//   'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500',
//   'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500',
//   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500'
// ];

// const timeSlots = [
//   "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
//   "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
//   "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
//   "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
// ];

// const SalonSelectionScreen = ({ route }) => {
//   const [salons, setSalons] = useState([]);
//   const [stylists, setStylists] = useState([]);
//   const [selectedSalon, setSelectedSalon] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedStylist, setSelectedStylist] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [markedDates, setMarkedDates] = useState({});
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('nearby');
//   const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
//   const [availabilityFilter, setAvailabilityFilter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [bookedSlots, setBookedSlots] = useState({});
//   const [loadingSlots, setLoadingSlots] = useState(false);

//   const { customer } = useAuth();
//   const customerId = customer?.data?.customer_id;
//   const { selectedServices } = route.params;
//   const navigation = useNavigation();

//  // Convert local time (what user selects) to UTC for the API
// const localTimeToUTC = (dateStr, time12h) => {
//   const [time, period] = time12h.split(' ');
//   let [hours, minutes] = time.split(':').map(Number);
  
//   // Convert 12h to 24h format
//   if (period === 'PM' && hours !== 12) hours += 12;
//   if (period === 'AM' && hours === 12) hours = 0;
  
//   const date = new Date(dateStr);
//   date.setHours(hours);
//   date.setMinutes(minutes);
//   date.setSeconds(0);
  
//   return date.toISOString();
// };

// // Convert UTC time from API to local time for display
// const utcToLocalTime = (utcString) => {
//   const date = new Date(utcString);
//   let hours = date.getHours();
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   const ampm = hours >= 12 ? 'PM' : 'AM';
  
//   hours = hours % 12;
//   hours = hours || 12; // Convert 0 to 12
  
//   // Add leading zero to single-digit hours
//   return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
// };
//   // Fetch booked slots when stylist or date changes
//  const fetchBookedSlots = async (stylistId, date) => {
//   try {
//     setLoadingSlots(true);
//     const response = await axios.get(
//       `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${date}`
//     );
    
//     // Convert UTC times to local time format
//     const bookedTimeSlots = response.data.map(appointment => {
//       return utcToLocalTime(appointment.start_datetime);
//     });
    
//     setBookedSlots(prev => ({
//       ...prev,
//       [`stylist${stylistId}`]: bookedTimeSlots
//     }));
    
//     console.log(`Booked slots for stylist ${stylistId} on ${date}:`, bookedTimeSlots);
//   } catch (error) {
//     console.error("Error fetching booked slots:", error);
//     setBookedSlots(prev => ({
//       ...prev,
//       [`stylist${stylistId}`]: []
//     }));
//   } finally {
//     setLoadingSlots(false);
//   }
// };

//   useEffect(() => {
//     if (selectedStylist && selectedDate) {
//       fetchBookedSlots(selectedStylist.id, selectedDate);
//     }
//   }, [selectedStylist, selectedDate]);

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // First fetch the salons that offer the selected service
//         const serviceSalonsRes = await axios.get(`https://yaslaservice.com:81/salons/service/${selectedServices[0].id}/`);
//         const serviceSalonsData = serviceSalonsRes.data;

//         // Then fetch all salons and stylists
//         const salonsRes = await axios.get('https://yaslaservice.com:81/salons/');
//         const stylistsRes = await axios.get('https://yaslaservice.com:81/users/');

//        // Create maps for service details by salon ID
// const serviceDetailsBySalonId = {};
// serviceSalonsData.forEach(serviceSalon => {
//   const seconds = parseFloat(serviceSalon.completion_time); // e.g. "1800.0"
//   const minutes = Math.round(seconds / 60); // convert to minutes
//   serviceDetailsBySalonId[serviceSalon.salon_id] = {
//     cost: serviceSalon.cost,
//     completionTime: minutes // store as minutes
//   };
// });

// // Filter salons and include the actual service details
// const salonsData = salonsRes.data.data
//   .filter(salon => serviceDetailsBySalonId.hasOwnProperty(salon.id))
//   .map((salon, index) => ({
//     ...salon,
//     image: salonImages[index % salonImages.length],
//     price: serviceDetailsBySalonId[salon.id].cost,
//     completionTime: `${serviceDetailsBySalonId[salon.id].completionTime} mins`, // ✅ friendly display
//     distance: Math.floor(Math.random() * 10) + 1,
//     rating: (Math.random() * 1 + 4).toFixed(1)
//   }));


//         const usersData = stylistsRes.data.data;
//         const stylistsWithRole = usersData
//           .filter(user => user.user_role === 'Stylist')
//           .map((stylist, index) => ({
//             ...stylist,
//             profile_pic: stylistImages[index % stylistImages.length]
//           }));

//         setSalons(salonsData);
//         console.log("Fetched salons:", JSON.stringify(salonsData, null, 2));
//         setStylists(stylistsWithRole);
//         console.log("Fetched stylists:", JSON.stringify(stylistsWithRole, null, 2));

//         // Mark today's date by default
//         const today = new Date().toISOString().split('T')[0];
//         setMarkedDates({
//           [today]: { selected: true, selectedColor: '#FF6B6B' }
//         });
//       } catch (err) {
//         console.error(err);
//         Alert.alert("Error", "Failed to fetch salons or stylists");
//       }
//     };

//     fetchData();
//   }, [selectedServices]);

//   // Filter salons based on active filter
//   const filteredSalons = React.useMemo(() => {
//     if (!salons.length) return [];

//     let result = [...salons];

//     // Apply sorting filters first
//     switch (activeFilter) {
//       case 'price_low':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'price_high':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'rating':
//         result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//       case 'nearby':
//       default:
//         result.sort((a, b) => a.distance - b.distance);
//     }

//     // Then apply availability filter if set
//     if (availabilityFilter) {
//       const { time } = availabilityFilter;

//       result = result.filter(salon => {
//         const salonStylists = stylists.filter(stylist => stylist.salon === salon.id);
//         return salonStylists.some(stylist => {
//           const slots = bookedSlots[`stylist${stylist.id}`] || [];
//           return !slots.includes(time);
//         });
//       });
//     }

//     return result;
//   }, [salons, activeFilter, availabilityFilter, stylists, bookedSlots]);

//   // Filter stylists based on selected salon and availability
//   const filteredStylists = React.useMemo(() => {
//     if (!selectedSalon) return [];
    
//     return stylists.filter(stylist => {
//       const isInSalon = stylist.salon === selectedSalon;
      
//       if (!availabilityFilter) return isInSalon;
      
//       const slots = bookedSlots[`stylist${stylist.id}`] || [];
//       const isAvailable = !slots.includes(availabilityFilter.time);
      
//       return isInSalon && isAvailable;
//     });
//   }, [selectedSalon, stylists, availabilityFilter, bookedSlots]);

//   const handleApplyAvailabilityFilter = (date, time) => {
//     setAvailabilityFilter({ date, time });
//     setActiveFilter('availability'); // Add this to your state options
//   };

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//     setMarkedDates({
//       [day.dateString]: { selected: true, selectedColor: '#FF6B6B' }
//     });
//     setShowCalendar(false);
//   };

//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//   };

//   const handleSalonSelect = (salonId) => {
//     setSelectedSalon(salonId === selectedSalon ? null : salonId);
//     setSelectedStylist(null);
//     setSelectedTime(null);
//   };

//   const handleStylistSelect = (stylist) => {
//     setSelectedStylist(stylist.id === selectedStylist?.id ? null : stylist);
//     setSelectedTime(null);
//   };


//   const handlePressConfirm = () => {
//     if (!selectedSalon || !selectedStylist || !selectedTime) {
//       Alert.alert("Incomplete", "Please select salon, stylist and time");
//       return;
//     }

//     setLoading(true); // Show loader
//     setTimeout(() => {
//       executeAppointmentBooking(); // Call actual booking function after 30 sec
//     }, 10000); // ⏱ 20 seconds
//   };

//   const executeAppointmentBooking = async () => {
//     const startDateTimeISO = localTimeToUTC(selectedDate, selectedTime);

//     const appointmentServices = selectedServices.map(service => ({
//       service: service.id
//     }));

//     const payload = {
//       salon: selectedSalon,
//       stylist: selectedStylist.id,
//       customer: customerId,
//       start_datetime: startDateTimeISO,
//       status: "Pending",
//       payment_status: "Unpaid",
//       payment_mode: "Card",
//       customer_message: "Please don't delay the appointment.",
//       staff_notes: "Customer prefers quiet service.",
//       appointment_services: appointmentServices
//     };

//     console.log("Payload being sent:", JSON.stringify(payload, null, 2));

//     try {
//       const response = await axios.post('https://yaslaservice.com:81/appointments/', payload);
//       setLoading(false);

//       Alert.alert("Success", "Appointment booked successfully!", [
//         {
//     text: "OK",
//     onPress: () => {
//       navigation.navigate('BookingsStack'); 
//     }
//   }
//       ]);
//     } catch (error) {
//       setLoading(false);
//       console.error("Appointment post error:", error);

//       if (error.response) {
//         console.log("Status:", error.response.status);
//         console.log("Data:", error.response.data);
//         console.log("Headers:", error.response.headers);
//         Alert.alert("Error", `Failed to book appointment.\nServer responded with: ${JSON.stringify(error.response.data)}`);
//       } else if (error.request) {
//         console.log("Request:", error.request);
//         Alert.alert("Error", "No response received from the server. Please check your network.");
//       } else {
//         console.log("Error Message:", error.message);
//         Alert.alert("Error", "An unexpected error occurred.");
//       }
//     }
//   };

//    // In your render method, update the time slot rendering to use dynamic bookedSlots
//   const renderTimeSlot = ({ item }) => {
//     const isBooked = selectedStylist &&
//       (bookedSlots[`stylist${selectedStylist.id}`] || []).includes(item);
//     const isSelected = selectedTime === item;
//     const isDisabled = isBooked;
//     const isAvailableAtFilterTime = availabilityFilter?.time === item;

//     return (
//       <TouchableOpacity
//         style={[
//           styles.timeSlot,
//           isSelected && styles.selectedTimeSlot,
//           isDisabled && styles.disabledTimeSlot,
//           isAvailableAtFilterTime && styles.highlightedTimeSlot
//         ]}
//         onPress={() => !isDisabled && handleTimeSelect(item)}
//         disabled={isDisabled}
//       >
//         <Text
//           style={[
//             styles.timeSlotText,
//             isSelected && styles.selectedTimeSlotText,
//             isDisabled && styles.disabledTimeSlotText
//           ]}
//         >
//           {item}
//         </Text>
//         {isBooked && <Text style={styles.bookedLabel}>Booked</Text>}
//         {isAvailableAtFilterTime && !isBooked && !isSelected && (
//           <Text style={styles.availableLabel}>Available</Text>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <>
//       <View style={{ flex: 1 }}>
//       {filteredSalons.length === 0 ? (
//         <View style={styles.noSalonsContainer}>
//           <Text style={styles.noSalonsText}>No salons available for selected service</Text>
//           {/* You could add a button here to go back or clear filters if needed */}
//         </View>
//       ) : (
//         <FlatList
//           style={styles.container}
//           data={filteredSalons}
//           keyExtractor={(item) => item.id.toString()}
//           ListHeaderComponent={() => (
//             <View>
//               <Text style={styles.sectionTitle}>Select a Salon</Text>
//               <FilterTabs
//                 activeFilter={activeFilter}
//                 setActiveFilter={setActiveFilter}
//                 setAvailabilityFilter={setAvailabilityFilter}
//                 setShowAvailabilityModal={setShowAvailabilityModal}
//               />
//             </View>
//           )}
//           renderItem={({ item: salon }) => (
//             <View key={salon.id}>
//               <TouchableOpacity
//                 style={[
//                   styles.salonCard,
//                   selectedSalon === salon.id && styles.selectedSalonCard
//                 ]}
//                 onPress={() => handleSalonSelect(salon.id)}
//               >
//                 <Image source={{ uri: salon.image }} style={styles.salonImage} />
//                 <View style={styles.salonInfo}>
//                   <View style={styles.nameAndServicesRow}>
//                     <Text style={styles.salonName}>{salon.salon_name}</Text>
//                     {selectedServices && selectedServices.length > 0 && (
//                       <View style={styles.servicesContainer}>
//                         <Text style={styles.servicesTitle}>Selected:</Text>
//                         {selectedServices.map((service) => (
//                           <Text key={service.id} style={styles.serviceName}>
//                             • {service.name}
//                           </Text>
//                         ))}
//                       </View>
//                     )}
//                   </View>
//                   <Text style={styles.salonAddress}>{salon.locality}, {salon.city}</Text>

//                   {/* Show available stylists count if availability filter is active */}
//                   {availabilityFilter && (
//                     <Text style={styles.availabilityText}>
//                       {stylists.filter(stylist =>
//                         stylist.salon === salon.id &&
//                         !(bookedSlots[`stylist${stylist.id}`] || []).includes(availabilityFilter.time)
//                       ).length} stylists available at {availabilityFilter.time}
//                     </Text>
//                   )}

//                   <View style={styles.salonMeta}>
//                     <Text style={styles.salonRating}>★ {salon.rating || "4.5"}</Text>
//                     <Text style={styles.salonDistance}>{salon.distance} km away</Text>
//                     <Text style={styles.salonPrice}>₹{salon.price}</Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                       <Ionicons name="time-outline" size={13} color="#000000ff" style={{ marginRight: 0 }} />
//                       <Text style={styles.salonDistance}>{salon.completionTime}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>

//               {selectedSalon === salon.id && (
//                 <View style={styles.stylistsSection}>
//                   <Text style={styles.sectionTitle}>Select Date & Stylist</Text>

//                   <TouchableOpacity
//                     style={styles.dateSelector}
//                     onPress={() => setShowCalendar(!showCalendar)}
//                   >
//                     <FontAwesome name="calendar" size={20} color="#FF6B6B" />
//                     <Text style={styles.dateText}>
//                       {new Date(selectedDate).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </Text>
//                   </TouchableOpacity>

//                   {showCalendar && (
//                     <View style={styles.calendarContainer}>
//                       <Calendar
//                         current={selectedDate}
//                         minDate={new Date().toISOString().split('T')[0]}
//                         onDayPress={handleDateSelect}
//                         markedDates={markedDates}
//                         theme={{
//                           selectedDayBackgroundColor: '#FF6B6B',
//                           todayTextColor: '#FF6B6B',
//                           arrowColor: '#FF6B6B',
//                         }}
//                       />
//                     </View>
//                   )}

//                    {loadingSlots ? (
//                     <ActivityIndicator size="small" color="#FF6B6B" />
//                   ) : filteredStylists.length === 0 ? (
//                     <Text style={styles.noStylistText}>
//                       {availabilityFilter
//                         ? `No available stylists at ${availabilityFilter.time}`
//                         : 'No stylists available in this salon'}
//                     </Text>
//                   ) : (
//                     <>
//                       <Text style={styles.selectTimeLabel}>Select Stylist</Text>
//                       <FlatList
//                         horizontal
//                         data={filteredStylists}
//                         keyExtractor={(item) => item.id.toString()}
//                         renderItem={({ item: stylist }) => (
//                           <TouchableOpacity
//                             style={[
//                               styles.stylistCard,
//                               selectedStylist?.id === stylist.id && styles.selectedStylistCard
//                             ]}
//                             onPress={() => handleStylistSelect(stylist)}
//                           >
//                             <Image
//                               source={{ uri: stylist.profile_pic }}
//                               style={[
//                                 styles.stylistImage,
//                                 selectedStylist?.id === stylist.id && styles.selectedStylistImage
//                               ]}
//                             />
//                             <Text style={[
//                               styles.stylistName,
//                               selectedStylist?.id === stylist.id && styles.selectedStylistName
//                             ]}>
//                               {stylist.full_name}
//                             </Text>
//                             <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
//                             <Text style={styles.stylistSpecialty}>{stylist.specialization || 'Hair Specialist'}</Text>
//                           </TouchableOpacity>
//                         )}
//                         contentContainerStyle={styles.stylistContainer}
//                         showsHorizontalScrollIndicator={false}
//                       />

//                       {selectedStylist && (
//                         <>
//                           <Text style={styles.selectTimeLabel}>Available Time Slots</Text>
//                           <FlatList
//                             data={timeSlots}
//                             numColumns={3}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={renderTimeSlot}
//                             contentContainerStyle={styles.timeSlotContainer}
//                           />
//                         </>
//                       )}
//                     </>
//                   )}
//                 </View>
//               )}
//             </View>
//           )}
//         />
//         )}

//         {/* Confirm Button */}
//         {selectedSalon && selectedStylist && selectedTime && (
//           <View style={styles.confirmButtonWrapper}>
//             <TouchableOpacity style={styles.confirmButton} onPress={handlePressConfirm}>
//               <Text style={styles.confirmButtonText}>
//                 Confirm with {selectedStylist.full_name} on {selectedDate} at {selectedTime}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//       <AvailabilityModal
//         visible={showAvailabilityModal}
//         onClose={() => setShowAvailabilityModal(false)}
//         onApply={handleApplyAvailabilityFilter}
//         salons={salons}
//         stylists={stylists}
//       />
//       {loading && (
//         <View style={styles.loaderOverlay}>
//           <ActivityIndicator size="large" color="#6C63FF" />
//           <Text style={styles.loadingText}>Booking your appointment, please wait...</Text>
//         </View>
//       )}
//     </>
//   );
// };

// export default SalonSelectionScreen;




//with guest login code 

import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import styles from './SalonSelection.styles';
import { useAuth } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FilterTabs from './FilterTabs';
import * as Location from 'expo-location';

// Time slots from CScreen1.js
const timeSlotsFromCScreen1 = [
  "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
];

// Random salon images
const salonImages = [
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500',
  'https://images.unsplash.com/photo-1519664824562-b4bc73f9795a?w=500',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500'
];

// Random stylist images
const stylistImages = [
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500'
];

const SalonSelectionScreen = ({ route }) => {
  const [salons, setSalons] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [favoriteSalons, setFavoriteSalons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [serviceDetailsBySalonId, setServiceDetailsBySalonId] = useState({});
  const [stylistAvailability, setStylistAvailability] = useState({});
  
  // New state variables for booking section
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]); // Track booked slots for selected stylist

  const { customer, logout  } = useAuth();
  const customerId = customer?.data?.customer_id;
  const { selectedServices, selectedTimeSlot, selectedDate: initialSelectedDate } = route.params;
  const navigation = useNavigation();

  
  // ADDED: Guest authentication handler
  const handleGuestAction = (action) => {
    if (customer?.isGuest) {
      Alert.alert(
        "Login Required",
        "Please register or login to continue.",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Signup", 
            onPress: async () => {
              // Logout guest first, then navigate to Signup
              await logout();
              navigation.navigate('Signup');
            }
          },
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

  // Initialize selectedDate from route.params if available
  useEffect(() => {
    if (initialSelectedDate) {
      setSelectedDate(initialSelectedDate);
    }
    if (selectedTimeSlot) {
      setSelectedTime(selectedTimeSlot);
    }
  }, [initialSelectedDate, selectedTimeSlot]);

  // Update marked dates when selectedDate changes
  useEffect(() => {
    setMarkedDates({
      [selectedDate]: {
        selected: true,
        selectedColor: '#FF6B6B',
      }
    });
  }, [selectedDate]);

  // Fetch available time slots when stylist or date changes
  useEffect(() => {
    if (selectedStylist) {
      fetchAvailableTimeSlots();
    }
  }, [selectedStylist, selectedDate]);

  // --- FAVORITES ---
  useEffect(() => {
    const fetchFavoriteSalons = async () => {
      if (!customerId) return;
      setLoadingFavorites(true);
      try {
        const response = await axios.get(`https://yaslaservice.com:81/customer/${customerId}/favorites/`);
        if (response.data.success) {
          setFavoriteSalons(response.data.favorites);
        }
      } catch (error) {
        console.error("Error fetching favorite salons:", error);
      } finally {
        setLoadingFavorites(false);
      }
    };
    fetchFavoriteSalons();
  }, [customerId]);

  const isSalonFavorite = (salonId) => {
    return favoriteSalons.some(fav => fav.id === salonId);
  };

  const favoriteOffersService = (salonId) => {
    return serviceDetailsBySalonId.hasOwnProperty(salonId);
  };

  const handleFavoriteSalonSelect = (salonId) => {
    const salonOffersService = favoriteOffersService(salonId);
    if (salonOffersService) {
      const favoriteSalon = salons.find(salon => salon.id === salonId);
      if (favoriteSalon) {
        handleSalonSelect(salonId);
      }
    } else {
      Alert.alert("Service Not Available", "This salon doesn't offer the selected service.");
    }
  };

  const renderFavoriteSalons = () => {
    if (loadingFavorites) {
      return (
        <View style={styles.favoriteSection}>
          <Text style={styles.sectionTitle}>Your Favorites</Text>
          <ActivityIndicator size="small" color="#6C63FF" />
        </View>
      );
    }
    if (favoriteSalons.length === 0) return null;
    return (
      <View style={styles.favoriteSection}>
        <Text style={styles.sectionTitle}>Your Favorite Salons</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteScrollView}>
          {favoriteSalons.map((favorite) => {
            const salonData = salons.find(salon => salon.id === favorite.id);
            const offersService = favoriteOffersService(favorite.id);
            return (
              <TouchableOpacity
                key={favorite.id}
                style={[
                  styles.favoriteSalonCard,
                  selectedSalon === favorite.id && styles.selectedFavoriteSalonCard,
                  !offersService && styles.unavailableFavoriteSalonCard
                ]}
                onPress={() => offersService ? handleFavoriteSalonSelect(favorite.id) : null}
                disabled={!offersService}
              >
                <Image
                  source={{ uri: salonData?.image || salonImages[0] }}
                  style={styles.favoriteSalonImage}
                />
                <View style={styles.favoriteSalonInfo}>
                  <Text style={styles.favoriteSalonName}>{favorite.salon_name}</Text>
                  <Text style={styles.favoriteSalonAddress}>{favorite.locality}, {favorite.city}</Text>
                  {salonData && offersService ? (
                    <View style={styles.favoriteSalonMeta}>
                      <Text style={styles.favoriteSalonRating}>★ {salonData.rating || "4.5"}</Text>
                      <Text style={styles.favoriteSalonPrice}>₹{salonData.price}</Text>
                    </View>
                  ) : (
                    <View style={styles.unavailableServiceContainer}>
                      <Text style={styles.unavailableServiceText}>Service not available</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // --- TIME HELPERS ---
  const localTimeToUTC = (dateStr, time12h) => {
    const [time, period] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    const date = new Date(dateStr);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date.toISOString();
  };

  const utcToLocalTime = (utcString) => {
    const date = new Date(utcString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // --- STYLIST AVAILABILITY ---
  const checkStylistAvailability = async (stylistId) => {
    try {
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
      );

      // ✅ Filter out cancelled appointments
      const validAppointments = response.data.filter(
        appt => appt.status !== "Cancelled"
      );

      // Get all booked time slots for this stylist on the selected date
      const bookedTimeSlots = validAppointments.map(appt =>
        utcToLocalTime(appt.start_datetime)
      );

      // Check if there are any available time slots (not all are booked)
      const allTimeSlots = timeSlotsFromCScreen1;
      const availableTimeSlots = allTimeSlots.filter(time => 
        !bookedTimeSlots.includes(time) && !isTimeSlotInPast(time)
      );

      console.log(`Stylist ${stylistId} availability:`, {
        bookedTimeSlots,
        availableTimeSlots: availableTimeSlots.length,
        isAvailable: availableTimeSlots.length > 0
      });

      // Stylist is available if there's at least one available time slot
      return availableTimeSlots.length > 0;
    } catch (error) {
      console.error("Error checking stylist availability:", error);
      return true; // Default to available if there's an error
    }
  };

  const updateStylistAvailability = async (salonId) => {
    console.log('🔍 Starting stylist availability check for salon:', salonId);
    const salonStylists = stylists.filter(stylist => stylist.salon === salonId);
    console.log('👨‍💼 Found stylists for salon:', salonStylists.map(s => ({id: s.id, name: s.full_name})));
    
    const availabilityMap = {};
    for (const stylist of salonStylists) {
      console.log(`⏰ Checking availability for stylist: ${stylist.full_name} (ID: ${stylist.id}) on date: ${selectedDate}`);
      const isAvailable = await checkStylistAvailability(stylist.id);
      availabilityMap[stylist.id] = isAvailable;
      console.log(`✅ Stylist ${stylist.full_name} availability result:`, isAvailable);
    }
    
    console.log('📊 Final availability map:', availabilityMap);
    setStylistAvailability(availabilityMap);
  };

  useEffect(() => {
    console.log('📍 useEffect triggered for salon selection:', {
      selectedSalon,
      selectedDate,
      hasStylists: stylists.length > 0
    });
    
    if (selectedSalon && stylists.length > 0) {
      console.log('✅ Conditions met, calling updateStylistAvailability');
      updateStylistAvailability(selectedSalon);
    } else {
      console.log('❌ Conditions not met, clearing stylist availability');
      setStylistAvailability({});
    }
  }, [selectedSalon, selectedDate, stylists]);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        let serviceDetails = {};
        for (const service of selectedServices) {
          const res = await axios.get(`https://yaslaservice.com:81/salons/service/${service.id}/`);
          res.data.forEach(serviceSalon => {
            const seconds = parseFloat(serviceSalon.completion_time);
            const minutes = Math.round(seconds / 60);
            if (!serviceDetails[serviceSalon.salon_id]) {
              serviceDetails[serviceSalon.salon_id] = {
                cost: 0,
                completionTime: 0,
                services: []
              };
            }
            serviceDetails[serviceSalon.salon_id].cost += serviceSalon.cost;
            serviceDetails[serviceSalon.salon_id].completionTime += minutes;
            serviceDetails[serviceSalon.salon_id].services.push({
              id: service.id,
              name: service.name,
              price: serviceSalon.cost,
              time: minutes
            });
          });
        }
        setServiceDetailsBySalonId(serviceDetails);

        const [salonsRes, stylistsRes, feedbacksRes] = await Promise.all([
          axios.get('https://yaslaservice.com:81/salons/'),
          axios.get('https://yaslaservice.com:81/users/'),
          axios.get('https://yaslaservice.com:81/feedbacks/')
        ]);

        const usersData = stylistsRes.data.data;
        const stylistsWithRole = usersData
          .filter(user => user.user_role === 'Stylist')
          .map((stylist, index) => ({
            ...stylist,
            profile_pic: stylistImages[index % stylistImages.length]
          }));
        setStylists(stylistsWithRole);

        const feedbacks = feedbacksRes.data.data || [];
        const stylistRatingsMap = {};
        feedbacks.forEach(fb => {
          if (!stylistRatingsMap[fb.stylist]) stylistRatingsMap[fb.stylist] = [];
          stylistRatingsMap[fb.stylist].push(fb.rating);
        });

        const salonRatingsMap = {};
        stylistsWithRole.forEach(stylist => {
          const ratings = stylistRatingsMap[stylist.id] || [];
          if (ratings.length > 0) {
            if (!salonRatingsMap[stylist.salon]) salonRatingsMap[stylist.salon] = [];
            salonRatingsMap[stylist.salon].push(...ratings);
          }
        });

        const salonsData = salonsRes.data.data
          .filter(salon => serviceDetails.hasOwnProperty(salon.id))
          .map((salon, index) => {
            const ratings = salonRatingsMap[salon.id] || [];
            const avgRating =
              ratings.length > 0
                ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
                : "4.0";
            return {
              ...salon,
              image: salonImages[index % salonImages.length],
              price: serviceDetails[salon.id].cost,
              completionTime: `${serviceDetails[salon.id].completionTime} mins`,
              services: serviceDetails[salon.id].services,
              distance: Math.floor(Math.random() * 10) + 1,
              rating: avgRating
            };
          });
        setSalons(salonsData);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to fetch salons or stylists");
      }
    };
    fetchData();
  }, [selectedServices]);

  // --- FILTERS ---
  const filteredSalons = React.useMemo(() => {
    if (!salons.length) return [];
    let result = [...salons];
    switch (activeFilter) {
      case 'price_low': result.sort((a, b) => a.price - b.price); break;
      case 'price_high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'nearby': default: result.sort((a, b) => a.distance - b.distance);
    }
    return result;
  }, [salons, activeFilter]);

  const filteredStylists = React.useMemo(() => {
    if (!selectedSalon) return [];
    return stylists.filter(stylist => stylist.salon === selectedSalon);
  }, [selectedSalon, stylists]);

  // --- LOCATION ---
  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location permission to show nearby salons');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      if (salons.length > 0) {
        sortSalonsByDistance(location.coords.latitude, location.coords.longitude);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your location');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  const deg2rad = (deg) => deg * (Math.PI / 180);

  const sortSalonsByDistance = (userLat, userLon) => {
    const salonsWithDistance = salons.map(salon => {
      const salonLat = parseFloat(salon.latitude);
      const salonLon = parseFloat(salon.longitude);
      const distance = calculateDistance(userLat, userLon, salonLat, salonLon);
      return { ...salon, distance: parseFloat(distance.toFixed(1)) };
    });
    salonsWithDistance.sort((a, b) => a.distance - b.distance);
    setSalons(salonsWithDistance);
  };

  const handleFilterChange = (filter) => {
    if (filter === 'nearby') {
      Alert.alert(
        'Use Current Location',
        'We need your location to show nearby salons',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => setActiveFilter('') },
          { text: 'Allow', onPress: () => { getUserLocation(); setActiveFilter('nearby'); } }
        ]
      );
    } else {
      setActiveFilter(filter);
    }
  };

  const handleSalonSelect = (salonId) => {
    console.log('🏢 Salon selection triggered:', {
      clickedSalonId: salonId,
      currentSelectedSalon: selectedSalon,
      willBeSelected: salonId === selectedSalon ? null : salonId
    });
    
    setSelectedSalon(salonId === selectedSalon ? null : salonId);
    setSelectedStylist(null);
    setSelectedTime(selectedTimeSlot); // Reset to the originally selected time
    setShowAllTimeSlots(false); // Reset the show all time slots flag
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    setSelectedTime(selectedTimeSlot); // Reset to the originally selected time
    setShowAllTimeSlots(false); // Reset the show all time slots flag
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const isTimeSlotInPast = (time) => {
    const now = new Date();
    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    return selectedDateTime < now;
  };

  const formatTime = (time) => {
    return time;
  };

  const fetchAvailableTimeSlots = async () => {
    if (!selectedStylist || !selectedDate) return;
    
    setLoadingSlots(true);
    try {
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/stylist/${selectedStylist.id}/?start_date=${selectedDate}`
      );

      // Filter out cancelled appointments
      const validAppointments = response.data.filter(
        appt => appt.status !== "Cancelled"
      );

      // Get booked time slots
      const bookedSlots = validAppointments.map(appt =>
        utcToLocalTime(appt.start_datetime)
      );

      setBookedTimeSlots(bookedSlots); // Store booked slots for the selected stylist

      // Filter available slots
      const available = timeSlotsFromCScreen1.filter(time => 
        !bookedSlots.includes(time) && !isTimeSlotInPast(time)
      );

      setAvailableSlots(available);
      
      // Check if the previously selected time slot is available
      const isPreviouslySelectedSlotAvailable = available.includes(selectedTimeSlot);
      const isPreviouslySelectedSlotBooked = bookedSlots.includes(selectedTimeSlot);
      
      console.log('📅 Slot availability check:', {
        selectedTimeSlot,
        isPreviouslySelectedSlotAvailable,
        isPreviouslySelectedSlotBooked,
        bookedSlots,
        availableSlots: available
      });
      
      if (isPreviouslySelectedSlotBooked) {
        // If the previously selected slot is booked, show the "Stylist not found" message
        setShowAllTimeSlots(false);
        setSelectedTime(null); // Clear the selection
      } else if (!isPreviouslySelectedSlotAvailable) {
        // If the previously selected slot is not available (but not booked), show all time slots
        setShowAllTimeSlots(true);
        setSelectedTime(null); // Clear the selection
      } else {
        // If the previously selected slot is available, keep it selected
        setShowAllTimeSlots(false);
        setSelectedTime(selectedTimeSlot);
      }
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      Alert.alert("Error", "Failed to fetch available time slots");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handlePressConfirm = () => {
        // Check if user is guest
    if (handleGuestAction('review appointment')) return;
    if (!selectedSalon || !selectedStylist || !selectedTime) {
      Alert.alert("Incomplete", "Please select salon, stylist, and time slot");
      return;
    }
    const startDateTimeISO = localTimeToUTC(selectedDate, selectedTime);
    const appointmentServices = selectedServices.map(service => ({ service: service.id }));
    const payload = {
      salon: selectedSalon,
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
    const selectedSalonObj = salons.find(s => s.id === selectedSalon);
    navigation.navigate('ReviewAppointment1', {
      payload,
      selectedSalon: selectedSalonObj,
      selectedStylist,
      selectedServices: selectedSalonObj.services,
      selectedDate,
      selectedTimeSlot: selectedTime,
    });
  };

  // Render time slots based on the condition
  const renderTimeSlots = () => {
  if (loadingSlots) {
    return <ActivityIndicator size="small" color="#FF6B6B" />;
  }

  // ✅ Check overall availability
  const isAvailable = stylistAvailability[selectedStylist?.id];

  // ❌ CASE 1: Stylist not available at all
  if (isAvailable === false || availableSlots.length === 0) {
    return (
      <View style={styles.unavailableContainer}>
        <View style={styles.unavailableCard}>
          <Text style={styles.unavailableTitle}>Stylist Not Available</Text>
          <TouchableOpacity
            style={styles.changeTimeSlotButton}
            onPress={() => setShowAllTimeSlots(true)} // ✅ Show all directly
          >
            <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ❌ CASE 2: Previously selected slot is already booked → show message immediately
  const isPreviouslySelectedSlotBooked = bookedTimeSlots.includes(selectedTimeSlot);
  if (isPreviouslySelectedSlotBooked && !showAllTimeSlots) {
    return (
      <View style={styles.unavailableContainer}>
        <View style={styles.unavailableCard}>
          <Text style={styles.unavailableTitle}>
            Stylist Not Available for {selectedTimeSlot}
          </Text>
          <TouchableOpacity
            style={styles.changeTimeSlotButton}
            onPress={() => setShowAllTimeSlots(true)}
          >
            <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ✅ CASE 3: Show all time slots directly if flagged
  if (showAllTimeSlots) {
    return (
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
              <Text
                style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.selectedTimeSlotText,
                  isDisabled && { color: '#bbb' }
                ]}
              >
                {formatTime(time)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // ✅ CASE 4: If slot is still available → show it + button
  if (selectedTimeSlot && availableSlots.includes(selectedTimeSlot)) {
    return (
      <View style={styles.timeSlotsGrid}>
        <TouchableOpacity
          style={[styles.timeSlot, styles.selectedTimeSlot]}
          onPress={() => handleTimeSelect(selectedTimeSlot)}
        >
          <Text style={[styles.timeSlotText, styles.selectedTimeSlotText]}>
            {formatTime(selectedTimeSlot)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.showAllButton}
          onPress={() => setShowAllTimeSlots(true)}
        >
          <Text style={styles.showAllButtonText}>Show all time slots</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
  }


  return (
    <>
      <View style={{ flex: 1 }}>
        {filteredSalons.length === 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={{ marginTop: 10, fontSize: 16, color: '#FF6B6B' }}>
              Fetching available salons...
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.container}
            data={filteredSalons}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <View>
                <Text style={styles.selectedDateTime}>
                  Selected Services: {selectedServices.map(s => s.name).join(', ')}
                </Text>
                {renderFavoriteSalons()}
                <Text style={styles.sectionTitle}>Select a Salon</Text>
                <FilterTabs
                  activeFilter={activeFilter}
                  setActiveFilter={handleFilterChange}
                  setAvailabilityFilter={() => {}}
                />
              </View>
            )}
            renderItem={({ item: salon }) => (
              <View key={salon.id}>
                <TouchableOpacity
                  style={[
                    styles.salonCard,
                    selectedSalon === salon.id && styles.selectedSalonCard,
                    isSalonFavorite(salon.id) && styles.favoriteSalonIndicator
                  ]}
                  onPress={() => handleSalonSelect(salon.id)}
                >
                  {isSalonFavorite(salon.id) && (
                    <FontAwesome name="heart" size={16} color="#FF6B6B" style={styles.heartIcon} />
                  )}
                  <Image source={{ uri: salon.image }} style={styles.salonImage} />
                  <View style={styles.salonInfo}>
                    <View style={styles.nameAndServicesRow}>
                      <Text style={styles.salonName}>{salon.salon_name}</Text>
                      {salon.services && salon.services.length > 0 && (
                        <View style={styles.servicesContainer}>
                          <Text style={styles.servicesTitle}>Selected Services:</Text>
                          {salon.services.map(service => (
                            <Text key={service.id} style={styles.serviceName}>
                              • {service.name} - ₹{service.price} ({service.time} mins)
                            </Text>
                          ))}
                          <Text style={styles.totalPriceText}>
                            Total: ₹{salon.price} ({salon.completionTime})
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.salonAddress}>{salon.locality}, {salon.city}</Text>
                    <View style={styles.salonMeta}>
                      <Text style={styles.salonRating}>★ {salon.rating || "4.5"}</Text>
                      <Text style={styles.salonDistance}>{salon.distance} km away</Text>
                      <Text style={styles.salonPrice}>₹{salon.price}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="time-outline" size={13} color="#000000ff" />
                        <Text style={styles.salonDistance}>{salon.completionTime}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {selectedSalon === salon.id && (
                  <View style={styles.stylistsSection}>
                    <Text style={styles.sectionTitle}>Available Stylists</Text>

                    <FlatList
                        horizontal
                        data={filteredStylists}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item: stylist }) => {
                          const isAvailable = stylistAvailability[stylist.id];

                          // check if stylist is booked at selected slot
                          const isBookedAtSelectedSlot =
                            bookedTimeSlots.includes(selectedTimeSlot) &&
                            selectedStylist?.id === stylist.id;

                          return (
                            <TouchableOpacity
                              style={[
                                styles.stylistCard,
                                selectedStylist?.id === stylist.id && styles.selectedStylistCard,
                                (!isAvailable || isBookedAtSelectedSlot) && styles.unavailableStylistCard,
                              ]}
                              onPress={() => {
                                if (isAvailable && !isBookedAtSelectedSlot) {
                                  handleStylistSelect(stylist);
                                }
                              }}
                              disabled={!isAvailable || isBookedAtSelectedSlot}
                            >
                              <Image
                                source={{ uri: stylist.profile_pic }}
                                style={[
                                  styles.stylistImage,
                                  selectedStylist?.id === stylist.id && styles.selectedStylistImage,
                                ]}
                              />
                              <Text
                                style={[
                                  styles.stylistName,
                                  selectedStylist?.id === stylist.id && styles.selectedStylistName,
                                ]}
                              >
                                {stylist.full_name}
                              </Text>
                              <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
                              <Text style={styles.stylistSpecialty}>
                                {stylist.specialization || "Hair Specialist"}
                              </Text>

                              {/* Show Not Available + Change Time Slot inside card */}
                              {isBookedAtSelectedSlot && (
                                <View style={styles.unavailableIndicator}>
                                  <Text style={styles.unavailableText}>
                                    Stylist Not Available at {selectedTimeSlot}
                                  </Text>
                                  <TouchableOpacity
                                    style={styles.changeTimeSlotButtonSmall}
                                    onPress={() => {
                                      console.log("🔄 Change time slot pressed for stylist:", stylist.full_name);
                                      setShowAllTimeSlots(true);   // ✅ enable full time slot view
                                    }}
                                  >
                                    <Text style={styles.changeTimeSlotButtonSmallText}>
                                      Change Time Slot
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              )}

                            </TouchableOpacity>
                          );
                        }}
                        contentContainerStyle={styles.stylistContainer}
                        showsHorizontalScrollIndicator={false}
                      />

                    
                    {/* Booking Section */}
                   {/* Booking Section */}
                  {selectedStylist && (!bookedTimeSlots.includes(selectedTimeSlot) || showAllTimeSlots) && (
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

                      {/* Time Slots */}
                      <Text style={styles.sectionTitle}>Available Time Slots</Text>
                      {renderTimeSlots()}
                    </View>
                  )}


                  </View>
                )}
              </View>
            )}
          />
        )}

        {selectedSalon && selectedStylist && selectedTime && (
          <View style={styles.confirmButtonWrapper}>
            <TouchableOpacity style={styles.confirmButton} onPress={handlePressConfirm}>
              <Text style={styles.confirmButtonText}>Review Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Booking your appointment, please wait...</Text>
        </View>
      )}
   
    </>
  );
};

export default SalonSelectionScreen;


// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, ScrollView
// } from 'react-native';
// import axios from 'axios';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Calendar } from 'react-native-calendars';
// import styles from './SalonSelection.styles';
// import { useAuth } from '../../Context/AuthContext';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import FilterTabs from './FilterTabs';
// import * as Location from 'expo-location';

// // Time slots from CScreen1.js
// const timeSlotsFromCScreen1 = [
//   "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
//   "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
//   "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
//   "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
//   "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
// ];

// // Random salon images
// const salonImages = [
//   'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500',
//   'https://images.unsplash.com/photo-1519664824562-b4bc73f9795a?w=500',
//   'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
//   'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500',
//   'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500'
// ];

// // Random stylist images
// const stylistImages = [
//   'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500',
//   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
//   'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500',
//   'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500',
//   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500'
// ];

// const SalonSelectionScreen = ({ route }) => {
//   const [salons, setSalons] = useState([]);
//   const [stylists, setStylists] = useState([]);
//   const [selectedSalon, setSelectedSalon] = useState(null);
//   const [selectedStylist, setSelectedStylist] = useState(null);
//   const [activeFilter, setActiveFilter] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [favoriteSalons, setFavoriteSalons] = useState([]);
//   const [loadingFavorites, setLoadingFavorites] = useState(false);
//   const [serviceDetailsBySalonId, setServiceDetailsBySalonId] = useState({});
//   const [stylistAvailability, setStylistAvailability] = useState({});
  
//   // New state variables for booking section
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [markedDates, setMarkedDates] = useState({});
//   const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);
//   const [bookedTimeSlots, setBookedTimeSlots] = useState([]); // Track booked slots for selected stylist

//   const { customer, logout  } = useAuth();
//   const customerId = customer?.data?.customer_id;
//   const { selectedServices, selectedTimeSlot, selectedDate: initialSelectedDate } = route.params;
//   const navigation = useNavigation();

  
//   // ADDED: Guest authentication handler
//   const handleGuestAction = (action) => {
//     if (customer?.isGuest) {
//       Alert.alert(
//         "Login Required",
//         "Please register or login to continue.",
//         [
//           { text: "Cancel", style: "cancel" },
        
//           { 
//             text: "Login", 
//             onPress: async () => {
//               // Logout guest first, then navigate to Login
//               await logout();
//               navigation.navigate('Login');
//             }
//           },
//         ]
//       );
//       return true;
//     }
//     return false;
//   };

//   // Initialize selectedDate from route.params if available
//   useEffect(() => {
//     if (initialSelectedDate) {
//       setSelectedDate(initialSelectedDate);
//     }
//     if (selectedTimeSlot) {
//       setSelectedTime(selectedTimeSlot);
//     }
//   }, [initialSelectedDate, selectedTimeSlot]);

//   // Update marked dates when selectedDate changes
//   useEffect(() => {
//     setMarkedDates({
//       [selectedDate]: {
//         selected: true,
//         selectedColor: '#FF6B6B',
//       }
//     });
//   }, [selectedDate]);

//   // Fetch available time slots when stylist or date changes
//   useEffect(() => {
//     if (selectedStylist) {
//       fetchAvailableTimeSlots();
//     }
//   }, [selectedStylist, selectedDate]);

//   // --- FAVORITES ---
//   useEffect(() => {
//     const fetchFavoriteSalons = async () => {
//       if (!customerId) return;
//       setLoadingFavorites(true);
//       try {
//         const response = await axios.get(`https://yaslaservice.com:81/customer/${customerId}/favorites/`);
//         if (response.data.success) {
//           setFavoriteSalons(response.data.favorites);
//         }
//       } catch (error) {
//         console.error("Error fetching favorite salons:", error);
//       } finally {
//         setLoadingFavorites(false);
//       }
//     };
//     fetchFavoriteSalons();
//   }, [customerId]);

//   const isSalonFavorite = (salonId) => {
//     return favoriteSalons.some(fav => fav.id === salonId);
//   };

//   const favoriteOffersService = (salonId) => {
//     return serviceDetailsBySalonId.hasOwnProperty(salonId);
//   };

//   const handleFavoriteSalonSelect = (salonId) => {
//     const salonOffersService = favoriteOffersService(salonId);
//     if (salonOffersService) {
//       const favoriteSalon = salons.find(salon => salon.id === salonId);
//       if (favoriteSalon) {
//         handleSalonSelect(salonId);
//       }
//     } else {
//       Alert.alert("Service Not Available", "This salon doesn't offer the selected service.");
//     }
//   };

//   // FIXED: Filter favorite salons to only show those that offer the selected service
//   const renderFavoriteSalons = () => {
//     if (loadingFavorites) {
//       return (
//         <View style={styles.favoriteSection}>
//           <Text style={styles.sectionTitle}>Your Favorites</Text>
//           <ActivityIndicator size="small" color="#6C63FF" />
//         </View>
//       );
//     }

//     // Filter favorite salons to only include those that offer the selected service
//     const availableFavoriteSalons = favoriteSalons.filter(favorite => 
//       favoriteOffersService(favorite.id)
//     );

//     if (availableFavoriteSalons.length === 0) return null;
    
//     return (
//       <View style={styles.favoriteSection}>
//         <Text style={styles.sectionTitle}>Your Favorite Salons</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteScrollView}>
//           {availableFavoriteSalons.map((favorite) => {
//             const salonData = salons.find(salon => salon.id === favorite.id);
//             const offersService = favoriteOffersService(favorite.id);
            
//             // This check is redundant now but kept for safety
//             if (!offersService) return null;
            
//             return (
//               <TouchableOpacity
//                 key={favorite.id}
//                 style={[
//                   styles.favoriteSalonCard,
//                   selectedSalon === favorite.id && styles.selectedFavoriteSalonCard,
//                 ]}
//                 onPress={() => handleFavoriteSalonSelect(favorite.id)}
//               >
//                 <Image
//                   source={{ uri: salonData?.image || salonImages[0] }}
//                   style={styles.favoriteSalonImage}
//                 />
//                 <View style={styles.favoriteSalonInfo}>
//                   <Text style={styles.favoriteSalonName}>{favorite.salon_name}</Text>
//                   <Text style={styles.favoriteSalonAddress}>{favorite.locality}, {favorite.city}</Text>
//                   {salonData && (
//                     <View style={styles.favoriteSalonMeta}>
//                       <Text style={styles.favoriteSalonRating}>★ {salonData.rating || "4.5"}</Text>
//                       <Text style={styles.favoriteSalonPrice}>₹{salonData.price}</Text>
//                     </View>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//       </View>
//     );
//   };

//   // --- TIME HELPERS ---
//   const localTimeToUTC = (dateStr, time12h) => {
//     const [time, period] = time12h.split(' ');
//     let [hours, minutes] = time.split(':').map(Number);
//     if (period === 'PM' && hours !== 12) hours += 12;
//     if (period === 'AM' && hours === 12) hours = 0;
//     const date = new Date(dateStr);
//     date.setHours(hours);
//     date.setMinutes(minutes);
//     date.setSeconds(0);
//     return date.toISOString();
//   };

//   const utcToLocalTime = (utcString) => {
//     const date = new Date(utcString);
//     let hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours || 12;
//     return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
//   };

//   // --- STYLIST AVAILABILITY ---
//   const checkStylistAvailability = async (stylistId) => {
//     try {
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
//       );

//       // ✅ Filter out cancelled appointments
//       const validAppointments = response.data.filter(
//         appt => appt.status !== "Cancelled"
//       );

//       // Get all booked time slots for this stylist on the selected date
//       const bookedTimeSlots = validAppointments.map(appt =>
//         utcToLocalTime(appt.start_datetime)
//       );

//       // Check if there are any available time slots (not all are booked)
//       const allTimeSlots = timeSlotsFromCScreen1;
//       const availableTimeSlots = allTimeSlots.filter(time => 
//         !bookedTimeSlots.includes(time) && !isTimeSlotInPast(time)
//       );

//       console.log(`Stylist ${stylistId} availability:`, {
//         bookedTimeSlots,
//         availableTimeSlots: availableTimeSlots.length,
//         isAvailable: availableTimeSlots.length > 0
//       });

//       // Stylist is available if there's at least one available time slot
//       return availableTimeSlots.length > 0;
//     } catch (error) {
//       console.error("Error checking stylist availability:", error);
//       return true; // Default to available if there's an error
//     }
//   };

//   const updateStylistAvailability = async (salonId) => {
//     console.log('🔍 Starting stylist availability check for salon:', salonId);
//     const salonStylists = stylists.filter(stylist => stylist.salon === salonId);
//     console.log('👨‍💼 Found stylists for salon:', salonStylists.map(s => ({id: s.id, name: s.full_name})));
    
//     const availabilityMap = {};
//     for (const stylist of salonStylists) {
//       console.log(`⏰ Checking availability for stylist: ${stylist.full_name} (ID: ${stylist.id}) on date: ${selectedDate}`);
//       const isAvailable = await checkStylistAvailability(stylist.id);
//       availabilityMap[stylist.id] = isAvailable;
//       console.log(`✅ Stylist ${stylist.full_name} availability result:`, isAvailable);
//     }
    
//     console.log('📊 Final availability map:', availabilityMap);
//     setStylistAvailability(availabilityMap);
//   };

//   useEffect(() => {
//     console.log('📍 useEffect triggered for salon selection:', {
//       selectedSalon,
//       selectedDate,
//       hasStylists: stylists.length > 0
//     });
    
//     if (selectedSalon && stylists.length > 0) {
//       console.log('✅ Conditions met, calling updateStylistAvailability');
//       updateStylistAvailability(selectedSalon);
//     } else {
//       console.log('❌ Conditions not met, clearing stylist availability');
//       setStylistAvailability({});
//     }
//   }, [selectedSalon, selectedDate, stylists]);

//   // --- FETCH DATA ---
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let serviceDetails = {};
//         for (const service of selectedServices) {
//           const res = await axios.get(`https://yaslaservice.com:81/salons/service/${service.id}/`);
//           res.data.forEach(serviceSalon => {
//             const seconds = parseFloat(serviceSalon.completion_time);
//             const minutes = Math.round(seconds / 60);
//             if (!serviceDetails[serviceSalon.salon_id]) {
//               serviceDetails[serviceSalon.salon_id] = {
//                 cost: 0,
//                 completionTime: 0,
//                 services: []
//               };
//             }
//             serviceDetails[serviceSalon.salon_id].cost += serviceSalon.cost;
//             serviceDetails[serviceSalon.salon_id].completionTime += minutes;
//             serviceDetails[serviceSalon.salon_id].services.push({
//               id: service.id,
//               name: service.name,
//               price: serviceSalon.cost,
//               time: minutes
//             });
//           });
//         }
//         setServiceDetailsBySalonId(serviceDetails);

//         const [salonsRes, stylistsRes, feedbacksRes] = await Promise.all([
//           axios.get('https://yaslaservice.com:81/salons/'),
//           axios.get('https://yaslaservice.com:81/users/'),
//           axios.get('https://yaslaservice.com:81/feedbacks/')
//         ]);

//         const usersData = stylistsRes.data.data;
//         const stylistsWithRole = usersData
//           .filter(user => user.user_role === 'Stylist')
//           .map((stylist, index) => ({
//             ...stylist,
//             profile_pic: stylistImages[index % stylistImages.length]
//           }));
//         setStylists(stylistsWithRole);

//         const feedbacks = feedbacksRes.data.data || [];
//         const stylistRatingsMap = {};
//         feedbacks.forEach(fb => {
//           if (!stylistRatingsMap[fb.stylist]) stylistRatingsMap[fb.stylist] = [];
//           stylistRatingsMap[fb.stylist].push(fb.rating);
//         });

//         const salonRatingsMap = {};
//         stylistsWithRole.forEach(stylist => {
//           const ratings = stylistRatingsMap[stylist.id] || [];
//           if (ratings.length > 0) {
//             if (!salonRatingsMap[stylist.salon]) salonRatingsMap[stylist.salon] = [];
//             salonRatingsMap[stylist.salon].push(...ratings);
//           }
//         });

//         const salonsData = salonsRes.data.data
//           .filter(salon => serviceDetails.hasOwnProperty(salon.id))
//           .map((salon, index) => {
//             const ratings = salonRatingsMap[salon.id] || [];
//             const avgRating =
//               ratings.length > 0
//                 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
//                 : "4.0";
//             return {
//               ...salon,
//               image: salonImages[index % salonImages.length],
//               price: serviceDetails[salon.id].cost,
//               completionTime: `${serviceDetails[salon.id].completionTime} mins`,
//               services: serviceDetails[salon.id].services,
//               distance: Math.floor(Math.random() * 10) + 1,
//               rating: avgRating
//             };
//           });
//         setSalons(salonsData);
//       } catch (err) {
//         console.error(err);
//         Alert.alert("Error", "Failed to fetch salons or stylists");
//       }
//     };
//     fetchData();
//   }, [selectedServices]);

//   // --- FILTERS ---
//   const filteredSalons = React.useMemo(() => {
//     if (!salons.length) return [];
//     let result = [...salons];
//     switch (activeFilter) {
//       case 'price_low': result.sort((a, b) => a.price - b.price); break;
//       case 'price_high': result.sort((a, b) => b.price - a.price); break;
//       case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
//       case 'nearby': default: result.sort((a, b) => a.distance - b.distance);
//     }
//     return result;
//   }, [salons, activeFilter]);

//   const filteredStylists = React.useMemo(() => {
//     if (!selectedSalon) return [];
//     return stylists.filter(stylist => stylist.salon === selectedSalon);
//   }, [selectedSalon, stylists]);

//   // --- LOCATION ---
//   const getUserLocation = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'We need location permission to show nearby salons');
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setUserLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude
//       });
//       if (salons.length > 0) {
//         sortSalonsByDistance(location.coords.latitude, location.coords.longitude);
//       }
//     } catch (error) {
//       console.error('Error getting location:', error);
//       Alert.alert('Error', 'Could not get your location');
//     }
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };
//   const deg2rad = (deg) => deg * (Math.PI / 180);

//   const sortSalonsByDistance = (userLat, userLon) => {
//     const salonsWithDistance = salons.map(salon => {
//       const salonLat = parseFloat(salon.latitude);
//       const salonLon = parseFloat(salon.longitude);
//       const distance = calculateDistance(userLat, userLon, salonLat, salonLon);
//       return { ...salon, distance: parseFloat(distance.toFixed(1)) };
//     });
//     salonsWithDistance.sort((a, b) => a.distance - b.distance);
//     setSalons(salonsWithDistance);
//   };

//   const handleFilterChange = (filter) => {
//     if (filter === 'nearby') {
//       Alert.alert(
//         'Use Current Location',
//         'We need your location to show nearby salons',
//         [
//           { text: 'Cancel', style: 'cancel', onPress: () => setActiveFilter('') },
//           { text: 'Allow', onPress: () => { getUserLocation(); setActiveFilter('nearby'); } }
//         ]
//       );
//     } else {
//       setActiveFilter(filter);
//     }
//   };

//   const handleSalonSelect = (salonId) => {
//     console.log('🏢 Salon selection triggered:', {
//       clickedSalonId: salonId,
//       currentSelectedSalon: selectedSalon,
//       willBeSelected: salonId === selectedSalon ? null : salonId
//     });
    
//     setSelectedSalon(salonId === selectedSalon ? null : salonId);
//     setSelectedStylist(null);
//     setSelectedTime(selectedTimeSlot); // Reset to the originally selected time
//     setShowAllTimeSlots(false); // Reset the show all time slots flag
//   };

//   const handleStylistSelect = (stylist) => {
//     setSelectedStylist(stylist);
//   };

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//     setShowCalendar(false);
//     setSelectedTime(selectedTimeSlot); // Reset to the originally selected time
//     setShowAllTimeSlots(false); // Reset the show all time slots flag
//   };

//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//   };

//   const isTimeSlotInPast = (time) => {
//     const now = new Date();
//     const [timePart, period] = time.split(' ');
//     let [hours, minutes] = timePart.split(':').map(Number);
    
//     if (period === 'PM' && hours !== 12) hours += 12;
//     if (period === 'AM' && hours === 12) hours = 0;
    
//     const selectedDateTime = new Date(selectedDate);
//     selectedDateTime.setHours(hours, minutes, 0, 0);
    
//     return selectedDateTime < now;
//   };

//   const formatTime = (time) => {
//     return time;
//   };

//   const fetchAvailableTimeSlots = async () => {
//     if (!selectedStylist || !selectedDate) return;
    
//     setLoadingSlots(true);
//     try {
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${selectedStylist.id}/?start_date=${selectedDate}`
//       );

//       // Filter out cancelled appointments
//       const validAppointments = response.data.filter(
//         appt => appt.status !== "Cancelled"
//       );

//       // Get booked time slots
//       const bookedSlots = validAppointments.map(appt =>
//         utcToLocalTime(appt.start_datetime)
//       );

//       setBookedTimeSlots(bookedSlots); // Store booked slots for the selected stylist

//       // Filter available slots
//       const available = timeSlotsFromCScreen1.filter(time => 
//         !bookedSlots.includes(time) && !isTimeSlotInPast(time)
//       );

//       setAvailableSlots(available);
      
//       // Check if the previously selected time slot is available
//       const isPreviouslySelectedSlotAvailable = available.includes(selectedTimeSlot);
//       const isPreviouslySelectedSlotBooked = bookedSlots.includes(selectedTimeSlot);
      
//       console.log('📅 Slot availability check:', {
//         selectedTimeSlot,
//         isPreviouslySelectedSlotAvailable,
//         isPreviouslySelectedSlotBooked,
//         bookedSlots,
//         availableSlots: available
//       });
      
//       if (isPreviouslySelectedSlotBooked) {
//         // If the previously selected slot is booked, show the "Stylist not found" message
//         setShowAllTimeSlots(false);
//         setSelectedTime(null); // Clear the selection
//       } else if (!isPreviouslySelectedSlotAvailable) {
//         // If the previously selected slot is not available (but not booked), show all time slots
//         setShowAllTimeSlots(true);
//         setSelectedTime(null); // Clear the selection
//       } else {
//         // If the previously selected slot is available, keep it selected
//         setShowAllTimeSlots(false);
//         setSelectedTime(selectedTimeSlot);
//       }
//     } catch (error) {
//       console.error("Error fetching available time slots:", error);
//       Alert.alert("Error", "Failed to fetch available time slots");
//     } finally {
//       setLoadingSlots(false);
//     }
//   };

//   const handlePressConfirm = () => {
//         // Check if user is guest
//     if (handleGuestAction('review appointment')) return;
//     if (!selectedSalon || !selectedStylist || !selectedTime) {
//       Alert.alert("Incomplete", "Please select salon, stylist, and time slot");
//       return;
//     }
//     const startDateTimeISO = localTimeToUTC(selectedDate, selectedTime);
//     const appointmentServices = selectedServices.map(service => ({ service: service.id }));
//     const payload = {
//       salon: selectedSalon,
//       stylist: selectedStylist.id,
//       customer: customerId,
//       start_datetime: startDateTimeISO,
//       status: "Pending",
//       payment_status: "Unpaid",
//       payment_mode: "Card",
//       customer_message: "Please don't delay the appointment.",
//       staff_notes: "Customer prefers quiet service.",
//       appointment_services: appointmentServices
//     };
//     const selectedSalonObj = salons.find(s => s.id === selectedSalon);
//     navigation.navigate('ReviewAppointment1', {
//       payload,
//       selectedSalon: selectedSalonObj,
//       selectedStylist,
//       selectedServices: selectedSalonObj.services,
//       selectedDate,
//       selectedTimeSlot: selectedTime,
//     });
//   };

//   // Render time slots based on the condition
//   const renderTimeSlots = () => {
//   if (loadingSlots) {
//     return <ActivityIndicator size="small" color="#FF6B6B" />;
//   }

//   // ✅ Check overall availability
//   const isAvailable = stylistAvailability[selectedStylist?.id];

//   // ❌ CASE 1: Stylist not available at all
//   if (isAvailable === false || availableSlots.length === 0) {
//     return (
//       <View style={styles.unavailableContainer}>
//         <View style={styles.unavailableCard}>
//           <Text style={styles.unavailableTitle}>Stylist Not Available</Text>
//           <TouchableOpacity
//             style={styles.changeTimeSlotButton}
//             onPress={() => setShowAllTimeSlots(true)} // ✅ Show all directly
//           >
//             <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   // ❌ CASE 2: Previously selected slot is already booked → show message immediately
//   const isPreviouslySelectedSlotBooked = bookedTimeSlots.includes(selectedTimeSlot);
//   if (isPreviouslySelectedSlotBooked && !showAllTimeSlots) {
//     return (
//       <View style={styles.unavailableContainer}>
//         <View style={styles.unavailableCard}>
//           <Text style={styles.unavailableTitle}>
//             Stylist Not Available for {selectedTimeSlot}
//           </Text>
//           <TouchableOpacity
//             style={styles.changeTimeSlotButton}
//             onPress={() => setShowAllTimeSlots(true)}
//           >
//             <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   // ✅ CASE 3: Show all time slots directly if flagged
//   if (showAllTimeSlots) {
//     return (
//       <View style={styles.timeSlotsGrid}>
//         {timeSlotsFromCScreen1.map((time, index) => {
//           const isPastTime = isTimeSlotInPast(time);
//           const isBooked = !availableSlots.includes(time);
//           const isDisabled = isPastTime || isBooked;

//           return (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.timeSlot,
//                 selectedTime === time && styles.selectedTimeSlot,
//                 isDisabled && styles.unavailableTimeSlot
//               ]}
//               onPress={() => !isDisabled && handleTimeSelect(time)}
//               disabled={isDisabled}
//             >
//               <Text
//                 style={[
//                   styles.timeSlotText,
//                   selectedTime === time && styles.selectedTimeSlotText,
//                   isDisabled && { color: '#bbb' }
//                 ]}
//               >
//                 {formatTime(time)}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   }

//   // ✅ CASE 4: If slot is still available → show it + button
//   if (selectedTimeSlot && availableSlots.includes(selectedTimeSlot)) {
//     return (
//       <View style={styles.timeSlotsGrid}>
//         <TouchableOpacity
//           style={[styles.timeSlot, styles.selectedTimeSlot]}
//           onPress={() => handleTimeSelect(selectedTimeSlot)}
//         >
//           <Text style={[styles.timeSlotText, styles.selectedTimeSlotText]}>
//             {formatTime(selectedTimeSlot)}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.showAllButton}
//           onPress={() => setShowAllTimeSlots(true)}
//         >
//           <Text style={styles.showAllButtonText}>Show all time slots</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return null;
//   }


//   return (
//     <>
//       <View style={{ flex: 1 }}>
//         {filteredSalons.length === 0 ? (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#FF6B6B" />
//             <Text style={{ marginTop: 10, fontSize: 16, color: '#FF6B6B' }}>
//               Fetching available salons...
//             </Text>
//           </View>
//         ) : (
//           <FlatList
//             style={styles.container}
//             data={filteredSalons}
//             keyExtractor={(item) => item.id.toString()}
//             ListHeaderComponent={() => (
//               <View>
//                 <Text style={styles.selectedDateTime}>
//                   Selected Services: {selectedServices.map(s => s.name).join(', ')}
//                 </Text>
//                 {renderFavoriteSalons()}
//                 <Text style={styles.sectionTitle}>Select a Salon</Text>
//                 <FilterTabs
//                   activeFilter={activeFilter}
//                   setActiveFilter={handleFilterChange}
//                   setAvailabilityFilter={() => {}}
//                 />
//               </View>
//             )}
//             renderItem={({ item: salon }) => (
//               <View key={salon.id}>
//                 <TouchableOpacity
//                   style={[
//                     styles.salonCard,
//                     selectedSalon === salon.id && styles.selectedSalonCard,
//                     isSalonFavorite(salon.id) && styles.favoriteSalonIndicator
//                   ]}
//                   onPress={() => handleSalonSelect(salon.id)}
//                 >
//                   {isSalonFavorite(salon.id) && (
//                     <FontAwesome name="heart" size={16} color="#FF6B6B" style={styles.heartIcon} />
//                   )}
//                   <Image source={{ uri: salon.image }} style={styles.salonImage} />
//                   <View style={styles.salonInfo}>
//                     <View style={styles.nameAndServicesRow}>
//                       <Text style={styles.salonName}>{salon.salon_name}</Text>
//                       {salon.services && salon.services.length > 0 && (
//                         <View style={styles.servicesContainer}>
//                           <Text style={styles.servicesTitle}>Selected Services:</Text>
//                           {salon.services.map(service => (
//                             <Text key={service.id} style={styles.serviceName}>
//                               • {service.name} - ₹{service.price} ({service.time} mins)
//                             </Text>
//                           ))}
//                           <Text style={styles.totalPriceText}>
//                             Total: ₹{salon.price} ({salon.completionTime})
//                           </Text>
//                         </View>
//                       )}
//                     </View>
//                     <Text style={styles.salonAddress}>{salon.locality}, {salon.city}</Text>
//                     <View style={styles.salonMeta}>
//                       <Text style={styles.salonRating}>★ {salon.rating || "4.5"}</Text>
//                       <Text style={styles.salonDistance}>{salon.distance} km away</Text>
//                       <Text style={styles.salonPrice}>₹{salon.price}</Text>
//                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Ionicons name="time-outline" size={13} color="#000000ff" />
//                         <Text style={styles.salonDistance}>{salon.completionTime}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 </TouchableOpacity>

//                 {selectedSalon === salon.id && (
//                   <View style={styles.stylistsSection}>
//                     <Text style={styles.sectionTitle}>Available Stylists</Text>

//                     <FlatList
//                         horizontal
//                         data={filteredStylists}
//                         keyExtractor={(item) => item.id.toString()}
//                         renderItem={({ item: stylist }) => {
//                           const isAvailable = stylistAvailability[stylist.id];

//                           // check if stylist is booked at selected slot
//                           const isBookedAtSelectedSlot =
//                             bookedTimeSlots.includes(selectedTimeSlot) &&
//                             selectedStylist?.id === stylist.id;

//                           return (
//                             <TouchableOpacity
//                               style={[
//                                 styles.stylistCard,
//                                 selectedStylist?.id === stylist.id && styles.selectedStylistCard,
//                                 (!isAvailable || isBookedAtSelectedSlot) && styles.unavailableStylistCard,
//                               ]}
//                               onPress={() => {
//                                 if (isAvailable && !isBookedAtSelectedSlot) {
//                                   handleStylistSelect(stylist);
//                                 }
//                               }}
//                               disabled={!isAvailable || isBookedAtSelectedSlot}
//                             >
//                               <Image
//                                 source={{ uri: stylist.profile_pic }}
//                                 style={[
//                                   styles.stylistImage,
//                                   selectedStylist?.id === stylist.id && styles.selectedStylistImage,
//                                 ]}
//                               />
//                               <Text
//                                 style={[
//                                   styles.stylistName,
//                                   selectedStylist?.id === stylist.id && styles.selectedStylistName,
//                                 ]}
//                               >
//                                 {stylist.full_name}
//                               </Text>
//                               <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
//                               <Text style={styles.stylistSpecialty}>
//                                 {stylist.specialization || "Hair Specialist"}
//                               </Text>

//                               {/* Show Not Available + Change Time Slot inside card */}
//                               {isBookedAtSelectedSlot && (
//                                 <View style={styles.unavailableIndicator}>
//                                   <Text style={styles.unavailableText}>
//                                     Stylist Not Available at {selectedTimeSlot}
//                                   </Text>
//                                   <TouchableOpacity
//                                     style={styles.changeTimeSlotButtonSmall}
//                                     onPress={() => {
//                                       console.log("🔄 Change time slot pressed for stylist:", stylist.full_name);
//                                       setShowAllTimeSlots(true);   // ✅ enable full time slot view
//                                     }}
//                                   >
//                                     <Text style={styles.changeTimeSlotButtonSmallText}>
//                                       Change Time Slot
//                                     </Text>
//                                   </TouchableOpacity>
//                                 </View>
//                               )}

//                             </TouchableOpacity>
//                           );
//                         }}
//                         contentContainerStyle={styles.stylistContainer}
//                         showsHorizontalScrollIndicator={false}
//                       />

                    
//                     {/* Booking Section */}
//                    {/* Booking Section */}
//                   {selectedStylist && (!bookedTimeSlots.includes(selectedTimeSlot) || showAllTimeSlots) && (
//                     <View style={styles.bookingSection}>
//                       {/* Date Selection */}
//                       <Text style={styles.sectionTitle}>Select Date</Text>
//                       <TouchableOpacity
//                         style={styles.dateSelector}
//                         onPress={() => setShowCalendar(!showCalendar)}
//                       >
//                         <FontAwesome name="calendar" size={20} color="#FF6B6B" />
//                         <Text style={styles.dateText}>
//                           {new Date(selectedDate).toLocaleDateString('en-US', {
//                             weekday: 'long',
//                             month: 'long',
//                             day: 'numeric'
//                           })}
//                         </Text>
//                       </TouchableOpacity>

//                       {showCalendar && (
//                         <View style={styles.calendarContainer}>
//                           <Calendar
//                             current={selectedDate}
//                             minDate={new Date().toISOString().split('T')[0]}
//                             onDayPress={handleDateSelect}
//                             markedDates={markedDates}
//                             theme={{
//                               selectedDayBackgroundColor: '#FF6B6B',
//                               todayTextColor: '#FF6B6B',
//                               arrowColor: '#FF6B6B',
//                             }}
//                           />
//                         </View>
//                       )}

//                       {/* Time Slots */}
//                       <Text style={styles.sectionTitle}>Available Time Slots</Text>
//                       {renderTimeSlots()}
//                     </View>
//                   )}


//                   </View>
//                 )}
//               </View>
//             )}
//           />
//         )}

//         {selectedSalon && selectedStylist && selectedTime && (
//           <View style={styles.confirmButtonWrapper}>
//             <TouchableOpacity style={styles.confirmButton} onPress={handlePressConfirm}>
//               <Text style={styles.confirmButtonText}>Review Appointment</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//       {loading && (
//         <View style={styles.loaderOverlay}>
//           <ActivityIndicator size="large" color="#6C63FF" />
//           <Text style={styles.loadingText}>Booking your appointment, please wait...</Text>
//         </View>
//       )}
   
//     </>
//   );
// };

// export default SalonSelectionScreen;



