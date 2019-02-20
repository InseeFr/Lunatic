import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Button } from 'components';
import readme from './README.md';
import titleDecorator from 'utils/decorator/title-decorator';
import {
	text,
	boolean,
	number,
	color,
	object,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('Button', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Button />" />;
	});

stories.addWithJSX('Default', () => (
	<Button label="button-default" value="Click me !" onClick={console.log} />
));

stories.addWithJSX('Props', () => (
	<Button
		label="disabled-button"
		value={text('Value', 'Click me !')}
		onClick={console.log}
		disabled={boolean('Disabled', false)}
	/>
));

stories.addWithJSX('Styled', () => (
	<Button
		label="styled-button"
		value="Click me !"
		onClick={console.log}
		style={object('Generated style', {
			'border-width': number('Border-width', 5, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
			'border-radius': number('Border-radius', 10, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
			color: color('Color', 'white'),
			'background-color': color('Background color', '#e80a4d'),
			'border-color': color('Border color', '#e80a4d'),
			':hover': {
				color: color('Hover : color', '#e80a4d'),
				'background-color': color('Hover : background color', 'white'),
				'border-color': color('Hover : border color', '#e80a4d'),
			},
		})}
	/>
));
