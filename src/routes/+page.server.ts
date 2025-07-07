import type { PageServerLoad, Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { formSchema } from '../lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { supabaseAdmin } from '$lib/server/supabase-admin';

const fetchSpecializations = async () => {
	try {
		const { data, error } = await supabaseAdmin
			.from('specialization')
			.select('*')
			.is('parent_id', null)
			.limit(50);
		if (error) {
			console.error(error);
		}
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const fetchLocations = async () => {
	try {
		const { data, error } = await supabaseAdmin.from('location').select('*').limit(300);
		if (error) {
			console.error(error);
		}
		return {
			cities: data?.filter((item) => item.parent_id !== null),
			provinces: data?.filter((item) => item.parent_id === null)
		};
	} catch (error) {
		console.error(error);
		return {
			cities: [],
			provinces: []
		};
	}
};

export const load = (async () => {
	const [locations, specializations] = await Promise.all([
		fetchLocations(),
		fetchSpecializations()
	]);

	return {
		form: await superValidate(zod(formSchema)),
		locationsAndSpecializations: {
			locations: {
				provinces: locations?.provinces,
				cities: locations?.cities
			},
			specializations
		}
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formSchema));
		if (form.valid) {
			// Here you could save the data to a database or send an email
			return message(form, {
				message: 'Form submitted successfully',
				type: 'success'
			});
		}
		return { form };
	}
};
