import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';


const BookingSummary = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const { booking } = route.params;
  console.log('Booking Details:', JSON.stringify(booking, null, 2));

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getServiceIcon = (service) => {
    if (service.includes('Hair')) return 'content-cut';
    if (service.includes('Massage')) return 'spa';
    if (service.includes('Face')) return 'face';
    return 'calendar-today';
  };

  const handlePayment = () => {
    Alert.alert(
      'Complete Payment',
      `Pay ₹${booking.bill_amount.toLocaleString()} for ${booking.service}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { 
          text: 'Pay Now', 
          onPress: () => Alert.alert('Success', 'Payment completed successfully') 
        },
      ]
    );
  };

  const handleReschedule = (booking) => {
    navigation.navigate('RescheduleScreen', { booking });
  };

  const handleCancel = (bookingId) => {
    Alert.alert(
      'Confirm Cancellation',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await axios.put(
                `https://yaslaservice.com:81/appointments/${bookingId}/`,
                { status: 'Cancelled' },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (response.status === 200) {
                Alert.alert('Success', 'Booking cancelled successfully!', [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('BookingsStack'),
                  },
                ]);
              } else {
                Alert.alert('Error', 'Failed to cancel booking. Please try again.');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Something went wrong while cancelling.');
            }
          },
        },
      ]
    );
  };
  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${booking.latitude},${booking.longitude}`;
    Linking.openURL(url).catch(err => Alert.alert("Error", "Could not open maps"));
  };

  const renderActionButton = () => {
    if (booking.status === 'Confirmed') {
      return (
        <TouchableOpacity 
          style={styles.paymentButton} 
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <Text style={styles.paymentButtonText}>Complete Payment</Text>
        </TouchableOpacity>
      );
    }

    if (booking.status === 'Cancelled') {
      return (
        <View style={styles.infoBox}>
          <MaterialIcons  name="error" size={20} color="#2F4EAA" />
          <Text style={styles.cancelText}>This booking was cancelled</Text>
          <TouchableOpacity style={styles.bookAgainButton}>
            <Text style={styles.bookAgainText}>Book Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <MaterialIcons  name="arrow-back" size={24} color="#2F4EAA" />
          <Text style={styles.backText}>Back to Bookings</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.serviceIcon}>
            <MaterialIcons  
              name={getServiceIcon(booking.service)} 
              size={28} 
              color={getStatusColor(booking.status)} 
            />
          </View>
          <Text style={styles.heading}>Booking Details</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Booking Status</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(booking.status) + '20' }
            ]}>
              <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                {booking.status}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>₹{booking.bill_amount.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Booking Information</Text>
          <DetailRow icon="confirmation-number" label="Booking ID" value={booking.id} />

          <DetailRow icon="store" label="Salon" value={booking.salon} />
          <DetailRow icon="content-cut" label="Service" value={booking.service} />
          <DetailRow icon="person" label="Stylist" value={booking.stylist} />
          <DetailRow icon="calendar-today" label="Date" 
            value={moment(booking.date).format('MMM D, YYYY')} />
          <DetailRow icon="access-time" label="Time Slot" value={booking.timeslot} />
          <DetailRow icon="schedule" label="Booked On" 
            value={moment(booking.booking_time).format('MMM D, YYYY • h:mm A')} />
          
          {/* Location row with Get Directions button for confirmed bookings */}
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <MaterialIcons  name="location-on" size={20} color="#666" />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{booking.location}</Text>
            </View>
            {booking.status === 'Confirmed' && booking.latitude && booking.longitude && (
              <TouchableOpacity
                onPress={openMaps}
                style={styles.iconButton}
              >
                <FontAwesome name="map-marker" size={24} color="#ff0000" />
                <Text style={styles.directionsText}>Get Directions</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <DetailRow icon="payment" label="Payment Mode" value={booking.payment_mode} />
          <DetailRow icon="attach-money" label="Payment Status" value={booking.payment_status} />
        </View>

        {/* Grace Period Note */}
{booking.status === 'Confirmed' && (
  <View style={styles.infoBox}>
    <MaterialIcons  name="info" size={20} color="#2196F3" />
    <Text style={styles.infoText}>
    Please note: A 15-minute grace period applies to your confirmed appointment.
    </Text>
  </View>
)}
        
        {booking.status === 'Pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.rescheduleButton}
              onPress={() => handleReschedule(booking)}
            >
              <Text style={styles.actionButtonText}>Reschedule</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => handleCancel(booking.id)}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailIcon}>
      <MaterialIcons  name={icon} size={20} color="#666" />
    </View>
    <View style={styles.detailText}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    color: '#2F4EAA',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  paymentButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#FFF3F3',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelText: {
    color: '#F44336',
    marginLeft: 8,
    flex: 1,
  },
  bookAgainButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bookAgainText: {
    color: 'white',
    fontSize: 14,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    width: 24,
    marginRight: 12,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  iconButton: {
    alignItems: 'center',
    marginLeft: 10,
  },
  directionsText: {
    fontSize: 12,
    color: '#ff0000',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: '#2F4EAA',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingSummary;