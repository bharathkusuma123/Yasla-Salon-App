// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import axios from 'axios';

// const SignupScreen = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     city: '',
//     pincode: '',
//     gender: 'Male',
//   });

//   const handleChange = (key, value) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const handleSignup = async () => {
//     if (!formData.full_name || !formData.email || !formData.phone || !formData.password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     const payload = {
//       ...formData,
//       profile_image: 'default.jpg', // or assign from image picker later
//       last_login: new Date().toISOString(),
//     };

//     setIsLoading(true);
//     try {
//       await axios.post('https://yaslaservice.com:81/customers/', payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       Alert.alert('Success', 'Customer account created successfully!');
//       navigation.navigate('Login', { role: 'customer' });
//     } catch (error) {
//       console.error('Signup error:', error?.response || error);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Failed to sign up. Please try again.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//  <ScrollView contentContainerStyle={styles.container}>
//   <Text style={styles.title}>Signup as Customer</Text>

//   <Text style={styles.label}>Full Name *</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your full name"
//     value={formData.full_name}
//     onChangeText={value => handleChange('full_name', value)}
//   />

//   <Text style={styles.label}>Email *</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your email"
//     keyboardType="email-address"
//     value={formData.email}
//     onChangeText={value => handleChange('email', value)}
//   />

//   <Text style={styles.label}>Password *</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your password"
//     secureTextEntry
//     value={formData.password}
//     onChangeText={value => handleChange('password', value)}
//   />

//   <Text style={styles.label}>Phone Number *</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your phone number"
//     keyboardType="phone-pad"
//     value={formData.phone}
//     onChangeText={value => handleChange('phone', value)}
//   />

//   <Text style={styles.label}>Address</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your address"
//     value={formData.address}
//     onChangeText={value => handleChange('address', value)}
//   />

//   <Text style={styles.label}>City</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your city"
//     value={formData.city}
//     onChangeText={value => handleChange('city', value)}
//   />

//   <Text style={styles.label}>Pincode</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your pincode"
//     keyboardType="numeric"
//     value={formData.pincode}
//     onChangeText={value => handleChange('pincode', value)}
//   />

//   <TouchableOpacity
//     style={styles.button}
//     onPress={handleSignup}
//     disabled={isLoading}
//   >
//     {isLoading ? (
//       <ActivityIndicator color="#fff" />
//     ) : (
//       <Text style={styles.buttonText}>Register</Text>
//     )}
//   </TouchableOpacity>

//   <TouchableOpacity onPress={() => navigation.navigate('Login', { role: 'customer' })}>
//     <Text style={styles.loginLink}>Already have an account? Login</Text>
//   </TouchableOpacity>
// </ScrollView>

