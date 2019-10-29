import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Subsequence } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import { featuresOptions } from '../utils/options';
import {
	text,
	number,
	color,
	object,
	select,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('Subsequence', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Subsequence />" />;
	});

stories.addWithJSX('Default', () => (
	<Subsequence id="default" label="Label of my subsequence" />
));

stories.addWithJSX('Props', () => (
	<Subsequence
		id="props"
		label={text('Label', '"Label of my subsequence: " || test')}
		features={select('Features', featuresOptions, [])}
		bindings={object('Bindings', { test: 'test' })}
	/>
));

stories.addWithJSX('Styled', () => (
	<Subsequence
		id="styled"
		label={text('Label', 'Label of my subsequence')}
		style={object('Generated style', {
			color: color('Color', 'white'),
			'background-color': color('Background color', '#e80a4d'),
			'border-color': color('Border color', '#e80a4d'),
			'border-width': number('Border-width', 0, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
			'border-radius': number('Border-radius', 0, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
		})}
	/>
));
