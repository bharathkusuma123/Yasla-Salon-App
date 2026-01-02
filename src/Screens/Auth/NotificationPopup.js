// src/Components/NotificationPopup.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationPopup = ({ bookings, onClose, navigation }) => {
  // Sample bookings data - replace with your actual data
  const sampleBookings = [
    { id: '1', service: 'Haircut', date: 'Today, 3:00 PM', stylist: 'John Doe' },
    { id: '2', service: 'Manicure', date: 'Tomorrow, 11:00 AM', stylist: 'Jane Smith' },
  ];

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookingCard}
      onPress={() => {
        navigation.navigate('CustomerBookings'); // Navigate to your bookings screen
        onClose();
      }}
    >
      <Text style={styles.serviceText}>{item.service}</Text>
      <Text style={styles.detailText}>With: {item.stylist}</Text>
      <Text style={styles.detailText}>When: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        <View style={styles.popupHeader}>
          <Text style={styles.popupTitle}>Upcoming Bookings</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={sampleBookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
    width: 300,
    maxHeight: 400,
  },
  popupContent: {
    padding: 15,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  listContainer: {
    paddingBottom: 10,
  },
  bookingCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  serviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationPopup;