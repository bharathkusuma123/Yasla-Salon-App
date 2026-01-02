import React from 'react';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import styles from './SalonSelection.styles';

const FilterTabs = ({ activeFilter, setActiveFilter, setAvailabilityFilter, setShowAvailabilityModal }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterScrollContainer}
    >
      <TouchableOpacity 
        style={[styles.filterTab, activeFilter === 'nearby' && styles.activeFilterTab]}
        onPress={() => {
          setActiveFilter('nearby');
          setAvailabilityFilter(null);
        }}
      >
        <Text style={[styles.filterText, activeFilter === 'nearby' && styles.activeFilterText]}>
          Nearby
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterTab, activeFilter === 'price_low' && styles.activeFilterTab]}
        onPress={() => {
          setActiveFilter('price_low');
          setAvailabilityFilter(null);
        }}
      >
        <Text style={[styles.filterText, activeFilter === 'price_low' && styles.activeFilterText]}>
          Price: Low to High
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterTab, activeFilter === 'price_high' && styles.activeFilterTab]}
        onPress={() => {
          setActiveFilter('price_high');
          setAvailabilityFilter(null);
        }}
      >
        <Text style={[styles.filterText, activeFilter === 'price_high' && styles.activeFilterText]}>
          Price: High to Low
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterTab, activeFilter === 'rating' && styles.activeFilterTab]}
        onPress={() => {
          setActiveFilter('rating');
          setAvailabilityFilter(null);
        }}
      >
        <Text style={[styles.filterText, activeFilter === 'rating' && styles.activeFilterText]}>
          Rating
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.filterTab, activeFilter === 'availability' && styles.activeFilterTab]}
        onPress={() => setShowAvailabilityModal(true)}
      >
        <Text style={[styles.filterText, activeFilter === 'availability' && styles.activeFilterText]}>
          Available Slots
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FilterTabs;