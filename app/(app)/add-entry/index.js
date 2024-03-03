import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../config/colors";
import IconButton from "../../../components/IconButton";
import TextField from "../../../components/Input";
import BagInput from "../../../components/add-entry/BagInput";
import AppButton from "../../../components/Button";

export default function AddEntry() {
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
			<TextField
				label="Date"
				style={styles.input}
			/>
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
