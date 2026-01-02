// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
// import { CheckBox } from 'react-native-elements';
// import { useNavigation } from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Calendar } from 'react-native-calendars';
// import * as Location from 'expo-location';
// import styles from './CScreen1.styles.js';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';

// const CScreen1 = () => {
//   // All state hooks at the top
//   const { customer, logout } = useAuth();
//   const customerId = customer?.data?.customer_id;
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [gender, setGender] = useState('male');
//   const [selectedServices, setSelectedServices] = useState([]);
//   const categoriesListRef = useRef(null);
//   const servicesListRefs = useRef({});

//   const [selectedService, setSelectedService] = useState(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [favoriteSalons, setFavoriteSalons] = useState([]);
//   const [maleServicesDynamic, setMaleServicesDynamic] = useState([]);
//   const [allSalons, setAllSalons] = useState([]);
//   const [filteredSalons, setFilteredSalons] = useState([]);
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterOption, setFilterOption] = useState('name');
//   const [servicesData, setServicesData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [markedDates, setMarkedDates] = useState({});
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [locationLoading, setLocationLoading] = useState(true);

//   const timeSlots = [
//     "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
//     "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
//     "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
//     "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
//     "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
//   ];

//   const groupedTimeSlots = [];
//   for (let i = 0; i < timeSlots.length; i += 3) {
//     groupedTimeSlots.push(timeSlots.slice(i, i + 3));
//   }

//   const isTimeSlotInPast = (timeSlot, selectedDate) => {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

//     if (selectedDay.getTime() === today.getTime()) {
//       const [time, modifier] = timeSlot.split(' ');
//       let [hours, minutes] = time.split(':').map(Number);

//       if (modifier === 'PM' && hours !== 12) hours += 12;
//       if (modifier === 'AM' && hours === 12) hours = 0;

//       const slotTime = new Date(now);
//       slotTime.setHours(hours, minutes, 0, 0);

//       const slotAvailableUntil = new Date(slotTime.getTime() + 9 * 60 * 1000);

//       return now > slotAvailableUntil;
//     }

//     return selectedDay < today;
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance;
//   };

//   // Get customer's current location
//  useEffect(() => {
//   const getLocation = async () => {
//     try {
//       setLocationLoading(true);
      
//       // First, check if permission is already granted
//       let { status } = await Location.getPermissionsAsync();
      
//       // If not granted, don't request - just proceed without location
//       if (status !== 'granted') {
//         console.log('Location permission not granted, proceeding without location');
//         setLocationLoading(false);
//         return;
//       }

//       // Only get location if permission is already granted
//       let location = await Location.getCurrentPositionAsync({});
//       setCustomerLocation(location.coords);
//     } catch (error) {
//       console.log('Location not available, proceeding without location:', error);
//       // Don't set error state - just continue without location
//     } finally {
//       setLocationLoading(false);
//     }
//   };

//   getLocation();
// }, []);

//   // Initialize markedDates with today's date
//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     setMarkedDates({
//       [today]: {
//         selected: true,
//         selectedColor: '#2F4EAA',
//       }
//     });
//   }, []);

//   const handleDateSelect = (day) => {
//     const selectedDay = new Date(day.dateString);
//     setSelectedDate(selectedDay);
//     setShowCalendar(false);
//     setSelectedTimeSlot(null);
//     setMarkedDates({
//       [day.dateString]: {
//         selected: true,
//         selectedColor: '#2F4EAA',
//       }
//     });
//   };

//   useEffect(() => {
//     const fetchServicesByGender = async () => {
//       try {
//         const response = await axios.get(
//           `https://yaslaservice.com:81/services/filter-by-gender/?gender=${gender}`
//         );
//         setServicesData(response.data);
//         setSelectedCategory(null);
//         setSelectedService(null);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };
//     fetchServicesByGender();
//   }, [gender]);

//   const groupByCategory = (services) => {
//     return services.reduce((acc, service) => {
//       const category = service.category?.service_category_name || 'Other Services';
//       if (!acc[category]) {
//         acc[category] = [];
//       }
//       acc[category].push({
//         id: service.id,
//         name: service.service_name,
//         popular: service.popular,
//         category: category
//       });
//       return acc;
//     }, {});
//   };

//   const categorizedServices = groupByCategory(servicesData);

// const [previouslyBookedSalons, setPreviouslyBookedSalons] = useState([]);
// const [appointmentDetails, setAppointmentDetails] = useState({}); // Store appointment details for each salon

// // Add this useEffect to fetch appointment history - ONLY CONFIRMED APPOINTMENTS
// useEffect(() => {
//   const fetchAppointmentHistory = async () => {
//     try {
//       if (customerId) {
//         const response = await axios.get(
//           `https://yaslaservice.com:81/appointments/customer/${customerId}/`
//         );
        
//         console.log('Appointments response:', response.data);
        
//         if (response.data && Array.isArray(response.data)) {
//           // Filter only CONFIRMED appointments
//           const confirmedAppointments = response.data.filter(
//             appointment => appointment.status === "Confirmed"
//           );
          
//           console.log('Confirmed appointments:', confirmedAppointments);
          
//           // Extract unique salon IDs from CONFIRMED appointment history
//           const bookedSalonIds = [...new Set(confirmedAppointments
//             .filter(appointment => appointment.salon)
//             .map(appointment => appointment.salon)
//           )];
          
//           // Store appointment details for each salon (latest appointment)
//           const salonDetails = {};
//           confirmedAppointments.forEach(appointment => {
//             if (appointment.salon && !salonDetails[appointment.salon]) {
//               salonDetails[appointment.salon] = {
//                 serviceNames: appointment.appointment_services?.map(service => service.service_name) || [],
//                 lastVisitDate: appointment.start_datetime,
//                 totalVisits: confirmedAppointments.filter(a => a.salon === appointment.salon).length
//               };
//             }
//           });
          
//           console.log('Previously booked salon IDs:', bookedSalonIds);
//           console.log('Salon details:', salonDetails);
          
//           setPreviouslyBookedSalons(bookedSalonIds);
//           setAppointmentDetails(salonDetails);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching appointment history:', error);
//       setPreviouslyBookedSalons([]);
//       setAppointmentDetails({});
//     }
//   };

//   fetchAppointmentHistory();
// }, [customerId]);

// // Update the salon sorting logic in your existing useEffect
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const salonsResponse = await axios.get('https://yaslaservice.com:81/salons/');
//       const servicesResponse = await axios.get('https://yaslaservice.com:81/services/');

//       let salonsData = salonsResponse.data.data || [];

//       // Calculate distance if location is available
//       if (customerLocation) {
//         salonsData = salonsData.map(salon => {
//           if (salon.latitude && salon.longitude) {
//             const distance = calculateDistance(
//               customerLocation.latitude,
//               customerLocation.longitude,
//               parseFloat(salon.latitude),
//               parseFloat(salon.longitude)
//             );
//             return { ...salon, distance };
//           }
//           return { ...salon, distance: null };
//         });
//       }

//       // NEW: Prioritize salons based on booking history and favorites
//       const prioritizedSalons = salonsData.sort((a, b) => {
//         // Priority 1: Previously booked salons (CONFIRMED appointments only)
//         const aWasBooked = previouslyBookedSalons.includes(a.id);
//         const bWasBooked = previouslyBookedSalons.includes(b.id);
        
//         if (aWasBooked && !bWasBooked) return -1;
//         if (!aWasBooked && bWasBooked) return 1;
        
//         // If both were booked, sort by number of visits (more visits first)
//         if (aWasBooked && bWasBooked) {
//           const aVisits = appointmentDetails[a.id]?.totalVisits || 0;
//           const bVisits = appointmentDetails[b.id]?.totalVisits || 0;
//           if (aVisits !== bVisits) return bVisits - aVisits;
//         }
        
//         // Priority 2: Favorite salons
//         const aIsFavorite = favoriteSalons.includes(a.id);
//         const bIsFavorite = favoriteSalons.includes(b.id);
        
//         if (aIsFavorite && !bIsFavorite) return -1;
//         if (!aIsFavorite && bIsFavorite) return 1;
        
//         // Priority 3: Distance (only if location available)
//         if (customerLocation) {
//           if (a.distance === null && b.distance !== null) return 1;
//           if (a.distance !== null && b.distance === null) return -1;
//           if (a.distance !== null && b.distance !== null) {
//             return a.distance - b.distance;
//           }
//         }
        
//         // Priority 4: Alphabetical by name
//         return (a.salon_name || '').localeCompare(b.salon_name || '');
//       });

//       setAllSalons(prioritizedSalons);
//       setFilteredSalons(prioritizedSalons.slice(0, 5));

//       const allServices = servicesResponse.data.data || [];
//       const popularServices = allServices
//         .filter(service => service.popular === true)
//         .map(service => ({
//           id: service.id,
//           name: service.service_name,
//           category: service.gender_specific?.toLowerCase() || 'other',
//         }));
//       setMaleServicesDynamic(popularServices);

//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err);
//       setLoading(false);
//       Alert.alert("Error", "Failed to load data from server.");
//     }
//   };

