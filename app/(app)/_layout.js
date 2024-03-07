import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useSession } from "../../auth/context";
import { Text } from "react-native";

export default function AppLayout() {
	const { session, isLoading } = useSession();

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (!session) {
		return <Redirect href="/login" />;
	}

	return (
		<Drawer>
			<Drawer.Screen
				name="index"
				options={{
					drawerLabel: "Home",
					title: "Home",
				}}
			/>
			<Drawer.Screen
				name="add-entry/index"
				options={{
					drawerLabel: "Add Entry",
					title: "Add Entry",
				}}
			/>
			<Drawer.Screen
				name="entries/index"
				options={{
					drawerLabel: "My Entries",
					title: "My Entries",
				}}
			/>
		</Drawer>
	);
}
