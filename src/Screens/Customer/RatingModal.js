import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';


const RatingModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({ rating, review });
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <MaterialIcons  
            name={i <= rating ? 'star' : 'star-border'} 
            size={40} 
            color={i <= rating ? '#FFD700' : '#DDD'} 
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose} 
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons  name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Rate Your Experience</Text>
          
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>
          
          <Text style={styles.ratingText}>
            {rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Tap to rate'}
          </Text>
          
          <Text style={styles.reviewLabel}>Your Review (Optional)</Text>
          <TextInput
            style={styles.reviewInput}
            multiline
            numberOfLines={4}
            placeholder="Share your experience..."
            value={review}
            onChangeText={setReview}
          />
          
          <TouchableOpacity 
        style={[styles.submitButton, { 
          opacity: rating > 0 ? 1 : 0.6,
          flexDirection: 'row',
          justifyContent: 'center'
        }]} 
        onPress={handleSubmit}
        disabled={rating === 0 || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        )}
      </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
    width: '80%',
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  reviewLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  reviewInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#2F4EAA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RatingModal;