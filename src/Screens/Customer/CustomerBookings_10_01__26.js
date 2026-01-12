// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const bookings = [
//   {
//     id: '1',
//     service: 'Hair cut',
//     date: '2025-07-25',
//     time: '10:00 AM',
//     bill_amount: '1200.00',
//     start_datetime: null,
//     end_datetime: null,
//     status: 'Confirmed',
//     payment_status: 'Partially Paid',
//     payment_mode: 'UPI',
//     salon: null,
//     branch: null,
//     stylist: null,
//   },
//   {
//     id: '2',
//     service: 'Massage and Spa',
//     date: '2025-07-28',
//     time: '3:00 PM',
//     bill_amount: '800.00',
//     start_datetime: null,
//     end_datetime: null,
//     status: 'Pending',
//     payment_status: 'Unpaid',
//     payment_mode: 'Cash',
//     salon: null,
//     branch: null,
//     stylist: null,
//   },
//    {
//     id: '3',
//     service: 'Hair Wash',
//     date: '2025-07-25',
//     time: '10:00 AM',
//     bill_amount: '1200.00',
//     start_datetime: null,
//     end_datetime: null,
//     status: 'Confirmed',
//     payment_status: 'Partially Paid',
//     payment_mode: 'UPI',
//     salon: null,
//     branch: null,
//     stylist: null,
//   },
//   {
//     id: '4',
//     service: 'Waxing',
//     date: '2025-07-28',
//     time: '3:00 PM',
//     bill_amount: '800.00',
//     start_datetime: null,
//     end_datetime: null,
//     status: 'Pending',
//     payment_status: 'Unpaid',
//     payment_mode: 'Cash',
//     salon: null,
//     branch: null,
//     stylist: null,
//   },
// ];

// const CustomerBookings = () => {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('BookingSummary', { booking: item })}
//     >
//       <Text style={styles.dateTime}>
//         📅 {item.date}   ⏰ {item.time}
//       </Text>
//       <Text style={styles.price}>💰 ₹{item.bill_amount}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>📋 My Bookings</Text>
//       <FlatList
//         data={bookings}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#eaf3ff',
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderLeftWidth: 5,
//     borderLeftColor: '#3399ff',
//   },
//   dateTime: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 6,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1a73e8',
//   },
// });

// export default CustomerBookings;






// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const bookings = [
//   {
//     id: '1',
//     salon: 'Yasla Salon',
//     service: 'Hair cut',
//     stylist: 'Raj',
//     date: '2025-07-25',
//     timeslot: '10:00 AM',
//     booking_time: '2025-07-20 09:15 AM',
//     bill_amount: '1200.00',
//     status: 'Confirmed',
//     payment_status: 'Partially Paid',
//     payment_mode: 'UPI',
//     location: 'Bangalore',
//   },
//   {
//     id: '2',
//     salon: 'Yasla Spa',
//     service: 'Massage and Spa',
//     stylist: 'Anu',
//     date: '2025-07-28',
//     timeslot: '3:00 PM',
//     booking_time: '2025-07-21 02:00 PM',
//     bill_amount: '800.00',
//     status: 'Pending',
//     payment_status: 'Unpaid',
//     payment_mode: 'Cash',
//     location: 'Hyderabad',
//   },
//    {
//     id: '3',
//     salon: 'Yasla Massage',
//     service: 'Full face',
//     stylist: 'Raj',
//     date: '2025-07-25',
//     timeslot: '10:00 AM',
//     booking_time: '2025-07-20 09:15 AM',
//     bill_amount: '1200.00',
//     status: 'Cancelled',
//     payment_status: ' Unpaid',
//     payment_mode: 'UPI',
//     location: 'Bangalore',
//   },
//   {
//     id: '4',
//     salon: 'Yasla Spa',
//     service: 'Massage and Spa',
//     stylist: 'Anu',
//     date: '2025-07-28',
//     timeslot: '3:00 PM',
//     booking_time: '2025-07-21 02:00 PM',
//     bill_amount: '800.00',
//     status: 'Cancelled',
//     payment_status: 'Unpaid',
//     payment_mode: 'Cash',
//     location: 'Hyderabad',
//   },
// ];

// const TABS = ['Pending', 'Confirmed', 'Cancelled'];

// const formatIndianDate = (dateStr) => {
//   const [year, month, day] = dateStr.split('-');
//   return `${day}/${month}/${year}`;
// };

// const CustomerBookings = () => {
//   const navigation = useNavigation();
//   const [selectedTab, setSelectedTab] = useState('Pending');


//   const filteredBookings = bookings.filter((item) => {
//   if (selectedTab === 'Confirmed') return item.status === 'Confirmed';
//   if (selectedTab === 'Pending') return item.status === 'Pending';
//   if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
//   return false;
// });

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('BookingSummary', { booking: item })}
//     >
//       <Text style={styles.primaryText}>🏢 {item.salon}</Text>
//       <Text style={styles.primaryText}>💇 {item.service} - by {item.stylist}</Text>
//       <Text style={styles.dateTime}>📅 {formatIndianDate(item.date)} ⏰ {item.timeslot}</Text>
//       <Text style={styles.price}>💰 ₹{item.bill_amount}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>📋 My Bookings</Text>

//       <View style={styles.tabContainer}>
//         {TABS.map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             style={[
//               styles.tabButton,
//               selectedTab === tab && styles.activeTab,
//             ]}
//             onPress={() => setSelectedTab(tab)}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 selectedTab === tab && styles.activeTabText,
//               ]}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <FlatList
//         data={filteredBookings}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>No {selectedTab} bookings.</Text>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 16 },
//   heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#333' },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 16,
//   },
//   tabButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 18,
//     borderRadius: 20,
//     backgroundColor: '#eee',
//   },
//   activeTab: { backgroundColor: '#1a73e8' },
//   tabText: { fontSize: 14, color: '#333' },
//   activeTabText: { color: '#fff', fontWeight: 'bold' },
//   card: {
//     backgroundColor: '#eaf3ff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderLeftWidth: 5,
//     borderLeftColor: '#3399ff',
//   },
//   primaryText: { fontSize: 15, color: '#333', marginBottom: 4 },
//   dateTime: { fontSize: 14, color: '#444', marginBottom: 6 },
//   price: { fontSize: 16, fontWeight: 'bold', color: '#1a73e8' },
//   emptyText: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
// });

// export default CustomerBookings;








// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity, 
//   StatusBar,
//   SafeAreaView,
//   Modal,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';
// import RatingModal from './RatingModal';
// import { useAuth } from '../../Context/AuthContext'; // Import the Auth context
// import axios from 'axios';
// import { useCallback } from 'react';

// const TABS = ['Pending', 'Confirmed', 'Cancelled'];

// const getStatusColor = (status) => {
//   switch(status.toLowerCase()) {
//     case 'confirmed': return '#4CAF50';
//     case 'pending': return '#FF9800';
//     case 'cancelled': return '#F44336';
//     default: return '#9E9E9E';
//   }
// };

// const getServiceIcon = (service) => {
//   if (service.includes('Hair')) return 'content-cut';
//   if (service.includes('Massage')) return 'spa';
//   if (service.includes('Face')) return 'face';
//   return 'calendar-today';
// };

// const CustomerBookings = () => {
//   const navigation = useNavigation();
//   const { customer } = useAuth(); // Get customer from auth context
//   console.log('Customer Data:', customer);
//   const customerId = customer?.data?.customer_id;

//   const [selectedTab, setSelectedTab] = useState('Pending');
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// const fetchAppointments = async () => {
//   try {
//     setLoading(true);

//     // 1. Fetch appointments
//     const appointmentsResponse = await axios.get(
//       `https://yaslaservice.com:81/appointments/customer/${customerId}/`
//     );

//     if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data)) {
//       throw new Error('Invalid data format received from server');
//     }

//     // 2. Fetch all needed data in parallel
//     const [salonsResponse, usersResponse] = await Promise.all([
//       axios.get('https://yaslaservice.com:81/salons/'),
//       axios.get('https://yaslaservice.com:81/users/')
//     ]);

//     // Process salons data
//     const allSalons = Array.isArray(salonsResponse.data?.data) 
//       ? salonsResponse.data.data 
//       : Array.isArray(salonsResponse.data)
//         ? salonsResponse.data
//         : [salonsResponse.data].filter(Boolean);

//     // Process users data (filter for stylists only)
//     const allUsers = Array.isArray(usersResponse.data?.data)
//       ? usersResponse.data.data.filter(user => user.user_role === 'Stylist')
//       : Array.isArray(usersResponse.data)
//         ? usersResponse.data.filter(user => user.user_role === 'Stylist')
//         : usersResponse.data?.user_role === 'Stylist'
//           ? [usersResponse.data]
//           : [];

//     // Create lookup maps
//     const salonMap = allSalons.reduce((map, salon) => {
//       if (salon && salon.id) map[salon.id] = salon;
//       return map;
//     }, {});

//     const stylistMap = allUsers.reduce((map, user) => {
//       if (user && user.id) map[user.id] = user;
//       return map;
//     }, {});

//     // Transform appointments with proper data matching
//     const transformedBookings = appointmentsResponse.data.map(appointment => {
//       const service = appointment.appointment_services?.[0];
//       const serviceName = service?.service_name || `Service ${service?.service || ''}`;

//       const salon = salonMap[appointment.salon];
//       const stylist = stylistMap[appointment.stylist];

//       return {
//         id: appointment.id.toString(),
//         salon: salon?.salon_name || `Salon ${appointment.salon}`,
//         service: serviceName,
//         serviceId: service?.service,
//         stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
//         stylistId: appointment.stylist,
//         date: appointment.start_datetime,
//         timeslot: moment(appointment.start_datetime).format('h:mm A'),
//         booking_time: appointment.created_at,
//         bill_amount: parseFloat(appointment.bill_amount) || 0,
//         status: appointment.status,
//         payment_status: appointment.payment_status,
//         payment_mode: appointment.payment_mode,
//         location: salon 
//           ? `${salon.street_address || ''}, ${salon.locality || ''}, ${salon.city || ''}`.trim()
//           : 'Location not available',
//         appointmentData: appointment,
//         updated_at: appointment.updated_at,
//       };
//     });

//     const sortedBookings = transformedBookings.sort(
//       (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
//     );

//     setBookings(sortedBookings);
//   } catch (err) {
//     setError('Failed to load bookings. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//   // ✅ Refetch whenever screen comes into focus
//   useFocusEffect(
//     useCallback(() => {
//       if (customerId) {
//         fetchAppointments();
//       }
//     }, [customerId, selectedTab])
//   );

//   const filteredBookings = bookings.filter((item) => {
//     if (selectedTab === 'Confirmed') return item.status === 'Confirmed';
//     if (selectedTab === 'Pending') return item.status === 'Pending';
//     if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
//     return false;
//   });

//   const handleRateBooking = (booking) => {
//     setSelectedBooking(booking);
//     setShowRatingModal(true);
//   };

// const handleSubmitRating = async ({ rating, review }) => {
//   console.log('Submitting rating:', rating, 'Review:', review);
//   try {
//     if (!selectedBooking) {
//       console.error('Rating submission failed: No booking selected');
//       Alert.alert('Error', 'No booking selected');
//       return;
//     }

//     const feedbackData = {
//       rating: rating,
//       review_text: review || null,
//       customer: customer?.data?.customer_id,
//       booking: selectedBooking.id,
//       stylist: selectedBooking.stylistId
//     };

//     console.log('Submitting feedback with data:', JSON.stringify(feedbackData, null, 2));

//     const response = await axios.post(
//       'https://yaslaservice.com:81/feedbacks/',
//       feedbackData
//     );

//     console.log('Feedback submitted successfully:', response.data);
//     Alert.alert('Thank You!', `You rated this booking ${rating} stars`);

//     // Update local state if needed
//     // updateBookingsList(selectedBooking.id, rating, review);

//   } catch (error) {
//     if (error.response) {
//       // Server responded with a status code outside 2xx
//       console.error(
//         'Feedback submission failed with status:', 
//         error.response.status,
//         '\nResponse data:', 
//         error.response.data,
//         '\nHeaders:', 
//         error.response.headers
//       );

//       if (error.response.status === 400) {
//         console.error('Validation error details:', error.response.data);
//         Alert.alert('Error', 'Invalid data. Please check your rating and try again.');
//       } else if (error.response.status === 401) {
//         console.error('Authentication error - user might need to login again');
//         Alert.alert('Session Expired', 'Please login again to submit your rating');
//       } else {
//         Alert.alert('Error', `Server error: ${error.response.status}`);
//       }

