import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router/stack";
import { SessionProvider } from "../auth/context";
import { addEventListener } from "@react-native-community/netinfo";
import { executeQueuedActions } from "../utility/offline";

export default function Layout() {
	const unsubscribe = addEventListener(async (state) => {
		if (state.isConnected) {
			await executeQueuedActions();
		} else {
			console.log("Device offline");
			alert("device offline");
		}
	});

	unsubscribe();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SessionProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</SessionProvider>
		</GestureHandlerRootView>
	);
}
