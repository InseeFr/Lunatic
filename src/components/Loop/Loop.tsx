import {
	type PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from 'react';
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
import { resizeArrayVariable } from '../../use-lunatic/reducer/commons';

/**
 * Loop without specific markup (stack of subcomponents)
 */
export function Loop({
	lines,
	iterations,
	value: valueMap,
	handleChanges,
	getComponents,
	errors,
	...props
}: LunaticComponentProps<'Loop'>) {
	const min = lines?.min ?? 0;
	const max = lines?.max ?? Infinity;
	const [nbRows, setNbRows] = useState(Math.max(min, iterations));

	useEffect(() => {
		const initialResponses = Object.entries(valueMap)
			.filter(([, v]) => v.length < nbRows)
			.map(([k, v]) => {
				return {
					name: k,
					value: resizeArrayVariable(v, nbRows, null),
				};
			});
		if (initialResponses.length > 0) handleChanges(initialResponses);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nbRows]);

	const addRow = useCallback(() => {
		if (nbRows < max) {
			const newNbRows = nbRows + 1;
			setNbRows(newNbRows);
			const newResponses = Object.entries(valueMap).map(([k, v]) => {
				return {
					name: k,
					value: [...v, null],
				};
			});
			handleChanges(newResponses);
		}
	}, [max, nbRows, valueMap, handleChanges]);

	const removeRow = useCallback(() => {
		if (nbRows > 1) {
			const newNbRows = nbRows - 1;
			setNbRows(newNbRows);
			// Downsize all variables by 1
			const newResponses = Object.entries(valueMap).map(([k, v]) => {
				return {
					name: k,
					value: v?.filter((_, i) => i < newNbRows),
				};
			});
			handleChanges(newResponses);
		}
	}, [nbRows, handleChanges, valueMap]);

	if (nbRows <= 0) {
		return null;
	}

	return (
		<CustomLoop
			{...props}
			errors={getComponentErrors(errors, props.id)}
			addRow={nbRows === max ? undefined : addRow}
			removeRow={nbRows === 1 || nbRows === min ? undefined : removeRow}
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