//     } else if (error.request) {
//       // Request was made but no response received
//       console.error(
//         'No response received from server. Request config:',
//         error.request
//       );
//       Alert.alert('Network Error', 'Could not connect to server. Please check your internet connection.');

//     } else {
//       // Something happened in setting up the request
//       console.error(
//         'Error setting up feedback request:',
//         error.message,
//         '\nStack trace:',
//         error.stack
//       );
//       Alert.alert('Error', 'Failed to submit rating. Please try again.');
//     }

//     // Additional error tracking (you might integrate with analytics here)
//     console.error('Full error object:', JSON.stringify(error, null, 2));

//   } finally {
//     setShowRatingModal(false);
//   }
// };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.card,
//         { borderLeftColor: getStatusColor(item.status) }
//       ]}
//       onPress={() => navigation.navigate('BookingSummary', { booking: item })}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.serviceIcon}>
//           <Icon 
//             name={getServiceIcon(item.service)} 
//             size={24} 
//             color={getStatusColor(item.status)} 
//           />
//         </View>
//         <View style={styles.serviceInfo}>
//           <Text style={styles.salonName}>{item.salon}</Text>
//           <Text style={styles.serviceText}>{item.service} • {item.stylist}</Text>
//         </View>
//         <View style={styles.statusBadge}>
//           <Text style={styles.statusText}>{item.status}</Text>
//         </View>
//       </View>

//       <View style={styles.cardBody}>
//         <View style={styles.dateTimeContainer}>
//           <Icon name="calendar-today" size={16} color="#666" />
//           <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
//           <Icon name="access-time" size={16} color="#666" style={styles.timeIcon} />
//           <Text style={styles.timeText}>{item.timeslot}</Text>
//         </View>

//         <View style={styles.priceContainer}>
//           <Text style={styles.priceLabel}>Amount</Text>
//           <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
//         </View>
//       </View>

//       <View style={styles.cardFooter}>
//         <View style={styles.locationContainer}>
//           <Icon name="location-on" size={16} color="#666" />
//           <Text style={styles.locationText}>{item.location}</Text>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         {item.status === 'Confirmed' && (
//           <TouchableOpacity 
//             style={styles.rateButton}
//             onPress={(e) => {
//               e.stopPropagation();
//               handleRateBooking(item);
//             }}
//           >
//             <View style={styles.rateButtonContent}>
//               <Icon name="star" size={20} color="#FFD700" />
//               <Text style={styles.rateButtonText}>Rate Us</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Loading your bookings...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.errorContainer}>
//           <Icon name="error-outline" size={50} color="#F44336" />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity 
//             style={styles.retryButton}
//             onPress={() => setError(null)}
//           >
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
//       <View style={styles.container}>
//         <Text style={styles.heading}>My Bookings</Text>

//         <View style={styles.tabContainer}>
//           {TABS.map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[
//                 styles.tabButton,
//                 selectedTab === tab && styles.activeTabButton
//               ]}
//               onPress={() => setSelectedTab(tab)}
//               activeOpacity={0.7}
//             >
//               <Text style={[
//                 styles.tabText,
//                 selectedTab === tab && styles.activeTabText
//               ]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <FlatList
//           data={filteredBookings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <Icon name="event-busy" size={60} color="#E0E0E0" />
//               <Text style={styles.emptyText}>No {selectedTab.toLowerCase()} bookings</Text>
//             </View>
//           }
//         />
//       </View>

//       <RatingModal
//         visible={showRatingModal}
//         onClose={() => setShowRatingModal(false)}
//         onSubmit={handleSubmitRating}
//       />
//     </SafeAreaView>
//   );
// };


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import moment from 'moment';
// import RatingModal from './RatingModal';
// import { useAuth } from '../../Context/AuthContext';
// import axios from 'axios';

// const TABS = ['Pending', 'Confirmed', 'Cancelled'];

// const getStatusColor = (status) => {
//   switch (status.toLowerCase()) {
//     case 'confirmed':
//       return '#4CAF50';
//     case 'accepted':
//       return '#2196F3';
//     case 'pending':
//       return '#FF9800';
//     case 'cancelled':
//       return '#F44336';
//     default:
//       return '#9E9E9E';
//   }
// };

// const getServiceIcon = (service) => {
//   if (service.includes('Hair')) return 'content-cut';
//   if (service.includes('Massage')) return 'spa';
//   if (service.includes('Face')) return 'face';
//   return 'calendar-today';
// };

// const CustomerBookings = () => {
//   const navigation = useNavigation();
//   const { customer } = useAuth();
//   const customerId = customer?.data?.customer_id;

//   const [selectedTab, setSelectedTab] = useState('Pending');
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [countdowns, setCountdowns] = useState({});

//   // Countdown timer effect
//   useEffect(() => {
//     const intervals = {};

//     bookings.forEach((booking) => {
//       if (booking.status === 'Pending' && booking.booking_time) {
//         const createdTime = new Date(booking.booking_time);
//         const now = new Date();
//         const elapsed = Math.floor((now - createdTime) / 1000);
//         const remaining = Math.max(30 - elapsed, 0);

//         setCountdowns((prev) => ({
//           ...prev,
//           [booking.id]: remaining,
//         }));

//         if (remaining > 0) {
//           intervals[booking.id] = setInterval(() => {
//             setCountdowns((prev) => {
//               const current = prev[booking.id];
//               if (current > 1) {
//                 return { ...prev, [booking.id]: current - 1 };
//               } else {
//                 clearInterval(intervals[booking.id]);
//                 fetchAppointments();
//                 return { ...prev, [booking.id]: 0 };
//               }
//             });
//           }, 1000);
//         }
//       }
//     });

//     return () => {
//       Object.values(intervals).forEach(clearInterval);
//     };
//   }, [bookings]);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const appointmentsResponse = await axios.get(
//         `https://yaslaservice.com:81/appointments/customer/${customerId}/`
//       );

//       if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data)) {
//         throw new Error('Invalid data format received from server');
//       }

//       const [salonsResponse, usersResponse] = await Promise.all([
//         axios.get('https://yaslaservice.com:81/salons/'),
//         axios.get('https://yaslaservice.com:81/users/'),
//       ]);

//       const allSalons = Array.isArray(salonsResponse.data?.data)
//         ? salonsResponse.data.data
//         : Array.isArray(salonsResponse.data)
//           ? salonsResponse.data
//           : [salonsResponse.data].filter(Boolean);

//       const allUsers = Array.isArray(usersResponse.data?.data)
//         ? usersResponse.data.data.filter((user) => user.user_role === 'Stylist')
//         : Array.isArray(usersResponse.data)
//           ? usersResponse.data.filter((user) => user.user_role === 'Stylist')
//           : usersResponse.data?.user_role === 'Stylist'
//             ? [usersResponse.data]
//             : [];

//       const salonMap = allSalons.reduce((map, salon) => {
//         if (salon && salon.id) map[salon.id] = salon;
//         return map;
//       }, {});

//       const stylistMap = allUsers.reduce((map, user) => {
//         if (user && user.id) map[user.id] = user;
//         return map;
//       }, {});

//       const transformedBookings = appointmentsResponse.data.map((appointment) => {
//         const services = appointment.appointment_services || [];
//         const serviceNames = services
//           .map((service) => service.service_name || `Service ${service.service || ''}`)
//           .join(', ');

//         const totalBillAmount = services.reduce((total, service) => {
//           return total + (parseFloat(service.price) || 0);
//         }, 0);

//         const salon = salonMap[appointment.salon];
//         const stylist = stylistMap[appointment.stylist];

//         return {
//           id: appointment.id.toString(),
//           salon: salon?.salon_name || `Salon ${appointment.salon}`,
//           services: services,
//           service: serviceNames,
//           serviceCount: services.length,
//           serviceId: services.length > 0 ? services[0].service : null,
//           stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
//           stylistId: appointment.stylist,
//           date: appointment.start_datetime,
//           timeslot: moment(appointment.start_datetime).format('h:mm A'),
//           graceTime: moment(appointment.start_datetime).add(15, 'minutes').format('h:mm A'),
//           booking_time: appointment.created_at,
//           bill_amount: parseFloat(appointment.bill_amount) || totalBillAmount,
//           status: appointment.status,
//           payment_status: appointment.payment_status,
//           payment_mode: appointment.payment_mode,
//           location: salon
//             ? `${salon.street_address || ''}, ${salon.locality || ''}, ${salon.city || ''}`.trim()
//             : 'Location not available',
//           appointmentData: appointment,
//           updated_at: appointment.updated_at,
//         };
//       });

//       const sortedBookings = transformedBookings.sort(
//         (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
//       );

//       setBookings(sortedBookings);
//     } catch (err) {
//       setError('Failed to load bookings. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       if (customerId) {
//         fetchAppointments();
//       }
//     }, [customerId, selectedTab])
//   );

//   const filteredBookings = bookings.filter((item) => {
//     if (selectedTab === 'Confirmed') return item.status === 'Confirmed';
//     // if (selectedTab === 'Accepted') return item.status === 'Accepted';
//     if (selectedTab === 'Pending') return item.status === 'Pending';
//     if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
//     return false;
//   });

//   const handleRateBooking = (booking) => {
//     setSelectedBooking(booking);
//     setShowRatingModal(true);
//   };

//   const handlePayNow = (booking) => {
//     navigation.navigate('PaymentScreen', {
//       bookingDetails: booking,
//       onPaymentSuccess: () => {
//         fetchAppointments();
//       },
//     });
//   };

//   const handleSubmitRating = async ({ rating, review }) => {
//     try {
//       if (!selectedBooking) {
//         Alert.alert('Error', 'No booking selected');
//         return;
//       }

//       const feedbackData = {
//         rating: rating,
//         review_text: review || null,
//         customer: customer?.data?.customer_id,
//         booking: selectedBooking.id,
//         stylist: selectedBooking.stylistId,
//       };

//       await axios.post('https://yaslaservice.com:81/feedbacks/', feedbackData);
//       Alert.alert('Thank You!', `You rated this booking ${rating} stars`);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to submit rating. Please try again.');
//     } finally {
//       setShowRatingModal(false);
//     }
//   };

// //   const renderItem = ({ item }) => (
// //     <TouchableOpacity
// //       style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}
// //       onPress={() => navigation.navigate('BookingSummary', { booking: item })}
// //       activeOpacity={0.8}
// //     >
// //       <View style={styles.cardHeader}>
// //         <View style={styles.serviceIcon}>
// //           <MaterialIcons name={getServiceIcon(item.service)} size={24} color={getStatusColor(item.status)} />
// //         </View>
// //         <View style={styles.serviceInfo}>
// //           <Text style={styles.salonName}>{item.salon}</Text>
// //           <Text style={styles.serviceText}>
// //             {item.serviceCount > 1
// //               ? `${item.serviceCount} services • ${item.stylist}`
// //               : `${item.service} • ${item.stylist}`}
// //           </Text>
// //         </View>
// //         <View style={styles.statusBadge}>
// //           <Text style={styles.statusText}>{item.status}</Text>
// //         </View>
// //       </View>

// //       {/* Booking ID Display */}
// //       <Text style={styles.bookingIdText}>Booking ID: {item.id}</Text>

// //     <View style={styles.cardBody}>
// //   <View style={styles.dateTimeSection}>
// //     <View style={styles.dateTimeContainer}>
// //       <MaterialIcons name="calendar-today" size={16} color="#666" />
// //       <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
// //       <MaterialIcons name="access-time" size={16} color="#666" style={styles.timeIcon} />
// //       <Text style={styles.timeText}>{item.timeslot}</Text>
// //     </View>
    
// //     {/* Show Service Start Time below for Confirmed bookings */}
// //     {item.status === 'Confirmed' && (
// //       <View style={styles.serviceStartContainer}>
// //         <Text style={styles.serviceStartLabel}>Service Start At:</Text>
// //         <Text style={styles.serviceStartTime}>{item.graceTime}</Text>
// //       </View>
// //     )}
// //   </View>
  
// //   <View style={styles.priceContainer}>
// //     <Text style={styles.priceLabel}>Amount</Text>
// //     <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
// //   </View>
// // </View>
// //       <View style={styles.cardFooter}>
// //         <View style={styles.locationContainer}>
// //           <MaterialIcons name="location-on" size={16} color="#666" />
// //           <Text style={styles.locationText}>{item.location}</Text>
// //         </View>

// //         {item.status === 'Accepted' && (
// //           <TouchableOpacity
// //             style={styles.payNowButton}
// //             onPress={(e) => {
// //               e.stopPropagation();
// //               handlePayNow(item);
// //             }}
// //           >
// //             <Text style={styles.payNowButtonText}>Pay Now</Text>
// //           </TouchableOpacity>
// //         )}
// //       </View>

