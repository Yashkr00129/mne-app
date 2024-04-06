import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useSession } from "../../auth/context";
import { Text } from "react-native";
import ActivityIndicator from "../../components/ActivityIndicator";
import OfflineNotice from "../../components/OfflineNotice";

export default function AppLayout() {
	const { session, isLoading } = useSession();

	if (isLoading) {
		return <ActivityIndicator visible={isLoading} />;
	}

	if (!session) {
		return <Redirect href="/login" />;
	}

	return (
		<>
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
				<Drawer.Screen
					name="add-party/index"
					options={{
						drawerLabel: "Add Party",
						title: "Add Party",
					}}
				/>
			</Drawer>
		</>
	);
}
