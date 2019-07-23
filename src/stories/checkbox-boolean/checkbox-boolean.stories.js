import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { CheckboxBoolean } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import { text, boolean, select } from '@storybook/addon-knobs/react';

const positioningOptions = {
	DEFAULT: 'Default',
	HORIZONTAL: 'Horizontal',
	VERTICAL: 'Vertical',
};

const defaultProps = {
	handleChange: console.log,
	response: {
		name: 'CHECKBOX_ONE',
		valueState: [
			{ valueType: 'COLLECTED', value: false },
			{ valueType: 'FORCED', value: true },
			{ valueType: 'EDITED', value: null },
		],
	},
};

const stories = storiesOf('CheckboxBoolean', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<CheckboxBoolean />" />;
	});

stories.addWithJSX('Default', () => (
	<CheckboxBoolean id="default" {...defaultProps} />
));

stories.addWithJSX('Props', () => (
	<CheckboxBoolean
		id="props"
		label={text('Label', "I'm the label of the boolean checkbox")}
		positioning={select('Items positioning', positioningOptions)}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		preferences={['COLLECTED', 'FORCED', 'EDITED']}
		tooltip={boolean('Tooltip', false)}
		{...defaultProps}
	/>
));
