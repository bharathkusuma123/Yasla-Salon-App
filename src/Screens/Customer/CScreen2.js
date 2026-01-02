// import React, { useState } from 'react';
// import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import styles from './CScreen2.styles';

// const CScreen2 = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('Popular');
//   const [activeSubCategory, setActiveSubCategory] = useState('Popular');
//   const [selectedItems, setSelectedItems] = useState([]);
//   const navigation = useNavigation();

//   const categories = ['Popular', 'Hair-cut wash&style', 'Hair colour', 'Treatments'];
//   const subCategories = {
//     'Popular': ['Popular', 'Highlights', 'Roots'],
//     'Hair-cut wash&style': ['Popular', 'Highlights', 'Roots'],
//     'Hair colour': ['Popular', 'Highlights', 'Roots'],
//     'Treatments': ['Popular', 'Highlights', 'Roots']
//   };

//   const servicesData = {
//     'Popular': {
//       'Popular': [
//         { id: 1, name: 'Hair Cut & Beard Trim', price: '$25', duration: '45 min' },
//         { id: 2, name: 'Hair Spa Treatment', price: '$40', duration: '60 min' },
//         { id: 3, name: 'Hair Coloring', price: '$55', duration: '90 min' },
//         { id: 4, name: 'Head Massage', price: '$20', duration: '30 min' }
//       ],
//       'Highlights': [
//         { id: 5, name: 'Partial Highlights', price: '$65', duration: '120 min' },
//         { id: 6, name: 'Full Highlights', price: '$85', duration: '150 min' },
//         { id: 7, name: 'Balayage', price: '$95', duration: '180 min' },
//         { id: 8, name: 'Ombre', price: '$90', duration: '150 min' }
//       ],
//       'Roots': [
//         { id: 9, name: 'Root Touch Up', price: '$45', duration: '60 min' }
//       ]
//     },
//     'Hair-cut wash&style': {
//       'Popular': [
//         { id: 10, name: 'Basic Haircut', price: '$30', duration: '45 min' },
//         { id: 11, name: 'Premium Haircut', price: '$45', duration: '60 min' },
//         { id: 12, name: 'Kids Haircut', price: '$25', duration: '30 min' },
//         { id: 13, name: 'Senior Haircut', price: '$20', duration: '30 min' }
//       ],
//       'Highlights': [
//         { id: 14, name: 'Blowout Style', price: '$35', duration: '45 min' },
//         { id: 15, name: 'Updo Style', price: '$50', duration: '60 min' },
//         { id: 16, name: 'Bridal Style', price: '$75', duration: '90 min' },
//         { id: 17, name: 'Special Occasion', price: '$60', duration: '75 min' }
//       ],
//       'Roots': [
//         { id: 18, name: 'Root Blowdry', price: '$30', duration: '45 min' }
//       ]
//     },
//     'Hair colour': {
//       'Popular': [
//         { id: 19, name: 'Full Color', price: '$60', duration: '90 min' },
//         { id: 20, name: 'Semi-Permanent', price: '$45', duration: '60 min' },
//         { id: 21, name: 'Toner', price: '$25', duration: '30 min' },
//         { id: 22, name: 'Gloss', price: '$35', duration: '45 min' }
//       ],
//       'Highlights': [
//         { id: 23, name: 'Partial Foils', price: '$75', duration: '120 min' },
//         { id: 24, name: 'Full Foils', price: '$110', duration: '180 min' },
//         { id: 25, name: 'Babylights', price: '$95', duration: '150 min' },
//         { id: 26, name: 'Face Framing', price: '$50', duration: '60 min' }
//       ],
//       'Roots': [
//         { id: 27, name: 'Root Color', price: '$40', duration: '60 min' }
//       ]
//     },
//     'Treatments': {
//       'Popular': [
//         { id: 28, name: 'Deep Conditioning', price: '$35', duration: '45 min' },
//         { id: 29, name: 'Keratin Treatment', price: '$120', duration: '150 min' },
//         { id: 30, name: 'Scalp Treatment', price: '$40', duration: '60 min' },
//         { id: 31, name: 'Protein Treatment', price: '$50', duration: '60 min' }
//       ],
//       'Highlights': [
//         { id: 32, name: 'Olaplex Treatment', price: '$60', duration: '90 min' },
//         { id: 33, name: 'Bond Repair', price: '$70', duration: '90 min' },
//         { id: 34, name: 'Moisture Infusion', price: '$55', duration: '75 min' },
//         { id: 35, name: 'Detox Treatment', price: '$45', duration: '60 min' }
//       ],
//       'Roots': [
//         { id: 36, name: 'Root Strengthening', price: '$50', duration: '60 min' }
//       ]
//     }
//   };

