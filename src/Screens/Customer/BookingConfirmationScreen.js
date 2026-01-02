// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const BookingConfirmationScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   // Get data from navigation params
//   const { salon, services, date, time, quantity } = route.params;

//   // Format the date
//   const formattedDate = date.toLocaleDateString('en-US', { 
//     month: 'long', 
//     day: 'numeric', 
//     year: 'numeric' 
//   });

//   // Generate a random PIN
//   const generatePin = () => {
//     return Array.from({length: 4}, () => Math.floor(Math.random() * 10).toString());
//   };

//   const bookingDetails = {
//     salonName: salon?.name || 'NEW STYLE CHECK MEN\'S SALOON',
//     distance: salon?.distance || '1.0 KM from you',
//     address: salon?.address || 'Kanakapura Main Road 1st Phase, J P Nagar',
//     pin: generatePin(),
//     services: services || [
//       { name: 'global colour (inoa)', price: 170 }
//     ],
//     dateTime: `${formattedDate}, ${time}`,
//     stylist: {
//       name: 'Nani DHINESH',
//       rating: 4.7,
//       reviews: 239,
//       distance: '1.2 KM from you',
//       address: salon?.address || 'Kanakapura Main Road 1st Phase, J P Nagar',
//       timeSlots: ['10 min', '96 min', '36 min', '36 min']
//     }
//   };

//   const handleReschedule = () => {
//     navigation.navigate('Screen1');
//   };

//   const handleCancel = () => {
//     // Handle cancellation logic
//     navigation.navigate('Screen1');
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
//       {/* Salon Info */}
//       <View style={styles.salonInfoContainer}>
//         <Text style={styles.salonName}>{bookingDetails.salonName}</Text>
//         <Text style={styles.salonDistance}>{bookingDetails.distance}</Text>
//         <Text style={styles.salonAddress}>{bookingDetails.address}</Text>
//       </View>

//       {/* PIN Section */}
//       <View style={styles.pinContainer}>
//         <Text style={styles.pinTitle}>Start your appointment with PIN</Text>
//         <View style={styles.pinDigits}>
//           {bookingDetails.pin.map((digit, index) => (
//             <View key={index} style={styles.pinDigit}>
//               <Text style={styles.pinDigitText}>{digit}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Booking Status */}
//       <View style={styles.bookingStatusContainer}>
//         <Text style={styles.bookingConfirmed}>BOOKING CONFIRMED</Text>
//         <View style={styles.bookingActions}>
//           <TouchableOpacity 
//             style={styles.actionButton}
//             onPress={handleReschedule}
//           >
//             <Text style={styles.actionButtonText}>Reschedule</Text>
//           </TouchableOpacity>
//           <Text style={styles.actionSeparator}>|</Text>
//           <TouchableOpacity 
//             style={styles.actionButton}
//             onPress={handleCancel}
//           >
//             <Text style={styles.actionButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Services and Total */}
//       <View style={styles.servicesContainer}>
//         <View style={styles.servicesHeader}>
//           <Text style={styles.servicesTitle}>Services</Text>
//           <Text style={styles.servicesTitle}>Total amount</Text>
//         </View>
//         {bookingDetails.services.map((service, index) => (
//           <View key={index} style={styles.serviceItem}>
//             <Text style={styles.serviceName}>{service.name}</Text>
//             <Text style={styles.servicePrice}>{service.price}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Date and Time */}
//       <View style={styles.timeSlotContainer}>
//         <Text style={styles.timeSlotText}>{bookingDetails.dateTime}</Text>
//       </View>

//       {/* Stylist Info */}
//       <View style={styles.stylistContainer}>
//         <Text style={styles.stylistTitle}>Hairstyler</Text>
//         <Text style={styles.stylistName}>{bookingDetails.stylist.name}</Text>
//         <Text style={styles.stylistRating}>★ {bookingDetails.stylist.rating} ({bookingDetails.stylist.reviews})</Text>
//         <Text style={styles.stylistDistance}>{bookingDetails.stylist.distance}</Text>
//         <Text style={styles.stylistAddress}>{bookingDetails.stylist.address}</Text>
        
