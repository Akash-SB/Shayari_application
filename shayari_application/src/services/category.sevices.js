import { db } from "../firebase-config";
import { getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const categoryCollectionReff = collection(db, "category");

class categoryDataService {
    addCategory = (newCategory) => {
        return addDoc(categoryCollectionReff, newCategory);
    }

    updateCategory = (id, updatedCategory) => {
        const categoryDoc = doc(db, "category", id);
        return updateDoc(categoryDoc, updatedCategory);
    }

    deleteCategory = (id) => {
        const categoryDoc = doc(db, "category", id);
        return deleteDoc(categoryDoc);
    }

    getAllCategory = () => {
        return getDocs(categoryCollectionReff);
    }

    getCategory = (id) => {
        const categoryDoc = doc(db, "category", id);
        return getDoc(categoryDoc);
    }
}

export default new categoryDataService();