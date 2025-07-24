import { z } from 'zod';
import { m } from './paraglide/messages';

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

	agreeBeta: z.literal(true, {
		errorMap: () => ({ message: m['form.errors.agreeBeta.required']() })
	}), // I accept the NDA & Beta Terms

	captchaToken: z.string().nonempty()
});

export type FormSchema = z.infer<typeof formSchema>;
