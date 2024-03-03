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

	return <Drawer />;
}
