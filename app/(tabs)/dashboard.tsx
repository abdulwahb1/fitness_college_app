"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "@react-native-community/blur";
import WorkoutCard from "@/component/dashboard/WorkoutCard";
import UserStatsCard from "@/component/dashboard/UserStatsCard";
import { getHealthStatus, getHealthTips } from "@/lib/bmi-calculator";
import BMICalculator from "@/component/BMICalculator";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";
const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>({
    weight: "", // in kg
    height: "", // in cm
    bmi: "", // calculated BMI
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id);
    console.log(data);
    if (error) {
      console.log("Supabase error:", error);
      setIsModalVisible(true);
      return;
    }

    if (!data || data.length === 0) {
      console.log("No user data found.");
      setIsModalVisible(true);
      return;
    }
    setUserData(data[0]);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const healthStatus = getHealthStatus(userData || {});

  return (
    <ScrollView style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <BMICalculator
              setIsModalVisible={setIsModalVisible}
              fetchUserData={fetchUserData}
            />
          </View>
        </View>
      </Modal>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Semi-transparent black overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    flex: 1,
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

export default Dashboard;
