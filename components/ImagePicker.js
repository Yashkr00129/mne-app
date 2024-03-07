import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import IconButton from "./IconButton";
import { AntDesign } from "@expo/vector-icons";

export default function ImagePicker() {
	return (
		<View
			style={{
				width: "100%",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: 20,
			}}>
			<IconButton
				borderRadius={10}
				size={60}
				extraStyles={{
					borderColor: colors.red,
					borderWidth: 1,
				}}>
				<AntDesign
					name="camera"
					size={24}
					color={colors.red}
				/>
			</IconButton>
			<View
				style={{
					backgroundColor: colors.light,
					padding: 20,
					borderRadius: 10,
				}}>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>Take Photo</Text>
			</View>
			<View
				style={{
					backgroundColor: colors.light,
					padding: 20,
					borderRadius: 10,
				}}>
				<AntDesign
					name="delete"
					size={24}
					color="black"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
