import { useCallback, useEffect, useState } from 'react';
import { LunaticComponentProps } from '../type';
import { resizeArrayVariable } from '../../use-lunatic/reducer/commons';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

export const useLoopUtils = (
	props: LunaticComponentProps<'RosterForLoop'> | LunaticComponentProps<'Loop'>
) => {
	const { lines, iterations, value: valueMap, handleChanges } = props;
	const min = lines?.min ?? DEFAULT_MIN_ROWS;
	const max = lines?.max ?? DEFAULT_MAX_ROWS;
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
