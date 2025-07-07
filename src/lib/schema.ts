import { z } from 'zod';

export const referralSources = ['Google', 'LinkedIn', 'Colleague', 'Event', 'Other'] as const;

export const formSchema = z.object({
	firstName: z.string().min(2).max(40), // Used for your public profile
	lastName: z.string().min(2).max(40),
	email: z.string().email(), // We'll send your invite here
	phone: z
		.string()
		.regex(
			/^\(?([2-9][0-9]{2})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
			'Invalid Canadian phone number'
		), // For identity verification only
	province: z.string(),
	city: z.string().min(2).max(50), // Primary practice location
	primaryPractice: z.array(z.string()).min(1).max(3), // Choose up to three core areas
	yearsPractice: z.number().int().min(0).max(70),
	languages: z.array(z.string()).optional(), // Helps clients find you
	firmName: z.string().max(100).optional(),
	website: z.string().url().startsWith('https://').optional(),
	referralSource: z.enum(referralSources),
	agreeBeta: z.literal(true) // I accept the NDA & Beta Terms
});

export type FormSchema = z.infer<typeof formSchema>;
