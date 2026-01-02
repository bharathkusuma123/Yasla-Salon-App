import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { color } from 'react-native-elements/dist/helpers';


const RescheduleScreen = ({ route, navigation }) => {
  const { booking } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date(booking.date).toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(booking.timeslot);
  const [showCalendar, setShowCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState({
    [selectedDate]: { selected: true, selectedColor: '#2F4EAA' }
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Time slots available for booking
  const timeSlots = [
    "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
     "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
  ];

  // Convert UTC time to local time string
  const utcToLocalTime = (utcString) => {
    const date = new Date(utcString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours || 12; // Convert 0 to 12
    
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Fetch booked slots for the stylist on selected date
  const fetchBookedSlots = async (stylistId, date) => {
    try {
      setLoadingSlots(true);
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${date}`
      );
      
      // Convert UTC times to local time format
      const bookedTimeSlots = response.data.map(appointment => {
        return utcToLocalTime(appointment.start_datetime);
      });
      
      setBookedSlots(bookedTimeSlots);
      console.log(`Booked slots for stylist ${stylistId} on ${date}:`, bookedTimeSlots);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Fetch booked slots when date changes
  useEffect(() => {
    if (selectedDate && booking.stylistId) {
      fetchBookedSlots(booking.stylistId, selectedDate);
    }
  }, [selectedDate, booking.stylistId]);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: { selected: true, selectedColor: '#2F4EAA' }
    });
    setShowCalendar(false);
    setSelectedTime(null); // Reset time selection when date changes
  };

  // Convert local time to UTC for API
  const localTimeToUTC = (dateStr, time12h) => {
    const [time, period] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    // Convert 12h to 24h format
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const date = new Date(dateStr);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    
    return date.toISOString();
  };

 const handleReschedule = async () => {
  if (!selectedTime) {
    Alert.alert('Error', 'Please select a time slot');
    return;
  }

  Alert.alert(
    'Confirm Reschedule',
    `Change booking to ${selectedDate} at ${selectedTime}?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Confirm', 
        onPress: async () => {
          try {
            const startDateTimeUTC = localTimeToUTC(selectedDate, selectedTime);
            console.log('Rescheduling booking to:', startDateTimeUTC);
            
            const response = await axios.put(
              `https://yaslaservice.com:81/appointments/${booking.id}/`,
              {
                start_datetime: startDateTimeUTC,
                // status: "Rescheduled"
              }
            );

            // Navigate to CustomerBookings and pass a refresh flag
            navigation.navigate('CustomerBookings');
            
            Alert.alert('Success', 'Booking rescheduled successfully!');
          } catch (error) {
            console.error('Reschedule error:', error);
            Alert.alert('Error', 'Failed to reschedule booking');
          }
        }
      }
    ]
  );
};

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Reschedule Booking</Text>
            
            <View style={styles.currentBooking}>
              <Text style={styles.currentBookingText}>Current Booking:</Text>
              <Text style={styles.bookingDetails}>{booking.salon} - {booking.service}</Text>
              <Text style={styles.bookingDetails}>
                {new Date(booking.date).toLocaleDateString()} at {' '}
                <Text style={{ fontWeight: 'bold' }}>{utcToLocalTime(booking.date)}</Text>
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.dateSelector}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <FontAwesome name="calendar" size={20} color="#2F4EAA" />
              <Text style={styles.dateText}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </TouchableOpacity>

            {showCalendar && (
              <View style={styles.calendarContainer}>
                <Calendar
                  current={selectedDate}
                  minDate={new Date().toISOString().split('T')[0]}
                  onDayPress={handleDateSelect}
                  markedDates={markedDates}
                  theme={{
                    selectedDayBackgroundColor: '#2F4EAA',
                    todayTextColor: '#2F4EAA',
                    arrowColor: '#2F4EAA',
                  }}
                />
              </View>
            )}

            <Text style={styles.sectionTitle}>Select New Time Slot</Text>
          </>
        }
        renderItem={null}
        ListFooterComponent={
          <>
            {loadingSlots ? (
              <ActivityIndicator size="small" color="#2F4EAA" />
            ) : (
              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((item, index) => {
                  const isBooked = bookedSlots.includes(item);
                  const isSelected = selectedTime === item;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeSlot,
                        isSelected && styles.selectedTimeSlot,
                        isBooked && styles.disabledTimeSlot
                      ]}
                      onPress={() => !isBooked && setSelectedTime(item)}
                      disabled={isBooked}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        isSelected && styles.selectedTimeSlotText,
                        isBooked && styles.disabledTimeSlotText
                      ]}>
                        {item}
                      </Text>
                      {isBooked && <Text style={styles.bookedLabel}>Booked</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleReschedule}
              disabled={!selectedTime}
            >
              <Text style={styles.confirmButtonText}>Confirm Reschedule</Text>
            </TouchableOpacity>
          </>
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecf0ff',
  },
  listContent: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    // fontWeight: 'bold',
     fontFamily: 'Inter_600SemiBold', 
    marginBottom: 20,
    color: '#333',
  },
  currentBooking: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  currentBookingText: {
    fontSize: 16,
    // fontWeight: 'bold',
      fontFamily: 'Inter_600SemiBold',
    marginBottom: 5,
    color: '#555',
  },
  bookingDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
    fontFamily: 'Inter_400Regular',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
     fontFamily: 'Inter_500Medium',
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff'
  },
  sectionTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
       fontFamily: 'Inter_600SemiBold',
    marginBottom: 15,
    color: '#333',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeSlot: {
    padding: 12,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  selectedTimeSlot: {
    backgroundColor: '#2F4EAA',
  },
  timeSlotText: {
    color: '#666',
    fontSize: 12,
     fontFamily: 'Inter_500Medium',
  },
  selectedTimeSlotText: {
    color: '#fff',
      fontFamily: 'Inter_600SemiBold',
  },
  confirmButton: {
    backgroundColor: '#2F4EAA',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: '#fff',
    // fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  disabledTimeSlotText: {
    color: '#000000ff',
     fontFamily: 'Inter_400Regular',
  },
  bookedLabel: {
    color: '#ff0000',
      fontFamily: 'Inter_500Medium',
  }
});

export default RescheduleScreen;