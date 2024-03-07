import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import IconButton from "./IconButton";
import { AntDesign } from "@expo/vector-icons";
import ImageInput from "./ImagePickerFromFiles";

export default function ImagePickerWithCamera() {
	const [imageUri, setImageUri] = useState();
	return (
		<View
			style={{
				width: "100%",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: 20,
			}}>
			<ImageInput
				imageUri={imageUri}
				onChangeImage={setImageUri}
			/>
			<View
				style={{
					backgroundColor: colors.light,
					padding: 20,
					borderRadius: 10,
				}}>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>Take Photo</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
