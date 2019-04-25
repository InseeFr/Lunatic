import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { TableOneAxis } from 'components';
import readme from './README.md';
import titleDecorator from 'utils/decorator/title-decorator';
import { select, boolean } from '@storybook/addon-knobs/react';

const axis = [
	{ value: 'A', label: 'Favorite country' },
	{ value: 'B', label: 'Least favorite country' },
];

const options = [
	{ value: 'belgium', label: 'Belgium' },
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
];

const positioningOptions = {
	DEFAULT: 'Default',
	HORIZONTAL: 'Horizontal',
	VERTICAL: 'Vertical',
};

const stories = storiesOf('TableOneAxis', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<TableOneAxis />" />;
	});

stories.addWithJSX('Default', () => (
	<TableOneAxis
		id="default"
		label="Label of my table with one axis"
		axis={axis}
		columns={[
			{
				id: '1',
				componentType: 'CheckboxOne',
				options,
			},
		]}
		positioning="HORIZONTAL"
		handleChange={console.log}
	/>
));

stories.addWithJSX('Props', () => (
	<TableOneAxis
		id="default"
		label="Label of my table with one axis"
		axis={axis}
		columns={[
			{
				id: '1',
				title: 'Radio ...',
				componentType: 'Radio',
				options,
			},
			{
				id: '2',
				title: 'Text ...',
				componentType: 'Input',
			},
			{
				id: '3',
				title: 'Number ...',
				componentType: 'InputNumber',
			},
		]}
		positioning={select('Items positioning', positioningOptions)}
		readOnly={boolean('Read only', false)}
		focused={boolean('Focused', false)}
		handleChange={console.log}
	/>
));
