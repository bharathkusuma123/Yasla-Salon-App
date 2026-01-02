// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import moment from 'moment';
// import RazorpayCheckout from "react-native-razorpay";

// const PaymentScreen = ({ route, navigation }) => {
//   const { bookingDetails, onPaymentSuccess } = route.params;

// const handlePayment = async (type) => {
//   console.log("handlePayment called with type:", type);

//   if (type === "now") {
//     try {
//       console.log("Initiating payment request...");
//       // 1. Call backend to create order
//       const res = await fetch(`https://yaslaservice.com:81/initiate/payment/${bookingDetails.id}/`);
//       const data = await res.json();

//       console.log("Backend response:", data);

//       if (!data.order_id) {
//         console.log("Failed to initiate payment, no order ID.");
//         setMessage("Failed to initiate payment.");
//         return;
//       }

//       console.log("Payment order ID:", data.order_id);

//       // 2. Setup Razorpay checkout
//       const options = {
//         key: data.razorpay_key_id,
//         amount: data.amount_paise,
//         currency: "INR",
//         order_id: data.order_id,
//         name: "Payment",
//         description: "Appointment Payment",
//         prefill: {
//           name: data.customer_name,
//           email: data.customer_email,
//           contact: data.customer_contact,
//         },
//         theme: { color: "#F37254" },
//       };

//       console.log("Opening Razorpay checkout with options:", options);

//       RazorpayCheckout.open(options)
//         .then(async (response) => {
//           console.log("Payment response:", response);

//           // 3. Verify payment
//           const verifyRes = await fetch("https://yaslaservice.com:81/payment/verify/", {
//             method: "POST",
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: new URLSearchParams({
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             }),
//           });

//           const result = await verifyRes.json();
//           console.log("Payment verification result:", result);

//           if (result.message === "Payment Successful!") {
//             console.log("✅ Payment Verified Successfully");
//             setMessage("✅ Payment Successful!");
//             onPaymentSuccess();   // call only after verification
//             navigation.goBack();  // go back only on success
//           } else {
//             console.log("❌ Payment verification failed:", result.message);
//             setMessage(result.message || "❌ Payment verification failed.");
//           }
//         })
//         .catch((error) => {
//           console.error("Payment error:", error);
//           setMessage(`❌ Payment failed: ${error.description || "Try again."}`);
//         });
//     } catch (err) {
//       console.error("Error initiating payment:", err);
//       setMessage("Something went wrong.");
//     }
//   } else {
//     console.log("Payment set for later.");
//     Alert.alert("⏳ Payment Later", "You can pay at the salon.");
//     navigation.goBack();
//   }
// };


//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Custom Header with Back Button + Title */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Confirm Your Booking</Text>
//       </View>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
//         {/* Salon Card */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>{bookingDetails.salon}</Text>
//           <Text style={styles.subText}>{bookingDetails.location}</Text>
//         </View>

//         {/* Stylist Card */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Hairstylist</Text>
//           <View style={[styles.row, { marginTop: 10 }]}>
//             <View style={styles.avatar} />
//             <View style={{ flex: 1 }}>
//               <Text style={styles.stylistName}>{bookingDetails.stylist}</Text>
//               <Text style={styles.rating}>⭐ {bookingDetails.rating || "4.7"} ({bookingDetails.reviews || "239"})</Text>
//             </View>
//             <View style={styles.iconRow}>
//               <Ionicons name="call" size={22} color="#6200EE" />
//               <MaterialIcons name="chat" size={22} color="#6200EE" />
//             </View>
//           </View>
//         </View>

//         {/* Date/Time Card */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Booking Date</Text>
//           <Text style={styles.bigDate}>
//             {moment(bookingDetails.date).format('MMMM D, YYYY')}
//           </Text>
//           <Text style={styles.timeText}>⏰ {bookingDetails.timeslot}</Text>
//         </View>

//         {/* Services Card */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Services</Text>
//           <View style={styles.serviceRow}>
//             <Text style={styles.serviceText}>{bookingDetails.service}</Text>
//             <Text style={styles.priceText}>₹{bookingDetails.bill_amount.toLocaleString()}</Text>
//           </View>
//         </View>

//         {/* Total Amount Card */}
//         <View style={[styles.card, styles.totalCard]}>
//           <Text style={styles.totalText}>Total Amount</Text>
//           <Text style={styles.totalAmount}>₹{bookingDetails.bill_amount.toLocaleString()}</Text>
//         </View>
//       </ScrollView>

//       {/* Payment Buttons at Bottom */}
//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={[styles.payButton, { backgroundColor: '#03A9F4' }]} onPress={() => handlePayment("later")}>
//           <Text style={styles.payButtonText}>Pay Later</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.payButton, { backgroundColor: '#6200EE' }]} onPress={() => handlePayment("now")}>
//           <Text style={styles.payButtonText}>Pay Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PaymentScreen;



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 15,
//     marginHorizontal: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 6,
//     color: '#333',
//   },
//   subText: {
//     fontSize: 13,
//     color: 'gray',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 45,
//     height: 45,
//     borderRadius: 22,
//     backgroundColor: '#E0E0E0',
//     marginRight: 10,
//   },
//   stylistName: {
//     fontWeight: '600',
//     fontSize: 15,
//   },
//   rating: {
//     fontSize: 13,
//     color: 'gray',
//     marginTop: 2,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     gap: 18,
//   },
//   bigDate: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#222',
//     marginTop: 5,
//   },
//   timeText: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   serviceText: {
//     fontSize: 14,
//     color: '#444',
//   },
//   priceText: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   totalCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   totalText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   totalAmount: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#6200EE',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//   },
//   payButton: {
//     flex: 1,
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   payButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   pageHeader: {
//     paddingVertical: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   pageTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginBottom: 10,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#222',
//   },
// });




// import React from 'react';
// import { View, Button, Alert, StyleSheet } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
// import axios from 'axios'; // Install with: npx expo install axios

// const PaymentScreen = () => {
//   const handlePayment = async () => {
//     try {
//       // Step 1: Call backend API to create Razorpay order
//       const response = await axios.post('https://your-backend-url.com/create-order', {
//         amount: 50, // Example amount in INR (adjust as needed)
//       });

//       const { order_id } = response.data; // Assume backend returns { order_id: '...' }

//       // Step 2: If order created, open Razorpay checkout
//       const options = {
//         description: 'Purchase of goods',
//         image: 'https://your-logo-url.com/logo.png',
//         currency: 'INR',
//         key: 'YOUR_RAZORPAY_KEY_ID', // From Razorpay dashboard
//         amount: '5000', // Amount in paise (50 INR = 5000 paise)
//         name: 'Your Company Name',
//         order_id: order_id, // From backend response
//         prefill: {
//           email: 'customer@example.com',
//           contact: '9999999999',
//           name: 'Customer Name',
//         },
//         theme: { color: '#F37254' },
//       };

//       const data = await RazorpayCheckout.open(options);
//       // Handle success (e.g., verify on backend)
//       Alert.alert('Success', Payment ID: ${data.razorpay_payment_id});
//     } catch (error) {
//       // Handle errors (e.g., network, order creation failure, payment failure)
//       Alert.alert('Error', error.message || 'Something went wrong');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pay Now" onPress={handlePayment} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PaymentScreen;