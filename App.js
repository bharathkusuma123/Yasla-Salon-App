
// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialIcons } from '@expo/vector-icons';

// import { AuthProvider, useAuth } from './src/Context/AuthContext';
// import LoginScreen from './src/Screens/Auth/LoginScreen';
// import SignupScreen from './src/Screens/Auth/SignupScreen'; 

// // Customer Screens
// import CScreen1 from "./src/Screens/Customer/CScreen1";
// import Screen2 from './src/Screens/Customer/CScreen2';
// import BookingScreen from './src/Screens/Customer/BookingScreen';
// import BookingConfirmationScreen from './src/Screens/Customer/BookingConfirmationScreen';
// import CustomerDataScreen from './src/Screens/Customer/CustomerDashboard';
// import SalonSelectionScreen from './src/Screens/Customer/SalonSelectionScreen';
// const Stack = createNativeStackNavigator();

// // Header with Logout button
// const getHeaderOptions = (navigation) => ({
//   headerRight: () => (
//     <TouchableOpacity 
//       style={styles.logoutButton} 
//       onPress={() => {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         });
//       }}
//     >
//       <MaterialIcons name="logout" size={24} color="white" />
//     </TouchableOpacity>
//   ),
// });

// const CustomerStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={({ navigation }) => ({
//         headerStyle: { backgroundColor: '##2F4EAA' },
//         headerTintColor: '#fff',
//         headerTitleStyle: { fontWeight: 'bold' },
//         ...getHeaderOptions(navigation),
//       })}
//     >
//       {/* <Stack.Screen name="CustomerData" component={CustomerDataScreen} options={{ title: 'Customer Profile' }} /> */}
//       <Stack.Screen name="CScreen1" component={CScreen1} options={{ title: 'Yasla Salon' }} />
//             <Stack.Screen name="SalonSelectionScreen" component={SalonSelectionScreen} options={{ title: 'Yasla Salon' }} />

//       <Stack.Screen name="CScreen2" component={Screen2} options={{ title: 'Select Salon' }} />
//       {/* <Stack.Screen name="CScreen3" component={BookingScreen} options={{ title: 'Booking Summary' }} /> */}
//       <Stack.Screen name="CScreen5" component={BookingConfirmationScreen} options={{ title: 'Booking Confirmation' }} />
//     </Stack.Navigator>
//   );
// };

