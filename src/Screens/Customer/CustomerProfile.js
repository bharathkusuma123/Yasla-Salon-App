
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';

// const CustomerDataScreen = () => {
//   const { customer } = useAuth();
//   const [fullCustomerData, setFullCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       try {
//         const phone = customer?.data?.phone;
//         if (!phone) throw new Error('Phone number not available');

//         const response = await axios.get('https://yaslaservice.com:81/customers/');
//         const customers = response.data?.data || [];

//         const matched = customers.find((c) => c.phone === phone);
//         if (matched) {
//           setFullCustomerData(matched);
//         } else {
//           Alert.alert('Error', 'Customer not found');
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         Alert.alert('Error', 'Unable to fetch customer data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomerDetails();
//   }, [customer]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6C63FF" />
//         <Text style={styles.loadingText}>Loading your profile...</Text>
//       </View>
//     );
//   }

//   if (!fullCustomerData) {
//     return (
//       <View style={styles.errorContainer}>
//         <Icon name="error-outline" size={60} color="#2F4EAA" />
//         <Text style={styles.errorText}>Customer details not available</Text>
//         <TouchableOpacity style={styles.retryButton}>
//           <Text style={styles.retryButtonText}>Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const {
//     full_name,
//     email,
//     phone,
//     gender,
//     address,
//     city,
//     pincode,
//     created_at,
//     updated_at,
//     last_login,
//   } = fullCustomerData;

//   const getGenderIcon = () => {
//     switch (gender?.toLowerCase()) {
//       case 'male': return 'male';
//       case 'female': return 'female';
//       default: return 'person';
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.avatarContainer}>
//           <View style={styles.avatar}>
//             <Icon name={getGenderIcon()} size={40} color="#6C63FF" />
//           </View>
//         </View>
//         <Text style={styles.userName}>{full_name}</Text>
//         <Text style={styles.userEmail}>{email}</Text>
//       </View>

//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="contact-phone" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Contact Information</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="phone" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{phone}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="email" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{email}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name={getGenderIcon()} size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{gender || 'Not specified'}</Text>
//         </View>
//       </View>

//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="home" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Address</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="location-on" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{address}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="location-city" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{city}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="markunread-mailbox" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{pincode}</Text>
//         </View>
//       </View>

