import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const DailyWorkout = () => {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleCompleted = (id: string) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((item) => item !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const image = require("../assets/images/exercise.jpg");

  const workouts = [
    {
      id: "1",
      title: "Morning Cardio",
      description: "30 minutes of jogging or brisk walking to start your day",
      duration: "30 min",
      calories: "250",
      image:
        "https://images.pexels.com/photos/29825219/pexels-photo-29825219/free-photo-of-focused-man-working-out-at-gym-on-bicep-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "2",
      title: "Push-ups",
      description: "3 sets of 15 reps with proper form",
      duration: "15 min",
      calories: "120",
      image:
        "https://images.pexels.com/photos/29825219/pexels-photo-29825219/free-photo-of-focused-man-working-out-at-gym-on-bicep-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "3",
      title: "Squats",
      description: "4 sets of 12 reps focusing on form and depth",
      duration: "20 min",
      calories: "180",
      image:
        "https://images.pexels.com/photos/29825219/pexels-photo-29825219/free-photo-of-focused-man-working-out-at-gym-on-bicep-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "4",
      title: "Planks",
      description: "3 sets of 45-second holds with 30-second rest",
      duration: "10 min",
      calories: "80",
      image:
        "https://images.pexels.com/photos/29825219/pexels-photo-29825219/free-photo-of-focused-man-working-out-at-gym-on-bicep-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "5",
      title: "Stretching",
      description: "Full body stretching routine to improve flexibility",
      duration: "15 min",
      calories: "50",
      image:
        "https://images.pexels.com/photos/29825219/pexels-photo-29825219/free-photo-of-focused-man-working-out-at-gym-on-bicep-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const calculateProgress = () => {
    return Math.round((completed.length / workouts.length) * 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Workout</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${calculateProgress()}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{calculateProgress()}% Complete</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={[
              styles.workoutCard,
              completed.includes(workout.id) && styles.completedCard,
            ]}
            onPress={() => toggleCompleted(workout.id)}
          >
            <Image
              source={{ uri: workout.image }}
              style={styles.workoutImage}
            />
            <View style={styles.workoutContent}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                {completed.includes(workout.id) && (
                  <Feather name="check-circle" size={20} color="#FFD700" />
                )}
              </View>
              <Text style={styles.workoutDescription}>
                {workout.description}
              </Text>
              <View style={styles.workoutMeta}>
                <View style={styles.metaItem}>
                  <Feather name="clock" size={14} color="#666" />
                  <Text style={styles.metaText}>{workout.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="zap" size={14} color="#666" />
                  <Text style={styles.metaText}>{workout.calories} cal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2a2a2a",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  workoutCard: {
    backgroundColor: "#333333",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: "#F1F8E9",
    borderColor: "#FFD700",
    borderWidth: 1,
  },
  workoutImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#E0E0E0",
  },
  workoutContent: {
    padding: 16,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  workoutDescription: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
    lineHeight: 20,
  },
  workoutMeta: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 4,
  },
});

export default DailyWorkout;
