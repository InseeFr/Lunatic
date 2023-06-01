import { ReactNode, useCallback, useEffect, useState } from 'react';
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
	onSelect?: (s: ComboBoxOption | null) => void;
	value: string | null;
	labelRenderer: LunaticComponentProps<'Suggester'>['labelRenderer'];
	optionRenderer: LunaticComponentProps<'Suggester'>['optionRenderer'];
	disabled?: boolean;
	id?: string;
	searching?: (s: string | null) => Promise<{ results: ComboBoxOption[] }>;
	label?: ReactNode;
	description?: ReactNode;
	displayResponses: ReactNode;
	errors?: Record<string, LunaticError[]>;
};

function Suggester({
	className = 'lunatic-suggester-default-style',
	placeholder = D.PLACEHOLDER,
	onSelect = voidFunction,
	labelRenderer = DefaultLabelRenderer,
	optionRenderer = DefaultOptionRenderer,
	value,
	disabled,
	responses,
	id,
	searching,
	label,
	displayResponses,
	description,
	errors,
}: Props) {
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState<Array<ComboBoxOption>>([]);

	const handleSelect = useCallback(
		function (option: ComboBoxOption | null) {
			onSelect(option ? option : null);
		},
		[onSelect]
	);

	/*UserInput*/
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
	console.log('search', search);
	useEffect(() => {
		const newSearch = getDisplayValue(responses, value);
		console.log('newSearch', newSearch);
		setSearch(newSearch);
	}, [responses, value]);
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
			search={search}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			placeholder={placeholder}
			label={label}
			description={description}
			errors={errors}
		/>
	);
}

function getDisplayValue(responses: any, value: any) {
	if (responses) {
		const responseId = responses.find((r) => r.id === 'id').response.name;
		const responseLabel = responses.find((r) => r.id === 'label').response.name;
		return value[responseId]
			? `${value[responseId]} - ${value[responseLabel]}`
			: '';
	}
	return '';
}

export default createCustomizableLunaticField(Suggester, 'Suggester');
