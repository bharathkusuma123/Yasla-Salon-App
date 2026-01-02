// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
// import axios from 'axios';
// import styles from './SalonSelection.styles'; // reuse same style file
// import { useNavigation } from '@react-navigation/native';

// const ReviewAppointmentScreen = ({ route }) => {
//   const { payload, selectedSalon, selectedStylist, selectedServices, selectedTimeSlot, selectedDate } = route.params;
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   const handleFinalConfirm = () => {
//     setLoading(true);

//     axios.post('https://yaslaservice.com:81/appointments/', payload)
//       .then(() => {
//         setLoading(false);
//         Alert.alert("Success", "Appointment booked successfully!", [
//           {
//             text: "OK",
//             onPress: () => navigation.navigate('BookingsStack')
//           }
//         ]);
//       })
//       .catch(error => {
//         setLoading(false);
//         console.error("Appointment post error:", error);
//         Alert.alert("Error", "Failed to book appointment. Please try again.");
//       });
//   };

//   return (
//     <ScrollView style={{ flex: 1, padding: 16 }}>
//       <Text style={styles.sectionTitle}>Review Your Appointment</Text>

//       <View style={styles.salonCard}>
//         <Image source={{ uri: selectedSalon?.image }} style={styles.salonImage} />
//         <View style={styles.salonInfo}>
//           <Text style={styles.salonName}>{selectedSalon?.salon_name}</Text>
//           <Text style={styles.salonAddress}>{selectedSalon?.locality}, {selectedSalon?.city}</Text>
//         </View>
//       </View>

//       <View style={styles.stylistCard}>
//         <Image source={{ uri: selectedStylist?.profile_pic }} style={styles.stylistImage} />
//         <Text style={styles.stylistName}>{selectedStylist?.full_name}</Text>
//       </View>

//       <Text style={styles.sectionTitle}>Services</Text>
//       {selectedServices.map(service => (
//         <Text key={service.id} style={styles.serviceName}>• {service.name}</Text>
//       ))}

//       <Text style={styles.sectionTitle}>Date & Time</Text>
//       <Text>{new Date(selectedDate).toLocaleDateString()} at {selectedTimeSlot}</Text>

//       <TouchableOpacity style={styles.confirmButton} onPress={handleFinalConfirm} disabled={loading}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.confirmButtonText}>Final Confirm</Text>
//         )}
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default ReviewAppointmentScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ReviewAppointmentScreen = ({ route }) => {
  const {
    payload,
    selectedSalon,
    selectedStylist,
    selectedServices,
    selectedTimeSlot,
    selectedDate,
  } = route.params;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  console.log("Selected Services:", selectedServices);


  const handleFinalConfirm = () => {
    setLoading(true);

    axios
      .post('https://yaslaservice.com:81/appointments/', payload)
      .then(() => {
        setLoading(false);
        Alert.alert('Success', 'Appointment booked successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BookingsStack'),
          },
        ]);
      })
      .catch(error => {
        setLoading(false);
        console.error('Appointment post error:', error);
        Alert.alert('Error', 'Failed to book appointment. Please try again.');
      });
  };


  
  // const handleFinalConfirm = async () => {
  //   try {
  //     setLoading(true);
  
  //     // 1️⃣ Book the appointment
  //     await axios.post('https://yaslaservice.com:81/appointments/', payload);
  
  //     // 2️⃣ Fetch customer info
  //     const customerRes = await axios.get(`https://yaslaservice.com:81/customers/${payload.customerId}/`);
  //     const customer = customerRes.data.data; // e.g., { full_name, email, ... }
  
  //     // 3️⃣ Fetch stylist info
  //     const stylistRes = await axios.get(`https://yaslaservice.com:81/users/${payload.stylistId}/`);
  //     const stylist = stylistRes.data.data; // e.g., { full_name, fcm_token, ... }
  
  //     // 4️⃣ Prepare notification payload
  //     const notificationPayload = {
  //       fcmToken: stylist.fcm_token, // stylist FCM token
  //       title: 'New Appointment Booked!',
  //       body: `${customer.full_name} booked ${selectedServices.map(s => s.name).join(", ")} with you.`,
  //       target: 'BookingsStack',
  //       data: {
  //         customerName: customer.full_name,
  //         stylistName: stylist.full_name,
  //         services: selectedServices.map(s => s.name),
  //       },
  //     };
  
  //     // 5️⃣ Send notification
  //     await axios.post('https://yasla-pushnotification.vercel.app/send-notification', notificationPayload);
  
  //     setLoading(false);
  //     Alert.alert('Success', 'Appointment booked successfully!', [
  //       { text: 'OK', onPress: () => navigation.navigate('BookingsStack') },
  //     ]);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Booking or notification error:', error);
  //     Alert.alert('Error', 'Failed to book appointment or send notification. Please try again.');
  //   }
  // };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Appointment</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Salon Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedSalon?.salon_name}</Text>
          <Text style={styles.subText}>
            {selectedSalon?.locality}, {selectedSalon?.city}
          </Text>
        </View>

        {/* Stylist Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hairstylist</Text>
          <View style={[styles.row, { marginTop: 10 }]}>
            {selectedStylist?.profile_pic ? (
              <Image
                source={{ uri: selectedStylist?.profile_pic }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.stylistName}>
                {selectedStylist?.full_name}
              </Text>
              <Text style={styles.rating}>
                ⭐ {selectedStylist?.rating || '4.7'} (
                {selectedStylist?.reviews || '239'})
              </Text>
            </View>
          </View>
        </View>

        {/* Date/Time Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Date</Text>
          <Text style={styles.bigDate}>
            {moment(selectedDate).format('MMMM D, YYYY')}
          </Text>
          <Text style={styles.timeText}>{selectedTimeSlot}</Text>
        </View>

        {/* Services Card */}
        {/* <View style={styles.card}>
          <Text style={styles.cardTitle}>Services</Text>
          {selectedServices.map(service => (
            <View style={styles.serviceRow} key={service.id}>
              <Text style={styles.serviceText}>{service.name}</Text>
              <Text style={styles.priceText}>₹{service.price}</Text>
            </View>
          ))}
        </View> */}


        <View style={styles.card}>
          <Text style={styles.cardTitle}>Services</Text>
          {selectedServices.map(service => (
            <View style={styles.serviceRow} key={service.id}>
              <Text style={styles.serviceText}>
                {service.name} ({service.time} mins)
              </Text>
              <Text style={styles.priceText}>₹{service.price}</Text>
            </View>
          ))}
        </View>
        {/* Total Amount Card */}
        {/* <View style={[styles.card, styles.totalCard]}>
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalAmount}>
            ₹
            {selectedServices
              .reduce((sum, s) => sum + Number(s.price || 0), 0)
              .toLocaleString()}
          </Text>
        </View> */}

        <View style={[styles.card, styles.totalCard]}>
  <View>
    <Text style={styles.totalText}>Total Amount</Text>
    <Text style={styles.subText}>
      Total Time: {selectedServices.reduce((sum, s) => sum + Number(s.time || 0), 0)} mins
    </Text>
  </View>
  <Text style={styles.totalAmount}>
    ₹
    {selectedServices
      .reduce((sum, s) => sum + Number(s.price || 0), 0)
      .toLocaleString()}
  </Text>
</View>

      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleFinalConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewAppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafbff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    // fontWeight: 'bold',
      fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  subText: {
    fontSize: 13,
    color: 'gray',
     fontFamily: 'Inter_400Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  stylistName: {
    // fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
  },
  rating: {
    fontSize: 13,
    color: 'gray',
    marginTop: 2,
     fontFamily: 'Inter_400Regular',
  },
  bigDate: {
    fontSize: 18,
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold',
    color: '#222',
    marginTop: 5,
  },
  timeText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
      fontFamily: 'Inter_400Regular',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  serviceText: {
    fontSize: 14,
    color: '#444',
     fontFamily: 'Inter_400Regular', 
  },
  priceText: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
    color: '#222',
  },
  totalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    // fontWeight: 'bold',
     fontFamily: 'Inter_600Bold',
    color: '#2F4EAA',
  },
  buttonRow: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  confirmButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#2F4EAA',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
    color: '#222',
  },
});

