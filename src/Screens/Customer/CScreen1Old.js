// import React, { useState, useEffect } from 'react';
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
//   const { customer } = useAuth();
//   const customerId = customer?.data?.customer_id;
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [gender, setGender] = useState('male');
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
//       "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"

//   ];

//   const groupedTimeSlots = [];
//   for (let i = 0; i < timeSlots.length; i += 3) {
//     groupedTimeSlots.push(timeSlots.slice(i, i + 3));
//   }

//   // Helper function to calculate distance between two coordinates
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Earth's radius in kilometers
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     const distance = R * c; // Distance in km
//     return distance;
//   };

//   // Get customer's current location
//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         setLocationLoading(true);
//         let { status } = await Location.requestForegroundPermissionsAsync();
        
//         if (status !== 'granted') {
//           setError('Permission to access location was denied');
//           setLocationLoading(false);
//           return;
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         setCustomerLocation(location.coords);
//       } catch (error) {
//         console.error('Error getting location:', error);
//         setError('Unable to get your current location');
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
//         selectedColor: '#FF6B6B',
//       }
//     });
//   }, []);

//   const handleDateSelect = (day) => {
//     const selectedDay = new Date(day.dateString);
//     setSelectedDate(selectedDay);
//     setShowCalendar(false);
//     setMarkedDates({
//       [day.dateString]: {
//         selected: true,
//         selectedColor: '#FF6B6B',
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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const salonsResponse = await axios.get('https://yaslaservice.com:81/salons/');
//         const servicesResponse = await axios.get('https://yaslaservice.com:81/services/');
        
//         let salonsData = salonsResponse.data.data || [];
        
//         // Add distance to each salon if we have customer location
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
          
//           // Sort salons by distance (nearest first)
//           salonsData.sort((a, b) => {
//             if (a.distance === null) return 1;
//             if (b.distance === null) return -1;
//             return a.distance - b.distance;
//           });
//         }
        
//         setAllSalons(salonsData);
//         setFilteredSalons(salonsData.slice(0, 5));

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
    
//     // Only fetch data if we have customer location or if location is not available
//     if (customerLocation !== null || !locationLoading) {
//       fetchData();
//     }
//   }, [customerLocation, locationLoading]);

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
          
//           // Check different possible response formats
//           let favoriteSalonIds = [];
          
//           if (Array.isArray(response.data)) {
//             // If response is directly an array of salon IDs
//             favoriteSalonIds = response.data;
//           } else if (response.data && Array.isArray(response.data.salon_id)) {
//             // If response has salon_id array
//             favoriteSalonIds = response.data.salon_id;
//           } else if (response.data && response.data.favorites) {
//             // If response has favorites array with salon objects
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
//         // Remove from favorites - use DELETE request
//         updatedFavorites = favoriteSalons.filter(id => id !== salonId);
        
//         // Update local state immediately
//         setFavoriteSalons(updatedFavorites);
        
//         // Make DELETE API call
//         const response = await axios.delete(
//           `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
//           {
//             data: {
//               salon_id: [salonId] // Send only the salon ID to remove
//             }
//           }
//         );
        
//         console.log('Favorite removal successful:', response.data);
//       } else {
//         // Add to favorites - use POST request
//         updatedFavorites = [...favoriteSalons, salonId];
        
//         // Update local state immediately
//         setFavoriteSalons(updatedFavorites);
        
//         // Make POST API call
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
      
//       // Revert local state on error
//       setFavoriteSalons(prev => 
//         prev.includes(salonId) 
//           ? prev.filter(id => id !== salonId) 
//           : [...prev, salonId]
//       );
      
//       Alert.alert("Error", "Failed to update favorites. Please try again.");
//     }
//   };

//   const toggleServiceSelection = (service) => {
//     setSelectedService(prev => 
//       prev && prev.id === service.id ? null : service
//     );
//   };

//   const selectTimeSlot = (slot) => {
//     setSelectedTimeSlot(slot);
//   };

//   const isServiceSelected = (service) => {
//     return selectedService && selectedService.id === service.id;
//   };

//   const handleContinue = () => {
//     if (!selectedService) {
//       return Alert.alert("Please select a service");
//     }
//     if (!selectedTimeSlot) {
//       return Alert.alert("Please select a time slot");
//     }
//     navigation.navigate('SalonSelectionScreen', { 
//       selectedServices: [selectedService],
//       selectedTimeSlot,
//       selectedDate: selectedDate.toISOString().split('T')[0],
//     });
//   };

