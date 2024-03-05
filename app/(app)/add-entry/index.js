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
import { Picker } from "@react-native-picker/picker";
import { SelectField, SelectOption } from "../../../components/Select";
import DateField from "../../../components/DateField";
import { NetInfo } from "react-native";

export default function AddEntry() {
	const [parties, setParties] = useState([]);
	const [formData, setFormData] = useState({
		sNo: "",
		ratePerQuintal: "",
		picture: "",
		mark: "",
		party: "",
		materialCenter: "",
		noOfBags: 1,
		bags: [{ sNo: 1, weight: 0 }],
		lessTare: 0,
		totalWeight: 0,
		netWeight: 0,
		date: new Date(),
	});

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

	const handleWeightChange = (index, newWeight) => {
		const bags = [...formData.bags];
		bags[index].weight = newWeight;
		setFormData({ ...formData, bags });
	};

	const onSubmit = () =>
		apiClient.post("/api/entry", formData).then((res) => {
			if (res.ok) {
				alert("Entry Successful");
				setFormData({
					sNo: "",
					ratePerQuintal: "",
					picture: "",
					mark: "",
					party: "",
					materialCenter: "",
					noOfBags: 1,
					bags: [{ sNo: 1, weight: 0 }],
					lessTare: 0,
					totalWeight: 0,
					netWeight: 0,
					date: new Date(),
				});
			}
		});

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
			<DateField
				onChange={(e, selectedDate) =>
					setFormData({ ...formData, date: selectedDate })
				}
				value={formData.date}
			/>
			<SelectField
				label={"Party Name"}
				onChange={(party) => setFormData({ ...formData, party })}>
				{parties.map((party) => (
					<SelectOption
						label={party.partyName}
						value={party._id}
					/>
				))}
			</SelectField>
			<SelectField
				label="Material Center"
				selectedValue={formData.materialCenter}
				onChange={(materialCenter) =>
					setFormData({ ...formData, materialCenter })
				}>
				<SelectOption
					label="Yard"
					value="yard"
				/>
				<SelectOption
					label="Cold"
					value="cold"
				/>
				<SelectOption
					label="Godown"
					value="godown"
				/>
			</SelectField>
			<View style={styles.inputGrid}>
				<View style={{ width: "45%" }}>
					<SelectField
						label={"Mark"}
						selectedValue={formData.mark}
						onChange={(mark) => setFormData({ ...formData, mark })}>
						<SelectOption
							label="abc"
							value="abc"
						/>
						<SelectOption
							label="xyz"
							value="abc"
						/>
					</SelectField>
				</View>
				<View style={{ width: "45%" }}>
					<TextField
						style={styles.input}
						label="Number Of Bags"
						onChangeText={(noOfBags) => setFormData({ ...formData, noOfBags })}
						keyboardType="number-pad"
					/>
				</View>
			</View>
			<View style={styles.inputGrid}>
				<View style={{ width: "45%" }}>
					<TextField
						style={styles.input}
						label="S.No"
						onChangeText={(sNo) => setFormData({ ...formData, sNo })}
					/>
				</View>
				<View style={{ width: "45%" }}>
					<TextField
						style={styles.input}
						label="Rate per quintal"
						onChangeText={(ratePerQuintal) =>
							setFormData({ ...formData, ratePerQuintal })
						}
					/>
				</View>
			</View>
			{/* Bag Creation */}
			<View style={styles.bagContainer}>
				<Text style={styles.heading}>Bags</Text>
				{formData.bags.map((bag, index) => (
					<View
						style={styles.bagCreateInput}
						key={bag.sNo}>
						<View style={{ ...styles.input, width: "25%" }}>
							<Text>{bag.sNo}</Text>
						</View>
						<TextInput
							style={{ ...styles.input, width: "50%" }}
							onChangeText={(text) => handleWeightChange(index, text)}
							keyboardType="numeric"
						/>
						<IconButton
							backgroundColor={colors.light}
							size={50}>
							<AntDesign
								name="delete"
								size={24}
								color="black"
							/>
						</IconButton>
					</View>
				))}
			</View>
			<Text style={{ fontWeight: "bold", fontSize: 16 }}>Total Weight</Text>
			<TouchableOpacity
				onPress={() =>
					alert(
						"This field can not be edited. It will be automatically calculated."
					)
				}>
				<View style={{ ...styles.input }}>
					<Text>{formData.totalWeight}</Text>
				</View>
			</TouchableOpacity>
			<TextField
				style={styles.input}
				label="Less tare"
				keyboardType="numeric"
				onChangeText={(lessTare) => setFormData({ ...formData, lessTare })}
			/>
			<TouchableOpacity
				onPress={() =>
					alert(
						"This field can not be edited. It will be automatically calculated."
					)
				}>
				<Text style={{ fontWeight: "bold", fontSize: 16 }}>Net Weight</Text>
				<View style={{ ...styles.input }}>
					<Text>{formData.netWeight}</Text>
				</View>
			</TouchableOpacity>
			<AppButton
				title="Submit"
				onPress={onSubmit}
			/>
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
	bagContainer: {
		paddingVertical: 10,
		marginVertical: 10,
		borderTopColor: colors.light,
		borderTopWidth: 1,
		borderBottomColor: colors.light,
		borderBottomWidth: 1,
	},
	bagCreateInput: {
		width: "100%",
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		justifyContent: "space-between",
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
		height: 50,
	},
});

// Next task
// The number of bags that are entered, will be the number of bag inputs
// State in each will be individually managed.
// Implement Dropdown
