import launcher from './entry.es';

window.SidePanel = launcher('side-panel', 'side-panel', {
	size: 'medium',
	show: false,
	tabs: [
		{
			url: '/api/fake-html',
			pageName: 'Comments',
			slug: 'comments',
		},
		{
			url: '/api/fake-html',
			pageName: 'Edit',
			slug: 'edit',
		},
		{
			url: '/api/fake-html',
			pageName: 'Changelog',
			slug: 'changelog',
		},
	],
});
