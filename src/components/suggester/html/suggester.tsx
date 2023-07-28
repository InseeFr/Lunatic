import { ReactNode, useCallback, useState } from 'react';
import D from '../../../i18n';
import { LunaticError } from '../../../use-lunatic/type';
import { voidFunction } from '../../../utils/function';
import {
	ComboBox,
	DefaultLabelRenderer,
	DefaultOptionRenderer,
	createCustomizableLunaticField,
} from '../../commons';
import { ComboBoxOption } from '../../commons/components/combo-box/combo-box.type';
import { LunaticComponentProps } from '../../type';
import './default-style.scss';

type Props = {
	className?: string;
	placeholder?: string;
	onSelect?: (s: ComboBoxOption | null | string) => void;
	value: string | null;
	labelRenderer: LunaticComponentProps<'Suggester'>['labelRenderer'];
	optionRenderer: LunaticComponentProps<'Suggester'>['optionRenderer'];
	disabled?: boolean;
	id?: string;
	searching?: (s: string | null) => Promise<{ results: ComboBoxOption[] }>;
	label?: ReactNode;
	description?: ReactNode;
	errors?: Record<string, LunaticError[]>;
	responses?: any;
	response?: any;
};

function Suggester({
	className = 'lunatic-suggester-default-style',
	placeholder = D.PLACEHOLDER,
	onSelect = voidFunction,
	labelRenderer = DefaultLabelRenderer,
	optionRenderer = DefaultOptionRenderer,
	value,
	disabled,
	response,
	responses,
	id,
	searching,
	label,
	description,
	errors,
}: Props) {
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState<Array<ComboBoxOption>>([]);

	const handleSelect = useCallback(
		function (option: ComboBoxOption | null | string) {
			onSelect(option ? option : null);
		},
		[onSelect]
	);

	/* UserInput */
	const handleChange = useCallback(
		async function (search: string | null) {
			if (search && typeof searching === 'function') {
				const { results } = await searching(search);
				setOptions(results);
				setSearch(search);
			} else {
				setOptions([]);
				onSelect(null);
				setSearch('');
			}
		},
		[searching, onSelect]
	);

	const defaultSearch = getSearch(responses, search, value);
	return (
		<ComboBox
			id={id}
			className={className}
			onChange={handleChange}
			disabled={disabled}
			options={options}
			editable={true}
			onSelect={handleSelect}
			value={value}
			search={defaultSearch}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			placeholder={placeholder}
			label={label}
			description={description}
			errors={errors}
		/>
	);
}

/**
 *
 * @param responses
 * @param value
 * @returns The value to display in the suggester : build on the keys and label field defines in the source.json
 */
function getDisplayValue(
	responses: { id: string }[],
	value: Record<string, unknown[]>
) {
	if (responses.length > 0) {
		const responseId = responses.find((r: { id: string }) => r.id === 'id')
			.response.name;
		const responseLabel = responses.find(
			(r: { id: string }) => r.id === 'label'
		).response.name;
		return value[responseId] && value[responseId].length > 0
			? `${value[responseId]} - ${value[responseLabel]}`
			: '';
	}
	return '';
}

function getSearch(
	responses: any,
	search: string,
	value: Object | string | null
) {
	if (responses && typeof value === 'object') {
		const displayValue = getDisplayValue(responses, value);
		return displayValue;
	}
	if (typeof value === 'string' && !search.length && value) {
		return value;
	}
	return '';
}

export default createCustomizableLunaticField(Suggester, 'Suggester');
