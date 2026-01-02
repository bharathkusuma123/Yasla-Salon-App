// import React from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';

// const PaymentSummary = ({ payment, goBack }) => {
//   const getPaymentIcon = (paymentMode) => {
//     switch(paymentMode.toLowerCase()) {
//       case 'upi': return 'smartphone';
//       case 'cash': return 'money';
//       case 'card': return 'credit-card';
//       case 'net banking': return 'account-balance';
//       default: return 'payment';
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
//       <ScrollView contentContainerStyle={styles.container}>
//         <TouchableOpacity 
//           onPress={goBack} 
//           style={styles.backBtn}
//           activeOpacity={0.8}
//         >
//           <Icon name="arrow-back" size={24} color="#6C63FF" />
//           <Text style={styles.backText}>Back to Payments</Text>
//         </TouchableOpacity>

//         <View style={styles.header}>
//           <View style={styles.paymentIcon}>
//             <Icon 
//               name={getPaymentIcon(payment.payment_mode)} 
//               size={28} 
//               color="#6C63FF" 
//             />
//           </View>
//           <Text style={styles.heading}>Payment Details</Text>
//         </View>

//         <View style={styles.summaryCard}>
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Amount Paid</Text>
//             <Text style={styles.summaryValue}>₹{payment.amount.toLocaleString()}</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Status</Text>
//             <View style={[
//               styles.statusBadge,
//               payment.status === 'Paid' ? styles.paidBadge : styles.pendingBadge
//             ]}>
//               <Text style={styles.statusText}>{payment.status}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.detailsCard}>
//           <Text style={styles.sectionTitle}>Transaction Information</Text>
          
//           <DetailRow icon="person" label="Customer" value={payment.customer} />
//           <DetailRow icon="shopping-bag" label="Service" value={payment.service} />
//           <DetailRow icon="calendar-today" label="Service Date" 
//             value={moment(payment.date).format('MMM D, YYYY • h:mm A')} />
//           <DetailRow icon="payment" label="Payment Mode" value={payment.payment_mode} />
//           <DetailRow icon="receipt" label="Transaction ID" value={payment.transaction_id} />
//           <DetailRow icon="schedule" label="Transaction Date" 
//             value={moment(payment.transaction_date).format('MMM D, YYYY • h:mm A')} />
//           <DetailRow icon="confirmation-number" label="Booking ID" value={payment.booking} />
//         </View>

      
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const DetailRow = ({ icon, label, value }) => (
//   <View style={styles.detailRow}>
//     <View style={styles.detailIcon}>
//       <Icon name={icon} size={18} color="#888" />
//     </View>
//     <View style={styles.detailText}>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailValue}>{value}</Text>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   backBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   backText: {
//     fontSize: 16,
//     color: '#6C63FF',
//     marginLeft: 8,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   paymentIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#EDEBFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#333',
//   },
//   summaryCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   summaryLabel: {
//     fontSize: 16,
//     color: '#666',
//   },
//   summaryValue: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#F0F0F0',
//     marginVertical: 12,
//   },
//   statusBadge: {
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   paidBadge: {
//     backgroundColor: '#E8F5E9',
//   },
//   pendingBadge: {
//     backgroundColor: '#FFF3E0',
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   detailsCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#444',
//     marginBottom: 16,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   detailIcon: {
//     width: 24,
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   detailText: {
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 13,
//     color: '#888',
//     marginBottom: 2,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#333',
//   },
//   downloadBtn: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#6C63FF',
//     borderRadius: 12,
//   },
//   downloadText: {
//     fontSize: 16,
//     color: '#6C63FF',
//     fontWeight: '600',
//     marginLeft: 8,
//   },
// });

// export default PaymentSummary;




import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import moment from 'moment';

const PaymentSummary = ({ payment, goBack }) => {
  const getPaymentIcon = (paymentMode) => {
    if (!paymentMode) return 'payment';
    
    switch(paymentMode.toLowerCase()) {
      case 'upi': return 'smartphone';
      case 'cash': return 'attach-money';
      case 'card': return 'credit-card';
      case 'net banking': return 'account-balance';
      default: return 'payment';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity 
          onPress={goBack} 
          style={styles.backBtn}
          activeOpacity={0.8}
        >
          <Icon name="arrow-back" size={24} color="#6C63FF" />
          <Text style={styles.backText}>Back to Payments</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.paymentIcon}>
            <Icon 
              name={getPaymentIcon(payment.payment_mode)} 
              size={28} 
              color="#6C63FF" 
            />
          </View>
          <Text style={styles.heading}>Payment Details</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount Paid</Text>
            <Text style={styles.summaryValue}>₹{payment.amount.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <View style={[
              styles.statusBadge,
              payment.status === 'Paid' ? styles.paidBadge : styles.pendingBadge
            ]}>
              <Text style={styles.statusText}>{payment.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Transaction Information</Text>
          
          <DetailRow icon="person" label="Customer" value={payment.customer} />
          <DetailRow icon="shopping-bag" label="Service" value={payment.service} />
          <DetailRow icon="calendar-today" label="Service Date" 
            value={moment(payment.date).format('MMM D, YYYY • h:mm A')} />
          <DetailRow icon="payment" label="Payment Mode" value={payment.payment_mode} />
          <DetailRow icon="receipt" label="Transaction ID" value={payment.transaction_id} />
          <DetailRow icon="schedule" label="Transaction Date" 
            value={moment(payment.transaction_date).format('MMM D, YYYY • h:mm A')} />
          <DetailRow icon="confirmation-number" label="Booking ID" value={payment.booking} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailIcon}>
      <Icon name={icon} size={18} color="#888" />
    </View>
    <View style={styles.detailText}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || 'N/A'}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e9ecf0ff',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
    color: '#6C63FF',
    marginLeft: 8,
     fontFamily: 'Inter_500Medium',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDEBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  heading: {
    fontSize: 24,
    // fontWeight: '700',
      fontFamily: 'Inter_700Bold', 
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
     fontFamily: 'Inter_400Regular',
  },
  summaryValue: {
    fontSize: 20,
    // fontWeight: '700',
      fontFamily: 'Inter_700Bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  paidBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 14,
    // fontWeight: '600',
       fontFamily: 'Inter_600SemiBold',
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    // fontWeight: '600',
      fontFamily: 'Inter_600SemiBold',
    color: '#444',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailIcon: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
       fontFamily: 'Inter_400Regular', 
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_500Medium', 
  }
});

export default PaymentSummary;