import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from 'utils/lib';
import logementDefault from './default/logement';
import simpsonsDefault from './default/simpsons';
import logementPaginated from './paginated/logement';
import simpsonsPaginated from './paginated/simpsons';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, select } from '@storybook/addon-knobs/react';

const def = storiesOf('Questionnaire/Default', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Questionnaire />" />;
	}
);

def.addWithJSX('Logement', () => (
	<Orchestrator
		id="props"
		source={logementDefault}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

def.addWithJSX('Simpsons', () => (
	<Orchestrator
		id="props"
		source={simpsonsDefault}
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

paginated.addWithJSX('Logement', () => (
	<Orchestrator
		id="props"
		source={logementPaginated}
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
		source={simpsonsPaginated}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		pagination
	/>
));
