import type { ComboboxOptionType } from '../../shared/Combobox/ComboboxType';

type Props = {
	option?: ComboboxOptionType;
	placeholder?: string;
	search?: string;
};

function getContent(option: Props['option'], search?: string) {
	if (option) {
		const { value, label } = option;
		return label || value;
	}
	if (search?.trim().length) {
		return search;
	}
	return null;
}

export function SimpleLabelRenderer({ option, placeholder, search }: Props) {
	const content = getContent(option, search);
	if (content) {
		return <span className="selection">{content}</span>;
	}
	return <span className="placeholder">{placeholder}</span>;
}
