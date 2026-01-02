// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   FlatList, 
//   TouchableOpacity, 
//   StatusBar,
//   SafeAreaView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import PaymentSummary from './PaymentSummary';
// import moment from 'moment';

// const payments = [
//   {
//     id: '1',
//     service: 'Head massage',
//     date: '2025-07-20T14:30:00',
//     amount: 1200,
//     status: 'Paid',
//     payment_mode: 'UPI',
//     transaction_date: '2025-07-20T14:32:18',
//     transaction_id: 'TXN123456',
//     booking: 'BK12345',
//     customer: 'John Doe',
//   },
//   {
//     id: '2',
//     service: 'Hair cut',
//     date: '2025-07-25T11:15:00',
//     amount: 800,
//     status: 'Pending',
//     payment_mode: 'Cash',
//     transaction_date: '2025-07-25T11:15:00',
//     transaction_id: 'TXN654321',
//     booking: 'BK54321',
//     customer: 'Alice Smith',
//   },
//   {
//     id: '3',
//     service: 'Waxing',
//     date: '2025-07-29T16:45:00',
//     amount: 500,
//     status: 'Paid',
//     payment_mode: 'Card',
//     transaction_date: '2025-07-29T16:47:22',
//     transaction_id: 'TXN789012',
//     booking: 'BK98765',
//     customer: 'Bob Johnson',
//   },
//   {
//     id: '4',
//     service: 'Nail polish',
//     date: '2025-08-01T13:00:00',
//     amount: 650,
//     status: 'Paid',
//     payment_mode: 'Net Banking',
//     transaction_date: '2025-08-01T13:02:45',
//     transaction_id: 'TXN456789',
//     booking: 'BK67890',
//     customer: 'Carol White',
//   },
// ];

