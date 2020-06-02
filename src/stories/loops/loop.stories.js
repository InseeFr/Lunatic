import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from './orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import { positioningOptions, featuresOptions } from '../utils/options';
import { text, boolean, select, object } from '@storybook/addon-knobs/react';

const stories = storiesOf('Loops', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Let's loop!" />;
	});

stories.addWithJSX('Loop', () => (
	<Orchestrator
		id="default"
		source={data}
		management={boolean('Management', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		hideBtn={boolean('Hide button', false)}
		features={select('Features', featuresOptions, ['VTL'])}
	/>
));
