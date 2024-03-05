import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import colors from "../config/colors";

export default function DateField({ onChange, value = new Date() }) {
	return (
		<TouchableOpacity
			onPress={() =>
				DateTimePickerAndroid.open({
					value,
					onChange: { onChange },
					mode: "date",
					is24Hour: true,
				})
			}>
			<View style={styles.input}>
				<Text>{value.toLocaleDateString()}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	input: {
		marginVertical: 12,
		borderWidth: 1,
		borderColor: colors.red,
		borderRadius: 15,
		padding: 15,
	},
});
