import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import OrchestratorSplit from '../utils/orchestrator-split';
import { titleDecorator } from 'utils/lib';
import calcVar from './calc-var';
import logement from './logement';
import logementQueen from './logement-queen';
import logementS2 from './logement-s2';
import logementSequence from './logement-sequence';
import dataLogement from './data-logement';
import simpsons from './simpsons';
import arithmetic from './arithmetic';
import arithmeticManagement from './arithmetic-management';
import updateExternalQuestionnaire from './update-external/questionnaire';
import updateExternalData from './update-external/data';
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

def.addWithJSX('Arithmetic', () => (
	<Orchestrator
		id="props"
		source={arithmetic}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
	/>
));

def.addWithJSX('Arithmetic - Management', () => (
	<Orchestrator
		id="props"
		source={arithmeticManagement}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		management={boolean('Management', true)}
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
	<OrchestratorSplit
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
	<OrchestratorSplit
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
		modalForControls
	/>
));

paginated.addWithJSX('Logement - Queen', () => (
	<OrchestratorSplit
		id="props"
		source={logementQueen}
		data={dataLogement}
		missing={boolean('Missing', true)}
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
	<OrchestratorSplit
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

paginated.addWithJSX('Logement - S2', () => (
	<OrchestratorSplit
		id="props"
		source={logementS2}
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
	<OrchestratorSplit
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

const other = storiesOf('Questionnaire/Other', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Questionnaire />" />;
	}
);

other.addWithJSX('Update external', () => {
	const [addExternal, setAddExternal] = useState(null);
	return (
		<>
			<button
				onClick={() => setAddExternal({ PROMO: true })}
			>{`Fire PROMO --> True`}</button>
			<button
				onClick={() => setAddExternal({ PROMO: false })}
			>{`Fire PROMO --> False`}</button>
			<Orchestrator
				id="props"
				source={updateExternalQuestionnaire}
				data={updateExternalData}
				features={select('Features', featuresOptions, ['VTL', 'MD'])}
				positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
				disabled={boolean('Disabled', false)}
				focused={boolean('Focused', false)}
				addExternal={addExternal}
			/>
		</>
	);
});
