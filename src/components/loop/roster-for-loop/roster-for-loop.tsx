import { useCallback, useState } from 'react';
import { createCustomizableLunaticField, Errors } from '../../commons';
import LunaticComponent from '../../commons/components/lunatic-component-with-label';
import RosterTable from './roster-table';
import HandleRowButton from '../commons/handle-row-button';
import D from '../../../i18n';
import getInitLength from '../commons/get-init-length';
import { LunaticComponentProps } from '../../type';
import { useRefSync } from '../../../hooks/use-ref-sync';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

function RosterforLoop({
	value: valueMap,
	lines,
	handleChange,
	declarations,
	label,
	components,
	executeExpression,
	header,
	missing,
	id,
	management,
	errors,
	missingResponse,
	description,
}: LunaticComponentProps<'RosterForLoop'>) {
	const min = lines?.min || DEFAULT_MIN_ROWS;
	const max = lines?.max || DEFAULT_MAX_ROWS;
	const [nbRows, setNbRows] = useState(() => getInitLength(valueMap));
	const showButtons = min && max && min !== max;
	const valueMapRef = useRefSync(valueMap);
	const nbRowsRef = useRefSync(nbRows);

	const addRow = useCallback(
		function () {
			if (nbRows < max) {
				setNbRows(nbRows + 1);
			}
		},
		[max, nbRows]
	);

	const handleChangeLoop = useCallback(
		function (
			response: { name: string },
			value: unknown,
			args: { index: number; [k: string]: unknown }
		) {
			const v = valueMapRef.current[response.name];
			v[args.index] = value;
			handleChange(response, v, { loop: true, length: nbRowsRef.current }); // TODO: a retaper pour déplacer cette compléxité
		},
		[handleChange, nbRowsRef, valueMapRef]
	);

	const removeRow = useCallback(
		function () {
			if (nbRows > 1) {
				const newNbRows = nbRows - 1;
				setNbRows(newNbRows);
				Object.entries(valueMap).forEach(([k, v]) => {
					const newValue = v.filter((_, i) => i < newNbRows);
					handleChange({ name: k }, newValue);
				});
			}
		},
		[nbRows, handleChange, valueMap]
	);

	if (nbRows > 0) {
		return (
			<>
				<LunaticComponent
					id={id}
					label={label}
					declarations={declarations}
					missing={missing}
					missingResponse={missingResponse}
					management={management}
					description={description}
					handleChange={handleChange}
				>
					<RosterTable
						id={id}
						components={components}
						nbRows={nbRows}
						executeExpression={executeExpression}
						header={header}
						handleChange={handleChangeLoop}
						value={valueMap}
						missing={missing}
						errors={errors}
					/>
					<Errors errors={errors} activeId={id} />
				</LunaticComponent>
				{showButtons && (
					<>
						<HandleRowButton onClick={addRow} disabled={nbRows === max}>
							{D.DEFAULT_BUTTON_ADD}
						</HandleRowButton>
						<HandleRowButton onClick={removeRow} disabled={nbRows === min}>
							{D.DEFAULT_BUTTON_REMOVE}
						</HandleRowButton>
					</>
				)}
			</>
		);
	}
	return null;
}

export default createCustomizableLunaticField(RosterforLoop, 'RosterforLoop');
