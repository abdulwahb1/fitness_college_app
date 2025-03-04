import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { User } from "@/types/user";

const UserStatsCard = ({ userData }: { userData: User }) => {
  return (
    <>
      <View style={styles.statsContainer}>
        <Text style={styles.header}>Your Health Stats</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Feather name="user" size={24} color="#FFD700" />
            <Text style={styles.statValue}>{userData.weight} kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="arrow-up" size={24} color="#FFD700" />
            <Text style={styles.statValue}>{userData.height} cm</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="activity" size={24} color="#FFD700" />
            <Text style={styles.statValue}>{userData.bmi}</Text>
            <Text style={styles.statLabel}>BMI</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default UserStatsCard;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },

  statsContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#333333",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
