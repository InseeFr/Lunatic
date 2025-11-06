import { type PropsWithChildren, useRef } from 'react';
import D from '../../i18n';
import { times } from '../../utils/array';
import { LunaticComponents } from '../LunaticComponents';
import type { LunaticComponentProps } from '../type';
import { blockedInLoopComponents } from './constant';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Label } from '../shared/Label/Label';
import { Declarations } from '../shared/Declarations/Declarations';
import { Button } from '../shared/Button/Button';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import type { LunaticError } from '../../use-lunatic/type';
import { useLoopUtils } from './utils';
import { useAutoFocus } from '../../hooks/use-auto-focus';

/**
 * Loop without specific markup (stack of subcomponents)
 */
export function Loop(props: LunaticComponentProps<'Loop'>) {
	const { min, max, nbRows, addRow, removeRow, focusKey } = useLoopUtils(props);
	const { getComponents, errors } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	useAutoFocus(containerRef, focusKey);

	if (nbRows === 0) {
		return null;
	}

	return (
		<CustomLoop
			{...props}
			errors={getComponentErrors(errors, props.id)}
			addRow={nbRows === max ? undefined : addRow}
			removeRow={nbRows === 1 || nbRows === min ? undefined : removeRow}
			canControlRows={min !== max && Number.isFinite(max)}
			containerRef={containerRef}
		>
			{times(nbRows, (n) => (
				<div key={n} data-focus-key={`row-${n}`}>
					<LunaticComponents
						blocklist={blockedInLoopComponents}
						components={getComponents(n)}
						autoFocusKey={focusKey}
						componentProps={(c) => ({
							...props,
							...c,
							iteration: n,
							id: `${c.id}-${n}`,
							errors,
						})}
					/>
				</div>
			))}
		</CustomLoop>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'RosterForLoop' | 'Loop'>,
	| 'response'
	| 'handleChanges'
	| 'errors'
	| 'lines'
	| 'iterations'
	| 'value'
	| 'getComponents'
> &
	PropsWithChildren<{
		errors?: LunaticError[];
		addRow?: () => void;
		removeRow?: () => void;
		canControlRows?: boolean;
		containerRef?: React.RefObject<HTMLDivElement>;
		focusKey?: string;
	}>;

export const CustomLoop = slottableComponent<CustomProps>('Loop', (props) => {
	const {
		declarations,
		id,
		label,
		canControlRows,
		children,
		errors,
		addRow,
		removeRow,
		containerRef,
	} = props;

	return (
		<>
			<Label htmlFor={id} id={`label-${id}`}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<div ref={containerRef}>{children}</div>
			<ComponentErrors errors={errors} />
			{canControlRows && (
				<>
					<Button onClick={addRow} disabled={!addRow}>
						{D.DEFAULT_BUTTON_ADD}
					</Button>
					<Button onClick={removeRow} disabled={!removeRow}>
						{D.DEFAULT_BUTTON_REMOVE}
					</Button>
				</>
			)}
		</>
	);
});
