import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  const handleSelectRole = (role) => {
    navigation.navigate('Signup', { role }); // Navigate directly to Signup with role
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Yasla Salon!</Text>
      <Text style={styles.subtitle}>
        Are you using the app as a <Text style={styles.bold}>Customer</Text> or{' '}
        <Text style={styles.bold}>Vendor</Text>?
      </Text>

      <View style={styles.cardContainer}>
        {/* Customer Card */}
        <TouchableOpacity
          style={[styles.card, styles.customerCard]}
          onPress={() => handleSelectRole('customer')}
        >
          <FontAwesome5 name="user" size={36} color="#FF6B6B" style={styles.icon} />
          <Text style={styles.cardText}>I'm a Customer</Text>
          <Text style={styles.cardSubtext}>Book salon services</Text>
        </TouchableOpacity>

        {/* Vendor Card */}
        <TouchableOpacity
          style={[styles.card, styles.vendorCard]}
          onPress={() => handleSelectRole('vendor')}
        >
          <FontAwesome5 name="store" size={36} color="#4CAF50" style={styles.icon} />
          <Text style={styles.cardText}>I'm a Vendor</Text>
          <Text style={styles.cardSubtext}>Manage my salon business</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.loginLink} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  bold: {
    fontWeight: '600',
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.4,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  customerCard: {
    borderTopWidth: 4,
    borderTopColor: '#FF6B6B',
  },
  vendorCard: {
    borderTopWidth: 4,
    borderTopColor: '#4CAF50',
  },
  icon: {
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default RoleSelectionScreen;