import launcher from './entry.es';

window.SidePanel = launcher('side-panel', 'side-panel', {
	size: 'large',
	show: false,
	tabs: [
		{
			url: '/iframe.html',
			pageName: 'Comments',
			slug: 'comments',
		},
		{
			url: '/iframe.html',
			pageName: 'Edit',
			slug: 'edit',
		},
		{
			url: '/iframe.html',
			pageName: 'Changelog',
			slug: 'changelog',
		},
	],
});
