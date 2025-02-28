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
import { BlurView } from "@react-native-community/blur";
import WorkoutCard from "@/component/dashboard/WorkoutCard";
import UserStatsCard from "@/component/dashboard/UserStatsCard";
import { getHealthStatus, getHealthTips } from "@/lib/bmi-calculator";
const HomeScreen = () => {
  const navigation = useNavigation();
  // Sample user data - in a real app, this would come from your state/context
  const [userData, setUserData] = useState({
    weight: 70, // in kg
    height: 165, // in cm
    bmi: 22.9, // calculated BMI
    bmiCategory: "Normal weight",
  });

  const healthStatus = getHealthStatus(userData || {});

  // Health tips based on BMI category

  return (
    <ScrollView style={styles.container}>
      {/* Workout Card Section */}
      <WorkoutCard />
      {/* User Stats Section */}

      <UserStatsCard userData={userData || {}} />

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
        {getHealthTips(userData || {}).map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Feather name="check" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Update Stats Button */}
      {/* <TouchableOpacity style={styles.updateButton}>
        <Feather
          name="edit-2"
          size={18}
          color="#fff"
          style={styles.updateButtonIcon}
        />
        <Text style={styles.updateButtonText}>Update My Stats</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    padding: 16,
  },

  alertContainer: {
    backgroundColor: "#333333",
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
    color: "#fff",
  },
  alertMessage: {
    fontSize: 14,
    color: "#888",
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
    backgroundColor: "#333333",
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
    color: "#fff",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});

export default HomeScreen;
