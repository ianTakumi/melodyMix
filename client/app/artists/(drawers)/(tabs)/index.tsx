import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Ensure this is installed

export default function IndexPage() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Widgets container */}
      <View style={styles.gridContainer}>
        <View
          style={[
            styles.card,
            styles.cardLarge,
            { backgroundColor: "#3B3B3D" },
          ]}
        >
          <MaterialIcons
            name="library-music"
            size={24}
            color="black"
            style={[styles.icon, { backgroundColor: "#B3D49C" }]}
          />
          <Text style={styles.text}>Songs</Text>
          <Text style={styles.textLarge}>50</Text>
          <Text style={styles.textSmall}>20% growth this month</Text>
        </View>
        <View
          style={[
            styles.card,
            styles.cardSmall,
            { backgroundColor: "#3B3B3D" },
          ]}
        >
          <MaterialIcons
            name="people"
            size={24}
            color="black"
            style={[styles.icon, { backgroundColor: "#ACCAF8" }]}
          />
          <Text style={styles.text}>Followers</Text>
          <Text style={styles.textLarge}>26</Text>
          <Text style={styles.textSmall}>4% growth this month</Text>
        </View>
        <View
          style={[
            styles.card,
            styles.cardSmall,
            { backgroundColor: "#3B3B3D" },
          ]}
        >
          <MaterialIcons
            name="library-music"
            size={24}
            color="black"
            style={[styles.icon, { backgroundColor: "#FAF2BE" }]}
          />
          <Text style={styles.text}>Album</Text>
          <Text style={styles.textLarge}>50</Text>
          {/* <Text style={styles.textSmall}>37%</Text> */}
        </View>
        <View
          style={[
            styles.card,
            styles.cardLarge,
            { backgroundColor: "#3B3B3D", marginTop: -40 },
          ]}
        >
          <View>
            <MaterialIcons
              name="attach-money"
              size={24}
              color="black"
              style={[styles.icon, { backgroundColor: "#FAB68B" }]}
            />
          </View>

          <Text style={styles.text}>Profit</Text>
          <Text style={styles.textLarge}>5000</Text>
          <Text style={styles.textSmall}>10% increase this month</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: "relative", // Required for absolute positioning of the icon
  },
  cardLarge: {
    width: "48%",
    height: 160,
  },
  cardSmall: {
    width: "48%",
    height: 125,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  textLarge: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 8,
  },
  textSmall: {
    color: "#FFF",
    fontSize: 14,
  },
  icon: {
    position: "absolute",
    borderRadius: 50,
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
