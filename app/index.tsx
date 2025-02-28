import LandingScreen from "@/component/LandingScreen";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import React from "react";

const index = () => {
  const { session } = useAuth();
  if (session) {
    return <Redirect href="/(tabs)/dashboard" />;
  }
  return <LandingScreen />;
};

export default index;
