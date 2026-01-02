// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useAuth } from '../../Context/AuthContext';

// const CustomerDataScreen = () => {
//   const { customer } = useAuth();

//   if (!customer) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>No customer data available.</Text>
//       </View>
//     );
//   }

//   const data = customer.data || {};
//   console.log('Customer Data:', data);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Customer Details</Text>

//       <View style={styles.item}>
//         <Text style={styles.label}>Customer ID:</Text>
//         <Text style={styles.value}>{data.customer_id || 'N/A'}</Text>
//       </View>

//       <View style={styles.item}>
//         <Text style={styles.label}>Full Name:</Text>
//         <Text style={styles.value}>{data.full_name || 'N/A'}</Text>
//       </View>

//       <View style={styles.item}>
//         <Text style={styles.label}>Gender:</Text>
//         <Text style={styles.value}>{data.gender || 'N/A'}</Text>
//       </View>

//       <View style={styles.item}>
//         <Text style={styles.label}>Phone:</Text>
//         <Text style={styles.value}>{data.phone || 'N/A'}</Text>
//       </View>

     
//     </ScrollView>
//   );
// };

// export default CustomerDataScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#FF6B6B',
//   },
//   item: {
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   value: {
//     fontSize: 16,
//     color: '#333',
//     marginTop: 4,
//   },
//   debugText: {
//     fontSize: 12,
//     color: '#666',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 6,
//     fontFamily: 'monospace',
//     marginTop: 4,
//   },
// });



import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';

const CustomerDataScreen = ({ navigation }) => {
  const { customer } = useAuth();

  if (!customer) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No customer data available.</Text>
      </View>
    );
  }

  const data = customer.data || {};
  console.log('Customer Data:', data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customer Details</Text>

      <View style={styles.item}>
        <Text style={styles.label}>Customer ID:</Text>
        <Text style={styles.value}>{data.customer_id || 'N/A'}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{data.full_name || 'N/A'}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{data.gender || 'N/A'}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{data.phone || 'N/A'}</Text>
      </View>

      <TouchableOpacity 
        style={styles.nextButton}
     onPress={() => navigation.navigate('CScreen1', {
  customerId: data.customer_id
})}
      >
        <Text style={styles.nextButtonText}>Go to Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomerDataScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF6B6B',
  },
  item: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});