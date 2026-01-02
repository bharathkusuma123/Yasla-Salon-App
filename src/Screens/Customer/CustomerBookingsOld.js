


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity, 
  StatusBar,
  SafeAreaView,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import RatingModal from './RatingModal';
import { useAuth } from '../../Context/AuthContext'; // Import the Auth context
import axios from 'axios';
import { useCallback } from 'react';

const TABS = ['Pending', 'Accepted', 'Confirmed', 'Cancelled'];

const getStatusColor = (status) => {
  switch(status.toLowerCase()) {
    case 'confirmed': return '#4CAF50';
    case 'accepted': return '#2196F3';
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

const CustomerBookings = () => {
  const navigation = useNavigation();
  const { customer } = useAuth(); // Get customer from auth context
  console.log('Customer Data:', customer);
  const customerId = customer?.data?.customer_id;
  
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchAppointments = async () => {
  try {
    setLoading(true);

    // 1. Fetch appointments
    const appointmentsResponse = await axios.get(
      `https://yaslaservice.com:81/appointments/customer/${customerId}/`
    );

    if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data)) {
      throw new Error('Invalid data format received from server');
    }

    // 2. Fetch all needed data in parallel
    const [salonsResponse, usersResponse] = await Promise.all([
      axios.get('https://yaslaservice.com:81/salons/'),
      axios.get('https://yaslaservice.com:81/users/')
    ]);

    // Process salons data
    const allSalons = Array.isArray(salonsResponse.data?.data) 
      ? salonsResponse.data.data 
      : Array.isArray(salonsResponse.data)
        ? salonsResponse.data
        : [salonsResponse.data].filter(Boolean);

    // Process users data (filter for stylists only)
    const allUsers = Array.isArray(usersResponse.data?.data)
      ? usersResponse.data.data.filter(user => user.user_role === 'Stylist')
      : Array.isArray(usersResponse.data)
        ? usersResponse.data.filter(user => user.user_role === 'Stylist')
        : usersResponse.data?.user_role === 'Stylist'
          ? [usersResponse.data]
          : [];

    // Create lookup maps
    const salonMap = allSalons.reduce((map, salon) => {
      if (salon && salon.id) map[salon.id] = salon;
      return map;
    }, {});

    const stylistMap = allUsers.reduce((map, user) => {
      if (user && user.id) map[user.id] = user;
      return map;
    }, {});

    // Transform appointments with proper data matching
  // Transform appointments with proper data matching
const transformedBookings = appointmentsResponse.data.map(appointment => {
  // Handle multiple services
  const services = appointment.appointment_services || [];
  const serviceNames = services.map(service => 
    service.service_name || `Service ${service.service || ''}`
  ).join(', ');
  
  const totalBillAmount = services.reduce((total, service) => {
    return total + (parseFloat(service.price) || 0);
  }, 0);
  
  const salon = salonMap[appointment.salon];
  const stylist = stylistMap[appointment.stylist];

  return {
    id: appointment.id.toString(),
    salon: salon?.salon_name || `Salon ${appointment.salon}`,
    services: services, // Keep the full services array for reference
    service: serviceNames, // This now contains all service names
    serviceCount: services.length, // Add count for conditional rendering
    serviceId: services.length > 0 ? services[0].service : null,
    stylist: stylist?.full_name || `Stylist ${appointment.stylist}`,
    stylistId: appointment.stylist,
    date: appointment.start_datetime,
    timeslot: moment(appointment.start_datetime).format('h:mm A'),
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
  };
});

    const sortedBookings = transformedBookings.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    setBookings(sortedBookings);
  } catch (err) {
    setError('Failed to load bookings. Please try again.');
  } finally {
    setLoading(false);
  }
};

  // ✅ Refetch whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (customerId) {
        fetchAppointments();
      }
    }, [customerId, selectedTab])
  );

  const filteredBookings = bookings.filter((item) => {
    if (selectedTab === 'Confirmed') return item.status === 'Confirmed';
    if (selectedTab === 'Accepted') return item.status === 'Accepted';
    if (selectedTab === 'Pending') return item.status === 'Pending';
    if (selectedTab === 'Cancelled') return item.status === 'Cancelled';
    return false;
  });

  const handleRateBooking = (booking) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

    const handlePayNow = (booking) => {
    navigation.navigate('PaymentScreen', { 
      bookingDetails: booking,
      onPaymentSuccess: () => {
        // Callback to refresh bookings after successful payment
        fetchAppointments();
      }
    });
  };

