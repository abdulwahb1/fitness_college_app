import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar hidden />
          <Stack>
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
            <Stack.Screen name="dashboard" />
          </Stack>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}