// function MainNavigator() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="CustomerFlow" component={CustomerStack} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <MainNavigator />
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   logoutButton: {
//     marginRight: 15,
//   },
// });




// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialIcons } from '@expo/vector-icons';

// import { AuthProvider, useAuth } from './src/Context/AuthContext';
// import LoginScreen from './src/Screens/Auth/LoginScreen';
// import SignupScreen from './src/Screens/Auth/SignupScreen'; 
// import CustomerTabNavigator from './src/Screens/Customer/CustomerTabNavigator';
// import ForgotPassword from './src/Screens/Auth/ForgotPasswordScreen';
// import ResetPasswordScreen from './src/Screens/Auth/ResetPasswordScreen';
// const Stack = createNativeStackNavigator();

// // Header with Logout button
// const getHeaderOptions = (navigation) => ({
//   headerRight: () => (
//     <View style={styles.headerRightContainer}>
//       {/* Notification Bell */}
//       <TouchableOpacity 
//         style={styles.notificationButton}
//         onPress={() => console.log('Notifications pressed')}
//       >
//         <MaterialIcons name="notifications" size={24} color="white" />
//       </TouchableOpacity>
      
//       {/* Logout Button */}
//       <TouchableOpacity 
//         style={styles.logoutButton} 
//         onPress={() => {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Login' }],
//           });
//         }}
//       >
//         <MaterialIcons name="logout" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   ),
// });

// function MainNavigator() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//                 <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//                       <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                      


//         <Stack.Screen 
//           name="CustomerFlow" 
//           component={CustomerTabNavigator} 
//           options={({ navigation }) => ({
//             headerShown: true,
//             headerStyle: { backgroundColor: '##2F4EAA' },
//             headerTintColor: '#fff',
//             headerTitleStyle: { fontWeight: 'bold' },
//             title: 'Yasla Salon',
//             ...getHeaderOptions(navigation),
//           })}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <MainNavigator />
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   headerRightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   notificationButton: {
//     marginRight: 15,
//   },
//   logoutButton: {
//     marginRight: 10,
//   },
// });


// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, TouchableOpacity, View, Image, Text, Modal, Pressable } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialIcons } from '@expo/vector-icons';

// import { AuthProvider, useAuth } from './src/Context/AuthContext';
// import LoginScreen from './src/Screens/Auth/LoginScreen';
// import SignupScreen from './src/Screens/Auth/SignupScreen'; 
// import CustomerTabNavigator from './src/Screens/Customer/CustomerTabNavigator';
// import ForgotPassword from './src/Screens/Auth/ForgotPasswordScreen';
// import ResetPasswordScreen from './src/Screens/Auth/ResetPasswordScreen';

// const Stack = createNativeStackNavigator();

// // Define styles before they're used
// const styles = StyleSheet.create({
//   headerRightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   notificationButton: {
//     marginRight: 25,
//     position: 'relative',
//   },
//   badge: {
//     position: 'absolute',
//     right: -9,
//     top: -7,
//     backgroundColor: '#000000',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   logoutButton: {
//     marginLeft: 10,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//     marginTop: 60,
//     marginRight: 20,
//     backgroundColor: 'transparent',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     width: 200,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   notificationItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   notificationText: {
//     fontSize: 14,
//   },
//   viewAllButton: {
//     marginTop: 10,
//     padding: 8,
//     backgroundColor: '##2F4EAA',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   viewAllText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// const getHeaderOptions = (navigation) => ({
//   headerStyle: { backgroundColor: '##2F4EAA' },
//   headerTintColor: '#fff',
//   headerTitleAlign: 'left',
//   headerTitle: () => (
//     <Image
//       source={require('./src/Screens/Customer/Images/yasla-logo.jpg')} // Update this path to your actual logo
//       style={{ width: 120, height: 50, resizeMode: 'contain' }}
//     />
//   ),
//   headerRight: () => (
//     <View style={styles.headerRightContainer}>
//       {/* Notification Bell with Badge */}
//       <TouchableOpacity 
//         style={styles.notificationButton}
//         onPress={() => console.log('Notifications pressed')}
//       >
//         <MaterialIcons name="notifications" size={24} color="#fff" />
//         {/* <View style={styles.badge}>
//           <Text style={styles.badgeText}>3</Text>
//         </View> */}
//       </TouchableOpacity>

//       {/* Logout Button */}
//       <TouchableOpacity 
//         style={styles.logoutButton} 
//         onPress={() => {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Login' }],
//           });
//         }}
//       >
//         <MaterialIcons name="logout" size={24} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   ),
// });

// function MainNavigator() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//         <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        
//         <Stack.Screen 
//           name="CustomerFlow" 
//           component={CustomerTabNavigator} 
//           options={({ navigation }) => ({
//             headerShown: true,
//             ...getHeaderOptions(navigation),
//           })}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <MainNavigator />
//     </AuthProvider>
//   );
// }





// import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, TouchableOpacity, View, Image, Text, Modal, Pressable, ActivityIndicator } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialIcons } from '@expo/vector-icons';

// import { AuthProvider, useAuth } from './src/Context/AuthContext';
// import LoginScreen from './src/Screens/Auth/LoginScreen';
// import SignupScreen from './src/Screens/Auth/SignupScreen'; 
// import CustomerTabNavigator from './src/Screens/Customer/CustomerTabNavigator';
// import ForgotPassword from './src/Screens/Auth/ForgotPasswordScreen';
// import ResetPasswordScreen from './src/Screens/Auth/ResetPasswordScreen';

// const Stack = createNativeStackNavigator();

// // Static booking data
// const staticBookings = [
//   { id: 1, service: 'Haircut', date: 'Today, 3:00 PM' },
//   { id: 2, service: 'Manicure', date: 'Tomorrow, 11:00 AM' },
//   { id: 3, service: 'Massage', date: 'Friday, 2:30 PM' },
// ];

// // Define styles
// const styles = StyleSheet.create({
//   headerRightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   notificationButton: {
//     marginRight: 30,
//     position: 'relative',
//   },
// badge: {
//   position: 'absolute',
//   right: -6,   // moved closer to center
//   top: -4,     // lowered so it's not cutting the bell
//   backgroundColor: '#000000',
//   borderRadius: 10,
//   width: 18,
//   height: 18,
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 1,   // ensures badge stays above icon
// },
// badgeText: {
//   color: 'white',
//   fontSize: 10,
//   fontWeight: 'bold',
// },
//   logoutButton: {
//     marginLeft: 10,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//     marginTop: 60,
//     marginRight: 20,
//     backgroundColor: 'transparent',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     width: 200,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   notificationItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   notificationText: {
//     fontSize: 14,
//   },
//   viewAllButton: {
//     marginTop: 10,
//     padding: 8,
//     backgroundColor: '##2F4EAA',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   viewAllText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// // Create a separate component for the header right content
// const HeaderRight = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//   };

//   const handleViewAllBookings = () => {
//     setModalVisible(false);
//     // Navigate to the Bookings tab
//     navigation.navigate('CustomerFlow', {
//       screen: 'BookingsStack',
//       params: {
//         screen: 'CustomerBookings',
//       },
//     });
//   };

//   return (
//     <View style={styles.headerRightContainer}>
//       {/* Notification Bell with Badge */}
//       <View>
//         <TouchableOpacity 
//           style={styles.notificationButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <MaterialIcons name="notifications" size={24} color="#fff" />
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{staticBookings.length}</Text>
//           </View>
//         </TouchableOpacity>
        
//         {/* Notification Modal */}
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <Pressable 
//             style={{ flex: 1 }} 
//             onPress={() => setModalVisible(false)}
//           >
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 {staticBookings.slice(0, 3).map((booking) => (
//                   <View key={booking.id} style={styles.notificationItem}>
//                     <Text style={styles.notificationText}>{booking.service}</Text>
//                     <Text style={[styles.notificationText, { fontSize: 12, color: 'gray' }]}>{booking.date}</Text>
//                   </View>
//                 ))}
//                 <TouchableOpacity 
//                   style={styles.viewAllButton}
//                   onPress={handleViewAllBookings}
//                 >
//                   <Text style={styles.viewAllText}>View All Bookings</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Pressable>
//         </Modal>
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity 
//         style={styles.logoutButton} 
//         onPress={handleLogout}
//       >
//         <MaterialIcons name="logout" size={24} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const getHeaderOptions = (navigation) => ({
//   headerStyle: { backgroundColor: '##2F4EAA' },
//   headerTintColor: '#fff',
//   headerTitleAlign: 'left',
//   headerTitle: () => (
//     <Image
//       source={require('./src/Screens/Customer/Images/yasla-logo.jpg')}
//       style={{ width: 120, height: 50, resizeMode: 'contain' }}
//     />
//   ),
//   headerRight: () => <HeaderRight navigation={navigation} />,
// });

// function MainNavigator() {
//   const { customer, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="##2F4EAA" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {customer ? (
//           // User is logged in - show CustomerFlow
//           <Stack.Screen 
//             name="CustomerFlow" 
//             component={CustomerTabNavigator} 
//             options={({ navigation }) => ({
//               headerShown: true,
//               ...getHeaderOptions(navigation),
//             })}
//           />
//         ) : (
//           // User is not logged in - show auth screens
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Signup" component={SignupScreen} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//             <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <MainNavigator />
//     </AuthProvider>
//   );
// }




// import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, TouchableOpacity, View, Image, Text, Modal, Pressable, ActivityIndicator } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialIcons } from '@expo/vector-icons';

// import { AuthProvider, useAuth } from './src/Context/AuthContext';
// import LoginScreen from './src/Screens/Auth/LoginScreen';
// import SignupScreen from './src/Screens/Auth/SignupScreen'; 
// import CustomerTabNavigator from './src/Screens/Customer/CustomerTabNavigator';
// import ForgotPassword from './src/Screens/Auth/ForgotPasswordScreen';
// import ResetPasswordScreen from './src/Screens/Auth/ResetPasswordScreen';

// const Stack = createNativeStackNavigator();

// // Static booking data
// const staticBookings = [
//   { id: 1, service: 'Haircut', date: 'Today, 3:00 PM' },
//   { id: 2, service: 'Manicure', date: 'Tomorrow, 11:00 AM' },
//   { id: 3, service: 'Massage', date: 'Friday, 2:30 PM' },
// ];

// // Define styles
// const styles = StyleSheet.create({
//   headerRightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   notificationButton: {
//     marginRight: 30,
//     position: 'relative',
//   },
//   badge: {
//     position: 'absolute',
//     right: -6,
//     top: -4,
//     backgroundColor: '#000000',
//     borderRadius: 10,
//     width: 18,
//     height: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   logoutButton: {
//     marginLeft: 10,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//     marginTop: 60,
//     marginRight: 20,
//     backgroundColor: 'transparent',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     width: 200,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   notificationItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   notificationText: {
//     fontSize: 14,
//   },
//   viewAllButton: {
//     marginTop: 10,
//     padding: 8,
//     backgroundColor: '#2F4EAA',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   viewAllText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

// // Create a separate component for the header right content
// const HeaderRight = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//   };

//   const handleViewAllBookings = () => {
//     setModalVisible(false);
//     navigation.navigate('CustomerFlow', {
//       screen: 'BookingsStack',
//       params: {
//         screen: 'CustomerBookings',
//       },
//     });
//   };

//   return (
//     <View style={styles.headerRightContainer}>
//       {/* Notification Bell with Badge */}
//       <View>
//         <TouchableOpacity 
//           style={styles.notificationButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <MaterialIcons name="notifications" size={24} color="#fff" />
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{staticBookings.length}</Text>
//           </View>
//         </TouchableOpacity>
        
//         {/* Notification Modal */}
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <Pressable 
//             style={{ flex: 1 }} 
//             onPress={() => setModalVisible(false)}
//           >
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 {staticBookings.slice(0, 3).map((booking) => (
//                   <View key={booking.id} style={styles.notificationItem}>
//                     <Text style={styles.notificationText}>{booking.service}</Text>
//                     <Text style={[styles.notificationText, { fontSize: 12, color: 'gray' }]}>{booking.date}</Text>
//                   </View>
//                 ))}
//                 <TouchableOpacity 
//                   style={styles.viewAllButton}
//                   onPress={handleViewAllBookings}
//                 >
//                   <Text style={styles.viewAllText}>View All Bookings</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Pressable>
//         </Modal>
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity 
//         style={styles.logoutButton} 
//         onPress={handleLogout}
//       >
//         <MaterialIcons name="logout" size={24} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const getHeaderOptions = (navigation) => ({
//   headerStyle: { backgroundColor: '#2F4EAA' },
//   headerTintColor: '#fff',
//   headerTitleAlign: 'left',
//   headerTitle: () => (
//     <Image
//       source={require('./src/Screens/Customer/Images/yasla-logo.jpg')}
//       style={{ width: 120, height: 50, resizeMode: 'contain' }}
//     />
//   ),
//   headerRight: () => <HeaderRight navigation={navigation} />,
// });

// // Create Auth Stack for unauthenticated users
// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="Signup" component={SignupScreen} />
//     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//     <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//   </Stack.Navigator>
// );

// // Create Main Stack for authenticated users
// const MainStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen 
//       name="CustomerFlow" 
//       component={CustomerTabNavigator} 
//       options={({ navigation }) => ({
//         headerShown: true,
//         ...getHeaderOptions(navigation),
//       })}
//     />
//   </Stack.Navigator>
// );

// function MainNavigator() {
//   const { customer, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2F4EAA" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       {customer ? <MainStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <MainNavigator />
//     </AuthProvider>
//   );
// }






import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Image, Text, Modal, Pressable, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

import { AuthProvider, useAuth } from './src/Context/AuthContext';
import LoginScreen from './src/Screens/Auth/LoginScreen';
import SignupScreen from './src/Screens/Auth/SignupScreen'; 
import CustomerTabNavigator from './src/Screens/Customer/CustomerTabNavigator';
import ForgotPassword from './src/Screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from './src/Screens/Auth/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

// Static booking data
const staticBookings = [
  { id: 1, service: 'Haircut', date: 'Today, 3:00 PM' },
  { id: 2, service: 'Manicure', date: 'Tomorrow, 11:00 AM' },
  { id: 3, service: 'Massage', date: 'Friday, 2:30 PM' },
];

// Define styles
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationButton: {
    marginRight: 30,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: '#3f3e3eff', // Changed to red for better visibility
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1.5, // Added border
    borderColor: 'white', // White border to make it stand out
  },
  badgeText: {
    color: 'white', // Changed to white for better contrast
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  logoutButton: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 60,
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  notificationSubText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Inter_400Regular',
  },
  viewAllButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#2F4EAA',
    borderRadius: 5,
    alignItems: 'center',
  },
  viewAllText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'Inter_400Regular',
  },
});

// Create a separate component for the header right content
const HeaderRight = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleViewAllBookings = () => {
    setModalVisible(false);
    navigation.navigate('CustomerFlow', {
      screen: 'BookingsStack',
      params: {
        screen: 'CustomerBookings',
      },
    });
  };

  return (
    <View style={styles.headerRightContainer}>
      {/* Notification Bell with Badge */}
      <View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="notifications" size={24} color="black" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{staticBookings.length}</Text>
          </View>
        </TouchableOpacity>
        
        {/* Notification Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable 
            style={{ flex: 1 }} 
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {staticBookings.slice(0, 3).map((booking) => (
                  <View key={booking.id} style={styles.notificationItem}>
                    <Text style={styles.notificationText}>{booking.service}</Text>
                    <Text style={styles.notificationSubText}>{booking.date}</Text>
                  </View>
                ))}
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={handleViewAllBookings}
                >
                  <Text style={styles.viewAllText}>View All Bookings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const getHeaderOptions = (navigation) => ({
  headerStyle: { backgroundColor: 'white' },
  headerTintColor: '#fff',
  headerTitleAlign: 'left',
  headerTitle: () => (
    <Image
      source={require('./src/Screens/Customer/Images/Insidelogo.jpg')}
      style={{ width: 120, height: 70, marginLeft: 100, resizeMode: 'contain' }}
    />
  ),
  headerRight: () => <HeaderRight navigation={navigation} />,
});

// Create Auth Stack for unauthenticated users
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
);

// Create Main Stack for authenticated users
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CustomerFlow" 
      component={CustomerTabNavigator} 
      options={({ navigation }) => ({
        headerShown: true,
        ...getHeaderOptions(navigation),
      })}
    />
  </Stack.Navigator>
);

function MainNavigator() {
  const { customer, isLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2F4EAA" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {customer ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}