const fields = [
	'source',
	'id',
	'pagination',
	'data',
	'management',
	'modalForControls',
	'features',
	'initialPage',
	'getStoreInfo',
	'missing',
	'shortcut',
	'activeGoNextForMissing',
	'filterDescription',
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
