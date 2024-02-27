import { useCallback, useState } from 'react';
import D from '../../i18n';
import { times } from '../../utils/array';
import { LunaticComponents } from '../LunaticComponents';
import type { LunaticComponentProps } from '../type';
import { blockedInLoopComponents } from './constant';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { Label } from '../shared/Label/Label';
import { Declarations } from '../shared/Declarations/Declarations';
import { Button } from '../shared/Button/Button';

/**
 * Loop without specific markup (stack of subcomponents)
 */
export const Loop = customizedComponent<LunaticComponentProps<'Loop'>>(
	'BlockForLoop',
	(props) => {
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
		const min = lines?.min ?? 0;
		const max = lines?.max ?? Infinity;
		const canControlRows = min !== max && Number.isFinite(max);

		const [nbRows, setNbRows] = useState(() => {
			return Math.max(iterations, min);
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
				<Label htmlFor={id} id={`label-${id}`}>
					{label}
				</Label>
				<Declarations
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
					id={id}
				/>
				{times(nbRows, (n) => (
					<LunaticComponents
						blocklist={blockedInLoopComponents}
						key={n}
						components={getComponents(n)}
						componentProps={(c) => ({ ...props, ...c, id: `${c.id}-${n}` })}
					/>
				))}
				{canControlRows && (
					<>
						<Button onClick={addRow} disabled={nbRows === max}>
							{D.DEFAULT_BUTTON_ADD}
						</Button>
						<Button onClick={removeRow} disabled={nbRows === 1}>
							{D.DEFAULT_BUTTON_REMOVE}
						</Button>
					</>
				)}
			</>
		);
	}
);
