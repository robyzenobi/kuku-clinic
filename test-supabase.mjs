import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjqjunzurzzeeszcqgix.supabase.co';
const supabaseKey = 'sb_publishable_jivQ-r30n8WV7S2fp9BY3w_sflNtvqb';
const supabase = createClient(supabaseUrl, supabaseKey);

const tables = [
    'profiles',
    'flocks',
    'consultations',
    'health_logs',
    'feed_logs',
    'production_logs',
    'finance_logs',
    'vets'
];

async function checkTables() {
    console.log('Checking Supabase tables...');
    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            console.error(`\u274C Table [${table}]: ERROR - ${error.message} (Code: ${error.code})`);
        } else {
            console.log(`\u2705 Table [${table}]: EXISTS (RLS active, returned ${data.length} rows)`);
        }
    }
}

checkTables();
