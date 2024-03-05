import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	RefreshControl,
} from "react-native";
import SearchBar from "../../../components/SearchBar";
import { SelectField, SelectOption } from "../../../components/Select";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../api/client";
import colors from "../../../config/colors";
import {
	AntDesign,
	FontAwesome5,
	Feather,
	FontAwesome6,
} from "@expo/vector-icons";
import DateField from "../../../components/DateField";
import { Picker } from "@react-native-picker/picker";
import useDebounce from "../../../hooks/useDebounce";

export default function EntriesScreen() {
	const [entries, setEntries] = useState([]);
	const [parties, setParties] = useState([]);
	const [partyIdFilter, setPartyIdFilter] = useState(null);
	const [markFilter, setMarkFilter] = useState(null);
	const [dateFilter, setDateFilter] = useState(null);
	const [search, setSearch] = useState("");

	const debouncedSearch = useDebounce(search, 1000); // Adjust the delay as needed

	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		setMarkFilter(null);
		setDateFilter(null);
		setSearch(null);
		setPartyIdFilter(null);

		apiClient.get("/api/entry/me").then(({ data }) => setEntries(data));

		setRefreshing(false);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiClient.get("/entries", {
					params: {
						partyId: partyIdFilter,
						mark: markFilter,
						date: dateFilter,
						search: debouncedSearch,
					},
				});
				if (response.ok) {
					setEntries(response.data);
				} else {
					console.error("Error fetching entries:", response.problem);
				}
			} catch (error) {
				console.error("Error fetching entries:", error);
			}
		};

		fetchData();
	}, [partyIdFilter, markFilter, dateFilter, debouncedSearch]);

	useEffect(() => {
		apiClient.get("/api/entry/me").then(({ data }) => setEntries(data));
	}, []);

	useEffect(() => {
		apiClient.get("/api/party").then((res) => setParties(res.data));
	}, []);

	return (
		<ScrollView
			style={styles.screen}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={handleRefresh}
				/>
			}>
			<SearchBar style={{ marginTop: 10 }} />
			<View style={styles.filtersContainer}>
				<View style={{ width: "33%" }}>
					<SelectField
						onChange={(party) => setPartyIdFilter(party)}
						selectedValue={partyIdFilter}
						style={{ height: 50 }}>
						{parties.map((party) => (
							<SelectOption
								key={party._id}
								label={party.partyName}
								value={party}
							/>
						))}
					</SelectField>
				</View>
				<View style={{ width: "33%" }}>
					<View
						style={{
							borderWidth: 1,
							borderColor: colors.red,
							height: 50,
							borderRadius: 15,
						}}>
						<Picker placeholder="Mark">
							<Picker.Item
								style={{ fontSize: 11 }}
								value={null}
								label="Mark"
							/>
							<Picker.Item
								style={{ fontSize: 11 }}
								value={"abc"}
								label={"ABC"}
							/>
							<Picker.Item
								style={{ fontSize: 11 }}
								value={null}
								label={"Clear"}
							/>
						</Picker>
					</View>
				</View>
				<View style={{ width: "33%" }}>
					<DateField
						style={{ marginVertical: 0 }}
						value={null}
					/>
				</View>
			</View>
			{entries.map((entry) => (
				<View
					key={entry._id}
					style={{
						borderWidth: 1,
						borderColor: colors.red,
						padding: 10,
						borderRadius: 10,
					}}>
					<View style={styles.entryField}>
						<FontAwesome5
							name="ticket-alt"
							size={22}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>S.No - {entry.sNo}</Text>
					</View>
					<View style={styles.entryField}>
						<AntDesign
							name="calendar"
							size={24}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>Date - {new Date(entry.date).toLocaleDateString()}</Text>
					</View>
					<View style={styles.entryField}>
						<AntDesign
							name="user"
							size={24}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>Party name - {entry.partyName}</Text>
					</View>
					<View style={styles.entryField}>
						<FontAwesome5
							name="warehouse"
							size={20}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>Material center - {entry.materialCenter}</Text>
					</View>
					<View style={styles.entryField}>
						<AntDesign
							name="tago"
							size={24}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>Mark - {entry.mark}</Text>
					</View>
					<View style={styles.entryField}>
						<Feather
							name="shopping-bag"
							size={24}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>Number of bags - {entry.noOfBags}</Text>
					</View>

					<View style={styles.entryField}>
						<FontAwesome5
							name="rupee-sign"
							size={24}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>Rate - Rs. {entry.ratePerQuintal}</Text>
					</View>
					<View style={styles.entryField}>
						<FontAwesome6
							name="weight-hanging"
							size={20}
							color={colors.red}
							style={styles.icon}
						/>
						<Text>Net Weight - {entry.netWeight}kg</Text>
					</View>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: { paddingHorizontal: 15 },
	entryField: {
		flexDirection: "row",
		marginBottom: 10,
		gap: 10,
		alignItems: "center",
	},
	icon: {
		width: "10%",
	},
	filtersContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginVertical: 10,
	},
});
