import { View } from "react-native";

function IconButton({ backgroundColor, children }) {
	return (
		<View
			style={{
				backgroundColor,
				width: 40,
				height: 40,
				borderRadius: 50,
				justifyContent: "center",
				alignItems: "center",
			}}>
			{children}
		</View>
	);
}

export default IconButton;
