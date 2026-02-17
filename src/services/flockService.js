import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export const addFlock = async (flockData) => {
    try {
        const docRef = await addDoc(collection(db, 'flocks'), {
            ...flockData,
            created_at: serverTimestamp(),
            status: 'active'
        });
        console.log("Flock created with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding flock: ", error);
        return { success: false, error };
    }
};

export const getFlocks = async () => {
    try {
        const q = query(collection(db, 'flocks'), orderBy('created_at', 'desc'));
        const querySnapshot = await getDocs(q);
        const flocks = [];
        querySnapshot.forEach((doc) => {
            flocks.push({ id: doc.id, ...doc.data() });
        });
        return flocks;
    } catch (error) {
        console.error("Error getting flocks: ", error);
        return [];
    }
};
