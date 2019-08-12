import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
	{
		id: 'applications',
		title: 'Manage Payments',
		translate: 'NAV.APPLICATIONS',
		type: 'group',
		children: [
			{
				id: 'payments',
				title: 'Payments',
				translate: 'NAV.SAMPLE.TITLE',
				type: 'item',
				icon: 'account_balance',
				url: '/payments',
			}
		]
	}
];
