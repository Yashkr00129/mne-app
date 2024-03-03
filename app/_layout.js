import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router/stack";
import { SessionProvider } from "../auth/context";
import { Slot } from "expo-router";

export default function Layout() {
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