//   const toggleItemSelection = (item) => {
//     setSelectedItems(prev =>
//       prev.some(selected => selected.id === item.id)
//         ? prev.filter(selected => selected.id !== item.id)
//         : [...prev, item]
//     );
//   };

//   const isItemSelected = (item) => {
//     return selectedItems.some(selected => selected.id === item.id);
//   };

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleContinue = () => {
//     navigation.navigate('SalonBooking', { selectedServices: selectedItems });
//   };

//   return (
//     <View style={styles.container}>
//       {/* <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//         <Text style={styles.backButtonText}>← Back</Text>
//       </TouchableOpacity> */}

//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for the service you want"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={styles.categoriesContent}>
//         {categories.map(category => (
//           <TouchableOpacity
//             key={category}
//             style={[styles.categoryButton, activeCategory === category && styles.activeCategoryButton]}
//             onPress={() => {
//               setActiveCategory(category);
//               setActiveSubCategory('Popular');
//             }}
//           >
//             <Text style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}>
//               {category}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subCategoriesContainer} contentContainerStyle={styles.subCategoriesContent}>
//         {subCategories[activeCategory].map(subCategory => (
//           <TouchableOpacity
//             key={subCategory}
//             style={[styles.subCategoryButton, activeSubCategory === subCategory && styles.activeSubCategoryButton]}
//             onPress={() => setActiveSubCategory(subCategory)}
//           >
//             <Text style={[styles.subCategoryText, activeSubCategory === subCategory && styles.activeSubCategoryText]}>
//               {subCategory}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <ScrollView style={styles.servicesScroll}>
//         <Text style={styles.sectionTitle}>{activeSubCategory}</Text>
//         <View style={styles.servicesContainer}>
//           {servicesData[activeCategory][activeSubCategory].map(service => (
//             <View key={service.id} style={styles.serviceCard}>
//               <View style={styles.serviceInfo}>
//                 <Text style={styles.serviceName}>{service.name}</Text>
//                 <Text style={styles.serviceDetails}>{service.price} • {service.duration}</Text>
//               </View>
//               <TouchableOpacity
//                 style={[styles.addButton, isItemSelected(service) && styles.addedButton]}
//                 onPress={() => toggleItemSelection(service)}
//               >
//                 <Text style={styles.addButtonText}>
//                   {isItemSelected(service) ? 'Added' : 'Add'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {selectedItems.length > 0 && (
//         <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//           <Text style={styles.continueButtonText}>
//             {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected • Continue
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default CScreen2;

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import styles from './CScreen3.styles';

// const Screen2 = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { selectedServices, selectedDate, selectedTime, gender } = route.params;
//   const [selectedSalon, setSelectedSalon] = useState(null);
//   const [activeFilter, setActiveFilter] = useState('Nearby available');
//   const [quantity, setQuantity] = useState(1);
//   const displayDate = new Date(selectedDate);

//   const salonData = [
//     {
//       id: 1,
//       name: 'ELITE SALON',
//       rating: 4.5,
//       distance: '0.5 km',
//       address: '123 Beauty St, Downtown',
//       price: 150,
//       image: require('../Customer/Images/salon1.jpg'),
//       available: true,
//       availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '6:00 PM']
//     },
//     {
//       id: 2,
//       name: 'GLAMOUR STUDIO',
//       rating: 4.2,
//       distance: '1.2 km',
//       address: '456 Style Ave, Uptown',
//       price: 200,
//       image: require('../Customer/Images/salon2.jpg'),
//       available: false,
//       availableTimes: ['10:00 AM', '11:00 AM', '1:00 PM', '4:00 PM', '5:00 PM']
//     },
//     {
//       id: 3,
//       name: 'STYLE LOUNGE',
//       rating: 4.7,
//       distance: '0.8 km',
//       address: '789 Fashion Blvd, Midtown',
//       price: 180,
//       image: require('../Customer/Images/salon3.jpg'),
//       available: true,
//       availableTimes: ['9:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '7:00 PM']
//     },
//     {
//       id: 4,
//       name: 'CHIC CUTS',
//       rating: 4.0,
//       distance: '1.5 km',
//       address: '321 Trendy Lane, Westside',
//       price: 120,
//       image: require('../Customer/Images/salon4.jpg'),
//       available: true,
//       availableTimes: ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '8:00 PM']
//     },
//   ];

//   const handleSalonSelect = (salon) => {
//     setSelectedSalon(salon);
//   };

//   const handleQuantityChange = (delta) => {
//     setQuantity((prev) => Math.max(1, prev + delta));
//   };

//   const handleContinueToPayment = () => {
//     if (!selectedSalon) {
//       alert('Please select a salon first');
//       return;
//     }

//     navigation.navigate('CScreen3', {
//       salon: selectedSalon,
//       services: selectedServices,
//       date: selectedDate,
//       time: selectedTime,
//       quantity: quantity
//     });
//   };
// const filteredSalons = () => {
//   // Filter salons that are available at the selected time
//   const availableAtTime = salonData.filter(salon => 
//     salon.availableTimes.includes(selectedTime)
//   ).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

//   switch (activeFilter) {
//     case 'Ratings':
//       return [...availableAtTime].sort((a, b) => b.rating - a.rating);
//     case 'Price - low to high':
//       return [...availableAtTime].sort((a, b) => a.price - b.price);
//     case 'Price - high to low':
//       return [...availableAtTime].sort((a, b) => b.price - a.price);
//     case 'Nearby available':
//     default:
//       return availableAtTime;
//   }
// };

// const formatSelectedDate = () => {
//     try {
//       return displayDate.toLocaleDateString('en-US', { 
//         month: 'long', 
//         day: 'numeric', 
//         year: 'numeric' 
//       });
//     } catch (e) {
//       return 'Selected date';
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Selected Time Slot */}
//         <View style={styles.timeSlotCard}>
//            <Text style={styles.selectedTimeText}>
//             Selected Time: {formatSelectedDate()}, {selectedTime || 'No time selected'}
//           </Text>
//           <TouchableOpacity 
//             style={styles.changeTimeButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.changeTimeText}>Change Time</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Filter Buttons */}
//         <Text style={styles.sectionTitle}>Available Salons</Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filterContainer}
//           contentContainerStyle={styles.filterContent}
//         >
//           {['Nearby available', 'Ratings', 'Price - low to high', 'Price - high to low'].map((filter) => (
//             <TouchableOpacity
//               key={filter}
//               style={[
//                 styles.filterButton,
//                 activeFilter === filter && styles.activeFilterButton
//               ]}
//               onPress={() => setActiveFilter(filter)}
//             >
//               <Text style={[
//                 styles.filterText,
//                 activeFilter === filter && styles.activeFilterText
//               ]}>
//                 {filter}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Salon List */}
//         <FlatList
//           data={filteredSalons()}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => {
//             const isSelected = selectedSalon?.id === item.id;
//             return (
//               <View style={styles.salonCard}>
//                 <Image source={item.image} style={styles.salonImage} />
//                 <View style={styles.salonInfo}>
//                   <Text style={styles.ratingText}>⭐ {item.rating}</Text>
//                   <Text style={styles.salonName}>{item.name}</Text>
//                   <Text style={styles.salonDistance}>{item.distance} away</Text>
//                   <Text style={styles.salonAddress}>{item.address}</Text>
//                   <Text style={styles.availabilityText}>
//                     Available at {selectedTime}
//                   </Text>
//                 </View>
//                 <View style={styles.actionContainer}>
//                   <View style={styles.quantityContainer}>
//                     <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.quantityButton}>
//                       <Text style={styles.quantityText}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.quantityValue}>{quantity}</Text>
//                     <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.quantityButton}>
//                       <Text style={styles.quantityText}>+</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <TouchableOpacity
//                     style={[styles.addButton, isSelected && { backgroundColor: '#4caf50' }]}
//                     onPress={() => handleSalonSelect(item)}
//                   >
//                     <Text style={styles.addButtonText}>{isSelected ? 'Selected' : 'Select'}</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.priceButton}>
//                     <Text style={styles.priceButtonText}>₹{item.price}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             );
//           }}
//           contentContainerStyle={styles.salonList}
//           ListEmptyComponent={
//             <View style={styles.placeholder}>
//               <Text style={styles.placeholderText}>No salons available at this time slot</Text>
//               <TouchableOpacity 
//                 style={styles.changeTimeButton}
//                 onPress={() => navigation.goBack()}
//               >
//                 <Text style={styles.changeTimeText}>Change Time</Text>
//               </TouchableOpacity>
//             </View>
//           }
//         />
//       </ScrollView>

