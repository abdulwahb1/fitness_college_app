import LandingScreen from "@/component/LandingScreen";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import Dashboard from "./dashboard";
import SignInScreen from "../signin";

export default function Index() {
  return <Dashboard />;
}
