import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	Image,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

import Logo from "../components/Logo";
import { useState } from "react";
import AppButton from "../components/Button";
import colors from "../config/colors";
import IconButton from "../components/IconButton";

export default function App() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	return (
		<View style={styles.screen}>
			<View style={{ width: "100%", marginBottom: 20 }}>
				<Text style={{ fontSize: 20 }}>Hello,</Text>
				<Text style={{ fontSize: 32, fontWeight: "bold", color: colors.pink }}>
					Jyana Ranjan
				</Text>
			</View>
			<View style={{ ...styles.card, backgroundColor: colors.pink }}>
				<Text style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>
					Add New Entry
				</Text>
				<IconButton backgroundColor={"#f77f96"}>
					<AntDesign
						name="arrowright"
						size={24}
						color={colors.white}
					/>
				</IconButton>
			</View>
			<View style={{ ...styles.card, backgroundColor: colors.light }}>
				<View>
					<Text style={{ fontSize: 24, fontWeight: "bold" }}>My Entries</Text>
					<Text style={{ fontSize: 24, fontWeight: "bold" }}>10</Text>
				</View>
				<IconButton backgroundColor={"#fefefe"}>
					<AntDesign
						name="arrowright"
						size={24}
						color={colors.black}
					/>
				</IconButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 50,
		padding: 20,
		alignItems: "center",
		width: "100%",
	},
	card: {
		width: "100%",
		padding: 25,
		height: 120,
		borderRadius: 17,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
});
