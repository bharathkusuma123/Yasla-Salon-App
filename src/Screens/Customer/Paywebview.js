import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";

const Paywebview = () => {
  const webviewRef = useRef(null);

  const handlePayment = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Razorpay Payment</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <script>
          var options = {
            "key": "rzp_test_gtsY5EoDDxy1yZ", // Replace with your Razorpay API key
            "amount": "5000", // Amount in paise (5000 = ₹50)
            "currency": "INR",
            "name": "Foo Corp",
            "description": "Credits towards consultation",
            "image": "https://i.imgur.com/3g7nmJC.png",
            "handler": function (response){
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: "success",
                payment_id: response.razorpay_payment_id
              }));
            },
            "prefill": {
              "name": "Razorpay Software",
              "email": "void@razorpay.com",
              "contact": "9191919191"
            },
            "theme": {
              "color": "#F37254"
            }
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
        </script>
      </body>
      </html>
    `;

    // Load the payment page inside WebView
    webviewRef.current.injectJavaScript(`
      document.body.innerHTML = \`${htmlContent}\`;
    `);
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.status === "success") {
        Alert.alert("✅ Payment Successful", `Payment ID: ${data.payment_id}`);
      }
    } catch (error) {
      console.log("WebView Message Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay with Razorpay</Text>
      </TouchableOpacity>

      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        style={{ flex: 1, display: "none" }} // keep hidden until needed
      />
    </View>
  );
};

export default Paywebview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#F37254",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
