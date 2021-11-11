import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from 'utils/lib';
import calcVar from './calc-var';
import logement from './logement';
import logementSequence from './logement-sequence';
import dataLogement from './data-logement.json';
import simpsons from './simpsons';
import arithmetic from './arithmetic';
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
		missing={boolean('Missing', false)}
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
		missing={boolean('Missing', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

def.addWithJSX('Arithmetic', () => (
	<Orchestrator
		id="props"
		source={arithmetic}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
	/>
));

def.addWithJSX('Simpsons', () => (
	<Orchestrator
		id="props"
		source={simpsons}
		missing={boolean('Missing', false)}
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
		missing={boolean('Missing', false)}
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
		data={dataLogement}
		missing={boolean('Missing', false)}
		activeGoNextForMissing={boolean('Active go next for missing', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));

paginated.addWithJSX('Logement - Sequence', () => (
	<Orchestrator
		id="props"
		source={logementSequence}
		data={dataLogement}
		missing={boolean('Missing', false)}
		activeGoNextForMissing={boolean('Active go next for missing', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));

paginated.addWithJSX('Simpsons', () => (
	<Orchestrator
		id="props"
		source={simpsons}
		missing={boolean('Missing', false)}
		activeGoNextForMissing={boolean('Active go next for missing', false)}
		missingShortcut={{ dontKnow: 'f2', refused: 'f4' }}
		shortcut
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));
