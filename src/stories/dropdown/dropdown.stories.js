import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import dataProps from './data-props';
import dataNAF from './data-naf';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import {
	text,
	boolean,
	select,
	object,
	number,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('Dropdown', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Dropdown />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} handleChange={console.log} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={dataProps}
		handleChange={console.log}
		placeholder={text('Placeholder', 'Placeholder')}
		features={select('Features', featuresOptions, [])}
		bindings={object('Bindings', { NAME: 'Simpsons', TEXAS: 'Texas' })}
		disabled={boolean('Disabled', false)}
		writable={boolean('Writable', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
		mandatory={boolean('Mandatory', false)}
		preferences={['COLLECTED', 'FORCED']}
		tooltip={boolean('Tooltip', false)}
		zIndex={number('zIndex', 0)}
	/>
));

stories.addWithJSX('Naf', () => (
	<Orchestrator
		id="props"
		source={dataNAF}
		handleChange={console.log}
		placeholder={text('Placeholder', 'Placeholder')}
		features={select('Features', featuresOptions, [])}
		bindings={object('Bindings', { NAME: 'Simpsons', TEXAS: 'Texas' })}
		disabled={boolean('Disabled', false)}
		writable={boolean('Writable', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
		mandatory={boolean('Mandatory', false)}
		preferences={['COLLECTED', 'FORCED']}
		tooltip={boolean('Tooltip', false)}
		zIndex={number('zIndex', 0)}
	/>
));
