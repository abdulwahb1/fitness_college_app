import { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import { TextInput } from "react-native";
import { Link, router } from "expo-router";
import { supabase } from "../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/dashboard"); // Navigate to your app's main screen
    }
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <View style={styles.content}>
        <Ionicons name="barbell-outline" size={40} color="white" />
        <Text style={styles.title}>Welcome back!</Text>

        <View style={styles.form}>
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
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
          <Text style={styles.terms}>
            By logging in, you agree to our{" "}
            <Text style={styles.link}>Privacy Policy</Text> and{" "}
            <Text style={styles.link}>Terms to use</Text>
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Not a member? </Text>
            <Link href="/signup" asChild>
              <Pressable>
                <Text style={styles.link}>Join Us</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  forgotPassword: {
    color: "#666",
    textAlign: "right",
    fontSize: 14,
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
