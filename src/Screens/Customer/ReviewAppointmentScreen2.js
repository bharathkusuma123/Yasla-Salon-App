import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const BookingConfirmation = ({ route, navigation }) => {
  const {
    salonId,
    salonName,
    city,
    customerId,
    selectedServices,
    selectedDate,
    selectedStylist,
    selectedTime,
    totalDuration,
    totalPrice
  } = route.params;

  const [loading, setLoading] = useState(false);

  const convertToISOString = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const date = new Date(selectedDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
  };

  const handleBookAppointment = async () => {
    setLoading(true);

    try {
      const startDateTimeISO = convertToISOString(selectedTime);

      const appointmentServices = selectedServices.map(service => ({ 
        service: service.service 
      }));

      const payload = {
        salon: salonId,
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

      const response = await axios.post(
        "https://yaslaservice.com:81/appointments/",
        payload
      );

      setLoading(false);
      
      Alert.alert(
        "Booking Successful",
        `Your appointment has been booked!`,
        [{ 
          text: "OK", 
          onPress: () => navigation.navigate("BookingsStack") 
        }]
      );
    } catch (error) {
      setLoading(false);
      console.error("Appointment post error:", error);

      if (error.response) {
        Alert.alert(
          "Error",
          `Failed to book appointment.\nServer responded with: ${JSON.stringify(error.response.data)}`
        );
      } else if (error.request) {
        Alert.alert("Error", "No response from server. Check your network.");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };



  //   const handleBookAppointment = async () => {
  //   setLoading(true);
  
  //   try {
  //     const startDateTimeISO = convertToISOString(selectedTime);
  
  //     const appointmentServices = selectedServices.map(service => ({ 
  //       service: service.service 
  //     }));
  
  //     const payload = {
  //       salon: salonId,
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
  
  //     // 1️⃣ Book the appointment
  //     const response = await axios.post(
  //       "https://yaslaservice.com:81/appointments/",
  //       payload
  //     );
  
  //     // 2️⃣ Fetch customer info
  //     const customerRes = await axios.get(`https://yaslaservice.com:81/customers/${customerId}/`);
  //     const customer = customerRes.data.data;
  
  //     // 3️⃣ Fetch stylist info
  //     const stylistRes = await axios.get(`https://yaslaservice.com:81/users/${selectedStylist.id}/`);
  //     const stylist = stylistRes.data.data;
  
  //     // 4️⃣ Prepare notification payload
  //     const notificationPayload = {
  //       fcmToken: stylist.fcm_token, // stylist FCM token
  //       title: 'New Appointment Booked!',
  //       body: `${customer.full_name} booked ${selectedServices.map(s => s.service).join(", ")} with you.`,
  //       target: 'BookingsStack',
  //       data: {
  //         customerName: customer.full_name,
  //         stylistName: stylist.full_name,
  //         services: selectedServices.map(s => s.service),
  //       },
  //     };
  
  //     // 5️⃣ Send notification
  //     await axios.post('https://yasla-pushnotification.vercel.app/send-notification', notificationPayload);
  
  //     setLoading(false);
  
  //     Alert.alert(
  //       "Booking Successful",
  //       `Your appointment has been booked!`,
  //       [{ text: "OK", onPress: () => navigation.navigate("BookingsStack") }]
  //     );
  
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Appointment post or notification error:", error);
  
  //     if (error.response) {
  //       Alert.alert(
  //         "Error",
  //         `Failed to book appointment.\nServer responded with: ${JSON.stringify(error.response.data)}`
  //       );
  //     } else if (error.request) {
  //       Alert.alert("Error", "No response from server. Check your network.");
  //     } else {
  //       Alert.alert("Error", "An unexpected error occurred.");
  //     }
  //   }
  // };
  const formatTime = (time) => {
    return time.replace(/\s([AP]M)$/, '$1');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Booking Confirmation</Text>
          <Text style={styles.headerSubtitle}>Review your appointment details</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salon Details</Text>
          <View style={styles.detailCard}>
            <Text style={styles.salonName}>{salonName}</Text>
            <Text style={styles.salonLocation}>{city}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Services</Text>
          <View style={styles.detailCard}>
            {selectedServices.map(service => (
              <View key={service.id} style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDetails}>
                    {service.duration} • {service.price}
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Total: ~{totalDuration} mins • ₹{totalPrice}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <FontAwesome name="calendar" size={16} color="#2F4EAA" />
              <Text style={styles.detailText}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <FontAwesome name="clock-o" size={16} color="#2F4EAA" />
              <Text style={styles.detailText}>{formatTime(selectedTime)}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <FontAwesome name="user" size={16} color="#2F4EAA" />
              <Text style={styles.detailText}>{selectedStylist.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back to Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleBookAppointment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafbff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    // fontWeight: 'bold',
     fontFamily: 'Inter_600SemiBold', 
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
     fontFamily: 'Inter_400Regular', 
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
     fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
    color: '#333',
  },
  detailCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  salonName: {
    fontSize: 18,
    // fontWeight: 'bold',
     fontFamily: 'Inter_600SemiBold', 
    color: '#333',
    marginBottom: 4,
  },
  salonLocation: {
    fontSize: 14,
    color: '#666',
     fontFamily: 'Inter_400Regular', 
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    // fontWeight: '500',
     fontFamily: 'Inter_500Medium', 
    color: '#333',
    marginBottom: 4,
  },
  serviceDetails: {
    fontSize: 14,
    color: '#666',
     fontFamily: 'Inter_400Regular',
  },
  totalContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 16,
    // fontWeight: 'bold',
      fontFamily: 'Inter_600SemiBold', 
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
      fontFamily: 'Inter_400Regular',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  backButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    // fontWeight: 'bold',
      fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  confirmButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2F4EAA',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    // fontWeight: 'bold',
       fontFamily: 'Inter_600SemiBold', 
    color: '#fff',
  },
});

export default BookingConfirmation;