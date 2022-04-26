import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Button } from 'components';
import readme from './README.md';
import { titleDecorator } from '../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

const stories = storiesOf('Button', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
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
