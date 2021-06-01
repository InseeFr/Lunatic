import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from 'utils/lib';
import sourceLogement from './logement';
import sourceSimpsons from './simpsons';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Questionnaire', module).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="<Questionnaire />" />;
});

stories.addWithJSX('Logement', () => (
	<Orchestrator
		id="props"
		source={sourceLogement}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

stories.addWithJSX('Simpsons', () => (
	<Orchestrator
		id="props"
		source={sourceSimpsons}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));
