import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router/stack";
import { SessionProvider } from "../auth/context";
import { addEventListener } from "@react-native-community/netinfo";
import { executeQueuedActions } from "../utility/offline";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";

export default function Layout() {
	initializeApp(firebaseConfig);
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
