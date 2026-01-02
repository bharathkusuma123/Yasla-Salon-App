import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const servicesData = [
  { id: 1, category: "LUXURY", name: "24 KARAT QUEENS FACIAL", price: 2500 },
  { id: 2, category: "LUXURY", name: "BRIDAL FACIAL", price: 1500 },
  { id: 3, category: "SIGNATURE FACIAL", name: "GOLD FACIAL", price: 3500 },
  { id: 4, category: "SIGNATURE FACIAL", name: "YLG BRIGHTENING FACIAL", price: 1800 },
  { id: 5, category: "SIGNATURE FACIAL", name: "YLG GLOW FACIAL", price: 2000 },
  { id: 6, category: "PREMIUM FACIAL", name: "PURE GOLD FACIAL", price: 2500 },
  { id: 7, category: "PREMIUM FACIAL", name: "SKIN RADIANCE FACIAL", price: 3500 },
  { id: 8, category: "PREMIUM FACIAL", name: "WINE RADIANCE FACIAL", price: 3000 },
  { id: 9, category: "PREMIUM FACIAL", name: "BEARBERRY FACIAL", price: 2500 },
  { id: 10, category: "PREMIUM FACIAL", name: "KIWI FRUIT FACIAL", price: 999 },
  { id: 11, category: "PREMIUM FACIAL", name: "PINEAPPLE FACIAL", price: 1500 },
  { id: 12, category: "PREMIUM FACIAL", name: "VINO GRAPES FACIAL", price: 3500 },
  { id: 13, category: "PREMIUM FACIAL", name: "JAPANESE BLACK FACIAL", price: 2499 },
  { id: 14, category: "CLASSIC FACIALS", name: "CITRUS ALOE VERA FACIAL", price: 1700 },
  { id: 15, category: "CLASSIC FACIALS", name: "KIWI CHERRY FRUIT FACIAL", price: 1200 },
  { id: 16, category: "CLEAN UPS", name: "KIWI MANGO CLEAN UP", price: 799 },
  { id: 17, category: "CLEAN UPS", name: "PREMIUM EXPRESS CLEAN UP", price: 999 },
];

const YLGSALONScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleAdd = (service) => {
    if (selectedItems.includes(service.id)) {
      setSelectedItems(selectedItems.filter((id) => id !== service.id));
    } else {
      setSelectedItems([...selectedItems, service.id]);
    }
  };

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  // Group services by category
  const groupedServices = servicesData.reduce((groups, service) => {
    if (!groups[service.category]) {
      groups[service.category] = [];
    }
    groups[service.category].push(service);
    return groups;
  }, {});

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Ionicons name="arrow-back" size={20} color="black" />
        <Text style={styles.topHeaderText}>Nearby</Text>
      </View>

      {/* Salon Info Row */}
      <View style={styles.salonBox}>
        <Image
          source={require("../../../assets/ylg-logo.png")}
          style={styles.logo}
        />
        <View style={styles.salonInfo}>
          <Text style={styles.salonTitle}>YLG SALON</Text>
          <Text style={styles.salonAddress}>
            1.2 KM from you, Kamanhalli {"\n"}Main Road 1st Floor, F R Nagar
          </Text>
        </View>
        <TouchableOpacity onPress={toggleFavourite}>
          <Ionicons
            name={isFavourite ? "heart" : "heart-outline"}
            size={22}
            color={isFavourite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* Categories Tabs */}
      <View style={styles.tabsRow}>
        <Text style={[styles.tab, { color: "deepskyblue" }]}>Face</Text>
        <Text style={[styles.tab, { color: "deeppink" }]}>Hair-cut</Text>
        <Text style={[styles.tab, { color: "purple" }]}>Wash&Style</Text>
        <Text style={[styles.tab, { color: "red" }]}>Hair Colour</Text>
        <Text style={[styles.tab, { color: "blue" }]}>Treatments</Text>
      </View>

      {/* Subcategory Buttons (Facial & Cleanups) */}
      <View style={styles.subCategoryRow}>
        <TouchableOpacity style={styles.subCategoryBtn}>
          <Text style={styles.subCategoryText}>FACIAL (4)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCategoryBtn}>
          <Text style={styles.subCategoryText}>CLEAN UPS (3)</Text>
        </TouchableOpacity>
      </View>

      {/* Services List with Categories */}
      <ScrollView style={{ flex: 1 }}>
        {Object.keys(groupedServices).map((category) => (
          <View key={category} style={styles.categoryBlock}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {groupedServices[category].map((service) => (
              <View key={service.id} style={styles.serviceRow}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>From ₹ {service.price}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => toggleAdd(service)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    {selectedItems.includes(service.id) ? "Added" : "Add"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerLeft}>{selectedItems.length} item</Text>
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YLGSALONScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  topHeaderText: { marginLeft: 5, fontSize: 14 },

  // Salon Info Row
  salonBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  logo: { width: 60, height: 30, resizeMode: "contain", marginRight: 10 },
  salonInfo: { flex: 1 },
  salonTitle: { fontSize: 16, fontWeight: "bold" },
  salonAddress: { fontSize: 12, color: "#444", marginTop: 3 },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  tab: { fontSize: 13, fontWeight: "600" },
  subCategoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    backgroundColor: "#f9f9f9",
  },
  subCategoryBtn: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  subCategoryText: { fontSize: 12, fontWeight: "600" },
  categoryBlock: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  serviceName: { flex: 1, fontSize: 13, fontWeight: "500" },
  servicePrice: { fontSize: 12, color: "green", marginHorizontal: 5 },
  addButton: {
    backgroundColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "limegreen",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  footerLeft: { fontWeight: "bold", color: "#000" },
  continueBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  continueText: { color: "#fff", fontWeight: "bold" },
});
