import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Textarea } from 'components';
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

const labelPositionOptions = {
	DEFAULT: 'Default',
	TOP: 'Top',
	RIGHT: 'Right',
	BOTTOM: 'Bottom',
	LEFT: 'Left',
};

const stories = storiesOf('Textarea', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Textarea />" />;
	});

stories.addWithJSX('Default', () => (
	<Textarea id="default" label="Label" handleChange={console.log} />
));

stories.addWithJSX('Props', () => (
	<Textarea
		id="props"
		label={text('Label', "I'm the label of the textarea")}
		placeholder={text('Placeholder', 'Placeholder')}
		rows={number('Rows', 5)}
		maxLength={number('Max length', 50)}
		readOnly={boolean('Read only', false)}
		required={boolean('Required', false)}
		handleChange={console.log}
		labelPosition={select('Label position', labelPositionOptions)}
	/>
));

stories.addWithJSX('Styled', () => (
	<Textarea
		id="styled"
		label={text('Label', "I'm the label of the textarea")}
		handleChange={console.log}
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
