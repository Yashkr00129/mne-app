import React from "react";
import { getStorageValue, setStorageValue } from "./useStorageState";
import apiClient from "../api/client";

const AuthContext = React.createContext({
	signIn: (session) => null,
	signOut: () => null,
	session: null,
	isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
	const value = React.useContext(AuthContext);
	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useSession must be wrapped in a <SessionProvider />");
		}
	}

	return value;
}

export function SessionProvider(props) {
	const [[isLoading, session], setSession] = getStorageValue("session");

	return (
		<AuthContext.Provider
			value={{
				signIn: async (session) => {
					apiClient.addAsyncRequestTransform(async (request) => {
						try {
							request.headers["Authorization"] = session.token;
						} catch (err) {
							console.log(err);
						}
					});

					setStorageValue("token", session.token);

					const res = await apiClient.get("/api/auth");
					if (!res.ok) alert("User does not exist.");
					setSession(res.data);
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}
