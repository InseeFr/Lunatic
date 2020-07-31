import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import dataLoop from './data-loop';
import dataDeeperLoop from './data-loop-deeper';
import dataRoster from './data-roster';
import vqs from './vqs';
import { positioningOptions } from '../utils/options';
import { select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Loops', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Let's loop!" />;
	});

stories.addWithJSX('Default Roster', () => (
	<Orchestrator
		id="default"
		source={dataRoster}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

stories.addWithJSX('Default Loop', () => (
	<Orchestrator
		id="default-loop"
		source={dataLoop}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

stories.addWithJSX('Deeper Loop', () => (
	<Orchestrator
		id="double-loop"
		source={dataDeeperLoop}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

stories.addWithJSX('VQS', () => (
	<Orchestrator
		id="vqs"
		source={vqs}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));
