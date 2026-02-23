import { supabase } from '../lib/supabase';

// Helper to get current user ID
const getCurrentUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id;
};

export const createEmergencyConsultation = async () => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('consultations')
            .insert([{
                user_id: userId,
                is_emergency: true,
                status: 'pending',
                type: 'dharura'
            }])
            .select();

        if (error) throw error;

        console.log("Emergency consultation created with ID:", data[0].id);
        return { success: true, id: data[0].id };
    } catch (error) {
        console.error("Error creating emergency consultation:", error);
        return { success: false, error: error.message };
    }
};

export const getConsultations = async () => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) return [];

        const { data, error } = await supabase
            .from('consultations')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting consultations:", error);
        return [];
    }
};
