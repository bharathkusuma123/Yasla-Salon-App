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
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
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

  // Countdown timer effect
  useEffect(() => {
    const intervals = {};

    bookings.forEach((booking) => {
      if (booking.status === 'Pending' && booking.booking_time) {
        const createdTime = new Date(booking.booking_time);
        const now = new Date();
        const elapsed = Math.floor((now - createdTime) / 1000);
        const remaining = Math.max(90 - elapsed, 0);

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


  // Add this useEffect for periodic polling
// useEffect(() => {
//   if (selectedTab === 'Pending') {
//     const pollingInterval = setInterval(() => {
//       fetchAppointments();
//     }, 5000); // Poll every 5 seconds for pending tab

//     return () => clearInterval(pollingInterval);
//   }
// }, [selectedTab, customerId]);

// Polling for all tabs - every 5 seconds
// useEffect(() => {
//   const pollingInterval = setInterval(() => {
//     fetchAppointments();
//   }, 5000); // Poll every 5 seconds for ALL tabs

//   return () => clearInterval(pollingInterval);
// }, [customerId]);

// Polling for Pending tab AND All tab
useEffect(() => {
  if (selectedTab === 'Pending' || selectedTab === 'All') {
    const pollingInterval = setInterval(() => {
      fetchAppointments();
    }, 5000); // Poll every 5 seconds for Pending and All tabs

    return () => clearInterval(pollingInterval);
  }
}, [selectedTab, customerId]);
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

  const fetchAppointments = async () => {
    try {
      setLoading(true);
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
          // Include contact details directly in booking object - SAME AS CScreen1.js
          SalonPhoneNumber: salon?.phoneNumber || '',
          SalonLatitude: salon?.latitude || null,
          SalonLongitude: salon?.longitude || null,
          city: salon?.city || '',
        };
      });

      const sortedBookings = transformedBookings.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );

      setBookings(sortedBookings);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (customerId) {
        fetchAppointments();
      }
    }, [customerId, selectedTab])
  );

  // Updated filter logic (removed 'Completed' tab)
// Updated filter logic to exclude Confirmed+Paid bookings from Confirmed tab
const filteredBookings = bookings.filter((item) => {
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

  const handlePayNow = (booking) => {
    navigation.navigate('PaymentScreen', {
      bookingDetails: booking,
      onPaymentSuccess: () => {
        fetchAppointments();
      },
    });
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

      {/* Three Icons for Confirmed Bookings */}
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
          <MaterialIcons name="error-outline" size={50} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => setError(null)}>
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="event-busy" size={60} color="#E0E0E0" />
              <Text style={styles.emptyText}>
                {selectedTab === 'All' ? 'No bookings found' : `No ${selectedTab.toLowerCase()} bookings`}
              </Text>
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
  // New styles for icons container
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
});

export default CustomerBookings;