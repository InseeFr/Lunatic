import {
	LunaticComponents,
	LunaticData,
	type LunaticSource,
	useLunatic,
} from '@inseefr/lunatic';
const data = {} as LunaticData;
const source = {
	maxPage: '1',
	components: [
		{
			componentType: 'Input',
			label: {
				value: '"Prénom"',
				type: 'VTL|MD',
			},
			id: 'prenom',
			response: {
				name: 'PRENOM',
			},
			maxLength: 30,
			page: '1',
		},
	],
	variables: [
		{
			variableType: 'COLLECTED',
			name: 'PRENOM',
			values: {
				PREVIOUS: null,
				COLLECTED: null,
				FORCED: null,
				EDITED: null,
				INPUTED: null,
			},
		},
	],
} as LunaticSource;

export function SimpleInput() {
	const { getComponents, pager } = useLunatic(source, data, {
		initialPage: '1',
	});
	console.log({ pager, c: getComponents() });
	return (
		<div>
			<LunaticComponents components={getComponents()} />
		</div>
	);
}
