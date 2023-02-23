const fields = [
	'source',
	'id',
	'pagination',
	'data',
	'management',
	'activeControls',
	'features',
	'initialPage',
	'getStoreInfo',
	'missing',
	'shortcut',
	'activeGoNextForMissing',
	'filterDescription',
	'autofocus',
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
	{}
);

export default defaultArgTypes;