// //       {item.status === 'Pending' && countdowns[item.id] > 0 && (
// //         <View style={styles.countdownContainer}>
// //           <MaterialIcons name="access-time" size={16} color="#FF9800" />
// //           <Text style={styles.countdownText}>
// //             Please wait for {countdowns[item.id]}s for stylist to accept
// //           </Text>
// //         </View>
// //       )}

// //       <View style={styles.actionButtons}>
// //         {item.status === 'Confirmed' && (
// //           <TouchableOpacity
// //             style={styles.rateButton}
// //             onPress={(e) => {
// //               e.stopPropagation();
// //               handleRateBooking(item);
// //             }}
// //           >
// //             <View style={styles.rateButtonContent}>
// //               <MaterialIcons name="star" size={20} color="#FFD700" />
// //               <Text style={styles.rateButtonText}>Rate Us</Text>
// //             </View>
// //           </TouchableOpacity>
// //         )}
// //       </View>
// //     </TouchableOpacity>
// //   );

// const renderItem = ({ item }) => (
//   <TouchableOpacity
//     style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}
//     onPress={() => navigation.navigate('BookingSummary', { booking: item })}
//     activeOpacity={0.8}
//   >
//     <View style={styles.cardHeader}>
//       <View style={styles.serviceIcon}>
//         <MaterialIcons name={getServiceIcon(item.service)} size={24} color={getStatusColor(item.status)} />
//       </View>
//       <View style={styles.serviceInfo}>
//         <Text style={styles.salonName}>{item.salon}</Text>
//         <Text style={styles.serviceText}>
//           {item.serviceCount > 1
//             ? `${item.serviceCount} services • ${item.stylist}`
//             : `${item.service} • ${item.stylist}`}
//         </Text>
//       </View>
//       <View style={styles.statusBadge}>
//         <Text style={styles.statusText}>{item.status}</Text>
//       </View>
//     </View>

//     <Text style={styles.bookingIdText}>Booking ID: {item.id}</Text>

//     <View style={styles.cardBody}>
//       <View style={styles.dateTimeSection}>
//         <View style={styles.dateTimeContainer}>
//           <MaterialIcons name="calendar-today" size={16} color="#666" />
//           <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
//           <MaterialIcons name="access-time" size={16} color="#666" style={styles.timeIcon} />
//           <Text style={styles.timeText}>{item.timeslot}</Text>
//         </View>

//         {item.status === 'Confirmed' && (
//           <View style={styles.serviceStartContainer}>
//             <Text style={styles.serviceStartLabel}>Service Start At:</Text>
//             <Text style={styles.serviceStartTime}>{item.graceTime}</Text>
//           </View>
//         )}
//       </View>

//       <View style={styles.priceContainer}>
//         <Text style={styles.priceLabel}>Amount</Text>
//         <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
//       </View>
//     </View>

//     <View style={styles.cardFooter}>
//       <View style={styles.locationContainer}>
//         <MaterialIcons name="location-on" size={16} color="#666" />
//         <Text style={styles.locationText}>{item.location}</Text>
//       </View>

//       {/* ✅ Pay Now + Pay Later visible only for Confirmed */}
//       {item.status === 'Confirmed' && (
//         <View style={{ flexDirection: 'row', gap: 10 }}>
//           <TouchableOpacity
//             style={[styles.payNowButton, { backgroundColor: '#9E9E9E' }]}
//             onPress={(e) => {
//               e.stopPropagation();
//               // handlePayNow(item);
//             }}
//           >
//             <Text style={styles.payNowButtonText}>Pay Later</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.payNowButton}
//             onPress={(e) => {
//               e.stopPropagation();
//               handlePayNow(item); // same path
//             }}
//           >
//             <Text style={styles.payNowButtonText}>Pay Now</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>

//     {item.status === 'Pending' && countdowns[item.id] > 0 && (
//       <View style={styles.countdownContainer}>
//         <MaterialIcons name="access-time" size={16} color="#FF9800" />
//         <Text style={styles.countdownText}>
//           Please wait for {countdowns[item.id]}s for stylist to accept
//         </Text>
//       </View>
//     )}

//     <View style={styles.actionButtons}>
//       {item.status === 'Confirmed' && (
//         <TouchableOpacity
//           style={styles.rateButton}
//           onPress={(e) => {
//             e.stopPropagation();
//             handleRateBooking(item);
//           }}
//         >
//           <View style={styles.rateButtonContent}>
//             <MaterialIcons name="star" size={20} color="#FFD700" />
//             <Text style={styles.rateButtonText}>Rate Us</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//     </View>
//   </TouchableOpacity>
// );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Loading your bookings...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.errorContainer}>
//           <MaterialIcons name="error-outline" size={50} color="#F44336" />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={() => setError(null)}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#e9ecf0ff" />
//       <View style={styles.container}>
//         <Text style={styles.heading}>My Bookings</Text>

//         <View style={styles.tabContainer}>
//           {TABS.map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
//               onPress={() => setSelectedTab(tab)}
//               activeOpacity={0.7}
//             >
//               <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <FlatList
//           data={filteredBookings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <MaterialIcons name="event-busy" size={60} color="#E0E0E0" />
//               <Text style={styles.emptyText}>No {selectedTab.toLowerCase()} bookings</Text>
//             </View>
//           }
//         />
//       </View>

//       <RatingModal
//         visible={showRatingModal}
//         onClose={() => setShowRatingModal(false)}
//         onSubmit={handleSubmitRating}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   // (same as your original styles)
//   safeArea: { flex: 1, backgroundColor: '#e9ecf0ff' },
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
//   heading: { fontSize: 24, fontFamily: 'Inter_600Bold', color: '#333', marginBottom: 24 },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 5,
//     elevation: 2,
//   },
//   tabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
//   activeTabButton: { backgroundColor: '#2F4EAA' },
//   tabText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#666' },
//   activeTabText: { color: '#FFF', fontFamily: 'Inter_600SemiBold' },
//   listContent: { paddingBottom: 30 },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     elevation: 2,
//   },
//   bookingIdText: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 6,
//     fontFamily: 'Inter_600SemiBold',
//   },
//   cardHeader: { flexDirection: 'row', marginBottom: 12 },
//   serviceIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   serviceInfo: { flex: 1, justifyContent: 'center' },
//   salonName: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#333', marginBottom: 2 },
//   serviceText: { fontSize: 14, color: '#666', fontFamily: 'Inter_400Regular' },
//   statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
//   statusText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
//   cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   dateTimeSection: {
//   flex: 1,
// },
//   dateTimeContainer: { flexDirection: 'row', alignItems: 'center' },
//   dateText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   timeIcon: { marginLeft: 12 },
//   timeText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   priceContainer: { alignItems: 'flex-end' },
//   priceLabel: { fontSize: 12, color: '#888', fontFamily: 'Inter_400Regular' },
//   priceValue: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#333' },
//   cardFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//   },
//   locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   locationText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   payNowButton: { backgroundColor: '#2F4EAA', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
//   payNowButtonText: { color: '#FFF', fontFamily: 'Inter_600SemiBold', fontSize: 14 },
//   countdownContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//     padding: 8,
//     backgroundColor: '#FFF3E0',
//     borderRadius: 8,
//   },
//   countdownText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: '#FF9800',
//     fontFamily: 'Inter_500Medium',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 8,
//   },
//   rateButton: {
//     backgroundColor: '#FFF8E1',
//     borderRadius: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonText: {
//     color: '#FBC02D',
//     fontFamily: 'Inter_600SemiBold',
//     marginLeft: 6,
//     fontSize: 14,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#F44336',
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: '#2F4EAA',
//     marginTop: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//   },
//   retryButtonText: {
//     color: '#FFF',
//     fontFamily: 'Inter_600SemiBold',
//   },
//   emptyContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//   },
//   emptyText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#999',
//     fontFamily: 'Inter_500Medium',
//   },

// serviceStartContainer: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginTop: 6,
//   marginLeft: 20, // indent slightly under the time row
// },
//   serviceStartLabel: {
//     fontSize: 13,
//     color: '#444',
//     fontFamily: 'Inter_500Medium',
//     marginRight: 6,
//   },
//   serviceStartTime: {
//     fontSize: 13,
//     color: '#2F4EAA',
//     fontFamily: 'Inter_600SemiBold',
//   },

//   payLaterButton: {
//   backgroundColor: '#a13f3fff',
//   borderRadius: 20,
//   paddingHorizontal: 16,
//   paddingVertical: 8,
// },

// });

// export default CustomerBookings;
//====================================================
// Added All tab in below code


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import moment from 'moment';
// import RatingModal from './RatingModal';
// import { useAuth } from '../../Context/AuthContext';
// import axios from 'axios';

// // Added 'All' to the TABS array
// const TABS = ['All', 'Pending', 'Confirmed', 'Cancelled'];

// const getStatusColor = (status) => {
//   switch (status.toLowerCase()) {
//     case 'confirmed':
//       return '#4CAF50';
//     case 'accepted':
//       return '#2196F3';
//     case 'pending':
//       return '#FF9800';
//     case 'cancelled':
//       return '#F44336';
//     default:
//       return '#9E9E9E';
//   }
// };

// const getServiceIcon = (service) => {
//   if (service.includes('Hair')) return 'content-cut';
//   if (service.includes('Massage')) return 'spa';
//   if (service.includes('Face')) return 'face';
//   return 'calendar-today';
// };

// const CustomerBookings = () => {
//   const navigation = useNavigation();
//   const { customer } = useAuth();
//   const customerId = customer?.data?.customer_id;

//   const [selectedTab, setSelectedTab] = useState('All');
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [countdowns, setCountdowns] = useState({});

//   // Countdown timer effect
//   useEffect(() => {
//     const intervals = {};

//     bookings.forEach((booking) => {
//       if (booking.status === 'Pending' && booking.booking_time) {
//         const createdTime = new Date(booking.booking_time);
//         const now = new Date();
//         const elapsed = Math.floor((now - createdTime) / 1000);
//         const remaining = Math.max(30 - elapsed, 0);

//         setCountdowns((prev) => ({
//           ...prev,
//           [booking.id]: remaining,
//         }));

//         if (remaining > 0) {
//           intervals[booking.id] = setInterval(() => {
//             setCountdowns((prev) => {
//               const current = prev[booking.id];
//               if (current > 1) {
//                 return { ...prev, [booking.id]: current - 1 };
//               } else {
//                 clearInterval(intervals[booking.id]);
//                 fetchAppointments();
//                 return { ...prev, [booking.id]: 0 };
//               }
//             });
//           }, 1000);
//         }
//       }
//     });

//     return () => {
//       Object.values(intervals).forEach(clearInterval);
//     };
//   }, [bookings]);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const appointmentsResponse = await axios.get(
//         `https://yaslaservice.com:81/appointments/customer/${customerId}/`
//       );

//       if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data)) {
//         throw new Error('Invalid data format received from server');
//       }

//       const [salonsResponse, usersResponse] = await Promise.all([
//         axios.get('https://yaslaservice.com:81/salons/'),
//         axios.get('https://yaslaservice.com:81/users/'),
//       ]);

//       const allSalons = Array.isArray(salonsResponse.data?.data)
//         ? salonsResponse.data.data
//         : Array.isArray(salonsResponse.data)
//           ? salonsResponse.data
//           : [salonsResponse.data].filter(Boolean);

//       const allUsers = Array.isArray(usersResponse.data?.data)
//         ? usersResponse.data.data.filter((user) => user.user_role === 'Stylist')
//         : Array.isArray(usersResponse.data)
//           ? usersResponse.data.filter((user) => user.user_role === 'Stylist')
//           : usersResponse.data?.user_role === 'Stylist'
//             ? [usersResponse.data]
//             : [];

//       const salonMap = allSalons.reduce((map, salon) => {
//         if (salon && salon.id) map[salon.id] = salon;
//         return map;
//       }, {});

//       const stylistMap = allUsers.reduce((map, user) => {
//         if (user && user.id) map[user.id] = user;
//         return map;
//       }, {});

//       const transformedBookings = appointmentsResponse.data.map((appointment) => {
//         const services = appointment.appointment_services || [];
//         const serviceNames = services
//           .map((service) => service.service_name || `Service ${service.service || ''}`)
//           .join(', ');

//         const totalBillAmount = services.reduce((total, service) => {
//           return total + (parseFloat(service.price) || 0);
//         }, 0);

//         const salon = salonMap[appointment.salon];
//         const stylist = stylistMap[appointment.stylist];

