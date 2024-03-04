import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

function useAsyncState(initialValue = [true, null]) {
	return React.useReducer(
		(state, action = null) => [false, action],
		initialValue
	);
}


const setStorageValue = async (key, value) => {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (error) {
		console.log("Error storing the value", error);
	}
};

export function getStorageValue(key) {
	// Public
	const [state, setState] = useAsyncState();

	// Get
	React.useEffect(() => {
		SecureStore.getItemAsync(key).then((value) => {
			setState(JSON.parse(value));
		});
	}, [key]);

	// Set
	const setValue = React.useCallback(
		(value) => {
			setState(value);
			setStorageValue(key, JSON.stringify(value));
		},
		[key]
	);

	return [state, setValue];
}


