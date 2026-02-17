import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const createEmergencyConsultation = async (userId = 'guest') => {
    try {
        const docRef = await addDoc(collection(db, 'consultations'), {
            user_id: userId,
            is_emergency: true,
            status: 'pending',
            timestamp: serverTimestamp(),
            type: 'dharura'
        });
        console.log("Emergency consultation created with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating emergency consultation: ", error);
        return { success: false, error };
    }
};