//         return {
//           id: appointment.id.toString(),
//           salon: salon?.salon_name || `Salon ${appointment.salon}`,
//           services: services,
//           service: serviceNames,
//           serviceCount: services.length,
//           serviceId: services.length > 0 ? services[0].service : null,
//           stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
//           stylistId: appointment.stylist,
//           date: appointment.start_datetime,
//           timeslot: moment(appointment.start_datetime).format('h:mm A'),
//           graceTime: moment(appointment.start_datetime).add(15, 'minutes').format('h:mm A'),
//           booking_time: appointment.created_at,
//           bill_amount: parseFloat(appointment.bill_amount) || totalBillAmount,
//           status: appointment.status,
//           payment_status: appointment.payment_status,
//           payment_mode: appointment.payment_mode,
//           location: salon
//             ? `${salon.street_address || ''}, ${salon.locality || ''}, ${salon.city || ''}`.trim()
//             : 'Location not available',
//           appointmentData: appointment,
//           updated_at: appointment.updated_at,
//         };
//       });

//       const sortedBookings = transformedBookings.sort(
//         (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
//       );

//       setBookings(sortedBookings);
//     } catch (err) {
//       setError('Failed to load bookings. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       if (customerId) {
//         fetchAppointments();
//       }
//     }, [customerId, selectedTab])
//   );

//   // Updated filter logic to include 'All' tab
//   const filteredBookings = bookings.filter((item) => {
//     if (selectedTab === 'All') return true; // Show all bookings
//     if (selectedTab === 'Confirmed') return item.status === 'Confirmed';
//     if (selectedTab === 'Pending') return item.status === 'Pending';
//     if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
//     return false;
//   });

//   const handleRateBooking = (booking) => {
//     setSelectedBooking(booking);
//     setShowRatingModal(true);
//   };

//   const handlePayNow = (booking) => {
//     navigation.navigate('PaymentScreen', {
//       bookingDetails: booking,
//       onPaymentSuccess: () => {
//         fetchAppointments();
//       },
//     });
//   };

//   const handleSubmitRating = async ({ rating, review }) => {
//     try {
//       if (!selectedBooking) {
//         Alert.alert('Error', 'No booking selected');
//         return;
//       }

//       const feedbackData = {
//         rating: rating,
//         review_text: review || null,
//         customer: customer?.data?.customer_id,
//         booking: selectedBooking.id,
//         stylist: selectedBooking.stylistId,
//       };

//       await axios.post('https://yaslaservice.com:81/feedbacks/', feedbackData);
//       Alert.alert('Thank You!', `You rated this booking ${rating} stars`);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to submit rating. Please try again.');
//     } finally {
//       setShowRatingModal(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}
//       onPress={() => navigation.navigate('BookingSummary', { booking: item })}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.serviceIcon}>
//           <MaterialIcons name={getServiceIcon(item.service)} size={24} color={getStatusColor(item.status)} />
//         </View>
//         <View style={styles.serviceInfo}>
//           <Text style={styles.salonName}>{item.salon}</Text>
//           <Text style={styles.serviceText}>
//             {item.serviceCount > 1
//               ? `${item.serviceCount} services • ${item.stylist}`
//               : `${item.service} • ${item.stylist}`}
//           </Text>
//         </View>
//         <View style={styles.statusBadge}>
//           <Text style={styles.statusText}>{item.status}</Text>
//         </View>
//       </View>

//       <Text style={styles.bookingIdText}>Booking ID: {item.id}</Text>

//       <View style={styles.cardBody}>
//         <View style={styles.dateTimeSection}>
//           <View style={styles.dateTimeContainer}>
//             <MaterialIcons name="calendar-today" size={16} color="#666" />
//             <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
//             <MaterialIcons name="access-time" size={16} color="#666" style={styles.timeIcon} />
//             <Text style={styles.timeText}>{item.timeslot}</Text>
//           </View>

//           {item.status === 'Confirmed' && (
//             <View style={styles.serviceStartContainer}>
//               <Text style={styles.serviceStartLabel}>Service Start At:</Text>
//               <Text style={styles.serviceStartTime}>{item.graceTime}</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.priceContainer}>
//           <Text style={styles.priceLabel}>Amount</Text>
//           <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
//         </View>
//       </View>

//       <View style={styles.cardFooter}>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={16} color="#666" />
//           <Text style={styles.locationText}>{item.location}</Text>
//         </View>

//         {/* ✅ Pay Now + Pay Later visible only for Confirmed */}
//         {item.status === 'Confirmed' && (
//           <View style={{ flexDirection: 'row', gap: 10 }}>
//             <TouchableOpacity
//               style={[styles.payNowButton, { backgroundColor: '#9E9E9E' }]}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 // handlePayNow(item);
//               }}
//             >
//               <Text style={styles.payNowButtonText}>Pay Later</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.payNowButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 handlePayNow(item);
//               }}
//             >
//               <Text style={styles.payNowButtonText}>Pay Now</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {item.status === 'Pending' && countdowns[item.id] > 0 && (
//         <View style={styles.countdownContainer}>
//           <MaterialIcons name="access-time" size={16} color="#FF9800" />
//           <Text style={styles.countdownText}>
//             Please wait for {countdowns[item.id]}s for stylist to accept
//           </Text>
//         </View>
//       )}

//       <View style={styles.actionButtons}>
//         {item.status === 'Confirmed' && (
//           <TouchableOpacity
//             style={styles.rateButton}
//             onPress={(e) => {
//               e.stopPropagation();
//               handleRateBooking(item);
//             }}
//           >
//             <View style={styles.rateButtonContent}>
//               <MaterialIcons name="star" size={20} color="#FFD700" />
//               <Text style={styles.rateButtonText}>Rate Us</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Loading your bookings...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.errorContainer}>
//           <MaterialIcons name="error-outline" size={50} color="#F44336" />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={() => setError(null)}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#e9ecf0ff" />
//       <View style={styles.container}>
//         <Text style={styles.heading}>My Bookings</Text>

//         <View style={styles.tabContainer}>
//           {TABS.map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
//               onPress={() => setSelectedTab(tab)}
//               activeOpacity={0.7}
//             >
//               <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <FlatList
//           data={filteredBookings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <MaterialIcons name="event-busy" size={60} color="#E0E0E0" />
//               <Text style={styles.emptyText}>
//                 {selectedTab === 'All' ? 'No bookings found' : `No ${selectedTab.toLowerCase()} bookings`}
//               </Text>
//             </View>
//           }
//         />
//       </View>

//       <RatingModal
//         visible={showRatingModal}
//         onClose={() => setShowRatingModal(false)}
//         onSubmit={handleSubmitRating}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#e9ecf0ff' },
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
//   heading: { fontSize: 24, fontFamily: 'Inter_600Bold', color: '#333', marginBottom: 24 },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 5,
//     elevation: 2,
//   },
//   tabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
//   activeTabButton: { backgroundColor: '#2F4EAA' },
//   tabText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#666' },
//   activeTabText: { color: '#FFF', fontFamily: 'Inter_600SemiBold' },
//   listContent: { paddingBottom: 30 },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     elevation: 2,
//   },
//   bookingIdText: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 6,
//     fontFamily: 'Inter_600SemiBold',
//   },
//   cardHeader: { flexDirection: 'row', marginBottom: 12 },
//   serviceIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   serviceInfo: { flex: 1, justifyContent: 'center' },
//   salonName: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#333', marginBottom: 2 },
//   serviceText: { fontSize: 14, color: '#666', fontFamily: 'Inter_400Regular' },
//   statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
//   statusText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
//   cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   dateTimeSection: {
//     flex: 1,
//   },
//   dateTimeContainer: { flexDirection: 'row', alignItems: 'center' },
//   dateText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   timeIcon: { marginLeft: 12 },
//   timeText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   priceContainer: { alignItems: 'flex-end' },
//   priceLabel: { fontSize: 12, color: '#888', fontFamily: 'Inter_400Regular' },
//   priceValue: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#333' },
//   cardFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//   },
//   locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   locationText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   payNowButton: { backgroundColor: '#2F4EAA', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
//   payNowButtonText: { color: '#FFF', fontFamily: 'Inter_600SemiBold', fontSize: 14 },
//   countdownContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//     padding: 8,
//     backgroundColor: '#FFF3E0',
//     borderRadius: 8,
//   },
//   countdownText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: '#FF9800',
//     fontFamily: 'Inter_500Medium',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 8,
//   },
//   rateButton: {
//     backgroundColor: '#FFF8E1',
//     borderRadius: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonText: {
//     color: '#FBC02D',
//     fontFamily: 'Inter_600SemiBold',
//     marginLeft: 6,
//     fontSize: 14,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#F44336',
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: '#2F4EAA',
//     marginTop: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//   },
//   retryButtonText: {
//     color: '#FFF',
//     fontFamily: 'Inter_600SemiBold',
//   },
//   emptyContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//   },
//   emptyText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#999',
//     fontFamily: 'Inter_500Medium',
//   },
//   serviceStartContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//     marginLeft: 20,
//   },
//   serviceStartLabel: {
//     fontSize: 13,
//     color: '#444',
//     fontFamily: 'Inter_500Medium',
//     marginRight: 6,
//   },
//   serviceStartTime: {
//     fontSize: 13,
//     color: '#2F4EAA',
//     fontFamily: 'Inter_600SemiBold',
//   },
//   payLaterButton: {
//     backgroundColor: '#a13f3fff',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
// });

// export default CustomerBookings;

//=========================================================================
//Added Completed tab in below code  when we click on the paylater button 

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import moment from 'moment';
// import RatingModal from './RatingModal';
// import { useAuth } from '../../Context/AuthContext';
// import axios from 'axios';

// // Added 'All' to the TABS array
// const TABS = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed'];

// const getStatusColor = (status) => {
//   switch (status.toLowerCase()) {
//     case 'confirmed':
//       return '#4CAF50';
//     case 'accepted':
//       return '#2196F3';
//     case 'pending':
//       return '#FF9800';
//     case 'cancelled':
//       return '#F44336';
//     case 'completed':
//       return '#2196F3';
//     default:
//       return '#9E9E9E';
//   }
// };

// const getServiceIcon = (service) => {
//   if (service.includes('Hair')) return 'content-cut';
//   if (service.includes('Massage')) return 'spa';
//   if (service.includes('Face')) return 'face';
//   return 'calendar-today';
// };

// const CustomerBookings = () => {
//   const navigation = useNavigation();
//   const { customer } = useAuth();
//   const customerId = customer?.data?.customer_id;

//   const [selectedTab, setSelectedTab] = useState('All');
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [countdowns, setCountdowns] = useState({});

//   // Countdown timer effect
//   useEffect(() => {
//     const intervals = {};

//     bookings.forEach((booking) => {
//       if (booking.status === 'Pending' && booking.booking_time) {
//         const createdTime = new Date(booking.booking_time);
//         const now = new Date();
//         const elapsed = Math.floor((now - createdTime) / 1000);
//         const remaining = Math.max(30 - elapsed, 0);

//         setCountdowns((prev) => ({
//           ...prev,
//           [booking.id]: remaining,
//         }));

//         if (remaining > 0) {
//           intervals[booking.id] = setInterval(() => {
//             setCountdowns((prev) => {
//               const current = prev[booking.id];
//               if (current > 1) {
//                 return { ...prev, [booking.id]: current - 1 };
//               } else {
//                 clearInterval(intervals[booking.id]);
//                 fetchAppointments();
//                 return { ...prev, [booking.id]: 0 };
//               }
//             });
//           }, 1000);
//         }
//       }
//     });

//     return () => {
//       Object.values(intervals).forEach(clearInterval);
//     };
//   }, [bookings]);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const appointmentsResponse = await axios.get(
//         `https://yaslaservice.com:81/appointments/customer/${customerId}/`
//       );

//       if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data)) {
//         throw new Error('Invalid data format received from server');
//       }

//       const [salonsResponse, usersResponse] = await Promise.all([
//         axios.get('https://yaslaservice.com:81/salons/'),
//         axios.get('https://yaslaservice.com:81/users/'),
//       ]);

//       const allSalons = Array.isArray(salonsResponse.data?.data)
//         ? salonsResponse.data.data
//         : Array.isArray(salonsResponse.data)
//           ? salonsResponse.data
//           : [salonsResponse.data].filter(Boolean);

//       const allUsers = Array.isArray(usersResponse.data?.data)
//         ? usersResponse.data.data.filter((user) => user.user_role === 'Stylist')
//         : Array.isArray(usersResponse.data)
//           ? usersResponse.data.filter((user) => user.user_role === 'Stylist')
//           : usersResponse.data?.user_role === 'Stylist'
//             ? [usersResponse.data]
//             : [];

