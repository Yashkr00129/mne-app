import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";

import colors from "../../../config/colors";
import apiClient from "../../../api/client";
import IconButton from "../../../components/IconButton";
import TextField from "../../../components/Input";
import AppButton from "../../../components/Button";
import { SelectField, SelectOption } from "../../../components/Select";
import DateField from "../../../components/DateField";
import UneditableField from "../../../components/UneditableField";
import CameraInput from "../../../components/CameraInput";
import OfflineNotice from "../../../components/OfflineNotice";
import { executeQueuedActions } from "../../../utility/offline";
import { uploadImage } from "../../../utility/uploadImages";

const defaultState = {
	sNo: 0,
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
};

const materialCenters = [
	{
		label: "Yard",
		value: "yard",
	},
	{
		label: "Cold",
		value: "cold",
	},
	{
		label: "Godown",
		value: "godown",
	},
];

export default function AddEntry() {
	NetInfo.addEventListener(async (state) => {
		if (state.isConnected) {
			await executeQueuedActions();
		}
	});

	const [parties, setParties] = useState([]);
	const [formData, setFormData] = useState(defaultState);

	useEffect(() => {
		apiClient.get("/api/party").then((res) => {
			setParties(res.data);
		});
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
					weight: 0,
				};
				updatedBags.push(newBag);
			}
		} else if (diff < 0) {
			updatedBags = updatedBags.slice(0, formData.noOfBags);
		}

		setFormData({ ...formData, bags: updatedBags });
	}, [formData.noOfBags]);

	// This useEffect chnages netWeight based on lessTare and total weight
	useEffect(() => {
		const netWeight = formData.totalWeight - formData.lessTare;
		setFormData((prevFormData) => ({ ...prevFormData, netWeight }));
	}, [formData.lessTare, formData.totalWeight]);

	useEffect(() => {
		const totalWeight = formData.bags.reduce(
			(acc, bag) => acc + parseFloat(bag.weight || 0),
			0
		);

		setFormData((prevFormData) => ({ ...prevFormData, totalWeight }));
	}, [formData.bags, formData.totalWeight]);

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			lessTare: formData.noOfBags,
		}));
	}, [formData.noOfBags]);

	useEffect(() => {
		let newSNo = formData.sNo + 1;

		setFormData({
			...formData,
			noOfBags: formData.bags.length,
			bags: formData.bags.map((bag, index) => ({
				...bag,
				sNo: newSNo++,
			})),
		});
	}, [formData.sNo, formData.bags.length]);

	const handleWeightChange = (index, newWeight) => {
		if (newWeight % 0.5 !== 0) {
			return alert("Only multiples of 0.5 are allowed.");
		}
		if (newWeight > 99) {
			return alert("Weight must be less than 100kg");
		}
		const bags = [...formData.bags];
		bags[index].weight = newWeight;
		setFormData({ ...formData, bags });
	};

	const deleteBag = (index) => {
		const updatedBags = formData.bags.filter((_, i) => i !== index);
		setFormData({ ...formData, bags: updatedBags });
	};

	const onSubmit = async () => {
		// Write code here to upload the picture from formdata to firebase.
		// Then add that image url to the form data.
		const image = await uploadImage(formData.picture);
		console.log(image);
		apiClient.post("/api/entry", formData).then((res) => {
			if (res.ok) {
				alert("Entry Successful");
				// setFormData(defaultState);
			} else {
				alert("Entry not successful");
			}
		});
	};

	return (
		<ScrollView style={styles.screen}>
			<OfflineNotice />
			<CameraInput
				imageUri={formData.picture}
				onChangeImage={(picture) => setFormData({ ...formData, picture })}
			/>
			<DateField
				heading={"Date"}
				onChange={(date) => setFormData({ ...formData, date })}
				value={formData.date}
			/>
			<SelectField
				label={"Party Name"}
				onChange={(party) => setFormData({ ...formData, party })}
				selectedValue={formData.party}>
				<SelectOption
					value={null}
					label="Select Party"
				/>
				{parties.map((party, index) => (
					<SelectOption
						key={index}
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
				{materialCenters.map((materialCenter, index) => (
					<SelectOption
						key={index}
						label={materialCenter.label}
						value={materialCenter.value}
					/>
				))}
			</SelectField>
			<View style={styles.inputGrid}>
				<TextField
					style={styles.input}
					containerStyle={styles.inputGridItem}
					label="Mark"
					value={formData.mark}
					onChangeText={(mark) => setFormData({ ...formData, mark })}
				/>
				<TextField
					style={styles.input}
					containerStyle={styles.inputGridItem}
					label="Number Of Bags"
					onChangeText={(noOfBags) =>
						setFormData({ ...formData, noOfBags: parseFloat(noOfBags) })
					}
					keyboardType="number-pad"
				/>
			</View>
			<View style={styles.inputGrid}>
				<TextField
					style={styles.input}
					containerStyle={styles.inputGridItem}
					label="S.No"
					onChangeText={(sNo) =>
						setFormData({ ...formData, sNo: parseFloat(sNo) })
					}
				/>
				<TextField
					style={styles.input}
					placeholder={"₹"}
					containerStyle={styles.inputGridItem}
					keyboardType="number-pad"
					label="Rate per quintal(₹)"
					onChangeText={(ratePerQuintal) =>
						setFormData({ ...formData, ratePerQuintal })
					}
				/>
			</View>
			{/* Bag Creation */}
			<View style={styles.bagContainer}>
				<Text style={styles.heading}>Bags</Text>
				{formData.bags.map((bag, index) => (
					<EntryField
						key={index}
						bag={bag}
						handleWeightChange={handleWeightChange}
						deleteBag={deleteBag}
						index={index}
					/>
				))}
			</View>
			<UneditableField
				value={formData.totalWeight}
				heading={"Total Weight"}
			/>
			<UneditableField
				value={formData.noOfBags}
				heading={"Less Tare"}
			/>
			<UneditableField
				value={formData.netWeight}
				heading="Net Weight"
			/>
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
	inputGridItem: {
		width: "45%",
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

function EntryField({ bag, handleWeightChange, deleteBag, index }) {
	return (
		<View
			style={styles.bagCreateInput}
			key={bag.sNo}>
			<View style={{ ...styles.input, width: "25%" }}>
				<Text>{bag.sNo}</Text>
			</View>
			<TextInput
				style={{ ...styles.input, width: "50%" }}
				onChangeText={(text) => {
					handleWeightChange(index, text);
				}}
				value={"" + bag.weight}
				keyboardType="numeric"
			/>
			<IconButton
				onPress={() => deleteBag(index)}
				backgroundColor={colors.light}
				size={50}>
				<AntDesign
					name="delete"
					size={24}
					color="black"
				/>
			</IconButton>
		</View>
	);
}
