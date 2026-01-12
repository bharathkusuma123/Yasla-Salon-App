

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
//   const [availableStylistsBySalon, setAvailableStylistsBySalon] = useState({});
  
//   // New state variables for booking section
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [markedDates, setMarkedDates] = useState({});
//   const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);
//   const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

//   const { customer, logout } = useAuth();
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
//           { text: 'Cancel', style: 'cancel' },
//           { 
//             text: 'Login', 
//             onPress: async () => {
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
//         selectedColor: '#2F4EAA',
//       }
//     });
//   }, [selectedDate]);

//   // Fetch available time slots when stylist or date changes (for favorite salons only)
//   useEffect(() => {
//     if (selectedStylist && selectedSalon && isSalonFavorite(selectedSalon)) {
//       fetchAvailableTimeSlots();
//     }
//   }, [selectedStylist, selectedDate, selectedSalon]);

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
  
//   // NEW: Check stylist availability for EXACT selected time slot
//   const checkStylistAvailabilityForExactTime = async (stylistId) => {
//     try {
//       if (!selectedTimeSlot) return false;
      
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
//       );

//       // Filter out cancelled appointments
//       const validAppointments = response.data.filter(
//         appt => appt.status !== "Cancelled"
//       );

//       // Check if stylist is booked at the EXACT selected time slot
//       const isBookedAtSelectedTime = validAppointments.some(appt => {
//         const appointmentTime = utcToLocalTime(appt.start_datetime);
//         return appointmentTime === selectedTimeSlot;
//       });

//       console.log(`Stylist ${stylistId} availability for ${selectedTimeSlot}:`, !isBookedAtSelectedTime);

//       return !isBookedAtSelectedTime; // Available if NOT booked at selected time
//     } catch (error) {
//       console.error("Error checking stylist availability:", error);
//       return false; // Default to unavailable if there's an error
//     }
//   };

//   // NEW: Check ALL stylists availability for a salon at exact time
//   const checkSalonAvailability = async (salonId) => {
//     try {
//       const salonStylists = stylists.filter(stylist => stylist.salon === salonId);
      
//       const availableStylists = [];
      
//       for (const stylist of salonStylists) {
//         const isAvailable = await checkStylistAvailabilityForExactTime(stylist.id);
//         if (isAvailable) {
//           availableStylists.push(stylist);
//         }
//       }
      
//       return availableStylists;
//     } catch (error) {
//       console.error("Error checking salon availability:", error);
//       return [];
//     }
//   };

//   // NEW: Update availability for ALL salons
//   useEffect(() => {
//     const updateAllSalonsAvailability = async () => {
//       if (!selectedTimeSlot || salons.length === 0) return;
      
//       console.log('🔄 Updating availability for all salons at time:', selectedTimeSlot);
      
//       const availabilityMap = {};
      
//       for (const salon of salons) {
//         // For favorite salons, we don't filter - they show regardless
//         if (isSalonFavorite(salon.id)) {
//           availabilityMap[salon.id] = []; // We'll populate this when they select the salon
//           continue;
//         }
        
//         // For non-favorite salons, check availability
//         const availableStylists = await checkSalonAvailability(salon.id);
//         availabilityMap[salon.id] = availableStylists;
        
//         console.log(`🏢 Salon ${salon.salon_name} has ${availableStylists.length} available stylists`);
//       }
      
//       setAvailableStylistsBySalon(availabilityMap);
//     };

//     updateAllSalonsAvailability();
//   }, [selectedTimeSlot, selectedDate, salons, favoriteSalons]);

//   // Original availability check for favorite salons (with time slot changes)
//   const checkStylistAvailability = async (stylistId) => {
//     try {
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
//       );

//       // Filter out cancelled appointments
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
    
//     if (selectedSalon && stylists.length > 0 && isSalonFavorite(selectedSalon)) {
//       console.log('✅ Conditions met, calling updateStylistAvailability for favorite salon');
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
//                 services: [],
//                 serviceIds: new Set()
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
//             serviceDetails[serviceSalon.salon_id].serviceIds.add(service.id);
//           });
//         }
//         // Now filter to only include salons that offer ALL selected services
//         const selectedServiceIds = new Set(selectedServices.map(service => service.id));
//         const eligibleSalonIds = Object.keys(serviceDetails).filter(salonId => {
//           const salonServices = serviceDetails[salonId].serviceIds;
//           // Check if salon has ALL selected services
//           return selectedServiceIds.size === serviceDetails[salonId].services.length;
//         });

//         console.log('🎯 Eligible salons that offer ALL services:', {
//           selectedServices: selectedServices.map(s => s.name),
//           selectedServiceIds: Array.from(selectedServiceIds),
//           eligibleSalonIds,
//           totalSalonsFound: Object.keys(serviceDetails).length,
//           eligibleCount: eligibleSalonIds.length
//         });

//         // Create filtered service details with only eligible salons
//         const filteredServiceDetails = {};
//         eligibleSalonIds.forEach(salonId => {
//           filteredServiceDetails[salonId] = serviceDetails[salonId];
//         });

//         setServiceDetailsBySalonId(filteredServiceDetails);

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

//      const salonsData = salonsRes.data.data
//           .filter(salon => eligibleSalonIds.includes(salon.id.toString()))
//           .map((salon, index) => {
//             const ratings = salonRatingsMap[salon.id] || [];
//             const avgRating =
//               ratings.length > 0
//                 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
//                 : "4.0";
//             return {
//               ...salon,
//               image: salonImages[index % salonImages.length],
//               price: filteredServiceDetails[salon.id].cost,
//               completionTime: `${filteredServiceDetails[salon.id].completionTime} mins`,
//               services: filteredServiceDetails[salon.id].services,
//               distance: Math.floor(Math.random() * 10) + 1,
//               rating: avgRating
//             };
//           });

//         console.log('🏢 Final salons data after filtering:', {
//           totalSalonsFromAPI: salonsRes.data.data.length,
//           salonsAfterFilter: salonsData.length,
//           salonNames: salonsData.map(s => s.salon_name)
//         });

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
    
//     // Apply filters (price, rating, etc.)
//     switch (activeFilter) {
//       case 'price_low': result.sort((a, b) => a.price - b.price); break;
//       case 'price_high': result.sort((a, b) => b.price - a.price); break;
//       case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
//       case 'nearby': default: result.sort((a, b) => a.distance - b.distance);
//     }
    
//     // NEW: Filter out non-favorite salons that don't have available stylists
//     result = result.filter(salon => {
//       // Always show favorite salons
//       if (isSalonFavorite(salon.id)) return true;
      
//       // For non-favorite salons, only show if they have available stylists
//       const hasAvailableStylists = availableStylistsBySalon[salon.id]?.length > 0;
//       return hasAvailableStylists;
//     });
    
//     return result;
//   }, [salons, activeFilter, availableStylistsBySalon, favoriteSalons]);

//   // UPDATED: Get filtered stylists - only show available ones for non-favorite salons
//   const filteredStylists = React.useMemo(() => {
//     if (!selectedSalon) return [];
    
//     const allSalonStylists = stylists.filter(stylist => stylist.salon === selectedSalon);
    
//     // For favorite salons, show all stylists (they can change time slot)
//     if (isSalonFavorite(selectedSalon)) {
//       return allSalonStylists;
//     }
    
//     // For non-favorite salons, only show available stylists at exact time
//     return availableStylistsBySalon[selectedSalon] || [];
//   }, [selectedSalon, stylists, availableStylistsBySalon, favoriteSalons]);

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

//   // UPDATED: Salon selection handler
//   const handleSalonSelect = (salonId) => {
//     console.log('🏢 Salon selection triggered:', {
//       clickedSalonId: salonId,
//       isFavorite: isSalonFavorite(salonId),
//       hasAvailableStylists: availableStylistsBySalon[salonId]?.length > 0
//     });
    
//     // For non-favorite salons, auto-select the first available stylist
//     if (!isSalonFavorite(salonId) && availableStylistsBySalon[salonId]?.length > 0) {
//       const firstAvailableStylist = availableStylistsBySalon[salonId][0];
//       setSelectedStylist(firstAvailableStylist);
//       setSelectedTime(selectedTimeSlot); // Use the originally selected time
//     } else {
//       setSelectedStylist(null);
//     }
    
//     setSelectedSalon(salonId === selectedSalon ? null : salonId);
//     setShowAllTimeSlots(false);
//   };

//   const handleStylistSelect = (stylist) => {
//     setSelectedStylist(stylist);
//   };

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//     setShowCalendar(false);
//     setSelectedTime(selectedTimeSlot);
//     setShowAllTimeSlots(false);
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

//       setBookedTimeSlots(bookedSlots);

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
//         setShowAllTimeSlots(false);
//         setSelectedTime(null);
//       } else if (!isPreviouslySelectedSlotAvailable) {
//         setShowAllTimeSlots(true);
//         setSelectedTime(null);
//       } else {
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

