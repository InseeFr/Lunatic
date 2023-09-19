import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComponentSetBase } from './component-set';
import { LunaticComponents } from '../../lunatic-components';
// import type { FilledLunaticComponentProps } from '../../../use-lunatic/commons/fill-components/fill-components';
import type { ReactNode } from 'react';

describe('ComponentSet', () => {
	it('renders without crashing', () => {
		const label = 'component set test';
		const components: any[] = [
			{
				label: 'label' as ReactNode,
				componentType: 'Subsequence',
				gotoPage: '1',
				conditionFilter: true,
				declarations: undefined,
				controls: undefined,
				shortcut: false,
				mandatory: false,
				preferences: ['COLLECTED'],
				id: 'toto',
			},
			{
				label: 'input label' as ReactNode,
				description: 'input description',
				componentType: 'Input',
				value: 'input value',
				conditionFilter: true,
				declarations: undefined,
				controls: undefined,
				shortcut: false,
				mandatory: false,
				preferences: ['COLLECTED'],
				id: 'toto1',
			},
		];
		const { container } = render(
			<ComponentSetBase
				legendText={label}
				id="componentSet"
				aria-labelledby="input"
			>
				<LunaticComponents components={components} />
			</ComponentSetBase>
		);
		expect(container).toMatchSnapshot();
	});

	it('should handle readOnly in sub-components', () => {
		const label = 'component set test';
		const components: any[] = [
			{
				label: 'label' as ReactNode,
				componentType: 'Subsequence',
				gotoPage: '1',
				conditionFilter: true,
				declarations: undefined,
				controls: undefined,
				shortcut: false,
				mandatory: false,
				preferences: ['COLLECTED'],
				id: 'toto',
			},
			{
				label: 'input label' as ReactNode,
				description: 'input description',
				componentType: 'Input',
				value: 'input value',
				conditionFilter: true,
				declarations: undefined,
				controls: undefined,
				shortcut: false,
				mandatory: false,
				preferences: ['COLLECTED'],
				id: 'toto1',
				readOnly: true,
			},
		];
		const { container } = render(
			<ComponentSetBase
				legendText={label}
				id="componentSet"
				aria-labelledby="input"
			>
				<LunaticComponents components={components} />
			</ComponentSetBase>
		);
		expect(container).toMatchSnapshot();

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('readonly');
		(input as HTMLElement).focus();
		expect(input).toHaveFocus();
		expect(input).toHaveValue('input value');
	});
});
