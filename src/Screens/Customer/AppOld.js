import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Image, Text, Modal, Pressable, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import { AuthProvider, useAuth } from './src/Context/AuthContext';
import LoginScreen from './src/Screens/Auth/LoginScreen';
import SignupScreen from './src/Screens/Auth/SignupScreen'; 
import CustomerTabNavigator from './src/Screens/Customer/CustomerTabNavigator';
import ForgotPassword from './src/Screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from './src/Screens/Auth/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

// Static booking data
const staticBookings = [
  { id: 1, service: 'Haircut', date: 'Today, 3:00 PM' },
  { id: 2, service: 'Manicure', date: 'Tomorrow, 11:00 AM' },
  { id: 3, service: 'Massage', date: 'Friday, 2:30 PM' },
];

// Define styles
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationButton: {
    marginRight: 30,
    position: 'relative',
  },
badge: {
  position: 'absolute',
  right: -6,   // moved closer to center
  top: -4,     // lowered so it's not cutting the bell
  backgroundColor: '#000000',
  borderRadius: 10,
  width: 18,
  height: 18,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,   // ensures badge stays above icon
},
badgeText: {
  color: 'white',
  fontSize: 10,
  fontWeight: 'bold',
},
  logoutButton: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 60,
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationText: {
    fontSize: 14,
  },
  viewAllButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
    alignItems: 'center',
  },
  viewAllText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

// Create a separate component for the header right content
const HeaderRight = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleViewAllBookings = () => {
    setModalVisible(false);
    // Navigate to the Bookings tab
    navigation.navigate('CustomerFlow', {
      screen: 'BookingsStack',
      params: {
        screen: 'CustomerBookings',
      },
    });
  };

  return (
    <View style={styles.headerRightContainer}>
      {/* Notification Bell with Badge */}
      <View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="notifications" size={24} color="#fff" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{staticBookings.length}</Text>
          </View>
        </TouchableOpacity>
        
        {/* Notification Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable 
            style={{ flex: 1 }} 
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {staticBookings.slice(0, 3).map((booking) => (
                  <View key={booking.id} style={styles.notificationItem}>
                    <Text style={styles.notificationText}>{booking.service}</Text>
                    <Text style={[styles.notificationText, { fontSize: 12, color: 'gray' }]}>{booking.date}</Text>
                  </View>
                ))}
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={handleViewAllBookings}
                >
                  <Text style={styles.viewAllText}>View All Bookings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const getHeaderOptions = (navigation) => ({
  headerStyle: { backgroundColor: '#FF6B6B' },
  headerTintColor: '#fff',
  headerTitleAlign: 'left',
  headerTitle: () => (
    <Image
      source={require('./src/Screens/Customer/Images/yasla-logo.jpg')}
      style={{ width: 120, height: 50, resizeMode: 'contain' }}
    />
  ),
  headerRight: () => <HeaderRight navigation={navigation} />,
});

function MainNavigator() {
  const { customer, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {customer ? (
          // User is logged in - show CustomerFlow
          <Stack.Screen 
            name="CustomerFlow" 
            component={CustomerTabNavigator} 
            options={({ navigation }) => ({
              headerShown: true,
              ...getHeaderOptions(navigation),
            })}
          />
        ) : (
          // User is not logged in - show auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}