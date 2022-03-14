import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from 'utils/lib';
import simpsons from './simpsons';
import simpleLoop from './simple-loop';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Cleaning', module).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="Cleaning questionnaires" />;
});

stories.addWithJSX('Simpsons', () => (
	<Orchestrator
		source={simpsons}
		missing={boolean('Missing', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));

stories.addWithJSX('Simple loop', () => (
	<Orchestrator
		source={simpleLoop}
		missing={boolean('Missing', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));