// const CustomerPayments = () => {
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   const getPaymentIcon = (paymentMode) => {
//     switch(paymentMode.toLowerCase()) {
//       case 'upi': return 'smartphone';
//       case 'cash': return 'money';
//       case 'card': return 'credit-card';
//       case 'net banking': return 'account-balance';
//       default: return 'payment';
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       style={[
//         styles.card, 
//         item.status === 'Pending' && styles.pendingCard
//       ]} 
//       onPress={() => setSelectedPayment(item)}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.serviceIcon}>
//           <Icon 
//             name={getPaymentIcon(item.payment_mode)} 
//             size={24} 
//             color={item.status === 'Paid' ? '#4CAF50' : '#FF9800'} 
//           />
//         </View>
//         <View style={styles.serviceInfo}>
//           <Text style={styles.serviceName}>{item.service}</Text>
//           <Text style={styles.serviceDate}>
//             {moment(item.date).format('MMM D, YYYY • h:mm A')}
//           </Text>
//         </View>
//         <View style={styles.amountContainer}>
//           <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
//           <View style={[
//             styles.statusBadge,
//             item.status === 'Paid' ? styles.paidBadge : styles.pendingBadge
//           ]}>
//             <Text style={styles.statusText}>{item.status}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.cardFooter}>
//         <Text style={styles.paymentMode}>
//           {item.payment_mode} • {item.booking}
//         </Text>
//         <Icon name="chevron-right" size={20} color="#888" />
//       </View>
//     </TouchableOpacity>
//   );

//   if (selectedPayment) {
//     return <PaymentSummary payment={selectedPayment} goBack={() => setSelectedPayment(null)} />;
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.heading}>Payment History</Text>
//           <TouchableOpacity style={styles.filterBtn}>
//             <Icon name="filter-list" size={22} color="#6C63FF" />
//           </TouchableOpacity>
//         </View>
        
//         <FlatList
//           data={payments}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <Icon name="receipt" size={60} color="#E0E0E0" />
//               <Text style={styles.emptyText}>No payments found</Text>
//             </View>
//           }
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#333',
//   },
//   filterBtn: {
//     padding: 8,
//   },
//   listContent: {
//     paddingBottom: 30,
//   },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   pendingCard: {
//     borderLeftWidth: 4,
//     borderLeftColor: '#FF9800',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   serviceIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F5F5F5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   serviceInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   serviceName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 2,
//   },
//   serviceDate: {
//     fontSize: 13,
//     color: '#888',
//   },
//   amountContainer: {
//     alignItems: 'flex-end',
//   },
//   amount: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 4,
//   },
//   statusBadge: {
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   paidBadge: {
//     backgroundColor: '#E8F5E9',
//   },
//   pendingBadge: {
//     backgroundColor: '#FFF3E0',
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//   },
//   paymentMode: {
//     fontSize: 13,
//     color: '#666',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 60,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#999',
//     marginTop: 16,
//   },
// });

// export default CustomerPayments;



import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PaymentSummary from './PaymentSummary';
import moment from 'moment';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import { useCallback } from 'react';

const CustomerPayments = () => {
  const { customer } = useAuth();
  const customerId = customer?.data?.customer_id;
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch appointments for this customer
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/customer/${customerId}/`
      );

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid data format received from server');
      }

      // Filter only paid appointments and transform data
      const paidAppointments = response.data.filter(
        appointment => appointment.payment_status === 'Paid'
      );

      const transformedPayments = paidAppointments.map(appointment => {
        const service = appointment.appointment_services?.[0];
        const serviceName = service?.service_name || 'Service';

        return {
          id: appointment.id.toString(),
          service: serviceName,
          date: appointment.start_datetime,
          amount: parseFloat(appointment.bill_amount) || 0,
          status: appointment.payment_status,
          payment_mode: appointment.payment_mode,
          transaction_date: appointment.payment_time || appointment.updated_at,
          transaction_id: appointment.razorpay_payment_id || `TXN${appointment.id}`,
          booking: `BK${appointment.id}`,
          customer: customer?.data?.full_name || 'Customer',
          appointmentData: appointment // Keep original data for details view
        };
      });

      // Sort by date (newest first)
      const sortedPayments = transformedPayments.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setPayments(sortedPayments);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to load payment history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refetch whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (customerId) {
        fetchPayments();
      }
    }, [customerId])
  );

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

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.card, 
        item.status === 'Pending' && styles.pendingCard
      ]} 
      onPress={() => setSelectedPayment(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.serviceIcon}>
          <Icon 
            name={getPaymentIcon(item.payment_mode)} 
            size={24} 
            color={item.status === 'Paid' ? '#4CAF50' : '#FF9800'} 
          />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.serviceDate}>
            {moment(item.date).format('MMM D, YYYY • h:mm A')}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
          <View style={[
            styles.statusBadge,
            item.status === 'Paid' ? styles.paidBadge : styles.pendingBadge
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.paymentMode}>
          {item.payment_mode} • {item.booking}
        </Text>
        <Icon name="chevron-right" size={20} color="#888" />
      </View>
    </TouchableOpacity>
  );

  if (selectedPayment) {
    return <PaymentSummary payment={selectedPayment} goBack={() => setSelectedPayment(null)} />;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2F4EAA" />
          <Text style={styles.loadingText}>Loading payment history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={50} color="#2F4EAA" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchPayments}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Payment History</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="filter-list" size={22} color="#6C63FF" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={payments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="receipt" size={60} color="#E0E0E0" />
              <Text style={styles.emptyText}>No payments found</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e9ecf0ff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    // fontWeight: '700',
      fontFamily: 'Inter_700Bold', 
    color: '#333',
  },
  filterBtn: {
    padding: 8,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 16,
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  serviceDate: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Inter_400Regular', 
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    // fontWeight: '700',
      fontFamily: 'Inter_700Bold',
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  paidBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold', 
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  paymentMode: {
    fontSize: 13,
    color: '#666',
     fontFamily: 'Inter_400Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
     fontFamily: 'Inter_400Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
      fontFamily: 'Inter_500Medium',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginVertical: 16,
     fontFamily: 'Inter_500Medium', 
  },
  retryButton: {
    backgroundColor: '#2F4EAA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    // fontWeight: '600',
     fontFamily: 'Inter_600SemiBold',
  },
});

export default CustomerPayments;