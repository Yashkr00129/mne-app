import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import IconButton from "../IconButton";
import colors from "../../config/colors";
import { AntDesign } from "@expo/vector-icons";

export default function BagInput({ sNo, index, handleWeightChange }) {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				value={sNo}
			/>
			<TextInput
				style={styles.input}
				onChangeText={(text) => handleWeightChange(index, text)}
			/>
			<IconButton
				backgroundColor={colors.light}
				size={50}>
				<AntDesign
					name="delete"
					size={24}
					color="black"
				/>
			</IconButton>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	input: {
		height: 30,
		marginVertical: 12,
		width: "39%",
		borderWidth: 1,
		borderColor: colors.red,
		borderRadius: 15,
		padding: 30,
	},
});
