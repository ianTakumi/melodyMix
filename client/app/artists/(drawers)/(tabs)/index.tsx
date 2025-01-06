import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Ensure this is installed
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function IndexPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          </View>
          <View
            style={[
              styles.card,
              styles.cardLarge,
              { backgroundColor: "#3B3B3D", marginTop: -40 },
            ]}
          >
            <MaterialIcons
              name="attach-money"
              size={24}
              color="black"
              style={[styles.icon, { backgroundColor: "#FAB68B" }]}
            />
            <Text style={styles.text}>Profit</Text>
            <Text style={styles.textLarge}>5000</Text>
            <Text style={styles.textSmall}>10% increase this month</Text>
          </View>
        </View>

        {/* Line chart container */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#121212",
          }}
        >
          <Text className="text-white font-bold text-xl text-left ">
            Merch store profit
          </Text>

          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            width={screenWidth - 40} // Adjust width dynamically
            height={220}
            chartConfig={{
              backgroundColor: "#43b9ea",
              backgroundGradientFrom: "#3f3f3f",
              backgroundGradientTo: "#282828",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            yAxisLabel="₱"
            yAxisSuffix="k"
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
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
    position: "relative",
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
