import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from 'utils/lib';
import calcVar from './calc-var';
import logement from './logement';
import simpsons from './simpsons';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, select } from '@storybook/addon-knobs/react';

const def = storiesOf('Questionnaire/Default', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Questionnaire />" />;
	}
);

def.addWithJSX('Calculated Variables', () => (
	<Orchestrator
		id="props"
		source={calcVar}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

def.addWithJSX('Logement', () => (
	<Orchestrator
		id="props"
		source={logement}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

def.addWithJSX('Missing', () => (
	<Orchestrator
		id="props"
		source={simpsons}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		missing
	/>
));

def.addWithJSX('Simpsons', () => (
	<Orchestrator
		id="props"
		source={simpsons}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

const paginated = storiesOf('Questionnaire/Paginated', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Questionnaire />" />;
	}
);

paginated.addWithJSX('Calculated Variables', () => (
	<Orchestrator
		id="props"
		source={calcVar}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));

paginated.addWithJSX('Logement', () => (
	<Orchestrator
		id="props"
		source={logement}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));

paginated.addWithJSX('NSP-R', () => (
	<Orchestrator
		id="props"
		source={simpsons}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
		missing
	/>
));

paginated.addWithJSX('Simpsons', () => (
	<Orchestrator
		id="props"
		source={simpsons}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));
