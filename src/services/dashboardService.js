import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getDashboardStats = async () => {
    try {
        // 1. Fetch Flocks (Kuku)
        const flocksSnapshot = await getDocs(collection(db, 'flocks'));
        // Calculate total birds across all flocks
        let totalKuku = 0;
        flocksSnapshot.forEach(doc => {
            totalKuku += (doc.data().bird_count || 0);
        });

        // 2. Fetch Products (Mauzo/Sales - simplify to just product count for now or sales records if exist)
        // For now let's assume 'products' count represents inventory items or similar. 
        // If 'Mauzo' implies specific sales transactions, we might query 'sales' collection later.
        // Let's count items in 'products' for now as a proxy or 0 if empty.
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const totalProducts = productsSnapshot.size;

        // 3. Fetch Consultations (Miadi)
        const consultationsSnapshot = await getDocs(collection(db, 'consultations'));
        const totalMiadi = consultationsSnapshot.size;

        return {
            kuku: totalKuku,
            mauzo: totalProducts,
            miadi: totalMiadi
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Return zeros on error to prevent crash
        return {
            kuku: 0,
            mauzo: 0,
            miadi: 0
        };
    }
};
