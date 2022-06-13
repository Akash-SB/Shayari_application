import { db } from "../firebase-config";
import { getDoc, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const statusCollectionReff = collection(db, "status");

class statusDataService {
    addStatus = (newStatus) => {
        return addDoc(statusCollectionReff, newStatus);
    }

    deleteStatus = (id) => {
        const statusDoc = doc(db, "status", id);
        return deleteDoc(statusDoc);
    }

    getAllStatus = () => {
        return getDocs(statusCollectionReff);
    }

    getStatus = (id) => {
        const statusDoc = doc(db, "status", id);
        return getDoc(statusDoc);
    }
}

export default new statusDataService();