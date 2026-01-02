

//Before guest login  code

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [customer, setCustomer] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for existing auth data on app start
//   useEffect(() => {
//     checkAuthState();
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       const customerData = await AsyncStorage.getItem('customerData');
//       if (customerData) {
//         setCustomer(JSON.parse(customerData));
//       }
//     } catch (error) {
//       console.error('Error retrieving auth data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (customerData) => {
//     try {
//       setCustomer(customerData);
//       await AsyncStorage.setItem('customerData', JSON.stringify(customerData));
//     } catch (error) {
//       console.error('Error saving auth data:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       setCustomer(null);
//       await AsyncStorage.removeItem('customerData');
//     } catch (error) {
//       console.error('Error removing auth data:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ customer, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// below  with guest login code 

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const customerData = await AsyncStorage.getItem('customerData');
      if (customerData) {
        setCustomer(JSON.parse(customerData));
      }
    } catch (error) {
      console.error('Error retrieving auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (customerData) => {
    try {
      setCustomer(customerData);
      await AsyncStorage.setItem('customerData', JSON.stringify(customerData));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  // ✅ Guest login
  const guestLogin = async () => {
    try {
      const guestData = {
        id: 'guest',
        name: 'Guest User',
        isGuest: true,
      };
      setCustomer(guestData);
      await AsyncStorage.setItem('customerData', JSON.stringify(guestData));
    } catch (error) {
      console.error('Error saving guest data:', error);
    }
  };

  const logout = async () => {
    try {
      setCustomer(null);
      await AsyncStorage.removeItem('customerData');
    } catch (error) {
      console.error('Error removing auth data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ customer, login, guestLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
