import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function generate21DigitId() {
	let id = "";
	for (let i = 0; i < 21; i++) {
		id += Math.floor(Math.random() * 10);
	}
	return id;
}

export const uploadImage = async (image) => {
	try {
		const storage = getStorage();
		const path = `images/${generate21DigitId()}`;
		const storageRef = ref(storage, path);
		await uploadBytes(storageRef, image.file);
		const downloadURL = await getDownloadURL(storageRef);
		return { mediaUrl: downloadURL, mediaRef: path };
	} catch (err) {
		console.log(err);
		console.log(err.message);
	}
};
