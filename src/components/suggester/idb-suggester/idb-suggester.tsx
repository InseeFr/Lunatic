import { useMemo, useState } from 'react';
import Suggester from '../html/suggester';
import createSearching from '../searching';
import CheckStore from './check-store';
import { SuggesterStatus } from './suggester-status';
import type { LunaticComponentProps } from '../../type';

type Props = Pick<
	LunaticComponentProps<'Suggester'>,
	| 'storeName'
	| 'idbVersion'
	| 'id'
	| 'className'
	| 'optionRenderer'
	| 'labelRenderer'
	| 'disabled'
	| 'readOnly'
	| 'value'
	| 'label'
	| 'description'
	| 'getSuggesterStatus'
	| 'errors'
> & {
	onSelect: (v: string | null) => void;
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
	readOnly,
}: Props) {
	const [storeInfo, setStoreInfo] = useState(undefined);

	const searching = useMemo(
		function () {
			if (storeInfo) {
				return createSearching(storeName, idbVersion);
			}
			return undefined;
		},
		[storeName, idbVersion, storeInfo]
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
				onInfo={setStoreInfo}
			>
				<Suggester
					id={id}
					className={className}
					optionRenderer={optionRenderer}
					labelRenderer={labelRenderer}
					onSelect={onSelect}
					searching={searching}
					disabled={disabled}
					readOnly={readOnly}
					value={value}
					label={label}
					description={description}
					errors={errors}
				/>
			</CheckStore>
		</SuggesterStatus>
	);
}
