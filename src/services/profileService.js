import { supabase } from '../lib/supabase';

// Helper to get current user ID
export const getCurrentUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id;
};

// Fetch the profile for the currently logged in user
export const getProfile = async () => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        // PGRST116 means zero rows returned (which is fine for a brand new user)
        if (error && error.code !== 'PGRST116') {
            console.error("Error fetching profile:", error);
            return null;
        }

        return data;
    } catch (e) {
        console.error("Exception fetching profile:", e);
        return null;
    }
};

// Update or create the profile for the currently logged in user
export const updateProfile = async (profileData) => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) return { success: false, error: 'User not authenticated' };

        // Ensure we pass null for empty strings on date and numeric fields so Postgres doesn't crash on invalid input syntax
        const safeData = {
            id: userId,
            full_name: profileData.full_name || null,
            phone: profileData.phone || null,
            farm_name: profileData.farm_name || null,
            location: profileData.location || null,
            farm_type: profileData.farm_type || null,
            system: profileData.system || null,
            start_date: profileData.start_date || null,
            capacity: profileData.capacity ? parseInt(profileData.capacity, 10) : null,
            sheds_count: profileData.sheds_count ? parseInt(profileData.sheds_count, 10) : null
        };

        const { data, error } = await supabase
            .from('profiles')
            .upsert(safeData)
            .select()
            .single();

        if (error) {
            console.error("Error updating profile:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (e) {
        console.error("Exception updating profile:", e);
        return { success: false, error: e.message };
    }
};
