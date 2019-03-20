import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Radio } from 'components';
import readme from './README.md';
import titleDecorator from 'utils/decorator/title-decorator';
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

const options = [
	{ value: 'belgium', label: 'Belgium' },
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
	{ value: 'netherland', label: 'Netherland' },
	{ value: 'spain', label: 'Spain' },
	{ value: 'sweden', label: 'Sweden' },
];

const positioningOptions = {
	DEFAULT: 'Default',
	HORIZONTAL: 'Horizontal',
	VERTICAL: 'Vertical',
};

stories.addWithJSX('Default', () => (
	<Radio id="default" options={options} handleChange={console.log} />
));

stories.addWithJSX('Props', () => (
	<Radio
		id="props"
		label={text('Label', "I'm the label of the radio")}
		positioning={select('Items positioning', positioningOptions)}
		disabled={boolean('Disabled', false)}
		options={options}
		handleChange={console.log}
	/>
));

stories.addWithJSX('Styled', () => (
	<Radio
		id="styled"
		label={text('Label', "I'm the label of the radio")}
		positioning={select('Items positioning', positioningOptions)}
		disabled={boolean('Disabled', false)}
		options={options}
		handleChange={console.log}
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
