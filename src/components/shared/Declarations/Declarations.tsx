import { customizedComponent } from '../HOC/customizedComponent';
import './Declarations.scss';
import {
	type HTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
} from 'react';
import classnames from 'classnames';

export const Declaration = customizedComponent<
	PropsWithChildren<{ type: string }>
>('Declaration', ({ children, type }) => (
	<div
		data-testid="declaration"
		className={classnames(
			'declaration-lunatic',
			`declaration-${type.toLowerCase()}`
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
		declarationType: string;
		position: string;
		label: ReactNode;
	}[];
};

function LunaticDeclarations({
	id,
	type = 'AFTER_QUESTION_TEXT',
	declarations,
}: Props) {
	const filtered = declarations?.filter((d) => d.position === type) ?? [];

	if (filtered.length === 0) {
		return null;
	}

	return (
		<div id={`declarations-${id}-${type}`} className="declarations-lunatic">
			{filtered.map(({ id, label, declarationType }) => (
				<Declaration key={id} type={declarationType}>
					{label}
				</Declaration>
			))}
		</div>
	);
}

export const Declarations = customizedComponent(
	'Declarations',
	LunaticDeclarations
);
