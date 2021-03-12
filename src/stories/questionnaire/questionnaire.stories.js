import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from 'utils/lib';
import data from './fat';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, object, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Questionnaire', module).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="<Questionnaire />" />;
});

stories.addWithJSX('Fat', () => (
	<Orchestrator
		id="props"
		source={data}
		features={select('Features', featuresOptions, [])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		bindings={object('Bindings', { CITY: 'Springfield' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));
