import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
	// Check if token is present in store.
	// If token is present, then get the user data.
	// After getting the userdata
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer>
				<Drawer.Screen
					name="index"
					options={{
						drawerLabel: "Home",
						title: "overview",
					}}
				/>
				<Drawer.Screen
					name="login/index"
					options={{
						drawerLabel: "Login",
						title: "overview",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
