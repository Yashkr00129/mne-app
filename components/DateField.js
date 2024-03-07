import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import colors from "../config/colors";

export default function DateField({
	heading,
	onChange,
	value = new Date(),
	style,
}) {
	const dateValue = value?.toLocaleDateString();

	return (
		<TouchableOpacity
			onPress={() =>
				DateTimePickerAndroid.open({
					value: value ? value : new Date(),
					onChange: { onChange },
					mode: "date",
					is24Hour: true,
				})
			}>
			{heading && <Text style={styles.heading}>{heading}</Text>}
			<View style={[styles.input, style]}>
				<Text>{dateValue ? dateValue : "Date"}</Text>
			</View>
		</TouchableOpacity>
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
	},
});
