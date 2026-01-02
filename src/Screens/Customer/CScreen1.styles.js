// // CScreen1Styles.js
// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   loaderContainer: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: '#fff',
// },
// loadingText: {
//   marginTop: 12,
//   fontSize: 16,
//   color: '#555',
//   // fontWeight: '500',
//    fontFamily: 'Inter_500Medium',
// },

//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafbff',
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 120, // Enough space for continue button
//   },
//   searchContainer: {
//     marginBottom: 2,
//   },
//   searchInput: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     backgroundColor: '#F5F5F5',
//       fontFamily: 'Inter_400Regular',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     // fontWeight: 'bold',
//      fontFamily: 'Inter_600SemiBold',
//     color: '#333', 
//   },
//   categoryTitle: {
//     fontSize: 16,
//     // fontWeight: '600',
//      fontFamily: 'Inter_500Medium',
//     marginTop: 15,
//     color: '#555',
//   },
//   subSectionTitle: {
//     fontSize: 20,
//     // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold',
//     marginBottom: 2,
//     color: '#333',
//   },
//   salonsContainer: {
//     marginBottom: 10,
//   },
//   salonCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#EEE',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   salonName: {
//     fontSize: 16,
//     // fontWeight: '600',
//       fontFamily: 'Inter_600SemiBold',
//     marginBottom: 5,
//   },
//   salonDetails: {
//     fontSize: 14,
//     color: '#777',
//      fontFamily: 'Inter_400Regular', 
//   },
//   genderToggle: {
//     flexDirection: 'row',
//     marginBottom: 2,
//     justifyContent: 'center',
//   },
//   checkbox: {
//     backgroundColor: 'transparent',
//     borderWidth: 0,
//     padding: 0,
//     marginRight: 20,
//   },
//   checkboxText: {
//     // fontWeight: 'normal',
//      fontFamily: 'Inter_400Regular',
//   },
//   servicesContainer: {
//     paddingBottom: 10,
//   },
// serviceRow: {
//   justifyContent: 'space-between',
//   marginBottom: 5,
// },

// serviceBox: {
//   backgroundColor: '#FFF',
//   borderRadius: 40,
//   paddingVertical: 8,
//   paddingHorizontal: 10,
//   borderWidth: 1,
//   borderColor: '#EEE',
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 1 },
//   shadowOpacity: 0.1,
//   shadowRadius: 2,
//   elevation: 1,
//   flex: 1,
//   marginHorizontal: 2,
//   minWidth: 150,
// },

// selectedServiceBox: {
//   backgroundColor: '#f0f0f0',
//   borderColor: '#2F4EAA',
// },

//   serviceText: {
//     fontSize: 14,
//     color: '#444',
//     marginBottom: 5,
//      fontFamily: 'Inter_400Regular',
//   },
//   servicePrice: {
//     fontSize: 14,
//     // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold',
//     color: '#2F4EAA',
//   },
//   datesContainer: {
//     marginBottom: 20,
//   },
//   dateBox: {
//     width: 60,
//     height: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#EEE',
//   },
//   selectedDateBox: {
//     backgroundColor: '#2F4EAA',
//     borderColor: '#2F4EAA',
//   },
//   dayText: {
//     fontSize: 14,
//     color: '#777',
//     marginBottom: 5,
//      fontFamily: 'Inter_400Regular', 
//   },
//   selectedDayText: {
//     color: '#FFF',
//     fontFamily: 'Inter_500Medium', 
//   },
//   dateText: {
//     fontSize: 18,
//     // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold',
//     color: '#333',
//   },
//   selectedDateText: {
//     color: '#FFF',
//       fontFamily: 'Inter_600SemiBold',
//   },
//   timeSlotsContainer: {
//   marginTop: 10,
//   paddingHorizontal: 15,
// },
// timeSlotRow: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   marginBottom: 10,
//   marginTop: 10
// },
// timeSlotButton: {
//   backgroundColor: '#f5f5f5',
//   borderRadius: 8,
//   padding: 12,
//   width: '30%', // Approximately 1/3 of the width
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderWidth: 1,
//   borderColor: '#ddd',
// },
// timeSlotText: {
//   color: '#333',
//   fontSize: 14,
//   fontFamily: 'Inter_400Regular',
// },
// selectedTimeSlotText: {
//   color: 'white',
//   fontFamily: 'Inter_500Medium', 
// },
//   timeSlot: {
//     width: '30%',
//     paddingVertical: 12,
//     marginBottom: 10,
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#EEE',
//   },
//   selectedTimeSlot: {
//     backgroundColor: '#2F4EAA',
//     borderColor: '#2F4EAA',
//   },
//   timeText: {
//     fontSize: 14,
//     color: '#555',
//      fontFamily: 'Inter_400Regular',
//   },
//   selectedTimeText: {
//     color: '#FFF',
//     // fontWeight: 'bold',
//      fontFamily: 'Inter_600SemiBold',
//   },
//   continueButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 16,
//     right: 16,
//     backgroundColor: '#2F4EAA',
//     borderRadius: 25,
//     paddingVertical: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
    
