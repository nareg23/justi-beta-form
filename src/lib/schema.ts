import { z } from 'zod';
import { m } from './paraglide/messages';

export const referralSources = [
	{
		label: 'Google',
		value: 'Google',
		fr_label: 'Google'
	},
	{
		label: 'LinkedIn',
		value: 'LinkedIn',
		fr_label: 'LinkedIn'
	},
	{
		label: 'Colleague',
		value: 'Colleague',
		fr_label: 'Collègue'
	},
	{
		label: 'Event',
		value: 'Event',
		fr_label: 'Événement'
	},
	{
		label: 'Email',
		value: 'Email',
		fr_label: 'Email'
	},
	{
		label: 'Other',
		value: 'Other',
		fr_label: 'Autre'
	}
] as const;

export const formSchema = z.object({
	firstName: z
		.string({
			required_error: m['form.errors.firstName.required'](),
			invalid_type_error: m['form.errors.firstName.invalid']()
		})
		.min(2, m['form.errors.firstName.tooShort']())
		.max(40, m['form.errors.firstName.tooLong']()), // Used for your public profile
	lastName: z
		.string({
			required_error: m['form.errors.lastName.required'](),
			invalid_type_error: m['form.errors.lastName.invalid']()
		})
		.min(2, m['form.errors.lastName.tooShort']())
		.max(40, m['form.errors.lastName.tooLong']()),
	email: z
		.string({
			required_error: m['form.errors.email.required'](),
			invalid_type_error: m['form.errors.email.invalid']()
		})
		.email(m['form.errors.email.invalid']()), // We'll send your invite here
	phone: z
		.string({
			required_error: m['form.errors.phone.required'](),
			invalid_type_error: m['form.errors.phone.invalid']()
		})
		.regex(
			/^\(?([2-9][0-9]{2})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
			m['form.errors.phone.invalid']()
		), // For identity verification only
	province: z
		.string({
			required_error: m['form.errors.province.required'](),
			invalid_type_error: m['form.errors.province.invalid']()
		})
		.nonempty(m['form.errors.province.required']()),
	city: z
		.string({
			required_error: m['form.errors.city.required'](),
			invalid_type_error: m['form.errors.city.invalid']()
		})
		.min(2, m['form.errors.city.tooShort']())
		.max(50, m['form.errors.city.tooLong']()),
	specializations: z
		.array(z.string(), {
			required_error: m['form.errors.specializations.required'](),
			invalid_type_error: m['form.errors.specializations.invalid']()
		})
		.min(1, m['form.errors.specializations.min']()),
	otherSpecialization: z
		.string({
			required_error: m['form.errors.otherSpecialization.required'](),
			invalid_type_error: m['form.errors.otherSpecialization.invalid']()
		})
		.min(2, m['form.errors.otherSpecialization.tooShort']())
		.max(100, m['form.errors.otherSpecialization.tooLong']())
		.optional(),
	yearsPractice: z
		.number({
			required_error: m['form.errors.yearsPractice.required'](),
			invalid_type_error: m['form.errors.yearsPractice.invalid']()
		})
		.int(m['form.errors.yearsPractice.integer']())
		.min(0, m['form.errors.yearsPractice.min']())
		.max(70, m['form.errors.yearsPractice.max']()),
	firmName: z
		.string({
			invalid_type_error: m['form.errors.firmName.invalid']()
		})
		.max(100, m['form.errors.firmName.tooLong']())
		.optional(),
	agreeBeta: z.literal(true, {
		errorMap: () => ({ message: m['form.errors.agreeBeta.required']() })
	}), // I accept the NDA & Beta Terms
	website: z
		.string({
			invalid_type_error: m['form.errors.website.invalid']()
		})
		.refine((val) => val === '' || val.startsWith('https://'), m['form.errors.website.https']())
		.refine(
			(val) => val === '' || z.string().url().safeParse(val).success,
			m['form.errors.website.invalid']()
		)
		.optional(),

	referralSource: z.enum(referralSources.map((source) => source.value) as [string, ...string[]], {
		required_error: m['form.errors.referralSource.required'](),
		invalid_type_error: m['form.errors.referralSource.invalid']()
	}),
	captchaToken: z.string().nonempty()
});

export type FormSchema = z.infer<typeof formSchema>;
