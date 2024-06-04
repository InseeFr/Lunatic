import { slottableComponent } from '../HOC/slottableComponent';
import { type PropsWithChildren, type ReactNode } from 'react';
import classnames from 'classnames';

export const Declaration = slottableComponent<
	PropsWithChildren<{
		declarationType:
			| 'INSTRUCTION'
			| 'COMMENT'
			| 'HELP'
			| 'CODECARD'
			| 'WARNING'
			| 'STATEMENT';
	}>
>('Declaration', ({ children, declarationType }) => (
	<div
		data-testid="declaration"
		className={classnames(
			'declaration-lunatic',
			`declaration-${declarationType.toLowerCase()}`
		)}
	>
		{children}
	</div>
));

type Props = {
	id?: string;
	type?: 'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE';
	declarations?: {
		id: string;
		declarationType:
			| 'INSTRUCTION'
			| 'COMMENT'
			| 'HELP'
			| 'CODECARD'
			| 'WARNING'
			| 'STATEMENT';
		position: string;
		label: ReactNode;
	}[];
};

function LunaticDeclarations({
	id,
	type = 'AFTER_QUESTION_TEXT',
	declarations,
}: Props) {
	const filtered =
		declarations?.filter((d) => d.position === type && d.label) ?? [];

	if (filtered.length === 0) {
		return null;
	}

	return (
		<div id={`declarations-${id}-${type}`} className="declarations-lunatic">
			{filtered.map(({ id, label, declarationType }) => (
				<Declaration key={id} declarationType={declarationType}>
					{label}
				</Declaration>
			))}
		</div>
	);
}

export const Declarations = slottableComponent(
	'Declarations',
	LunaticDeclarations
);