const handleSubmitRating = async ({ rating, review }) => {
  console.log('Submitting rating:', rating, 'Review:', review);
  try {
    if (!selectedBooking) {
      console.error('Rating submission failed: No booking selected');
      Alert.alert('Error', 'No booking selected');
      return;
    }

    const feedbackData = {
      rating: rating,
      review_text: review || null,
      customer: customer?.data?.customer_id,
      booking: selectedBooking.id,
      stylist: selectedBooking.stylistId
    };

    console.log('Submitting feedback with data:', JSON.stringify(feedbackData, null, 2));
    
    const response = await axios.post(
      'https://yaslaservice.com:81/feedbacks/',
      feedbackData
    );

    console.log('Feedback submitted successfully:', response.data);
    Alert.alert('Thank You!', `You rated this booking ${rating} stars`);
    
    // Update local state if needed
    // updateBookingsList(selectedBooking.id, rating, review);
    
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error(
        'Feedback submission failed with status:', 
        error.response.status,
        '\nResponse data:', 
        error.response.data,
        '\nHeaders:', 
        error.response.headers
      );
      
      if (error.response.status === 400) {
        console.error('Validation error details:', error.response.data);
        Alert.alert('Error', 'Invalid data. Please check your rating and try again.');
      } else if (error.response.status === 401) {
        console.error('Authentication error - user might need to login again');
        Alert.alert('Session Expired', 'Please login again to submit your rating');
      } else {
        Alert.alert('Error', `Server error: ${error.response.status}`);
      }
      
    } else if (error.request) {
      // Request was made but no response received
      console.error(
        'No response received from server. Request config:',
        error.request
      );
      Alert.alert('Network Error', 'Could not connect to server. Please check your internet connection.');
      
    } else {
      // Something happened in setting up the request
      console.error(
        'Error setting up feedback request:',
        error.message,
        '\nStack trace:',
        error.stack
      );
      Alert.alert('Error', 'Failed to submit rating. Please try again.');
    }
    
    // Additional error tracking (you might integrate with analytics here)
    console.error('Full error object:', JSON.stringify(error, null, 2));
    
  } finally {
    setShowRatingModal(false);
  }
};

  const renderItem = ({ item }) => (
   <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: getStatusColor(item.status) }
      ]}
      onPress={() => navigation.navigate('BookingSummary', { booking: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.serviceIcon}>
          <MaterialIcons  
            name={getServiceIcon(item.service)} 
            size={24} 
            color={getStatusColor(item.status)} 
          />
        </View>
      <View style={styles.serviceInfo}>
  <Text style={styles.salonName}>{item.salon}</Text>
  <Text style={styles.serviceText}>
    {item.serviceCount > 1 
      ? `${item.serviceCount} services • ${item.stylist}`
      : `${item.service} • ${item.stylist}`
    }
  </Text>
</View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.dateTimeContainer}>
          <MaterialIcons  name="calendar-today" size={16} color="#666" />
          <Text style={styles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
          <MaterialIcons  name="access-time" size={16} color="#666" style={styles.timeIcon} />
          <Text style={styles.timeText}>{item.timeslot}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Amount</Text>
          <Text style={styles.priceValue}>₹{item.bill_amount.toLocaleString()}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.locationContainer}>
          <MaterialIcons  name="location-on" size={16} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        {/* Pay Now button for Accepted bookings */}
        {item.status === 'Accepted' && (
          <TouchableOpacity 
            style={styles.payNowButton}
            onPress={(e) => {
              e.stopPropagation();
              handlePayNow(item);
            }}
          >
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {item.status === 'Confirmed' && (
          <TouchableOpacity 
            style={styles.rateButton}
            onPress={(e) => {
              e.stopPropagation();
              handleRateBooking(item);
            }}
          >
            <View style={styles.rateButtonContent}>
              <MaterialIcons  name="star" size={20} color="#FFD700" />
              <Text style={styles.rateButtonText}>Rate Us</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
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

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <MaterialIcons  name="error-outline" size={50} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => setError(null)}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={styles.container}>
        <Text style={styles.heading}>My Bookings</Text>
        
        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton
              ]}
              onPress={() => setSelectedTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText
              ]}>
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons  name="event-busy" size={60} color="#E0E0E0" />
              <Text style={styles.emptyText}>No {selectedTab.toLowerCase()} bookings</Text>
            </View>
          }
        />
      </View>
      
      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleSubmitRating}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#6C63FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  salonName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  timeIcon: {
    marginLeft: 12,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    color: '#888',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  payNowButton: {
    backgroundColor: '#6200EE',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 10,
  },
  payNowButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },

   cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  rateButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4, // Optional (if you're using React Native 0.71+), else use margin
},
  rateButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 15,
  },
 rateButtonText: {
  color: 'white',
  fontSize: 14,
  fontWeight: '300',
  marginLeft: 6, // 👈 add this if `gap` isn't supported
},
  ratedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratedText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  starRating: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  cancelButtonText: {
    color: '#6C63FF',
    textAlign: 'center',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#6C63FF',
    opacity: 1,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
   actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default CustomerBookings;