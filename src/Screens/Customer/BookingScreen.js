// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import styles from './CScreen4.styles';

// const BookingScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   // Get data passed from previous screen
//   const { salon, services, date, time } = route.params || {};

//   const bookingDetails = {
//     salonName: salon?.name || 'ELITE SALON',
//     distance: salon?.distance || '0.5 km away',
//     address: salon?.address || '123 Beauty St, Downtown, City - 560001',
//     services: services || [
//       { id: 1, name: 'Hair Cut & Beard Trim', price: 250 },
//       { id: 2, name: 'Hair Spa Treatment', price: 400 }
//     ],
//     dateTime: time
//       ? `${date.toLocaleDateString( { month: 'long', day: 'numeric', year: 'numeric' })}, ${time}`
//       : 'February 11th 2025, 09:00 AM',
//     stylist: {
//       name: 'Rajesh Kumar',
//       rating: 4.7,
//       image: require('../Customer/Images/style1.jpg')
//     },
//     bookingFee: 5
//   };

//   const totalAmount = bookingDetails.services.reduce((sum, service) => sum + service.price, 0);
//   const amountToPayNow = bookingDetails.bookingFee;
//   const amountToPayAtShop = totalAmount - amountToPayNow;

//   const handlePayNow = () => {
//      navigation.navigate('CScreen5', {
//       salon: route.params.salon,
//       services: route.params.services,
//       date: route.params.date,
//       time: route.params.time,
//       quantity: route.params.quantity
//     });
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
//       {/* Salon Info */}
//       <View style={styles.salonInfoContainer}>
//         <Text style={styles.salonName}>{bookingDetails.salonName}</Text>
//         <Text style={styles.salonDistance}>{bookingDetails.distance}</Text>
//         <Text style={styles.salonAddress}>{bookingDetails.address}</Text>
//       </View>

//       {/* Services and Total Amount Card */}
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardTitle}>Services</Text>
//           <Text style={styles.cardTitle}>Total Amount</Text>
//         </View>

//         <View style={styles.cardContent}>
//           <View style={styles.servicesList}>
//             {bookingDetails.services.map(service => (
//               <View key={service.id} style={styles.serviceItem}>
//                 <Text style={styles.serviceName}>{service.name}</Text>
//                 <Text style={styles.servicePrice}>{service.price.toLocaleString('en-IN')}</Text>
//               </View>
//             ))}
//             <View style={styles.editContainer}>
//               <Icon name="edit" size={20} color="#FF6B6B" />
//               <TouchableOpacity style={styles.addButton}>
//                 <Text style={styles.addButtonText}>Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.amountDetails}>
//             <Text style={styles.amountText}>{totalAmount}</Text>
//             <Text style={styles.paymentNote}>Booking cost ₹{amountToPayNow.toLocaleString('en-IN')} pay now</Text>
//             <Text style={styles.paymentNote}>Remaining ₹{amountToPayAtShop.toLocaleString('en-IN')} pay at shop</Text>
//           </View>
//         </View>
//       </View>

//       {/* Time Slot Card */}
//       <View style={styles.card}>
//         <View style={styles.timeSlotHeader}>
//           <Text style={styles.cardTitle}>Time Slot</Text>
//           <Icon name="edit" size={20} color="#FF6B6B" />
//         </View>
//         <Text style={styles.timeSlotText}>{bookingDetails.dateTime}</Text>
//       </View>

//       {/* Stylist Card */}
//       <View style={styles.card}>
//         <View style={styles.stylistHeader}>
//           <Text style={styles.cardTitle}>Your Stylist</Text>
//           <TouchableOpacity>
//             <Text style={styles.changeText}>Change</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.stylistInfo}>
//           <Image source={bookingDetails.stylist.image} style={styles.stylistImage} />
//           <View style={styles.stylistDetails}>
//             <Text style={styles.stylistName}>{bookingDetails.stylist.name}</Text>
//             <View style={styles.ratingContainer}>
//               <Icon name="star" size={16} color="#FFD700" />
//               <Text style={styles.ratingText}>{bookingDetails.stylist.rating}</Text>
//             </View>
//           </View>

//           <View style={styles.stylistActions}>
//             <TouchableOpacity style={styles.actionButton}>
//               <Icon name="call" size={24} color="#4CAF50" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton}>
//               <Icon name="message" size={24} color="#2196F3" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Payment Methods */}
//       <View style={styles.card}>
//         <Text style={[styles.cardTitle, { textAlign: 'center', marginBottom: 15 }]}>Select Payment Method</Text>

//         <Text style={styles.sectionTitle}>UPI</Text>

//         <View style={styles.paymentOption}>
//           <Icon name="radio-button-unchecked" size={24} color="#FF6B6B" />
//           <Image
//             source={require('../Customer/Images/gpay.webp')}
//             style={styles.paymentIcon}
//           />
//           <Text style={styles.paymentMethodText}>Google Pay UPI</Text>
//         </View>

//         <View style={styles.paymentOption}>
//           <Icon name="radio-button-unchecked" size={24} color="#FF6B6B" />
//           <Image
//             source={require('../Customer/Images/phonepe.png')}
//             style={styles.paymentIcon}
//           />
//           <Text style={styles.paymentMethodText}>PhonePe UPI</Text>
//         </View>
//       </View>

//       {/* Pay Button */}
//       <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
//         <Text style={styles.payButtonText}>Pay ₹{amountToPayNow.toLocaleString('en-IN')}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default BookingScreen;















import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './CScreen4.styles';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get data passed from previous screen
  const { salon, services, date, time, quantity } = route.params || {};
  const bookingDate = date ? new Date(date) : new Date('2025-02-11T09:00:00');
   const bookingDetails = {
    salonName: salon?.name || 'ELITE SALON',
    distance: salon?.distance || '0.5 km away',
    address: salon?.address || '123 Beauty St, Downtown, City - 560001',
    services: services || [
      { id: 1, name: 'Hair Cut & Beard Trim', price: 250 },
      { id: 2, name: 'Hair Spa Treatment', price: 400 }
    ],
    dateTime: `${bookingDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}, ${time || '09:00 AM'}`,
    stylist: {
      name: 'Rajesh Kumar',
      rating: 4.7,
      image: require('../Customer/Images/style1.jpg')
    },
    bookingFee: 5
  };

  const totalAmount = bookingDetails.services.reduce((sum, service) => sum + service.price, 0);
  const amountToPayNow = bookingDetails.bookingFee;
  const amountToPayAtShop = totalAmount - amountToPayNow;

  const handlePayNow = () => {
     navigation.navigate('CScreen5', {
        salon,
      services,
      date: bookingDate.toISOString(),
      time,
      quantity
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Salon Info */}
      <View style={styles.salonInfoContainer}>
        <Text style={styles.salonName}>{bookingDetails.salonName}</Text>
        <Text style={styles.salonDistance}>{bookingDetails.distance}</Text>
        <Text style={styles.salonAddress}>{bookingDetails.address}</Text>
      </View>

      {/* Services and Total Amount Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Services</Text>
          <Text style={styles.cardTitle}>Total Amount</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.servicesList}>
            {bookingDetails.services.map(service => (
              <View key={service.id} style={styles.serviceItem}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price.toLocaleString('en-IN')}</Text>
              </View>
            ))}
            <View style={styles.editContainer}>
              <Icon name="edit" size={20} color="#FF6B6B" />
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.amountDetails}>
            <Text style={styles.amountText}>{totalAmount}</Text>
            <Text style={styles.paymentNote}>Booking cost ₹{amountToPayNow.toLocaleString('en-IN')} pay now</Text>
            <Text style={styles.paymentNote}>Remaining ₹{amountToPayAtShop.toLocaleString('en-IN')} pay at shop</Text>
          </View>
        </View>
      </View>

      {/* Time Slot Card */}
      <View style={styles.card}>
        <View style={styles.timeSlotHeader}>
          <Text style={styles.cardTitle}>Time Slot</Text>
          <Icon name="edit" size={20} color="#FF6B6B" />
        </View>
        <Text style={styles.timeSlotText}>{bookingDetails.dateTime}</Text>
      </View>

      {/* Stylist Card */}
      <View style={styles.card}>
        <View style={styles.stylistHeader}>
          <Text style={styles.cardTitle}>Your Stylist</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stylistInfo}>
          <Image source={bookingDetails.stylist.image} style={styles.stylistImage} />
          <View style={styles.stylistDetails}>
            <Text style={styles.stylistName}>{bookingDetails.stylist.name}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{bookingDetails.stylist.rating}</Text>
            </View>
          </View>

          <View style={styles.stylistActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="call" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="message" size={24} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { textAlign: 'center', marginBottom: 15 }]}>Select Payment Method</Text>

        <Text style={styles.sectionTitle}>UPI</Text>

        <View style={styles.paymentOption}>
          <Icon name="radio-button-unchecked" size={24} color="#FF6B6B" />
          <Image
            source={require('../Customer/Images/gpay.webp')}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentMethodText}>Google Pay UPI</Text>
        </View>

        <View style={styles.paymentOption}>
          <Icon name="radio-button-unchecked" size={24} color="#FF6B6B" />
          <Image
            source={require('../Customer/Images/phonepe.png')}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentMethodText}>PhonePe UPI</Text>
        </View>
      </View>

      {/* Pay Button */}
            <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>Pay ₹{amountToPayNow.toLocaleString('en-IN')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookingScreen;
