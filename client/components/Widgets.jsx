import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Widget = ({ title, value, icon, color }) => {
  return (
    <View style={styles.container} className="p-4 rounded-3xl">
      {/* Icon */}
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={32} color={color} />
      </View>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>
      {/* Value */}
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3B3B3D",
    margin: 8,
    width: 160,
  },
  iconContainer: {
    marginBottom: 8,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  value: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Widget;
