import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  salonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  salonLocation: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  serviceList: {
    paddingBottom: 100,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 8,
  },
  selectedServiceCard: {
    backgroundColor: '#fff4f4',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  serviceMeta: {
    flexDirection: 'row',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  bookingSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  calendarContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  stylistContainer: {
    paddingBottom: 16,
  },
  stylistCard: {
    width: 120,
    padding: 12,
    marginRight: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedStylistCard: {
    backgroundColor: '#fff4f4',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  stylistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  stylistName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  stylistSpecialty: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginVertical: 4,
  },
  stylistRating: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '23%',
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#FF6B6B',
  },
  timeSlotText: {
    fontSize: 12,
    color: '#333',
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});