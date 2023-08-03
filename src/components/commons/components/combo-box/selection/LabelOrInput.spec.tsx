import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { LabelOrInput } from './LabelOrInput';
import { describe, it, expect } from 'vitest';

describe('displayLabelOrInput', () => {
	it('Render Label when not expended', () => {
		const { getByText } = render(
			<LabelOrInput
				editable
				expanded={false}
				options={[{ label: 'hello', value: '-1' }]}
				selectedIndex={0}
			/>
		);
		expect(getByText('hello')).toBeInTheDocument();
	});
});
