import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointmentDetails } = route.params || {};

  if (!appointmentDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No appointment data found.</Text>
      </View>
    );
  }

  const { salon, stylist, date, time, services } = appointmentDetails;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Confirmed ✅</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Salon:</Text>
        <Text style={styles.value}>{salon}</Text>

        <Text style={styles.label}>Stylist:</Text>
        <Text style={styles.value}>{stylist}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{time}</Text>

        <Text style={styles.label}>Services:</Text>
        <Text style={styles.value}>{services}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CScreen5')}>
        <Text style={styles.backButtonText}>Book Another</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9ecf0ff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2d3436',
  },
  detailCard: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#636e72',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: '#2d3436',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#2F4EAA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});
