import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from '../utils';
import simpsons from './simpsons';
import logement from './logement';
import { boolean } from '@storybook/addon-knobs/react';

const storiesSimpsons = storiesOf('Behavior/Simpsons', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Demonstrate behaviours" />;
	}
);

storiesSimpsons.addWithJSX('Cleaning', () => (
	<Orchestrator id="cleaning" source={simpsons} pagination />
));

storiesSimpsons.addWithJSX('Missing', () => (
	<Orchestrator
		id="cleaning"
		source={simpsons}
		pagination
		missing={boolean('Missing', true)}
		activeGoNextForMissing={boolean('Active go next for missing', true)}
	/>
));

const storiesLogement = storiesOf('Behavior/Logement', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Demonstrate behaviours" />;
	}
);

storiesLogement.addWithJSX('Cleaning', () => (
	<Orchestrator id="cleaning" source={logement} pagination />
));

storiesLogement.addWithJSX('Missing', () => (
	<Orchestrator
		id="cleaning"
		source={logement}
		pagination
		missing={boolean('Missing', true)}
		activeGoNextForMissing={boolean('Active go next for missing', true)}
	/>
));

// ... resizing, missingBlock
