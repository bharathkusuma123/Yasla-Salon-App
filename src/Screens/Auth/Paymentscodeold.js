

  const options = { 
    key: data.razorpay_key_id,
    amount: data.amount_paise,
    currency: "INR",
    order_id: data.order_id,
    name: "Payment",
    description: "Appointment Payment",
    prefill: { 
      name: data.customer_name,
      email: data.customer_email,
      contact: data.customer_contact,
    },
    theme: { color: "#F37254" }
  };

  if (Platform.OS === "android" || Platform.OS === "ios") {
    // ✅ Mobile Native SDK
    RazorpayCheckout.open(options)
      .then((paymentData) => {
        console.log("✅ Payment success:", paymentData);
        Alert.alert("Payment Successful", JSON.stringify(paymentData));
      })
      .catch((error) => {
        console.error("❌ Payment failed:", error);
        Alert.alert("Payment Failed", error.description || "Unknown error");
      });
  } else if (Platform.OS === "web") {
    // ✅ Web using Razorpay Checkout.js
    const rzp = new window.Razorpay({
      ...options,
      handler: function (response) {
        console.log("✅ Payment success (web):", response);
        alert("Payment Successful: " + JSON.stringify(response));
      },
      modal: {
        ondismiss: function () {
          console.warn("❌ Checkout form closed");
        },
      },
    });

    rzp.open();
  } else {
    Alert.alert("Unsupported Platform", "Payments not supported on this platform.");
  }

