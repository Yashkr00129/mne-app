import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

import AnimatedLottieView from "lottie-react-native";

export default function ActivityIndicator({ visible = false }) {
	if (!visible) return null;

	return (
		<View style={styles.overlay}>
			<AnimatedLottieView
				autoPlay
				loop
				source={require("../assets/animations/loader.json")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		height: "100%",
		width: Dimensions.get("window").width,
		zIndex: 1,
		backgroundColor: "white",
		opacity: 0.8,
	},
});