//   // UPDATED: Render time slots - NO "Change Time Slot" for non-favorite salons
//   const renderTimeSlots = () => {
//     if (loadingSlots) {
//       return <ActivityIndicator size="small" color="#2F4EAA" />;
//     }

//     // For NON-FAVORITE salons: Only show the selected time slot, no changes allowed
//     if (!isSalonFavorite(selectedSalon)) {
//       return (
//         <View style={styles.timeSlotsGrid}>
//           <TouchableOpacity
//             style={[styles.timeSlot, styles.selectedTimeSlot]}
//           >
//             <Text style={[styles.timeSlotText, styles.selectedTimeSlotText]}>
//               {formatTime(selectedTimeSlot)}
//             </Text>
//           </TouchableOpacity>
//           <Text style={styles.fixedTimeNote}>
//             Time slot is fixed for this salon
//           </Text>
//         </View>
//       );
//     }

//     // For FAVORITE salons: Keep the existing logic with change time slot option
//     const isAvailable = stylistAvailability[selectedStylist?.id];

//     // ❌ CASE 1: Stylist not available at all
//     if (isAvailable === false || availableSlots.length === 0) {
//       return (
//         <View style={styles.unavailableContainer}>
//           <View style={styles.unavailableCard}>
//             <Text style={styles.unavailableTitle}>Stylist Not Available</Text>
//             <TouchableOpacity
//               style={styles.changeTimeSlotButton}
//               onPress={() => setShowAllTimeSlots(true)}
//             >
//               <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }

//     // ❌ CASE 2: Previously selected slot is already booked → show message immediately
//     const isPreviouslySelectedSlotBooked = bookedTimeSlots.includes(selectedTimeSlot);
//     if (isPreviouslySelectedSlotBooked && !showAllTimeSlots) {
//       return (
//         <View style={styles.unavailableContainer}>
//           <View style={styles.unavailableCard}>
//             <Text style={styles.unavailableTitle}>
//               Stylist Not Available for {selectedTimeSlot}
//             </Text>
//             <TouchableOpacity
//               style={styles.changeTimeSlotButton}
//               onPress={() => setShowAllTimeSlots(true)}
//             >
//               <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }

//     // ✅ CASE 3: Show all time slots directly if flagged
//     if (showAllTimeSlots) {
//       return (
//         <View style={styles.timeSlotsGrid}>
//           {timeSlotsFromCScreen1.map((time, index) => {
//             const isPastTime = isTimeSlotInPast(time);
//             const isBooked = !availableSlots.includes(time);
//             const isDisabled = isPastTime || isBooked;

//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.timeSlot,
//                   selectedTime === time && styles.selectedTimeSlot,
//                   isDisabled && styles.unavailableTimeSlot
//                 ]}
//                 onPress={() => !isDisabled && handleTimeSelect(time)}
//                 disabled={isDisabled}
//               >
//                 <Text
//                   style={[
//                     styles.timeSlotText,
//                     selectedTime === time && styles.selectedTimeSlotText,
//                     isDisabled && { color: '#bbb' }
//                   ]}
//                 >
//                   {formatTime(time)}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       );
//     }

//     // ✅ CASE 4: If slot is still available → show it + button
//     if (selectedTimeSlot && availableSlots.includes(selectedTimeSlot)) {
//       return (
//         <View style={styles.timeSlotsGrid}>
//           <TouchableOpacity
//             style={[styles.timeSlot, styles.selectedTimeSlot]}
//             onPress={() => handleTimeSelect(selectedTimeSlot)}
//           >
//             <Text style={[styles.timeSlotText, styles.selectedTimeSlotText]}>
//               {formatTime(selectedTimeSlot)}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.showAllButton}
//             onPress={() => setShowAllTimeSlots(true)}
//           >
//             <Text style={styles.showAllButtonText}>Show all time slots</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return null;
//   };

//   const handlePressConfirm = () => {
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

//   return (
//     <>
//       <View style={{ flex: 1 }}>
//         {filteredSalons.length === 0 ? (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#2F4EAA" />
//             <Text style={{ marginTop: 10, fontSize: 16, color: '#2F4EAA' }}>
//               {selectedTimeSlot 
//                 ? "No salons available at the selected time" 
//                 : "Fetching available salons..."
//               }
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
//                 <Text style={styles.sectionTitle}>
//                   Available Salons ({filteredSalons.length} found)
//                 </Text>
//                 <Text style={styles.filterInfoText}>
//                   Showing {filteredSalons.length} salons that offer all selected services
//            </Text>
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
//                     <FontAwesome name="heart" size={16} color="#2F4EAA" style={styles.heartIcon} />
//                   )}
//                   <Image source={{ uri: salon.image }} style={styles.salonImage} />
//                   <View style={styles.salonInfo}>
//                     <View style={styles.nameAndServicesRow}>
//                       <Text style={styles.salonName}>{salon.salon_name}</Text>
//                       {!isSalonFavorite(salon.id) && (
//                         <View style={styles.availableStylistBadge}>
//                           <Text style={styles.availableStylistText}>
//                             {availableStylistsBySalon[salon.id]?.length || 0} stylists available
//                           </Text>
//                         </View>
//                       )}
//                     </View>
//                     {salon.services && salon.services.length > 0 && (
//                       <View style={styles.servicesContainer}>
//                         <Text style={styles.servicesTitle}>Selected Services:</Text>
//                         {salon.services.map(service => (
//                           <Text key={service.id} style={styles.serviceName}>
//                             • {service.name} - ₹{service.price} ({service.time} mins)
//                           </Text>
//                         ))}
//                         <Text style={styles.totalPriceText}>
//                           Total: ₹{salon.price} ({salon.completionTime})
//                         </Text>
//                       </View>
//                     )}
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
//                     <Text style={styles.sectionTitle}>
//                       {isSalonFavorite(salon.id) ? 'Available Stylists' : 'Available Stylist'}
//                     </Text>

//                     <FlatList
//                       horizontal
//                       data={filteredStylists}
//                       keyExtractor={(item) => item.id.toString()}
//                       renderItem={({ item: stylist }) => (
//                         <TouchableOpacity
//                           style={[
//                             styles.stylistCard,
//                             selectedStylist?.id === stylist.id && styles.selectedStylistCard,
//                           ]}
//                           onPress={() => {
//                             // For non-favorite salons, stylist is auto-selected, no change allowed
//                             if (isSalonFavorite(salon.id)) {
//                               handleStylistSelect(stylist);
//                             }
//                           }}
//                         >
//                           <Image
//                             source={{ uri: stylist.profile_pic }}
//                             style={styles.stylistImage}
//                           />
//                           <Text style={styles.stylistName}>
//                             {stylist.full_name}
//                             {!isSalonFavorite(salon.id) && " ✓"}
//                           </Text>
//                           <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
//                           <Text style={styles.stylistSpecialty}>
//                             {stylist.specialization || "Hair Specialist"}
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                       contentContainerStyle={styles.stylistContainer}
//                       showsHorizontalScrollIndicator={false}
//                     />

//                     {/* Booking Section */}
//                     {selectedStylist && (
//                       <View style={styles.bookingSection}>
//                         {/* Date Selection - ONLY for favorite salons */}
//                         {isSalonFavorite(selectedSalon) && (
//                           <>
//                             <Text style={styles.sectionTitle}>Select Date</Text>
//                             <TouchableOpacity
//                               style={styles.dateSelector}
//                               onPress={() => setShowCalendar(!showCalendar)}
//                             >
//                               <FontAwesome name="calendar" size={20} color="#2F4EAA" />
//                               <Text style={styles.dateText}>
//                                 {new Date(selectedDate).toLocaleDateString('en-US', {
//                                   weekday: 'long',
//                                   month: 'long',
//                                   day: 'numeric'
//                                 })}
//                               </Text>
//                             </TouchableOpacity>

//                             {showCalendar && (
//                               <View style={styles.calendarContainer}>
//                                 <Calendar
//                                   current={selectedDate}
//                                   minDate={new Date().toISOString().split('T')[0]}
//                                   onDayPress={handleDateSelect}
//                                   markedDates={markedDates}
//                                   theme={{
//                                     selectedDayBackgroundColor: '#2F4EAA',
//                                     todayTextColor: '#2F4EAA',
//                                     arrowColor: '#2F4EAA',
//                                   }}
//                                 />
//                               </View>
//                             )}
//                           </>
//                         )}

//                         {/* Time Slots */}
//                         <Text style={styles.sectionTitle}>
//                           {isSalonFavorite(selectedSalon) ? 'Available Time Slots' : 'Selected Time Slot'}
//                         </Text>
//                         {renderTimeSlots()}
//                       </View>
//                     )}
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
//   const [availableStylistsBySalon, setAvailableStylistsBySalon] = useState({});
  
