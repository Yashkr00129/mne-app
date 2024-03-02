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

export default function App() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
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
				<Text>Username</Text>
				<TextInput
					style={styles.input}
					value={username}
					onChange={setUsername}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text>Password</Text>
				<TextInput
					style={styles.input}
					value={password}
					secureTextEntry
					textContentType="password"
					onChange={setPassword}
				/>
			</View>
			<AppButton title="Login" />
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
