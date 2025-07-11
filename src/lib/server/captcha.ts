import { PRIVATE_CAPTCHA_SECRET_KEY } from '$env/static/private';

type CaptchaVerificationResult = {
	success: boolean;
	score?: number;
	errorCodes?: string[];
	message?: string;
};

export async function verifyCaptcha(
	token: string,
	secretKey: string = PRIVATE_CAPTCHA_SECRET_KEY
): Promise<CaptchaVerificationResult> {
	if (!token) return { success: false, message: 'No captcha token provided' };
	try {
		const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				secret: secretKey,
				response: token
			})
		});

		const result = (await response.json()) as {
			success: boolean;
			score?: number;
			'error-codes'?: string[];
			message?: string;
		};

		return {
			success: result.success === true,
			score: result.score,
			errorCodes: result['error-codes'],
			message: result.success ? 'Verification successful' : 'Verification failed'
		};
	} catch {
		return {
			success: false,
			message: 'Unknown error during verification'
		};
	}
}
