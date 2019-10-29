import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import {
	text,
	boolean,
	number,
	color,
	object,
	select,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('Textarea', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Textarea />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={data}
		label={text('Label', "I'm the label of the textarea")}
		placeholder={text('Placeholder', 'Placeholder')}
		rows={number('Rows', 5)}
		maxLength={number('Max length', 500)}
		readOnly={boolean('Read only', false)}
		required={boolean('Required', false)}
		tooltip={boolean('Tooltip', false)}
		focused={boolean('Focused', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
	/>
));

stories.addWithJSX('Styled', () => (
	<Orchestrator
		id="styled"
		source={data}
		style={object('Generated style', {
			'border-color': color('Border color', '#e80a4d'),
			'border-width': number('Border-width', 5, {
				range: true,
				min: 2,
				max: 20,
				step: 1,
			}),
			'border-radius': number('Border-radius', 10, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
		})}
	/>
));
