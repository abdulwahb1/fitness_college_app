// App.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";
const BMICalculator = ({
  setIsModalVisible,
  fetchUserData,
}: {
  setIsModalVisible: (visible: boolean) => void;
  fetchUserData: () => void;
}) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>({
    height: "",
    weight: "",
    bmi: "",
  });

  console.log(userData);
  const validateForm = () => {
    if (!userData.height || !userData.weight) {
      alert("All fields are required!");
      return;
    }
    countBmi();
    setIsModalVisible(false);
  };

  const countBmi = async () => {
    const h = Number(userData.height) / 100;
    const w = Number(userData.weight);
    if (h <= 0 || w <= 0) {
      alert("Height and weight must be positive numbers!");
      return;
    }

    const bmi = (w / (h * h)).toFixed(2);
    console.log(bmi);

    const newUserData = {
      height: userData.height,
      weight: userData.weight,
      bmi: bmi,
    };

    // Push data to Supabase
    const { data, error } = await supabase
      .from("profiles")
      .insert([newUserData])
      .eq("id", user?.id);

    if (error) {
      console.error("Error inserting data:", error.message);
      alert("Failed to save BMI data!");
    } else {
      console.log("Data inserted successfully:", data);
      alert("BMI data saved!");

      // Reset form
      setUserData({ height: "", weight: "", bmi: "" });

      fetchUserData();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your height"
            onChangeText={(text) => setUserData({ ...userData, height: text })}
            value={userData.height}
            keyboardType="numeric"
            placeholderTextColor="#777"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your weight"
            onChangeText={(text) => setUserData({ ...userData, weight: text })}
            value={userData.weight}
            keyboardType="numeric"
            placeholderTextColor="#777"
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={validateForm}>
          <Text style={styles.submitButtonText}>Calculate BMI</Text>
        </TouchableOpacity>
        {userData.bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>BMI:</Text>
            <Text style={styles.resultText}>{userData.bmi}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  form: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    elevation: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
  },
  textInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#333333",
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  resultContainer: {
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
  },
});

export default BMICalculator;