//   fetchData();
// }, [customerLocation, previouslyBookedSalons, favoriteSalons, appointmentDetails]); // Added dependencies

// // Updated salon rendering with service names and badges
// const renderSalonCard = (salon) => {
//   const wasPreviouslyBooked = previouslyBookedSalons.includes(salon.id);
//   const isFavorite = favoriteSalons.includes(salon.id);
//   const salonAppointmentDetails = appointmentDetails[salon.id];
  
//   return (
//     <TouchableOpacity
//       key={salon.id}
//       onPress={() => handleSalonPress(salon)}
//     >
//       <View style={styles.customSalonCard}>
//         <View style={styles.timelineWrapper}>
//           <FontAwesome 
//             name="clock-o" 
//             size={20} 
//             color={wasPreviouslyBooked ? "#2F4EAA" : "#333"} 
//           />
//         </View>
        
//         <View style={styles.leftSection}>
//           {/* Badge for previously booked salons */}
//           {wasPreviouslyBooked && (
//             <View style={styles.previouslyBookedBadge}>
//               <Text style={styles.badgeText}>
//                 {salonAppointmentDetails?.totalVisits > 1 
//                   ? `Visited ${salonAppointmentDetails.totalVisits} times` 
//                   : 'Previously Booked'
//                 }
//               </Text>
//             </View>
//           )}
          
//           <Text style={[
//             styles.salonName,
//             wasPreviouslyBooked && styles.previouslyBookedName
//           ]}>
//             {salon.salon_name}
//           </Text>
          
//           <Text style={styles.salonAddress}>
//             {[salon.locality, salon.city, salon.state]
//               .filter(Boolean)
//               .join(', ')}
//           </Text>
          
//           {/* Display service names for previously booked salons */}
//           {wasPreviouslyBooked && salonAppointmentDetails?.serviceNames && (
//             <View style={styles.servicesContainer}>
//               <Text style={styles.servicesLabel}>Previous services: </Text>
//               <Text style={styles.servicesText}>
//                 {salonAppointmentDetails.serviceNames.join(', ')}
//               </Text>
//             </View>
//           )}
          
//           {salon.distance !== null && salon.distance !== undefined && (
//             <Text style={styles.distanceText}>
//               {salon.distance < 1
//                 ? `${(salon.distance * 1000).toFixed(0)} m away`
//                 : `${salon.distance.toFixed(1)} km away`}
//             </Text>
//           )}
          
//           {/* Show priority indicators */}
//           <View style={styles.priorityIndicators}>
//             {wasPreviouslyBooked && (
//               <Text style={styles.priorityText}>
//                 ★ Previously Visited {salonAppointmentDetails?.totalVisits > 1 && `(${salonAppointmentDetails.totalVisits} times)`}
//               </Text>
//             )}
//             {isFavorite && !wasPreviouslyBooked && (
//               <Text style={styles.priorityText}>❤️ Favorite</Text>
//             )}
//             {!wasPreviouslyBooked && !isFavorite && salon.distance !== null && (
//               <Text style={styles.priorityText}>📍 Nearby</Text>
//             )}
//           </View>
//         </View>
        
//         <TouchableOpacity
//           onPress={() => {
//             if (handleGuestAction('favorite salon')) return;
//             toggleFavorite(salon.id);
//           }}
//         >
//           <FontAwesome
//             name={isFavorite ? 'heart' : 'heart-o'}
//             size={30}
//             color={isFavorite ? 'blue' : 'gray'}
//           />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// };

//   useEffect(() => {
//     if (!Array.isArray(allSalons)) return;

//     if (searchQuery.length > 0) {
//       const query = searchQuery.toLowerCase().trim();
//       const filtered = allSalons.filter(salon => {
//         const nameMatch = salon.salon_name?.toLowerCase().includes(query);
//         const cityMatch = salon.city?.toLowerCase().includes(query);
//         const localityMatch = salon.locality?.toLowerCase().includes(query);
//         const stateMatch = salon.state?.toLowerCase().includes(query);
//         return nameMatch || cityMatch || localityMatch || stateMatch;
//       });

//       setFilteredSalons(filtered);

//       const suggestions = filtered.map(salon => ({
//         id: salon.id,
//         name: salon.salon_name,
//         city: salon.city,
//         locality: salon.locality,
//         state: salon.state,
//         displayText: [
//           salon.salon_name,
//           salon.locality,
//           salon.city,
//           salon.state
//         ].filter(Boolean).join(', ')
//       }));

//       setLocationSuggestions(suggestions);
//       setShowSuggestions(suggestions.length > 0);
//     } else {
//       setShowSuggestions(false);
//       setFilteredSalons(allSalons.slice(0, 3));
//     }
//   }, [searchQuery, allSalons]);

//   useEffect(() => {
//     const loadFavorites = async () => {
//       try {
//         if (customerId) {
//           console.log('Loading favorites for customer:', customerId);
//           const response = await axios.get(
//             `https://yaslaservice.com:81/customer/${customerId}/favorites/`
//           );

//           console.log('Favorites API response:', JSON.stringify(response.data));

//           let favoriteSalonIds = [];

//           if (Array.isArray(response.data)) {
//             favoriteSalonIds = response.data;
//           } else if (response.data && Array.isArray(response.data.salon_id)) {
//             favoriteSalonIds = response.data.salon_id;
//           } else if (response.data && response.data.favorites) {
//             favoriteSalonIds = response.data.favorites.map(fav => fav.salon_id || fav.id);
//           }

//           console.log('Extracted favorite salon IDs:', favoriteSalonIds);
//           setFavoriteSalons(favoriteSalonIds);
//         }
//       } catch (error) {
//         console.error('Error loading favorites:', error);
//         setFavoriteSalons([]);
//       }
//     };

//     loadFavorites();
//   }, [customerId]);

//   const toggleFavorite = async (salonId) => {
//     try {
//       const isCurrentlyFavorite = favoriteSalons.includes(salonId);
//       let updatedFavorites;

//       if (isCurrentlyFavorite) {
//         updatedFavorites = favoriteSalons.filter(id => id !== salonId);
//         setFavoriteSalons(updatedFavorites);

//         const response = await axios.delete(
//           `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
//           {
//             data: {
//               salon_id: [salonId]
//             }
//           }
//         );

//         console.log('Favorite removal successful:', response.data);
//       } else {
//         updatedFavorites = [...favoriteSalons, salonId];
//         setFavoriteSalons(updatedFavorites);

//         const response = await axios.post(
//           `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
//           {
//             salon_id: updatedFavorites
//           }
//         );

//         console.log('Favorite addition successful:', response.data);
//       }

//     } catch (error) {
//       console.error('Error updating favorites:', error);
//       setFavoriteSalons(prev =>
//         prev.includes(salonId)
//           ? prev.filter(id => id !== salonId)
//           : [...prev, salonId]
//       );

//       Alert.alert("Error", "Failed to update favorites. Please try again.");
//     }
//   };

// // FIXED: Handle guest authentication properly
// const handleGuestAction = (action) => {
//   if (customer?.isGuest) {
//     Alert.alert(
//       "Login Required",
//       "Please register or login to continue.",
//       [
//         { text: "Cancel", style: "cancel" },
      
//         { 
//           text: "Login", 
//           onPress: async () => {
//             // Logout guest first, then navigate to Login
//             await logout();
//             navigation.navigate('Login'); // <-- Navigate to Login
//           }
//         },
//       ]
//     );
//     return true;
//   }
//   return false;
// };


//   const toggleServiceSelection = (service) => {
//     // if (handleGuestAction('select service')) return;

//     setSelectedService(prev =>
//       prev && prev.id === service.id ? null : service
//     );
//     setSelectedServices(prev => {
//       if (prev.some(s => s.id === service.id)) {
//         return prev.filter(s => s.id !== service.id);
//       } else {
//         return [...prev, service];
//       }
//     });
//   };

//   const selectTimeSlot = (slot) => {
//     // if (handleGuestAction('select time slot')) return;

//     setSelectedTimeSlot(slot);
//   };

//   const handleSalonPress = (salon) => {
//     // if (handleGuestAction('view salon details')) return;

//     navigation.navigate('SalonServices', {
//       salonId: salon.id,
//       salonName: salon.salon_name,
//       city: salon.city,
//       SalonPhoneNumber: salon.phone || '',
//       SalonLatitude: salon.latitude || '',
//       SalonLongitude: salon.longitude || '',
//     });
//   };

//   const isServiceSelected = (service) => {
//     return selectedServices.some(s => s.id === service.id);
//   };

//   const handleContinue = () => {
//     if (selectedServices.length === 0) {
//       return Alert.alert("Please select at least one service");
//     }
//     if (!selectedTimeSlot) {
//       return Alert.alert("Please select a time slot");
//     }
//     navigation.navigate('SalonSelectionScreen', {
//       selectedServices,
//       selectedTimeSlot,
//       selectedDate: selectedDate.toISOString().split('T')[0],
//     });
//   };

//   if (loading || locationLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#2F4EAA" />
//         <Text style={styles.loadingText}>Fetching salons and services...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={[]}
//         keyExtractor={(item, index) => index.toString()}
//         ListHeaderComponent={
//           <View style={styles.scrollContent}>
//             {/* Search Section */}
//             <View style={styles.searchContainer}>
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search by salon name, city, locality or state"
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//               />
//             </View>


