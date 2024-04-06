import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import apiClient from "../../../api/client";
import TextField from "../../../components/Input";
import colors from "../../../config/colors";
import AppButton from "../../../components/Button";
import OfflineNotice from "../../../components/OfflineNotice";

export default function AddPartyPage() {
	const [formData, setFormData] = useState({
		partyName: "",
		phoneNumber: "",
		email: "",
		city: "",
	});

	const onSubmit = () =>
		apiClient.post("/api/party", { ...formData }).then((res) => {
			if (res.ok) alert("Party Created");
			else {
				console.log(res.data);
				alert(res.data.errors[0].msg);
			}
		});

	return (
		<View style={styles.screen}>
			<OfflineNotice />
			<TextField
				label="Party Name"
				style={styles.input}
				name="partyName"
				onChangeText={(partyName) => setFormData({ ...formData, partyName })}
			/>
			<TextField
				label="Phone Number"
				style={styles.input}
				name="phoneNumber"
				onChangeText={(phoneNumber) =>
					setFormData({ ...formData, phoneNumber })
				}
			/>
			<TextField
				label="Email"
				style={styles.input}
				name="email"
				onChangeText={(email) => setFormData({ ...formData, email })}
			/>
			<TextField
				label="City"
				style={styles.input}
				name="city"
				onChangeText={(city) => setFormData({ ...formData, city })}
			/>
			<AppButton
				title="Submit"
				onPress={onSubmit}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 50,
		padding: 20,
		width: "100%",
		paddingBottom: 50,
	},
	input: {
		marginVertical: 12,
		borderWidth: 1,
		borderColor: colors.red,
		borderRadius: 15,
		padding: 15,
		height: 50,
	},
});
