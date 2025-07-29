import type { PageServerLoad, Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { formSchema } from '../lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { supabaseAdmin } from '$lib/server/supabase-admin';
import { saveForm } from '$lib/server/save-form';
import { m } from '$lib/paraglide/messages';
import { verifyCaptcha } from '$lib/server/captcha';

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
		return data ?? [];
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
			cities: data?.filter((item) => item.parent_id !== null) ?? [],
			provinces: data?.filter((item) => item.parent_id === null) ?? []
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

		if (!form.valid) {
			return message(
				form,
				{
					text: m['form.submission.error'](),
					type: 'error'
				},
				{ status: 400 }
			);
		}

		const { success } = await verifyCaptcha(form.data.captchaToken);

		if (!success) {
			return message(form, {
				text: m['form.submission.error'](),
				type: 'error'
			});
		}

		const saved = await saveForm(form.data);
		if (!saved) {
			return message(form, {
				text: m['form.submission.error'](),
				type: 'error'
			});
		}

		return message(form, {
			text: m['form.submission.success'](),
			type: 'success'
		});
	}
};
