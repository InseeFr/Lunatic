import Declaration from './declaration';
import { createCustomizableLunaticField } from '../commons';
import './declarations.scss';
import type { LunaticBaseProps } from '../type';

export const DECLARATION_POSITIONS = {
	after: 'AFTER_QUESTION_TEXT',
	before: 'BEFORE_QUESTION_TEXT',
	detachable: 'DETACHABLE',
} as const;

export type DeclarationsProps = {
	id?: string;
	type?: 'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE';
	declarations?: LunaticBaseProps['declarations'];
};

function Declarations({
	id,
	type = 'AFTER_QUESTION_TEXT',
	declarations,
}: DeclarationsProps) {
	const filtered =
		declarations?.filter(({ position }) => position === type) ?? [];
	if (filtered.length === 0) return null;

	return (
		<div id={`declarations-${id}-${type}`} className="declarations-lunatic">
			{filtered.map(({ id: idD, label, declarationType }) => (
				<Declaration key={`${idD}`} type={declarationType.toLowerCase()}>
					{label}
				</Declaration>
			))}
		</div>
	);
}

export default createCustomizableLunaticField(Declarations, 'Declarations');
