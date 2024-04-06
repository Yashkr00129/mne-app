import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

export default function OfflineNotice() {
	const netInfo = useNetInfo();

	console.log(netInfo.type);
	console.log(netInfo.isInternetReachable);

	if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>No Internet Connection</Text>
			</View>
		);

	return null;
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.red,
		height: 50,
		justifyContent: "center",
		position: "absolute",
		top: 20,
		width: "100%",
		zIndex: 1,
	},
	text: {
		color: colors.black,
		textAlign: "center",
	},
});
