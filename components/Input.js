import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function TextField({
	label,
	value,
	onChangeText,
	style,
	placeholder,
	containerStyle,
	...rest
}) {
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={style}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				{...rest}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: "bold",
	},
	container: {
		width: "100%",
	},
});