//   if (loading || locationLoading) {
//     return (
//       <View style={[styles.container, styles.center]}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading data... Please Wait</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={[styles.container, styles.center]}>
//         <Text>Error loading data. Please try again later.</Text>
//       </View>
//     );
//   }

//     const staticCategories = ["FACE", "MANICURE & PEDICURE"];

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
//            {filteredSalons.length > 0 ? (
//         filteredSalons.map((salon) => (
//           <TouchableOpacity 
//             key={salon.id} 
//             onPress={() => navigation.navigate('SalonServices', {
//               salonId: salon.id,
//               salonName: salon.salon_name,
//               city: salon.city,
//               SalonPhoneNumber: salon.phone || '',
//             })}
//           >
//             <View style={styles.customSalonCard}>
//               <View style={styles.timelineWrapper}>
//                 <FontAwesome name="clock-o" size={20} color="#333" />
//               </View>
//               <View style={styles.leftSection}>
//                 <Text style={styles.salonName}>{salon.salon_name}</Text>
//                 <Text style={styles.salonAddress}>
//                   {[salon.locality, salon.city, salon.state]
//                     .filter(Boolean)
//                     .join(', ')}
//                 </Text>
//                 {/* Display distance if available */}
//                 {salon.distance !== null && (
//                   <Text style={styles.distanceText}>
//                     {salon.distance < 1 
//                       ? `${(salon.distance * 1000).toFixed(0)} m away` 
//                       : `${salon.distance.toFixed(1)} km away`}
//                   </Text>
//                 )}
//               </View>
//               <TouchableOpacity onPress={() => toggleFavorite(salon.id)}>
//                 <FontAwesome
//                   name={favoriteSalons.includes(salon.id) ? 'heart' : 'heart-o'}
//                   size={30}
//                   color={favoriteSalons.includes(salon.id) ? 'blue' : 'gray'}
//                 />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         ))
//       ) : (
//         <Text style={styles.noResultsText}>
//           {searchQuery.length > 0 
//             ? "No salons found matching your search" 
//             : "Loading salons..."}
//         </Text>
//       )}
            
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
//                   checkedColor="#FF6B6B"
//                 />
//                 <CheckBox
//                   title="Female"
//                   checked={gender === 'female'}
//                   onPress={() => setGender('female')}
//                   containerStyle={styles.checkboxInline}
//                   textStyle={styles.checkboxText}
//                   checkedColor="#FF6B6B"
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
//                   <Text style={[styles.serviceText, { color: 'brown' }]}>
//                     {item.name}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               columnWrapperStyle={styles.serviceRow}
//               scrollEnabled={false}
//             />

//             {/* Categories Section */}
//             <Text style={styles.sectionTitle}>Categories</Text>
//             <FlatList
//               data={Object.keys(categorizedServices)}
//               horizontal
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.categoryButton,
//                     selectedCategory === item && styles.selectedCategoryButton,
//                   ]}
//                   onPress={() => setSelectedCategory(item)}
//                 >
//                   <Text style={[
//                     styles.categoryButtonText,
//                     selectedCategory === item && styles.selectedCategoryButtonText,  
//                     { color: "deeppink" }
//                   ]}>
//                     {item}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingVertical: 5 }}
//             />

//              {/* --- Static Navigation Categories --- */}
//             {/* <Text style={styles.sectionTitle}>Explore More</Text> */}
//             <FlatList
//               data={staticCategories}
//               horizontal
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.categoryButton}
//                   onPress={() => navigation.navigate('YLGSALON', { category: item })}
//                 >
//                   <Text style={[styles.categoryButtonText, { color: "blue" }]}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingVertical: 5 }}
//             />

//             {/* Services for Selected Category */}
//             {selectedCategory && (
//               <View style={styles.selectedCategoryContainer}>
//                 <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
//                 <FlatList
//                   data={categorizedServices[selectedCategory]}
//                   numColumns={2}
//                   keyExtractor={(item) => item.id.toString()}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       style={[
//                         styles.serviceBox,
//                         isServiceSelected(item) && styles.selectedServiceBox,
//                       ]}
//                       onPress={() => toggleServiceSelection(item)}
//                     >
//                       <Text style={[styles.serviceText, { color: "blue" }]}>
//                         {item.name}
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                   columnWrapperStyle={styles.serviceRow}
//                   scrollEnabled={false}
//                 />
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
//                   <FontAwesome name="calendar" size={20} color="#FF6B6B" />
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
//                         selectedDayBackgroundColor: '#FF6B6B',
//                         todayTextColor: '#FF6B6B',
//                         arrowColor: '#FF6B6B',
//                       }}
//                     />
//                   </View>
//                 )}