//   // New state variables for booking section
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [markedDates, setMarkedDates] = useState({});
//   const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);
//   const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

//   const { customer, logout } = useAuth();
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
//           { text: 'Cancel', style: 'cancel' },
//           { 
//             text: 'Login', 
//             onPress: async () => {
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
//         selectedColor: '#2F4EAA',
//       }
//     });
//   }, [selectedDate]);

//   // Fetch available time slots when stylist or date changes (for favorite salons only)
//   useEffect(() => {
//     if (selectedStylist && selectedSalon) {
//       fetchAvailableTimeSlots();
//     }
//   }, [selectedStylist, selectedDate, selectedSalon]);

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
  
//   // Check stylist availability for EXACT selected time slot
//   const checkStylistAvailabilityForExactTime = async (stylistId) => {
//     try {
//       if (!selectedTimeSlot) return false;
      
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
//       );

//       // Filter out cancelled appointments
//       const validAppointments = response.data.filter(
//         appt => appt.status !== "Cancelled"
//       );

//       // Check if stylist is booked at the EXACT selected time slot
//       const isBookedAtSelectedTime = validAppointments.some(appt => {
//         const appointmentTime = utcToLocalTime(appt.start_datetime);
//         return appointmentTime === selectedTimeSlot;
//       });

//       console.log(`Stylist ${stylistId} availability for ${selectedTimeSlot}:`, !isBookedAtSelectedTime);

//       return !isBookedAtSelectedTime; // Available if NOT booked at selected time
//     } catch (error) {
//       console.error("Error checking stylist availability:", error);
//       return false; // Default to unavailable if there's an error
//     }
//   };

//   // Check ALL stylists availability for a salon at exact time
//   const checkSalonAvailability = async (salonId) => {
//     try {
//       const salonStylists = stylists.filter(stylist => stylist.salon === salonId);
      
//       const availableStylists = [];
      
//       for (const stylist of salonStylists) {
//         const isAvailable = await checkStylistAvailabilityForExactTime(stylist.id);
//         if (isAvailable) {
//           availableStylists.push(stylist);
//         }
//       }
      
//       return availableStylists;
//     } catch (error) {
//       console.error("Error checking salon availability:", error);
//       return [];
//     }
//   };

//   // Update availability for ALL salons
//   useEffect(() => {
//     const updateAllSalonsAvailability = async () => {
//       if (!selectedTimeSlot || salons.length === 0) return;
      
//       console.log('🔄 Updating availability for all salons at time:', selectedTimeSlot);
      
//       const availabilityMap = {};
      
//       for (const salon of salons) {
//         // For favorite salons, we don't filter - they show regardless
//         if (isSalonFavorite(salon.id)) {
//           availabilityMap[salon.id] = []; // We'll populate this when they select the salon
//           continue;
//         }
        
//         // For non-favorite salons, check availability
//         const availableStylists = await checkSalonAvailability(salon.id);
//         availabilityMap[salon.id] = availableStylists;
        
//         console.log(`🏢 Salon ${salon.salon_name} has ${availableStylists.length} available stylists`);
//       }
      
//       setAvailableStylistsBySalon(availabilityMap);
//     };

//     updateAllSalonsAvailability();
//   }, [selectedTimeSlot, selectedDate, salons, favoriteSalons]);

//   // Original availability check for favorite salons (with time slot changes)
//   const checkStylistAvailability = async (stylistId) => {
//     try {
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
//       );

//       // Filter out cancelled appointments
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
    
//     if (selectedSalon && stylists.length > 0 && isSalonFavorite(selectedSalon)) {
//       console.log('✅ Conditions met, calling updateStylistAvailability for favorite salon');
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
//                 services: [],
//                 serviceIds: new Set()
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
//             serviceDetails[serviceSalon.salon_id].serviceIds.add(service.id);
//           });
//         }
//         // Now filter to only include salons that offer ALL selected services
//         const selectedServiceIds = new Set(selectedServices.map(service => service.id));
//         const eligibleSalonIds = Object.keys(serviceDetails).filter(salonId => {
//           const salonServices = serviceDetails[salonId].serviceIds;
//           // Check if salon has ALL selected services
//           return selectedServiceIds.size === serviceDetails[salonId].services.length;
//         });

//         console.log('🎯 Eligible salons that offer ALL services:', {
//           selectedServices: selectedServices.map(s => s.name),
//           selectedServiceIds: Array.from(selectedServiceIds),
//           eligibleSalonIds,
//           totalSalonsFound: Object.keys(serviceDetails).length,
//           eligibleCount: eligibleSalonIds.length
//         });

//         // Create filtered service details with only eligible salons
//         const filteredServiceDetails = {};
//         eligibleSalonIds.forEach(salonId => {
//           filteredServiceDetails[salonId] = serviceDetails[salonId];
//         });

//         setServiceDetailsBySalonId(filteredServiceDetails);

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

//      const salonsData = salonsRes.data.data
//           .filter(salon => eligibleSalonIds.includes(salon.id.toString()))
//           .map((salon, index) => {
//             const ratings = salonRatingsMap[salon.id] || [];
//             const avgRating =
//               ratings.length > 0
//                 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
//                 : "4.0";
//             return {
//               ...salon,
//               image: salonImages[index % salonImages.length],
//               price: filteredServiceDetails[salon.id].cost,
//               completionTime: `${filteredServiceDetails[salon.id].completionTime} mins`,
//               services: filteredServiceDetails[salon.id].services,
//               distance: Math.floor(Math.random() * 10) + 1,
//               rating: avgRating
//             };
//           });

//         console.log('🏢 Final salons data after filtering:', {
//           totalSalonsFromAPI: salonsRes.data.data.length,
//           salonsAfterFilter: salonsData.length,
//           salonNames: salonsData.map(s => s.salon_name)
//         });

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
    
//     // Apply filters (price, rating, etc.)
//     switch (activeFilter) {
//       case 'price_low': result.sort((a, b) => a.price - b.price); break;
//       case 'price_high': result.sort((a, b) => b.price - a.price); break;
//       case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
//       case 'nearby': default: result.sort((a, b) => a.distance - b.distance);
//     }
    
//     // NEW: Filter out non-favorite salons that don't have available stylists
//     result = result.filter(salon => {
//       // Always show favorite salons
//       if (isSalonFavorite(salon.id)) return true;
      
//       // For non-favorite salons, only show if they have available stylists
//       const hasAvailableStylists = availableStylistsBySalon[salon.id]?.length > 0;
//       return hasAvailableStylists;
//     });
    
//     return result;
//   }, [salons, activeFilter, availableStylistsBySalon, favoriteSalons]);

//   // FIXED: Get filtered stylists - show ALL available stylists for both favorite and non-favorite salons
//   const filteredStylists = React.useMemo(() => {
//     if (!selectedSalon) return [];
    
//     // For favorite salons, show all stylists
//     if (isSalonFavorite(selectedSalon)) {
//       return stylists.filter(stylist => stylist.salon === selectedSalon);
//     }
    
//     // For non-favorite salons, show all available stylists at exact time
//     return availableStylistsBySalon[selectedSalon] || [];
//   }, [selectedSalon, stylists, availableStylistsBySalon, favoriteSalons]);

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

//   // FIXED: Salon selection handler - don't auto-select stylist for non-favorite salons
//   const handleSalonSelect = (salonId) => {
//     console.log('🏢 Salon selection triggered:', {
//       clickedSalonId: salonId,
//       isFavorite: isSalonFavorite(salonId),
//       hasAvailableStylists: availableStylistsBySalon[salonId]?.length > 0
//     });
    
//     // Reset selections when changing salon
//     setSelectedStylist(null);
//     setSelectedSalon(salonId === selectedSalon ? null : salonId);
//     setShowAllTimeSlots(false);
//   };

//   const handleStylistSelect = (stylist) => {
//     setSelectedStylist(stylist);
//   };

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//     setShowCalendar(false);
//     setSelectedTime(selectedTimeSlot);
//     setShowAllTimeSlots(false);
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

//       setBookedTimeSlots(bookedSlots);

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
//         setShowAllTimeSlots(false);
//         setSelectedTime(null);
//       } else if (!isPreviouslySelectedSlotAvailable) {
//         setShowAllTimeSlots(true);
//         setSelectedTime(null);
//       } else {
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

//   // FIXED: Render time slots - ALLOW time slot changes for ALL salons
//   const renderTimeSlots = () => {
//     if (loadingSlots) {
//       return <ActivityIndicator size="small" color="#2F4EAA" />;
//     }

//     const isAvailable = stylistAvailability[selectedStylist?.id];

