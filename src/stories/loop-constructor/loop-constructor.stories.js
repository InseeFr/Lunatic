import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import dataRoster from './data-roster';
import dataBlock from './data-roster';
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

const storiesBlock = storiesOf('LoopConstructor/BlockForLoop', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="BlockForLoop" />;
	});

storiesBlock.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataBlock}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));
