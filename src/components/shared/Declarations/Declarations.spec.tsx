import Declarations from './Declarations';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { LunaticBaseProps } from '../../type';

const declarations = [
	{
		id: '1',
		label: 'Declaration 1',
		declarationType: 'AFTER',
		position: 'AFTER_QUESTION_TEXT',
	},
	{
		id: '2',
		label: 'Declaration 2',
		declarationType: 'BEFORE',
		position: 'BEFORE_QUESTION_TEXT',
	},
	{
		id: '3',
		label: 'Declaration 3',
		declarationType: 'DETACHABLE',
		position: 'DETACHABLE',
	},
] satisfies LunaticBaseProps['declarations'];

describe('Declarations component', () => {
	it('renders correctly with filtered Declarations', () => {
		const { getByTestId, getByText } = render(
			<div>
				<div data-testid={`declarations-1-AFTER_QUESTION_TEXT`} />
				<Declarations
					id="1"
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
				/>
			</div>
		);
		const declarationsElement = getByTestId(
			'Declarations-1-AFTER_QUESTION_TEXT'
		);
		expect(declarationsElement.nextElementSibling).toHaveClass(
			'Declarations-lunatic'
		);
		const declarationElement = getByText('Declaration 1');
		expect(declarationElement).toBeInTheDocument();
		expect(declarationElement).toHaveClass('declaration-lunatic');
		expect(declarationElement).toHaveClass('declaration-after');
	});

	it('renders nothing with unfiltered Declarations', () => {
		const declarationstest = [
			{
				id: '3',
				label: 'Declaration 3',
				declarationType: 'DETACHABLE',
				position: 'DETACHABLE',
			},
		];
		const { queryByTestId } = render(
			<div>
				<div data-testid={`declarations-1-BEFORE_QUESTION_TEXT`} />
				<Declarations
					id="1"
					type="BEFORE_QUESTION_TEXT"
					declarations={declarationstest}
				/>
			</div>
		);
		const declarationsElement = queryByTestId(
			'Declarations-1-BEFORE_QUESTION_TEXT'
		)!;
		expect(declarationsElement.nextElementSibling).toBeNull();
	});

	it('renders nothing with empty Declarations array', () => {
		const { queryByTestId } = render(
			<div>
				<div data-testid={`declarations-1-DETACHABLE`} />
				<Declarations id="1" type="DETACHABLE" declarations={[]} />
			</div>
		);
		const declarationsElement = queryByTestId('Declarations-1-DETACHABLE')!;
		expect(declarationsElement.nextElementSibling).toBeNull();
	});
});
