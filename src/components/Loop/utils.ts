import { useCallback, useEffect, useState } from 'react';
import { LunaticComponentProps } from '../type';
import { resizeArrayVariable } from '../../use-lunatic/reducer/commons';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

export const computeNbRows = (
	lines?: { min?: number },
	iterations?: number
) => {
	const min = lines?.min ?? DEFAULT_MIN_ROWS;
	return Math.max(min, iterations ?? DEFAULT_MIN_ROWS);
};

export const useLoopUtils = (
	props: LunaticComponentProps<'RosterForLoop'> | LunaticComponentProps<'Loop'>
) => {
	const { lines, iterations, value: valueMap, handleChanges } = props;
	const min = lines?.min ?? DEFAULT_MIN_ROWS;
	const max = lines?.max ?? DEFAULT_MAX_ROWS;
	const [nbRows, setNbRows] = useState(computeNbRows(lines, iterations));

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
		const initialResponses = Object.entries(valueMap)
			.filter(([, v]) => (v?.length ?? 0) < nbRows)
			.map(([k, v]) => ({
				name: k,
				value: resizeArrayVariable(v, nbRows, null),
			}));
		if (initialResponses.length > 0) handleChanges(initialResponses);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addRow = useCallback(() => {
		if (nbRows < max) {
			const newNbRows = nbRows + 1;
			setNbRows(newNbRows);
			const newResponses = Object.entries(valueMap).map(([k, v]) => ({
				name: k,
				value: resizeArrayVariable(v, newNbRows, null),
			}));
			handleChanges(newResponses);
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
	}, [nbRows, min, valueMap, handleChanges]);

	return { min, max, nbRows, addRow, removeRow };
};
