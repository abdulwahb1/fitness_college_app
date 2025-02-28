import React, { useEffect, useState } from "react";
import { View, Text, Modal, TextInput, Button } from "react-native";
import { useAuth } from "@/context/AuthContext"; // Example auth hook
import { supabase } from "@/lib/supabase"; // Your Supabase client
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useUpdateUserProfile, useGetUserBmi } from "@/queries/profile";
import BMICalculator from "@/component/BMICalculator";
const Dashboard = () => {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome to Dashboard</Text>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.ModalOverlay}>
            {/* BMI Calculator */}
            <View style={styles.bmiCalculatorContainer}>
              <BMICalculator setIsModalVisible={setIsModalVisible} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bmiCalculatorContainer: {
    width: "90%",
    maxWidth: 400,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