//       const salonMap = allSalons.reduce((map, salon) => {
//         if (salon && salon.id) map[salon.id] = salon;
//         return map;
//       }, {});

//       const stylistMap = allUsers.reduce((map, user) => {
//         if (user && user.id) map[user.id] = user;
//         return map;
//       }, {});

//       const transformedBookings = appointmentsResponse.data.map((appointment) => {
//         const services = appointment.appointment_services || [];
//         const serviceNames = services
//           .map((service) => service.service_name || `Service ${service.service || ''}`)
//           .join(', ');

//         const totalBillAmount = services.reduce((total, service) => {
//           return total + (parseFloat(service.price) || 0);
//         }, 0);

//         const salon = salonMap[appointment.salon];
//         const stylist = stylistMap[appointment.stylist];

//         return {
//           id: appointment.id.toString(),
//           salon: salon?.salon_name || `Salon ${appointment.salon}`,
//           services: services,
//           service: serviceNames,
//           serviceCount: services.length,
//           serviceId: services.length > 0 ? services[0].service : null,
//           stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
//           stylistId: appointment.stylist,
//           date: appointment.start_datetime,
//           timeslot: moment(appointment.start_datetime).format('h:mm A'),
//           graceTime: moment(appointment.start_datetime).add(15, 'minutes').format('h:mm A'),
//           booking_time: appointment.created_at,
//           bill_amount: parseFloat(appointment.bill_amount) || totalBillAmount,
//           status: appointment.status,
//           payment_status: appointment.payment_status,
//           payment_mode: appointment.payment_mode,
//           location: salon
//             ? `${salon.street_address || ''}, ${salon.locality || ''}, ${salon.city || ''}`.trim()
//             : 'Location not available',
//           appointmentData: appointment,
//           updated_at: appointment.updated_at,
//         };
//       });

//       const sortedBookings = transformedBookings.sort(
//         (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
//       );

//       setBookings(sortedBookings);
//     } catch (err) {
//       setError('Failed to load bookings. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       if (customerId) {
//         fetchAppointments();
//       }
//     }, [customerId, selectedTab])
//   );

//   // Updated filter logic to include 'All' tab
//   const filteredBookings = bookings.filter((item) => {
//     if (selectedTab === 'All') return true; // Show all bookings
//     if (selectedTab === 'Confirmed') return item.status === 'Confirmed';
//     if (selectedTab === 'Pending') return item.status === 'Pending';
//     if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
//     if (selectedTab === 'Completed') return item.status === 'Completed';
//     return false;
//   });

//   const handleRateBooking = (booking) => {
//     setSelectedBooking(booking);
//     setShowRatingModal(true);
//   };

//   const handlePayNow = (booking) => {
//     navigation.navigate('PaymentScreen', {
//       bookingDetails: booking,
//       onPaymentSuccess: () => {
//         fetchAppointments();
//       },
//     });
//   };

//   const handlePayLater = async (booking) => {
//     Alert.alert(
//       'Pay Later',
//       'Are you sure you want to mark this booking as completed and pay later?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel'
//         },
//         {
//           text: 'Yes, Complete',
//           onPress: async () => {
//             try {
//               const response = await fetch(`https://yaslaservice.com:81/appointments/${booking.id}/`, {
//                 method: 'PUT',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                   status: 'Completed'
//                 })
//               });

//               if (!response.ok) {
//                 throw new Error('Failed to update booking status');
//               }

//               // Update local state
//               setBookings(bookings.map(b =>
//                 b.id === booking.id ? { ...b, status: 'Completed' } : b
//               ));

//               Alert.alert(
//                 'Booking Completed',
//                 'This booking has been marked as completed. You can pay later.',
//                 [{ text: 'OK' }]
//               );
              
//               // Refresh bookings
//               fetchAppointments();
//             } catch (err) {
//               console.error('Error completing booking:', err);
//               Alert.alert('Error', 'Failed to mark booking as completed');
//             }
//           }
//         }
//       ]
//     );
//   };

//   const handleSubmitRating = async ({ rating, review }) => {
//     try {
//       if (!selectedBooking) {
//         Alert.alert('Error', 'No booking selected');
//         return;
//       }

//       const feedbackData = {
//         rating: rating,
//         review_text: review || null,
//         customer: customer?.data?.customer_id,
//         booking: selectedBooking.id,
//         stylist: selectedBooking.stylistId,
//       };

//       await axios.post('https://yaslaservice.com:81/feedbacks/', feedbackData);
//       Alert.alert('Thank You!', `You rated this booking ${rating} stars`);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to submit rating. Please try again.');
//     } finally {
//       setShowRatingModal(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}
//       onPress={() => navigation.navigate('BookingSummary', { booking: item })}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.serviceIcon}>
//           <MaterialIcons name={getServiceIcon(item.service)} size={24} color={getStatusColor(item.status)} />
//         </View>
//         <View style={styles.serviceInfo}>
//           <Text style={styles.salonName}>{item.salon}</Text>
//           <Text style={styles.serviceText}>
//             {item.serviceCount > 1
//               ? `${item.serviceCount} services • ${item.stylist}`
//               : `${item.service} • ${item.stylist}`}
//           </Text>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
//           <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
//             {item.status}
//           </Text>
//         </View>
//       </View>

//       <Text style={styles.bookingIdText}>Booking ID: {item.id}</Text>

//       <View style={styles.cardBody}>
//         <View style={styles.dateTimeSection}>
//           <View style={styles.dateTimeContainer}>
//             <MaterialIcons name="calendar-today" size={16} color="#666" />
//             <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
//             <MaterialIcons name="access-time" size={16} color="#666" style={styles.timeIcon} />
//             <Text style={styles.timeText}>{item.timeslot}</Text>
//           </View>

//           {item.status === 'Confirmed' && (
//             <View style={styles.serviceStartContainer}>
//               <Text style={styles.serviceStartLabel}>Service Start At:</Text>
//               <Text style={styles.serviceStartTime}>{item.graceTime}</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.priceContainer}>
//           <Text style={styles.priceLabel}>Amount</Text>
//           <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
//         </View>
//       </View>
//        <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={16} color="#666" />
//           <Text style={styles.locationText}>{item.location}</Text>
//         </View>

//       <View style={styles.cardFooter}>
       

//         {/* ✅ Pay Now + Pay Later visible only for Confirmed */}
//         {item.status === 'Confirmed' && (
//           <View style={{ flexDirection: 'row', gap: 10 }}>
//             <TouchableOpacity
//               style={styles.payLaterButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 handlePayLater(item);
//               }}
//             >
//               <Text style={styles.payLaterButtonText}>Direct Payment</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.payNowButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 handlePayNow(item);
//               }}
//             >
//               <Text style={styles.payNowButtonText}>Pay Online</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {item.status === 'Pending' && countdowns[item.id] > 0 && (
//         <View style={styles.countdownContainer}>
//           <MaterialIcons name="access-time" size={16} color="#FF9800" />
//           <Text style={styles.countdownText}>
//             Please wait for {countdowns[item.id]}s for stylist to accept
//           </Text>
//         </View>
//       )}

//       <View style={styles.actionButtons}>
//         {item.status === 'Completed' && (
//           <TouchableOpacity
//             style={styles.rateButton}
//             onPress={(e) => {
//               e.stopPropagation();
//               handleRateBooking(item);
//             }}
//           >
//             <View style={styles.rateButtonContent}>
//               <MaterialIcons name="star" size={20} color="#FFD700" />
//               <Text style={styles.rateButtonText}>Rate Us</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Loading your bookings...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.errorContainer}>
//           <MaterialIcons name="error-outline" size={50} color="#F44336" />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={() => setError(null)}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#e9ecf0ff" />
//       <View style={styles.container}>
//         <Text style={styles.heading}>My Bookings</Text>

//         <View style={styles.tabContainer}>
//           {TABS.map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
//               onPress={() => setSelectedTab(tab)}
//               activeOpacity={0.7}
//             >
//               <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <FlatList
//           data={filteredBookings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <MaterialIcons name="event-busy" size={60} color="#E0E0E0" />
//               <Text style={styles.emptyText}>
//                 {selectedTab === 'All' ? 'No bookings found' : `No ${selectedTab.toLowerCase()} bookings`}
//               </Text>
//             </View>
//           }
//         />
//       </View>

//       <RatingModal
//         visible={showRatingModal}
//         onClose={() => setShowRatingModal(false)}
//         onSubmit={handleSubmitRating}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#e9ecf0ff' },
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
//   heading: { fontSize: 24, fontFamily: 'Inter_600Bold', color: '#333', marginBottom: 24 },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 5,
//     elevation: 2,
//   },
//   tabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
//   activeTabButton: { backgroundColor: '#2F4EAA' },
//   tabText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#666' },
//   activeTabText: { color: '#FFF', fontFamily: 'Inter_600SemiBold' },
//   listContent: { paddingBottom: 30 },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     elevation: 2,
//   },
//   bookingIdText: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 6,
//     fontFamily: 'Inter_600SemiBold',
//   },
//   cardHeader: { flexDirection: 'row', marginBottom: 12 },
//   serviceIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   serviceInfo: { flex: 1, justifyContent: 'center' },
//   salonName: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#333', marginBottom: 2 },
//   serviceText: { fontSize: 14, color: '#666', fontFamily: 'Inter_400Regular' },
//   statusBadge: { 
//     alignSelf: 'flex-start', 
//     paddingHorizontal: 8, 
//     paddingVertical: 4, 
//     borderRadius: 12 
//   },
//   statusText: { 
//     fontSize: 12, 
//     fontFamily: 'Inter_600SemiBold' 
//   },
//   cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   dateTimeSection: {
//     flex: 1,
//   },
//   dateTimeContainer: { flexDirection: 'row', alignItems: 'center' },
//   dateText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   timeIcon: { marginLeft: 12 },
//   timeText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   priceContainer: { alignItems: 'flex-end' },
//   priceLabel: { fontSize: 12, color: '#888', fontFamily: 'Inter_400Regular' },
//   priceValue: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#333' },
//   cardFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//   },
//   locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   locationText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   payNowButton: { 
//     backgroundColor: '#2F4EAA', 
//     borderRadius: 20, 
//     paddingHorizontal: 16, 
//     paddingVertical: 8 
//   },
//   payNowButtonText: { 
//     color: '#FFF', 
//     fontFamily: 'Inter_600SemiBold', 
//     fontSize: 14 
//   },
//   payLaterButton: { 
//     backgroundColor: '#FF9800', 
//     borderRadius: 20, 
//     paddingHorizontal: 16, 
//     paddingVertical: 8 
//   },
//   payLaterButtonText: { 
//     color: '#FFF', 
//     fontFamily: 'Inter_600SemiBold', 
//     fontSize: 14 
//   },
//   countdownContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//     padding: 8,
//     backgroundColor: '#FFF3E0',
//     borderRadius: 8,
//   },
//   countdownText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: '#FF9800',
//     fontFamily: 'Inter_500Medium',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 8,
//   },
//   rateButton: {
//     backgroundColor: '#FFF8E1',
//     borderRadius: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonText: {
//     color: '#FBC02D',
//     fontFamily: 'Inter_600SemiBold',
//     marginLeft: 6,
//     fontSize: 14,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#F44336',
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: '#2F4EAA',
//     marginTop: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//   },
//   retryButtonText: {
//     color: '#FFF',
//     fontFamily: 'Inter_600SemiBold',
//   },
//   emptyContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//   },
//   emptyText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#999',
//     fontFamily: 'Inter_500Medium',
//   },
//   serviceStartContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//     marginLeft: 20,
//   },
//   serviceStartLabel: {
//     fontSize: 13,
//     color: '#444',
//     fontFamily: 'Inter_500Medium',
//     marginRight: 6,
//   },
//   serviceStartTime: {
//     fontSize: 13,
//     color: '#2F4EAA',
//     fontFamily: 'Inter_600SemiBold',
//   },
// });

// export default CustomerBookings;

// ===============================================================
// Below code having Removed Completed tab and functionality for Direct Pyament button 

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import moment from 'moment';
// import RatingModal from './RatingModal';
// import { useAuth } from '../../Context/AuthContext';
// import axios from 'axios';

// // Removed 'Completed' from TABS array
// const TABS = ['All', 'Pending', 'Confirmed', 'Cancelled'];