//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="history" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Activity</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="add-circle" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Account Created</Text>
//             <Text style={styles.infoText}>{moment(created_at).format('LLL')}</Text>
//           </View>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="update" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Last Updated</Text>
//             <Text style={styles.infoText}>{moment(updated_at).format('LLL')}</Text>
//           </View>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="login" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Last Login</Text>
//             <Text style={styles.infoText}>{moment(last_login).format('LLL')}</Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#F5F7FB',
//     flexGrow: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#555',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//     padding: 20,
//   },
//   errorText: {
//     marginTop: 16,
//     fontSize: 18,
//     color: '#555',
//     textAlign: 'center',
//   },
//   retryButton: {
//     marginTop: 20,
//     backgroundColor: '#6C63FF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 3,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   avatarContainer: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: '#6C63FF',
//   },
//   userName: {
//     marginTop: 16,
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   userEmail: {
//     marginTop: 4,
//     fontSize: 16,
//     color: '#666',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 8,
//     color: '#444',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EEE',
//     marginVertical: 8,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F5F5F5',
//   },
//   infoIcon: {
//     marginRight: 12,
//     width: 24,
//     textAlign: 'center',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#555',
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#888',
//   },
//   editButton: {
//     backgroundColor: '#6C63FF',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 24,
//     shadowColor: '#6C63FF',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default CustomerDataScreen;




// CustomerDataScreen.js
// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, ActivityIndicator,
//   Alert, TouchableOpacity
// } from 'react-native';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';
// import { useNavigation } from '@react-navigation/native';

// const CustomerDataScreen = () => {
//   const { customer } = useAuth();
//   const [fullCustomerData, setFullCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       try {
//         const phone = customer?.data?.phone;
//         if (!phone) throw new Error('Phone number not available');

//         const response = await axios.get('https://yaslaservice.com:81/customers/');
//         const customers = response.data?.data || [];

//         const matched = customers.find((c) => c.phone === phone);
//         if (matched) {
//           setFullCustomerData(matched);
//         } else {
//           Alert.alert('Error', 'Customer not found');
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         Alert.alert('Error', 'Unable to fetch customer data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomerDetails();
//   }, [customer]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6C63FF" />
//         <Text style={styles.loadingText}>Loading your profile...</Text>
//       </View>
//     );
//   }

//   if (!fullCustomerData) {
//     return (
//       <View style={styles.errorContainer}>
//         <Icon name="error-outline" size={60} color="#2F4EAA" />
//         <Text style={styles.errorText}>Customer details not available</Text>
//         <TouchableOpacity style={styles.retryButton}>
//           <Text style={styles.retryButtonText}>Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const {
//     id, full_name, email, phone, gender, address, city, pincode, created_at, updated_at, last_login
//   } = fullCustomerData;

//   const getGenderIcon = () => {
//     switch (gender?.toLowerCase()) {
//       case 'male': return 'male';
//       case 'female': return 'female';
//       default: return 'person';
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.avatarContainer}>
//           <View style={styles.avatar}>
//             <Icon name={getGenderIcon()} size={40} color="#6C63FF" />
//           </View>
//         </View>
//         <Text style={styles.userName}>{full_name}</Text>
//         <Text style={styles.userEmail}>{email}</Text>
//       </View>

//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="contact-phone" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Contact Information</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="phone" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{phone}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="email" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{email}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name={getGenderIcon()} size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{gender || 'Not specified'}</Text>
//         </View>
//       </View>

//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="home" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Address</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="location-on" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{address}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="location-city" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{city}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="markunread-mailbox" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{pincode}</Text>
//         </View>
//       </View>

//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="history" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Activity</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="add-circle" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Account Created</Text>
//             <Text style={styles.infoText}>{moment(created_at).format('LLL')}</Text>
//           </View>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="update" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Last Updated</Text>
//             <Text style={styles.infoText}>{moment(updated_at).format('LLL')}</Text>
//           </View>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="login" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Last Login</Text>
//             <Text style={styles.infoText}>{moment(last_login).format('LLL')}</Text>
//           </View>
//         </View>
//       </View>
//   <TouchableOpacity
//         style={styles.editButton}
//         onPress={() => navigation.navigate('EditProfileScreen', { userData: fullCustomerData })}
//       >
//         <Text style={styles.editButtonText}>Edit Profile</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#F5F7FB',
//     flexGrow: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#555',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//     padding: 20,
//   },
//   errorText: {
//     marginTop: 16,
//     fontSize: 18,
//     color: '#555',
//     textAlign: 'center',
//   },
//   retryButton: {
//     marginTop: 20,
//     backgroundColor: '#6C63FF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 3,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   avatarContainer: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: '#6C63FF',
//   },
//   userName: {
//     marginTop: 16,
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   userEmail: {
//     marginTop: 4,
//     fontSize: 16,
//     color: '#666',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 8,
//     color: '#444',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EEE',
//     marginVertical: 8,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F5F5F5',
//   },
//   infoIcon: {
//     marginRight: 12,
//     width: 24,
//     textAlign: 'center',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#555',
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#888',
//   },
//   editButton: {
//     backgroundColor: '#6C63FF',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 24,
//     shadowColor: '#6C63FF',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//     editButton: {
//     backgroundColor: '#6C63FF',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 24,
//     shadowColor: '#6C63FF',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default CustomerDataScreen;


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';

// const CustomerDataScreen = () => {
//   const { customer, updateCustomer } = useAuth();
//   const [fullCustomerData, setFullCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [editedData, setEditedData] = useState({});
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     fetchCustomerDetails();
//   }, [customer]);

//   const fetchCustomerDetails = async () => {
//     try {
//       const phone = customer?.data?.phone;
//       if (!phone) throw new Error('Phone number not available');

//       const response = await axios.get('https://yaslaservice.com:81/customers/');
//       const customers = response.data?.data || [];

//       const matched = customers.find((c) => c.phone === phone);
//       if (matched) {
//         setFullCustomerData(matched);
//         setEditedData({
//           full_name: matched.full_name,
//           email: matched.email,
//           gender: matched.gender,
//           address: matched.address,
//           city: matched.city,
//           pincode: matched.pincode,
//           phone: matched.phone,

//         });
//       } else {
//         Alert.alert('Error', 'Customer not found');
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       Alert.alert('Error', 'Unable to fetch customer data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

  

//   const handleSave = async () => {
//   if (!fullCustomerData?.id) return;
  
//   setIsUpdating(true);
//   try {
//     const response = await axios.put(
//       `https://yaslaservice.com:81/customers/${fullCustomerData.id}/`,
//       editedData
//     );
    
//     // Check for success based on your API response structure
//     if (response.data && response.data.success) {
//       setFullCustomerData(prev => ({
//         ...prev,
//         ...editedData,
//         updated_at: new Date().toISOString()
//       }));
//       updateCustomer({ ...customer, data: { ...customer.data, ...editedData } });
//       setEditMode(false);
//       Alert.alert('Success', 'Profile updated successfully');
//     } else {
//       // Handle case where API returns data but success is false
//       throw new Error(response.data.message || 'Update failed');
//     }
//   } catch (error) {
//     console.error('Update error:', error);
//     // Show more specific error message if available
//     const errorMessage = error.response?.data?.message || 
//                         error.message || 
//                         'Failed to update profile. Please try again.';
//     Alert.alert('Error', errorMessage);
//   } finally {
//     setIsUpdating(false);
//   }
// };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6C63FF" />
//         <Text style={styles.loadingText}>Loading your profile...</Text>
//       </View>
//     );
//   }

//   if (!fullCustomerData) {
//     return (
//       <View style={styles.errorContainer}>
//         <Icon name="error-outline" size={60} color="#2F4EAA" />
//         <Text style={styles.errorText}>Customer details not available</Text>
//         <TouchableOpacity 
//           style={styles.retryButton}
//           onPress={fetchCustomerDetails}
//         >
//           <Text style={styles.retryButtonText}>Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const {
//     full_name,
//     email,
//     phone,
//     gender,
//     address,
//     city,
//     pincode,
//     created_at,
//     updated_at,
//     last_login,
//   } = fullCustomerData;

//   const getGenderIcon = () => {
//     switch (gender?.toLowerCase()) {
//       case 'male': return 'male';
//       case 'female': return 'female';
//       default: return 'person';
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.avatarContainer}>
//           <View style={styles.avatar}>
//             <Icon name={getGenderIcon()} size={40} color="#6C63FF" />
//           </View>
//         </View>
//         <Text style={styles.userName}>{full_name}</Text>
//         <Text style={styles.userEmail}>{email}</Text>
        
//         {!editMode ? (
//           <TouchableOpacity 
//             style={styles.editButton}
//             onPress={() => setEditMode(true)}
//           >
//             <Text style={styles.editButtonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.editActions}>
//             <TouchableOpacity 
//               style={[styles.editActionButton, styles.cancelButton]}
//               onPress={() => setEditMode(false)}
//             >
//               <Text style={styles.editActionButtonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={[styles.editActionButton, styles.saveButton]}
//               onPress={handleSave}
//               disabled={isUpdating}
//             >
//               {isUpdating ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text style={styles.editActionButtonText}>Save Changes</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* Contact Information Card */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="contact-phone" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Contact Information</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="phone" size={20} color="#888" style={styles.infoIcon} />
//           <Text style={styles.infoText}>{phone}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="email" size={20} color="#888" style={styles.infoIcon} />
//           {editMode ? (
//             <TextInput
//               style={styles.input}
//               value={editedData.email}
//               onChangeText={(text) => handleInputChange('email', text)}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           ) : (
//             <Text style={styles.infoText}>{email}</Text>
//           )}
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name={getGenderIcon()} size={20} color="#888" style={styles.infoIcon} />
//           {editMode ? (
//             <View style={styles.genderContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.genderOption,
//                   editedData.gender?.toLowerCase() === 'male' && styles.genderSelected
//                 ]}
//                 onPress={() => handleInputChange('gender', 'Male')}
//               >
//                 <Text style={styles.genderOptionText}>Male</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.genderOption,
//                   editedData.gender?.toLowerCase() === 'female' && styles.genderSelected
//                 ]}
//                 onPress={() => handleInputChange('gender', 'Female')}
//               >
//                 <Text style={styles.genderOptionText}>Female</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.genderOption,
//                   !['male', 'female'].includes(editedData.gender?.toLowerCase()) && styles.genderSelected
//                 ]}
//                 onPress={() => handleInputChange('gender', 'Other')}
//               >
//                 <Text style={styles.genderOptionText}>Other</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <Text style={styles.infoText}>{gender || 'Not specified'}</Text>
//           )}
//         </View>
//       </View>

//       {/* Personal Information Card */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="person" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Personal Information</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="badge" size={20} color="#888" style={styles.infoIcon} />
//           {editMode ? (
//             <TextInput
//               style={styles.input}
//               value={editedData.full_name}
//               onChangeText={(text) => handleInputChange('full_name', text)}
//             />
//           ) : (
//             <Text style={styles.infoText}>{full_name}</Text>
//           )}
//         </View>
//       </View>

//       {/* Address Card */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="home" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Address</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="location-on" size={20} color="#888" style={styles.infoIcon} />
//           {editMode ? (
//             <TextInput
//               style={styles.input}
//               value={editedData.address}
//               onChangeText={(text) => handleInputChange('address', text)}
//               placeholder="Enter your address"
//               multiline
//             />
//           ) : (
//             <Text style={styles.infoText}>{address}</Text>
//           )}
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="location-city" size={20} color="#888" style={styles.infoIcon} />
//           {editMode ? (
//             <TextInput
//               style={styles.input}
//               value={editedData.city}
//               onChangeText={(text) => handleInputChange('city', text)}
//               placeholder="Enter your city"
//             />
//           ) : (
//             <Text style={styles.infoText}>{city}</Text>
//           )}
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="markunread-mailbox" size={20} color="#888" style={styles.infoIcon} />
//           {editMode ? (
//             <TextInput
//               style={styles.input}
//               value={editedData.pincode}
//               onChangeText={(text) => handleInputChange('pincode', text)}
//               placeholder="Enter pincode"
//               keyboardType="numeric"
//             />
//           ) : (
//             <Text style={styles.infoText}>{pincode}</Text>
//           )}
//         </View>
//       </View>

//       {/* Activity Card (Read-only) */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Icon name="history" size={24} color="#6C63FF" />
//           <Text style={styles.cardTitle}>Activity</Text>
//         </View>
//         <View style={styles.divider} />
        
//         <View style={styles.infoRow}>
//           <Icon name="add-circle" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Account Created</Text>
//             <Text style={styles.infoText}>{moment(created_at).format('LLL')}</Text>
//           </View>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="update" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Last Updated</Text>
//             <Text style={styles.infoText}>{moment(updated_at).format('LLL')}</Text>
//           </View>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Icon name="login" size={20} color="#888" style={styles.infoIcon} />
//           <View>
//             <Text style={styles.infoLabel}>Last Login</Text>
//             <Text style={styles.infoText}>{moment(last_login).format('LLL')}</Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   // ... (keep all your existing styles)

//   // Add these new styles:

//    container: {
//     padding: 16,
//     backgroundColor: '#F5F7FB',
//     flexGrow: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#555',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//     padding: 20,
//   },
//   errorText: {
//     marginTop: 16,
//     fontSize: 18,
//     color: '#555',
//     textAlign: 'center',
//   },
//   retryButton: {
//     marginTop: 20,
//     backgroundColor: '#6C63FF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 3,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   avatarContainer: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: '#6C63FF',
//   },
//   userName: {
//     marginTop: 16,
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   userEmail: {
//     marginTop: 4,
//     fontSize: 16,
//     color: '#666',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 8,
//     color: '#444',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EEE',
//     marginVertical: 8,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F5F5F5',
//   },
//   infoIcon: {
//     marginRight: 12,
//     width: 24,
//     textAlign: 'center',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#555',
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#888',
//   },
//   editButton: {
//     backgroundColor: '#6C63FF',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 24,
//     shadowColor: '#6C63FF',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   editButton: {
//     backgroundColor: '#6C63FF',
//     padding: 12,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginTop: 16,
//     width: '60%',
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   editActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     marginTop: 16,
//   },
//   editActionButton: {
//     padding: 12,
//     borderRadius: 25,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 8,
//   },
//   cancelButton: {
//     backgroundColor: '#2F4EAA',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//   },
//   editActionButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#555',
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDD',
//     paddingVertical: 4,
//   },
//   genderContainer: {
//     flexDirection: 'row',
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   genderOption: {
//     padding: 8,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#DDD',
//     backgroundColor: '#F5F5F5',
//   },
//   genderSelected: {
//     backgroundColor: '#6C63FF',
//     borderColor: '#6C63FF',
//   },
//   genderOptionText: {
//     color: '#555',
//   },
//   genderSelectedText: {
//     color: 'white',
//   },
// });

// export default CustomerDataScreen;


//above with only with fetch data Profile
//==============//============================================================
// edit functionality below using 

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';

// const CustomerDataScreen = () => {
//   const { customer } = useAuth();
//   const [fullCustomerData, setFullCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetchCustomerDetails();
//   }, [customer]);

//   const fetchCustomerDetails = async () => {
//     try {
//       setLoading(true);
//       const phone = customer?.data?.phone;
//       if (!phone) throw new Error('Phone number not available');

//       const response = await axios.get('https://yaslaservice.com:81/customers/');
//       const customers = response.data?.data || [];

//       const matched = customers.find((c) => c.phone === phone);
//       if (matched) {
//         setFullCustomerData(matched);
//         setEditData({
//           full_name: matched.full_name,
//           email: matched.email,
//           address: matched.address,
//           city: matched.city,
//           pincode: matched.pincode,
//           gender: matched.gender,
//         });
//       } else {
//         Alert.alert('Error', 'Customer not found');
//       }
//     } catch (error) {
//       console.error('Fetch error:', {
//         message: error.message,
//         response: error.response?.data,
//         config: error.config,
//       });
//       Alert.alert('Error', 'Unable to fetch customer data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleCancel = () => {
//     setEditing(false);
//     if (fullCustomerData) {
//       setEditData({
//         full_name: fullCustomerData.full_name,
//         email: fullCustomerData.email,
//         address: fullCustomerData.address,
//         city: fullCustomerData.city,
//         pincode: fullCustomerData.pincode,
//         gender: fullCustomerData.gender,
//       });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       setIsSubmitting(true);
      
//       // Validate data before sending
//       if (!editData.full_name || !editData.email) {
//         Alert.alert('Validation Error', 'Name and email are required fields');
//         return;
//       }

//       // Prepare the payload
//       const payload = {
//         full_name: editData.full_name,
//         email: editData.email,
//         address: editData.address || '',
//         city: editData.city || '',
//         pincode: editData.pincode || '',
//         gender: editData.gender || '',
//       };

//       console.log('Sending update payload:', payload);

//       const response = await axios.put(
//         `https://yaslaservice.com:81/customers/${fullCustomerData.id}`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             // Add if your API requires authentication
//             // 'Authorization': `Bearer ${customer.token}`,
//           }
//         }
//       );
      
//       console.log('Update response:', response.data);
      
//       if (response.data.success) {
//         setFullCustomerData(prev => ({ ...prev, ...payload }));
//         setEditing(false);
//         Alert.alert('Success', 'Profile updated successfully');
//       } else {
//         throw new Error(response.data.message || 'Update failed');
//       }
//     } catch (error) {
//       console.error('Detailed update error:', {
//         message: error.message,
//         response: error.response?.data,
//         config: error.config,
//       });
      
//       let errorMessage = 'Failed to update profile. Please try again.';
      
//       if (error.response) {
//         if (error.response.status === 500) {
//           errorMessage = 'Server error. Please contact support if the problem persists.';
//         } else if (error.response.data?.message) {
//           errorMessage = error.response.data.message;
//         }
//       }
      
//       Alert.alert('Error', errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setEditData(prev => ({ ...prev, [field]: value }));
//   };

//   const getGenderIcon = () => {
//     switch (fullCustomerData?.gender?.toLowerCase()) {
//       case 'male': return 'male';
//       case 'female': return 'female';
//       default: return 'person';
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6C63FF" />
//         <Text style={styles.loadingText}>Loading your profile...</Text>
//       </View>
//     );
//   }

//   if (!fullCustomerData) {
//     return (
//       <View style={styles.errorContainer}>
//         <Icon name="error-outline" size={60} color="#2F4EAA" />
//         <Text style={styles.errorText}>Customer details not available</Text>
//         <TouchableOpacity 
//           style={styles.retryButton}
//           onPress={fetchCustomerDetails}
//         >
//           <Text style={styles.retryButtonText}>Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const {
//     full_name,
//     email,
//     phone,
//     gender,
//     address,
//     city,
//     pincode,
//     created_at,
//     updated_at,
//     last_login,
//   } = fullCustomerData;

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.header}>
//           <View style={styles.avatarContainer}>
//             <View style={styles.avatar}>
//               <Icon name={getGenderIcon()} size={40} color="#6C63FF" />
//             </View>
//           </View>
//           <Text style={styles.userName}>{full_name}</Text>
//           <Text style={styles.userEmail}>{email}</Text>
          
//           <TouchableOpacity 
//             style={styles.editButton}
//             onPress={handleEdit}
//           >
//             <Icon name="edit" size={20} color="white" />
//             <Text style={styles.editButtonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="contact-phone" size={24} color="#6C63FF" />
//             <Text style={styles.cardTitle}>Contact Information</Text>
//           </View>
//           <View style={styles.divider} />
          
//           <View style={styles.infoRow}>
//             <Icon name="phone" size={20} color="#888" style={styles.infoIcon} />
//             <Text style={styles.infoText}>{phone}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Icon name="email" size={20} color="#888" style={styles.infoIcon} />
//             <Text style={styles.infoText}>{email}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Icon name={getGenderIcon()} size={20} color="#888" style={styles.infoIcon} />
//             <Text style={styles.infoText}>{gender || 'Not specified'}</Text>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="home" size={24} color="#6C63FF" />
//             <Text style={styles.cardTitle}>Address</Text>
//           </View>
//           <View style={styles.divider} />
          
//           <View style={styles.infoRow}>
//             <Icon name="location-on" size={20} color="#888" style={styles.infoIcon} />
//             <Text style={styles.infoText}>{address}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Icon name="location-city" size={20} color="#888" style={styles.infoIcon} />
//             <Text style={styles.infoText}>{city}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Icon name="markunread-mailbox" size={20} color="#888" style={styles.infoIcon} />
//             <Text style={styles.infoText}>{pincode}</Text>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="history" size={24} color="#6C63FF" />
//             <Text style={styles.cardTitle}>Activity</Text>
//           </View>
//           <View style={styles.divider} />
          
//           <View style={styles.infoRow}>
//             <Icon name="add-circle" size={20} color="#888" style={styles.infoIcon} />
//             <View>
//               <Text style={styles.infoLabel}>Account Created</Text>
//               <Text style={styles.infoText}>{moment(created_at).format('LLL')}</Text>
//             </View>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Icon name="update" size={20} color="#888" style={styles.infoIcon} />
//             <View>
//               <Text style={styles.infoLabel}>Last Updated</Text>
//               <Text style={styles.infoText}>{moment(updated_at).format('LLL')}</Text>
//             </View>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Icon name="login" size={20} color="#888" style={styles.infoIcon} />
//             <View>
//               <Text style={styles.infoLabel}>Last Login</Text>
//               <Text style={styles.infoText}>{moment(last_login).format('LLL')}</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Edit Modal */}
//       <Modal
//         visible={editing}
//         animationType="slide"
//         transparent={false}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={styles.modalContainer}
//         >
//           <ScrollView contentContainerStyle={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit Profile</Text>
//               <TouchableOpacity onPress={handleCancel}>
//                 <Icon name="close" size={24} color="#6C63FF" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Full Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={editData.full_name}
//                 onChangeText={(text) => handleChange('full_name', text)}
//                 placeholder="Enter your full name"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 value={editData.email}
//                 onChangeText={(text) => handleChange('email', text)}
//                 placeholder="Enter your email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Gender</Text>
//               <View style={styles.radioGroup}>
//                 <TouchableOpacity 
//                   style={[styles.radioButton, editData.gender === 'Male' && styles.radioButtonSelected]}
//                   onPress={() => handleChange('gender', 'Male')}
//                 >
//                   <Text style={editData.gender === 'Male' ? styles.radioTextSelected : styles.radioText}>Male</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={[styles.radioButton, editData.gender === 'Female' && styles.radioButtonSelected]}
//                   onPress={() => handleChange('gender', 'Female')}
//                 >
//                   <Text style={editData.gender === 'Female' ? styles.radioTextSelected : styles.radioText}>Female</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={[styles.radioButton, editData.gender === 'Other' && styles.radioButtonSelected]}
//                   onPress={() => handleChange('gender', 'Other')}
//                 >
//                   <Text style={editData.gender === 'Other' ? styles.radioTextSelected : styles.radioText}>Other</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Address</Text>
//               <TextInput
//                 style={[styles.input, styles.textArea]}
//                 value={editData.address}
//                 onChangeText={(text) => handleChange('address', text)}
//                 placeholder="Enter your address"
//                 multiline
//                 numberOfLines={3}
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>City</Text>
//               <TextInput
//                 style={styles.input}
//                 value={editData.city}
//                 onChangeText={(text) => handleChange('city', text)}
//                 placeholder="Enter your city"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Pincode</Text>
//               <TextInput
//                 style={styles.input}
//                 value={editData.pincode}
//                 onChangeText={(text) => handleChange('pincode', text)}
//                 placeholder="Enter your pincode"
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity 
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={handleCancel}
//                 disabled={isSubmitting}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 style={[styles.modalButton, styles.saveButton]}
//                 onPress={handleSave}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <ActivityIndicator color="white" />
//                 ) : (
//                   <Text style={styles.saveButtonText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FB',
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 32,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#555',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F7FB',
//     padding: 20,
//   },
//   errorText: {
//     marginTop: 16,
//     fontSize: 18,
//     color: '#555',
//     textAlign: 'center',
//   },
//   retryButton: {
//     marginTop: 20,
//     backgroundColor: '#6C63FF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 3,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   avatarContainer: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: '#6C63FF',
//   },
//   userName: {
//     marginTop: 16,
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   userEmail: {
//     marginTop: 4,
//     fontSize: 16,
//     color: '#666',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 8,
//     color: '#444',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#EEE',
//     marginVertical: 8,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F5F5F5',
//   },
//   infoIcon: {
//     marginRight: 12,
//     width: 24,
//     textAlign: 'center',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#555',
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#888',
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#6C63FF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     marginTop: 16,
//     shadowColor: '#6C63FF',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   // Modal styles
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#F5F7FB',
//   },
//   modalContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#DDD',
//   },
//   textArea: {
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   radioGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   radioButton: {
//     flex: 1,
//     marginHorizontal: 4,
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#EEE',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#DDD',
//   },
//   radioButtonSelected: {
//     backgroundColor: '#6C63FF',
//     borderColor: '#6C63FF',
//   },
//   radioText: {
//     color: '#555',
//   },
//   radioTextSelected: {
//     color: 'white',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   modalButton: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cancelButton: {
//     backgroundColor: '#EEE',
//     marginRight: 10,
//   },
//   saveButton: {
//     backgroundColor: '#6C63FF',
//     marginLeft: 10,
//   },
//   cancelButtonText: {
//     color: '#555',
//     fontWeight: '600',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });

// export default CustomerDataScreen;



import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import moment from 'moment';


const CustomerDataScreen = () => {
  const { customer, updateCustomer, logout } = useAuth();
  const [fullCustomerData, setFullCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  
const navigation = useNavigation();

  useEffect(() => {
    fetchCustomerDetails();
  }, [customer]);

  const fetchCustomerDetails = async () => {
    try {
      const phone = customer?.data?.phone;
      if (!phone) throw new Error('Phone number not available');

      const response = await axios.get('https://yaslaservice.com:81/customers/');
      const customers = response.data?.data || [];

      const matched = customers.find((c) => c.phone === phone);
      if (matched) {
        setFullCustomerData(matched);
        setEditedData({
          full_name: matched.full_name,
          email: matched.email,
          gender: matched.gender,
          address: matched.address,
          city: matched.city,
          pincode: matched.pincode,
          phone: matched.phone,

        });
      } else {
        Alert.alert('Error', 'Customer not found');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Unable to fetch customer data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };


 const handleDeleteAccount = () => {
  if (!fullCustomerData?.id) {
    Alert.alert('Error', 'Customer data not found.');
    return;
  }

  Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete your account? This action cannot be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          try {
            setIsUpdating(true);
            await axios.delete(`https://yaslaservice.com:81/customers/${fullCustomerData.id}/`);
            Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
            logout(); // ✅ log out immediately after successful deletion
          } catch (error) {
            console.error('Delete error:', error);
            Alert.alert('Error', 'Failed to delete account. Please try again.');
          } finally {
            setIsUpdating(false);
          }
        },
      },
    ]
  );
};


  

const handleSave = async () => {
  if (!fullCustomerData?.id) return;

  setIsUpdating(true);

  try {
    const response = await axios.put(
      `https://yaslaservice.com:81/customers/${fullCustomerData.id}/`,
      editedData
    );

    // ✅ Successful response check: adjust this based on actual API
    if (response.status === 200 || response.status === 201) {
      setFullCustomerData(prev => ({
        ...prev,
        ...editedData,
        updated_at: new Date().toISOString()
      }));

      setEditMode(false);

      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack(); // ✅ Go back to previous screen
          }
        }
      ]);
    } else {
      throw new Error('Update failed: Invalid response status');
    }
  } catch (error) {
    console.error('Update error:', error);
    const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to update profile. Please try again.';
    Alert.alert('Error', errorMessage);
  } finally {
    setIsUpdating(false);
  }
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (!fullCustomerData) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={60} color="#2F4EAA" />
        <Text style={styles.errorText}>Customer details not available</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchCustomerDetails}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const {
    full_name,
    email,
    phone,
    gender,
    address,
    city,
    pincode,
    created_at,
    updated_at,
    last_login,
  } = fullCustomerData;

  const getGenderIcon = () => {
    switch (gender?.toLowerCase()) {
      case 'male': return 'male';
      case 'female': return 'female';
      default: return 'person';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name={getGenderIcon()} size={40} color="#2F4EAA" />
          </View>
        </View>
        <Text style={styles.userName}>{full_name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        
        {!editMode ? (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={[styles.editActionButton, styles.cancelButton]}
              onPress={() => setEditMode(false)}
            >
              <Text style={styles.editActionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.editActionButton, styles.saveButton]}
              onPress={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.editActionButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Contact Information Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="contact-phone" size={24} color="#2F4EAA" />
          <Text style={styles.cardTitle}>Contact Information</Text>
        </View>
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Icon name="phone" size={20}  style={styles.infoIcon} />
          <Text style={styles.infoText}>{phone}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="email" size={20}  style={styles.infoIcon} />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <Text style={styles.infoText}>{email}</Text>
          )}
        </View>
        
        <View style={styles.infoRow}>
          <Icon name={getGenderIcon()} size={20}  style={styles.infoIcon} />
          {editMode ? (
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  editedData.gender?.toLowerCase() === 'male' && styles.genderSelected
                ]}
                onPress={() => handleInputChange('gender', 'Male')}
              >
                <Text style={styles.genderOptionText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  editedData.gender?.toLowerCase() === 'female' && styles.genderSelected
                ]}
                onPress={() => handleInputChange('gender', 'Female')}
              >
                <Text style={styles.genderOptionText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  !['male', 'female'].includes(editedData.gender?.toLowerCase()) && styles.genderSelected
                ]}
                onPress={() => handleInputChange('gender', 'Other')}
              >
                <Text style={styles.genderOptionText}>Other</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.infoText}>{gender || 'Not specified'}</Text>
          )}
        </View>
      </View>

      {/* Personal Information Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="person" size={24} color="#2F4EAA" />
          <Text style={styles.cardTitle}>Personal Information</Text>
        </View>
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Icon name="badge" size={20}  style={styles.infoIcon} />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedData.full_name}
              onChangeText={(text) => handleInputChange('full_name', text)}
            />
          ) : (
            <Text style={styles.infoText}>{full_name}</Text>
          )}
        </View>
      </View>

      {/* Address Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="home" size={24} color="#2F4EAA" />
          <Text style={styles.cardTitle}>Address</Text>
        </View>
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Icon name="location-on" size={20} style={styles.infoIcon} />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              placeholder="Enter your address"
              multiline
            />
          ) : (
            <Text style={styles.infoText}>{address}</Text>
          )}
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="location-city" size={20}  style={styles.infoIcon} />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedData.city}
              onChangeText={(text) => handleInputChange('city', text)}
              placeholder="Enter your city"
            />
          ) : (
            <Text style={styles.infoText}>{city}</Text>
          )}
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="markunread-mailbox" size={20}  style={styles.infoIcon} />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={editedData.pincode}
              onChangeText={(text) => handleInputChange('pincode', text)}
              placeholder="Enter pincode"
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.infoText}>{pincode}</Text>
          )}
        </View>
      </View>

      {/* Activity Card (Read-only) */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="history" size={24} color="#2F4EAA" />
          <Text style={styles.cardTitle}>Activity</Text>
        </View>
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Icon name="add-circle" size={20}  style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Account Created</Text>
            <Text style={styles.infoText}>{moment(created_at).format('LLL')}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="update" size={20}  style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoText}>{moment(updated_at).format('LLL')}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="login" size={20} style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Last Login</Text>
            <Text style={styles.infoText}>{moment(last_login).format('LLL')}</Text>
          </View>
        </View>
      <View style={styles.deleteIconContainer}>
  <TouchableOpacity onPress={handleDeleteAccount} disabled={isUpdating}>
    {isUpdating ? (
      <ActivityIndicator color="#D32F2F" />
    ) : (
      <Icon name="delete-forever" size={36} color="#D32F2F" />
    )}
  </TouchableOpacity>
  <Text style={styles.deleteLabel}>Delete Account</Text>
