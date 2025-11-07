import { useCallback, useEffect, useState } from 'react';
import { LunaticComponentProps } from '../type';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

export const useLoopUtils = (
	props: Pick<
		LunaticComponentProps<'RosterForLoop'> | LunaticComponentProps<'Loop'>,
		'lines' | 'iterations' | 'value' | 'handleChanges'
	>
) => {
	const { lines, iterations, value: valueMap, handleChanges } = props;
	const min = lines?.min ?? DEFAULT_MIN_ROWS;
	const max = lines?.max ?? DEFAULT_MAX_ROWS;
	const [nbRows, setNbRows] = useState(
		Math.max(min, iterations ?? DEFAULT_MIN_ROWS)
	);
	// Track which row should be focused
	const [focusKey, setFocusKey] = useState<string>();

	/**
	 * For Loop & rosterForLoop,
	 * Value can be  inconsistent i.e the value has not the right size
	 * The function add null values to the end of value (array), only when component is mount
	 *
	 * This the case when size of value is defined by VTL (but the value is not triggered by change)
	 * - ex: external variable indicate the size of variable
	 * - ex: min != max
	 *
	 * Improvment: do some kind of dynamic resizing and remove this useEffect.
	 * Variables must be consistent in variable-store.
	 */
	useEffect(() => {
		const newInitialValues = [];
		for (const name in valueMap) {
			const initialLength = valueMap[name]?.length ?? 0;

			for (let i = initialLength; i < nbRows; i++) {
				newInitialValues.push({
					name: name,
					value: null,
					iteration: [i],
				});
			}
		}
		if (newInitialValues.length > 0) handleChanges(newInitialValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addRow = useCallback(() => {
		if (nbRows < max) {
			const newNbRows = nbRows + 1;
			setNbRows(newNbRows);
			const newResponses = Object.entries(valueMap).map(([k]) => ({
				name: k,
				value: null,
				iteration: [nbRows],
			}));
			handleChanges(newResponses);
			setFocusKey(`row-${nbRows}`);
		}
	}, [max, nbRows, valueMap, handleChanges]);

	const removeRow = useCallback(() => {
		if (nbRows <= min) {
			return;
		}
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
		setFocusKey(`row-${newNbRows - 1}`);
	}, [nbRows, min, valueMap, handleChanges]);

	return { min, max, nbRows, addRow, removeRow, focusKey };
};
