import filterOptions from './filter-options';

import { describe, test, expect } from 'vitest';

describe('filterOption', () => {
	const options = [
		{
			value: '1',
			label: {
				props: {
					expression: 'Washington',
				},
			},
		},
		{
			value: '2',
			label: {
				props: {
					expression: 'Kentucky',
				},
			},
		},
		{
			value: '3',
			label: {
				props: {
					expression: 'Ohio',
				},
			},
		},
		{
			value: '4',
			label: {
				props: {
					expression: 'Maine',
				},
			},
		},
		{
			value: '5',
			label: {
				props: {
					expression: 'North Dakota',
				},
			},
		},
		{
			value: '6',
			label: {
				props: {
					expression: 'Florida',
				},
			},
		},
		{
			value: '7',
			label: {
				props: {
					expression: 'North Takoma',
				},
			},
		},
		{
			value: '8',
			label: {
				props: {
					expression: 'California',
				},
			},
		},
		{
			value: '9',
			label: {
				props: {
					expression: 'Texas',
				},
			},
		},
		{
			value: '10',
			label: {
				props: {
					expression: 'Massachusetts',
				},
			},
		},
		{
			value: '11',
			label: {
				props: {
					expression: 'Nevada',
				},
			},
		},
		{
			value: '12',
			label: {
				props: {
					expression: 'Illinois',
				},
			},
		},
		{
			value: '13',
			label: {
				props: {
					expression: 'Not in any state, you fool!',
				},
			},
		},
	];

	test.each([
		['', options.map((o) => o.value)],
		['no', ['12', '1', '5', '7', '13']],
		['ke', ['2']],
		['k', ['5', '7', '2']],
	])('should filter correctly with "%s" prefix', (prefix, expected) => {
		expect(filterOptions(options, prefix).map((o) => o.value)).toEqual(
			expected
		);
	});
});
