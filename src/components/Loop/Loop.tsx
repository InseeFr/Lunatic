import { type PropsWithChildren, useCallback, useState } from 'react';
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

/**
 * Loop without specific markup (stack of subcomponents)
 */
export function Loop({
	lines,
	iterations,
	value,
	handleChanges,
	getComponents,
	errors,
	...props
}: LunaticComponentProps<'Loop'>) {
	const min = lines?.min ?? 0;
	const max = lines?.max ?? Infinity;
	const [nbRows, setNbRows] = useState(() => {
		return Math.max(iterations, min);
	});
	const addRow = useCallback(() => {
		if (nbRows < max) {
			setNbRows(nbRows + 1);
		}
	}, [max, nbRows]);
	const removeRow = useCallback(() => {
		if (nbRows > 1) {
			const newNbRows = nbRows - 1;
			setNbRows(newNbRows);
			// Downsize all variables by 1
			const newResponses = Object.entries(value).map(([k, v]) => {
				return {
					name: k,
					value: v?.filter((_, i) => i < newNbRows),
				};
			});
			handleChanges(newResponses);
		}
	}, [nbRows, handleChanges, value]);

	if (nbRows <= 0) {
		return null;
	}

	return (
		<CustomLoop
			{...props}
			errors={getComponentErrors(errors, props.id)}
			addRow={nbRows === max ? undefined : addRow}
			removeRow={nbRows === 1 ? undefined : removeRow}
			canControlRows={min !== max && Number.isFinite(max)}
		>
			{times(nbRows, (n) => (
				<LunaticComponents
					blocklist={blockedInLoopComponents}
					key={n}
					components={getComponents(n)}
					componentProps={(c) => ({
						...props,
						...c,
						iteration: n,
						id: `${c.id}-${n}`,
						errors,
					})}
				/>
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
			{children}
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