//         {/* Time Slots */}
//         <View style={styles.timeSlotsContainer}>
//           {bookingDetails.stylist.timeSlots.map((slot, index) => (
//             <View key={index} style={styles.timeSlot}>
//               <Text style={styles.timeSlotText}>{slot}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Directions Button */}
//       <TouchableOpacity style={styles.directionsButton}>
//         <Text style={styles.directionsButtonText}>DIRECTIONS</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   salonInfoContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   salonName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   salonDistance: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 5,
//   },
//   salonAddress: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   pinContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   pinTitle: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//   },
//   pinDigits: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   pinDigit: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#FF6B6B',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   pinDigitText: {
//     fontSize: 24,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   bookingStatusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   bookingConfirmed: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   bookingActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionButton: {
//     paddingHorizontal: 10,
//   },
//   actionButtonText: {
//     fontSize: 14,
//     color: '#FF6B6B',
//   },
//   actionSeparator: {
//     marginHorizontal: 5,
//     color: '#999',
//   },
//   servicesContainer: {
//     marginBottom: 20,
//   },
//   servicesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     paddingBottom: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },
//   servicesTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   serviceItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   serviceName: {
//     fontSize: 16,
//     color: '#333',
//   },
//   servicePrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   timeSlotContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//   },
//   timeSlotText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   stylistContainer: {
//     marginBottom: 20,
//   },
//   stylistTitle: {
//     fontSize: 16,
//     color: '#999',
//     marginBottom: 5,
//   },
//   stylistName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   stylistRating: {
//     fontSize: 14,
//     color: '#FF9529',
//     marginBottom: 5,
//   },
//   stylistDistance: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 2,
//   },
//   stylistAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 15,
//   },
//   timeSlotsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   timeSlot: {
//     backgroundColor: '#E0E0E0',
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   directionsButton: {
//     backgroundColor: '#FF6B6B',
//     borderRadius: 25,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   directionsButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default BookingConfirmationScreen;









//=======================================================================================



// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const BookingConfirmationScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { salon, services, date, time, quantity } = route.params || {};

//   const bookingDate = date ? new Date(date) : new Date();
//   const formattedDate = bookingDate.toLocaleDateString('en-US', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric'
//   });

//   const generatePin = () => {
//     return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10).toString());
//   };

//   const bookingDetails = {
//     salonName: salon?.name || "NEW STYLE CHECK MEN'S SALOON",
//     distance: salon?.distance || '1.0 KM from you',
//     address: salon?.address || 'Kanakapura Main Road 1st Phase, J P Nagar',
//     pin: generatePin(),
//     services: services || [{ name: 'global colour (inoa)', price: 170 }],
//     dateTime: `${formattedDate}, ${time || '09:00 AM'}`,
//     stylist: {
//       name: 'Nani DHINESH',
//       rating: 4.7,
//       reviews: 239,
//       distance: '1.2 KM from you',
//       address: salon?.address || 'Kanakapura Main Road 1st Phase, J P Nagar',
//       timeSlots: ['10 min', '96 min', '36 min', '36 min']
//     }
//   };

//   const handleReschedule = () => navigation.navigate('Screen1');
//   const handleCancel = () => navigation.navigate('Screen1');

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
//       <View style={styles.salonInfoContainer}>
//         <Text style={styles.salonName}>{bookingDetails.salonName}</Text>
//         <Text style={styles.salonDistance}>{bookingDetails.distance}</Text>
//         <Text style={styles.salonAddress}>{bookingDetails.address}</Text>
//       </View>

//       <View style={styles.pinContainer}>
//         <Text style={styles.pinTitle}>Start your appointment with PIN</Text>
//         <View style={styles.pinDigits}>
//           {bookingDetails.pin.map((digit, index) => (
//             <View key={index} style={styles.pinDigit}>
//               <Text style={styles.pinDigitText}>{digit}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.bookingStatusContainer}>
//         <Text style={styles.bookingConfirmed}>BOOKING CONFIRMED</Text>
//         <View style={styles.bookingActions}>
//           <TouchableOpacity style={styles.actionButton} onPress={handleReschedule}>
//             <Text style={styles.actionButtonText}>Reschedule</Text>
//           </TouchableOpacity>
//           <Text style={styles.actionSeparator}>|</Text>
//           <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
//             <Text style={styles.actionButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.servicesContainer}>
//         <View style={styles.servicesHeader}>
//           <Text style={styles.servicesTitle}>Services</Text>
//           <Text style={styles.servicesTitle}>Total amount</Text>
//         </View>
//         {bookingDetails.services.map((service, index) => (
//           <View key={index} style={styles.serviceItem}>
//             <Text style={styles.serviceName}>{service.name}</Text>
//             <Text style={styles.servicePrice}>{service.price}</Text>
//           </View>
//         ))}
//       </View>

//       <View style={styles.timeSlotContainer}>
//         <Text style={styles.timeSlotText}>{bookingDetails.dateTime}</Text>
//       </View>

//       <View style={styles.stylistContainer}>
//         <Text style={styles.stylistTitle}>Hairstyler</Text>
//         <Text style={styles.stylistName}>{bookingDetails.stylist.name}</Text>
//         <Text style={styles.stylistRating}>★ {bookingDetails.stylist.rating} ({bookingDetails.stylist.reviews})</Text>
//         <Text style={styles.stylistDistance}>{bookingDetails.stylist.distance}</Text>
//         <Text style={styles.stylistAddress}>{bookingDetails.stylist.address}</Text>

//         <View style={styles.timeSlotsContainer}>
//           {bookingDetails.stylist.timeSlots.map((slot, index) => (
//             <View key={index} style={styles.timeSlot}>
//               <Text style={styles.timeSlotText}>{slot}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <TouchableOpacity style={styles.directionsButton}>
//         <Text style={styles.directionsButtonText}>DIRECTIONS</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   salonInfoContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   salonName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   salonDistance: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 5,
//   },
//   salonAddress: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
//   pinContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   pinTitle: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//   },
//   pinDigits: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   pinDigit: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#FF6B6B',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   pinDigitText: {
//     fontSize: 24,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   bookingStatusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   bookingConfirmed: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   bookingActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionButton: {
//     paddingHorizontal: 10,
//   },
//   actionButtonText: {
//     fontSize: 14,
//     color: '#FF6B6B',
//   },
//   actionSeparator: {
//     marginHorizontal: 5,
//     color: '#999',
//   },
//   servicesContainer: {
//     marginBottom: 20,
//   },
//   servicesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     paddingBottom: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },
//   servicesTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   serviceItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   serviceName: {
//     fontSize: 16,
//     color: '#333',
//   },
//   servicePrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   timeSlotContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//   },
//   timeSlotText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   stylistContainer: {
//     marginBottom: 20,
//   },
//   stylistTitle: {
//     fontSize: 16,
//     color: '#999',
//     marginBottom: 5,
//   },
//   stylistName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   stylistRating: {
//     fontSize: 14,
//     color: '#FF9529',
//     marginBottom: 5,
//   },
//   stylistDistance: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 2,
//   },
//   stylistAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 15,
//   },
//   timeSlotsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   timeSlot: {
//     backgroundColor: '#E0E0E0',
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   directionsButton: {
//     backgroundColor: '#FF6B6B',
//     borderRadius: 25,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   directionsButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default BookingConfirmationScreen;










import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { salon, services, date, time, quantity } = route.params || {};

  const bookingDate = date ? new Date(date) : new Date();
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const bookingDetails = {
    salonName: salon?.name || "NEW STYLE CHECK MEN'S SALOON",
    distance: salon?.distance || '1.0 KM from you',
    address: salon?.address || 'Kanakapura Main Road 1st Phase, J P Nagar',
    services: services || [{ name: 'global colour (inoa)', price: 170 }],
    dateTime: `${formattedDate}, ${time || '09:00 AM'}`,
    stylist: {
      name: 'Nani DHINESH',
      rating: 4.7,
      reviews: 239,
      distance: '1.2 KM from you',
      address: salon?.address || 'Kanakapura Main Road 1st Phase, J P Nagar',
      timeSlots: ['10 min', '96 min', '36 min', '36 min']
    }
  };

  const handleReschedule = () => navigation.navigate('CScreen1');
  const handleCancel = () => navigation.navigate('CScreen1');

  const handlePayment = () => {
    Alert.alert(
      'Payment Successful',
      'Your payment has been processed successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('BookingsStack')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.salonInfoContainer}>
        <Text style={styles.salonName}>{bookingDetails.salonName}</Text>
        <Text style={styles.salonDistance}>{bookingDetails.distance}</Text>
        <Text style={styles.salonAddress}>{bookingDetails.address}</Text>
      </View>


      <View style={styles.bookingStatusContainer}>
        <Text style={styles.bookingConfirmed}>BOOKING CONFIRMED</Text>
        <View style={styles.bookingActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleReschedule}>
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <Text style={styles.actionSeparator}>|</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
            <Text style={styles.actionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <View style={styles.servicesHeader}>
          <Text style={styles.servicesTitle}>Services</Text>
          <Text style={styles.servicesTitle}>Total amount</Text>
        </View>
        {bookingDetails.services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.timeSlotContainer}>
        <Text style={styles.timeSlotText}>{bookingDetails.dateTime}</Text>
      </View>
       <TouchableOpacity style={styles.directionsButton} onPress={handlePayment}>
        <Text style={styles.directionsButtonText}>PAYMENT</Text>
      </TouchableOpacity>

      <View style={styles.stylistContainer}>
        <Text style={styles.stylistTitle}>Hairstyler</Text>
        <Text style={styles.stylistName}>{bookingDetails.stylist.name}</Text>
        <Text style={styles.stylistRating}>★ {bookingDetails.stylist.rating} ({bookingDetails.stylist.reviews})</Text>
        <Text style={styles.stylistDistance}>{bookingDetails.stylist.distance}</Text>
        <Text style={styles.stylistAddress}>{bookingDetails.stylist.address}</Text>

        <View style={styles.timeSlotsContainer}>
          {bookingDetails.stylist.timeSlots.map((slot, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={styles.timeSlotText}>{slot}</Text>
            </View>
          ))}
        </View>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  salonInfoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  salonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  salonDistance: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  salonAddress: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bookingStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  bookingConfirmed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bookingActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingHorizontal: 10,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  actionSeparator: {
    marginHorizontal: 5,
    color: '#999',
  },
  servicesContainer: {
    marginBottom: 20,
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  serviceName: {
    fontSize: 16,
    color: '#333',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeSlotContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  timeSlotText: {
    fontSize: 16,
    color: '#333',
  },
  stylistContainer: {
    marginBottom: 20,
  },
  stylistTitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 5,
  },
  stylistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  stylistRating: {
    fontSize: 14,
    color: '#FF9529',
    marginBottom: 5,
  },
  stylistDistance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  stylistAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  directionsButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  directionsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingConfirmationScreen;