import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export class CheckoutPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={22} color="black" />
          <View style={styles.headerTextBox}>
            <Text style={styles.title}>NEW STYLE CHECK MEN’S SALOON</Text>
            <Text style={styles.subText}>
              1.0 KM from you, Kanakapura{'\n'}Main Road 1st Phase, J P Nagar
            </Text>
          </View>
        </View>

        {/* Services and Amount */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.leftBox}>
              <Text style={styles.boxTitle}>Services</Text>
              <Text style={styles.serviceText}>
                global colour (inoa) <FontAwesome name="pencil" size={14} />
              </Text>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={{ color: '#fff' }}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.boxTitle}>Total amount</Text>
              <Text style={styles.amount}>₹170</Text>
              <Text style={styles.note}>
                booking cost 5 rupees pay now{'\n'}remaining pay at shop
              </Text>
            </View>
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="time-outline" size={20} color="black" />
            <Text style={styles.dateText}>February 11, 2025 - 09:00 AM</Text>
            <FontAwesome name="pencil" size={16} style={{ marginLeft: 10 }} />
          </View>
        </View>

        {/* Hairstylist */}
        <View style={styles.card}>
          <Text style={styles.boxTitle}>Hairstyler</Text>
          <View style={styles.row}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.stylistName}>Nani DHINESH</Text>
              <Text style={styles.rating}>⭐ 4.7 (239)</Text>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={{ color: '#000' }}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="call" size={22} color="black" />
            <MaterialIcons name="chat" size={22} color="black" />
          </View>
        </View>
      </View>
    );
  }
}

export default CheckoutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  headerTextBox: {
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBox: {
    flex: 1,
  },
  rightBox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  boxTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceText: {
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
  },
  dateText: {
    marginLeft: 10,
    fontSize: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  stylistName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  rating: {
    fontSize: 12,
    color: 'gray',
  },
  changeBtn: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 20,
  },
});