//       {/* Continue to Payment Button */}
    
//         <TouchableOpacity style={styles.continueButton} onPress={handleContinueToPayment}>
//           <Text style={styles.continueButtonText}>Continue to Payment</Text>
//         </TouchableOpacity>
    
//     </View>
//   );
// };

// export default Screen2;









import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './CScreen3.styles';

const Screen2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Parse the date string back to Date object
  const { selectedServices, selectedDate: dateString, selectedTime, gender } = route.params;
  const selectedDate = new Date(dateString);
  
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Nearby available');
  const [quantity, setQuantity] = useState(1);

  const salonData = [
    {
      id: 1,
      name: 'ELITE SALON',
      rating: 4.5,
      distance: '0.5 km',
      address: '123 Beauty St, Downtown',
      price: 150,
      image: require('../Customer/Images/salon1.jpg'),
      available: true,
      availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '6:00 PM']
    },
    {
      id: 2,
      name: 'GLAMOUR STUDIO',
      rating: 4.2,
      distance: '1.2 km',
      address: '456 Style Ave, Uptown',
      price: 200,
      image: require('../Customer/Images/salon2.jpg'),
      available: false,
      availableTimes: ['10:00 AM', '11:00 AM', '1:00 PM', '4:00 PM', '5:00 PM']
    },
    {
      id: 3,
      name: 'STYLE LOUNGE',
      rating: 4.7,
      distance: '0.8 km',
      address: '789 Fashion Blvd, Midtown',
      price: 180,
      image: require('../Customer/Images/salon3.jpg'),
      available: true,
      availableTimes: ['9:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '7:00 PM']
    },
    {
      id: 4,
      name: 'CHIC CUTS',
      rating: 4.0,
      distance: '1.5 km',
      address: '321 Trendy Lane, Westside',
      price: 120,
      image: require('../Customer/Images/salon4.jpg'),
      available: true,
      availableTimes: ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '8:00 PM']
    },
  ];

  const handleSalonSelect = (salon) => {
    setSelectedSalon(salon);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleContinueToPayment = () => {
    if (!selectedSalon) {
      alert('Please select a salon first');
      return;
    }

    navigation.navigate('CScreen5', {
      // salon: selectedSalon,
      // services: selectedServices,
      // date: selectedDate.toISOString(),
      // time: selectedTime,
      // quantity: quantity
    });
  };

  const filteredSalons = () => {
    // Filter salons that are available at the selected time
    const availableAtTime = salonData.filter(salon => 
      salon.availableTimes.includes(selectedTime)
    ).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    switch (activeFilter) {
      case 'Ratings':
        return [...availableAtTime].sort((a, b) => b.rating - a.rating);
      case 'Price - low to high':
        return [...availableAtTime].sort((a, b) => a.price - b.price);
      case 'Price - high to low':
        return [...availableAtTime].sort((a, b) => b.price - a.price);
      case 'Nearby available':
      default:
        return availableAtTime;
    }
  };

  const formatSelectedDate = () => {
    try {
      return selectedDate.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Selected date';
    }
  };

  return (
    <View style={styles.container}>
      {/* Selected Time Slot */}
      <View style={styles.timeSlotCard}>
        <Text style={styles.selectedTimeText}>
          Selected Time: {formatSelectedDate()}, {selectedTime || 'No time selected'}
        </Text>
        <TouchableOpacity 
          style={styles.changeTimeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.changeTimeText}>Change Time</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <Text style={styles.sectionTitle}>Available Salons</Text>
      <FlatList
        horizontal
        data={['Nearby available', 'Ratings', 'Price - low to high', 'Price - high to low']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === item && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter(item)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === item && styles.activeFilterText
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* Salon List */}
      <FlatList
        data={filteredSalons()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedSalon?.id === item.id;
          return (
            <View style={styles.salonCard}>
              <Image source={item.image} style={styles.salonImage} />
              <View style={styles.salonInfo}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                <Text style={styles.salonName}>{item.name}</Text>
                <Text style={styles.salonDistance}>{item.distance} away</Text>
                <Text style={styles.salonAddress}>{item.address}</Text>
                <Text style={styles.availabilityText}>
                  Available at {selectedTime}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.quantityButton}>
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.quantityButton}>
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.addButton, isSelected && { backgroundColor: '#4caf50' }]}
                  onPress={() => handleSalonSelect(item)}
                >
                  <Text style={styles.addButtonText}>{isSelected ? 'Selected' : 'Select'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceButtonText}>₹{item.price}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.salonList}
        ListEmptyComponent={
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No salons available at this time slot</Text>
            <TouchableOpacity 
              style={styles.changeTimeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.changeTimeText}>Change Time</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Continue to Payment Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinueToPayment}>
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen2;