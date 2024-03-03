import { View } from "react-native";

function IconButton({
	backgroundColor,
	size = 40,
	borderRadius = 60,
	extraStyles,
	children,
}) {
	return (
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
	);
}

export default IconButton;
