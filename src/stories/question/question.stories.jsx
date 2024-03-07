import Orchestrator from '../utils/orchestrator';
import source from './source.json';

import defaultArgTypes from '../utils/default-arg-types';

const meta = {
	title: 'Components/Question',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
	},
};

export default meta;

export const Default = { args: { id: 'sequence-simple', source } };
