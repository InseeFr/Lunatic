// TODO : expose function to build breadcrumb with evaluatedLabels, children hierarchy
// previously reached attribute , in last devs :  reached and visible attributes
// technical attributes shouldn't be exposed

// wrong structure here...
const breadcrumbFormat = [
	{
		label: 'Seq-1',
		lunaticId: '#123',
		type: 'sequence|subsequence',
		reachable: false,
		page: '1',
		parent: [],
		bindingDependencies: ['ADRESSE'],
	},
	{
		label: 'Sous-Seq-1',
		lunaticId: '#124',
		type: 'sequence|subsequence',
		reachable: false,
		page: '2',
		parent: ['1'],
		bindingDependencies: ['ADRESSE'],
	},
	{
		label: 'Seq-2',
		lunaticId: '#221',
		type: 'sequence|subsequence',
		reachable: true,
		page: '3',
		parent: [],
		bindingDependencies: ['ADRESSE'],
	},
	{
		label: 'Sous-Seq-2',
		lunaticId: '#222',
		type: 'sequence|subsequence',
		reachable: true,
		page: '4',
		parent: ['3'],
		bindingDependencies: ['ADRESSE'],
	},
];