// const getStatusColor = (status) => {
//   switch (status.toLowerCase()) {
//     case 'confirmed':
//       return '#4CAF50';
//     case 'accepted':
//       return '#2196F3';
//     case 'pending':
//       return '#FF9800';
//     case 'cancelled':
//       return '#F44336';
//     case 'completed':
//       return '#2196F3';
//     default:
//       return '#9E9E9E';
//   }
// };

// const getServiceIcon = (service) => {
//   if (service.includes('Hair')) return 'content-cut';
//   if (service.includes('Massage')) return 'spa';
//   if (service.includes('Face')) return 'face';
//   return 'calendar-today';
// };

// const CustomerBookings = () => {
//   const navigation = useNavigation();
//   const { customer } = useAuth();
//   const customerId = customer?.data?.customer_id;

//   const [selectedTab, setSelectedTab] = useState('All');
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [countdowns, setCountdowns] = useState({});

//   // Countdown timer effect
//   useEffect(() => {
//     const intervals = {};

//     bookings.forEach((booking) => {
//       if (booking.status === 'Pending' && booking.booking_time) {
//         const createdTime = new Date(booking.booking_time);
//         const now = new Date();
//         const elapsed = Math.floor((now - createdTime) / 1000);
//         const remaining = Math.max(30 - elapsed, 0);

//         setCountdowns((prev) => ({
//           ...prev,
//           [booking.id]: remaining,
//         }));

//         if (remaining > 0) {
//           intervals[booking.id] = setInterval(() => {
//             setCountdowns((prev) => {
//               const current = prev[booking.id];
//               if (current > 1) {
//                 return { ...prev, [booking.id]: current - 1 };
//               } else {
//                 clearInterval(intervals[booking.id]);
//                 fetchAppointments();
//                 return { ...prev, [booking.id]: 0 };
//               }
//             });
//           }, 1000);
//         }
//       }
//     });

//     return () => {
//       Object.values(intervals).forEach(clearInterval);
//     };
//   }, [bookings]);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const appointmentsResponse = await axios.get(
//         `https://yaslaservice.com:81/appointments/customer/${customerId}/`
//       );

//       if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data)) {
//         throw new Error('Invalid data format received from server');
//       }

//       const [salonsResponse, usersResponse] = await Promise.all([
//         axios.get('https://yaslaservice.com:81/salons/'),
//         axios.get('https://yaslaservice.com:81/users/'),
//       ]);

//       const allSalons = Array.isArray(salonsResponse.data?.data)
//         ? salonsResponse.data.data
//         : Array.isArray(salonsResponse.data)
//           ? salonsResponse.data
//           : [salonsResponse.data].filter(Boolean);

//       const allUsers = Array.isArray(usersResponse.data?.data)
//         ? usersResponse.data.data.filter((user) => user.user_role === 'Stylist')
//         : Array.isArray(usersResponse.data)
//           ? usersResponse.data.filter((user) => user.user_role === 'Stylist')
//           : usersResponse.data?.user_role === 'Stylist'
//             ? [usersResponse.data]
//             : [];

//       const salonMap = allSalons.reduce((map, salon) => {
//         if (salon && salon.id) map[salon.id] = salon;
//         return map;
//       }, {});

//       const stylistMap = allUsers.reduce((map, user) => {
//         if (user && user.id) map[user.id] = user;
//         return map;
//       }, {});

//       const transformedBookings = appointmentsResponse.data.map((appointment) => {
//         const services = appointment.appointment_services || [];
//         const serviceNames = services
//           .map((service) => service.service_name || `Service ${service.service || ''}`)
//           .join(', ');

//         const totalBillAmount = services.reduce((total, service) => {
//           return total + (parseFloat(service.price) || 0);
//         }, 0);

//         const salon = salonMap[appointment.salon];
//         const stylist = stylistMap[appointment.stylist];

//         return {
//           id: appointment.id.toString(),
//           salon: salon?.salon_name || `Salon ${appointment.salon}`,
//           services: services,
//           service: serviceNames,
//           serviceCount: services.length,
//           serviceId: services.length > 0 ? services[0].service : null,
//           stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
//           stylistId: appointment.stylist,
//           date: appointment.start_datetime,
//           timeslot: moment(appointment.start_datetime).format('h:mm A'),
//           graceTime: moment(appointment.start_datetime).add(15, 'minutes').format('h:mm A'),
//           booking_time: appointment.created_at,
//           bill_amount: parseFloat(appointment.bill_amount) || totalBillAmount,
//           status: appointment.status,
//           payment_status: appointment.payment_status,
//           payment_mode: appointment.payment_mode,
//           location: salon
//             ? `${salon.street_address || ''}, ${salon.locality || ''}, ${salon.city || ''}`.trim()
//             : 'Location not available',
//           appointmentData: appointment,
//           updated_at: appointment.updated_at,
//         };
//       });

//       const sortedBookings = transformedBookings.sort(
//         (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
//       );

//       setBookings(sortedBookings);
//     } catch (err) {
//       setError('Failed to load bookings. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       if (customerId) {
//         fetchAppointments();
//       }
//     }, [customerId, selectedTab])
//   );

//   // Updated filter logic (removed 'Completed' tab)
//   const filteredBookings = bookings.filter((item) => {
//     if (selectedTab === 'All') return true;
//     if (selectedTab === 'Confirmed') return item.status === 'Confirmed';
//     if (selectedTab === 'Pending') return item.status === 'Pending';
//     if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
//     return false;
//   });

//   const handleRateBooking = (booking) => {
//     setSelectedBooking(booking);
//     setShowRatingModal(true);
//   };

//   const handlePayNow = (booking) => {
//     navigation.navigate('PaymentScreen', {
//       bookingDetails: booking,
//       onPaymentSuccess: () => {
//         fetchAppointments();
//       },
//     });
//   };

//   const handlePayLater = async (booking) => {
//     Alert.alert(
//       'Direct Payment',
//       'You have selected Direct Payment. Please pay directly at the salon.',
//       [
//         {
//           text: 'OK',
//           style: 'default'
//         }
//       ]
//     );
//   };

//   const handleSubmitRating = async ({ rating, review }) => {
//     try {
//       if (!selectedBooking) {
//         Alert.alert('Error', 'No booking selected');
//         return;
//       }

//       const feedbackData = {
//         rating: rating,
//         review_text: review || null,
//         customer: customer?.data?.customer_id,
//         booking: selectedBooking.id,
//         stylist: selectedBooking.stylistId,
//       };

//       await axios.post('https://yaslaservice.com:81/feedbacks/', feedbackData);
//       Alert.alert('Thank You!', `You rated this booking ${rating} stars`);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to submit rating. Please try again.');
//     } finally {
//       setShowRatingModal(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}
//       onPress={() => navigation.navigate('BookingSummary', { booking: item })}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.serviceIcon}>
//           <MaterialIcons name={getServiceIcon(item.service)} size={24} color={getStatusColor(item.status)} />
//         </View>
//         <View style={styles.serviceInfo}>
//           <Text style={styles.salonName}>{item.salon}</Text>
//           <Text style={styles.serviceText}>
//             {item.serviceCount > 1
//               ? `${item.serviceCount} services • ${item.stylist}`
//               : `${item.service} • ${item.stylist}`}
//           </Text>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
//           <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
//             {item.status}
//           </Text>
//         </View>
//       </View>

//       <Text style={styles.bookingIdText}>Booking ID: {item.id}</Text>

//       <View style={styles.cardBody}>
//         <View style={styles.dateTimeSection}>
//           <View style={styles.dateTimeContainer}>
//             <MaterialIcons name="calendar-today" size={16} color="#666" />
//             <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
//             <MaterialIcons name="access-time" size={16} color="#666" style={styles.timeIcon} />
//             <Text style={styles.timeText}>{item.timeslot}</Text>
//           </View>

//           {item.status === 'Confirmed' && (
//             <View style={styles.serviceStartContainer}>
//               <Text style={styles.serviceStartLabel}>Service Start At:</Text>
//               <Text style={styles.serviceStartTime}>{item.graceTime}</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.priceContainer}>
//           <Text style={styles.priceLabel}>Amount</Text>
//           <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
//         </View>
//       </View>
//        <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={16} color="#666" />
//           <Text style={styles.locationText}>{item.location}</Text>
//         </View>

//       <View style={styles.cardFooter}>
       

//         {/* ✅ Pay Now + Direct Payment visible only for Confirmed */}
//         {item.status === 'Confirmed' && (
//           <View style={{ flexDirection: 'row', gap: 10 }}>
//             <TouchableOpacity
//               style={styles.payLaterButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 handlePayLater(item);
//               }}
//             >
//               <Text style={styles.payLaterButtonText}>Direct Payment</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.payNowButton}
//               onPress={(e) => {
//                 e.stopPropagation();
//                 handlePayNow(item);
//               }}
//             >
//               <Text style={styles.payNowButtonText}>Pay Online</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {item.status === 'Pending' && countdowns[item.id] > 0 && (
//         <View style={styles.countdownContainer}>
//           <MaterialIcons name="access-time" size={16} color="#FF9800" />
//           <Text style={styles.countdownText}>
//             Please wait for {countdowns[item.id]}s for stylist to accept
//           </Text>
//         </View>
//       )}

//       <View style={styles.actionButtons}>
//         {item.status === 'Completed' && (
//           <TouchableOpacity
//             style={styles.rateButton}
//             onPress={(e) => {
//               e.stopPropagation();
//               handleRateBooking(item);
//             }}
//           >
//             <View style={styles.rateButtonContent}>
//               <MaterialIcons name="star" size={20} color="#FFD700" />
//               <Text style={styles.rateButtonText}>Rate Us</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Loading your bookings...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.errorContainer}>
//           <MaterialIcons name="error-outline" size={50} color="#F44336" />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={() => setError(null)}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#e9ecf0ff" />
//       <View style={styles.container}>
//         <Text style={styles.heading}>My Bookings</Text>

//         <View style={styles.tabContainer}>
//           {TABS.map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
//               onPress={() => setSelectedTab(tab)}
//               activeOpacity={0.7}
//             >
//               <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <FlatList
//           data={filteredBookings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <MaterialIcons name="event-busy" size={60} color="#E0E0E0" />
//               <Text style={styles.emptyText}>
//                 {selectedTab === 'All' ? 'No bookings found' : `No ${selectedTab.toLowerCase()} bookings`}
//               </Text>
//             </View>
//           }
//         />
//       </View>

//       <RatingModal
//         visible={showRatingModal}
//         onClose={() => setShowRatingModal(false)}
//         onSubmit={handleSubmitRating}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#e9ecf0ff' },
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
//   heading: { fontSize: 24, fontFamily: 'Inter_600Bold', color: '#333', marginBottom: 24 },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 5,
//     elevation: 2,
//   },
//   tabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
//   activeTabButton: { backgroundColor: '#2F4EAA' },
//   tabText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#666' },
//   activeTabText: { color: '#FFF', fontFamily: 'Inter_600SemiBold' },
//   listContent: { paddingBottom: 30 },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     elevation: 2,
//   },
//   bookingIdText: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 6,
//     fontFamily: 'Inter_600SemiBold',
//   },
//   cardHeader: { flexDirection: 'row', marginBottom: 12 },
//   serviceIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   serviceInfo: { flex: 1, justifyContent: 'center' },
//   salonName: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#333', marginBottom: 2 },
//   serviceText: { fontSize: 14, color: '#666', fontFamily: 'Inter_400Regular' },
//   statusBadge: { 
//     alignSelf: 'flex-start', 
//     paddingHorizontal: 8, 
//     paddingVertical: 4, 
//     borderRadius: 12 
//   },
//   statusText: { 
//     fontSize: 12, 
//     fontFamily: 'Inter_600SemiBold' 
//   },
//   cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   dateTimeSection: {
//     flex: 1,
//   },
//   dateTimeContainer: { flexDirection: 'row', alignItems: 'center' },
//   dateText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   timeIcon: { marginLeft: 12 },
//   timeText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   priceContainer: { alignItems: 'flex-end' },
//   priceLabel: { fontSize: 12, color: '#888', fontFamily: 'Inter_400Regular' },
//   priceValue: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#333' },
//   cardFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//   },
//   locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   locationText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
//   payNowButton: { 
//     backgroundColor: '#2F4EAA', 
//     borderRadius: 20, 
//     paddingHorizontal: 16, 
//     paddingVertical: 8 
//   },
//   payNowButtonText: { 
//     color: '#FFF', 
//     fontFamily: 'Inter_600SemiBold', 
//     fontSize: 14 
//   },
//   payLaterButton: { 
//     backgroundColor: '#FF9800', 
//     borderRadius: 20, 
//     paddingHorizontal: 16, 
//     paddingVertical: 8 
//   },
//   payLaterButtonText: { 
//     color: '#FFF', 
//     fontFamily: 'Inter_600SemiBold', 
//     fontSize: 14 
//   },
//   countdownContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//     padding: 8,
//     backgroundColor: '#FFF3E0',
//     borderRadius: 8,
//   },
//   countdownText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: '#FF9800',
//     fontFamily: 'Inter_500Medium',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 8,
//   },
//   rateButton: {
//     backgroundColor: '#FFF8E1',
//     borderRadius: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rateButtonText: {
//     color: '#FBC02D',
//     fontFamily: 'Inter_600SemiBold',
//     marginLeft: 6,
//     fontSize: 14,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#F44336',
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: '#2F4EAA',
//     marginTop: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//   },
//   retryButtonText: {
//     color: '#FFF',
//     fontFamily: 'Inter_600SemiBold',
//   },
//   emptyContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 80,
//   },
//   emptyText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#999',
//     fontFamily: 'Inter_500Medium',
//   },
//   serviceStartContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//     marginLeft: 20,
//   },
//   serviceStartLabel: {
//     fontSize: 13,
//     color: '#444',
//     fontFamily: 'Inter_500Medium',
//     marginRight: 6,
//   },
//   serviceStartTime: {
//     fontSize: 13,
//     color: '#2F4EAA',
//     fontFamily: 'Inter_600SemiBold',
//   },
// });

