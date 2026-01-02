// SalonBookingScreen.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  datesContainer: {
    marginBottom: 15,
  },
  dateBox: {
    width: 60,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDateBox: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  dayText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  selectedDayText: {
    color: '#FFF',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#FFF',
  },
  timeSlotsContainer: {
    marginBottom: 20,
  },
  timeSlotsContent: {
    paddingRight: 16,
  },
  timeSlot: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
  },
  selectedTimeSlot: {
    backgroundColor: '#FF6B6B',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  selectedTimeText: {
    color: '#FFF',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
  },
  activeFilterButton: {
    backgroundColor: '#FF6B6B',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  activeFilterText: {
    color: '#FFF',
  },
  salonList: {
    paddingBottom: 20,
  },
  salonCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  salonImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  salonInfo: {
    padding: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#FF9529',
    fontWeight: 'bold',
  },
  salonName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textTransform: 'uppercase',
  },
  salonDistance: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  salonAddress: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  available: {
    color: '#4CAF50',
  },
  notAvailable: {
    color: '#F44336',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  priceButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
  },
  priceButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  placeholderText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  selectedSalonCard: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  selectedAddButton: {
    backgroundColor: '#4CAF50',
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
