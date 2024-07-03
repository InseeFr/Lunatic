import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import source from './source';
import sourceEuro from './source-euro.json';

export default {
	title: 'Components/InputNumber',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export const Default = {
	args: { source },
};

export const DynamicUnit = {
	args: { source: sourceEuro },
};
