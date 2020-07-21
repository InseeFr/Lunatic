import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import vqs from './vqs';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Loops', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Let's loop!" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={data}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		hideBtn={boolean('Hide button', false)}
		features={select('Features', featuresOptions, ['VTL'])}
	/>
));

stories.addWithJSX('VQS', () => (
	<Orchestrator
		id="vqs"
		source={vqs}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		hideBtn={boolean('Hide button', false)}
		features={select('Features', featuresOptions, ['VTL'])}
	/>
));
