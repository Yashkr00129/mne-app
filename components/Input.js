import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function TextField({ label, onChangeText, style, ...rest }) {
	return (
		<View style={styles.container}>
			<Text>{label}</Text>
			<TextInput
				style={style}
				onChangeText={onChangeText}
				{...rest}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
});
