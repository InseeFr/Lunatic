import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useLunatic from '../../../use-lunatic';
import '@testing-library/jest-dom';
import Input from './input';

const source = {
	components: {
		id: 'input',
		componentType: 'Input',
	},
};

describe('Input HTML element test', function () {
	it('Element in page', function () {
		render(
			<Input
				id="test-input"
				label="example"
				onChange={() => null}
				value="toto"
			/>
		);
		const input = screen.getByLabelText('example');
		expect(input).toBeInTheDocument();
		expect(input.value).toBe('toto');
	});

	it('User action', function () {
		const { getComponents } = useLunatic(source, {});
	});
});
