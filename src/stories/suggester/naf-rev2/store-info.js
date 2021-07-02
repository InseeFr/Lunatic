/**
 * Store info for creating index.
 * TODO documentation
 */
export const store = {
	name: 'naf-rev2',
	fields: [
		{ name: 'libelle', rules: [/[\w]+/], language: 'French', min: 3 },
		{ name: 'code' },
	],
	queryParser: {
		type: 'tokenized',
		params: { language: 'French', pattern: /[\w.]+/ },
	},
	version: '1',
	display: 'libelle',
};

export default store;
