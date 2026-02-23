import { supabase } from '../lib/supabase';

export const getDashboardStats = async () => {
    try {
        // 1. Fetch Flocks (Kuku) - Ideally we would sum bird_count via RPC if heavily scaled
        // For now, doing a standard select
        const { data: flocks, error: flocksError } = await supabase
            .from('flocks')
            .select('bird_count');

        if (flocksError) throw flocksError;

        let totalKuku = 0;
        if (flocks) {
            totalKuku = flocks.reduce((sum, flock) => sum + (flock.bird_count || 0), 0);
        }

        // 2. Fetch Products Count
        const { count: totalProducts, error: productsError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        if (productsError) throw productsError;

        // 3. Fetch Consultations Count
        const { count: totalMiadi, error: consultationsError } = await supabase
            .from('consultations')
            .select('*', { count: 'exact', head: true });

        if (consultationsError) throw consultationsError;

        return {
            kuku: totalKuku,
            mauzo: totalProducts || 0,
            miadi: totalMiadi || 0
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return { kuku: 0, mauzo: 0, miadi: 0 };
    }
};
