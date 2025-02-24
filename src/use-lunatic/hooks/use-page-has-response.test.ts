import { describe, expect, it, vi } from 'vitest';
import { usePageHasResponse } from './use-page-has-response';
import { type LunaticComponentProps } from '../../components/type';
import { renderHook } from '@testing-library/react';

const defaultComponentValues = {
	id: 'a',
	value: null,
	handleChanges: vi.fn(),
};

describe('usePageHasResponse', () => {
	it('should be true when there are no components', () => {
		const components: LunaticComponentProps[] = [];
		const { result } = renderHook(() =>
			usePageHasResponse(components, vi.fn())
		);
		expect(result.current()).toBeTruthy();
	});

	it('should be false when there is no value', () => {
		const components: LunaticComponentProps[] = [
			{ ...defaultComponentValues, componentType: 'Text' },
		];
		const { result } = renderHook(() =>
			usePageHasResponse(components, vi.fn())
		);
		expect(result.current()).toBeFalsy();
	});

	it('should be true when there is a value', () => {
		const components: LunaticComponentProps[] = [
			{
				...defaultComponentValues,
				componentType: 'Text',
				value: 'my awesome value',
			},
		];
		const { result } = renderHook(() =>
			usePageHasResponse(components, vi.fn())
		);
		expect(result.current()).toBeTruthy();
	});

	it('should be true for a Question component', () => {
		const components: LunaticComponentProps[] = [
			{
				...defaultComponentValues,
				componentType: 'Question',
				components: [
					{
						...defaultComponentValues,
						componentType: 'Text',
					},
				],
				value: { t1: 'my awesome value' },
			},
		];
		const { result } = renderHook(() =>
			usePageHasResponse(components, vi.fn())
		);
		expect(result.current()).toBeTruthy();
	});

	it('should be true when there is an arbitrary response', () => {
		const components: LunaticComponentProps[] = [
			{
				...defaultComponentValues,
				componentType: 'Suggester',
				allowArbitrary: true,
				arbitraryValue: 'my arbitrary value',
			} as any,
		];
		const { result } = renderHook(() =>
			usePageHasResponse(components, vi.fn())
		);
		expect(result.current()).toBeTruthy();
	});

	it('should be true when there is a missing response', () => {
		const components: LunaticComponentProps[] = [
			{
				...defaultComponentValues,
				componentType: 'Text',
				missingResponse: { name: 'a_MISSING', value: 'my missing value' },
			},
		];
		const { result } = renderHook(() =>
			usePageHasResponse(components, vi.fn())
		);
		expect(result.current()).toBeTruthy();
	});

	it('should be true for a QCM table', () => {
		const mockExecuteExpression = vi.fn();
		mockExecuteExpression.mockReturnValueOnce('my value');
		const components: LunaticComponentProps[] = [
			{
				...defaultComponentValues,
				componentType: 'Table',
				body: [
					[
						{
							...defaultComponentValues,
							id: 't1',
							componentType: 'CheckboxBoolean',
							response: { name: 't1' },
						},
					],
				],
				header: [{ label: 'my label' }],
				executeExpression: vi.fn(),
				iteration: 0,
				value: {},
			},
		];
		const { result } = renderHook(() =>
			usePageHasResponse(components, mockExecuteExpression)
		);
		expect(result.current()).toBeTruthy();
	});

	it('should be true for a QCM table in a Question', () => {
		const mockExecuteExpression = vi.fn();
		mockExecuteExpression.mockReturnValueOnce('my value');
		const components: LunaticComponentProps[] = [
			{
				...defaultComponentValues,
				componentType: 'Question',
				components: [
					{
						...defaultComponentValues,
						componentType: 'Table',
						body: [
							[
								{
									...defaultComponentValues,
									id: 't1',
									componentType: 'CheckboxBoolean',
									response: { name: 't1' },
								},
							],
						],
						header: [{ label: 'my label' }],
						executeExpression: vi.fn(),
						iteration: 0,
						value: { t1: true },
					},
				],
				value: {},
			},
		];
		const { result } = renderHook(() =>
			usePageHasResponse(components, mockExecuteExpression)
		);
		expect(result.current()).toBeTruthy();
	});
});

it('should be true for a loop component with values', () => {
	const mockExecuteExpression = vi.fn();
	mockExecuteExpression.mockReturnValueOnce('my value');

	const values = {
		VOTREPRENO: ['Alice', 'Bob', 'Charlie'],
		VOTREAGE: [22, 30, 40],
	};

	const components = [
		{
			...defaultComponentValues,
			componentType: 'Loop',
			components: [
				{
					...defaultComponentValues,
					componentType: 'Question',
					components: [
						{
							...defaultComponentValues,
							componentType: 'Input',
							response: { name: 'VOTREPRENO' },
						},
						{
							...defaultComponentValues,
							componentType: 'InputNumber',
							response: { name: 'VOTREAGE' },
						},
					],
				},
			],
			value: values,
		},
	] as any as LunaticComponentProps[];

	const { result } = renderHook(() =>
		usePageHasResponse(components, mockExecuteExpression)
	);

	expect(result.current()).toBeTruthy();
});
