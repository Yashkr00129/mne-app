import { Image } from "react-native";

export default function Logo({ width = 100, height = 100, style }) {
	return (
		<Image
			source={require("../assets/logo.png")}
			width={width}
			height={height}
			style={style}
		/>
	);
}
