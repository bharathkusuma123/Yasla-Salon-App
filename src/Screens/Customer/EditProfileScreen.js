// EditProfileScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, Alert
} from 'react-native';
import axios from 'axios';

const EditProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };




// const handleSubmit = async () => {
//   try {
//     const payload = {
//       full_name: formData.full_name,
//       email: formData.email,
//       gender: formData.gender,
//       address: formData.address,
//       city: formData.city,
//       pincode: formData.pincode,
//       // do NOT include id, created_at, phone, last_login, etc.
//     };

//     console.log('Payload:', payload);

//     await axios.put(
//       `https://yaslaservice.com:81/customers/${formData.id}`,
//       payload
//     );

//     Alert.alert('Success', 'Profile updated successfully');
//     navigation.goBack();
//   } catch (error) {
//     console.error('Update error:', error);
//     Alert.alert('Error', 'Failed to update profile');
//   }
// };


const handleSubmit = async () => {
  const payload = {
    full_name: fullName,
    email: email,
    gender: gender,
    phone: phone,
    address: address,
    city: city,
    pincode: pincode,
  };

  console.log('Payload:', JSON.stringify(payload));

  try {
    const response = await axios.put(
      `https://yaslaservice.com:81/customers${formData.id}/`, // 🔁 Replace with correct `userId`
      payload
    );

    if (response.status === 200 || response.status === 204) {
      console.log('Profile updated successfully:', response.data);
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } else {
      console.log('Unexpected response:', response);
      Alert.alert('Error', 'Something went wrong');
    }
  } catch (error) {
    console.error('Update error:', error);
    Alert.alert('Error', 'Failed to update profile');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.full_name}
        onChangeText={(text) => handleInputChange('full_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={formData.gender}
        onChangeText={(text) => handleInputChange('gender', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={(text) => handleInputChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={formData.pincode}
        onChangeText={(text) => handleInputChange('pincode', text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e9ecf0ff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    // fontWeight: 'bold',
       fontFamily: 'Inter_600SemiBold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'Inter_400Regular',
  },
  saveButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
});

export default EditProfileScreen;
