// PaymentScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  salonInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  salonName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  salonDistance: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  salonAddress: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicesList: {
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    color: '#555',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#FF6B6B',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
  amountDetails: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  paymentNote: {
    fontSize: 12,
    color: '#777',
    marginBottom: 3,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  timeSlotText: {
    fontSize: 14,
    color: '#555',
  },
  stylistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  changeText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  stylistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stylistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  stylistDetails: {
    flex: 1,
  },
  stylistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
  },
  stylistActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  paymentIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 15,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#333',
  },
  payButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
