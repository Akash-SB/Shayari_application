import { db } from "../firebase-config";
import { getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const shayariCollectionReff = collection(db, "shayari");

class shayariDataService {
    addShayari = (newShayari) => {
        return addDoc(shayariCollectionReff, newShayari);
    }

    updateShayari = (id, updatedShayri) => {
        const shayariDoc = doc(db, "shayari", id);
        return updateDoc(shayariDoc, updatedShayri);
    }

    deleteShayri = (id) => {
        const shayariDoc = doc(db, "shayari", id);
        return deleteDoc(shayariDoc);
    }

    getAllShayri = () => {
        return getDocs(shayariCollectionReff);
    }

    getShayari = (id) => {
        const shayariDoc = doc(db, "shayari", id);
        return getDoc(shayariDoc);
    }
}

export default new shayariDataService();