//     // ❌ CASE 1: Stylist not available at all
//     if (isAvailable === false || availableSlots.length === 0) {
//       return (
//         <View style={styles.unavailableContainer}>
//           <View style={styles.unavailableCard}>
//             <Text style={styles.unavailableTitle}>Stylist Not Available</Text>
//             <TouchableOpacity
//               style={styles.changeTimeSlotButton}
//               onPress={() => setShowAllTimeSlots(true)}
//             >
//               <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }

//     // ❌ CASE 2: Previously selected slot is already booked → show message immediately
//     const isPreviouslySelectedSlotBooked = bookedTimeSlots.includes(selectedTimeSlot);
//     if (isPreviouslySelectedSlotBooked && !showAllTimeSlots) {
//       return (
//         <View style={styles.unavailableContainer}>
//           <View style={styles.unavailableCard}>
//             <Text style={styles.unavailableTitle}>
//               Stylist Not Available for {selectedTimeSlot}
//             </Text>
//             <TouchableOpacity
//               style={styles.changeTimeSlotButton}
//               onPress={() => setShowAllTimeSlots(true)}
//             >
//               <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }

//     // ✅ CASE 3: Show all time slots directly if flagged
//     if (showAllTimeSlots) {
//       return (
//         <View style={styles.timeSlotsGrid}>
//           {timeSlotsFromCScreen1.map((time, index) => {
//             const isPastTime = isTimeSlotInPast(time);
//             const isBooked = !availableSlots.includes(time);
//             const isDisabled = isPastTime || isBooked;

//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.timeSlot,
//                   selectedTime === time && styles.selectedTimeSlot,
//                   isDisabled && styles.unavailableTimeSlot
//                 ]}
//                 onPress={() => !isDisabled && handleTimeSelect(time)}
//                 disabled={isDisabled}
//               >
//                 <Text
//                   style={[
//                     styles.timeSlotText,
//                     selectedTime === time && styles.selectedTimeSlotText,
//                     isDisabled && { color: '#bbb' }
//                   ]}
//                 >
//                   {formatTime(time)}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       );
//     }

//     // ✅ CASE 4: If slot is still available → show it + button
//     if (selectedTimeSlot && availableSlots.includes(selectedTimeSlot)) {
//       return (
//         <View style={styles.timeSlotsGrid}>
//           <TouchableOpacity
//             style={[styles.timeSlot, styles.selectedTimeSlot]}
//             onPress={() => handleTimeSelect(selectedTimeSlot)}
//           >
//             <Text style={[styles.timeSlotText, styles.selectedTimeSlotText]}>
//               {formatTime(selectedTimeSlot)}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.showAllButton}
//             onPress={() => setShowAllTimeSlots(true)}
//           >
//             <Text style={styles.showAllButtonText}>Show all time slots</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return null;
//   };

//   const handlePressConfirm = () => {
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

//   return (
//     <>
//       <View style={{ flex: 1 }}>
//         {filteredSalons.length === 0 ? (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#2F4EAA" />
//             <Text style={{ marginTop: 10, fontSize: 16, color: '#2F4EAA' }}>
//               {selectedTimeSlot 
//                 ? "No salons available at the selected time" 
//                 : "Fetching available salons..."
//               }
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
//                 <Text style={styles.sectionTitle}>
//                   Available Salons ({filteredSalons.length} found)
//                 </Text>
//                 <Text style={styles.filterInfoText}>
//                   Showing {filteredSalons.length} salons that offer all selected services
//            </Text>
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
//                     <FontAwesome name="heart" size={16} color="#2F4EAA" style={styles.heartIcon} />
//                   )}
//                   <Image source={{ uri: salon.image }} style={styles.salonImage} />
//                   <View style={styles.salonInfo}>
//                     <View style={styles.nameAndServicesRow}>
//                       <Text style={styles.salonName}>{salon.salon_name}</Text>
//                       {!isSalonFavorite(salon.id) && (
//                         <View style={styles.availableStylistBadge}>
//                           <Text style={styles.availableStylistText}>
//                             {availableStylistsBySalon[salon.id]?.length || 0} stylists available
//                           </Text>
//                         </View>
//                       )}
//                     </View>
//                     {salon.services && salon.services.length > 0 && (
//                       <View style={styles.servicesContainer}>
//                         <Text style={styles.servicesTitle}>Selected Services:</Text>
//                         {salon.services.map(service => (
//                           <Text key={service.id} style={styles.serviceName}>
//                             • {service.name} - ₹{service.price} ({service.time} mins)
//                           </Text>
//                         ))}
//                         <Text style={styles.totalPriceText}>
//                           Total: ₹{salon.price} ({salon.completionTime})
//                         </Text>
//                       </View>
//                     )}
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
//                     <Text style={styles.sectionTitle}>
//                       {isSalonFavorite(salon.id) ? 'Available Stylists' : 'Available Stylists'}
//                     </Text>

//                     <FlatList
//                       horizontal
//                       data={filteredStylists}
//                       keyExtractor={(item) => item.id.toString()}
//                       renderItem={({ item: stylist }) => (
//                         <TouchableOpacity
//                           style={[
//                             styles.stylistCard,
//                             selectedStylist?.id === stylist.id && styles.selectedStylistCard,
//                           ]}
//                           onPress={() => handleStylistSelect(stylist)}
//                         >
//                           <Image
//                             source={{ uri: stylist.profile_pic }}
//                             style={styles.stylistImage}
//                           />
//                           <Text style={styles.stylistName}>
//                             {stylist.full_name}
//                           </Text>
//                           <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
//                           <Text style={styles.stylistSpecialty}>
//                             {stylist.specialization || "Hair Specialist"}
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                       contentContainerStyle={styles.stylistContainer}
//                       showsHorizontalScrollIndicator={false}
//                     />

//                     {/* Booking Section */}
//                     {selectedStylist && (
//                       <View style={styles.bookingSection}>
//                         {/* Date Selection - ONLY for favorite salons */}
//                         {isSalonFavorite(selectedSalon) && (
//                           <>
//                             <Text style={styles.sectionTitle}>Select Date</Text>
//                             <TouchableOpacity
//                               style={styles.dateSelector}
//                               onPress={() => setShowCalendar(!showCalendar)}
//                             >
//                               <FontAwesome name="calendar" size={20} color="#2F4EAA" />
//                               <Text style={styles.dateText}>
//                                 {new Date(selectedDate).toLocaleDateString('en-US', {
//                                   weekday: 'long',
//                                   month: 'long',
//                                   day: 'numeric'
//                                 })}
//                               </Text>
//                             </TouchableOpacity>

//                             {showCalendar && (
//                               <View style={styles.calendarContainer}>
//                                 <Calendar
//                                   current={selectedDate}
//                                   minDate={new Date().toISOString().split('T')[0]}
//                                   onDayPress={handleDateSelect}
//                                   markedDates={markedDates}
//                                   theme={{
//                                     selectedDayBackgroundColor: '#2F4EAA',
//                                     todayTextColor: '#2F4EAA',
//                                     arrowColor: '#2F4EAA',
//                                   }}
//                                 />
//                               </View>
//                             )}
//                           </>
//                         )}

//                         {/* Time Slots */}
//                         <Text style={styles.sectionTitle}>
//                           {isSalonFavorite(selectedSalon) ? 'Available Time Slots' : 'Available Time Slots'}
//                         </Text>
//                         {renderTimeSlots()}
//                       </View>
//                     )}
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
//   const [availableStylistsBySalon, setAvailableStylistsBySalon] = useState({});
  
//   // New state variables for booking section
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [markedDates, setMarkedDates] = useState({});
//   const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);
//   const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

//   const { customer, logout } = useAuth();
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
//           { text: 'Cancel', style: 'cancel' },
//           { 
//             text: 'Login', 
//             onPress: async () => {
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
//         selectedColor: '#2F4EAA',
//       }
//     });
//   }, [selectedDate]);

//   // Fetch available time slots when stylist or date changes (for favorite salons only)
//   useEffect(() => {
//     if (selectedStylist && selectedSalon) {
//       fetchAvailableTimeSlots();
//     }
//   }, [selectedStylist, selectedDate, selectedSalon]);

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
  
//   // Check stylist availability for EXACT selected time slot
//   const checkStylistAvailabilityForExactTime = async (stylistId) => {
//     try {
//       if (!selectedTimeSlot) return false;
      
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
//       );

//       // Filter out cancelled appointments
//       const validAppointments = response.data.filter(
//         appt => appt.status !== "Cancelled"
//       );

//       // Check if stylist is booked at the EXACT selected time slot
//       const isBookedAtSelectedTime = validAppointments.some(appt => {
//         const appointmentTime = utcToLocalTime(appt.start_datetime);
//         return appointmentTime === selectedTimeSlot;
//       });

//       console.log(`Stylist ${stylistId} availability for ${selectedTimeSlot}:`, !isBookedAtSelectedTime);

