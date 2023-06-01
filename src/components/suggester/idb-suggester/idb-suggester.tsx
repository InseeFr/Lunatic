import { useMemo, useState } from 'react';
import { ComboBoxOption } from '../../commons/components/combo-box/combo-box.type';
import { LunaticComponentProps } from '../../type';
import Suggester from '../html/suggester';
import createSearching from '../searching';
import CheckStore from './check-store';
import { SuggesterStatus } from './suggester-status';

type Props = Pick<
	LunaticComponentProps<'Suggester'>,
	| 'storeName'
	| 'idbVersion'
	| 'id'
	| 'className'
	| 'optionRenderer'
	| 'labelRenderer'
	| 'disabled'
	| 'value'
	| 'label'
	| 'description'
	| 'getSuggesterStatus'
	| 'errors'
> & {
	onSelect: (v: ComboBoxOption | null) => void;
};

export function IDBSuggester({
	storeName,
	idbVersion = '1',
	id,
	className,
	optionRenderer,
	labelRenderer,
	onSelect,
	disabled,
	value,
	label,
	description,
	getSuggesterStatus,
	errors,
}: Props) {
	const [store, setStore] = useState(undefined);

	const searching = useMemo(
		function () {
			if (store) {
				return createSearching(storeName, idbVersion);
			}
			return undefined;
		},
		[storeName, idbVersion, store]
	);

	return (
		<SuggesterStatus
			storeName={storeName}
			getSuggesterStatus={getSuggesterStatus}
			label={label}
			description={description}
		>
			<CheckStore
				storeName={storeName}
				version={parseInt(idbVersion, 10)}
				setStore={setStore}
			>
				<Suggester
					id={id}
					className={className}
					optionRenderer={optionRenderer}
					labelRenderer={labelRenderer}
					onSelect={onSelect}
					searching={searching}
					disabled={disabled}
					value={value}
					label={label}
					description={description}
					errors={errors}
				/>
			</CheckStore>
		</SuggesterStatus>
	);
}
