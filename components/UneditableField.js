import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";

export default function UneditableField({ heading, value }) {
	return (
		<View>
			<TouchableOpacity
				onPress={() =>
					alert(
						"This field can not be edited. It will be automatically calculated."
					)
				}>
				{heading && <Text style={styles.heading}>{heading}</Text>}
				<View style={styles.input}>
					<Text>{value}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontWeight: "bold",
		fontSize: 16,
	},
	input: {
		marginVertical: 12,
		borderWidth: 1,
		borderColor: colors.red,
		borderRadius: 15,
		padding: 15,
		height: 50,
	},
});
