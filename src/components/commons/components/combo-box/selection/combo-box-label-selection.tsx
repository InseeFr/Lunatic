import classNames from 'classnames';
import { ComboBoxOptionType } from '../combo-box.type';
import createCustomizableLunaticField from '../../../create-customizable-field';

type Props = {
	option?: ComboBoxOptionType | null;
	placeholder?: string;
	search?: string;
	disabled?: boolean;
	readOnly?: boolean;
};

function isPlaceholder(option: Props['option'], search: Props['search']) {
	return !option && (!search || search.length === 0);
}

function getContent(
	option: Props['option'],
	search?: Props['search'],
	placeholder?: string
) {
	if (option) {
		const { id, value, label } = option;
		return label ? `${id || value} - ${label}` : id || value;
	}
	if (search && search.trim().length) {
		return search;
	}
	return placeholder ?? '';
}

function ComboBoxLabelSelection({
	option,
	placeholder,
	search,
	disabled = false,
	readOnly = false,
}: Props) {
	const isPh = isPlaceholder(option, search);
	return (
		<div
			className={classNames('lunatic-combo-box-selected', {
				disabled,
				readOnly,
			})}
		>
			<span
				className={classNames({
					placeholder: isPh,
					selection: !isPh,
				})}
			>
				{getContent(option, search, placeholder)}
			</span>
		</div>
	);
}

export default createCustomizableLunaticField(
	ComboBoxLabelSelection,
	'ComboboxLabelSelection'
);
