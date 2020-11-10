import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import dataRoster from './data-roster';
import dataBlock from './data-block';
import { positioningOptions } from '../utils/options';
import { select } from '@storybook/addon-knobs/react';

const storiesRoster = storiesOf('LoopConstructor/RosterForLoop', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="RosterForLoop" />;
	});

storiesRoster.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataRoster}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

const storiesBlock = storiesOf('LoopConstructor/Loop', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Loop" />;
	});

storiesBlock.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataBlock}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));
