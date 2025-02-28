import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        {/* <StatusBar hidden /> */}
        {/* <StatusBar barStyle="dark-content" backgroundColor="#4CAF50" /> */}

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
            }}
          />
          <Stack.Screen
            name="signin"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="daily-workout"
            options={{
              title: "Daily Workout",
            }}
          />
          <Stack.Screen
            name="health-tips"
            options={{
              title: "Health Tips",
            }}
          />
        </Stack>
      </AuthProvider>
    </>
  );
}
