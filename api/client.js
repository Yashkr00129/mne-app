import { create } from "apisauce";
import cache from "../utility/cache";
import { getStorageValue } from "../auth/useStorageState";
import * as SecureStore from "expo-secure-store";
// import authStorage from "../auth/storage";

const apiClient = create({
	baseURL: "http://192.168.1.4:5000/",
});

apiClient.addAsyncRequestTransform(async (request) => {
	const authToken = await SecureStore.getItemAsync("token").catch((err) =>
		console.log(err)
	);
	if (!authToken) return;
	request.headers["Authorization"] = authToken;
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
	const response = await get(url, params, axiosConfig);

	if (response.ok) {
		cache.store(url, response.data);
		return response;
	}

	const data = await cache.get(url);
	return data ? { ok: true, data } : response;
};

export default apiClient;