//   },
//   continueButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     // fontWeight: 'bold',
//       fontFamily: 'Inter_600SemiBold',
//   },
//   salonInfo: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// },
// customSalonCard: {
//   flexDirection: 'row',
//   alignItems: 'flex-start',
//   justifyContent: 'space-between',
//   paddingVertical: 6,
//   paddingHorizontal: 10,
//   borderBottomWidth: 1,
//   borderColor: '#ccc',
// },

// timelineWrapper: {
//   width: 30,
//   justifyContent: 'flex-start',
//   alignItems: 'center',
//   marginTop: 8,
// },

// leftSection: {
//   flex: 1,
//   paddingLeft: 6,
// },

// salonName: {
//   fontSize: 16,
//   // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold',
//   textTransform: 'uppercase',
//   marginBottom: 4,
// },

// salonAddress: {
//   fontSize: 13,
//   color: '#444',
//     fontFamily: 'Inter_400Regular', 
// },

// salonServices: {
//   fontSize: 13,
//   // fontWeight: 'bold',
//    fontFamily: 'Inter_600SemiBold',
//   color: '#333',
//   marginTop: 2,
//   fontFamily: 'monospace',
// },
// servicesHeaderRow: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginTop: 5,
//   marginBottom: 10,
// },

// genderToggleRow: {
//   flexDirection: 'row',
// },

// checkboxInline: {
//   backgroundColor: 'transparent',
//   borderWidth: 0,
//   padding: 0,
//   marginRight: 10,
// },
// filterOptionsContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   marginBottom: 10,
// },
// filterOption: {
//   padding: 8,
//   borderRadius: 15,
//   backgroundColor: '#f0f0f0',
// },
// activeFilterOption: {
//   backgroundColor: '#2F4EAA',
// },
// filterOptionText: {
//   fontSize: 12,
//   color: '#333',
//    fontFamily: 'Inter_500Medium',
// },
// activeFilterOptionText: {
//   color: 'white',
//   fontFamily: 'Inter_600SemiBold',
// },

// categoryButton: {
//   padding: 10,
//   margin: 5,
//   borderRadius: 20,
//   backgroundColor: '#f0f0f0',
//   borderWidth: 1,
//   borderColor: '#ddd',
// },
// selectedCategoryButton: {
//   backgroundColor: '#f0f0f0',
//   borderColor: '#2F4EAA',
// },
// categoryButtonText: {
//   color: '#333',
//   // fontWeight: '500',
//      fontFamily: 'Inter_500Medium',
// },
// selectedCategoryButtonText: {
//   color: 'white',
//    fontFamily: 'Inter_600SemiBold', 
// },
// selectedCategoryContainer: {
//   marginTop: 15,
// },
// selectedCategoryTitle: {
//   fontSize: 18,
//   // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold',
//   marginBottom: 10,
//   color: '#333',
// },
// dateSelector: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   padding: 10,
//   backgroundColor: '#f8f8f8',
//   borderRadius: 10,
//   marginBottom: 15,
// },
// dateText: {
//   marginLeft: 10,
//   fontSize: 16,
//   color: '#333',
//    fontFamily: 'Inter_500Medium',
// },
// calendarContainer: {
//   marginBottom: 15,
//   borderRadius: 10,
//   overflow: 'hidden',
//   elevation: 4,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.25,
//   shadowRadius: 3.84,
// },
// distanceText: {
//   fontSize: 12,
//   color: '#666',
//   marginTop: 4,
//   fontFamily: 'Inter_400Regular', 
// },

// disabledTimeSlot: {
//   backgroundColor: '#f0f0f0',
//   borderColor: '#d0d0d0',
// },
// disabledTimeSlotText: {
//   color: '#a0a0a0',
//    fontFamily: 'Inter_400Regular',
// },
// categoriesContainer: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 10,
// },
// scrollArrow: {
//   padding: 10,
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// categoryHeader: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: 10,
// },
// servicesContainer: {
//   flexDirection: 'row',
//   alignItems: 'center',
// },
// serviceBoxHorizontal: {
//   padding: 15,
//   margin: 5,
//   backgroundColor: '#f8f8f8',
//   borderRadius: 10,
//   borderWidth: 1,
//   borderColor: '#e0e0e0',
//   minWidth: 150,
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// horizontalServicesContent: {
//   paddingVertical: 5,
//   flexGrow: 1,
// },
// selectedServiceText: {
//   // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold',
// },

// modalOverlay: {
//   flex: 1,
//   backgroundColor: 'rgba(0,0,0,0.5)',
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// modalBox: {
//   width: '85%',
//   backgroundColor: '#fff',
//   padding: 20,
//   borderRadius: 12,
//   alignItems: 'center',
// },
// modalTitle: {
//   fontSize: 18,
//   // fontWeight: 'bold',
//    fontFamily: 'Inter_600SemiBold',
//   marginBottom: 10,
//   color: '#333',
// },
// modalText: {
//   fontSize: 14,
//   textAlign: 'center',
//   marginBottom: 20,
//   color: '#555',
//    fontFamily: 'Inter_400Regular',
// },
// modalButtonPrimary: {
//   backgroundColor: '#2F4EAA',
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   borderRadius: 8,
//   marginBottom: 10,
//   width: '100%',
//   alignItems: 'center',
// },
// modalButtonSecondary: {
//   backgroundColor: '#4a90e2',
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   borderRadius: 8,
//   marginBottom: 10,
//   width: '100%',
//   alignItems: 'center',
// },
// modalButtonText: {
//   color: '#fff',
//   fontSize: 16,
//   fontFamily: 'Inter_600SemiBold',
// },
// modalCloseBtn: {
//   marginTop: 10,
// },
// // Add to CScreen1.styles.js
// previouslyBookedBadge: {
//   backgroundColor: '#2F4EAA',
//   paddingHorizontal: 8,
//   paddingVertical: 2,
//   borderRadius: 12,
//   alignSelf: 'flex-start',
//   marginBottom: 4,
// },
// badgeText: {
//   color: 'white',
//   fontSize: 10,
//   // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold',
// },
// previouslyBookedName: {
//   color: '#2F4EAA',
//   // fontWeight: 'bold',
//     fontFamily: 'Inter_600SemiBold', 
// },
// servicesContainer: {
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   marginTop: 4,
// },
// servicesLabel: {
//   fontSize: 12,
//   color: '#666',
//   // fontWeight: '500',
//   fontFamily: 'Inter_500Medium',
// },
// servicesText: {
//   fontSize: 12,
//   color: '#333',
//   flex: 1,
//   flexWrap: 'wrap',
//    fontFamily: 'Inter_400Regular',
// },
// priorityIndicators: {
//   marginTop: 4,
// },
// priorityText: {
//   fontSize: 12,
//   color: '#666',
//   fontStyle: 'italic',
//   fontFamily: 'Inter_400Regular',
// },
// priorityInfo: {
//   backgroundColor: '#f0f8ff',
//   padding: 8,
//   borderRadius: 8,
//   marginBottom: 10,
//   borderLeftWidth: 3,
//   borderLeftColor: '#2F4EAA',
// },
// priorityInfoText: {
//   fontSize: 12,
//   color: '#666',
//   // fontWeight: '500',
//    fontFamily: 'Inter_500Medium',
// },


// });

// export default styles;


