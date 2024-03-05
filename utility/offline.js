import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "apisauce";

const offlineActionQueueKey = "offlineActionQueue";
const api = create({
	baseURL: "https://api.example.com",
});

// Function to add action to the queue
export const addToActionQueue = async (action) => {
	try {
		const existingQueue = await AsyncStorage.getItem(offlineActionQueueKey);
		const queue = existingQueue ? JSON.parse(existingQueue) : [];
		queue.push(action);
		await AsyncStorage.setItem(offlineActionQueueKey, JSON.stringify(queue));
	} catch (error) {
		console.error("Error adding action to queue:", error);
	}
};

// Function to execute queued actions
export const executeQueuedActions = async () => {
	try {
		const queue = await AsyncStorage.getItem(offlineActionQueueKey);
		if (queue) {
			const actions = JSON.parse(queue);
			for (const action of actions) {
				// Use apisauce to make API calls
				const { method, path, params } = action;
				await api[method](path, params);
			}
			// Once executed successfully, remove them from the queue
			await AsyncStorage.removeItem(offlineActionQueueKey);
		}
	} catch (error) {
		console.error("Error executing queued actions:", error);
	}
};
