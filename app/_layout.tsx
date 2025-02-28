import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        {/* <StatusBar hidden /> */}
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="signin"
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="daily-workout"
            options={{
              title: "Daily Workout",
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="health-tips"
            options={{
              title: "Health Tips",
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="user-settings"
            options={{
              title: "User Settings",
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack>
      </AuthProvider>
    </>
  );
}
