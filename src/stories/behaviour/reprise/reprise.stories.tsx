import { RepriseOrchestrator } from './RepriseOrchestrator';
import source from './source.json';

export default {
	title: 'Behaviour/Reprise',
	component: RepriseOrchestrator,
};

export const Basic = {
	args: {
		source,
		data: {
			NOM: 'Doe',
			PRENOMS: ['John', 'Jane'],
			MAJEUR: [true, false],
		},
	},
};

export const WithProp = {
	render: () => <div>Hello</div>,
};
