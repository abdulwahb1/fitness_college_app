import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      Alert.alert("Error", "New passwords don't match");
      return;
    }

    if (passwords.newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);

      // First verify the current password by signing in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || "",
        password: passwords.currentPassword,
      });

      if (signInError) {
        Alert.alert("Error", "Current password is incorrect");
        return;
      }

      // If current password is correct, update to new password
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Password has been changed successfully", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error("Change password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#666"
        value={passwords.currentPassword}
        onChangeText={(text) =>
          setPasswords((prev) => ({ ...prev, currentPassword: text }))
        }
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#666"
        value={passwords.newPassword}
        onChangeText={(text) =>
          setPasswords((prev) => ({ ...prev, newPassword: text }))
        }
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#666"
        value={passwords.confirmPassword}
        onChangeText={(text) =>
          setPasswords((prev) => ({ ...prev, confirmPassword: text }))
        }
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Changing Password..." : "Change Password"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePassword;
