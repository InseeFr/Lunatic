import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from '../utils';
import calcVar from './calc-var';
import logement from './logement';
import logementQueen from './logement-queen';
import logementS2 from './logement-s2';
import logementSequence from './logement-sequence';
import dataLogement from './data-logement';
import simpsons from './simpsons';
import arithmetic from './arithmetic';
import updateExternalQuestionnaire from './update-external/questionnaire';
import updateExternalData from './update-external/data';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, select } from '@storybook/addon-knobs/react';

const PREFERENCES = ['COLLECTED', 'FORCED', 'EDITED'];

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
		preferences={PREFERENCES}
	/>
));

def.addWithJSX('Logement', function () {
	return (
		<Orchestrator
			id="props"
			source={logement}
			missing={boolean('Missing', false)}
			features={select('Features', featuresOptions, ['VTL', 'MD'])}
			positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
			disabled={boolean('Disabled', false)}
			focused={boolean('Focused', false)}
			management={boolean('Management', false)}
			preferences={PREFERENCES}
		/>
	);
});

def.addWithJSX('Arithmetic', () => (
	<Orchestrator
		id="props"
		source={arithmetic}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		preferences={PREFERENCES}
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
		preferences={PREFERENCES}
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
		preferences={PREFERENCES}
	/>
));

paginated.addWithJSX('Logement', function () {
	return (
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
			modalForControls
			preferences={PREFERENCES}
		/>
	);
});

paginated.addWithJSX('Logement - Queen', function () {
	return (
		<Orchestrator
			id="props"
			source={logementQueen}
			data={dataLogement}
			missing={boolean('Missing', false)}
			activeGoNextForMissing={boolean('Active go next for missing', false)}
			features={select('Features', featuresOptions, ['VTL', 'MD'])}
			positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
			disabled={boolean('Disabled', false)}
			focused={boolean('Focused', false)}
			management={boolean('Management', false)}
			pagination
			preferences={PREFERENCES}
		/>
	);
});

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
		preferences={PREFERENCES}
	/>
));

paginated.addWithJSX('Logement - S2', () => (
	<Orchestrator
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
		preferences={PREFERENCES}
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
		preferences={PREFERENCES}
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
				preferences={PREFERENCES}
			/>
		</>
	);
});
