import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './SalonSelection.styles';
import { useAuth } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FilterTabs from './FilterTabs';
import * as Location from 'expo-location';

// Random salon images
const salonImages = [
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500',
  'https://images.unsplash.com/photo-1519664824562-b4bc73f9795a?w=500',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500'
];

// Random stylist images
const stylistImages = [
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500'
];

const SalonSelectionScreen = ({ route }) => {
  const [salons, setSalons] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});
  const [availableStylists, setAvailableStylists] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState(null);
  const [favoriteSalons, setFavoriteSalons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [serviceDetailsBySalonId, setServiceDetailsBySalonId] = useState({});

  const { customer } = useAuth();
  const customerId = customer?.data?.customer_id;
  const { selectedServices, selectedTimeSlot, selectedDate } = route.params;
  const navigation = useNavigation();

  // Fetch favorite salons
  useEffect(() => {
    const fetchFavoriteSalons = async () => {
      if (!customerId) return;

      setLoadingFavorites(true);
      try {
        const response = await axios.get(`https://yaslaservice.com:81/customer/${customerId}/favorites/`);
        if (response.data.success) {
          setFavoriteSalons(response.data.favorites);
        }
      } catch (error) {
        console.error("Error fetching favorite salons:", error);
      } finally {
        setLoadingFavorites(false);
      }
    };

    fetchFavoriteSalons();
  }, [customerId]);

  // Function to check if a salon is in favorites
  const isSalonFavorite = (salonId) => {
    return favoriteSalons.some(fav => fav.id === salonId);
  };

  // Function to check if a favorite salon offers the selected service
  const favoriteOffersService = (salonId) => {
    return serviceDetailsBySalonId.hasOwnProperty(salonId);
  };

  // Function to handle favorite salon selection
  const handleFavoriteSalonSelect = (salonId) => {
    // Check if this salon offers the selected service
    const salonOffersService = favoriteOffersService(salonId);

    if (salonOffersService) {
      // Find the complete salon data from the main salons list
      const favoriteSalon = salons.find(salon => salon.id === salonId);
      if (favoriteSalon) {
        handleSalonSelect(salonId);
      }
    } else {
      Alert.alert(
        "Service Not Available",
        "This salon doesn't offer the selected service. Please choose another salon.",
        [{ text: "OK" }]
      );
    }
  };

  const renderFavoriteSalons = () => {
    if (loadingFavorites) {
      return (
        <View style={styles.favoriteSection}>
          <Text style={styles.sectionTitle}>Your Favorites</Text>
          <ActivityIndicator size="small" color="#6C63FF" />
        </View>
      );
    }

    if (favoriteSalons.length === 0) {
      return null; // Don't show favorites section if no favorites
    }

    return (
      <View style={styles.favoriteSection}>
        <Text style={styles.sectionTitle}>Your Favorite Salons</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteScrollView}>
          {favoriteSalons.map((favorite) => {
            // Find the complete salon data with images and other details
            const salonData = salons.find(salon => salon.id === favorite.id);
            const offersService = favoriteOffersService(favorite.id);

            return (
              <TouchableOpacity
                key={favorite.id}
                style={[
                  styles.favoriteSalonCard,
                  selectedSalon === favorite.id && styles.selectedFavoriteSalonCard,
                  !offersService && styles.unavailableFavoriteSalonCard
                ]}
                onPress={() => offersService ? handleFavoriteSalonSelect(favorite.id) : null}
                disabled={!offersService}
              >
                <Image
                  source={{ uri: salonData?.image || salonImages[0] }}
                  style={styles.favoriteSalonImage}
                />
                <View style={styles.favoriteSalonInfo}>
                  <Text style={styles.favoriteSalonName}>{favorite.salon_name}</Text>
                  <Text style={styles.favoriteSalonAddress}>{favorite.locality}, {favorite.city}</Text>
                  {salonData && offersService ? (
                    <View style={styles.favoriteSalonMeta}>
                      <Text style={styles.favoriteSalonRating}>★ {salonData.rating || "4.5"}</Text>
                      <Text style={styles.favoriteSalonPrice}>₹{salonData.price}</Text>
                    </View>
                  ) : (
                    <View style={styles.unavailableServiceContainer}>
                      <Text style={styles.unavailableServiceText}>Service not available</Text>
                    </View>
                  )}
                </View>
                {/* <FontAwesome 
                  name="heart" 
                  size={20} 
                  color="#FF6B6B" 
                  style={styles.favoriteHeartIcon} 
                /> */}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // Convert local time to UTC
  const localTimeToUTC = (dateStr, time12h) => {
    const [time, period] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const date = new Date(dateStr);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    return date.toISOString();
  };

  // Convert UTC to local time for display
  const utcToLocalTime = (utcString) => {
    const date = new Date(utcString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Check stylist availability for the selected time slot
  const checkStylistAvailability = async (stylistId) => {
    try {
      const response = await axios.get(
        `https://yaslaservice.com:81/appointments/stylist/${stylistId}/?start_date=${selectedDate}`
      );

      const bookedTimeSlots = response.data.map(appointment => {
        return utcToLocalTime(appointment.start_datetime);
      });

      // Check if our selected time slot is booked
      const isBooked = bookedTimeSlots.includes(selectedTimeSlot);

      return !isBooked; // Return true if available, false if booked
    } catch (error) {
      console.error("Error checking stylist availability:", error);
      return false; // Assume not available if there's an error
    }
  };

  // Filter stylists based on selected salon AND availability
  const filterAvailableStylists = async (salonId) => {
    const salonStylists = stylists.filter(stylist => stylist.salon === salonId);
    const available = [];

    for (const stylist of salonStylists) {
      const isAvailable = await checkStylistAvailability(stylist.id);
      if (isAvailable) {
        available.push(stylist);
      }
    }

    setAvailableStylists(available);
  };

  // When salon selection changes, check availability of its stylists
  useEffect(() => {
    if (selectedSalon) {
      filterAvailableStylists(selectedSalon);
    } else {
      setAvailableStylists([]);
    }
  }, [selectedSalon, selectedDate, selectedTimeSlot]);

  // Fetch initial data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // First fetch the salons that offer the selected service
  //       const serviceSalonsRes = await axios.get(`https://yaslaservice.com:81/salons/service/${selectedServices[0].id}/`);
  //       const serviceSalonsData = serviceSalonsRes.data;

  //       // Process service details
  //       const serviceDetails = {};
  //       serviceSalonsData.forEach(serviceSalon => {
  //         const seconds = parseFloat(serviceSalon.completion_time);
  //         const minutes = Math.round(seconds / 60);
  //         serviceDetails[serviceSalon.salon_id] = {
  //           cost: serviceSalon.cost,
  //           completionTime: minutes
  //         };
  //       });

  //       setServiceDetailsBySalonId(serviceDetails);

  //       // Then fetch all salons and stylists
  //       const [salonsRes, stylistsRes] = await Promise.all([
  //         axios.get('https://yaslaservice.com:81/salons/'),
  //         axios.get('https://yaslaservice.com:81/users/')
  //       ]);

  //       // Process salons data...
  //       const salonsData = salonsRes.data.data
  //         .filter(salon => serviceDetails.hasOwnProperty(salon.id))
  //         .map((salon, index) => ({
  //           ...salon,
  //           image: salonImages[index % salonImages.length],
  //           price: serviceDetails[salon.id].cost,
  //           completionTime: `${serviceDetails[salon.id].completionTime} mins`,
  //           distance: Math.floor(Math.random() * 10) + 1,
  //           rating: (Math.random() * 1 + 4).toFixed(1)
  //         }));

  //       // Process stylists data
  //       const usersData = stylistsRes.data.data;
  //       const stylistsWithRole = usersData
  //         .filter(user => user.user_role === 'Stylist')
  //         .map((stylist, index) => ({
  //           ...stylist,
  //           profile_pic: stylistImages[index % stylistImages.length]
  //         }));

  //       setSalons(salonsData);
  //       setStylists(stylistsWithRole);
  //     } catch (err) {
  //       console.error(err);
  //       Alert.alert("Error", "Failed to fetch salons or stylists");
  //     }
  //   };

  //   fetchData();
  // }, [selectedServices]);


  // Inside your SalonSelectionScreen.js

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // First fetch the salons that offer the selected service
  //       const serviceSalonsRes = await axios.get(`https://yaslaservice.com:81/salons/service/${selectedServices[0].id}/`);
  //       const serviceSalonsData = serviceSalonsRes.data;

  //       // Process service details
  //       const serviceDetails = {};
  //       serviceSalonsData.forEach(serviceSalon => {
  //         const seconds = parseFloat(serviceSalon.completion_time);
  //         const minutes = Math.round(seconds / 60);
  //         serviceDetails[serviceSalon.salon_id] = {
  //           cost: serviceSalon.cost,
  //           completionTime: minutes
  //         };
  //       });

  //       setServiceDetailsBySalonId(serviceDetails);

  //       // Fetch salons, stylists, and feedbacks together
  //       const [salonsRes, stylistsRes, feedbacksRes] = await Promise.all([
  //         axios.get('https://yaslaservice.com:81/salons/'),
  //         axios.get('https://yaslaservice.com:81/users/'),
  //         axios.get('https://yaslaservice.com:81/feedbacks/')
  //       ]);

  //       // Process stylists
  //       const usersData = stylistsRes.data.data;
  //       const stylistsWithRole = usersData
  //         .filter(user => user.user_role === 'Stylist')
  //         .map((stylist, index) => ({
  //           ...stylist,
  //           profile_pic: stylistImages[index % stylistImages.length]
  //         }));

  //       setStylists(stylistsWithRole);

  //       // Create stylistId -> ratings[]
  //       const feedbacks = feedbacksRes.data.data || [];
  //       const stylistRatingsMap = {};
  //       feedbacks.forEach(fb => {
  //         if (!stylistRatingsMap[fb.stylist]) {
  //           stylistRatingsMap[fb.stylist] = [];
  //         }
  //         stylistRatingsMap[fb.stylist].push(fb.rating);
  //       });

  //       // Create salonId -> ratings[]
  //       const salonRatingsMap = {};
  //       stylistsWithRole.forEach(stylist => {
  //         const ratings = stylistRatingsMap[stylist.id] || [];
  //         if (ratings.length > 0) {
  //           if (!salonRatingsMap[stylist.salon]) {
  //             salonRatingsMap[stylist.salon] = [];
  //           }
  //           salonRatingsMap[stylist.salon].push(...ratings);
  //         }
  //       });

  //       // Process salons
  //       const salonsData = salonsRes.data.data
  //         .filter(salon => serviceDetails.hasOwnProperty(salon.id))
  //         .map((salon, index) => {
  //           const ratings = salonRatingsMap[salon.id] || [];
  //           const avgRating =
  //             ratings.length > 0
  //               ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
  //               : "4.0"; // fallback rating if no feedback yet

  //           return {
  //             ...salon,
  //             image: salonImages[index % salonImages.length],
  //             price: serviceDetails[salon.id].cost,
  //             completionTime: `${serviceDetails[salon.id].completionTime} mins`,
  //             distance: Math.floor(Math.random() * 10) + 1,
  //             rating: avgRating
  //           };
  //         });

  //       setSalons(salonsData);
  //     } catch (err) {
  //       console.error(err);
  //       Alert.alert("Error", "Failed to fetch salons or stylists");
  //     }
  //   };

  //   fetchData();
  // }, [selectedServices]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- Step 1: Fetch details for all selected services ---
        let serviceDetails = {};

        for (const service of selectedServices) {
          const res = await axios.get(
            `https://yaslaservice.com:81/salons/service/${service.id}/`
          );

          res.data.forEach(serviceSalon => {
            const seconds = parseFloat(serviceSalon.completion_time);
            const minutes = Math.round(seconds / 60);

            // if (!serviceDetails[serviceSalon.salon_id]) {
            //   serviceDetails[serviceSalon.salon_id] = {
            //     cost: 0,
            //     completionTime: 0
            //   };
            // }

            // serviceDetails[serviceSalon.salon_id].cost += serviceSalon.cost;
            // serviceDetails[serviceSalon.salon_id].completionTime += minutes;


            if (!serviceDetails[serviceSalon.salon_id]) {
              serviceDetails[serviceSalon.salon_id] = {
                cost: 0,
                completionTime: 0,
                services: []   // ✅ store per-service info
              };
            }

            serviceDetails[serviceSalon.salon_id].cost += serviceSalon.cost;
            serviceDetails[serviceSalon.salon_id].completionTime += minutes;

            serviceDetails[serviceSalon.salon_id].services.push({
              id: service.id,
              name: service.name,
              price: serviceSalon.cost,
              time: minutes
            });

          });
        }

        setServiceDetailsBySalonId(serviceDetails);

        // --- Step 2: Fetch salons, stylists, feedbacks together ---
        const [salonsRes, stylistsRes, feedbacksRes] = await Promise.all([
          axios.get('https://yaslaservice.com:81/salons/'),
          axios.get('https://yaslaservice.com:81/users/'),
          axios.get('https://yaslaservice.com:81/feedbacks/')
        ]);

        // Process stylists
        const usersData = stylistsRes.data.data;
        const stylistsWithRole = usersData
          .filter(user => user.user_role === 'Stylist')
          .map((stylist, index) => ({
            ...stylist,
            profile_pic: stylistImages[index % stylistImages.length]
          }));

        setStylists(stylistsWithRole);

        // Process feedback → salon ratings
        const feedbacks = feedbacksRes.data.data || [];
        const stylistRatingsMap = {};
        feedbacks.forEach(fb => {
          if (!stylistRatingsMap[fb.stylist]) {
            stylistRatingsMap[fb.stylist] = [];
          }
          stylistRatingsMap[fb.stylist].push(fb.rating);
        });

        const salonRatingsMap = {};
        stylistsWithRole.forEach(stylist => {
          const ratings = stylistRatingsMap[stylist.id] || [];
          if (ratings.length > 0) {
            if (!salonRatingsMap[stylist.salon]) {
              salonRatingsMap[stylist.salon] = [];
            }
            salonRatingsMap[stylist.salon].push(...ratings);
          }
        });

        // --- Step 3: Build salons list with total price ---
        const salonsData = salonsRes.data.data
          .filter(salon => serviceDetails.hasOwnProperty(salon.id))
          .map((salon, index) => {
            const ratings = salonRatingsMap[salon.id] || [];
            const avgRating =
              ratings.length > 0
                ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
                : "4.0";

            // return {
            //   ...salon,
            //   image: salonImages[index % salonImages.length],
            //   price: serviceDetails[salon.id].cost, // ✅ total price of multiple services
            //   completionTime: `${serviceDetails[salon.id].completionTime} mins`, // ✅ total time
            //    services: serviceDetails[salon.id].services,  
            //   distance: Math.floor(Math.random() * 10) + 1,
            //   rating: avgRating
            // };


            return {
              ...salon,
              image: salonImages[index % salonImages.length],
              price: serviceDetails[salon.id].cost,
              completionTime: `${serviceDetails[salon.id].completionTime} mins`,
              services: serviceDetails[salon.id].services,   // ✅ include per-service list
              distance: Math.floor(Math.random() * 10) + 1,
              rating: avgRating
            };
          });

        setSalons(salonsData);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to fetch salons or stylists");
      }
    };

    fetchData();
  }, [selectedServices]);


  // Filter salons based on active filter
  const filteredSalons = React.useMemo(() => {
    if (!salons.length) return [];

    let result = [...salons];

    // Apply sorting filters
    switch (activeFilter) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'nearby':
      default:
        result.sort((a, b) => a.distance - b.distance);
    }

    return result;
  }, [salons, activeFilter]);

  // Filter stylists based on selected salon
  const filteredStylists = React.useMemo(() => {
    if (!selectedSalon) return [];
    return stylists.filter(stylist => stylist.salon === selectedSalon);
  }, [selectedSalon, stylists]);

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location permission to show nearby salons');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (salons.length > 0) {
        sortSalonsByDistance(location.coords.latitude, location.coords.longitude);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your location');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const sortSalonsByDistance = (userLat, userLon) => {
    const salonsWithDistance = salons.map(salon => {
      const salonLat = parseFloat(salon.latitude);
      const salonLon = parseFloat(salon.longitude);
      const distance = calculateDistance(userLat, userLon, salonLat, salonLon);
      return {
        ...salon,
        distance: parseFloat(distance.toFixed(1))
      };
    });

    salonsWithDistance.sort((a, b) => a.distance - b.distance);
    setSalons(salonsWithDistance);
  };

  const handleFilterChange = (filter) => {
    if (filter === 'nearby') {
      Alert.alert(
        'Use Current Location',
        'We need your location to show nearby salons',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setActiveFilter(''),
          },
          {
            text: 'Allow',
            onPress: () => {
              getUserLocation();
              setActiveFilter('nearby');
            }
          },
        ]
      );
    } else {
      setActiveFilter(filter);
    }
  };

  const handleSalonSelect = (salonId) => {
    setSelectedSalon(salonId === selectedSalon ? null : salonId);
    setSelectedStylist(null);
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist.id === selectedStylist?.id ? null : stylist);
  };

  // const handlePressConfirm = () => {
  //   if (!selectedSalon || !selectedStylist) {
  //     Alert.alert("Incomplete", "Please select salon and stylist");
  //     return;
  //   }

  //   setLoading(true);

  //   const startDateTimeISO = localTimeToUTC(selectedDate, selectedTimeSlot);

  //   const appointmentServices = selectedServices.map(service => ({
  //     service: service.id
  //   }));

  //   const payload = {
  //     salon: selectedSalon,
  //     stylist: selectedStylist.id,
  //     customer: customerId,
  //     start_datetime: startDateTimeISO,
  //     status: "Pending",
  //     payment_status: "Unpaid",
  //     payment_mode: "Card",
  //     customer_message: "Please don't delay the appointment.",
  //     staff_notes: "Customer prefers quiet service.",
  //     appointment_services: appointmentServices
  //   };

  //   console.log("Payload being sent:", JSON.stringify(payload, null, 2));

  //   axios.post('https://yaslaservice.com:81/appointments/', payload)
  //     .then(response => {
  //       setLoading(false);
  //       Alert.alert("Success", "Appointment booked successfully!", [
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             navigation.navigate('BookingsStack'); 
  //           }
  //         }
  //       ]);
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       console.error("Appointment post error:", error);
  //       Alert.alert("Error", "Failed to book appointment. Please try again.");
  //     });
  // };



  const handlePressConfirm = () => {
    if (!selectedSalon || !selectedStylist) {
      Alert.alert("Incomplete", "Please select salon and stylist");
      return;
    }

    const startDateTimeISO = localTimeToUTC(selectedDate, selectedTimeSlot);

    const appointmentServices = selectedServices.map(service => ({
      service: service.id
    }));

    const payload = {
      salon: selectedSalon,
      stylist: selectedStylist.id,
      customer: customerId,
      start_datetime: startDateTimeISO,
      status: "Pending",
      payment_status: "Unpaid",
      payment_mode: "Card",
      customer_message: "Please don't delay the appointment.",
      staff_notes: "Customer prefers quiet service.",
      appointment_services: appointmentServices
    };

    // navigation.navigate('ReviewAppointment1', {
    //   payload,
    //   selectedSalon: salons.find(s => s.id === selectedSalon),
    //   selectedStylist,
    //   selectedServices,
    //   selectedTimeSlot,
    //   selectedDate
    // });

    const selectedSalonObj = salons.find(s => s.id === selectedSalon);

    navigation.navigate('ReviewAppointment1', {
      payload,
      selectedSalon: selectedSalonObj,
      selectedStylist,
      selectedServices: selectedSalonObj.services,   // ✅ includes price + time
      selectedDate,
      selectedTimeSlot,
    });


  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {filteredSalons.length === 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={{ marginTop: 10, fontSize: 16, color: '#FF6B6B' }}>
              Fetching available salons...
            </Text>

          </View>
        ) : (
          <FlatList
            style={styles.container}
            data={filteredSalons}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <View>

                <Text style={styles.selectedDateTime}>
                  Selected: {new Date(selectedDate).toLocaleDateString()} at {selectedTimeSlot}
                </Text>
                {/* Favorite Salons Section */}
                {renderFavoriteSalons()}

                <Text style={styles.sectionTitle}>Select a Salon</Text>
                <FilterTabs
                  activeFilter={activeFilter}
                  setActiveFilter={handleFilterChange}
                  setAvailabilityFilter={setAvailabilityFilter}
                />
              </View>
            )}
            renderItem={({ item: salon }) => (
              <View key={salon.id}>
                <TouchableOpacity
                  style={[
                    styles.salonCard,
                    selectedSalon === salon.id && styles.selectedSalonCard,
                    isSalonFavorite(salon.id) && styles.favoriteSalonIndicator
                  ]}
                  onPress={() => handleSalonSelect(salon.id)}
                >
                  {isSalonFavorite(salon.id) && (
                    <FontAwesome
                      name="heart"
                      size={16}
                      color="#FF6B6B"
                      style={styles.heartIcon}
                    />
                  )}
                  <Image source={{ uri: salon.image }} style={styles.salonImage} />
                  <View style={styles.salonInfo}>
                    <View style={styles.nameAndServicesRow}>
                      <Text style={styles.salonName}>{salon.salon_name}</Text>
                      {/* {selectedServices && selectedServices.length > 0 && (
                        <View style={styles.servicesContainer}>
                          <Text style={styles.servicesTitle}>Selected:</Text>
                          {selectedServices.map((service) => (
                            <Text key={service.id} style={styles.serviceName}>
                              • {service.name}
                            </Text>
                          ))}
                        </View>
                      )} */}

                      {salon.services && salon.services.length > 0 && (
                        <View style={styles.servicesContainer}>
                          <Text style={styles.servicesTitle}>Selected Services:</Text>
                          {salon.services.map(service => (
                            <Text key={service.id} style={styles.serviceName}>
                              • {service.name} - ₹{service.price} ({service.time} mins)
                            </Text>
                          ))}
                          <Text style={styles.totalPriceText}>
                            Total: ₹{salon.price} ({salon.completionTime})
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.salonAddress}>{salon.locality}, {salon.city}</Text>
                    <View style={styles.salonMeta}>
                      <Text style={styles.salonRating}>★ {salon.rating || "4.5"}</Text>
                      <Text style={styles.salonDistance}>{salon.distance} km away</Text>
                      <Text style={styles.salonPrice}>₹{salon.price}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="time-outline" size={13} color="#000000ff" style={{ marginRight: 0 }} />
                        <Text style={styles.salonDistance}>{salon.completionTime}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {selectedSalon === salon.id && (
                  <View style={styles.stylistsSection}>
                    <Text style={styles.sectionTitle}>
                      {availableStylists.length > 0 ? 'Available Stylists' : 'No Available Stylists'}
                    </Text>

                    {availableStylists.length === 0 ? (
                      <View style={styles.noStylistContainer}>
                        <Text style={styles.noStylistText}>
                          No stylists available at {selectedTimeSlot} on {new Date(selectedDate).toLocaleDateString()}
                        </Text>
                        <TouchableOpacity
                          style={styles.selectAnotherTimeButton}
                          onPress={() => navigation.goBack()} // Navigate back to time selection
                        >
                          <Text style={styles.selectAnotherTimeButtonText}>
                            Select Another Time Slot
                          </Text>
                        </TouchableOpacity>
                      </View>

                    ) : (
                      <FlatList
                        horizontal
                        data={availableStylists}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item: stylist }) => (
                          <TouchableOpacity
                            style={[
                              styles.stylistCard,
                              selectedStylist?.id === stylist.id && styles.selectedStylistCard
                            ]}
                            onPress={() => setSelectedStylist(stylist)}
                          >
                            <Image
                              source={{ uri: stylist.profile_pic }}
                              style={[
                                styles.stylistImage,
                                selectedStylist?.id === stylist.id && styles.selectedStylistImage
                              ]}
                            />
                            <Text style={[
                              styles.stylistName,
                              selectedStylist?.id === stylist.id && styles.selectedStylistName
                            ]}>
                              {stylist.full_name}
                            </Text>
                            <Text style={styles.stylistRating}>★ {stylist.rating || "4.5"}</Text>
                            <Text style={styles.stylistSpecialty}>{stylist.specialization || 'Hair Specialist'}</Text>
                          </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.stylistContainer}
                        showsHorizontalScrollIndicator={false}
                      />
                    )}
                  </View>
                )}
              </View>
            )}
          />
        )}

        {/* Confirm Button */}
        {selectedSalon && selectedStylist && (
          <View style={styles.confirmButtonWrapper}>
            <TouchableOpacity style={styles.confirmButton} onPress={handlePressConfirm}>
              <Text style={styles.confirmButtonText}>
                Review Appointment              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Booking your appointment, please wait...</Text>
        </View>
      )}
    </>
  );
};

export default SalonSelectionScreen;