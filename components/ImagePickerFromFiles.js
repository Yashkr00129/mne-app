import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";

export default function ImageInput({ imageUri, onChangeImage }) {
	useEffect(() => {
		requestPermission();
	}, []);

	const requestPermission = async () => {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted)
			alert("You need to enable permission to access media library. ");
	};

	const handlePress = () => {
		if (!imageUri) selectImage();
		else
			Alert.alert("Delete", "Are you sure you want to delete this image?", [
				{
					text: "Yes",
					onPress: () => {
						onChangeImage(null);
					},
				},
				{ text: "No" },
			]);
	};

	const selectImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 0.5,
			});

			console.log(result2);
			let imageUri = result.assets[0].uri;
			if (!result.canceled) onChangeImage(imageUri);
		} catch (error) {
			console.log("Error reading an image", error);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View style={styles.container}>
				{!imageUri && (
					<MaterialCommunityIcons
						name="camera"
						size={40}
						color={colors.red}
					/>
				)}
				{imageUri && (
					<Image
						source={{ uri: imageUri }}
						style={styles.image}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		borderColor: colors.red,
		borderWidth: 1,
		borderRadius: 15,
		height: 70,
		justifyContent: "center",
		overflow: "hidden",
		width: 70,
	},
	image: {
		height: "100%",
		width: "100%",
	},
});
