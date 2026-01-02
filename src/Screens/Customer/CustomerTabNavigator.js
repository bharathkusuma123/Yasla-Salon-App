// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Import all your customer screens
// import CScreen1 from './CScreen1';
// import CustomerBookings from './CustomerBookings';
// import CustomerPayments from './CustomerPayments';
// import CustomerProfile from './CustomerProfile';
// import Screen2 from './CScreen2';
// import BookingConfirmationScreen from './BookingConfirmationScreen';
// import SalonSelectionScreen from './SalonSelectionScreen';
// import SalonServices from './SalonServices';
// import BookingSummary from './BookingSummary';
// import PaymentSummary from './PaymentSummary';
// import RescheduleScreen from './RescheduleScreen';
// import EditProfileScreen from './EditProfileScreen';
// import YLGSALONScreen from './YLGSalonScreen';
// import Bharathnew from './Bharathnew';
// import PaymentScreen from './PaymentsScreen';
// import ReviewAppointmentScreen1 from './ReviewAppointmentScreen1';
// import ReviewAppointmentScreen2 from './ReviewAppointmentScreen2';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // Create stack navigators for each tab
// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="CScreen1" component={CScreen1} /> 
//       <Stack.Screen name="SalonSelectionScreen" component={SalonSelectionScreen} />
//       {/* <Stack.Screen name="CScreen2" component={Screen2} /> */}
//       {/* <Stack.Screen name="CScreen5" component={BookingConfirmationScreen} options={{ title: 'Booking Confirmation' }} /> */}
//       <Stack.Screen name="SalonServices" component={SalonServices} />
//       <Stack.Screen name="ReviewAppointment1" component={ReviewAppointmentScreen1} />
//             <Stack.Screen name="ReviewAppointment2" component={ReviewAppointmentScreen2} />




//     </Stack.Navigator>
//   );
// }

// function BookingsStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="CustomerBookings" component={CustomerBookings} />
//       <Stack.Screen name="BookingSummary" component={BookingSummary} />
//     <Stack.Screen name="RescheduleScreen" component={RescheduleScreen} />
//       <Stack.Screen name="PaymentScreen" component={PaymentScreen} />

//     </Stack.Navigator>
//   );
// }

// function PaymentsStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="CustomerPayments" component={CustomerPayments} />
//         <Stack.Screen name="PaymentSummary" component={PaymentSummary} />
//     </Stack.Navigator>
//   );
// }

// function ProfileStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
//       <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
//     </Stack.Navigator>
//   );
// }

// const CustomerTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#2F4EAA',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: { 
//           paddingBottom: 5, 
//           height: 60,
//           backgroundColor: '#fff',
//           borderTopWidth: 0,
//           elevation: 10,
//           shadowOpacity: 0.1,
//           shadowRadius: 5,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="HomeStack"
//         component={HomeStack}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//           tabBarLabel: 'Home',
//         }}
//       />
//       <Tab.Screen
//         name="BookingsStack"
//         component={BookingsStack}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="calendar" size={size} color={color} />
//           ),
//           tabBarLabel: 'Bookings',
//         }}
//       />
//       <Tab.Screen
//         name="PaymentsStack"
//         component={PaymentsStack}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="payment" size={size} color={color} />
//           ),
//           tabBarLabel: 'Payments',
//         }}
//       />
//       <Tab.Screen
//         name="ProfileStack"
//         component={ProfileStack}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="user" size={size} color={color} />
//           ),
//           tabBarLabel: 'Profile',
//         }}
//       />
     
     
//     </Tab.Navigator>
//   );
// };

// export default CustomerTabNavigator;


//  Above code is without guest login 

// below after guest login code 


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import { useAuth } from '../../Context/AuthContext'; 

// // Import all your screens
// import CScreen1 from './CScreen1';
// import CustomerBookings from './CustomerBookings';
// import CustomerPayments from './CustomerPayments';
// import CustomerProfile from './CustomerProfile';
// import SalonSelectionScreen from './SalonSelectionScreen';
// import SalonServices from './SalonServices';
// import BookingSummary from './BookingSummary';
// import PaymentSummary from './PaymentSummary';
// import RescheduleScreen from './RescheduleScreen';
// import EditProfileScreen from './EditProfileScreen';
// import PaymentScreen from './PaymentsScreen';
// import ReviewAppointmentScreen1 from './ReviewAppointmentScreen1';
// import ReviewAppointmentScreen2 from './ReviewAppointmentScreen2';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // 🔹 Guest message components
// const GuestBookings = () => (
//   <View style={styles.guestContainer}>
//     <Text style={styles.guestText}>Please register or login to view your bookings</Text>
//   </View>
// );