//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   label: {
//   fontWeight: 'bold',
//   marginBottom: 6,
//   marginTop: 6,
//   color: '#555',
// },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: '#333',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 15,
//     padding: 12,
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   button: {
//     padding: 15,
//     width: '100%',
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: '#FF6B6B',
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   loginLink: {
//     color: '#4CAF50',
//     marginTop: 10,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import axios from 'axios';

// const SignupScreen = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     city: '',
//     pincode: '',
//     gender: 'Male',
//   });

//   const handleChange = (key, value) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const handleSignup = async () => {
//     if (!formData.full_name || !formData.email || !formData.phone || !formData.password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     const payload = {
//       ...formData,
//       profile_image: 'default.jpg',
//       last_login: new Date().toISOString(),
//     };

//     setIsLoading(true);
//     try {
//       await axios.post('https://yaslaservice.com:81/customers/', payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       Alert.alert('Success', 'Customer account created successfully!');
//       navigation.navigate('Login', { role: 'customer' });
//     } catch (error) {
//       console.error('Signup error:', error?.response || error);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Failed to sign up. Please try again.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//     >
//       <ScrollView 
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.title}>Signup as Customer</Text>

//         <Text style={styles.label}>Full Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={formData.full_name}
//           onChangeText={value => handleChange('full_name', value)}
//         />

//         <Text style={styles.label}>Email *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={formData.email}
//           onChangeText={value => handleChange('email', value)}
//         />

//         <Text style={styles.label}>Password *</Text>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Enter your password"
//             secureTextEntry={!showPassword}
//             value={formData.password}
//             onChangeText={value => handleChange('password', value)}
//           />
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={() => setShowPassword(!showPassword)}
//           >
//             <MaterialCommunityIcons
//               name={showPassword ? 'eye-off' : 'eye'}
//               size={24}
//               color="#777"
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>Phone Number *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           keyboardType="phone-pad"
//           value={formData.phone}
//           onChangeText={value => handleChange('phone', value)}
//         />

//         <Text style={styles.label}>Address</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your address"
//           value={formData.address}
//           onChangeText={value => handleChange('address', value)}
//         />

//         <Text style={styles.label}>City</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your city"
//           value={formData.city}
//           onChangeText={value => handleChange('city', value)}
//         />

//         <Text style={styles.label}>Pincode</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your pincode"
//           keyboardType="numeric"
//           value={formData.pincode}
//           onChangeText={value => handleChange('pincode', value)}
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSignup}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Register</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Login', { role: 'customer' })}>
//           <Text style={styles.loginLink}>Already have an account? Login</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 6,
//     marginTop: 6,
//     color: '#555',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: '#333',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 15,
//     padding: 12,
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 12,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   button: {
//     padding: 15,
//     width: '100%',
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: '#FF6B6B',
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   loginLink: {
//     color: '#4CAF50',
//     marginTop: 10,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });


// ==========================================================================================

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ActivityIndicator,
//   StyleSheet
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import axios from 'axios';
// import * as Location from 'expo-location';

// const SignupScreen = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [locationError, setLocationError] = useState(null);

//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     password: '',
//     phone: '',
//     gender: '',
//     address: '',
//     city: '',
//     pincode: '',
//     latitude: '',
//     longitude: '',
//   });

//   const handleChange = (key, value) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const getCurrentLocation = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setLocationError('Permission to access location was denied');
//         return null;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;
      
//       // Get address from coordinates
//       let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//       if (geocode.length > 0) {
//         const address = `${geocode[0].name || ''} ${geocode[0].street || ''}`.trim();
//         const city = geocode[0].city || geocode[0].region || '';
//         const pincode = geocode[0].postalCode || '';
        
//         return {
//           latitude: latitude.toString(),
//           longitude: longitude.toString(),
//           address,
//           city,
//           pincode
//         };
//       }
      
//       return {
//         latitude: latitude.toString(),
//         longitude: longitude.toString(),
//         address: '',
//         city: '',
//         pincode: ''
//       };
//     } catch (error) {
//       console.error('Location error:', error);
//       setLocationError('Failed to get location');
//       return null;
//     }
//   };

//   const handleSignup = async () => {
//     if (!formData.full_name || !formData.email || !formData.phone || !formData.password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       // Get user's current location
//       const locationData = await getCurrentLocation();
      
//       if (!locationData) {
//         Alert.alert('Error', 'Could not get your location. Please ensure location services are enabled.');
//         return;
//       }

//       // Round coordinates to 6 decimal places
//     const roundedLocationData = {
//       ...locationData,
//       latitude: parseFloat(locationData.latitude).toFixed(6),
//       longitude: parseFloat(locationData.longitude).toFixed(6)
//     };

//       const payload = {
//         ...formData,
//         ...roundedLocationData,
// profile_image:  null,
//         last_login: new Date().toISOString(),
//       };

//       await axios.post('https://yaslaservice.com:81/customers/', payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       Alert.alert('Success', 'Customer account created successfully!');
//       navigation.navigate('Login', { role: 'customer' });
//     } catch (error) {
//       console.error('Signup error:', error?.response || error);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Failed to sign up. Please try again.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//     >
//       <ScrollView 
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.title}>Signup as Customer</Text>

//         <Text style={styles.label}>Full Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={formData.full_name}
//           onChangeText={value => handleChange('full_name', value)}
//         />

//         <Text style={styles.label}>Email *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={formData.email}
//           onChangeText={value => handleChange('email', value)}
//         />

//         <Text style={styles.label}>Password *</Text>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Enter your password"
//             secureTextEntry={!showPassword}
//             value={formData.password}
//             onChangeText={value => handleChange('password', value)}
//           />
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={() => setShowPassword(!showPassword)}
//           >
//             <MaterialCommunityIcons
//               name={showPassword ? 'eye-off' : 'eye'}
//               size={24}
//               color="#777"
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>Phone Number *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           keyboardType="phone-pad"
//           value={formData.phone}
//           onChangeText={value => handleChange('phone', value)}
//         />

//         <Text style={styles.label}>Gender(Optional)</Text>
//         <View style={styles.genderContainer}>
//           <TouchableOpacity
//             style={[
//               styles.genderOption,
//               formData.gender?.toLowerCase() === 'male' && styles.genderSelected
//             ]}
//             onPress={() => handleChange('gender', 'Male')}
//           >
//             <Text style={styles.genderOptionText}>Male</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.genderOption,
//               formData.gender?.toLowerCase() === 'female' && styles.genderSelected
//             ]}
//             onPress={() => handleChange('gender', 'Female')}
//           >
//             <Text style={styles.genderOptionText}>Female</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.genderOption,
//               !['male', 'female'].includes(formData.gender?.toLowerCase()) && formData.gender !== '' && styles.genderSelected
//             ]}
//             onPress={() => handleChange('gender', 'Other')}
//           >
//             <Text style={styles.genderOptionText}>Other</Text>
//           </TouchableOpacity>
//         </View>

 

//         {locationError && (
//           <Text style={styles.errorText}>{locationError}</Text>
//         )}

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSignup}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Register</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Login', { role: 'customer' })}>
//           <Text style={styles.loginLink}>Already have an account? Login</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 6,
//     marginTop: 6,
//     color: '#555',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: '#333',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 15,
//     padding: 12,
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 12,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   genderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   genderOption: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 12,
//     borderRadius: 5,
//     marginHorizontal: 5,
//     backgroundColor: '#f9f9f9',
//     alignItems: 'center',
//   },
//   genderSelected: {
//     borderColor: '#6C63FF',
//     backgroundColor: '#EDEBFF',
//   },
//   genderOptionText: {
//     color: '#333',
//     fontWeight: '600',
//   },
//   button: {
//     padding: 15,
//     width: '100%',
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: '#FF6B6B',
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   loginLink: {
//     color: '#4CAF50',
//     marginTop: 10,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';import axios from 'axios';
import * as Location from 'expo-location';

const SignupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    address: '',
    city: '',
    pincode: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied');
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get address from coordinates
      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode.length > 0) {
        const address = `${geocode[0].name || ''} ${geocode[0].street || ''}`.trim();
        const city = geocode[0].city || geocode[0].region || '';
        const pincode = geocode[0].postalCode || '';

        return {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          address,
          city,
          pincode
        };
      }

      return {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        address: '',
        city: '',
        pincode: ''
      };
    } catch (error) {
      console.error('Location error:', error);
      setLocationError('Failed to get location');
      return null;
    }
  };

  // ✅ Form validation
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.full_name.trim()) {
      Alert.alert("Error", "Full name is required");
      return false;
    }
    if (!nameRegex.test(formData.full_name.trim())) {
      Alert.alert("Error", "Full name should only contain alphabets");
      return false;
    }

    if (!formData.email.trim()) {
      Alert.alert("Error", "Email is required");
      return false;
    }
    if (!emailRegex.test(formData.email.trim())) {
      Alert.alert("Error", "Invalid email format");
      return false;
    }

    if (!formData.password) {
      Alert.alert("Error", "Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }

    if (!formData.phone) {
      Alert.alert("Error", "Phone number is required");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      Alert.alert("Error", "Phone number must be exactly 10 digits");
      return false;
    }

    // if (!formData.gender) {
    //   Alert.alert("Error", "Please select your gender");
    //   return false;
    // }

    return true;
  };

  // ✅ Signup handler
  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 🔍 Check if email already exists
      const emailRes = await axios.get(
        `https://yaslaservice.com:81/customers/?email=${formData.email.trim()}`
      );
      if (emailRes.data && emailRes.data.length > 0) {
        Alert.alert("Already Registered", "This email is already registered. Please use a new one.");
        setIsLoading(false);
        return;
      }

      // 🔍 Check if phone already exists
      const phoneRes = await axios.get(
        `https://yaslaservice.com:81/customers/?phone=${formData.phone.trim()}`
      );
      if (phoneRes.data && phoneRes.data.length > 0) {
        Alert.alert("Already Registered", "This phone number is already registered. Please use a new one.");
        setIsLoading(false);
        return;
      }

      // ✅ Get location
      const locationData = await getCurrentLocation();
      if (!locationData) {
        Alert.alert('Error', 'Could not get your location. Please ensure location services are enabled.');
        setIsLoading(false);
        return;
      }

      const roundedLocationData = {
        ...locationData,
        latitude: parseFloat(locationData.latitude).toFixed(6),
        longitude: parseFloat(locationData.longitude).toFixed(6)
      };

      const payload = {
        ...formData,
        ...roundedLocationData,
        profile_image: null,
        last_login: new Date().toISOString(),
      };

      await axios.post('https://yaslaservice.com:81/customers/', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      Alert.alert('Success', 'Customer account created successfully!');
      navigation.navigate('Login', { role: 'customer' });
    } catch (error) {
      console.error('Signup error:', error?.response || error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to sign up. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Signup as Customer</Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={formData.full_name}
          onChangeText={value => handleChange('full_name', value)}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={value => handleChange('email', value)}
        />

        <Text style={styles.label}>Password *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={value => handleChange('password', value)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={value => handleChange('phone', value)}
        />

        <Text style={styles.label}>Gender(Optional)</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              formData.gender?.toLowerCase() === 'male' && styles.genderSelected
            ]}
            onPress={() => handleChange('gender', 'Male')}
          >
            <Text style={styles.genderOptionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              formData.gender?.toLowerCase() === 'female' && styles.genderSelected
            ]}
            onPress={() => handleChange('gender', 'Female')}
          >
            <Text style={styles.genderOptionText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              !['male', 'female'].includes(formData.gender?.toLowerCase()) &&
                formData.gender !== '' &&
                styles.genderSelected
            ]}
            onPress={() => handleChange('gender', 'Other')}
          >
            <Text style={styles.genderOptionText}>Other</Text>
          </TouchableOpacity>
        </View>

        {locationError && <Text style={styles.errorText}>{locationError}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

     {/* Login Link */}
<View style={styles.signupContainer}>
  <Text style={styles.signupText}>Already have an account? </Text>
  <TouchableOpacity onPress={() => navigation.navigate('Login', { role: 'customer' })}>
    <Text style={styles.signupLink}>Login</Text>
  </TouchableOpacity>
</View>
</ScrollView>
</KeyboardAvoidingView>
);
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
    marginTop: 6,
    color: '#555',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2F4EAA',
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Inter_400Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontFamily: 'Inter_400Regular',
  },
  eyeIcon: {
    padding: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  genderSelected: {
    borderColor: '#6C63FF',
    backgroundColor: '#EDEBFF',
  },
  genderOptionText: {
    color: '#333',
    fontFamily: 'Inter_500Medium',
  },
  button: {
    padding: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#2F4EAA',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#666',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
  },
  signupLink: {
    color: '#2F4EAA',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Inter_400Regular',
  },
});