import { useCallback, useState } from 'react';
import D from '../../../i18n';
import { createCustomizableLunaticField } from '../../commons';
import {
	DeclarationsAfterText,
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';
import { LunaticComponentProps } from '../../type';
import getInitLength from '../commons/get-init-length';
import HandleRowButton from '../commons/handle-row-button';
import { LunaticComponents } from '../../lunatic-components';
import { times } from '../../../utils/array';

function BlockForLoop(props: LunaticComponentProps<'Loop'>) {
	const {
		declarations,
		id,
		label,
		lines,
		handleChange,
		value,
		iterations,
		getComponents,
	} = props;
	const min = lines?.min;
	const max = lines?.max;

	const [nbRows, setNbRows] = useState(() => {
		if (iterations) {
			//This should be an Integer
			return Number.parseInt(iterations.toString());
		}
		const initLength = getInitLength(value);
		return Math.max(initLength, min);
	});

	const addRow = useCallback(
		function () {
			if (nbRows < max) {
				setNbRows(nbRows + 1);
			}
		},
		[max, nbRows]
	);

	const removeRow = useCallback(
		function () {
			if (nbRows > 1) {
				const newNbRows = nbRows - 1;
				setNbRows(newNbRows);
				Object.entries(value).forEach(([k, v]) => {
					const newValue = v.filter((_, i) => i < newNbRows);
					handleChange({ name: k }, newValue);
				});
			}
		},
		[nbRows, handleChange, value]
	);

	if (nbRows <= 0) {
		return null;
	}
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<DeclarationsAfterText declarations={declarations} id={id} />
			{times(nbRows, (n) => (
				<LunaticComponents
					key={n}
					components={getComponents(n)}
					componentProps={(c) => ({ ...props, ...c })}
				/>
			))}
			<DeclarationsDetachable declarations={declarations} id={id} />
			{Number.isInteger(min) && Number.isInteger(max) && min !== max && (
				<>
					<HandleRowButton onClick={addRow} disabled={nbRows === max}>
						{label || D.DEFAULT_BUTTON_ADD}
					</HandleRowButton>
					<HandleRowButton onClick={removeRow} disabled={nbRows === 1}>
						{D.DEFAULT_BUTTON_REMOVE}
					</HandleRowButton>
				</>
			)}
		</>
	);
}

export default createCustomizableLunaticField(BlockForLoop, 'BlockForLoop');
