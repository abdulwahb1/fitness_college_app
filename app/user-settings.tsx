import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";
import { Button } from "@rneui/themed";
import { router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardTypeOptions,
  Alert,
  Pressable,
} from "react-native";

const UserSettingsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [fetchedUserData, setFetchedUserData] = useState<User>({
    height: "",
    weight: "",
    bmi: "",
    firstName: "",
    lastName: "",
  });

  const [userData, setUserData] = useState<User>({
    height: "",
    weight: "",
    bmi: "",
    firstName: "",
    lastName: "",
  });

  //   console.log(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (data) {
        setFetchedUserData(data);
        setUserData({
          height: data.height || "", // Ensure values are not undefined
          weight: data.weight || "",
          bmi: data.bmi || "",
          firstName: user?.user_metadata?.firstName || "",
          lastName: user?.user_metadata?.lastName || "",
        });
      } else {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const inputs = [
    {
      label: "First Name",
      placeholder: "Enter your first name",
      value: userData.firstName, // Convert number to string
      onChange: (text: string) =>
        setUserData((prev) => ({ ...prev, firstName: text })),
      keyboardType: "text",
    },
    {
      label: "Last Name",
      placeholder: "Enter your last name",
      value: userData.lastName, // Convert number to string
      onChange: (text: string) =>
        setUserData((prev) => ({ ...prev, lastName: text })),
      keyboardType: "text",
    },
    {
      label: "Height",
      placeholder: "Enter your height",
      value: String(userData.height), // Convert number to string
      onChange: (text: string) =>
        setUserData((prev) => ({ ...prev, height: text })),
      keyboardType: "numeric",
    },
    {
      label: "Weight",
      placeholder: "Enter your weight",
      value: String(userData.weight), // Convert number to string
      onChange: (text: string) =>
        setUserData((prev) => ({ ...prev, weight: text })),
      keyboardType: "numeric",
    },
  ];

  const countBmi = async () => {
    const h = Number(userData.height) / 100;
    const w = Number(userData.weight);
    if (h <= 0 || w <= 0) {
      alert("Height and weight must be positive numbers!");
      return;
    }

    const bmi = (w / (h * h)).toFixed(2);
    // console.log(bmi);

    const newUserData = {
      height: userData.height,
      weight: userData.weight,
      bmi: bmi,
    };

    const newUserMetadata = {
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    const { data: userMetaData, error: userMetaDataError } =
      await supabase.auth.updateUser({
        data: newUserMetadata,
      });

    if (userMetaDataError) {
      console.error("Error updating user metadata:", userMetaDataError.message);
      alert("Failed to update user metadata!");
      return;
    }

    // Push data to Supabase
    const { data, error } = await supabase
      .from("profiles")
      .update(newUserData)
      .eq("id", user?.id);

    if (error) {
      console.error("Error inserting data:", error.message);
      alert("Failed to save BMI data!");
    } else {
      console.log("Data inserted successfully:", data);
      alert("User Data saved!");

      router.replace("/(tabs)/settings");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/male.png")}
            style={styles.profileImage}
          />
        </View>
        {/* yaha se */}
        {inputs.map((input, index) => (
          <View key={index} style={styles.formGroup}>
            <Text style={styles.label}>{input.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={input.placeholder}
              placeholderTextColor="#999"
              value={input.value}
              onChangeText={input.onChange}
              keyboardType={input.keyboardType as KeyboardTypeOptions}
            />
          </View>
        ))}

        <Button
          title="Save"
          // disabled={loading}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          onPress={() => countBmi()}
        />
        <Button
          onPress={() => router.push("/forget-password")}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.ChangePasswordContainer}
        >
          <Text style={styles.ChangePasswordText}>Change Password</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default UserSettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a",
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#888",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#fff",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    padding: 14,
  },
  ChangePasswordContainer: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 14,
  },
  ChangePasswordText: {
    color: "#fff",
    fontSize: 16,
  },
});
