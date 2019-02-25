import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { CheckboxBoolean } from 'components';
import readme from './README.md';
import titleDecorator from 'utils/decorator/title-decorator';
import { text, boolean, select } from '@storybook/addon-knobs/react';

const positioningOptions = {
	DEFAULT: 'Default',
	HORIZONTAL: 'Horizontal',
	VERTICAL: 'Vertical',
};

const stories = storiesOf('CheckboxBoolean', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<CheckboxBoolean />" />;
	});

stories.addWithJSX('Default', () => (
	<CheckboxBoolean id="default" handleChange={console.log} />
));

stories.addWithJSX('Props', () => (
	<CheckboxBoolean
		id="props"
		label={text('Label', "I'm the label of the boolean checkbox")}
		positioning={select('Items positioning', positioningOptions)}
		disabled={boolean('Disabled', false)}
		handleChange={console.log}
	/>
));
