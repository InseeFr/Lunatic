import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Table } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import { boolean } from '@storybook/addon-knobs/react';

const defaultProps = {
	handleChange: console.log,
	preferences: ['COLLECTED', 'FORCED', 'EDITED'],
};

const stories = storiesOf('Table', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Table />" />;
	});

stories.addWithJSX('Default', () => (
	<Table
		id="default"
		label="Label of my default table"
		handleChange={console.log}
		cells={[
			[
				{ label: '' },
				{ label: 'Header 1', headerCell: true },
				{ label: 'Header 2', headerCell: true },
			],
			[{ label: 'Line 1' }, { label: 'Cell 11' }, { label: 'Cell 12' }],
			[{ label: 'Line 2' }, { label: 'Cell 21' }, { label: 'Cell 22' }],
			[{ label: 'Line 3' }, { label: 'Cell 31' }, { label: 'Cell 32' }],
		]}
	/>
));

stories.addWithJSX('OneAxisOneMeasure', () => (
	<Table
		{...defaultProps}
		id="one-axis"
		label="Have you ever visited these countries?"
		cells={[
			[
				{ value: '1', label: 'Belgium' },
				{
					id: 'a',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
					response: {
						name: 'RADIO_A',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '0' },
						],
					},
				},
			],
			[
				{ value: '2', label: 'France' },
				{
					id: 'b',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
					response: {
						name: 'RADIO_B',
						valueState: [
							{ valueType: 'COLLECTED', value: '0' },
							{ valueType: 'FORCED', value: '1' },
						],
					},
				},
			],
			[
				{ value: '3', label: 'Italy' },
				{
					id: 'c',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
					response: {
						name: 'RADIO_C',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '0' },
							{ valueType: 'EDITED', value: '1' },
						],
					},
				},
			],
			[
				{ value: '4', label: 'Spain' },
				{
					id: 'd',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
					response: {
						name: 'RADIO_D',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
			],
		]}
		tooltip={boolean('Tooltip', false)}
	/>
));

