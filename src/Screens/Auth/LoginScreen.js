// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';
// const LoginScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const handleLogin = async () => {
//     if (!phone || !password) {
//       Alert.alert('Error', 'Please enter both phone number and password');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         'https://yaslaservice.com:81/customer_login',
//         { phone, password },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.data?.status === 'success') {
//         login(response.data); // ✅ Save in context
//         Alert.alert('Login Successful', 'Welcome!');
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'CustomerFlow' }],
//         });
//       } else {
//         Alert.alert('Login Failed', response.data?.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Customer Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Mobile"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//         maxLength={10}
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity
//           style={styles.eyeIcon}
//           onPress={() => setShowPassword(!showPassword)}
//         >
//           <MaterialCommunityIcons
//             name={showPassword ? 'eye-off' : 'eye'}
//             size={24}
//             color="#777"
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleLogin}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.signupLink}>Don't have an account? Sign up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF6B6B',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//     marginBottom: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 15,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   button: {
//     height: 50,
//     backgroundColor: '#FF6B6B',
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   signupLink: {
//     color: '#4CAF50',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

//===================================================================================================

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
//     KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import { Image } from 'react-native';
// import { useAuth } from '../../Context/AuthContext';
// const LoginScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const handleLogin = async () => {
//     if (!phone || !password) {
//       Alert.alert('Error', 'Please enter both phone number and password');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         'https://yaslaservice.com:81/customer_login',
//         { phone, password },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.data?.status === 'success') {
//         login(response.data); // ✅ Save in context
//         navigation.reset({
//         index: 0,
//         routes: [
//           {
//             name: 'CustomerFlow',
//             state: {
//               routes: [{ name: 'CScreen1' }],
//             },
//           },
//         ],
//       });
//       } else {
//         Alert.alert('Login Failed', response.data?.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

// return (
//   <KeyboardAvoidingView
//     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     style={{ flex: 1 }}
//   >
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//         {/* Logo */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={require('../../Screens/Customer/Images/splash-icon.png')} // Adjust as needed
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>

//         <Text style={styles.title}>Customer Login</Text>

//         <Text style={styles.label}>Mobile Number </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your mobile number"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//           maxLength={10}
//         />

//         <Text style={styles.label}>Password </Text>
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
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

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogin}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//           <Text style={styles.signupLink}>Don't have an account? Sign up</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </TouchableWithoutFeedback>
//   </KeyboardAvoidingView>
// );

// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   label: {
//   fontWeight: 'bold',
//   marginBottom: 6,
//   marginTop: 10,
//   color: '#333',
// },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF6B6B',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//     marginBottom: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 15,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   button: {
//     height: 50,
//     backgroundColor: '#FF6B6B',
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   signupLink: {
//     color: '#4CAF50',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   logoContainer: {
//   alignItems: 'center',
//   marginBottom: 20,
// },
// logo: {
//   width: 120,
//   height: 120,
// },
// });













// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';

// const LoginScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     if (!phone || !password) {
//       Alert.alert('Error', 'Please enter both phone number and password');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         'https://yaslaservice.com:81/customer_login',
//         { phone, password },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.data?.status === 'success') {
//         login(response.data); // ✅ Save in context
//         navigation.reset({
//           index: 0,
//           routes: [
//             {
//               name: 'CustomerFlow',
//               state: {
//                 routes: [{ name: 'CScreen1' }],
//               },
//             },
//           ],
//         });
//       } else {
//         Alert.alert('Login Failed', response.data?.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     // Placeholder: Add your Google Sign-In logic here
//     Alert.alert('Google Login', 'Google login logic not yet implemented.');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//           {/* Logo */}
//           <View style={styles.logoContainer}>
//             <Image
//               source={require('../../Screens/Customer/Images/splash-icon.png')}
//               style={styles.logo}
//               resizeMode="contain"
//             />
//           </View>

//           <Text style={styles.title}>Customer Login</Text>

//           <Text style={styles.label}>Mobile Number/Email </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your mobile number"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//             maxLength={10}
//           />

//           <Text style={styles.label}>Password </Text>
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Enter your password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               style={styles.eyeIcon}
//               onPress={() => setShowPassword(!showPassword)}
//             >
//               <MaterialCommunityIcons
//                 name={showPassword ? 'eye-off' : 'eye'}
//                 size={24}
//                 color="#777"
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleLogin}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Login</Text>
//             )}
//           </TouchableOpacity>

//             <Text style={styles.or}>OR</Text>

//           {/* Login with Google */}
//           <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
//             <Image
//               source={require('../../Screens/Customer/Images/Googleicon.jpeg')} // uploaded Google icon
//               style={styles.googleIcon}
//             />
//             <Text style={styles.googleText}>Login with Google ID</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//             <Text style={styles.signupLink}>Don't have an account? Sign up</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 6,
//     marginTop: 10,
//     color: '#333',
//   },
//   or:{
//     textAlign:'center',
//         fontWeight: 'bold',
//            fontSize: 17,
//            marginBottom: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF6B6B',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//     marginBottom: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 15,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   button: {
//     height: 50,
//     backgroundColor: '#FF6B6B',
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   signupLink: {
//     color: '#4CAF50',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   googleText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });







//=============== below is working code ===========================


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import { useAuth } from '../../Context/AuthContext';

// const LoginScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     if (!phone || !password) {
//       Alert.alert('Error', 'Please enter both phone number and password');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         'https://yaslaservice.com:81/customer_login',
//         { phone, password },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.data?.status === 'success') {
//         login(response.data);
//         // navigation.reset({
//         //   index: 0,
//         //   routes: [
//         //     {
//         //       name: 'CustomerFlow',
//         //       state: {
//         //         routes: [{ name: 'CScreen1' }],
//         //       },
//         //     },
//         //   ],
//         // });
//       } else {
//         Alert.alert('Login Failed', response.data?.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     Alert.alert('Google Login', 'Google login logic not yet implemented.');
//   };

//   const handleForgotPassword = () => {
//     navigation.navigate('ForgotPassword');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView 
//           contentContainerStyle={styles.container} 
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Logo */}
//           <View style={styles.logoContainer}>
//             <Image
//               source={require('../../Screens/Customer/Images/splash-icon.png')}
//               style={styles.logo}
//               resizeMode="contain"
//             />
//           </View>

