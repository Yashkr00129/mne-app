import { TouchableOpacity, View, Text } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import colors from "../config/colors";

export default function DateField({ onChange, value = new Date(), style }) {
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
			<View
				style={{
					marginVertical: 12,
					borderWidth: 1,
					borderColor: colors.red,
					borderRadius: 15,
					padding: 15,
					...style,
				}}>
				<Text>{dateValue ? dateValue : "Date"}</Text>
			</View>
		</TouchableOpacity>
	);
}
