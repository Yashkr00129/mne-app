import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";

export const uploadImage = async (image) => {
	try {
		const storage = getStorage();
		const path = `images/${nanoid(10)}`;
		const storageRef = ref(storage, path);
		await uploadBytes(storageRef, image.file);
		const downloadURL = await getDownloadURL(storageRef);
		return { mediaUrl: downloadURL, mediaRef: path };
	} catch (err) {
		console.log(err);
		console.log(err.message);
	}
};
