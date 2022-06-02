import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from '../utils';
import cleaning from './cleaning';
import { boolean } from '@storybook/addon-knobs/react';

const stories = storiesOf('Behavior', module).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="Cleaning behaviour" />;
});

stories.addWithJSX('Cleaning', () => (
	<Orchestrator id="cleaning" source={cleaning} pagination />
));

stories.addWithJSX('Missing', () => (
	<Orchestrator
		id="cleaning"
		source={cleaning}
		pagination
		missing={boolean('Missing', true)}
		activeGoNextForMissing={boolean('Active go next for missing', true)}
	/>
));

// ... resizing, missingBlock
