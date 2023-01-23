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
// pages from state
const pagesStructure = {
	1: examplePagesEntry,
	1.1: examplePagesEntry,
	2: examplePagesEntry,
};

const examplePagesEntry = {
	isLoop: 'true|false',
	subPages: [], // uniquement si isLoop=true

	components: [
		{
			id: 'kb9hi4j0',
			componentType: 'Sequence',
			page: '1',
			label: {
				value: 'Adresse',
				type: 'VTL|MD',
			},
			// declarations: [
			// 	{
			// 		id: 'kb9hi4j0-krnoclfe',
			// 		declarationType: 'HELP',
			// 		position: 'AFTER_QUESTION_TEXT',
			// 		label: {
			// 			value:
			// 				'"Nous allons vous interroger sur le logement situé à l’adresse suivante : " || ADRESSE',
			// 			type: 'VTL|MD',
			// 		},
			// 	},
			// 	{
			// 		id: 'kb9hi4j0-kwgg3npw',
			// 		declarationType: 'INSTRUCTION',
			// 		position: 'AFTER_QUESTION_TEXT',
			// 		label: {
			// 			value:
			// 				'Appuyer sur "Enregistrer et continuer" pour passer à la page suivante.',
			// 			type: 'VTL|MD',
			// 		},
			// 	},
			// ],
			conditionFilter: {
				value: 'true',
				type: 'VTL',
			},
			hierarchy: {
				sequence: {
					id: 'kb9hi4j0',
					page: '1',
					label: {
						value: 'Adresse',
						type: 'VTL|MD',
					},
				},
			},
			bindingDependencies: ['ADRESSE'],
		},
	],
};

export const getBreadcrumb = (pages) => {
	console.log({ pages });
	let subPages = [];
	const WIPpages = Object.entries(pages).filter(([k, v]) => {
		console.log([k, v]);
		if (v.components[0].componentType === 'Loop')
			subPages = v.components[0].subPages;
		return (
			//je ne suis pas dans les subPages
			!subPages.includes(k) &&
			// je suis une séquence
			('Sequence' === v.components[0].componentType ||
				// ou je suis le composant sur la même page qu'une sous séquence (qui sont dégagées dans le reduce-on-init du pager)
				(v.components[0].hierarchy.subSequence !== undefined &&
					v.components[0].hierarchy.subSequence.page === k))
		);
	});

	console.log(WIPpages);
	// pages.filter( curr.components[0].componentType in [sequence, subSequence]
	// entries( [key, seqOrSubSeq] => { label : evaluateVTL(seqOrSubSeq,???) ,disabled : checkDisabled(seqOrSubSeq,???),page:key, parent:evaluateParent(seqOrSubSeq) })
	// curr=>{ evaluateFilter(curr.components[0].filterCondition , ???)
	//
	// pour chaque page

	// récupérer le components[0]
	// regarder le type et chercher Sequence ou subSequence
	// vérifier si la page courante est inférieure à la lastReachedPage, sinon valoriser disabled à false

	//
};
