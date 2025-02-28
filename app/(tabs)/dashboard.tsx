"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const HomeScreen = () => {
  const navigation = useNavigation();
  // Sample user data - in a real app, this would come from your state/context
  const [userData, setUserData] = useState({
    weight: 70, // in kg
    height: 175, // in cm
    bmi: 22.9, // calculated BMI
    bmiCategory: "Normal weight",
  });

  // Function to determine health status message and color based on BMI
  const getHealthStatus = () => {
    const { bmi } = userData;

    if (bmi < 18.5) {
      return {
        message:
          "You are underweight. Focus on nutrient-rich foods to gain healthy weight.",
        color: "#FFC107", // Warning yellow
        icon: "alert-triangle",
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        message: "Your weight is normal. Maintain your healthy lifestyle!",
        color: "#4CAF50", // Success green
        icon: "check-circle",
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        message: "You are overweight. Consider increasing physical activity.",
        color: "#FF9800", // Warning orange
        icon: "alert-circle",
      };
    } else {
      return {
        message:
          "You are in the obesity range. Please consult with a healthcare professional.",
        color: "#F44336", // Danger red
        icon: "alert-octagon",
      };
    }
  };

  const healthStatus = getHealthStatus();

  // Health tips based on BMI category
  const getHealthTips = () => {
    const { bmiCategory } = userData;

    switch (bmiCategory) {
      case "Underweight":
        return [
          "Eat more frequently throughout the day",
          "Include protein-rich foods in every meal",
          "Add healthy fats like avocados and nuts to your diet",
        ];
      case "Normal weight":
        return [
          "Maintain a balanced diet with plenty of fruits and vegetables",
          "Stay hydrated by drinking at least 8 glasses of water daily",
          "Aim for 150 minutes of moderate exercise weekly",
        ];
      case "Overweight":
        return [
          "Focus on portion control during meals",
          "Increase daily physical activity",
          "Reduce intake of processed foods and sugary drinks",
        ];
      case "Obese":
        return [
          "Consult with a healthcare provider for personalized advice",
          "Start with gentle exercise like walking",
          "Keep a food journal to track eating habits",
        ];
      default:
        return [
          "Maintain a balanced diet",
          "Stay active with regular exercise",
          "Get adequate sleep each night",
        ];
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Workout Card Section */}
      <TouchableOpacity
        style={styles.workoutCard}
        onPress={() => router.push("/daily-workout")}
      >
        <View style={styles.workoutCardContent}>
          <View>
            <Text style={styles.workoutCardTitle}>Today's Workout Plan</Text>
            <Text style={styles.workoutCardDescription}>
              5 exercises tailored to your fitness level
            </Text>
            <View style={styles.workoutCardMeta}>
              <View style={styles.metaItem}>
                <Feather name="clock" size={14} color="#fff" />
                <Text style={styles.metaText}>30 min</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="zap" size={14} color="#fff" />
                <Text style={styles.metaText}>250 cal</Text>
              </View>
            </View>
          </View>
          <View style={styles.workoutCardIcon}>
            <Feather name="arrow-right-circle" size={36} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
      {/* User Stats Section */}

      <View style={styles.statsContainer}>
        <Text style={styles.header}>Your Health Stats</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Feather name="user" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{userData.weight} kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="arrow-up" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{userData.height} cm</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="activity" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{userData.bmi.toFixed(1)}</Text>
            <Text style={styles.statLabel}>BMI</Text>
          </View>
        </View>
      </View>

      {/* Health Alert Section */}
      <View
        style={[styles.alertContainer, { borderColor: healthStatus.color }]}
      >
        <View
          style={[
            styles.alertIconContainer,
            { backgroundColor: healthStatus.color },
          ]}
        >
          <Feather name={healthStatus.icon as any} size={28} color="#fff" />
        </View>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>Health Alert</Text>
          <Text style={styles.alertMessage}>{healthStatus.message}</Text>
          <TouchableOpacity
            style={[
              styles.alertButton,
              { backgroundColor: healthStatus.color },
            ]}
            onPress={() => router.push("/health-tips")}
          >
            <Text style={styles.alertButtonText}>View Health Tips</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Personalized Tips Section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Personalized Tips</Text>
        {getHealthTips().map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Feather name="check" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Update Stats Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Feather
          name="edit-2"
          size={18}
          color="#fff"
          style={styles.updateButtonIcon}
        />
        <Text style={styles.updateButtonText}>Update My Stats</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  alertContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    borderLeftWidth: 4,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertIconContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContent: {
    flex: 1,
    padding: 16,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  alertMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  alertButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  alertButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  tipsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  workoutCard: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  workoutCardContent: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  workoutCardDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 12,
  },
  workoutCardMeta: {
    flexDirection: "row",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 4,
  },
  workoutCardIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  updateButtonIcon: {
    marginRight: 8,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