stories.addWithJSX('OneAxisTwoMeasures', () => (
	<Table
		{...defaultProps}
		id="one-axis-two-measures"
		label="Birth informations"
		cells={[
			[
				{ label: '' },
				{ label: 'Date', headerCell: true },
				{ label: 'Place', headerCell: true },
			],
			[
				{ value: '1', label: 'Marco' },
				{
					id: 'a-datepicker',
					componentType: 'Datepicker',
					response: {
						name: 'DATEPICKER_A',
						valueState: [
							{ valueType: 'COLLECTED', value: '1998-07-12' },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					id: 'a-dropdown',
					componentType: 'Dropdown',
					options: [
						{ value: 'belgium', label: 'Belgium' },
						{ value: 'france', label: 'France' },
						{ value: 'italy', label: 'Italy' },
						{ value: 'netherland', label: 'Netherland' },
						{ value: 'spain', label: 'Spain' },
						{ value: 'sweden', label: 'Sweden' },
					],
					response: {
						name: 'DROPDOWN_A',
						valueState: [
							{ valueType: 'COLLECTED', value: 'italy' },
							{ valueType: 'FORCED', value: 'france' },
							{ valueType: 'EDITED', value: 'italy' },
						],
					},
				},
			],
			[
				{ value: '2', label: 'Kyllian' },
				{
					id: 'b-datepicker',
					componentType: 'Datepicker',
					response: {
						name: 'DATEPICKER_B',
						valueState: [
							{ valueType: 'COLLECTED', value: '1998-07-12' },
							{ valueType: 'FORCED', value: '2018-07-15' },
						],
					},
				},
				{
					id: 'b-dropdown',
					componentType: 'Dropdown',
					options: [
						{ value: 'belgium', label: 'Belgium' },
						{ value: 'france', label: 'France' },
						{ value: 'italy', label: 'Italy' },
						{ value: 'netherland', label: 'Netherland' },
						{ value: 'spain', label: 'Spain' },
						{ value: 'sweden', label: 'Sweden' },
					],
					response: {
						name: 'DROPDOWN_B',
						valueState: [
							{ valueType: 'COLLECTED', value: 'belgium' },
							{ valueType: 'FORCED', value: 'france' },
						],
					},
				},
			],
		]}
		tooltip={boolean('Tooltip', false)}
	/>
));

stories.addWithJSX('OneHierarchicalAxis', () => (
	<Table
		{...defaultProps}
		id="one-hierarchical-axis"
		label="Hierarchical table"
		cells={[
			[{ label: '', colspan: '2' }, { label: 'Percentage', headerCell: true }],
			[
				{ value: 'A', label: 'A', rowspan: '2' },
				{ value: 'A1', label: 'A1' },
				{
					id: 'a1',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
					response: {
						name: 'INPUT_NUMBER_1',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '2' },
							{ valueType: 'EDITED', value: '3' },
						],
					},
				},
			],
			[
				{ value: 'A2', label: 'A2' },
				{
					id: 'a2',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
					response: {
						name: 'INPUT_NUMBER_2',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{ value: 'B', label: 'B', rowspan: '3' },
				{ value: 'B1', label: 'B1' },
				{
					id: 'b1',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
					response: {
						name: 'INPUT_NUMBER_3',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{ value: 'B2', label: 'B2' },
				{
					id: 'b2',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
					response: {
						name: 'INPUT_NUMBER_4',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: '3' },
						],
					},
				},
			],
			[
				{ value: 'B3', label: 'B3' },
				{
					id: 'B3',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
					response: {
						name: 'INPUT_NUMBER_5',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '2' },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{ value: 'other', label: 'Other', colspan: '2' },
				{
					id: 'other',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
					response: {
						name: 'INPUT_NUMBER_6',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
		]}
		tooltip={boolean('Tooltip', false)}
	/>
));

stories.addWithJSX('TwoAxisOneMeasure', () => (
	<Table
		{...defaultProps}
		id="two-axis"
		label="What dimensions do you value and in which countries"
		cells={[
			[
				{ label: '' },
				{ value: '1', label: 'Population', headerCell: true },
				{ value: '2', label: 'Monuments', headerCell: true },
				{ value: '3', label: 'Climate', headerCell: true },
				{ value: '4', label: 'Gastronomy', headerCell: true },
			],
			[
				{ value: '1', label: 'Belgium' },
				{
					id: '11',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_11',
						valueState: [
							{ valueType: 'COLLECTED', value: true },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '12',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_12',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '13',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_13',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: true },
							{ valueType: 'EDITED', value: false },
						],
					},
				},
				{
					id: '14',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_14',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{ value: '2', label: 'France' },
				{
					id: '21',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_21',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '22',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_22',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: true },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '23',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_23',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '24',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_24',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{ value: '3', label: 'Italy' },
				{
					id: '31',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_31',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '32',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_32',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: true },
							{ valueType: 'EDITED', value: false },
						],
					},
				},
				{
					id: '33',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_33',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: true },
							{ valueType: 'EDITED', value: false },
						],
					},
				},
				{
					id: '34',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_34',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: true },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{ value: '4', label: 'Spain' },
				{
					id: '41',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_41',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '42',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_42',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: true },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '43',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_43',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: true },
							{ valueType: 'EDITED', value: false },
						],
					},
				},
				{
					id: '44',
					componentType: 'CheckboxBoolean',
					response: {
						name: 'CHECKBOX_BOOLEAN_44',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
		]}
		tooltip={boolean('Tooltip', false)}
	/>
));

stories.addWithJSX('Roster', () => (
	<Table
		{...defaultProps}
		id="roster"
		label="Family composition"
		lines={{ min: 1, max: 9 }}
		cells={[
			[
				{ label: 'Sex', headerCell: true },
				{ label: 'First name', headerCell: true },
				{ label: 'Last name', headerCell: true },
				{ label: 'Age', headerCell: true },
			],
			[
				{
					id: '11',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_11',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '2' },
							{ valueType: 'EDITED', value: '1' },
						],
					},
				},
				{
					id: '12',
					componentType: 'Input',
					response: {
						name: 'INPUT_12',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: 'My forced input' },
						],
					},
				},
				{
					id: '13',
					componentType: 'Input',
					response: {
						name: 'INPUT_13',
						valueState: [
							{ valueType: 'COLLECTED', value: 'My collected input' },
							{ valueType: 'FORCED', value: 'My forced input' },
							{ valueType: 'EDITED', value: 'My edited input' },
						],
					},
				},
				{
					id: '14',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_14',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '2' },
						],
					},
				},
			],
			[
				{
					id: '21',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_21',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '2' },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '22',
					componentType: 'Input',
					response: {
						name: 'INPUT_22',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '23',
					componentType: 'Input',
					response: {
						name: 'INPUT_23',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: 'My forced input' },
						],
					},
				},
				{
					id: '24',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_24',
						valueState: [{ valueType: 'COLLECTED', value: '1' }],
					},
				},
			],
			[
				{
					id: '31',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_31',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '32',
					componentType: 'Input',
					response: {
						name: 'INPUT_32',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: 'My edited input' },
						],
					},
				},
				{
					id: '33',
					componentType: 'Input',
					response: {
						name: 'INPUT_33',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					id: '34',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_34',
						valueState: [
							{ valueType: 'COLLECTED', value: '1' },
							{ valueType: 'FORCED', value: '2' },
							{ valueType: 'EDITED', value: '3' },
						],
					},
				},
			],
			[
				{
					id: '41',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_11',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '42',
					componentType: 'Input',
					response: {
						name: 'INPUT_42',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					id: '43',
					componentType: 'Input',
					response: {
						name: 'INPUT_43',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '44',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_44',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{
					id: '51',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_51',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '52',
					componentType: 'Input',
					response: {
						name: 'INPUT_52',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '53',
					componentType: 'Input',
					response: {
						name: 'INPUT_53',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '54',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_54',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{
					id: '61',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_61',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '62',
					componentType: 'Input',
					response: {
						name: 'INPUT_62',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					id: '63',
					componentType: 'Input',
					response: {
						name: 'INPUT_63',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '64',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_64',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{
					id: '71',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_71',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '72',
					componentType: 'Input',
					response: {
						name: 'INPUT_72',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					id: '73',
					componentType: 'Input',
					response: {
						name: 'INPUT_73',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '74',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_74',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{
					id: '81',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_81',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '82',
					componentType: 'Input',
					response: {
						name: 'INPUT_82',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '83',
					componentType: 'Input',
					response: {
						name: 'INPUT_83',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					id: '84',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_84',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
			[
				{
					id: '91',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
					response: {
						name: 'CHECKBOX_ONE_91',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '92',
					componentType: 'Input',
					response: {
						name: 'INPUT_92',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
				{
					id: '93',
					componentType: 'Input',
					response: {
						name: 'INPUT_93',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					id: '94',
					componentType: 'InputNumber',
					response: {
						name: 'INPUT_NUMBER_94',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
							{ valueType: 'EDITED', value: null },
						],
					},
				},
			],
		]}
		tooltip={boolean('Tooltip', false)}
	/>
));