//                 <Text style={styles.sectionTitle}>Available Time Slots</Text>
//                 {groupedTimeSlots.map((row, rowIndex) => (
//                   <View key={rowIndex} style={styles.timeSlotRow}>
//                     {row.map((slot, slotIndex) => (
//                       <TouchableOpacity
//                         key={slotIndex}
//                         style={[
//                           styles.timeSlotButton,
//                           selectedTimeSlot === slot && styles.selectedTimeSlot,
//                         ]}
//                         onPress={() => selectTimeSlot(slot)}
//                       >
//                         <Text style={[
//                           styles.timeSlotText,
//                           selectedTimeSlot === slot && styles.selectedTimeSlotText,
//                         ]}>
//                           {slot}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         }
//       />

//       {/* Continue Button */}
//       {selectedService && selectedTimeSlot && (
//         <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//           <Text style={styles.continueButtonText}>
//             {selectedService.name} • {selectedTimeSlot} • Continue
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default CScreen1;



//-------------------------------------------------------------------

//below code  also working code only without guest login 

//-------------------------------------------------------



import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
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
  const { customer } = useAuth();
  const customerId = customer?.data?.customer_id;
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedServices, setSelectedServices] = useState([]);
  const categoriesListRef = useRef(null);
  const servicesListRefs = useRef({});

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

  // Helper function to check if a time slot is in the past
  // const isTimeSlotInPast = (timeSlot, selectedDate) => {
  //   const now = new Date();
  //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //   const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

  //   // If the selected date is today, check if the time slot has passed
  //   if (selectedDay.getTime() === today.getTime()) {
  //     const [time, modifier] = timeSlot.split(' ');
  //     let [hours, minutes] = time.split(':').map(Number);

  //     // Convert to 24-hour format
  //     if (modifier === 'PM' && hours !== 12) hours += 12;
  //     if (modifier === 'AM' && hours === 12) hours = 0;

  //     // Create a Date object for the time slot
  //     const slotTime = new Date(now);
  //     slotTime.setHours(hours, minutes, 0, 0);

  //     // Check if the time slot is in the past
  //     return slotTime < now;
  //   }

  //   // If the selected date is in the past (shouldn't happen with your calendar restrictions)
  //   return selectedDay < today;
  // };


  const isTimeSlotInPast = (timeSlot, selectedDate) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

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

      // Add 9 minutes grace period
      const slotAvailableUntil = new Date(slotTime.getTime() + 9 * 60 * 1000);

      // Disable only if current time is beyond the grace window
      return now > slotAvailableUntil;
    }

    // If the selected date is before today, disable
    return selectedDay < today;
  };


  // Helper function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Get customer's current location
  useEffect(() => {
    const getLocation = async () => {
      try {
        setLocationLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLocationLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCustomerLocation(location.coords);
      } catch (error) {
        console.error('Error getting location:', error);
        setError('Unable to get your current location');
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
        selectedColor: '#FF6B6B',
      }
    });
  }, []);

  const handleDateSelect = (day) => {
    const selectedDay = new Date(day.dateString);
    setSelectedDate(selectedDay);
    setShowCalendar(false);
    setSelectedTimeSlot(null); // Reset time slot when date changes
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        selectedColor: '#FF6B6B',
      }
    });
  };

  useEffect(() => {
    const fetchServicesByGender = async () => {
      try {
        const response = await axios.get(
          `https://yaslaservice.com:81/services/filter-by-gender/?gender=${gender}`
        );
        setServicesData(response.data);
        setSelectedCategory(null);
        setSelectedService(null);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServicesByGender();
  }, [gender]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const salonsResponse = await axios.get('https://yaslaservice.com:81/salons/');
        const servicesResponse = await axios.get('https://yaslaservice.com:81/services/');

        let salonsData = salonsResponse.data.data || [];

        // Add distance to each salon if we have customer location
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

          // Sort salons by distance (nearest first)
          salonsData.sort((a, b) => {
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
          });
        }

        setAllSalons(salonsData);
        setFilteredSalons(salonsData.slice(0, 5));

        const allServices = servicesResponse.data.data || [];
        const popularServices = allServices
          .filter(service => service.popular === true)
          .map(service => ({
            id: service.id,
            name: service.service_name,
            category: service.gender_specific?.toLowerCase() || 'other',
          }));
        setMaleServicesDynamic(popularServices);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
        Alert.alert("Error", "Failed to load data from server.");
      }
    };

    // Only fetch data if we have customer location or if location is not available
    if (customerLocation !== null || !locationLoading) {
      fetchData();
    }
  }, [customerLocation, locationLoading]);

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

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (customerId) {
          console.log('Loading favorites for customer:', customerId);
          const response = await axios.get(
            `https://yaslaservice.com:81/customer/${customerId}/favorites/`
          );

          console.log('Favorites API response:', JSON.stringify(response.data));

          // Check different possible response formats
          let favoriteSalonIds = [];

          if (Array.isArray(response.data)) {
            // If response is directly an array of salon IDs
            favoriteSalonIds = response.data;
          } else if (response.data && Array.isArray(response.data.salon_id)) {
            // If response has salon_id array
            favoriteSalonIds = response.data.salon_id;
          } else if (response.data && response.data.favorites) {
            // If response has favorites array with salon objects
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

    loadFavorites();
  }, [customerId]);

  const toggleFavorite = async (salonId) => {
    try {
      const isCurrentlyFavorite = favoriteSalons.includes(salonId);
      let updatedFavorites;

      if (isCurrentlyFavorite) {
        // Remove from favorites - use DELETE request
        updatedFavorites = favoriteSalons.filter(id => id !== salonId);

        // Update local state immediately
        setFavoriteSalons(updatedFavorites);

        // Make DELETE API call
        const response = await axios.delete(
          `https://yaslaservice.com:81/customer/${customerId}/favorites/`,
          {
            data: {
              salon_id: [salonId] // Send only the salon ID to remove
            }
          }
        );

        console.log('Favorite removal successful:', response.data);
      } else {
        // Add to favorites - use POST request
        updatedFavorites = [...favoriteSalons, salonId];

        // Update local state immediately
        setFavoriteSalons(updatedFavorites);

        // Make POST API call
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

      // Revert local state on error
      setFavoriteSalons(prev =>
        prev.includes(salonId)
          ? prev.filter(id => id !== salonId)
          : [...prev, salonId]
      );

      Alert.alert("Error", "Failed to update favorites. Please try again.");
    }
  };

  const toggleServiceSelection = (service) => {

      if (customer?.isGuest) {
    return Alert.alert(
      "Login Required",
      "Please register or login to select services.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Register", onPress: () => navigation.navigate("Signup") },
        { text: "Login", onPress: () => navigation.navigate("Login") },
      ]
    );
  }
    setSelectedService(prev =>
      prev && prev.id === service.id ? null : service
    );
    setSelectedServices(prev => {
      if (prev.some(s => s.id === service.id)) {
        // remove if already selected
        return prev.filter(s => s.id !== service.id);
      } else {
        // add if not selected
        return [...prev, service];
      }
    });

  };

  const selectTimeSlot = (slot) => {
    if (customer?.isGuest) {
    return Alert.alert(
      "Login Required",
      "Please register or login to select a time slot.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Register", onPress: () => navigation.navigate("Signup") },
        { text: "Login", onPress: () => navigation.navigate("Login") },
      ]
    );
  }

    setSelectedTimeSlot(slot);
  };

  // const isServiceSelected = (service) => {
  //   return selectedService && selectedService.id === service.id;
  // };

  const isServiceSelected = (service) => {
    return selectedServices.some(s => s.id === service.id);
  };


  // const handleContinue = () => {
  //   if (!selectedService) {
  //     return Alert.alert("Please select a service");
  //   }
  //   if (!selectedTimeSlot) {
  //     return Alert.alert("Please select a time slot");
  //   }
  //   navigation.navigate('SalonSelectionScreen', { 
  //     selectedServices: [selectedService],
  //     selectedTimeSlot,
  //     selectedDate: selectedDate.toISOString().split('T')[0],
  //   });
  // };


  const handleContinue = () => {
    if (selectedServices.length === 0) {
      return Alert.alert("Please select at least one service");
    }
    if (!selectedTimeSlot) {
      return Alert.alert("Please select a time slot");
    }
    navigation.navigate('SalonSelectionScreen', {
      selectedServices,  // send array of services
      selectedTimeSlot,
      selectedDate: selectedDate.toISOString().split('T')[0],
    });
  };


  // if (loading || locationLoading) {
  //   return (
  //     <View style={[styles.container, styles.center]}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading data... Please Wait</Text>
  //     </View>
  //   );
  // }

  if (loading || locationLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Fetching salons and services...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
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
              filteredSalons.map((salon) => (
                // <TouchableOpacity
                //   key={salon.id}
                //   onPress={() => navigation.navigate('SalonServices', {
                //     salonId: salon.id,
                //     salonName: salon.salon_name,
                //     city: salon.city,
                //     SalonPhoneNumber: salon.phone || '',
                //     SalonLatitude: salon.latitude || '',
                //     SalonLongitude: salon.longitude || '',
                //   })}
                // >

                  <TouchableOpacity
      key={salon.id}
      onPress={() => {
        if (customer?.isGuest) {
          return Alert.alert(
            "Login Required",
            "Please register or login to view salon details.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Register", onPress: () => navigation.navigate("Signup") },
              { text: "Login", onPress: () => navigation.navigate("Login") },
            ]
          );
        }

        // ✅ normal navigation if logged in
        navigation.navigate('SalonServices', {
          salonId: salon.id,
          salonName: salon.salon_name,
          city: salon.city,
          SalonPhoneNumber: salon.phone || '',
          SalonLatitude: salon.latitude || '',
          SalonLongitude: salon.longitude || '',
        });
      }}
    >
                  <View style={styles.customSalonCard}>
                    <View style={styles.timelineWrapper}>
                      <FontAwesome name="clock-o" size={20} color="#333" />
                    </View>
                    <View style={styles.leftSection}>
                      <Text style={styles.salonName}>{salon.salon_name}</Text>
                      <Text style={styles.salonAddress}>
                        {[salon.locality, salon.city, salon.state]
                          .filter(Boolean)
                          .join(', ')}
                      </Text>
                      {/* Display distance if available */}
                      {salon.distance !== null && (
                        <Text style={styles.distanceText}>
                          {salon.distance < 1
                            ? `${(salon.distance * 1000).toFixed(0)} m away`
                            : `${salon.distance.toFixed(1)} km away`}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(salon.id)}>
                      <FontAwesome
                        name={favoriteSalons.includes(salon.id) ? 'heart' : 'heart-o'}
                        size={30}
                        color={favoriteSalons.includes(salon.id) ? 'blue' : 'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResultsText}>
                {searchQuery.length > 0
                  ? "No salons found matching your search"
                  : "Loading salons..."}
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
                  checkedColor="#FF6B6B"
                />
                <CheckBox
                  title="Female"
                  checked={gender === 'female'}
                  onPress={() => setGender('female')}
                  containerStyle={styles.checkboxInline}
                  textStyle={styles.checkboxText}
                  checkedColor="#FF6B6B"
                />
              </View>
            </View>

            {/* Popular Services */}
            <Text style={styles.sectionTitle}>Popular</Text>
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
                  <Text style={[styles.serviceText, { color: 'brown' }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              columnWrapperStyle={styles.serviceRow}
              scrollEnabled={false}
            />

            {/* Categories Section */}

            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesContainer}>
              <TouchableOpacity
                style={styles.scrollArrow}
                onPress={() => categoriesListRef.current?.scrollToOffset({ offset: 0, animated: true })}
              >
                <FontAwesome name="chevron-left" size={20} color="#FF6B6B" />
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
                      { color: "deeppink" }
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
                <FontAwesome name="chevron-right" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>

            {/* Services for Selected Category - Now with horizontal scrolling */}
            {selectedCategory && (
              <View style={styles.selectedCategoryContainer}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
                  <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                    <FontAwesome name="times-circle" size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                <View style={styles.servicesContainer}>
                  <TouchableOpacity
                    style={styles.scrollArrow}
                    onPress={() => {
                      if (servicesListRefs.current[selectedCategory]) {
                        servicesListRefs.current[selectedCategory].scrollToOffset({
                          offset: 0,
                          animated: true
                        });
                      }
                    }}
                  >
                    <FontAwesome name="chevron-left" size={20} color="#FF6B6B" />
                  </TouchableOpacity>

                  <FlatList
                    ref={ref => servicesListRefs.current[selectedCategory] = ref}
                    data={categorizedServices[selectedCategory]}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.serviceBoxHorizontal,
                          isServiceSelected(item) && styles.selectedServiceBox,
                        ]}
                        onPress={() => toggleServiceSelection(item)}
                      >
                        <Text style={[
                          styles.serviceText,
                          isServiceSelected(item) && styles.selectedServiceText,
                          { color: "blue" }
                        ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalServicesContent}
                  />

                  <TouchableOpacity
                    style={styles.scrollArrow}
                    onPress={() => {
                      if (servicesListRefs.current[selectedCategory]) {
                        servicesListRefs.current[selectedCategory].scrollToEnd({ animated: true });
                      }
                    }}
                  >
                    <FontAwesome name="chevron-right" size={20} color="#FF6B6B" />
                  </TouchableOpacity>
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
                      current={selectedDate.toISOString().split('T')[0]}
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

      {/* Continue Button */}
      {/* {selectedService && selectedTimeSlot && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            {selectedService.name} • {selectedTimeSlot} • Continue
          </Text>
        </TouchableOpacity>
      )} */}

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
