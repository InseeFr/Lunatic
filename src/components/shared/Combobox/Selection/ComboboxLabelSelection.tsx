import classNames from 'classnames';
import type { ComboboxOptionType } from '../ComboboxType';
import { slottableComponent } from '../../HOC/slottableComponent';

type Props = {
	option?: ComboboxOptionType | null;
	placeholder?: string;
	search?: string;
	disabled?: boolean;
	readOnly?: boolean;
};

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

const LunaticComboBoxLabelSelection = ({
	option,
	placeholder,
	search,
	disabled = false,
	readOnly = false,
}: Props) => {
	const isPlaceholder = !option && (!search || search.length === 0);
	if (option?.value === 'OTHER') {
		return (
			<div
				className={classNames('lunatic-combo-box-selected', {
					disabled,
					readOnly,
				})}
			>
				<span className="selection">{option.label}</span>
			</div>
		);
	}
	return (
		<div
			className={classNames('lunatic-combo-box-selected', {
				disabled,
				readOnly,
			})}
		>
			<span
				className={classNames({
					placeholder: isPlaceholder,
					selection: !isPlaceholder,
				})}
			>
				{getContent(option, search, placeholder)}
			</span>
		</div>
	);
};

export const ComboboxLabelSelection = slottableComponent(
	'ComboboxLabelSelection',
	LunaticComboBoxLabelSelection
);
