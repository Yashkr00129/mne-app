import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

function asyncState(initialValue = [true, null]) {
	return React.useReducer(
		(state, action = null) => [false, action],
		initialValue
	);
}

export async function setStorageValue(key, value) {
	if (Platform.OS === "web") {
		try {
			if (value === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		} catch (e) {
			console.error("Local storage is unavailable:", e);
		}
	} else {
		if (value == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, value);
		}
	}
}

export function getStorageValue(key) {
	// Public
	const [state, setState] = asyncState();

	// Get
	React.useEffect(() => {
		if (Platform.OS === "web") {
			try {
				if (typeof localStorage !== "undefined") {
					setState(localStorage.getItem(key));
				}
			} catch (e) {
				console.error("Local storage is unavailable:", e);
			}
		} else {
			SecureStore.getItemAsync(key).then((value) => {
				setState(value);
			});
		}
	}, [key]);

	// Set
	const setValue = React.useCallback(
		(value) => {
			setState(value);
			setStorageValue(key, value);
		},
		[key]
	);

	return [state, setValue];
}
