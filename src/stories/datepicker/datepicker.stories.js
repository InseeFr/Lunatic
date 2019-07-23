import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Datepicker } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
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

const defaultProps = {
	handleChange: console.log,
	response: {
		name: 'DATEPICKER',
		valueState: [
			{ valueType: 'COLLECTED', value: '1998-07-12' },
			{ valueType: 'FORCED', value: '2018-07-15' },
		],
	},
};

const stories = storiesOf('Datepicker', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Datepicker />" />;
	});

stories.addWithJSX('Default', () => (
	<Datepicker id="default" label="Label" {...defaultProps} />
));

stories.addWithJSX('Props', () => (
	<Datepicker
		id="props"
		label={text('Label', "I'm the label of the datepicker")}
		placeholder={text('Placeholder', 'Placeholder')}
		readOnly={boolean('Read only', false)}
		required={boolean('Required', false)}
		focused={boolean('Focused', false)}
		preferences={['COLLECTED', 'FORCED']}
		tooltip={boolean('Tooltip', false)}
		labelPosition={select('Label position', labelPositionOptions)}
		{...defaultProps}
	/>
));

stories.addWithJSX('Styled', () => (
	<Datepicker
		id="styled"
		label={text('Label', "I'm the label of the datepicker")}
		{...defaultProps}
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
