import launcher from './entry.es';

window.AddOrCreate = launcher('add-or-create', 'add-or-create', {
	onSubmit: console.log,
	onSearch: value => Array.from({length: Math.random() * 4}, (e, i) => `Suggestion ${value} ${i}`),
});
