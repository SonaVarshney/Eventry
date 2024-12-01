import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const LogInSociety = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Keep password input but not use it for backend
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    try {
      // Send login request to the backend for society login, but only use the email
      const response = await axios.post(
        "http://192.168.1.5:3000/api/society/login",
        {
          socEmail: email, // Send only the email to the backend
          password, // Sending password but it won't be used by backend
        }
      );

      // Handle successful login
      Alert.alert("Success", `Welcome back, ${response.data.society.socName}!`);
      console.log("Login successful:", response.data);

      // Redirect to another page or perform additional actions after login
      // Example: Navigate to the society dashboard
      navigation.navigate("SocietyDashboard"); // Replace "SocietyDashboard" with your desired screen
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Unable to authenticate. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Organizer Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Are you a new organizer?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("SocietySignUp")} // Navigate to SignUpSociety
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#6c63ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  signupLink: {
    color: "#6c63ff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LogInSociety;
