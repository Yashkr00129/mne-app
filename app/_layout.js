import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router/stack";
import { SessionProvider } from "../auth/context";
import { Slot } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import { executeQueuedActions } from "../utility/offline";

export default function Layout() {
	NetInfo.addEventListener(async (state) => {
		if (state.isConnected) {
			await executeQueuedActions();
		}
	});

// 	addToRequestQueue({
// method: ‘get’,
// url: ‘https://api.example.com/data’,
// });
	
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
