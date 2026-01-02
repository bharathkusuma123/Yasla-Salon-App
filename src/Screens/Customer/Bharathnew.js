import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
console.log("RazorpayCheckout:", RazorpayCheckout);
const PaymentScreen = () => {


  const handlePayment = async () => {
    var options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_gtsY5EoDDxy1yZ", // Replace with your Razorpay API key
      amount: "5000", // amount in paise (5000 = ₹50)
      name: "Foo Corp",
      prefill: {
        email: "void@razorpay.com",
        contact: "9191919191",
        name: "Razorpay Software",
      },
      theme: { color: "#F37254" },
    };


    console.log("RazorpayCheckout.open:", RazorpayCheckout.open); // Check if open is defined
    console.log("Is RazorpayCheckout.open defined?", typeof RazorpayCheckout.open === "function");

 // Check if RazorpayCheckout and its open method exist
if (typeof RazorpayCheckout === "undefined" || RazorpayCheckout === null || typeof RazorpayCheckout.open !== "function") {
  Alert.alert("❌ Error", "RazorpayCheckout is not available or not properly initialized!");
//   return;
}

// If checks pass, proceed with opening RazorpayCheckout
try {
  console.log("Starting payment process...");
  const data = await RazorpayCheckout.open(options);
  Alert.alert("Success", "Payment processed successfully!");
  console.log("✅ Payment successful:", data);
} catch (error) {
  Alert.alert("❌ Error", `Payment failed: ${error.description || error.message}`);
  console.log("❌ Payment failed:", error);
}

//     RazorpayCheckout.open(options)
//       .then((data) => {
//         // handle success
//         Alert.alert("✅ Success", `Payment ID: ${data.razorpay_payment_id}`);
//       })
//       .catch((error) => {
//         // handle failure
//                 console.error("❌ Payment failed:", error);

//         Alert.alert("❌ Error", `${error} | ${error.description}`);
//       });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Razorpay Payment Example</Text>
      <TouchableHighlight style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#F37254",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
