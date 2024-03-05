import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";

export function SelectField({
	label,
	selectedValue,
	onChange,
	children,
	style,
}) {
	return (
		<>
			{label && (
				<Text style={{ fontWeight: "bold", fontSize: 16 }}>{label}</Text>
			)}
			<View
				style={{
					marginVertical: 12,
					borderWidth: 1,
					borderColor: colors.red,
					borderRadius: 15,
					...style,
				}}>
				<Picker
					selectedValue={selectedValue}
					onValueChange={onChange}>
					{children}
				</Picker>
			</View>
		</>
	);
}
export function SelectOption({ value, label }) {
	return (
		<Picker.Item
			label={label}
			value={value}
		/>
	);
}
