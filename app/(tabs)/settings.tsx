import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
const Settings = () => {
  const router = useRouter();
  const { user } = useAuth();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/signin");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/male.png")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>
            {user?.user_metadata.firstName + " " + user?.user_metadata.lastName}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => router.push("/user-settings")}
        >
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>Personal Information</Text>
            <ChevronRight stroke="#999" width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>
      <Button
        title="Sign Out"
        // disabled={loading}
        onPress={() => signOut()}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    padding: 20,
  },
  button: {
    backgroundColor: "#FF0000",
    borderRadius: 12,
    padding: 14,
  },
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
  infoButton: {
    backgroundColor: "#333333",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginTop: 20,
  },
  infoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Settings;