//           {/* Salon List */}
//           {filteredSalons.length > 0 ? (
//             filteredSalons.map(renderSalonCard)
//           ) : (
//             <Text style={styles.noResultsText}>
//               {searchQuery.length > 0
//                 ? "No salons found matching your search"
//                 : "Loading salons..."}
//             </Text>
//           )}

//             {/* Services Header */}
//             <View style={styles.servicesHeaderRow}>
//               <Text style={styles.sectionTitle}>Services for you</Text>
//               <View style={styles.genderToggleRow}>
//                 <CheckBox
//                   title="Male"
//                   checked={gender === 'male'}
//                   onPress={() => setGender('male')}
//                   containerStyle={styles.checkboxInline}
//                   textStyle={styles.checkboxText}
//                   checkedColor="#2F4EAA"
//                 />
//                 <CheckBox
//                   title="Female"
//                   checked={gender === 'female'}
//                   onPress={() => setGender('female')}
//                   containerStyle={styles.checkboxInline}
//                   textStyle={styles.checkboxText}
//                   checkedColor="#2F4EAA"
//                 />
//               </View>
//             </View>

//             {/* Popular Services */}
//             <Text style={styles.sectionTitle}>Popular</Text>
//             <FlatList
//               data={maleServicesDynamic}
//               numColumns={2}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.serviceBox,
//                     isServiceSelected(item) && styles.selectedServiceBox,
//                   ]}
//                   onPress={() => toggleServiceSelection(item)}
//                 >
//                   <Text style={[styles.serviceText, { color: '#2F4EAA' }]}>
//                     {item.name}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               columnWrapperStyle={styles.serviceRow}
//               scrollEnabled={false}
//             />

//             {/* Categories Section */}
//             <Text style={styles.sectionTitle}>Categories</Text>
//             <View style={styles.categoriesContainer}>
//               <TouchableOpacity
//                 style={styles.scrollArrow}
//                 onPress={() => categoriesListRef.current?.scrollToOffset({ offset: 0, animated: true })}
//               >
//                 <FontAwesome name="chevron-left" size={20} color="#2F4EAA" />
//               </TouchableOpacity>

//               <FlatList
//                 ref={categoriesListRef}
//                 data={Object.keys(categorizedServices)}
//                 horizontal
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={[
//                       styles.categoryButton,
//                       selectedCategory === item && styles.selectedCategoryButton,
//                     ]}
//                     onPress={() => setSelectedCategory(item)}
//                   >
//                     <Text style={[
//                       styles.categoryButtonText,
//                       selectedCategory === item && styles.selectedCategoryButtonText,
//                       { color: "#2F4EAA" }
//                     ]}>
//                       {item}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={{ paddingVertical: 5 }}
//               />

//               <TouchableOpacity
//                 style={styles.scrollArrow}
//                 onPress={() => {
//                   categoriesListRef.current?.scrollToEnd({ animated: true });
//                 }}
//               >
//                 <FontAwesome name="chevron-right" size={20} color="#2F4EAA" />
//               </TouchableOpacity>
//             </View>

//             {/* Services for Selected Category */}
//             {selectedCategory && (
//               <View style={styles.selectedCategoryContainer}>
//                 <View style={styles.categoryHeader}>
//                   <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
//                   <TouchableOpacity onPress={() => setSelectedCategory(null)}>
//                     <FontAwesome name="times-circle" size={20} color="#999" />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.servicesContainer}>
//                   <TouchableOpacity
//                     style={styles.scrollArrow}
//                     onPress={() => {
//                       if (servicesListRefs.current[selectedCategory]) {
//                         servicesListRefs.current[selectedCategory].scrollToOffset({
//                           offset: 0,
//                           animated: true
//                         });
//                       }
//                     }}
//                   >
//                     <FontAwesome name="chevron-left" size={20} color="#2F4EAA" />
//                   </TouchableOpacity>

//                   <FlatList
//                     ref={ref => servicesListRefs.current[selectedCategory] = ref}
//                     data={categorizedServices[selectedCategory]}
//                     horizontal
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => (
//                       <TouchableOpacity
//                         style={[
//                           styles.serviceBoxHorizontal,
//                           isServiceSelected(item) && styles.selectedServiceBox,
//                         ]}
//                         onPress={() => toggleServiceSelection(item)}
//                       >
//                         <Text style={[
//                           styles.serviceText,
//                           isServiceSelected(item) && styles.selectedServiceText,
//                           { color: "blue" }
//                         ]}>
//                           {item.name}
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.horizontalServicesContent}
//                   />

//                   <TouchableOpacity
//                     style={styles.scrollArrow}
//                     onPress={() => {
//                       if (servicesListRefs.current[selectedCategory]) {
//                         servicesListRefs.current[selectedCategory].scrollToEnd({ animated: true });
//                       }
//                     }}
//                   >
//                     <FontAwesome name="chevron-right" size={20} color="#2F4EAA" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}

//             {/* Date and Time Slots Section */}
//             {selectedService && (
//               <View style={styles.timeSlotsContainer}>
//                 <Text style={styles.sectionTitle}>Select Date</Text>
//                 <TouchableOpacity
//                   style={styles.dateSelector}
//                   onPress={() => setShowCalendar(!showCalendar)}
//                 >
//                   <FontAwesome name="calendar" size={20} color="#2F4EAA" />
//                   <Text style={styles.dateText}>
//                     {new Date(selectedDate).toLocaleDateString('en-US', {
//                       weekday: 'long',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </Text>
//                 </TouchableOpacity>

//                 {showCalendar && (
//                   <View style={styles.calendarContainer}>
//                     <Calendar
//                       current={selectedDate.toISOString().split('T')[0]}
//                       minDate={new Date().toISOString().split('T')[0]}
//                       onDayPress={handleDateSelect}
//                       markedDates={markedDates}
//                       theme={{
//                         selectedDayBackgroundColor: '#2F4EAA',
//                         todayTextColor: '#2F4EAA',
//                         arrowColor: '#2F4EAA',
//                       }}
//                     />
//                   </View>
//                 )}

//                 <Text style={styles.sectionTitle}>Available Time Slots</Text>
//                 {groupedTimeSlots.map((row, rowIndex) => (
//                   <View key={rowIndex} style={styles.timeSlotRow}>
//                     {row.map((slot, slotIndex) => {
//                       const isPast = isTimeSlotInPast(slot, selectedDate);
//                       return (
//                         <TouchableOpacity
//                           key={slotIndex}
//                           style={[
//                             styles.timeSlotButton,
//                             selectedTimeSlot === slot && styles.selectedTimeSlot,
//                             isPast && styles.disabledTimeSlot,
//                           ]}
//                           onPress={() => !isPast && selectTimeSlot(slot)}
//                           disabled={isPast}
//                         >
//                           <Text style={[
//                             styles.timeSlotText,
//                             selectedTimeSlot === slot && styles.selectedTimeSlotText,
//                             isPast && styles.disabledTimeSlotText,
//                           ]}>
//                             {slot}
//                           </Text>
//                         </TouchableOpacity>
//                       );
//                     })}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         }
//       />

//       {selectedServices.length > 0 && selectedTimeSlot && (
//         <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//           <Text style={styles.continueButtonText}>
//             {selectedServices.length} service(s) • {selectedTimeSlot} • Continue
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default CScreen1;


//above code with horizonatal scroll
//-----------------------------------------------------
// below code with vertically scrollable services 

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, ScrollView } from 'react-native';
// import { CheckBox } from 'react-native-elements';
// import { useNavigation } from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Calendar } from 'react-native-calendars';
// import * as Location from 'expo-location';
// import styles from './CScreen1.styles.js';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';

// const CScreen1 = () => {
//   // All state hooks at the top
//   const { customer, logout } = useAuth();
//   const customerId = customer?.data?.customer_id;
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [gender, setGender] = useState('male');
//   const [selectedServices, setSelectedServices] = useState([]);
//   const categoriesListRef = useRef(null);

//   const [selectedService, setSelectedService] = useState(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [favoriteSalons, setFavoriteSalons] = useState([]);
//   const [maleServicesDynamic, setMaleServicesDynamic] = useState([]);
//   const [allSalons, setAllSalons] = useState([]);
//   const [filteredSalons, setFilteredSalons] = useState([]);
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterOption, setFilterOption] = useState('name');
//   const [servicesData, setServicesData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [markedDates, setMarkedDates] = useState({});
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [locationLoading, setLocationLoading] = useState(true);

//   const timeSlots = [
//     "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
//     "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
//     "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
//     "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
//     "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
//   ];

//   const groupedTimeSlots = [];
//   for (let i = 0; i < timeSlots.length; i += 3) {
//     groupedTimeSlots.push(timeSlots.slice(i, i + 3));
//   }

//   const isTimeSlotInPast = (timeSlot, selectedDate) => {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

//     if (selectedDay.getTime() === today.getTime()) {
//       const [time, modifier] = timeSlot.split(' ');
//       let [hours, minutes] = time.split(':').map(Number);