//       return !isBookedAtSelectedTime; // Available if NOT booked at selected time
//     } catch (error) {
//       console.error("Error checking stylist availability:", error);
//       return false; // Default to unavailable if there's an error
//     }
//   };

//   // Check ALL stylists availability for a salon at exact time
//   const checkSalonAvailability = async (salonId) => {
//     try {
//       const salonStylists = stylists.filter(stylist => stylist.salon === salonId);
      
//       const availableStylists = [];
      
//       for (const stylist of salonStylists) {
//         const isAvailable = await checkStylistAvailabilityForExactTime(stylist.id);
//         if (isAvailable) {
//           availableStylists.push(stylist);
//         }
//       }
      
//       return availableStylists;
//     } catch (error) {
//       console.error("Error checking salon availability:", error);
//       return [];
//     }
//   };

//   // Update availability for ALL salons
//   useEffect(() => {
//     const updateAllSalonsAvailability = async () => {
//       if (!selectedTimeSlot || salons.length === 0) return;
      
//       console.log('🔄 Updating availability for all salons at time:', selectedTimeSlot);
      
//       const availabilityMap = {};
      
//       for (const salon of salons) {
//         // For favorite salons, we don't filter - they show regardless
//         if (isSalonFavorite(salon.id)) {
//           availabilityMap[salon.id] = []; // We'll populate this when they select the salon
//           continue;
//         }
        
//         // For non-favorite salons, check availability
//         const availableStylists = await checkSalonAvailability(salon.id);
//         availabilityMap[salon.id] = availableStylists;
        
//         console.log(`🏢 Salon ${salon.salon_name} has ${availableStylists.length} available stylists`);
//       }
      
//       setAvailableStylistsBySalon(availabilityMap);
//     };

//     updateAllSalonsAvailability();
//   }, [selectedTimeSlot, selectedDate, salons, favoriteSalons]);

//   // Original availability check for favorite salons (with time slot changes)
//   const checkStylistAvailability = async (stylistId) => {
//     try {
//       const response = await axios.get(
//         `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
//       );

//       // Filter out cancelled appointments
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
    
//     if (selectedSalon && stylists.length > 0 && isSalonFavorite(selectedSalon)) {
//       console.log('✅ Conditions met, calling updateStylistAvailability for favorite salon');
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
//                 services: [],
//                 serviceIds: new Set()
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
//             serviceDetails[serviceSalon.salon_id].serviceIds.add(service.id);
//           });
//         }
//         // Now filter to only include salons that offer ALL selected services
//         const selectedServiceIds = new Set(selectedServices.map(service => service.id));
//         const eligibleSalonIds = Object.keys(serviceDetails).filter(salonId => {
//           const salonServices = serviceDetails[salonId].serviceIds;
//           // Check if salon has ALL selected services
//           return selectedServiceIds.size === serviceDetails[salonId].services.length;
//         });

//         console.log('🎯 Eligible salons that offer ALL services:', {
//           selectedServices: selectedServices.map(s => s.name),
//           selectedServiceIds: Array.from(selectedServiceIds),
//           eligibleSalonIds,
//           totalSalonsFound: Object.keys(serviceDetails).length,
//           eligibleCount: eligibleSalonIds.length
//         });

//         // Create filtered service details with only eligible salons
//         const filteredServiceDetails = {};
//         eligibleSalonIds.forEach(salonId => {
//           filteredServiceDetails[salonId] = serviceDetails[salonId];
//         });

//         setServiceDetailsBySalonId(filteredServiceDetails);

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
//             // REMOVED: profile_pic assignment from random images array
//             // We'll use the actual profile_pic from API or show default icon
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

//      const salonsData = salonsRes.data.data
//           .filter(salon => eligibleSalonIds.includes(salon.id.toString()))
//           .map((salon, index) => {
//             const ratings = salonRatingsMap[salon.id] || [];
//             const avgRating =
//               ratings.length > 0
//                 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
//                 : "4.0";
//             return {
//               ...salon,
//               image: salonImages[index % salonImages.length],
//               price: filteredServiceDetails[salon.id].cost,
//               completionTime: `${filteredServiceDetails[salon.id].completionTime} mins`,
//               services: filteredServiceDetails[salon.id].services,
//               distance: Math.floor(Math.random() * 10) + 1,
//               rating: avgRating
//             };
//           });

//         console.log('🏢 Final salons data after filtering:', {
//           totalSalonsFromAPI: salonsRes.data.data.length,
//           salonsAfterFilter: salonsData.length,
//           salonNames: salonsData.map(s => s.salon_name)
//         });

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
    
//     // Apply filters (price, rating, etc.)
//     switch (activeFilter) {
//       case 'price_low': result.sort((a, b) => a.price - b.price); break;
//       case 'price_high': result.sort((a, b) => b.price - a.price); break;
//       case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
//       case 'nearby': default: result.sort((a, b) => a.distance - b.distance);
//     }
    
//     // NEW: Filter out non-favorite salons that don't have available stylists
//     result = result.filter(salon => {
//       // Always show favorite salons
//       if (isSalonFavorite(salon.id)) return true;
      
//       // For non-favorite salons, only show if they have available stylists
//       const hasAvailableStylists = availableStylistsBySalon[salon.id]?.length > 0;
//       return hasAvailableStylists;
//     });
    
//     return result;
//   }, [salons, activeFilter, availableStylistsBySalon, favoriteSalons]);

//   // FIXED: Get filtered stylists - show ALL available stylists for both favorite and non-favorite salons
//   const filteredStylists = React.useMemo(() => {
//     if (!selectedSalon) return [];
    
//     // For favorite salons, show all stylists
//     if (isSalonFavorite(selectedSalon)) {
//       return stylists.filter(stylist => stylist.salon === selectedSalon);
//     }
    
//     // For non-favorite salons, show all available stylists at exact time
//     return availableStylistsBySalon[selectedSalon] || [];
//   }, [selectedSalon, stylists, availableStylistsBySalon, favoriteSalons]);

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

//   // FIXED: Salon selection handler - don't auto-select stylist for non-favorite salons
//   const handleSalonSelect = (salonId) => {
//     console.log('🏢 Salon selection triggered:', {
//       clickedSalonId: salonId,
//       isFavorite: isSalonFavorite(salonId),
//       hasAvailableStylists: availableStylistsBySalon[salonId]?.length > 0
//     });
    
//     // Reset selections when changing salon
//     setSelectedStylist(null);
//     setSelectedSalon(salonId === selectedSalon ? null : salonId);
//     setShowAllTimeSlots(false);
//   };

//   const handleStylistSelect = (stylist) => {
//     setSelectedStylist(stylist);
//   };

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//     setShowCalendar(false);
//     setSelectedTime(selectedTimeSlot);
//     setShowAllTimeSlots(false);
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

//       setBookedTimeSlots(bookedSlots);

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
//         setShowAllTimeSlots(false);
//         setSelectedTime(null);
//       } else if (!isPreviouslySelectedSlotAvailable) {
//         setShowAllTimeSlots(true);
//         setSelectedTime(null);
//       } else {
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

//   // FIXED: Render time slots - ALLOW time slot changes for ALL salons
//   const renderTimeSlots = () => {
//     if (loadingSlots) {
//       return <ActivityIndicator size="small" color="#2F4EAA" />;
//     }

//     const isAvailable = stylistAvailability[selectedStylist?.id];

//     // ❌ CASE 1: Stylist not available at all
//     if (isAvailable === false || availableSlots.length === 0) {
//       return (
//         <View style={styles.unavailableContainer}>
//           <View style={styles.unavailableCard}>
//             <Text style={styles.unavailableTitle}>Stylist Not Available</Text>
//             <TouchableOpacity
//               style={styles.changeTimeSlotButton}
//               onPress={() => setShowAllTimeSlots(true)}
//             >
//               <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }

//     // ❌ CASE 2: Previously selected slot is already booked → show message immediately
//     const isPreviouslySelectedSlotBooked = bookedTimeSlots.includes(selectedTimeSlot);
//     if (isPreviouslySelectedSlotBooked && !showAllTimeSlots) {
//       return (
//         <View style={styles.unavailableContainer}>
//           <View style={styles.unavailableCard}>
//             <Text style={styles.unavailableTitle}>
//               Stylist Not Available for {selectedTimeSlot}
//             </Text>
//             <TouchableOpacity
//               style={styles.changeTimeSlotButton}
//               onPress={() => setShowAllTimeSlots(true)}
//             >
//               <Text style={styles.changeTimeSlotButtonText}>Change Time Slot</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }

//     // ✅ CASE 3: Show all time slots directly if flagged
//     if (showAllTimeSlots) {
//       return (
//         <View style={styles.timeSlotsGrid}>
//           {timeSlotsFromCScreen1.map((time, index) => {
//             const isPastTime = isTimeSlotInPast(time);
//             const isBooked = !availableSlots.includes(time);
//             const isDisabled = isPastTime || isBooked;

