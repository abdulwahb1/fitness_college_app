import LandingScreen from "@/component/LandingScreen";
import Dashboard from "@/app/dashboard";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { session } = useAuth();
  return session ? <Dashboard /> : <LandingScreen />;
}
