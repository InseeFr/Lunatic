import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Duration from './duration';
import { ExpressionLogger } from '../../use-lunatic/commons/execute-expression/create-execute-expression';

describe('Duration component', () => {
	const handleChange = vi.fn();

	it('should render with hours and minutes inputs when format is "PTnHnM"', () => {
		const { getByLabelText } = render(
			<Duration
				format="PTnHnM"
				handleChange={handleChange}
				id={''}
				value={null}
				executeExpression={function <T extends unknown = unknown>(
					expression: unknown,
					args?:
						| {
								iteration?: number | undefined;
								linksIterations?: number[] | undefined;
								logging?: ExpressionLogger | undefined;
								bindingDependencies?: string[] | undefined;
						  }
						| undefined
				): T {
					throw new Error('Function not implemented.');
				}}
				response={{
					name: '',
				}}
			/>
		);

		const hoursInput = getByLabelText('Heures:');
		const minutesInput = getByLabelText('Minutes:');

		expect(hoursInput).toBeInTheDocument();
		expect(minutesInput).toBeInTheDocument();
	});

	it('should render with years and months inputs when format is "PnYnM"', () => {
		const { getByLabelText } = render(
			<Duration
				format="PnYnM"
				handleChange={handleChange}
				id={''}
				value={null}
				executeExpression={function <T extends unknown = unknown>(
					expression: unknown,
					args?:
						| {
								iteration?: number | undefined;
								linksIterations?: number[] | undefined;
								logging?: ExpressionLogger | undefined;
								bindingDependencies?: string[] | undefined;
						  }
						| undefined
				): T {
					throw new Error('Function not implemented.');
				}}
				response={{
					name: '',
				}}
			/>
		);

		const yearsInput = getByLabelText('Années:');
		const monthsInput = getByLabelText('Mois:');

		expect(yearsInput).toBeInTheDocument();
		expect(monthsInput).toBeInTheDocument();
	});
});
