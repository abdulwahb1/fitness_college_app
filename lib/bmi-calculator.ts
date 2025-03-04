// Function to determine health status message and color based on BMI

export const getHealthStatus = (userData: any) => {
  const { bmi } = userData;

  if (bmi < 18.5) {
    return {
      message:
        "You are underweight. Focus on nutrient-rich foods to gain healthy weight.",
      color: "#FFC107", // Warning yellow
      icon: "alert-triangle",
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      message: "Your weight is normal. Maintain your healthy lifestyle!",
      color: "#FFD700", // Success green
      icon: "check-circle",
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      message: "You are overweight. Consider increasing physical activity.",
      color: "#FF9800", // Warning orange
      icon: "alert-circle",
    };
  } else {
    return {
      message:
        "You are in the obesity range. Please consult with a healthcare professional.",
      color: "#F44336", // Danger red
      icon: "alert-octagon",
    };
  }
};

export const getHealthTips = (userData: any) => {
  const { bmiCategory } = userData;

  switch (bmiCategory) {
    case "Underweight":
      return [
        "Eat more frequently throughout the day",
        "Include protein-rich foods in every meal",
        "Add healthy fats like avocados and nuts to your diet",
      ];
    case "Normal weight":
      return [
        "Maintain a balanced diet with plenty of fruits and vegetables",
        "Stay hydrated by drinking at least 8 glasses of water daily",
        "Aim for 150 minutes of moderate exercise weekly",
      ];
    case "Overweight":
      return [
        "Focus on portion control during meals",
        "Increase daily physical activity",
        "Reduce intake of processed foods and sugary drinks",
      ];
    case "Obese":
      return [
        "Consult with a healthcare provider for personalized advice",
        "Start with gentle exercise like walking",
        "Keep a food journal to track eating habits",
      ];
    default:
      return [
        "Maintain a balanced diet",
        "Stay active with regular exercise",
        "Get adequate sleep each night",
      ];
  }
};