//       if (modifier === 'PM' && hours !== 12) hours += 12;
//       if (modifier === 'AM' && hours === 12) hours = 0;

//       const slotTime = new Date(now);
//       slotTime.setHours(hours, minutes, 0, 0);

//       const slotAvailableUntil = new Date(slotTime.getTime() + 9 * 60 * 1000);

//       return now > slotAvailableUntil;
//     }

//     return selectedDay < today;
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance;
//   };

//   // Get customer's current location
//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         setLocationLoading(true);
        
//         // First, check if permission is already granted
//         let { status } = await Location.getPermissionsAsync();
        
//         // If not granted, don't request - just proceed without location
//         if (status !== 'granted') {
//           console.log('Location permission not granted, proceeding without location');
//           setLocationLoading(false);
//           return;
//         }

//         // Only get location if permission is already granted
//         let location = await Location.getCurrentPositionAsync({});
//         setCustomerLocation(location.coords);
//       } catch (error) {
//         console.log('Location not available, proceeding without location:', error);
//         // Don't set error state - just continue without location
//       } finally {
//         setLocationLoading(false);
//       }
//     };

//     getLocation();
//   }, []);

//   // Initialize markedDates with today's date
//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     setMarkedDates({
//       [today]: {
//         selected: true,
//         selectedColor: '#2F4EAA',
//       }
//     });
//   }, []);

//   const handleDateSelect = (day) => {
//     const selectedDay = new Date(day.dateString);
//     setSelectedDate(selectedDay);
//     setShowCalendar(false);
//     setSelectedTimeSlot(null);
//     setMarkedDates({
//       [day.dateString]: {
//         selected: true,
//         selectedColor: '#2F4EAA',
//       }
//     });
//   };

//   useEffect(() => {
//     const fetchServicesByGender = async () => {
//       try {
//         const response = await axios.get(
//           `https://yaslaservice.com:81/services/filter-by-gender/?gender=${gender}`
//         );
//         setServicesData(response.data);
//         setSelectedCategory(null);
//         setSelectedService(null);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };
//     fetchServicesByGender();
//   }, [gender]);

//   const groupByCategory = (services) => {
//     return services.reduce((acc, service) => {
//       const category = service.category?.service_category_name || 'Other Services';
//       if (!acc[category]) {
//         acc[category] = [];
//       }
//       acc[category].push({
//         id: service.id,
//         name: service.service_name,
//         popular: service.popular,
//         category: category
//       });
//       return acc;
//     }, {});
//   };

//   const categorizedServices = groupByCategory(servicesData);

//   const [previouslyBookedSalons, setPreviouslyBookedSalons] = useState([]);
//   const [appointmentDetails, setAppointmentDetails] = useState({}); // Store appointment details for each salon

//   // Add this useEffect to fetch appointment history - ONLY CONFIRMED APPOINTMENTS
//   useEffect(() => {
//     const fetchAppointmentHistory = async () => {
//       try {
//         if (customerId) {
//           const response = await axios.get(
//             `https://yaslaservice.com:81/appointments/customer/${customerId}/`
//           );
          
//           console.log('Appointments response:', response.data);
          
//           if (response.data && Array.isArray(response.data)) {
//             // Filter only CONFIRMED appointments
//             const confirmedAppointments = response.data.filter(
//               appointment => appointment.status === "Confirmed"
//             );
            
//             console.log('Confirmed appointments:', confirmedAppointments);
            
//             // Extract unique salon IDs from CONFIRMED appointment history
//             const bookedSalonIds = [...new Set(confirmedAppointments
//               .filter(appointment => appointment.salon)
//               .map(appointment => appointment.salon)
//             )];
            
//             // Store appointment details for each salon (latest appointment)
//             const salonDetails = {};
//             confirmedAppointments.forEach(appointment => {
//               if (appointment.salon && !salonDetails[appointment.salon]) {
//                 salonDetails[appointment.salon] = {
//                   serviceNames: appointment.appointment_services?.map(service => service.service_name) || [],
//                   lastVisitDate: appointment.start_datetime,
//                   totalVisits: confirmedAppointments.filter(a => a.salon === appointment.salon).length
//                 };
//               }
//             });
            
//             console.log('Previously booked salon IDs:', bookedSalonIds);
//             console.log('Salon details:', salonDetails);
            
//             setPreviouslyBookedSalons(bookedSalonIds);
//             setAppointmentDetails(salonDetails);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching appointment history:', error);
//         setPreviouslyBookedSalons([]);
//         setAppointmentDetails({});
//       }
//     };

//     fetchAppointmentHistory();
//   }, [customerId]);

//   // Update the salon sorting logic in your existing useEffect
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const salonsResponse = await axios.get('https://yaslaservice.com:81/salons/');
//         const servicesResponse = await axios.get('https://yaslaservice.com:81/services/');

//         let salonsData = salonsResponse.data.data || [];

//         // Calculate distance if location is available
//         if (customerLocation) {
//           salonsData = salonsData.map(salon => {
//             if (salon.latitude && salon.longitude) {
//               const distance = calculateDistance(
//                 customerLocation.latitude,
//                 customerLocation.longitude,
//                 parseFloat(salon.latitude),
//                 parseFloat(salon.longitude)
//               );
//               return { ...salon, distance };
//             }
//             return { ...salon, distance: null };
//           });
//         }

//         // NEW: Prioritize salons based on booking history and favorites
//         const prioritizedSalons = salonsData.sort((a, b) => {
//           // Priority 1: Previously booked salons (CONFIRMED appointments only)
//           const aWasBooked = previouslyBookedSalons.includes(a.id);
//           const bWasBooked = previouslyBookedSalons.includes(b.id);
          
//           if (aWasBooked && !bWasBooked) return -1;
//           if (!aWasBooked && bWasBooked) return 1;
          
//           // If both were booked, sort by number of visits (more visits first)
//           if (aWasBooked && bWasBooked) {
//             const aVisits = appointmentDetails[a.id]?.totalVisits || 0;
//             const bVisits = appointmentDetails[b.id]?.totalVisits || 0;
//             if (aVisits !== bVisits) return bVisits - aVisits;
//           }
          
//           // Priority 2: Favorite salons
//           const aIsFavorite = favoriteSalons.includes(a.id);
//           const bIsFavorite = favoriteSalons.includes(b.id);
          
//           if (aIsFavorite && !bIsFavorite) return -1;
//           if (!aIsFavorite && bIsFavorite) return 1;
          
//           // Priority 3: Distance (only if location available)
//           if (customerLocation) {
//             if (a.distance === null && b.distance !== null) return 1;
//             if (a.distance !== null && b.distance === null) return -1;
//             if (a.distance !== null && b.distance !== null) {
//               return a.distance - b.distance;
//             }
//           }
          
//           // Priority 4: Alphabetical by name
//           return (a.salon_name || '').localeCompare(b.salon_name || '');
//         });

//         setAllSalons(prioritizedSalons);
//         setFilteredSalons(prioritizedSalons.slice(0, 5));

//         const allServices = servicesResponse.data.data || [];
//         const popularServices = allServices
//           .filter(service => service.popular === true)
//           .map(service => ({
//             id: service.id,
//             name: service.service_name,
//             category: service.gender_specific?.toLowerCase() || 'other',
//           }));
//         setMaleServicesDynamic(popularServices);

//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError(err);
//         setLoading(false);
//         Alert.alert("Error", "Failed to load data from server.");
//       }
//     };

//     fetchData();
//   }, [customerLocation, previouslyBookedSalons, favoriteSalons, appointmentDetails]); // Added dependencies

//   // Updated salon rendering with service names and badges
//   const renderSalonCard = (salon) => {
//     const wasPreviouslyBooked = previouslyBookedSalons.includes(salon.id);
//     const isFavorite = favoriteSalons.includes(salon.id);
//     const salonAppointmentDetails = appointmentDetails[salon.id];
    
//     return (
//       <TouchableOpacity
//         key={salon.id}
//         onPress={() => handleSalonPress(salon)}
//       >
//         <View style={styles.customSalonCard}>
//           <View style={styles.timelineWrapper}>
//             <FontAwesome 
//               name="clock-o" 
//               size={20} 
//               color={wasPreviouslyBooked ? "#2F4EAA" : "#333"} 
//             />
//           </View>
          
//           <View style={styles.leftSection}>
//             {/* Badge for previously booked salons */}
//             {wasPreviouslyBooked && (
//               <View style={styles.previouslyBookedBadge}>
//                 <Text style={styles.badgeText}>
//                   {salonAppointmentDetails?.totalVisits > 1 
//                     ? `Visited ${salonAppointmentDetails.totalVisits} times` 
//                     : 'Previously Booked'
//                   }
//                 </Text>
//               </View>
//             )}
            
//             <Text style={[
//               styles.salonName,
//               wasPreviouslyBooked && styles.previouslyBookedName
//             ]}>
//               {salon.salon_name}
//             </Text>
            
//             <Text style={styles.salonAddress}>
//               {[salon.locality, salon.city, salon.state]
//                 .filter(Boolean)
//                 .join(', ')}
//             </Text>
            
