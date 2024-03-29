import { StyleSheet, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import colors from "../config/colors";

import { Platform } from "react-native";

export default function SearchBar({ style, onTextChange, value }) {
	return (
		<View style={[styles.container, style]}>
			<AntDesign
				name="search1"
				style={styles.icon}
				color={colors.red}
				size={20}
			/>
			<TextInput
				style={styles.text}
				onChangeText={onTextChange}
							value={value}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
		borderRadius: 25,
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
	},
	text: {
		fontSize: 18,
		color: colors.red,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
		width: "100%",
	},
	icon: {
		marginRight: 10,
	},
});