// const GuestPayments = () => (
//   <View style={styles.guestContainer}>
//     <Text style={styles.guestText}>Please register or login to view your payment history</Text>
//   </View>
// );

// const GuestProfile = () => (
//   <View style={styles.guestContainer}>
//     <Text style={styles.guestText}>Please register or login to access your profile</Text>
//   </View>
// );

// // Home stack (always available)
// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="CScreen1" component={CScreen1} />
//       <Stack.Screen name="SalonSelectionScreen" component={SalonSelectionScreen} />
//       <Stack.Screen name="SalonServices" component={SalonServices} />
//       <Stack.Screen name="ReviewAppointment1" component={ReviewAppointmentScreen1} />
//       <Stack.Screen name="ReviewAppointment2" component={ReviewAppointmentScreen2} />
//     </Stack.Navigator>
//   );
// }

// // Bookings stack
// function BookingsStack() {
//   const { customer } = useAuth();
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {customer?.isGuest || !customer ? (
//         <Stack.Screen name="GuestBookings" component={GuestBookings} />
//       ) : (
//         <>
//           <Stack.Screen name="CustomerBookings" component={CustomerBookings} />
//           <Stack.Screen name="BookingSummary" component={BookingSummary} />
//           <Stack.Screen name="RescheduleScreen" component={RescheduleScreen} />
//           <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// // Payments stack
// function PaymentsStack() {
//   const { customer } = useAuth();
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {customer?.isGuest || !customer ? (
//         <Stack.Screen name="GuestPayments" component={GuestPayments} />
//       ) : (
//         <>
//           <Stack.Screen name="CustomerPayments" component={CustomerPayments} />
//           <Stack.Screen name="PaymentSummary" component={PaymentSummary} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// // Profile stack
// function ProfileStack() {
//   const { customer } = useAuth();
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {customer?.isGuest || !customer ? (
//         <Stack.Screen name="GuestProfile" component={GuestProfile} />
//       ) : (
//         <>
//           <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
//           <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// // Main tabs
// // const CustomerTabNavigator = () => {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={{
// //         headerShown: false,
// //         tabBarActiveTintColor: '#2F4EAA',
// //         tabBarInactiveTintColor: 'gray',
// //         tabBarStyle: {
// //           paddingBottom: 5,
// //           height: 60,
// //           backgroundColor: '#fff',
// //           borderTopWidth: 0,
// //           elevation: 10,
// //           shadowOpacity: 0.1,
// //           shadowRadius: 5,
// //         },
// //       }}
// //     >
// //       <Tab.Screen
// //         name="HomeStack"
// //         component={HomeStack}
// //         options={{
// //           tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
// //           tabBarLabel: 'Home',
// //         }}
// //       />
// //       <Tab.Screen
// //         name="BookingsStack"
// //         component={BookingsStack}
// //         options={{
// //           tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
// //           tabBarLabel: 'Bookings',
// //         }}
// //       />
// //       <Tab.Screen
// //         name="PaymentsStack"
// //         component={PaymentsStack}
// //         options={{
// //           tabBarIcon: ({ color, size }) => <MaterialIcons name="payment" size={size} color={color} />,
// //           tabBarLabel: 'Payments',
// //         }}
// //       />
// //       <Tab.Screen
// //         name="ProfileStack"
// //         component={ProfileStack}
// //         options={{
// //           tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
// //           tabBarLabel: 'Profile',
// //         }}
// //       />
// //     </Tab.Navigator>
// //   );
// // };

// const CustomerTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#2F4EAA',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//            fontFamily: 'Inter_500Medium',
//           paddingBottom: 5,
//           height: 60,
//           backgroundColor: '#fff',
//           borderTopWidth: 0,
//           elevation: 10,
//           shadowOpacity: 0.1,
//           shadowRadius: 5,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="HomeStack"
//         component={HomeStack}
//         options={{
//           tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
//           tabBarLabel: 'Home',
//         }}
//       />
//       <Tab.Screen
//         name="BookingsStack"
//         component={BookingsStack}
//         options={{
//           tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
//           tabBarLabel: 'Bookings',
//         }}
//       />
//       <Tab.Screen
//         name="PaymentsStack"
//         component={PaymentsStack}
//         options={{
//           tabBarIcon: ({ color, size }) => <MaterialIcons name="payment" size={size} color={color} />,
//           tabBarLabel: 'Payments',
//         }}
//       />
//       <Tab.Screen
//         name="ProfileStack"
//         component={ProfileStack}
//         options={{
//           tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
//           tabBarLabel: 'Profile',
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default CustomerTabNavigator;

// // Styles
// const styles = StyleSheet.create({
//   guestContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   guestText: {
//     fontSize: 18,
//     color: '#2F4EAA',
//     textAlign: 'center',
//      fontFamily: 'Inter_500Medium',
//   },
// });

//Final code after the refresh HOMETAB

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../Context/AuthContext'; 

// Import all your screens
import CScreen1 from './CScreen1';
import CustomerBookings from './CustomerBookings';
import CustomerPayments from './CustomerPayments';
import CustomerProfile from './CustomerProfile';
import SalonSelectionScreen from './SalonSelectionScreen';
import SalonServices from './SalonServices';
import BookingSummary from './BookingSummary';
import PaymentSummary from './PaymentSummary';
import RescheduleScreen from './RescheduleScreen';
import EditProfileScreen from './EditProfileScreen';
import PaymentScreen from './PaymentsScreen';
import ReviewAppointmentScreen1 from './ReviewAppointmentScreen1';
import ReviewAppointmentScreen2 from './ReviewAppointmentScreen2';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🔹 Guest message components
const GuestBookings = () => (
  <View style={styles.guestContainer}>
    <Text style={styles.guestText}>Please register or login to view your bookings</Text>
  </View>
);

const GuestPayments = () => (
  <View style={styles.guestContainer}>
    <Text style={styles.guestText}>Please register or login to view your payment history</Text>
  </View>
);

const GuestProfile = () => (
  <View style={styles.guestContainer}>
    <Text style={styles.guestText}>Please register or login to access your profile</Text>
  </View>
);

// Home stack with reset functionality
function HomeStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CScreen1" component={CScreen1} />
      <Stack.Screen name="SalonSelectionScreen" component={SalonSelectionScreen} />
      <Stack.Screen name="SalonServices" component={SalonServices} />
      <Stack.Screen name="ReviewAppointment1" component={ReviewAppointmentScreen1} />
      <Stack.Screen name="ReviewAppointment2" component={ReviewAppointmentScreen2} />
    </Stack.Navigator>
  );
}

// Bookings stack
function BookingsStack() {
  const { customer } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {customer?.isGuest || !customer ? (
        <Stack.Screen name="GuestBookings" component={GuestBookings} />
      ) : (
        <>
          <Stack.Screen name="CustomerBookings" component={CustomerBookings} />
          <Stack.Screen name="BookingSummary" component={BookingSummary} />
          <Stack.Screen name="RescheduleScreen" component={RescheduleScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

// Payments stack
function PaymentsStack() {
  const { customer } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {customer?.isGuest || !customer ? (
        <Stack.Screen name="GuestPayments" component={GuestPayments} />
      ) : (
        <>
          <Stack.Screen name="CustomerPayments" component={CustomerPayments} />
          <Stack.Screen name="PaymentSummary" component={PaymentSummary} />
        </>
      )}
    </Stack.Navigator>
  );
}

// Profile stack
function ProfileStack() {
  const { customer } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {customer?.isGuest || !customer ? (
        <Stack.Screen name="GuestProfile" component={GuestProfile} />
      ) : (
        <>
          <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const CustomerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2F4EAA',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          fontFamily: 'Inter_500Medium',
          paddingBottom: 5,
          height: 110,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          tabBarLabel: 'Home',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Reset the HomeStack to CScreen1 when Home tab is pressed
            navigation.navigate('HomeStack', {
              screen: 'CScreen1',
            });
          },
        })}
      />
      <Tab.Screen
        name="BookingsStack"
        component={BookingsStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
          tabBarLabel: 'Bookings',
        }}
      />
      <Tab.Screen
        name="PaymentsStack"
        component={PaymentsStack}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="payment" size={size} color={color} />,
          tabBarLabel: 'Payments',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerTabNavigator;

// Styles
const styles = StyleSheet.create({
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  guestText: {
    fontSize: 18,
    color: '#2F4EAA',
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
  },
});