import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import dataDefault from './data-default';
import dataOneAxisOneMeasure from './data-one-axis-one-measure';
import dataOneAxisTwoMeasures from './data-one-axis-two-measures';
import dataOneHierarchicalAxis from './data-one-hierarchical-axis';
import dataTwoAxisOneMeasure from './data-two-axis-one-measure';
import dataRoster from './data-roster';
import { positioningOptions, featuresOptions } from '../utils/options';
import { text, boolean, select, object } from '@storybook/addon-knobs/react';

const stories = storiesOf('Table', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Table />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataDefault}
		label={text('Label', '"I\'m the label of the Table"')}
		features={select('Features', featuresOptions, [])}
		bindings={object('Bindings', { test: 'test' })}
	/>
));

stories.addWithJSX('OneAxisOneMeasure', () => (
	<Orchestrator
		id="default"
		source={dataOneAxisOneMeasure}
		tooltip={boolean('Tooltip', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('OneAxisTwoMeasure', () => (
	<Orchestrator
		id="default"
		source={dataOneAxisTwoMeasures}
		tooltip={boolean('Tooltip', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('OneHierarchicalAxis', () => (
	<Orchestrator
		id="default"
		source={dataOneHierarchicalAxis}
		tooltip={boolean('Tooltip', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('TwoAxisOneMeasure', () => (
	<Orchestrator
		id="default"
		source={dataTwoAxisOneMeasure}
		tooltip={boolean('Tooltip', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('Roster', () => (
	<Orchestrator
		id="default"
		source={dataRoster}
		tooltip={boolean('Tooltip', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));
