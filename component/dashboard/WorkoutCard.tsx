import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const WorkoutCard = () => {
  return (
    <>
      <TouchableOpacity
        style={styles.workoutCard}
        onPress={() => router.push("/daily-workout")}
      >
        <View style={styles.workoutCardContent}>
          <View>
            <Text style={styles.workoutCardTitle}>Today's Workout Plan</Text>
            <Text style={styles.workoutCardDescription}>
              5 exercises tailored to your fitness level
            </Text>
            <View style={styles.workoutCardMeta}>
              <View style={styles.metaItem}>
                <Feather name="clock" size={14} color="#fff" />
                <Text style={styles.metaText}>30 min</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="zap" size={14} color="#fff" />
                <Text style={styles.metaText}>250 cal</Text>
              </View>
            </View>
          </View>
          <View style={styles.workoutCardIcon}>
            <Feather name="arrow-right-circle" size={36} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default WorkoutCard;

const styles = StyleSheet.create({
  workoutCard: {
    backgroundColor: "#454545",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  workoutCardContent: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 8,
  },
  workoutCardDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 12,
  },
  workoutCardMeta: {
    flexDirection: "row",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 4,
  },
  workoutCardIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
