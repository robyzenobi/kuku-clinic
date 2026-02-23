import { supabase } from '../lib/supabase';

// Helper to get current user ID
const getCurrentUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id;
};

export const addFlock = async (flockData) => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('flocks')
            .insert([{
                ...flockData,
                user_id: userId,
                status: 'active'
            }])
            .select();

        if (error) throw error;

        console.log("Flock created with ID:", data[0].id);
        return { success: true, id: data[0].id };
    } catch (error) {
        console.error("Error adding flock:", error);
        return { success: false, error: error.message };
    }
};

export const getFlocks = async () => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) return [];

        const { data: flocks, error } = await supabase
            .from('flocks')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return flocks || [];
    } catch (error) {
        console.error("Error getting flocks:", error);
        return [];
    }
};

