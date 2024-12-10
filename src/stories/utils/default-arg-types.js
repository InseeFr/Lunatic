const fields = [
	'source',
	'id',
	'disableFilters',
	'pagination',
	'data',
	'management',
	'activeControls',
	'features',
	'initialPage',
	'getStoreInfo',
	'missing',
	'shortcut',
	'filterDescription',
	'disabled',
	'showOverview',
	'missingStrategy',
	'detailAlwaysDisplayed',
];

const defaultArgTypes = fields.reduce(
	(acc, f) => ({
		...acc,
		[f]: {
			table: {
				disable: true,
			},
		},
	}),
	{
		readOnly: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
	}
);

export default defaultArgTypes;
