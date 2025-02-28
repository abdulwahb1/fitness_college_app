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

const BMICalculator = ({
  setIsModalVisible,
}: {
  setIsModalVisible: (visible: boolean) => void;
}) => {
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bmiResult, setBmiResult] = useState<string | null>(null);
  console.log(bmiResult);
  console.log(age, height, weight, gender);
  const [name, setName] = useState<string>("");
  const validateForm = () => {
    if (!age || !height || !weight || !gender) {
      alert("All fields are required!");
      return;
    }
    setIsModalVisible(false);
    countBmi();
  };

  const countBmi = () => {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (h <= 0 || w <= 0) {
      alert("Height and weight must be positive numbers!");
      return;
    }

    const bmi = (w / (h * h)).toFixed(2);
    let result = "Extremely obese";

    if (Number(bmi) < 18.5) result = "Underweight";
    else if (Number(bmi) < 25) result = "Healthy";
    else if (Number(bmi) < 30) result = "Overweight";
    else if (Number(bmi) < 35) result = "Obese";

    setBmiResult(bmi);

    // Reset the form
    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            onChangeText={setName}
            value={name}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your age"
            onChangeText={setAge}
            value={age}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your height"
            onChangeText={setHeight}
            value={height}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your weight"
            onChangeText={setWeight}
            value={weight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "male" && styles.selectedGender,
            ]}
            onPress={() => setGender("male")}
          >
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "female" && styles.selectedGender,
            ]}
            onPress={() => setGender("female")}
          >
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={validateForm}>
          <Text style={styles.submitButtonText}>Calculate BMI</Text>
        </TouchableOpacity>
        {bmiResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>BMI:</Text>
            <Text style={styles.resultText}>{bmiResult}</Text>
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
    backgroundColor: "#fff",
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
  },
  textInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dbeffe",
    padding: 10,
    margin: 10,
  },
  selectedGender: {
    backgroundColor: "#289df6",
  },
  genderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#289df6",
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
