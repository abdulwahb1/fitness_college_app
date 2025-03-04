import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const HealthTips = () => {
  const tips = [
    {
      id: "1",
      title: "Stay Hydrated",
      description:
        "Drink at least 8 glasses of water daily to maintain proper hydration and support overall health.",
      icon: "droplet",
    },
    {
      id: "2",
      title: "Balanced Diet",
      description:
        "Include proteins, carbs, and healthy fats in your meals. Aim for colorful vegetables and fruits daily.",
      icon: "coffee",
    },
    {
      id: "3",
      title: "Regular Sleep",
      description:
        "Aim for 7-9 hours of quality sleep each night to support recovery and overall health.",
      icon: "moon",
    },
    {
      id: "4",
      title: "Stretch Daily",
      description:
        "Spend at least 10 minutes each day stretching to improve flexibility and prevent injuries.",
      icon: "activity",
    },
    {
      id: "5",
      title: "Mindful Eating",
      description:
        "Pay attention to hunger cues and eat slowly to improve digestion and prevent overeating.",
      icon: "heart",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Tips</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tips.map((tip) => (
          <TouchableOpacity key={tip.id} style={styles.card}>
            <View style={styles.iconContainer}>
              <Feather name={tip.icon as any} size={24} color="#FFD700" />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{tip.title}</Text>
              <Text style={styles.description}>{tip.description}</Text>
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
  card: {
    backgroundColor: "#333333",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#888",
    lineHeight: 20,
  },
});

export default HealthTips;