import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
    fontFamily: 'Inter_500Medium',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafbff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Enough space for continue button
  },
  searchContainer: {
    marginBottom: 2,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    fontFamily: 'Inter_400Regular',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#333', 
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginTop: 15,
    color: '#555',
  },
  subSectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
    color: '#333',
  },
  salonsContainer: {
    marginBottom: 10,
  },
  salonCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  salonName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 5,
  },
  salonDetails: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Inter_400Regular', 
  },
  genderToggle: {
    flexDirection: 'row',
    marginBottom: 2,
    justifyContent: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginRight: 20,
  },
  checkboxText: {
    fontFamily: 'Inter_400Regular',
  },
  servicesContainer: {
    paddingBottom: 10,
  },
  serviceRow: {
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  serviceBox: {
    backgroundColor: '#FFF',
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
    marginHorizontal: 2,
    minWidth: 150,
  },
  selectedServiceBox: {
    backgroundColor: '#f0f0f0',
    borderColor: '#2F4EAA',
  },
  serviceText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
    fontFamily: 'Inter_400Regular',
  },
  servicePrice: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#2F4EAA',
  },
  datesContainer: {
    marginBottom: 20,
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
  },
  selectedDateBox: {
    backgroundColor: '#2F4EAA',
    borderColor: '#2F4EAA',
  },
  dayText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
    fontFamily: 'Inter_400Regular', 
  },
  selectedDayText: {
    color: '#FFF',
    fontFamily: 'Inter_500Medium', 
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  selectedDateText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
  },
  timeSlotsContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  timeSlotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10
  },
  timeSlotButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    width: '30%', // Approximately 1/3 of the width
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timeSlotText: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  selectedTimeSlotText: {
    color: 'white',
    fontFamily: 'Inter_500Medium', 
  },
  timeSlot: {
    width: '30%',
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  selectedTimeSlot: {
    backgroundColor: '#2F4EAA',
    borderColor: '#2F4EAA',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
  selectedTimeText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#2F4EAA',
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
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  salonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customSalonCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  timelineWrapper: {
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  leftSection: {
    flex: 1,
    paddingLeft: 6,
  },
  salonName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  salonAddress: {
    fontSize: 13,
    color: '#444',
    fontFamily: 'Inter_400Regular', 
  },
  salonServices: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  servicesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  genderToggleRow: {
    flexDirection: 'row',
  },
  checkboxInline: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginRight: 10,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterOption: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  activeFilterOption: {
    backgroundColor: '#2F4EAA',
  },
  filterOptionText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_500Medium',
  },
  activeFilterOptionText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategoryButton: {
    backgroundColor: '#f0f0f0',
    borderColor: '#2F4EAA',
  },
  categoryButtonText: {
    color: '#333',
    fontFamily: 'Inter_500Medium',
  },
  selectedCategoryButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold', 
  },
  selectedCategoryContainer: {
    marginTop: 15,
  },
  selectedCategoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
    color: '#333',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_500Medium',
  },
  calendarContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Inter_400Regular', 
  },
  disabledTimeSlot: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d0d0d0',
  },
  disabledTimeSlotText: {
    color: '#a0a0a0',
    fontFamily: 'Inter_400Regular',
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollArrow: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // NEW STYLES FOR VERTICAL SERVICES LAYOUT
  verticalServicesContainer: {
    marginTop: 10,
  },
  serviceItemVertical: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedServiceItemVertical: {
    backgroundColor: '#f0f8ff',
    borderColor: '#2F4EAA',
  },
  serviceTextVertical: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  selectedServiceTextVertical: {
    color: '#2F4EAA',
    fontFamily: 'Inter_600SemiBold',
  },
  serviceCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedServiceCheckbox: {
    backgroundColor: '#2F4EAA',
    borderColor: '#2F4EAA',
  },
  
  serviceBoxHorizontal: {
    padding: 15,
    margin: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalServicesContent: {
    paddingVertical: 5,
    flexGrow: 1,
  },
  selectedServiceText: {
    fontFamily: 'Inter_600SemiBold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
  modalButtonPrimary: {
    backgroundColor: '#2F4EAA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  modalCloseBtn: {
    marginTop: 10,
  },
  previouslyBookedBadge: {
    backgroundColor: '#2F4EAA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  previouslyBookedName: {
    color: '#2F4EAA',
    fontFamily: 'Inter_600SemiBold', 
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  servicesLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_500Medium',
  },
  servicesText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'Inter_400Regular',
  },
  priorityIndicators: {
    marginTop: 4,
  },
  priorityText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    fontFamily: 'Inter_400Regular',
  },
  priorityInfo: {
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#2F4EAA',
  },
  priorityInfoText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter_500Medium',
  },
  onlineStatusBadge: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
  marginTop: 5,
  alignSelf: 'flex-start',
},
onlineBadge: {
  backgroundColor: '#e6f7ee',
  borderColor: '#28a745',
  borderWidth: 1,
},
offlineBadge: {
  backgroundColor: '#ffe6e6',
  borderColor: '#dc3545',
  borderWidth: 1,
},
onlineStatusText: {
  fontSize: 12,
  fontWeight: '600',
},
  
});

export default styles;