// export default CustomerBookings;


//=================================================================

// Below code with location, call , whatsapp icons 

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Linking,
  RefreshControl,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import RazorpayCheckout from "react-native-razorpay";
import RatingModal from './RatingModal';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

const TABS = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed'];
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return '#4CAF50';
    case 'accepted':
      return '#2196F3';
    case 'pending':
      return '#FF9800';
    case 'cancelled':
      return '#F44336';
    case 'completed':
      return '#2196F3';
    default:
      return '#9E9E9E';
  }
};

const getServiceIcon = (service) => {
  if (service.includes('Hair')) return 'content-cut';
  if (service.includes('Massage')) return 'spa';
  if (service.includes('Face')) return 'face';
  return 'calendar-today';
};

const CustomerBookings = () => {
  const navigation = useNavigation();
  const { customer } = useAuth();
  const customerId = customer?.data?.customer_id;

  const [selectedTab, setSelectedTab] = useState('All');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  
  // New state for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const intervals = {};

    bookings.forEach((booking) => {
      if (booking.status === 'Pending' && booking.booking_time) {
        const createdTime = new Date(booking.booking_time);
        const now = new Date();
        const elapsed = Math.floor((now - createdTime) / 1000);
        const remaining = Math.max(120 - elapsed, 0);

        setCountdowns((prev) => ({
          ...prev,
          [booking.id]: remaining,
        }));

        if (remaining > 0) {
          intervals[booking.id] = setInterval(() => {
            setCountdowns((prev) => {
              const current = prev[booking.id];
              if (current > 1) {
                return { ...prev, [booking.id]: current - 1 };
              } else {
                clearInterval(intervals[booking.id]);
                fetchAppointments();
                return { ...prev, [booking.id]: 0 };
              }
            });
          }, 1000);
        }
      }
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [bookings]);

  // Function to make phone call
  const makeCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("Error", "Phone number not available for this salon");
      return;
    }
    
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Calling not supported on this device');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        Alert.alert('Error', 'Failed to make call');
      });
  };

  // Function to open WhatsApp
  const openWhatsApp = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("Error", "Phone number not available for this salon");
      return;
    }
    
    // Remove any non-digit characters from phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}`;
    
    Linking.openURL(url).catch(err => {
      console.error('Error opening WhatsApp:', err);
      Alert.alert("Error", "WhatsApp is not installed or couldn't be opened");
    });
  };

  // Function to open maps
  const openMaps = (latitude, longitude, salonName) => {
    if (!latitude || !longitude) {
      Alert.alert("Error", "Location coordinates not available for this salon");
      return;
    }
    
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${salonName}`;
    Linking.openURL(url).catch(err => {
      console.error('Error opening maps:', err);
      Alert.alert("Error", "Could not open maps");
    });
  };

  const fetchAppointments = async (isPullToRefresh = false) => {
    try {
      if (isPullToRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const appointmentsResponse = await axios.get(
        `https://yaslaservice.com:81/appointments/customer/${customerId}/`
      );

      if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data)) {
        throw new Error('Invalid data format received from server');
      }

      const [salonsResponse, usersResponse] = await Promise.all([
        axios.get('https://yaslaservice.com:81/salons/'),
        axios.get('https://yaslaservice.com:81/users/'),
      ]);

      const allSalons = Array.isArray(salonsResponse.data?.data)
        ? salonsResponse.data.data
        : Array.isArray(salonsResponse.data)
          ? salonsResponse.data
          : [salonsResponse.data].filter(Boolean);

      const allUsers = Array.isArray(usersResponse.data?.data)
        ? usersResponse.data.data.filter((user) => user.user_role === 'Stylist')
        : Array.isArray(usersResponse.data)
          ? usersResponse.data.filter((user) => user.user_role === 'Stylist')
          : usersResponse.data?.user_role === 'Stylist'
            ? [usersResponse.data]
            : [];

      const salonMap = allSalons.reduce((map, salon) => {
        if (salon && salon.id) {
          map[salon.id] = {
            ...salon,
            phoneNumber: salon.phone || salon.phone_number || salon.contact_number || '',
            latitude: salon.latitude || null,
            longitude: salon.longitude || null
          };
        }
        return map;
      }, {});

      const stylistMap = allUsers.reduce((map, user) => {
        if (user && user.id) map[user.id] = user;
        return map;
      }, {});

      // const transformedBookings = appointmentsResponse.data.map((appointment) => {
      //   const services = appointment.appointment_services || [];
      //   const serviceNames = services
      //     .map((service) => service.service_name || `Service ${service.service || ''}`)
      //     .join(', ');

      //   const totalBillAmount = services.reduce((total, service) => {
      //     return total + (parseFloat(service.price) || 0);
      //   }, 0);

      //   const salon = salonMap[appointment.salon];
      //   const stylist = stylistMap[appointment.stylist];

      //   return {
      //     id: appointment.id.toString(),
      //     salon: salon?.salon_name || `Salon ${appointment.salon}`,
      //     salonId: appointment.salon,
      //     services: services,
      //     service: serviceNames,
      //     serviceCount: services.length,
      //     serviceId: services.length > 0 ? services[0].service : null,
      //     stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
      //     stylistId: appointment.stylist,
      //     date: appointment.start_datetime,
      //     timeslot: moment(appointment.start_datetime).format('h:mm A'),
      //     graceTime: moment(appointment.start_datetime).add(15, 'minutes').format('h:mm A'),
      //     booking_time: appointment.created_at,
      //     bill_amount: parseFloat(appointment.bill_amount) || totalBillAmount,
      //     status: appointment.status,
      //     payment_status: appointment.payment_status,
      //     payment_mode: appointment.payment_mode,
      //     location: salon
      //       ? `${salon.street_address || ''}, ${salon.locality || ''}, ${salon.city || ''}`.trim()
      //       : 'Location not available',
      //     appointmentData: appointment,
      //     updated_at: appointment.updated_at,
      //     // Include contact details directly in booking object
      //     SalonPhoneNumber: salon?.phoneNumber || '',
      //     SalonLatitude: salon?.latitude || null,
      //     SalonLongitude: salon?.longitude || null,
      //     city: salon?.city || '',
      //     payment_verified: appointment.payment_verified || false,
      //   };
      // });


      const transformedBookings = appointmentsResponse.data.map((appointment) => {
  const services = appointment.appointment_services || [];
  const serviceNames = services
    .map((service) => service.service_name || `Service ${service.service || ''}`)
    .join(', ');

  const totalBillAmount = services.reduce((total, service) => {
    return total + (parseFloat(service.price) || 0);
  }, 0);

  const salon = salonMap[appointment.salon];
  const stylist = stylistMap[appointment.stylist];

  return {
    id: appointment.id.toString(),
    salon: salon?.salon_name || `Salon ${appointment.salon}`,
    salonId: appointment.salon,
    services: services,
    service: serviceNames,
    serviceCount: services.length,
    serviceId: services.length > 0 ? services[0].service : null,
    stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
    stylistId: appointment.stylist,
    date: appointment.start_datetime,
    timeslot: moment(appointment.start_datetime).format('h:mm A'),
    graceTime: moment(appointment.start_datetime).add(15, 'minutes').format('h:mm A'),
    booking_time: appointment.created_at,
    bill_amount: parseFloat(appointment.bill_amount) || totalBillAmount,
    status: appointment.status,
    payment_status: appointment.payment_status,
    payment_mode: appointment.payment_mode,
    location: salon
      ? `${salon.street_address || ''}, ${salon.locality || ''}, ${salon.city || ''}`.trim()
      : 'Location not available',
    appointmentData: appointment,
    updated_at: appointment.updated_at,
    
    // ✅ UPDATED: Get phone from stylist using stylist ID
    stylistPhoneNumber: stylist?.phone || '', // Changed from SalonPhoneNumber to stylistPhoneNumber
    
    // Keep salon location details for maps
    SalonLatitude: salon?.latitude || null,
    SalonLongitude: salon?.longitude || null,
    city: salon?.city || '',
    payment_verified: appointment.payment_verified || false,
  };
});
      const sortedBookings = transformedBookings.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );

      setBookings(sortedBookings);
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    if (customerId) {
      fetchAppointments(true);
    }
  }, [customerId]);

  useFocusEffect(
    useCallback(() => {
      if (customerId) {
        fetchAppointments();
      }
    }, [customerId, selectedTab])
  );

  // Updated filter logic to exclude Confirmed+Paid bookings from Confirmed tab
  const filteredBookings = bookings.filter((item) => {
    // Skip booking if payment is verified
    if (item.appointmentData?.payment_verified === true) {
      return false;
    }
    if (selectedTab === 'All') return true;
    if (selectedTab === 'Confirmed') {
      // Exclude bookings that are both Confirmed AND Paid
      return item.status === 'Confirmed' && item.payment_status !== 'Paid';
    }
    if (selectedTab === 'Pending') return item.status === 'Pending';
    if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
    if (selectedTab === 'Completed') return item.status === 'Completed';
    return false;
  });

  const handleRateBooking = (booking) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  // New integrated payment function
  const handlePayNow = (booking) => {
    setSelectedBookingForPayment(booking);
    setShowPaymentModal(true);
  };

  // Integrated payment function
  const handlePayment = async () => {
    if (!selectedBookingForPayment) {
      Alert.alert("Error", "No booking selected for payment");
      return;
    }

    setProcessingPayment(true);
    console.log("handlePayment called for booking:", selectedBookingForPayment.id);

    try {
      console.log("Initiating payment request...");
      const res = await fetch(`https://yaslaservice.com:81/initiate/payment/${selectedBookingForPayment.id}/`);
      const data = await res.json();

      console.log("Backend response:", data);

      if (!data.order_id) {
        console.log("Failed to initiate payment, no order ID.");
        Alert.alert("Payment Failed", "Failed to initiate payment.");
        setProcessingPayment(false);
        return;
      }

      const options = {
        key: data.razorpay_key_id,
        amount: data.amount_paise,
        currency: "INR",
        order_id: data.order_id,
        name: "Payment",
        description: "Appointment Payment",
        prefill: {
          name: data.customer_name,
          email: data.customer_email,
          contact: data.customer_contact,
        },
        theme: { color: "#2F4EAA" },
      };

      console.log("Opening Razorpay checkout with options:", options);

      RazorpayCheckout.open(options)
        .then(async (response) => {
          console.log("Payment response:", response);

          const verifyRes = await fetch("https://yaslaservice.com:81/payment/verify/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }).toString(),
          });

          const result = await verifyRes.json();
          console.log("Payment verification result:", result);

          if (result.message === "Payment Successful!") {
            console.log("✅ Payment Verified Successfully");
            Alert.alert("Success", "✅ Payment Received - Paid via App!");
            
            // Close payment modal
            setShowPaymentModal(false);
            setSelectedBookingForPayment(null);
            
            // Refresh bookings
            fetchAppointments();
          } else {
            console.log("❌ Payment verification failed:", result.message);
            Alert.alert("Failed", result.message || "❌ Payment verification failed.");
          }
        })
        .catch((error) => {
          console.error("Payment error:", error);
          Alert.alert("Payment Failed", error.description || "Try again.");
        })
        .finally(() => {
          setProcessingPayment(false);
        });
    } catch (err) {
      console.error("Error initiating payment:", err);
      Alert.alert("Error", "Something went wrong.");
      setProcessingPayment(false);
    }
  };

  const handlePayLater = async (booking) => {
    Alert.alert(
      'Direct Payment',
      'You have selected Direct Payment. Please pay directly at the salon.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          style: 'default',
          onPress: async () => {
            try {
              const response = await fetch(`https://yaslaservice.com:81/appointments/${booking.id}/`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  status: 'Completed'
                })
              });

              if (!response.ok) {
                throw new Error('Failed to update booking status');
              }

              // Update local state
              setBookings(bookings.map(b =>
                b.id === booking.id ? { ...b, status: 'Completed' } : b
              ));

              Alert.alert(
                'Service Completed',
                'This booking has been marked as completed. Thank you for your visit!',
                [{ text: 'OK' }]
              );
              
              // Refresh bookings
              fetchAppointments();
            } catch (err) {
              console.error('Error completing booking:', err);
              Alert.alert('Error', 'Failed to mark booking as completed');
            }
          }
        }
      ]
    );
  };

  const handleSubmitRating = async ({ rating, review }) => {
    try {
      if (!selectedBooking) {
        Alert.alert('Error', 'No booking selected');
        return;
      }

      const feedbackData = {
        rating: rating,
        review_text: review || null,
        customer: customer?.data?.customer_id,
        booking: selectedBooking.id,
        stylist: selectedBooking.stylistId,
      };

      await axios.post('https://yaslaservice.com:81/feedbacks/', feedbackData);
      Alert.alert('Thank You!', `You rated this booking ${rating} stars`);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit rating. Please try again.');
    } finally {
      setShowRatingModal(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}
      onPress={() => navigation.navigate('BookingSummary', { booking: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.serviceIcon}>
          <MaterialIcons name={getServiceIcon(item.service)} size={24} color={getStatusColor(item.status)} />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.salonName}>{item.salon}</Text>
          <Text style={styles.serviceText}>
            {item.serviceCount > 1
              ? `${item.serviceCount} services • ${item.stylist}`
              : `${item.service} • ${item.stylist}`}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.bookingIdText}>Booking ID: {item.id}</Text>

      <View style={styles.cardBody}>
        <View style={styles.dateTimeSection}>
          <View style={styles.dateTimeContainer}>
            <MaterialIcons name="calendar-today" size={16} color="#666" />
            <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
            <MaterialIcons name="access-time" size={16} color="#666" style={styles.timeIcon} />
            <Text style={styles.timeText}>{item.timeslot}</Text>
          </View>

          {item.status === 'Confirmed' && (
            <View style={styles.serviceStartContainer}>
              <Text style={styles.serviceStartLabel}>Service Start At:</Text>
              <Text style={styles.serviceStartTime}>{item.graceTime}</Text>
            </View>
          )}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Amount</Text>
          <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
        </View>
      </View>
      
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={16} color="#666" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      {/* Three Icons for Confirmed Bookings Here Getting the Salon's Admin Phone number  */}
      {/* {item.status === 'Confirmed' && (
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              openMaps(item.SalonLatitude, item.SalonLongitude, item.salon);
            }}
            style={styles.iconButton}
          >
            <FontAwesome name="map-marker" size={20} color="#ff0000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              openWhatsApp(item.SalonPhoneNumber);
            }}
            style={styles.iconButton}
          >
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              makeCall(item.SalonPhoneNumber);
            }} 
            style={styles.iconButton}
          >
            <FontAwesome name="phone" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      )} */}

      {/* Three Icons for Confirmed Bookings  Using the Stylist's phone number  */}
      {/* ============================================================================= */}
{item.status === 'Confirmed' && (
  <View style={styles.iconsContainer}>
    <TouchableOpacity
      onPress={(e) => {
        e.stopPropagation();
        openMaps(item.SalonLatitude, item.SalonLongitude, item.salon);
      }}
      style={styles.iconButton}
    >
      <FontAwesome name="map-marker" size={20} color="#ff0000" />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={(e) => {
        e.stopPropagation();
        // ✅ UPDATED: Use stylist's phone for WhatsApp
        if (item.stylistPhoneNumber) {
          openWhatsApp(item.stylistPhoneNumber);
        } else {
          Alert.alert("Phone Not Available", "Stylist phone number is not available");
        }
      }}
      style={styles.iconButton}
    >
      <FontAwesome name="whatsapp" size={20} color="#25D366" />
    </TouchableOpacity>

    <TouchableOpacity 
      onPress={(e) => {
        e.stopPropagation();
        // ✅ UPDATED: Use stylist's phone for calls
        if (item.stylistPhoneNumber) {
          makeCall(item.stylistPhoneNumber);
        } else {
          Alert.alert("Phone Not Available", "Stylist phone number is not available");
        }
      }} 
      style={styles.iconButton}
    >
      <FontAwesome name="phone" size={20} color="#000000" />
    </TouchableOpacity>
  </View>
)}

      <View style={styles.cardFooter}>
        {/* ✅ Pay Now + Direct Payment visible only for Confirmed */}
        {item.status === 'Confirmed' && (
          <View style={styles.paymentButtonsContainer}>
            <TouchableOpacity
              style={styles.payLaterButton}
              onPress={(e) => {
                e.stopPropagation();
                handlePayLater(item);
              }}
            >
              <Text style={styles.payLaterButtonText}>Direct Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.payNowButton}
              onPress={(e) => {
                e.stopPropagation();
                handlePayNow(item);
              }}
            >
              <Text style={styles.payNowButtonText}>Pay Online</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {item.status === 'Pending' && countdowns[item.id] > 0 && (
        <View style={styles.countdownContainer}>
          <MaterialIcons name="access-time" size={16} color="#FF9800" />
          <Text style={styles.countdownText}>
            Please wait for {countdowns[item.id]}s for stylist to accept
          </Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        {item.status === 'Completed' && (
          <TouchableOpacity
            style={styles.rateButton}
            onPress={(e) => {
              e.stopPropagation();
              handleRateBooking(item);
            }}
          >
            <View style={styles.rateButtonContent}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.rateButtonText}>Rate Us</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  // Payment Modal Component
  const PaymentModal = () => (
    <Modal
      visible={showPaymentModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setShowPaymentModal(false);
        setSelectedBookingForPayment(null);
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Confirm Your Booking</Text>
            <TouchableOpacity
              onPress={() => {
                setShowPaymentModal(false);
                setSelectedBookingForPayment(null);
              }}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.modalScrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalContent}
          >
            {selectedBookingForPayment && (
              <>
                {/* Salon Card */}
                <View style={styles.paymentCard}>
                  <Text style={styles.paymentCardTitle}>{selectedBookingForPayment.salon}</Text>
                  <Text style={styles.paymentSubText}>{selectedBookingForPayment.location}</Text>
                </View>

                {/* Stylist Card */}
                <View style={styles.paymentCard}>
                  <Text style={styles.paymentCardTitle}>Hairstylist</Text>
                  <View style={[styles.paymentRow, { marginTop: 10 }]}>
                    <View style={styles.paymentAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.paymentStylistName}>{selectedBookingForPayment.stylist}</Text>
                    </View>
                  </View>
                </View>

                {/* Date/Time Card */}
                <View style={styles.paymentCard}>
                  <Text style={styles.paymentCardTitle}>Booking Date</Text>
                  <Text style={styles.paymentBigDate}>
                    {moment(selectedBookingForPayment.date).format('MMMM D, YYYY')}
                  </Text>
                  <Text style={styles.paymentTimeText}>⏰ {selectedBookingForPayment.timeslot}</Text>
                </View>

                {/* Services Card */}
                <View style={styles.paymentCard}>
                  <Text style={styles.paymentCardTitle}>Services</Text>
                  <View style={styles.paymentServiceRow}>
                    <Text style={styles.paymentServiceText}>{selectedBookingForPayment.service}</Text>
                    <Text style={styles.paymentPriceText}>₹{selectedBookingForPayment.bill_amount.toLocaleString()}</Text>
                  </View>
                </View>

                {/* Total Amount Card */}
                <View style={[styles.paymentCard, styles.paymentTotalCard]}>
                  <Text style={styles.paymentTotalText}>Total Amount</Text>
                  <Text style={styles.paymentTotalAmount}>₹{selectedBookingForPayment.bill_amount.toLocaleString()}</Text>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.confirmPaymentButton, processingPayment && styles.disabledButton]} 
              onPress={handlePayment}
              disabled={processingPayment}
            >
              {processingPayment ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.confirmPaymentButtonText}>Proceed to Pay</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading your bookings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={50} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchAppointments()}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e9ecf0ff" />
      <View style={styles.container}>
        <Text style={styles.heading}>My Bookings</Text>

        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
              onPress={() => setSelectedTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2F4EAA']}
              tintColor="#2F4EAA"
              title="Pull to refresh"
              titleColor="#2F4EAA"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="event-busy" size={60} color="#E0E0E0" />
              <Text style={styles.emptyText}>
                {selectedTab === 'All' ? 'No bookings found' : `No ${selectedTab.toLowerCase()} bookings`}
              </Text>
              <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
                <MaterialIcons name="refresh" size={20} color="#FFF" />
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleSubmitRating}
      />

      <PaymentModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#e9ecf0ff' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  heading: { fontSize: 24, fontFamily: 'Inter_600Bold', color: '#333', marginBottom: 24 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 5,
    elevation: 2,
  },
  tabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  activeTabButton: { backgroundColor: '#2F4EAA' },
  tabText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#666' },
  activeTabText: { color: '#FFF', fontFamily: 'Inter_600SemiBold' },
  listContent: { paddingBottom: 30 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  bookingIdText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 6,
    fontFamily: 'Inter_600SemiBold',
  },
  cardHeader: { flexDirection: 'row', marginBottom: 12 },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: { flex: 1, justifyContent: 'center' },
  salonName: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#333', marginBottom: 2 },
  serviceText: { fontSize: 14, color: '#666', fontFamily: 'Inter_400Regular' },
  statusBadge: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12 
  },
  statusText: { 
    fontSize: 12, 
    fontFamily: 'Inter_600SemiBold' 
  },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  dateTimeSection: {
    flex: 1,
  },
  dateTimeContainer: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
  timeIcon: { marginLeft: 12 },
  timeText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
  priceContainer: { alignItems: 'flex-end' },
  priceLabel: { fontSize: 12, color: '#888', fontFamily: 'Inter_400Regular' },
  priceValue: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#333' },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  iconButton: {
    marginRight: 20,
    padding: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  paymentButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  locationText: { fontSize: 14, color: '#666', marginLeft: 4, fontFamily: 'Inter_400Regular' },
  payNowButton: { 
    backgroundColor: '#2F4EAA', 
    borderRadius: 20, 
    paddingHorizontal: 16, 
    paddingVertical: 8 
  },
  payNowButtonText: { 
    color: '#FFF', 
    fontFamily: 'Inter_600SemiBold', 
    fontSize: 14 
  },
  payLaterButton: { 
    backgroundColor: '#FF9800', 
    borderRadius: 20, 
    paddingHorizontal: 16, 
    paddingVertical: 8 
  },
  payLaterButtonText: { 
    color: '#FFF', 
    fontFamily: 'Inter_600SemiBold', 
    fontSize: 14 
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  countdownText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#FF9800',
    fontFamily: 'Inter_500Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  rateButton: {
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateButtonText: {
    color: '#FBC02D',
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 6,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2F4EAA',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
    fontFamily: 'Inter_500Medium',
  },
  serviceStartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 20,
  },
  serviceStartLabel: {
    fontSize: 13,
    color: '#444',
    fontFamily: 'Inter_500Medium',
    marginRight: 6,
  },
  serviceStartTime: {
    fontSize: 13,
    color: '#2F4EAA',
    fontFamily: 'Inter_600SemiBold',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F4EAA',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  refreshButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },

  // Payment Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalContent: {
    padding: 16,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  confirmPaymentButton: {
    backgroundColor: '#2F4EAA',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#8c9dc5',
  },
  confirmPaymentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },

  // Payment Card Styles
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  paymentCardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  paymentSubText: {
    fontSize: 13,
    color: 'gray',
    fontFamily: 'Inter_400Regular',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  paymentStylistName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
  },
  paymentBigDate: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#222',
    marginTop: 5,
  },
  paymentTimeText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  paymentServiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  paymentServiceText: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'Inter_400Regular',
  },
  paymentPriceText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: '#222',
  },
  paymentTotalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentTotalText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  paymentTotalAmount: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
});

export default CustomerBookings;