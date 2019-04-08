import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Dropdown } from 'components';
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

const stories = storiesOf('Dropdown', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Dropdown />" />;
	});

const options = [
	{ value: 'belgium', label: 'Belgium' },
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
	{ value: 'netherland', label: 'Netherland' },
	{ value: 'spain', label: 'Spain' },
	{ value: 'sweden', label: 'Sweden' },
];

const labelPositionOptions = {
	DEFAULT: 'Default',
	TOP: 'Top',
	RIGHT: 'Right',
	BOTTOM: 'Bottom',
	LEFT: 'Left',
};

stories.addWithJSX('Default', () => (
	<Dropdown id="default" options={options} handleChange={console.log} />
));

stories.addWithJSX('Props', () => (
	<Dropdown
		id="props"
		label={text('Label', "I'm the label of the dropdown")}
		options={options}
		placeholder={text('Placeholder', 'Placeholder')}
		readOnly={boolean('Read only', false)}
		writable={boolean('Writable', false)}
		labelPosition={select('Label position', labelPositionOptions)}
		handleChange={console.log}
	/>
));
