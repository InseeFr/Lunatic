import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import { positioningOptions, featuresOptions } from '../utils/options';
import {
	text,
	boolean,
	number,
	color,
	object,
	select,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('Radio', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Radio />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={data}
		label={text('Label', '"I\'m the label of the radio"')}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={select('Features', featuresOptions, [])}
		bindings={object('Bindings', { test: 'test' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		tooltip={boolean('Tooltip', false)}
	/>
));

stories.addWithJSX('Styled', () => (
	<Orchestrator
		id="styled"
		source={data}
		style={object('Generated style', {
			fieldsetStyle: {
				'border-color': color('Fieldset color', '#e80a4d'),
				'border-width': number('Border-width', 3, {
					range: true,
					min: 0,
					max: 20,
					step: 1,
				}),
				'border-radius': number('Border-radius', 5, {
					range: true,
					min: 0,
					max: 20,
					step: 1,
				}),
			},
			radioStyle: {
				'border-color': color('Checked label border color', '#e80a4d'),
				'border-width': number('Checked label border width', 3, {
					range: true,
					min: 0,
					max: 20,
					step: 1,
				}),
				'border-radius': number('Checked label border radius', 5, {
					range: true,
					min: 0,
					max: 20,
					step: 1,
				}),
			},
		})}
	/>
));
