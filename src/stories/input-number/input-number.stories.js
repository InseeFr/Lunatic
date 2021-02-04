import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import {
	labelPositionOptions,
	unitPositionOptions,
	featuresOptions,
} from '../utils/options';
import {
	text,
	boolean,
	number,
	object,
	select,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('InputNumber', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<InputNumber />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={data}
		label={text('Label', '"I\'m the label of the number input"')}
		unit={text('Unit', 'euros')}
		min={number('Min', 0)}
		max={number('Max', 50)}
		decimals={number('Decimals', 1)}
		placeholder={text('Placeholder', 'Placeholder')}
		features={select('Features', featuresOptions, [])}
		bindings={object('Bindings', { test: 'test' })}
		readOnly={boolean('Read only', false)}
		autoComplete={boolean('Autocomplete', false)}
		mandatory={boolean('Mandatory', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
		unitPosition={select('Unit position', unitPositionOptions, 'DEFAULT')}
	/>
));