//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.timeSlot,
//                   selectedTime === time && styles.selectedTimeSlot,
//                   isDisabled && styles.unavailableTimeSlot
//                 ]}
//                 onPress={() => !isDisabled && handleTimeSelect(time)}
//                 disabled={isDisabled}
//               >
//                 <Text
//                   style={[
//                     styles.timeSlotText,
//                     selectedTime === time && styles.selectedTimeSlotText,
//                     isDisabled && { color: '#bbb' }
//                   ]}
//                 >
//                   {formatTime(time)}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       );
//     }

//     // ✅ CASE 4: If slot is still available → show it + button
//     if (selectedTimeSlot && availableSlots.includes(selectedTimeSlot)) {
//       return (
//         <View style={styles.timeSlotsGrid}>
//           <TouchableOpacity
//             style={[styles.timeSlot, styles.selectedTimeSlot]}
//             onPress={() => handleTimeSelect(selectedTimeSlot)}
//           >
//             <Text style={[styles.timeSlotText, styles.selectedTimeSlotText]}>
//               {formatTime(selectedTimeSlot)}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.showAllButton}
//             onPress={() => setShowAllTimeSlots(true)}
//           >
//             <Text style={styles.showAllButtonText}>Show all time slots</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return null;
//   };

//   // NEW: Function to render stylist image with fallback to person icon
//   const renderStylistImage = (stylist) => {
//     if (stylist.profile_pic) {
//       return (
//         <Image
//           source={{ uri: stylist.profile_pic }}
//           style={styles.stylistImage}
//         />
//       );
//     } else {
//       return (
//         <View style={styles.stylistIconContainer}>
//           <Ionicons name="person" size={40} color="#666" />
//         </View>
//       );
//     }
//   };

//   const handlePressConfirm = () => {
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

//   return (
//     <>
//       <View style={{ flex: 1 }}>
//         {filteredSalons.length === 0 ? (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#2F4EAA" />
//             <Text style={{ marginTop: 10, fontSize: 16, color: '#2F4EAA' }}>
//               {selectedTimeSlot 
//                 ? "No salons available at the selected time" 
//                 : "Fetching available salons..."
//               }
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
//                 <Text style={styles.sectionTitle}>
//                   Available Salons ({filteredSalons.length} found)
//                 </Text>
//                 <Text style={styles.filterInfoText}>
//                   Showing {filteredSalons.length} salons that offer all selected services
//            </Text>
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
//                     <FontAwesome name="heart" size={16} color="#2F4EAA" style={styles.heartIcon} />
//                   )}
//                   <Image source={{ uri: salon.image }} style={styles.salonImage} />
//                   <View style={styles.salonInfo}>
//                     <View style={styles.nameAndServicesRow}>
//                       <Text style={styles.salonName}>{salon.salon_name}</Text>
//                       {!isSalonFavorite(salon.id) && (
//                         <View style={styles.availableStylistBadge}>
//                           <Text style={styles.availableStylistText}>
//                             {availableStylistsBySalon[salon.id]?.length || 0} stylists available
//                           </Text>
//                         </View>
//                       )}
//                     </View>
//                     {salon.services && salon.services.length > 0 && (
//                       <View style={styles.servicesContainer}>
//                         <Text style={styles.servicesTitle}>Selected Services:</Text>
//                         {salon.services.map(service => (
//                           <Text key={service.id} style={styles.serviceName}>
//                             • {service.name} - ₹{service.price} ({service.time} mins)
//                           </Text>
//                         ))}
//                         <Text style={styles.totalPriceText}>
//                           Total: ₹{salon.price} ({salon.completionTime})
//                         </Text>
//                       </View>
//                     )}
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
//                     <Text style={styles.sectionTitle}>
//                       {isSalonFavorite(salon.id) ? 'Available Stylists' : 'Available Stylists'}
//                     </Text>

//                     <FlatList
//                       horizontal
//                       data={filteredStylists}
//                       keyExtractor={(item) => item.id.toString()}
//                       renderItem={({ item: stylist }) => (
//                         <TouchableOpacity
//                           style={[
//                             styles.stylistCard,
//                             selectedStylist?.id === stylist.id && styles.selectedStylistCard,
//                           ]}
//                           onPress={() => handleStylistSelect(stylist)}
//                         >
//                           {/* UPDATED: Use the new renderStylistImage function */}
//                           {renderStylistImage(stylist)}
//                           <Text style={styles.stylistName}>
//                             {stylist.full_name}
//                           </Text>
//                           <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
//                           <Text style={styles.stylistSpecialty}>
//                             {stylist.specialization || "Hair Specialist"}
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                       contentContainerStyle={styles.stylistContainer}
//                       showsHorizontalScrollIndicator={false}
//                     />

//                     {/* Booking Section */}
//                     {selectedStylist && (
//                       <View style={styles.bookingSection}>
//                         {/* Date Selection - ONLY for favorite salons */}
//                         {isSalonFavorite(selectedSalon) && (
//                           <>
//                             <Text style={styles.sectionTitle}>Select Date</Text>
//                             <TouchableOpacity
//                               style={styles.dateSelector}
//                               onPress={() => setShowCalendar(!showCalendar)}
//                             >
//                               <FontAwesome name="calendar" size={20} color="#2F4EAA" />
//                               <Text style={styles.dateText}>
//                                 {new Date(selectedDate).toLocaleDateString('en-US', {
//                                   weekday: 'long',
//                                   month: 'long',
//                                   day: 'numeric'
//                                 })}
//                               </Text>
//                             </TouchableOpacity>

//                             {showCalendar && (
//                               <View style={styles.calendarContainer}>
//                                 <Calendar
//                                   current={selectedDate}
//                                   minDate={new Date().toISOString().split('T')[0]}
//                                   onDayPress={handleDateSelect}
//                                   markedDates={markedDates}
//                                   theme={{
//                                     selectedDayBackgroundColor: '#2F4EAA',
//                                     todayTextColor: '#2F4EAA',
//                                     arrowColor: '#2F4EAA',
//                                   }}
//                                 />
//                               </View>
//                             )}
//                           </>
//                         )}

//                         {/* Time Slots */}
//                         <Text style={styles.sectionTitle}>
//                           {isSalonFavorite(selectedSalon) ? 'Available Time Slots' : 'Available Time Slots'}
//                         </Text>
//                         {renderTimeSlots()}
//                       </View>
//                     )}
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

