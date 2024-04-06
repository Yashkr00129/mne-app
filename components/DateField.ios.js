import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";

const DateField = ({ style, value = new Date(), onChange }) => {
	const handleChange = (e, selectedDate) => {
		console.log(selectedDate, "selected date");
		onChange(new Date(selectedDate));
	};

	if (value === null) {
		value = new Date();
	}

	return (
		<>
			<TouchableOpacity>
				<View style={[styles.input, style]}>
					<Text>{(value && value?.toDateString()) || "Date"}</Text>

					<DateTimePicker
						testID="dateTimePicker"
						value={value}
						mode={"date"}
						is24Hour={true}
						onChange={handleChange}
					/>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default DateField;

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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
