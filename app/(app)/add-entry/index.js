import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../config/colors";
import IconButton from "../../../components/IconButton";
import TextField from "../../../components/Input";
import BagInput from "../../../components/add-entry/BagInput";
import AppButton from "../../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import apiClient from "../../../api/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function AddEntry() {
	const [parties, setParties] = useState([]);
	const [formData, setFormData] = useState({
		sNo: "",
		ratePerQuintal: "",
		picture: "",
		mark: "",
		party: "",
		materialCenter: "",
		noOfBags: "",
		bags: [{ sNo: 1, weight: 0 }],
		lessTare: 0,
		totalWeight: 0,
		netWeight: 0,
		date: new Date(),
	});

	const showDateTimePicker = () => {
		DateTimePickerAndroid.open({
			value: formData.date,
			onChange: (e, selectedDate) =>
				setFormData({ ...formData, date: selectedDate }),
			mode: "date",
			is24Hour: true,
		});
	};

	useEffect(() => {
		apiClient.get("/api/party").then((res) => setParties(res.data));
	}, []);

	useEffect(() => {
		let updatedBags = [...formData.bags];

		let newSNo =
			formData.bags.length > 0
				? formData.bags[formData.bags.length - 1].sNo + 1
				: 1;

		const diff = formData.noOfBags - formData.bags.length;

		if (diff > 0) {
			for (let i = 0; i < diff; i++) {
				const newBag = {
					sNo: newSNo++,
				};
				updatedBags.push(newBag);
			}
		} else if (diff < 0) {
			updatedBags = updatedBags.slice(0, formData.noOfBags);
		}

		setFormData({ ...formData, bags: updatedBags });
	}, [formData.noOfBags]);

	useEffect(() => {
		const netWeight = formData.totalWeight - formData.lessTare;
		setFormData((prevFormData) => ({ ...prevFormData, netWeight }));
	}, [formData.lessTare]);

	useEffect(() => {
		const totalWeight = formData.bags.reduce(
			(acc, bag) => acc + parseFloat(bag.weight || 0),
			0
		);

		setFormData((prevFormData) => ({ ...prevFormData, totalWeight }));
	}, [formData.bags, formData.totalWeight]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleWeightChange = (index, newWeight) => {
		const bags = [...formData.bags];
		bags[index].weight = newWeight;
		setFormData({ ...formData, bags });
	};

	const onSubmit = () => apiClient.post("/api/entry", formData);

	return (
		<ScrollView style={styles.screen}>
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 20,
				}}>
				<IconButton
					borderRadius={10}
					size={60}
					extraStyles={{
						borderColor: colors.red,
						borderWidth: 1,
					}}>
					<AntDesign
						name="camera"
						size={24}
						color={colors.red}
					/>
				</IconButton>
				<View
					style={{
						backgroundColor: colors.light,
						padding: 20,
						borderRadius: 10,
					}}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>Take Photo</Text>
				</View>
				<View
					style={{
						backgroundColor: colors.light,
						padding: 20,
						borderRadius: 10,
					}}>
					<AntDesign
						name="delete"
						size={24}
						color="black"
					/>
				</View>
			</View>
			<TouchableOpacity onPress={showDateTimePicker}>
				<View style={styles.input}>
					<Text>{formData.date.toLocaleDateString()}</Text>
				</View>
			</TouchableOpacity>

			<TextField
				label={"Party Name"}
				style={styles.input}
			/>
			<View style={styles.inputGrid}>
				<View style={{ width: "45%" }}>
					<TextField
						style={styles.input}
						label="Mark"
					/>
				</View>
				<View style={{ width: "45%" }}>
					<TextField
						style={styles.input}
						label="Number Of Bags"
					/>
				</View>
			</View>
			<View style={styles.inputGrid}>
				<View style={{ width: "45%" }}>
					<TextField
						style={styles.input}
						label="S.no"
					/>
				</View>
				<View style={{ width: "45%" }}>
					<TextField
						style={styles.input}
						label="Rate per quintal"
					/>
				</View>
			</View>
			<Text style={styles.heading}>Add Bags</Text>
			<BagInput />
			<TextField
				style={styles.input}
				label="Total Weight (IN KGS)"
			/>
			<TextField
				style={styles.input}
				label="Less tare"
			/>
			<TextField
				style={styles.input}
				label="Net Weight"
			/>
			<AppButton title="Submit" />
			<View style={{ height: 50 }} />
		</ScrollView>
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
	heading: {
		fontSize: 25,
	},
	inputGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
	},
	input: {
		marginVertical: 12,
		borderWidth: 1,
		borderColor: colors.red,
		borderRadius: 15,
		padding: 15,
	},
});

// Next task
// The number of bags that are entered, will be the number of bag inputs
// State in each will be individually managed.
// Add Date Picker
// Implement Dropdown
