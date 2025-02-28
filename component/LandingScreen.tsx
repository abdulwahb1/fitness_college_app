import { useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Link, router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@rneui/themed";
import { StatusBar } from "react-native";

export default function LandingScreen() {
  return (
    <>
      <StatusBar hidden />

      <ImageBackground
        source={require("@/assets/images/gym-bg.jpg")}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Ionicons name="barbell-outline" size={40} color="white" />
              <Text style={styles.title}>Home workouts</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.joinButton]}
                onPress={() => router.push("/signup")}
              >
                <Text style={styles.joinText}>Join</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.loginButton]}
                onPress={() => router.push("/signin")}
              >
                <Text style={styles.loginText}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  joinButton: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#FFD700",
  },
  joinText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  loginText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
});