//             {/* Display service names for previously booked salons */}
//             {wasPreviouslyBooked && salonAppointmentDetails?.serviceNames && (
//               <View style={styles.servicesContainer}>
//                 <Text style={styles.servicesLabel}>Previous services: </Text>
//                 <Text style={styles.servicesText}>
//                   {salonAppointmentDetails.serviceNames.join(', ')}
//                 </Text>
//               </View>
//             )}
            
//             {salon.distance !== null && salon.distance !== undefined && (
//               <Text style={styles.distanceText}>
//                 {salon.distance < 1
//                   ? `${(salon.distance * 1000).toFixed(0)} m away`
//                   : `${salon.distance.toFixed(1)} km away`}
//               </Text>
//             )}
            
//             {/* Show priority indicators */}
//             <View style={styles.priorityIndicators}>
//               {wasPreviouslyBooked && (
//                 <Text style={styles.priorityText}>
//                   ★ Previously Visited {salonAppointmentDetails?.totalVisits > 1 && `(${salonAppointmentDetails.totalVisits} times)`}
//                 </Text>
//               )}
//               {isFavorite && !wasPreviouslyBooked && (
//                 <Text style={styles.priorityText}>❤️ Favorite</Text>
//               )}
//               {!wasPreviouslyBooked && !isFavorite && salon.distance !== null && (
//                 <Text style={styles.priorityText}>📍 Nearby</Text>
//               )}
//             </View>
//           </View>
          
