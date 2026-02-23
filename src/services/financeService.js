// src/services/financeService.js
import { supabase } from '../lib/supabase';

const getCurrentUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id;
};

export const getFinanceLogs = async () => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) return [];

        const { data, error } = await supabase
            .from('finance_logs')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error fetching finance logs:", error);
        return [];
    }
};

export const addFinanceLog = async (logData) => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('finance_logs')
            .insert([{
                ...logData,
                user_id: userId
            }])
            .select();

        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error("Error adding finance log:", error);
        return { success: false, error: error.message };
    }
};
