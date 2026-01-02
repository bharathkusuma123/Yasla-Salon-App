import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const timeSlots = [
  "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
];

const AvailabilityModal = ({ 
  visible, 
  onClose, 
  onApply,
  salons,
  stylists
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: { selected: true, selectedColor: '#FF6B6B' }
    });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleApply = () => {
    if (selectedDate && selectedTime) {
      onApply(selectedDate, selectedTime);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Availability</Text>
          <TouchableOpacity onPress={onClose}>
            <FontAwesome name="close" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            minDate={new Date().toISOString().split('T')[0]}
            onDayPress={handleDateSelect}
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: '#FF6B6B',
              todayTextColor: '#FF6B6B',
              arrowColor: '#FF6B6B',
            }}
          />
        </View>

        <Text style={styles.sectionTitle}>Select Time Slot</Text>
        <FlatList
          data={timeSlots}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedTime === item;
            return (
              <TouchableOpacity
                style={[
                  styles.timeSlot,
                  isSelected && styles.selectedTimeSlot
                ]}
                onPress={() => handleTimeSelect(item)}
              >
                <Text style={[
                  styles.timeSlotText,
                  isSelected && styles.selectedTimeSlotText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.timeSlotContainer}
        />

        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApply}
          disabled={!selectedTime}
        >
          <Text style={styles.applyButtonText}>
            Apply Filter
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 40
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
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
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  timeSlotContainer: {
    paddingBottom: 20
  },
  timeSlot: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%'
  },
  selectedTimeSlot: {
    backgroundColor: '#FF6B6B'
  },
  timeSlotText: {
    color: '#666'
  },
  selectedTimeSlotText: {
    color: '#fff'
  },
  applyButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default AvailabilityModal;