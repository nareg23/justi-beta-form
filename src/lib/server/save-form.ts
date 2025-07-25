import { PRIVATE_CMS_URL } from '$env/static/private';
import { getLocale } from '$lib/paraglide/runtime';

type FormSchema = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	province: string;
	city: string;
	specializations: string[];
	otherSpecialization?: string;
	agreeBeta: true;
};

export const saveForm = async (form: FormSchema): Promise<boolean> => {
	const URL = `${PRIVATE_CMS_URL}/api/beta-form`;
	try {
		const res = await fetch(URL, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...form,
				specializations: form.specializations.map((s) => ({
					specialization: s
				})),
				selected_language: getLocale()
			})
		});
		if (!res.ok) {
			const data = await res.json();
			console.log(data);
			throw new Error('Failed to save form');
		}
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};
