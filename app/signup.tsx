import { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import { TextInput } from "react-native";
import { Link, router } from "expo-router";
import { supabase } from "../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/signin");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="barbell-outline" size={40} color="white" />
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#666"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#666"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Join Now</Text>
          </Pressable>
          <Text style={styles.terms}>
            By signing up, you agree to our{" "}
            <Text style={styles.link}>Privacy Policy</Text> and{" "}
            <Text style={styles.link}>Terms to use</Text>
          </Text>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/signin" asChild>
              <Pressable>
                <Text style={styles.link}>Sign In</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingTop: 60,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 40,
  },
  form: {
    width: "100%",
    gap: 16,
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 6,
    padding: 16,
    color: "white",
    fontSize: 16,
  },
  terms: {
    color: "#666",
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#666",
  },
  link: {
    color: "#FFD700",
  },
});
