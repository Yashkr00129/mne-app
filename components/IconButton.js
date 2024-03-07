import { TouchableOpacity, View } from "react-native";

function IconButton({
	backgroundColor,
	size = 40,
	borderRadius = 60,
	extraStyles,
	onPress,
	children,
}) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					backgroundColor,
					width: size,
					height: size,
					borderRadius,
					justifyContent: "center",
					alignItems: "center",
					...extraStyles,
				}}>
				{children}
			</View>
		</TouchableOpacity>
	);
}

export default IconButton;
