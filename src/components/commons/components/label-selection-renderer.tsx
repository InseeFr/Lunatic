import classNames from 'classnames';
import { SuggesterOption } from '../../type';
import createCustomizableLunaticField from '../create-customizable-field';

type Props = {
	option?: SuggesterOption | null;
	placeholder?: string;
	search?: string;
	disabled?: boolean;
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

function LabelSelectionRenderer({
	option,
	placeholder,
	search,
	disabled = false,
}: Props) {
	const isPh = isPlaceholder(option, search);
	return (
		<div
			className={classNames('lunatic-combo-box-selected', {
				disabled,
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
	LabelSelectionRenderer,
	'ComboboxLabelSelection'
);
