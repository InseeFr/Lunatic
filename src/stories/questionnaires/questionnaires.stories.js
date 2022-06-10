import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from '../utils';
import simpsons from './simpsons';
import logement from './logement';
import dataLogement from './data-logement';
import { boolean } from '@storybook/addon-knobs/react';

const storiesSimpsons = storiesOf(
	'Questionnaires/Simpsons',
	module
).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="Demonstrate behaviours" />;
});

storiesSimpsons.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={simpsons}
		pagination
		missing={boolean('Missing', true)}
		activeGoNextForMissing={boolean('Active go next for missing', true)}
	/>
));

const storiesLogement = storiesOf(
	'Questionnaires/Logement',
	module
).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="Demonstrate behaviours" />;
});

storiesLogement.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={logement}
		data={dataLogement}
		pagination
		missing={boolean('Missing', true)}
		activeGoNextForMissing={boolean('Active go next for missing', true)}
	/>
));
