import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from '../utils';
import dataDefault from './data-default';
import dataOneAxisOneMeasure from './data-one-axis-one-measure';
import dataOneAxisTwoMeasures from './data-one-axis-two-measures';
import dataOneHierarchicalAxis from './data-one-hierarchical-axis';
import dataTwoAxisOneMeasure from './data-two-axis-one-measure';
import dataRoster from './data-roster';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, select } from '@storybook/addon-knobs/react';
import HtmlTableMUI from './html-table-mui';

const stories = storiesOf('Table', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Table />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataDefault}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
	/>
));

stories.addWithJSX('OneAxisOneMeasure', () => (
	<Orchestrator
		id="default"
		source={dataOneAxisOneMeasure}
		missing={boolean('Missing', false)}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('OneAxisTwoMeasure', () => (
	<Orchestrator
		id="default"
		source={dataOneAxisTwoMeasures}
		missing={boolean('Missing', false)}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('OneHierarchicalAxis', () => (
	<Orchestrator
		id="default"
		source={dataOneHierarchicalAxis}
		missing={boolean('Missing', false)}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('TwoAxisOneMeasure', () => (
	<Orchestrator
		id="default"
		source={dataTwoAxisOneMeasure}
		missing={boolean('Missing', false)}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('Roster', () => (
	<Orchestrator
		id="default"
		source={dataRoster}
		missing={boolean('Missing', false)}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		hideBtn={boolean('Hide button', false)}
	/>
));

stories.addWithJSX('Custom Table MUI', function () {
	const custom = { ...HtmlTableMUI };
	return (
		<Orchestrator
			source={dataDefault}
			positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
			features={select('Features', featuresOptions, ['VTL', 'MD'])}
			missing={boolean('Missing', false)}
			management={boolean('Management', false)}
			custom={custom}
		/>
	);
});
