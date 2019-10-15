import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import {
	boolean,
	number,
	color,
	object,
	select,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('CheckboxOne', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<CheckboxOne />" />;
	});

const positioningOptions = {
	DEFAULT: 'Default',
	HORIZONTAL: 'Horizontal',
	VERTICAL: 'Vertical',
};

stories.addWithJSX('Default', () => <Orchestrator source={data} />);

stories.addWithJSX('Props', () => (
	<Orchestrator
		source={data}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		tooltip={boolean('Tooltip', false)}
	/>
));

stories.addWithJSX('Styled', () => (
	<Orchestrator
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
			checkboxStyle: {
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