// Base URL for images
const BASE_URL = 'https://yaslaservice.com:81';

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
  const [availableStylistsBySalon, setAvailableStylistsBySalon] = useState({});
  const [salonGalleries, setSalonGalleries] = useState({}); // NEW: Store salon galleries
  
  // New state variables for booking section
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const [allSalonsData, setAllSalonsData] = useState([]); // Store all salons from API

  const { customer, logout } = useAuth();
  const customerId = customer?.data?.customer_id;
  const { selectedServices, selectedTimeSlot, selectedDate: initialSelectedDate } = route.params;
  const navigation = useNavigation();

  // UPDATED: Function to get stylist image with fallback to person icon
  const getStylistImage = (stylist) => {
    if (stylist.profile_image ) {
      return { uri: `${BASE_URL}${stylist.profile_image }` };
    }
    // Return null for default person icon - we'll handle this in the render
    return null;
  };

  // UPDATED: Function to get salon image with building icon fallback
  const getSalonImage = (salonId) => {
    const gallery = salonGalleries[salonId];
    if (gallery && gallery.length > 0) {
      // Return the first gallery image for this salon
      return `${BASE_URL}${gallery[0].image}`;
    }
    
    // Fallback to profile image if available
    const salon = allSalonsData.find(s => s.id === salonId);
    if (salon?.profile_image) {
      return `${BASE_URL}${salon.profile_image}`;
    }
    
    // Return null for default building icon - we'll handle this in the render
    return null;
  };

  // ADDED: Guest authentication handler
  const handleGuestAction = (action) => {
    if (customer?.isGuest) {
      Alert.alert(
        "Login Required",
        "Please register or login to continue.",
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Login', 
            onPress: async () => {
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

  // NEW: Fetch salon galleries
  const fetchSalonGalleries = async () => {
    try {
      const response = await axios.get('https://yaslaservice.com:81/salon-galleries/');
      if (response.data.status === 'success') {
        const galleries = response.data.data;
        
        // Group galleries by salon ID
        const galleriesBySalon = {};
        galleries.forEach(gallery => {
          const salonId = gallery.salon;
          if (!galleriesBySalon[salonId]) {
            galleriesBySalon[salonId] = [];
          }
          galleriesBySalon[salonId].push(gallery);
        });
        
        setSalonGalleries(galleriesBySalon);
        console.log('🖼️ Salon galleries loaded:', Object.keys(galleriesBySalon).length, 'salons have images');
      }
    } catch (error) {
      console.error("Error fetching salon galleries:", error);
    }
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
        selectedColor: '#2F4EAA',
      }
    });
  }, [selectedDate]);

  // Fetch available time slots when stylist or date changes (for favorite salons only)
  useEffect(() => {
    if (selectedStylist && selectedSalon) {
      fetchAvailableTimeSlots();
    }
  }, [selectedStylist, selectedDate, selectedSalon]);

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

  // UPDATED: Get favorite salon status from allSalonsData
  const getFavoriteSalonStatus = (salonId) => {
    const salon = allSalonsData.find(s => s.id === salonId);
    return salon?.salon_status || 'Offline';
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

  // FIXED: Filter favorite salons to only show those that offer the selected service AND are ONLINE
  const renderFavoriteSalons = () => {
    if (loadingFavorites) {
      return (
        <View style={styles.favoriteSection}>
          <Text style={styles.sectionTitle}>Your Favorites</Text>
          <ActivityIndicator size="small" color="#6C63FF" />
        </View>
      );
    }

    // Filter favorite salons to only include those that:
    // 1. Offer the selected service
    // 2. Are ONLINE
    const availableFavoriteSalons = favoriteSalons.filter(favorite => {
      const offersService = favoriteOffersService(favorite.id);
      const isOnline = getFavoriteSalonStatus(favorite.id) === "Online";
      
      return offersService && isOnline;
    });

    if (availableFavoriteSalons.length === 0) return null;
    
    return (
      <View style={styles.favoriteSection}>
        <Text style={styles.sectionTitle}>Your Favorite Salons (Online)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteScrollView}>
          {availableFavoriteSalons.map((favorite) => {
            const salonData = salons.find(salon => salon.id === favorite.id);
            const salonImage = getSalonImage(favorite.id);
            const salonStatus = getFavoriteSalonStatus(favorite.id);
            
            return (
              <TouchableOpacity
                key={favorite.id}
                style={[
                  styles.favoriteSalonCard,
                  selectedSalon === favorite.id && styles.selectedFavoriteSalonCard,
                ]}
                onPress={() => handleFavoriteSalonSelect(favorite.id)}
              >
                {/* Salon status badge */}
                {/* <View style={[
                  styles.favoriteStatusBadge,
                  salonStatus === "Online" ? styles.onlineBadge : styles.offlineBadge
                ]}>
                  <Text style={styles.favoriteStatusText}>
                    {salonStatus === "Online" ? "🟢 Online" : "🔴 Offline"}
                  </Text>
                </View> */}
                
                {/* UPDATED: Salon image with building icon fallback */}
                {salonImage ? (
                  <Image
                    source={{ uri: salonImage }} 
                    style={styles.favoriteSalonImage}
                  />
                ) : (
                  <View style={[styles.favoriteSalonImage, styles.personIconContainer]}>
                    <Ionicons name="person" size={40} color="#666" />
                  </View>
                )}
                <View style={styles.favoriteSalonInfo}>
                  <Text style={styles.favoriteSalonName}>{favorite.salon_name}</Text>
                  <Text style={styles.favoriteSalonAddress}>{favorite.locality}, {favorite.city}</Text>
                  {salonData && (
                    <View style={styles.favoriteSalonMeta}>
                      <Text style={styles.favoriteSalonRating}>★ {salonData.rating || "4.5"}</Text>
                      <Text style={styles.favoriteSalonPrice}>₹{salonData.price}</Text>
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
  
  // Check stylist availability for EXACT selected time slot
  const checkStylistAvailabilityForExactTime = async (stylistId) => {
    try {
      if (!selectedTimeSlot) return false;
      
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
      );

      // Filter out cancelled appointments
      const validAppointments = response.data.filter(
        appt => appt.status !== "Cancelled"
      );

      // Check if stylist is booked at the EXACT selected time slot
      const isBookedAtSelectedTime = validAppointments.some(appt => {
        const appointmentTime = utcToLocalTime(appt.start_datetime);
        return appointmentTime === selectedTimeSlot;
      });

      console.log(`Stylist ${stylistId} availability for ${selectedTimeSlot}:`, !isBookedAtSelectedTime);

      return !isBookedAtSelectedTime; // Available if NOT booked at selected time
    } catch (error) {
      console.error("Error checking stylist availability:", error);
      return false; // Default to unavailable if there's an error
    }
  };

  // Check ALL stylists availability for a salon at exact time
  const checkSalonAvailability = async (salonId) => {
    try {
      const salonStylists = stylists.filter(stylist => stylist.salon === salonId);
      
      const availableStylists = [];
      
      for (const stylist of salonStylists) {
        const isAvailable = await checkStylistAvailabilityForExactTime(stylist.id);
        if (isAvailable) {
          availableStylists.push(stylist);
        }
      }
      
      return availableStylists;
    } catch (error) {
      console.error("Error checking salon availability:", error);
      return [];
    }
  };

  // Update availability for ALL salons
  useEffect(() => {
    const updateAllSalonsAvailability = async () => {
      if (!selectedTimeSlot || salons.length === 0) return;
      
      console.log('🔄 Updating availability for all salons at time:', selectedTimeSlot);
      
      const availabilityMap = {};
      
      for (const salon of salons) {
        // For favorite salons, we don't filter - they show regardless
        if (isSalonFavorite(salon.id)) {
          availabilityMap[salon.id] = []; // We'll populate this when they select the salon
          continue;
        }
        
        // For non-favorite salons, check availability
        const availableStylists = await checkSalonAvailability(salon.id);
        availabilityMap[salon.id] = availableStylists;
        
        console.log(`🏢 Salon ${salon.salon_name} has ${availableStylists.length} available stylists`);
      }
      
      setAvailableStylistsBySalon(availabilityMap);
    };

    updateAllSalonsAvailability();
  }, [selectedTimeSlot, selectedDate, salons, favoriteSalons]);

  // Original availability check for favorite salons (with time slot changes)
  const checkStylistAvailability = async (stylistId) => {
    try {
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
      );

      // Filter out cancelled appointments
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
    
    if (selectedSalon && stylists.length > 0 && isSalonFavorite(selectedSalon)) {
      console.log('✅ Conditions met, calling updateStylistAvailability for favorite salon');
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
        setLoading(true);
        
        // Fetch salon galleries first
        await fetchSalonGalleries();

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
                services: [],
                serviceIds: new Set()
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
            serviceDetails[serviceSalon.salon_id].serviceIds.add(service.id);
          });
        }
        
        // Now filter to only include salons that offer ALL selected services
        const selectedServiceIds = new Set(selectedServices.map(service => service.id));
        const eligibleSalonIds = Object.keys(serviceDetails).filter(salonId => {
          const salonServices = serviceDetails[salonId].serviceIds;
          // Check if salon has ALL selected services
          return selectedServiceIds.size === serviceDetails[salonId].services.length;
        });

        console.log('🎯 Eligible salons that offer ALL services:', {
          selectedServices: selectedServices.map(s => s.name),
          selectedServiceIds: Array.from(selectedServiceIds),
          eligibleSalonIds,
          totalSalonsFound: Object.keys(serviceDetails).length,
          eligibleCount: eligibleSalonIds.length
        });

        // Create filtered service details with only eligible salons
        const filteredServiceDetails = {};
        eligibleSalonIds.forEach(salonId => {
          filteredServiceDetails[salonId] = serviceDetails[salonId];
        });

        setServiceDetailsBySalonId(filteredServiceDetails);

        const [salonsRes, stylistsRes, feedbacksRes] = await Promise.all([
          axios.get('https://yaslaservice.com:81/salons/'),
          axios.get('https://yaslaservice.com:81/users/'),
          axios.get('https://yaslaservice.com:81/feedbacks/')
        ]);

        // Store ALL salons data for checking favorite salon status
        setAllSalonsData(salonsRes.data.data);

        const usersData = stylistsRes.data.data;
        
        // UPDATED: Include both 'Stylist' and 'Stylist/Admin' roles AND filter by Active status
        const stylistsWithRole = usersData
          .filter(user => {
            const isStylist = user.user_role === 'Stylist' || user.user_role === 'Stylist/Admin';
            const isActive = user.status === 'Active'; // IMPORTANT: Check for Active status
            return isStylist && isActive;
          })
          .map((stylist) => ({
            ...stylist,
            // REMOVED: static image assignment - we'll use the actual profile_pic from API
          }));
        
        console.log('✅ Filtered stylists (Active only):', {
          totalUsers: usersData.length,
          activeStylists: stylistsWithRole.length,
          byRole: stylistsWithRole.reduce((acc, stylist) => {
            acc[stylist.user_role] = (acc[stylist.user_role] || 0) + 1;
            return acc;
          }, {})
        });
        
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

        // UPDATED: Filter salons - only show ONLINE salons
        const salonsData = salonsRes.data.data
          .filter(salon => {
            // 1. Must be eligible for selected services
            const isEligible = eligibleSalonIds.includes(salon.id.toString());
            // 2. Must be ONLINE
            const isOnline = salon.salon_status === "Online";
            
            console.log(`Salon ${salon.id} - ${salon.salon_name}:`, {
              isEligible,
              isOnline,
              status: salon.salon_status
            });
            
            return isEligible && isOnline;
          })
          .map((salon) => {
            const ratings = salonRatingsMap[salon.id] || [];
            const avgRating =
              ratings.length > 0
                ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
                : "4.0";
            
            // Get active stylists for this salon
            const salonActiveStylists = stylistsWithRole.filter(stylist => stylist.salon === salon.id);
            
            return {
              ...salon,
              price: filteredServiceDetails[salon.id].cost,
              completionTime: `${filteredServiceDetails[salon.id].completionTime} mins`,
              services: filteredServiceDetails[salon.id].services,
              distance: Math.floor(Math.random() * 10) + 1,
              rating: avgRating,
              activeStylistsCount: salonActiveStylists.length // Add count of active stylists
            };
          });

        console.log('🏢 Final salons data after filtering:', {
          totalSalonsFromAPI: salonsRes.data.data.length,
          salonsAfterFilter: salonsData.length,
          salonNames: salonsData.map(s => s.salon_name),
          activeStylistsBySalon: salonsData.map(s => ({
            name: s.salon_name,
            activeStylists: s.activeStylistsCount
          })),
          // Log status breakdown
          statusCount: salonsRes.data.data.reduce((acc, salon) => {
            acc[salon.salon_status] = (acc[salon.salon_status] || 0) + 1;
            return acc;
          }, {}),
        });

        setSalons(salonsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to fetch salons or stylists");
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedServices]);

  // --- FILTERS ---
  const filteredSalons = React.useMemo(() => {
    if (!salons.length) return [];
    
    let result = [...salons];
    
    // Apply filters (price, rating, etc.)
    switch (activeFilter) {
      case 'price_low': result.sort((a, b) => a.price - b.price); break;
      case 'price_high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'nearby': default: result.sort((a, b) => a.distance - b.distance);
    }
    
    // NEW: Filter out non-favorite salons that don't have available stylists
    result = result.filter(salon => {
      // Always show favorite salons (even if they have 0 active stylists)
      if (isSalonFavorite(salon.id)) return true;
      
      // For non-favorite salons, only show if they have available stylists
      const hasAvailableStylists = availableStylistsBySalon[salon.id]?.length > 0;
      return hasAvailableStylists;
    });
    
    return result;
  }, [salons, activeFilter, availableStylistsBySalon, favoriteSalons]);

  // FIXED: Get filtered stylists - show ACTIVE stylists for the selected salon
  const filteredStylists = React.useMemo(() => {
    if (!selectedSalon) return [];
    
    // Return active stylists for this salon
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

  // FIXED: Salon selection handler - allow selecting any online salon
  const handleSalonSelect = (salonId) => {
    console.log('🏢 Salon selection triggered:', {
      clickedSalonId: salonId,
      isFavorite: isSalonFavorite(salonId),
      activeStylistsCount: salons.find(s => s.id === salonId)?.activeStylistsCount || 0
    });
    
    // Reset selections when changing salon
    setSelectedStylist(null);
    setSelectedSalon(salonId === selectedSalon ? null : salonId);
    setShowAllTimeSlots(false);
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    setSelectedTime(selectedTimeSlot);
    setShowAllTimeSlots(false);
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

      setBookedTimeSlots(bookedSlots);

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
        setShowAllTimeSlots(false);
        setSelectedTime(null);
      } else if (!isPreviouslySelectedSlotAvailable) {
        setShowAllTimeSlots(true);
        setSelectedTime(null);
      } else {
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

  // FIXED: Render time slots - ALLOW time slot changes for ALL salons
  const renderTimeSlots = () => {
    if (loadingSlots) {
      return <ActivityIndicator size="small" color="#2F4EAA" />;
    }

    const isAvailable = stylistAvailability[selectedStylist?.id];

    // ❌ CASE 1: Stylist not available at all
    if (isAvailable === false || availableSlots.length === 0) {
      return (
        <View style={styles.unavailableContainer}>
          <View style={styles.unavailableCard}>
            <Text style={styles.unavailableTitle}>Stylist Not Available</Text>
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
  };

  // Function to render stylists section with message if no active stylists
  const renderStylistsSection = () => {
    if (filteredStylists.length === 0) {
      return (
        <View style={styles.noStylistsContainer}>
          <Ionicons name="person-remove-outline" size={50} color="#ccc" />
          <Text style={styles.noStylistsText}>No Active Stylists Available</Text>
          <Text style={styles.noStylistsSubtext}>
            This salon doesn't have any active stylists at the moment.
          </Text>
          <Text style={styles.noStylistsSubtext}>
            Please try another salon or check back later.
          </Text>
        </View>
      );
    }

    return (
      <>
        <FlatList
          horizontal
          data={filteredStylists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: stylist }) => (
            <TouchableOpacity
              style={[
                styles.stylistCard,
                selectedStylist?.id === stylist.id && styles.selectedStylistCard,
              ]}
              onPress={() => handleStylistSelect(stylist)}
            >
              {/* UPDATED: Dynamic stylist image with person icon fallback */}
              {getStylistImage(stylist) ? (
                <Image
                  source={getStylistImage(stylist)}
                  style={styles.stylistImage}
                />
              ) : (
                <View style={[styles.stylistImage, styles.personIconContainer]}>
                  <Ionicons name="person" size={40} color="#666" />
                </View>
              )}
              <Text style={styles.stylistName}>
                {stylist.full_name}
              </Text>
              <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
              <Text style={styles.stylistSpecialty}>
                {stylist.specialization || "Hair Specialist"}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.stylistContainer}
          showsHorizontalScrollIndicator={false}
        />

        {/* Booking Section - Only show if stylist is selected */}
        {selectedStylist && (
          <View style={styles.bookingSection}>
            {/* Date Selection - ONLY for favorite salons */}
            {isSalonFavorite(selectedSalon) && (
              <>
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
              </>
            )}

            {/* Time Slots */}
            <Text style={styles.sectionTitle}>
              Available Time Slots
            </Text>
            {renderTimeSlots()}
          </View>
        )}
      </>
    );
  };

  const handlePressConfirm = () => {
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

  // Show loading state
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2F4EAA" />
        <Text style={{ marginTop: 10, fontSize: 16, color: '#2F4EAA' }}>
          Fetching available salons and stylists...
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        {filteredSalons.length === 0 ? (
          <View style={styles.loaderContainer}>
            <Text style={{ marginTop: 10, fontSize: 16, color: '#2F4EAA' }}>
              {selectedTimeSlot 
                ? "No online salons available at the selected time" 
                : "No online salons available for selected services"
              }
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
                <Text style={styles.sectionTitle}>
                  Available Online Salons ({filteredSalons.length} found)
                </Text>
                <Text style={styles.filterInfoText}>
                  Showing {filteredSalons.length} online salons
                </Text>
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
                    <FontAwesome name="heart" size={16} color="#2F4EAA" style={styles.heartIcon} />
                  )}
                  {/* Salon status indicator */}
                  {/* <View style={[
                    styles.statusBadge,
                    salon.salon_status === "Online" ? styles.onlineBadge : styles.offlineBadge
                  ]}>
                    <Text style={styles.statusText}>
                      {salon.salon_status === "Online" ? "🟢 Online" : "🔴 Offline"}
                    </Text>
                  </View> */}
                  
                  {/* UPDATED: Dynamic salon image with building icon fallback */}
                  {getSalonImage(salon.id) ? (
                    <Image 
                      source={{ uri: getSalonImage(salon.id) }} 
                      style={styles.salonImage} 
                    />
                  ) : (
                    <View style={[styles.salonImage, styles.personIconContainer]}>
                      <Ionicons name="person" size={50} color="#666" />
                    </View>
                  )}
                  <View style={styles.salonInfo}>
                    <View style={styles.nameAndServicesRow}>
                      <Text style={styles.salonName}>{salon.salon_name}</Text>
                      {!isSalonFavorite(salon.id) && (
                        <View style={styles.availableStylistBadge}>
                          <Text style={styles.availableStylistText}>
                            {availableStylistsBySalon[salon.id]?.length || 0} stylists available
                          </Text>
                        </View>
                      )}
                    </View>
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
                    <Text style={styles.sectionTitle}>
                      {isSalonFavorite(salon.id) ? 'Active Stylists' : 'Active Stylists'}
                    </Text>
                    {renderStylistsSection()}
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
    </>
  );
};

export default SalonSelectionScreen;