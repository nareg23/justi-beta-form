import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/supabase';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

console.log(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE_KEY);

export const supabaseAdmin: SupabaseClient<Database> = createClient(
	PUBLIC_SUPABASE_URL!,
	PRIVATE_SUPABASE_SERVICE_ROLE_KEY!,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	}
);
