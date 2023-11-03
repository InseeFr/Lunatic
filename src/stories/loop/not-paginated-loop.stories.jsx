import React from 'react';
import defaultArgTypes from '../utils/default-arg-types';
import Orchestrator from '../utils/orchestrator';
import { getReferentiel } from '../utils/referentiel';
import source from './source-not-paginated.json';

const stories = {
	title: 'Components/Loop/NotPaginatedLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: 'not-paginated-loop',
	source,
	getReferentiel,
	autoSuggesterLoading: true,
};