</View>



      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({



   container: {
    padding: 16,
    backgroundColor: '#e9ecf0ff',
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
    fontFamily: 'Inter_500Medium',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
      fontFamily: 'Inter_500Medium',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  retryButtonText: {
    color: 'white',
    // fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2F4EAA',
  },
  userName: {
    fontSize: 30,
    // fontWeight: 'bold',
      fontFamily: 'Inter_600SemiBold',
  },
  userEmail: {
    marginTop: 4,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 23,
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold', 
    marginLeft: 8,
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
       fontFamily: 'Inter_400Regular', 
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
     fontFamily: 'Inter_400Regular',
  },
  editButton: {
    backgroundColor: '#2F4EAA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#2F4EAA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold',
  },
  editButton: {
    backgroundColor: '#2F4EAA',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
    width: '60%',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 16,
  },
  editActionButton: {
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#2F4EAA',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  editActionButtonText: {
    color: 'white',
    fontSize: 16,
    // fontWeight: '600',
       fontFamily: 'Inter_600SemiBold', 
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 4,
      fontFamily: 'Inter_400Regular',
  },
  genderContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  genderOption: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#F5F5F5',
  },
  genderSelected: {
    backgroundColor: '#2F4EAA',
    borderColor: '#2F4EAA',
  },
  genderOptionText: {
    color: 'white',
     fontFamily: 'Inter_500Medium',
  },
  genderSelectedText: {
    color: 'white',
 fontFamily: 'Inter_600SemiBold',
  },
deleteIconContainer: {
  alignItems: 'center',
  marginVertical: 30,
},
deleteLabel: {
  marginTop: 8,
  fontSize: 14,
  color: '#D32F2F',
  fontFamily: 'Inter_500Medium',
},


});

export default CustomerDataScreen;