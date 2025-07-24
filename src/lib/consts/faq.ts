import { m } from '$lib/paraglide/messages';

export const FAQ = [
	{
		id: '1',
		title: m['landing.faq.whatWillItCostAfterBeta'](),
		content: m['landing.faq.whatWillItCostAfterBetaDescription']()
	},
	{
		id: '2',
		title: m['landing.faq.doIKeepFullOwnershipOfMyClients'](),
		content: m['landing.faq.doIKeepFullOwnershipOfMyClientsDescription']()
	},
	{
		id: '3',
		title: m['landing.faq.canICancelAtAnyTime'](),
		content: m['landing.faq.canICancelAtAnyTimeDescription']()
	}
];
