import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import Logo from "../../components/Logo";
import AppButton from "../../components/Button";
import { Redirect, router } from "expo-router";
import { useSession } from "../../auth/context";
import apiClient from "../../api/client";

export default function Login() {
	const { signIn, session } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async () => {
		const res = await apiClient.post("/api/auth", { email, password });

		if (!res.ok) alert("Invalid Credentials");

		signIn(res.data);
	};

  if (session) {
    return <Redirect href={"/"}/>
  }

	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar style="auto" />
			<Logo style={{ marginBottom: 40 }} />
			<View style={{ width: "90%", marginBottom: 40 }}>
				<Text style={{ fontSize: 24 }}>Log In</Text>
				<Text style={{ fontSize: 16, color: "#a9a9a9" }}>
					Enter your username and password
				</Text>
			</View>
			<View style={styles.inputContainer}>
				<Text>Email</Text>
				<TextInput
					style={styles.input}
					value={email}
					textContentType="emailAddress"
					keyboardType="email-address"
					onChangeText={setEmail}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text>Password</Text>
				<TextInput
					style={styles.input}
					value={password}
					secureTextEntry
					textContentType="password"
					onChangeText={setPassword}
				/>
			</View>
			<AppButton
				title="Login"
				onPress={onSubmit}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 50,
		padding: 20,
		alignItems: "center",
		width: "100%",
	},
	inputContainer: {
		width: "90%",
	},
	input: {
		height: 30,
		marginVertical: 12,
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: "#D8D8D8",
	},
});