//           <TouchableOpacity
//             onPress={() => {
//               if (handleGuestAction('favorite salon')) return;
//               toggleFavorite(salon.id);
//             }}
//           >
//             <FontAwesome
//               name={isFavorite ? 'heart' : 'heart-o'}
//               size={30}
//               color={isFavorite ? 'blue' : 'gray'}
//             />
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   useEffect(() => {
//     if (!Array.isArray(allSalons)) return;

//     if (searchQuery.length > 0) {
//       const query = searchQuery.toLowerCase().trim();
//       const filtered = allSalons.filter(salon => {
//         const nameMatch = salon.salon_name?.toLowerCase().includes(query);
//         const cityMatch = salon.city?.toLowerCase().includes(query);
//         const localityMatch = salon.locality?.toLowerCase().includes(query);
//         const stateMatch = salon.state?.toLowerCase().includes(query);
//         return nameMatch || cityMatch || localityMatch || stateMatch;
//       });

//       setFilteredSalons(filtered);

//       const suggestions = filtered.map(salon => ({
//         id: salon.id,
//         name: salon.salon_name,
//         city: salon.city,
//         locality: salon.locality,
//         state: salon.state,
//         displayText: [
//           salon.salon_name,
//           salon.locality,
//           salon.city,
//           salon.state
//         ].filter(Boolean).join(', ')
//       }));

//       setLocationSuggestions(suggestions);
//       setShowSuggestions(suggestions.length > 0);
//     } else {
//       setShowSuggestions(false);
//       setFilteredSalons(allSalons.slice(0, 3));
//     }
//   }, [searchQuery, allSalons]);

//   useEffect(() => {
//     const loadFavorites = async () => {
//       try {
//         if (customerId) {
//           console.log('Loading favorites for customer:', customerId);
//           const response = await axios.get(
//             `https://yaslaservice.com:81/customer/${customerId}/favorites/`
//           );

//           console.log('Favorites API response:', JSON.stringify(response.data));

//           let favoriteSalonIds = [];

//           if (Array.isArray(response.data)) {
//             favoriteSalonIds = response.data;
//           } else if (response.data && Array.isArray(response.data.salon_id)) {
//             favoriteSalonIds = response.data.salon_id;
//           } else if (response.data && response.data.favorites) {
//             favoriteSalonIds = response.data.favorites.map(fav => fav.salon_id || fav.id);
//           }

//           console.log('Extracted favorite salon IDs:', favoriteSalonIds);
//           setFavoriteSalons(favoriteSalonIds);
//         }
//       } catch (error) {
//         console.error('Error loading favorites:', error);
//         setFavoriteSalons([]);
//       }
//     };

//     loadFavorites();
//   }, [customerId]);

//   const toggleFavorite = async (salonId) => {
//     try {
//       const isCurrentlyFavorite = favoriteSalons.includes(salonId);
//       let updatedFavorites;

//       if (isCurrentlyFavorite) {
//         updatedFavorites = favoriteSalons.filter(id => id !== salonId);
//         setFavoriteSalons(updatedFavorites);

//         const response = await axios.delete(
//           `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
//           {
//             data: {
//               salon_id: [salonId]
//             }
//           }
//         );

//         console.log('Favorite removal successful:', response.data);
//       } else {
//         updatedFavorites = [...favoriteSalons, salonId];
//         setFavoriteSalons(updatedFavorites);

//         const response = await axios.post(
//           `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
//           {
//             salon_id: updatedFavorites
//           }
//         );

//         console.log('Favorite addition successful:', response.data);
//       }

//     } catch (error) {
//       console.error('Error updating favorites:', error);
//       setFavoriteSalons(prev =>
//         prev.includes(salonId)
//           ? prev.filter(id => id !== salonId)
//           : [...prev, salonId]
//       );

//       Alert.alert("Error", "Failed to update favorites. Please try again.");
//     }
//   };

//   // FIXED: Handle guest authentication properly
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
//               navigation.navigate('Login'); // <-- Navigate to Login
//             }
//           },
//         ]
//       );
//       return true;
//     }
//     return false;
//   };

//   const toggleServiceSelection = (service) => {
//     // if (handleGuestAction('select service')) return;

//     setSelectedService(prev =>
//       prev && prev.id === service.id ? null : service
//     );
//     setSelectedServices(prev => {
//       if (prev.some(s => s.id === service.id)) {
//         return prev.filter(s => s.id !== service.id);
//       } else {
//         return [...prev, service];
//       }
//     });
//   };

//   const selectTimeSlot = (slot) => {
//     // if (handleGuestAction('select time slot')) return;

//     setSelectedTimeSlot(slot);
//   };

//   const handleSalonPress = (salon) => {
//     // if (handleGuestAction('view salon details')) return;

//     navigation.navigate('SalonServices', {
//       salonId: salon.id,
//       salonName: salon.salon_name,
//       city: salon.city,
//       SalonPhoneNumber: salon.phone || '',
//       SalonLatitude: salon.latitude || '',
//       SalonLongitude: salon.longitude || '',
//     });
//   };

//   const isServiceSelected = (service) => {
//     return selectedServices.some(s => s.id === service.id);
//   };

//   const handleContinue = () => {
//     if (selectedServices.length === 0) {
//       return Alert.alert("Please select at least one service");
//     }
//     if (!selectedTimeSlot) {
//       return Alert.alert("Please select a time slot");
//     }
//     navigation.navigate('SalonSelectionScreen', {
//       selectedServices,
//       selectedTimeSlot,
//       selectedDate: selectedDate.toISOString().split('T')[0],
//     });
//   };

//   if (loading || locationLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#2F4EAA" />
//         <Text style={styles.loadingText}>Fetching salons and services...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={[]}
//         keyExtractor={(item, index) => index.toString()}
//         ListHeaderComponent={
//           <View style={styles.scrollContent}>
//             {/* Search Section */}
//             <View style={styles.searchContainer}>
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search by salon name, city, locality or state"
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//               />
//             </View>

//             {/* Salon List */}
//             {filteredSalons.length > 0 ? (
//               filteredSalons.map(renderSalonCard)
//             ) : (
//               <Text style={styles.noResultsText}>
//                 {searchQuery.length > 0
//                   ? "No salons found matching your search"
//                   : "Loading salons..."}
//               </Text>
//             )}

//             {/* Services Header */}
//             <View style={styles.servicesHeaderRow}>
//               <Text style={styles.sectionTitle}>Services for you</Text>
//               <View style={styles.genderToggleRow}>
//                 <CheckBox
//                   title="Male"
//                   checked={gender === 'male'}
//                   onPress={() => setGender('male')}
//                   containerStyle={styles.checkboxInline}
//                   textStyle={styles.checkboxText}
//                   checkedColor="#2F4EAA"
//                 />
//                 <CheckBox
//                   title="Female"
//                   checked={gender === 'female'}
//                   onPress={() => setGender('female')}
//                   containerStyle={styles.checkboxInline}
//                   textStyle={styles.checkboxText}
//                   checkedColor="#2F4EAA"
//                 />
//               </View>
//             </View>

//             {/* Popular Services */}
//             <Text style={styles.sectionTitle}>Popular</Text>
//             <FlatList
//               data={maleServicesDynamic}
//               numColumns={2}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.serviceBox,
//                     isServiceSelected(item) && styles.selectedServiceBox,
//                   ]}
//                   onPress={() => toggleServiceSelection(item)}
//                 >
//                   <Text style={[styles.serviceText, { color: '#2F4EAA' }]}>
//                     {item.name}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               columnWrapperStyle={styles.serviceRow}
//               scrollEnabled={false}
//             />

//             {/* Categories Section */}
//             <Text style={styles.sectionTitle}>Categories</Text>
//             <View style={styles.categoriesContainer}>
//               <TouchableOpacity
//                 style={styles.scrollArrow}
//                 onPress={() => categoriesListRef.current?.scrollToOffset({ offset: 0, animated: true })}
//               >
//                 <FontAwesome name="chevron-left" size={20} color="#2F4EAA" />
//               </TouchableOpacity>

//               <FlatList
//                 ref={categoriesListRef}
//                 data={Object.keys(categorizedServices)}
//                 horizontal
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={[
//                       styles.categoryButton,
//                       selectedCategory === item && styles.selectedCategoryButton,
//                     ]}
//                     onPress={() => setSelectedCategory(item)}
//                   >
//                     <Text style={[
//                       styles.categoryButtonText,
//                       selectedCategory === item && styles.selectedCategoryButtonText,
//                       { color: "#2F4EAA" }
//                     ]}>
//                       {item}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={{ paddingVertical: 5 }}
//               />

//               <TouchableOpacity
//                 style={styles.scrollArrow}
//                 onPress={() => {
//                   categoriesListRef.current?.scrollToEnd({ animated: true });
//                 }}
//               >
//                 <FontAwesome name="chevron-right" size={20} color="#2F4EAA" />
//               </TouchableOpacity>
//             </View>

//             {/* Services for Selected Category - UPDATED VERTICAL LAYOUT */}
//             {selectedCategory && (
//               <View style={styles.selectedCategoryContainer}>
//                 <View style={styles.categoryHeader}>
//                   <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
//                   <TouchableOpacity onPress={() => setSelectedCategory(null)}>
//                     <FontAwesome name="times-circle" size={20} color="#999" />
//                   </TouchableOpacity>
//                 </View>

//                 {/* Vertical Services List */}
//                 <View style={styles.verticalServicesContainer}>
//                   {categorizedServices[selectedCategory]?.map((service) => (
//                     <TouchableOpacity
//                       key={service.id}
//                       style={[
//                         styles.serviceItemVertical,
//                         isServiceSelected(service) && styles.selectedServiceItemVertical,
//                       ]}
//                       onPress={() => toggleServiceSelection(service)}
//                     >
//                       <Text style={[
//                         styles.serviceTextVertical,
//                         isServiceSelected(service) && styles.selectedServiceTextVertical,
//                       ]}>
//                         {service.name}
//                       </Text>
//                       <View style={[
//                         styles.serviceCheckbox,
//                         isServiceSelected(service) && styles.selectedServiceCheckbox,
//                       ]}>
//                         {isServiceSelected(service) && (
//                           <FontAwesome name="check" size={14} color="#fff" />
//                         )}
//                       </View>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>
//             )}

//             {/* Date and Time Slots Section */}
//             {selectedService && (
//               <View style={styles.timeSlotsContainer}>
//                 <Text style={styles.sectionTitle}>Select Date</Text>
//                 <TouchableOpacity
//                   style={styles.dateSelector}
//                   onPress={() => setShowCalendar(!showCalendar)}
//                 >
//                   <FontAwesome name="calendar" size={20} color="#2F4EAA" />
//                   <Text style={styles.dateText}>
//                     {new Date(selectedDate).toLocaleDateString('en-US', {
//                       weekday: 'long',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </Text>
//                 </TouchableOpacity>

//                 {showCalendar && (
//                   <View style={styles.calendarContainer}>
//                     <Calendar
//                       current={selectedDate.toISOString().split('T')[0]}
//                       minDate={new Date().toISOString().split('T')[0]}
//                       onDayPress={handleDateSelect}
//                       markedDates={markedDates}
//                       theme={{
//                         selectedDayBackgroundColor: '#2F4EAA',
//                         todayTextColor: '#2F4EAA',
//                         arrowColor: '#2F4EAA',
//                       }}
//                     />
//                   </View>
//                 )}

//                 <Text style={styles.sectionTitle}>Available Time Slots</Text>
//                 {groupedTimeSlots.map((row, rowIndex) => (
//                   <View key={rowIndex} style={styles.timeSlotRow}>
//                     {row.map((slot, slotIndex) => {
//                       const isPast = isTimeSlotInPast(slot, selectedDate);
//                       return (
//                         <TouchableOpacity
//                           key={slotIndex}
//                           style={[
//                             styles.timeSlotButton,
//                             selectedTimeSlot === slot && styles.selectedTimeSlot,
//                             isPast && styles.disabledTimeSlot,
//                           ]}
//                           onPress={() => !isPast && selectTimeSlot(slot)}
//                           disabled={isPast}
//                         >
//                           <Text style={[
//                             styles.timeSlotText,
//                             selectedTimeSlot === slot && styles.selectedTimeSlotText,
//                             isPast && styles.disabledTimeSlotText,
//                           ]}>
//                             {slot}
//                           </Text>
//                         </TouchableOpacity>
//                       );
//                     })}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         }
//       />

//       {selectedServices.length > 0 && selectedTimeSlot && (
//         <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//           <Text style={styles.continueButtonText}>
//             {selectedServices.length} service(s) • {selectedTimeSlot} • Continue
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default CScreen1;

//==============================================================
// Below code is with the Filtering added for the Popular Services


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import * as Location from 'expo-location';
import styles from './CScreen1.styles.js';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const CScreen1 = () => {
  // All state hooks at the top
  const { customer, logout } = useAuth();
  const customerId = customer?.data?.customer_id;
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedServices, setSelectedServices] = useState([]);
  const categoriesListRef = useRef(null);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [favoriteSalons, setFavoriteSalons] = useState([]);
  const [maleServicesDynamic, setMaleServicesDynamic] = useState([]);
  const [allSalons, setAllSalons] = useState([]);
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOption, setFilterOption] = useState('name');
  const [servicesData, setServicesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [customerLocation, setCustomerLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const timeSlots = [
    "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
  ];

  const groupedTimeSlots = [];
  for (let i = 0; i < timeSlots.length; i += 3) {
    groupedTimeSlots.push(timeSlots.slice(i, i + 3));
  }

  const isTimeSlotInPast = (timeSlot, selectedDate) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

    if (selectedDay.getTime() === today.getTime()) {
      const [time, modifier] = timeSlot.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      const slotTime = new Date(now);
      slotTime.setHours(hours, minutes, 0, 0);

      const slotAvailableUntil = new Date(slotTime.getTime() + 9 * 60 * 1000);

      return now > slotAvailableUntil;
    }

    return selectedDay < today;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // Get customer's current location
  useEffect(() => {
    const getLocation = async () => {
      try {
        setLocationLoading(true);
        
        // First, check if permission is already granted
        let { status } = await Location.getPermissionsAsync();
        
        // If not granted, don't request - just proceed without location
        if (status !== 'granted') {
          console.log('Location permission not granted, proceeding without location');
          setLocationLoading(false);
          return;
        }

        // Only get location if permission is already granted
        let location = await Location.getCurrentPositionAsync({});
        setCustomerLocation(location.coords);
      } catch (error) {
        console.log('Location not available, proceeding without location:', error);
        // Don't set error state - just continue without location
      } finally {
        setLocationLoading(false);
      }
    };

    getLocation();
  }, []);

  // Initialize markedDates with today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMarkedDates({
      [today]: {
        selected: true,
        selectedColor: '#2F4EAA',
      }
    });
  }, []);

  const handleDateSelect = (day) => {
    const selectedDay = new Date(day.dateString);
    setSelectedDate(selectedDay);
    setShowCalendar(false);
    setSelectedTimeSlot(null);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        selectedColor: '#2F4EAA',
      }
    });
  };

  // Filter services based on gender - BOTH CATEGORIES AND POPULAR SERVICES
  const filterServicesByGender = (services, selectedGender) => {
    return services.filter(service => {
      const serviceGender = service.gender_specific?.toLowerCase();
      
      if (selectedGender === 'male') {
        return serviceGender === 'male' || serviceGender === 'unisex';
      } else if (selectedGender === 'female') {
        return serviceGender === 'female' || serviceGender === 'unisex';
      }
      
      return true;
    });
  };

  // Fetch all services and filter by gender for both categories and popular
  const fetchAllServices = async () => {
    try {
      const response = await axios.get('https://yaslaservice.com:81/services/');
      const allServices = response.data.data || [];
      
      // Filter services by selected gender for categories
      const genderFilteredServices = filterServicesByGender(allServices, gender);
      setServicesData(genderFilteredServices);
      
      // Filter popular services by selected gender
      const popularServices = allServices
        .filter(service => service.popular === true)
        .filter(service => {
          const serviceGender = service.gender_specific?.toLowerCase();
          if (gender === 'male') {
            return serviceGender === 'male' || serviceGender === 'unisex';
          } else if (gender === 'female') {
            return serviceGender === 'female' || serviceGender === 'unisex';
          }
          return true;
        })
        .map(service => ({
          id: service.id,
          name: service.service_name,
          category: service.gender_specific?.toLowerCase() || 'other',
        }));
      
      setMaleServicesDynamic(popularServices);
      setSelectedCategory(null);
      setSelectedService(null);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, [gender]); // Re-fetch when gender changes

  const groupByCategory = (services) => {
    return services.reduce((acc, service) => {
      const category = service.category?.service_category_name || 'Other Services';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        id: service.id,
        name: service.service_name,
        popular: service.popular,
        category: category
      });
      return acc;
    }, {});
  };

  const categorizedServices = groupByCategory(servicesData);

  const [previouslyBookedSalons, setPreviouslyBookedSalons] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState({}); // Store appointment details for each salon

  // Add this useEffect to fetch appointment history - ONLY CONFIRMED APPOINTMENTS
  const fetchAppointmentHistory = async () => {
    try {
      if (customerId) {
        const response = await axios.get(
          `https://yaslaservice.com:81/appointments/customer/${customerId}/`
        );
        
        console.log('Appointments response:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          // Filter only CONFIRMED appointments
          const confirmedAppointments = response.data.filter(
            appointment => appointment.status === "Confirmed"
          );
          
          console.log('Confirmed appointments:', confirmedAppointments);
          
          // Extract unique salon IDs from CONFIRMED appointment history
          const bookedSalonIds = [...new Set(confirmedAppointments
            .filter(appointment => appointment.salon)
            .map(appointment => appointment.salon)
          )];
          
          // Store appointment details for each salon (latest appointment)
          const salonDetails = {};
          confirmedAppointments.forEach(appointment => {
            if (appointment.salon && !salonDetails[appointment.salon]) {
              salonDetails[appointment.salon] = {
                serviceNames: appointment.appointment_services?.map(service => service.service_name) || [],
                lastVisitDate: appointment.start_datetime,
                totalVisits: confirmedAppointments.filter(a => a.salon === appointment.salon).length
              };
            }
          });
          
          console.log('Previously booked salon IDs:', bookedSalonIds);
          console.log('Salon details:', salonDetails);
          
          setPreviouslyBookedSalons(bookedSalonIds);
          setAppointmentDetails(salonDetails);
        }
      }
    } catch (error) {
      console.error('Error fetching appointment history:', error);
      setPreviouslyBookedSalons([]);
      setAppointmentDetails({});
    }
  };

  useEffect(() => {
    fetchAppointmentHistory();
  }, [customerId]);

  // Main data fetching function for salons
  const fetchSalonsData = async () => {
    try {
      setLoading(true);
      const salonsResponse = await axios.get('https://yaslaservice.com:81/salons/');

      let salonsData = salonsResponse.data.data || [];
        // FILTER: Only show salons with salon_status as "Online"
      salonsData = salonsData.filter(salon => 
        salon.salon_status === "Online"
      );

      console.log(`Filtered to ${salonsData.length} online salons`);

      // Calculate distance if location is available
      if (customerLocation) {
        salonsData = salonsData.map(salon => {
          if (salon.latitude && salon.longitude) {
            const distance = calculateDistance(
              customerLocation.latitude,
              customerLocation.longitude,
              parseFloat(salon.latitude),
              parseFloat(salon.longitude)
            );
            return { ...salon, distance };
          }
          return { ...salon, distance: null };
        });
      }

      // NEW: Prioritize salons based on booking history and favorites
      const prioritizedSalons = salonsData.sort((a, b) => {
        // Priority 1: Previously booked salons (CONFIRMED appointments only)
        const aWasBooked = previouslyBookedSalons.includes(a.id);
        const bWasBooked = previouslyBookedSalons.includes(b.id);
        
        if (aWasBooked && !bWasBooked) return -1;
        if (!aWasBooked && bWasBooked) return 1;
        
        // If both were booked, sort by number of visits (more visits first)
        if (aWasBooked && bWasBooked) {
          const aVisits = appointmentDetails[a.id]?.totalVisits || 0;
          const bVisits = appointmentDetails[b.id]?.totalVisits || 0;
          if (aVisits !== bVisits) return bVisits - aVisits;
        }
        
        // Priority 2: Favorite salons
        const aIsFavorite = favoriteSalons.includes(a.id);
        const bIsFavorite = favoriteSalons.includes(b.id);
        
        if (aIsFavorite && !bIsFavorite) return -1;
        if (!aIsFavorite && bIsFavorite) return 1;
        
        // Priority 3: Distance (only if location available)
        if (customerLocation) {
          if (a.distance === null && b.distance !== null) return 1;
          if (a.distance !== null && b.distance === null) return -1;
          if (a.distance !== null && b.distance !== null) {
            return a.distance - b.distance;
          }
        }
        
        // Priority 4: Alphabetical by name
        return (a.salon_name || '').localeCompare(b.salon_name || '');
      });

      setAllSalons(prioritizedSalons);
      setFilteredSalons(prioritizedSalons.slice(0, 5));

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
      setLoading(false);
      Alert.alert("Error", "Failed to load data from server.");
    }
  };

  // Update the salon sorting logic in your existing useEffect
  useEffect(() => {
    fetchSalonsData();
  }, [customerLocation, previouslyBookedSalons, favoriteSalons, appointmentDetails]); // Added dependencies

  // Load favorites
  const loadFavorites = async () => {
    try {
      if (customerId) {
        console.log('Loading favorites for customer:', customerId);
        const response = await axios.get(
          `https://yaslaservice.com:81/customer/${customerId}/favorites/`
        );

        console.log('Favorites API response:', JSON.stringify(response.data));

        let favoriteSalonIds = [];

        if (Array.isArray(response.data)) {
          favoriteSalonIds = response.data;
        } else if (response.data && Array.isArray(response.data.salon_id)) {
          favoriteSalonIds = response.data.salon_id;
        } else if (response.data && response.data.favorites) {
          favoriteSalonIds = response.data.favorites.map(fav => fav.salon_id || fav.id);
        }

        console.log('Extracted favorite salon IDs:', favoriteSalonIds);
        setFavoriteSalons(favoriteSalonIds);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavoriteSalons([]);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [customerId]);

  // Updated salon rendering with service names and badges
  const renderSalonCard = (salon) => {
    const wasPreviouslyBooked = previouslyBookedSalons.includes(salon.id);
    const isFavorite = favoriteSalons.includes(salon.id);
    const salonAppointmentDetails = appointmentDetails[salon.id];
    
    return (
      <TouchableOpacity
        key={salon.id}
        onPress={() => handleSalonPress(salon)}
      >
        <View style={styles.customSalonCard}>
          <View style={styles.timelineWrapper}>
            <FontAwesome 
              name="clock-o" 
              size={20} 
              color={wasPreviouslyBooked ? "#2F4EAA" : "#333"} 
            />
          </View>
          
          <View style={styles.leftSection}>
            {/* Badge for previously booked salons */}
            {wasPreviouslyBooked && (
              <View style={styles.previouslyBookedBadge}>
                <Text style={styles.badgeText}>
                  {salonAppointmentDetails?.totalVisits > 1 
                    ? `Visited ${salonAppointmentDetails.totalVisits} times` 
                    : 'Previously Booked'
                  }
                </Text>
              </View>
            )}
            
            <Text style={[
              styles.salonName,
              wasPreviouslyBooked && styles.previouslyBookedName
            ]}>
              {salon.salon_name}
            </Text>
            
            <Text style={styles.salonAddress}>
              {[salon.locality, salon.city, salon.state]
                .filter(Boolean)
                .join(', ')}
            </Text>
            
            {/* Display service names for previously booked salons */}
            {wasPreviouslyBooked && salonAppointmentDetails?.serviceNames && (
              <View style={styles.servicesContainer}>
                <Text style={styles.servicesLabel}>Previous services: </Text>
                <Text style={styles.servicesText}>
                  {salonAppointmentDetails.serviceNames.join(', ')}
                </Text>
              </View>
            )}
            
            {salon.distance !== null && salon.distance !== undefined && (
              <Text style={styles.distanceText}>
                {salon.distance < 1
                  ? `${(salon.distance * 1000).toFixed(0)} m away`
                  : `${salon.distance.toFixed(1)} km away`}
              </Text>
            )}
            
            {/* Show priority indicators */}
            <View style={styles.priorityIndicators}>
              {wasPreviouslyBooked && (
                <Text style={styles.priorityText}>
                  ★ Previously Visited {salonAppointmentDetails?.totalVisits > 1 && `(${salonAppointmentDetails.totalVisits} times)`}
                </Text>
              )}
              {isFavorite && !wasPreviouslyBooked && (
                <Text style={styles.priorityText}>❤️ Favorite</Text>
              )}
              {!wasPreviouslyBooked && !isFavorite && salon.distance !== null && (
                <Text style={styles.priorityText}>📍 Nearby</Text>
              )}
                {/* Show Online Status Badge */}
              {/* <View style={[
                styles.onlineStatusBadge,
                salon.salon_status === "Online" ? styles.onlineBadge : styles.offlineBadge
              ]}>
                <Text style={styles.onlineStatusText}>
                  {salon.salon_status === "Online" ? "🟢 Online" : "🔴 Offline"}
                </Text>
              </View> */}
            </View>
          </View>
          
          <TouchableOpacity
            onPress={() => {
              if (handleGuestAction('favorite salon')) return;
              toggleFavorite(salon.id);
            }}
          >
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={30}
              color={isFavorite ? 'blue' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!Array.isArray(allSalons)) return;

    if (searchQuery.length > 0) {
      const query = searchQuery.toLowerCase().trim();
      const filtered = allSalons.filter(salon => {
        const nameMatch = salon.salon_name?.toLowerCase().includes(query);
        const cityMatch = salon.city?.toLowerCase().includes(query);
        const localityMatch = salon.locality?.toLowerCase().includes(query);
        const stateMatch = salon.state?.toLowerCase().includes(query);
        return nameMatch || cityMatch || localityMatch || stateMatch;
      });

      setFilteredSalons(filtered);

      const suggestions = filtered.map(salon => ({
        id: salon.id,
        name: salon.salon_name,
        city: salon.city,
        locality: salon.locality,
        state: salon.state,
        displayText: [
          salon.salon_name,
          salon.locality,
          salon.city,
          salon.state
        ].filter(Boolean).join(', ')
      }));

      setLocationSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSalons(allSalons.slice(0, 3));
    }
  }, [searchQuery, allSalons]);

  const toggleFavorite = async (salonId) => {
    try {
      const isCurrentlyFavorite = favoriteSalons.includes(salonId);
      let updatedFavorites;

      if (isCurrentlyFavorite) {
        updatedFavorites = favoriteSalons.filter(id => id !== salonId);
        setFavoriteSalons(updatedFavorites);

        const response = await axios.delete(
          `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
          {
            data: {
              salon_id: [salonId]
            }
          }
        );

        console.log('Favorite removal successful:', response.data);
      } else {
        updatedFavorites = [...favoriteSalons, salonId];
        setFavoriteSalons(updatedFavorites);

        const response = await axios.post(
          `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
          {
            salon_id: updatedFavorites
          }
        );

        console.log('Favorite addition successful:', response.data);
      }

    } catch (error) {
      console.error('Error updating favorites:', error);
      setFavoriteSalons(prev =>
        prev.includes(salonId)
          ? prev.filter(id => id !== salonId)
          : [...prev, salonId]
      );

      Alert.alert("Error", "Failed to update favorites. Please try again.");
    }
  };

  // FIXED: Handle guest authentication properly
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
              navigation.navigate('Login'); // <-- Navigate to Login
            }
          },
        ]
      );
      return true;
    }
    return false;
  };

  const toggleServiceSelection = (service) => {
    // if (handleGuestAction('select service')) return;

    setSelectedService(prev =>
      prev && prev.id === service.id ? null : service
    );
    setSelectedServices(prev => {
      if (prev.some(s => s.id === service.id)) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const selectTimeSlot = (slot) => {
    // if (handleGuestAction('select time slot')) return;

    setSelectedTimeSlot(slot);
  };

  const handleSalonPress = (salon) => {
    // if (handleGuestAction('view salon details')) return;

    navigation.navigate('SalonServices', {
      salonId: salon.id,
      salonName: salon.salon_name,
      city: salon.city,
      SalonPhoneNumber: salon.phone || '',
      SalonLatitude: salon.latitude || '',
      SalonLongitude: salon.longitude || '',
     salonStatus: salon.salon_status || 'Online'

      
    });
  };

  const isServiceSelected = (service) => {
    return selectedServices.some(s => s.id === service.id);
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      return Alert.alert("Please select at least one service");
    }
    if (!selectedTimeSlot) {
      return Alert.alert("Please select a time slot");
    }
    navigation.navigate('SalonSelectionScreen', {
      selectedServices,
      selectedTimeSlot,
      selectedDate: selectedDate.toISOString().split('T')[0],
    });
  };

  // Pull to refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Fetch all data that needs to be refreshed
      await Promise.all([
        fetchSalonsData(),
        fetchAllServices(),
        fetchAppointmentHistory(),
        loadFavorites()
      ]);
      
      console.log('Pull to refresh completed successfully');
    } catch (error) {
      console.error('Error during refresh:', error);
      Alert.alert("Error", "Failed to refresh data. Please try again.");
    } finally {
      setRefreshing(false);
    }
  }, [customerId, customerLocation, gender]);

  if (loading || locationLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2F4EAA" />
        <Text style={styles.loadingText}>Fetching salons and services...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2F4EAA"]}
            tintColor="#2F4EAA"
            title="Pull to refresh"
            titleColor="#2F4EAA"
          />
        }
        ListHeaderComponent={
          <View style={styles.scrollContent}>
            {/* Search Section */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by salon name, city, locality or state"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Salon List */}
            {filteredSalons.length > 0 ? (
              filteredSalons.map(renderSalonCard)
            ) : (
              <Text style={styles.noResultsText}>
                {searchQuery.length > 0
                  ? "No salons found matching your search"
                  : "No online salons available at the moment"}
              </Text>
            )}

            {/* Services Header */}
            <View style={styles.servicesHeaderRow}>
              <Text style={styles.sectionTitle}>Services for you</Text>
              <View style={styles.genderToggleRow}>
                <CheckBox
                  title="Male"
                  checked={gender === 'male'}
                  onPress={() => setGender('male')}
                  containerStyle={styles.checkboxInline}
                  textStyle={styles.checkboxText}
                  checkedColor="#2F4EAA"
                />
                <CheckBox
                  title="Female"
                  checked={gender === 'female'}
                  onPress={() => setGender('female')}
                  containerStyle={styles.checkboxInline}
                  textStyle={styles.checkboxText}
                  checkedColor="#2F4EAA"
                />
              </View>
            </View>

            {/* Popular Services */}
            <Text style={styles.sectionTitle}>Popular</Text>
            {maleServicesDynamic.length > 0 ? (
              <FlatList
                data={maleServicesDynamic}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.serviceBox,
                      isServiceSelected(item) && styles.selectedServiceBox,
                    ]}
                    onPress={() => toggleServiceSelection(item)}
                  >
                    <Text style={[styles.serviceText, { color: '#2F4EAA' }]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                columnWrapperStyle={styles.serviceRow}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.noServicesText}>
                No popular services available for {gender}
              </Text>
            )}

            {/* Categories Section */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesContainer}>
              <TouchableOpacity
                style={styles.scrollArrow}
                onPress={() => categoriesListRef.current?.scrollToOffset({ offset: 0, animated: true })}
              >
                <FontAwesome name="chevron-left" size={20} color="#2F4EAA" />
              </TouchableOpacity>

              <FlatList
                ref={categoriesListRef}
                data={Object.keys(categorizedServices)}
                horizontal
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      selectedCategory === item && styles.selectedCategoryButton,
                    ]}
                    onPress={() => setSelectedCategory(item)}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      selectedCategory === item && styles.selectedCategoryButtonText,
                      { color: "#2F4EAA" }
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5 }}
              />

              <TouchableOpacity
                style={styles.scrollArrow}
                onPress={() => {
                  categoriesListRef.current?.scrollToEnd({ animated: true });
                }}
              >
                <FontAwesome name="chevron-right" size={20} color="#2F4EAA" />
              </TouchableOpacity>
            </View>

            {/* Services for Selected Category - UPDATED VERTICAL LAYOUT */}
            {selectedCategory && (
              <View style={styles.selectedCategoryContainer}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
                  <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                    <FontAwesome name="times-circle" size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                {/* Vertical Services List */}
                <View style={styles.verticalServicesContainer}>
                  {categorizedServices[selectedCategory]?.map((service) => (
                    <TouchableOpacity
                      key={service.id}
                      style={[
                        styles.serviceItemVertical,
                        isServiceSelected(service) && styles.selectedServiceItemVertical,
                      ]}
                      onPress={() => toggleServiceSelection(service)}
                    >
                      <Text style={[
                        styles.serviceTextVertical,
                        isServiceSelected(service) && styles.selectedServiceTextVertical,
                      ]}>
                        {service.name}
                      </Text>
                      <View style={[
                        styles.serviceCheckbox,
                        isServiceSelected(service) && styles.selectedServiceCheckbox,
                      ]}>
                        {isServiceSelected(service) && (
                          <FontAwesome name="check" size={14} color="#fff" />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Date and Time Slots Section */}
            {selectedService && (
              <View style={styles.timeSlotsContainer}>
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
                      current={selectedDate.toISOString().split('T')[0]}
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

                <Text style={styles.sectionTitle}>Available Time Slots</Text>
                {groupedTimeSlots.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.timeSlotRow}>
                    {row.map((slot, slotIndex) => {
                      const isPast = isTimeSlotInPast(slot, selectedDate);
                      return (
                        <TouchableOpacity
                          key={slotIndex}
                          style={[
                            styles.timeSlotButton,
                            selectedTimeSlot === slot && styles.selectedTimeSlot,
                            isPast && styles.disabledTimeSlot,
                          ]}
                          onPress={() => !isPast && selectTimeSlot(slot)}
                          disabled={isPast}
                        >
                          <Text style={[
                            styles.timeSlotText,
                            selectedTimeSlot === slot && styles.selectedTimeSlotText,
                            isPast && styles.disabledTimeSlotText,
                          ]}>
                            {slot}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            )}
          </View>
        }
      />

      {selectedServices.length > 0 && selectedTimeSlot && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            {selectedServices.length} service(s) • {selectedTimeSlot} • Continue
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CScreen1;