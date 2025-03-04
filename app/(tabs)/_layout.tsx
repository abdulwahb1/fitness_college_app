import { supabase } from "@/lib/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Session } from "@supabase/supabase-js";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
export default function TabLayout() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      {/* <StatusBar barStyle="dark-content" backgroundColor="#1a1a1a" /> */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFD700",
          tabBarStyle: {
            backgroundColor: "#1a1a1a",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            href: null,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
            headerStyle: {
              backgroundColor: "#1a1a1a",
            },
            headerTintColor: "#fff",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
            headerStyle: {
              backgroundColor: "#1a1a1a",
            },
            headerTintColor: "#fff",
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    // Customize your tab bar style here
    backgroundColor: "#ffffff",
  },
});