//           <Text style={styles.title}>Customer Login</Text>

//           {/* Phone/Email Input */}
//           <Text style={styles.label}>Mobile Number/Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your mobile number or email"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType={phone.includes('@') ? 'email-address' : 'phone-pad'}
//             autoCapitalize="none"
//             maxLength={phone.includes('@') ? 50 : 10}
//           />

//           {/* Password Input */}
//           <View style={styles.passwordFieldContainer}>
//             <Text style={styles.label}>Password</Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowPassword(!showPassword)}
//               >
//                 <MaterialCommunityIcons
//                   name={showPassword ? 'eye-off' : 'eye'}
//                   size={24}
//                   color="#777"
//                 />
//               </TouchableOpacity>
//             </View>
            
//             {/* Forgot Password Link */}
//             <TouchableOpacity 
//               style={styles.forgotPasswordLink}
//               onPress={handleForgotPassword}
//             >
//               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Login Button */}
//           <TouchableOpacity
//             style={[styles.button, isLoading && styles.disabledButton]}
//             onPress={handleLogin}
//             disabled={isLoading}
//             activeOpacity={0.8}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Login</Text>
//             )}
//           </TouchableOpacity>

//           {/* OR Divider */}
//           <View style={styles.dividerContainer}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           {/* Google Login */}
//           {/* <TouchableOpacity 
//             style={styles.googleButton} 
//             onPress={handleGoogleLogin}
//             activeOpacity={0.8}
//           >
//             <Image
//               source={require('../../Screens/Customer/Images/Googleicon.jpeg')}
//               style={styles.googleIcon}
//             />
//             <Text style={styles.googleText}>Login with Google</Text>
//           </TouchableOpacity> */}

//           {/* Sign Up Link */}
//           <View style={styles.signupContainer}>
//             <Text style={styles.signupText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//               <Text style={styles.signupLink}>Sign up</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 25,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF6B6B',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   label: {
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#444',
//     fontSize: 15,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//     fontSize: 15,
//   },
//   passwordFieldContainer: {
//     marginBottom: 5,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//     marginBottom: 5,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 15,
//     fontSize: 15,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   forgotPasswordLink: {
//     alignSelf: 'flex-end',
//     marginBottom: 15,
//   },
//   forgotPasswordText: {
//     color: '#FF6B6B',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   button: {
//     height: 50,
//     backgroundColor: '#FF6B6B',
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     elevation: 2,
//     shadowColor: '#FF6B6B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 15,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ddd',
//   },
//   dividerText: {
//     width: 40,
//     textAlign: 'center',
//     color: '#777',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     marginBottom: 20,
//     elevation: 1,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   googleText: {
//     fontSize: 15,
//     color: '#444',
//     fontWeight: '500',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   signupText: {
//     color: '#666',
//     fontSize: 15,
//   },
//   signupLink: {
//     color: '#FF6B6B',
//     fontWeight: '600',
//     fontSize: 15,
//   },
// });

// export default LoginScreen;


//======================= below is working code with guest login  ================================


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, guestLogin } = useAuth();

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter both phone number and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://yaslaservice.com:81/customer_login',
        { phone, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data?.status === 'success') {
        login(response.data);
        // navigation.navigate("CustomerFlow"); // ✅ Navigate after login
      } else {
        Alert.alert('Login Failed', response.data?.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    await guestLogin();
    // navigation.navigate("CustomerFlow"); // ✅ Navigate after guest login
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.container} 
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../Screens/Customer/Images/Outsidelogo.jpg')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Customer Login</Text>

          {/* Phone/Email Input */}
          <Text style={styles.label}>Mobile Number/Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number or email"
            value={phone}
            onChangeText={setPhone}
            keyboardType={phone.includes('@') ? 'email-address' : 'phone-pad'}
            autoCapitalize="none"
            maxLength={phone.includes('@') ? 50 : 10}
          />

          {/* Password Input */}
          <View style={styles.passwordFieldContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
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
            
            {/* Forgot Password Link */}
            <TouchableOpacity 
              style={styles.forgotPasswordLink}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Guest Login Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={handleGuestLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue as Guest</Text>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 25,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 24,
 fontFamily: 'Inter_600SemiBold', 
     color: '#2F4EAA',
    marginBottom: 30,
    textAlign: 'center',
    
  },
  label: {
fontFamily: 'Inter_500Medium',
    marginBottom: 8,
    color: '#444',
    fontSize: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 15,
      fontFamily: 'Inter_400Regular', 
  },
  passwordFieldContainer: {
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 15,
     fontFamily: 'Inter_400Regular',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#2F4EAA',
    fontSize: 14,
 fontFamily: 'Inter_500Medium',
  },
  button: {
    height: 50,
    backgroundColor: '#2F4EAA',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#2F4EAA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
  fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    width: 40,
    textAlign: 'center',
    color: '#777',
  fontFamily: 'Inter_500Medium',
      fontSize: 14,
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
});

export default LoginScreen;
