import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Table } from 'components';
import readme from './README.md';
import titleDecorator from 'utils/decorator/title-decorator';
import { select, boolean } from '@storybook/addon-knobs/react';

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
		id="one-axis"
		label="Have you ever visited these countries?"
		handleChange={console.log}
		cells={[
			[
				{ value: '1', label: 'Belgium' },
				{
					id: 'a',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
				},
			],
			[
				{ value: '2', label: 'France' },
				{
					id: 'b',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
				},
			],
			[
				{ value: '3', label: 'Italy' },
				{
					id: 'c',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
				},
			],
			[
				{ value: '4', label: 'Spain' },
				{
					id: 'd',
					componentType: 'Radio',
					options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }],
				},
			],
		]}
	/>
));

stories.addWithJSX('OneAxisTwoMeasures', () => (
	<Table
		id="one-axis-two-measures"
		label="Birth informations"
		handleChange={console.log}
		cells={[
			[
				{ label: '' },
				{ label: 'Date', headerCell: true },
				{ label: 'Place', headerCell: true },
			],
			[
				{ value: '1', label: 'Marco' },
				{ id: 'a-datepicker', componentType: 'Datepicker' },
				{
					id: 'a-dropdown',
					componentType: 'Dropdown',
					options: [
						{ value: 'fr', label: 'France' },
						{ value: 'other', label: 'Other' },
					],
				},
			],
			[
				{ value: '2', label: 'Kyllian' },
				{ id: 'b-datepicker', componentType: 'Datepicker' },
				{
					id: 'b-dropdown',
					componentType: 'Dropdown',
					options: [
						{ value: 'fr', label: 'France' },
						{ value: 'other', label: 'Other' },
					],
				},
			],
		]}
	/>
));

stories.addWithJSX('OneHierarchicalAxis', () => (
	<Table
		id="one-hierarchical-axis"
		label="Hierarchical table"
		handleChange={console.log}
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
				},
			],
			[
				{ value: 'A2', label: 'A2' },
				{
					id: 'a2',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
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
				},
			],
			[
				{ value: 'B2', label: 'B2' },
				{
					id: 'b2',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
				},
			],
			[
				{ value: 'B3', label: 'B3' },
				{
					id: 'B3',
					componentType: 'InputNumber',
					min: 0,
					max: 100,
				},
			],
			[
				{ value: 'other', label: 'Other', colspan: '2' },
				{ id: 'other', componentType: 'InputNumber', min: 0, max: 100 },
			],
		]}
	/>
));

stories.addWithJSX('TwoAxisOneMeasure', () => (
	<Table
		id="two-axis"
		label="What dimensions do you value and in which countries"
		handleChange={console.log}
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
				{ id: '11', componentType: 'CheckboxBoolean' },
				{ id: '12', componentType: 'CheckboxBoolean' },
				{ id: '13', componentType: 'CheckboxBoolean' },
				{ id: '14', componentType: 'CheckboxBoolean' },
			],
			[
				{ value: '2', label: 'France' },
				{ id: '21', componentType: 'CheckboxBoolean' },
				{ id: '22', componentType: 'CheckboxBoolean' },
				{ id: '23', componentType: 'CheckboxBoolean' },
				{ id: '24', componentType: 'CheckboxBoolean' },
			],
			[
				{ value: '3', label: 'Italy' },
				{ id: '31', componentType: 'CheckboxBoolean' },
				{ id: '32', componentType: 'CheckboxBoolean' },
				{ id: '33', componentType: 'CheckboxBoolean' },
				{ id: '34', componentType: 'CheckboxBoolean' },
			],
			[
				{ value: '4', label: 'Spain' },
				{ id: '41', componentType: 'CheckboxBoolean' },
				{ id: '42', componentType: 'CheckboxBoolean' },
				{ id: '43', componentType: 'CheckboxBoolean' },
				{ id: '44', componentType: 'CheckboxBoolean' },
			],
		]}
	/>
));

stories.addWithJSX('Roster', () => (
	<Table
		id="roster"
		label="Family composition"
		handleChange={console.log}
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
				},
				{ id: '12', componentType: 'Input' },
				{ id: '13', componentType: 'Input' },
				{ id: '14', componentType: 'InputNumber' },
			],
			[
				{
					id: '21',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '22', componentType: 'Input' },
				{ id: '23', componentType: 'Input' },
				{ id: '24', componentType: 'InputNumber' },
			],
			[
				{
					id: '31',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '32', componentType: 'Input' },
				{ id: '33', componentType: 'Input' },
				{ id: '34', componentType: 'InputNumber' },
			],
			[
				{
					id: '41',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '42', componentType: 'Input' },
				{ id: '43', componentType: 'Input' },
				{ id: '44', componentType: 'InputNumber' },
			],
			[
				{
					id: '51',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '52', componentType: 'Input' },
				{ id: '53', componentType: 'Input' },
				{ id: '54', componentType: 'InputNumber' },
			],
			[
				{
					id: '61',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '62', componentType: 'Input' },
				{ id: '63', componentType: 'Input' },
				{ id: '64', componentType: 'InputNumber' },
			],
			[
				{
					id: '71',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '72', componentType: 'Input' },
				{ id: '73', componentType: 'Input' },
				{ id: '74', componentType: 'InputNumber' },
			],
			[
				{
					id: '81',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '82', componentType: 'Input' },
				{ id: '83', componentType: 'Input' },
				{ id: '84', componentType: 'InputNumber' },
			],
			[
				{
					id: '91',
					componentType: 'CheckboxOne',
					options: [
						{ value: '1', label: 'Man' },
						{ value: '2', label: 'Woman' },
					],
				},
				{ id: '92', componentType: 'Input' },
				{ id: '93', componentType: 'Input' },
				{ id: '94', componentType: 'InputNumber' },
			],
		]}
	/>
));
