import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Input } from 'components';
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

const stories = storiesOf('Input', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Input />" />;
	});

stories.addWithJSX('Default', () => (
	<Input id="default" label="Label" handleChange={console.log} />
));

stories.addWithJSX('Props', () => (
	<Input
		id="props"
		label={text('Label', "I'm the label of the input")}
		placeholder={text('Placeholder', 'Placeholder')}
		readOnly={boolean('Read only', false)}
		autocomplete={boolean('Autocomplete', false)}
		required={boolean('Required', false)}
		focused={boolean('Focused', false)}
		handleChange={console.log}
		labelPosition={select('Label position', labelPositionOptions)}
	/>
));

stories.addWithJSX('Styled', () => (
	<Input
		id="styled"
		label={text('Label', "I'm the label of the input")}
		placeholder={text('Placeholder', 'Placeholder')}
		readOnly={boolean('Read only', false)}
		autocomplete={boolean('Autocomplete', false)}
		required={boolean('Required', false)}
		focused={boolean('Focused', false)}
		handleChange={console.log}
		style={object('Generated style', {
			'border-color': color('Border color', '#e80a4d'),
			'border-width': number('Border-width', 2, {
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
