import Orchestrator from '../utils/orchestrator';
import React from 'react';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';
import source from './source';
import useLunatic from '../../use-lunatic';

const stories = {
	title: 'Components/Breadcrumb',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};
const FakeComponent = () => {
	const initState = {
		management: false,
		activeControls: false,
		initialPage: '1',
		missing: false,
		shortcut: false,
		activeGoNextForMissing: false,
		filterDescription: true,
	};

	const lunaticResponse = useLunatic(source, data, { ...initState });
	console.log({ lunaticResponse });
	// const { pages } = state;
	// getBreadcrumb(pages);
	return <div>I'm a boss</div>;
};

export default stories;

const Template = (args) => (
	<div>
		<FakeComponent />
		<Orchestrator {...args} />
	</div>
);
export const Default = Template.bind({});

Default.args = { id: 'breadcrumb', source };
