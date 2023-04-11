import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { displayLabelOrInput } from './displayLabelOrInput';
import { describe, it, expect } from 'vitest';
describe('displayLabelOrInput', () => {
	const MockComponent = ({ value }: { value: ReactNode }) => <div>{value}</div>;

	it('should render Memoized component when name is Input and displayLabel is false', () => {
		const WrappedComponent = displayLabelOrInput(MockComponent, 'Input');
		const { getByText } = render(
			<WrappedComponent editable value="hello" expanded />
		);
		expect(getByText('hello')).toBeInTheDocument();
	});

	it('should render nothing when name is Input and displayLabel is true', () => {
		const WrappedComponent = displayLabelOrInput(MockComponent, 'Input');
		const { container } = render(
			<WrappedComponent editable={false} value="hello" expanded />
		);
		expect(container.firstChild).toBeNull();
	});

	it('should render Memoized component when name is LabelSelection and displayLabel is true', () => {
		const WrappedComponent = displayLabelOrInput(
			MockComponent,
			'LabelSelection'
		);
		const { getByText } = render(
			<WrappedComponent editable={false} value="hello" expanded />
		);
		expect(getByText('hello')).toBeInTheDocument();
	});

	it('should render nothing when name is LabelSelection and displayLabel is false', () => {
		const WrappedComponent = displayLabelOrInput(
			MockComponent,
			'LabelSelection'
		);
		const { container } = render(
			<WrappedComponent editable value="hello" expanded />
		);
		expect(container.firstChild).toBeNull();
	});
});
