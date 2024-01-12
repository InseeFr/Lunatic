import { useMemo, useState } from 'react';
import type { LunaticError } from '../../../use-lunatic/type';
import type { LunaticComponentProps } from '../../type';
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
	| 'readOnly'
	| 'value'
	| 'label'
	| 'description'
	| 'getSuggesterStatus'
	| 'allowArbitraryOption'
> & {
	errors?: LunaticError[];
	onSelect: (v: string | null) => void;
	workersBasePath?: string;
};

export function IDBSuggester({
	storeName,
	idbVersion = '1',
	id,
	className,
	optionRenderer,
	labelRenderer,
	onSelect,
	allowArbitraryOption = true,
	disabled,
	value,
	label,
	description,
	getSuggesterStatus,
	errors,
	readOnly,
	workersBasePath,
}: Props) {
	const [storeInfo, setStoreInfo] = useState(undefined);

	const searching = useMemo(
		function () {
			if (storeInfo) {
				return createSearching(storeName, idbVersion, workersBasePath);
			}
			return undefined;
		},
		[storeInfo, storeName, idbVersion, workersBasePath]
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
					allowArbitraryOption={allowArbitraryOption}
				/>
			</CheckStore>
		</SuggesterStatus>
	);
}
