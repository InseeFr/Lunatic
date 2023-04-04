type Props = {
	option: {
		id: string | number;
		value?: string | number;
		label?: string;
	} | null;
	placeholder?: string;
	search?: string;
};

function getContent(option: Props['option'], search: Props['search']) {
	if (option) {
		const { id, value, label } = option;
		return label ? `${id || value} - ${label}` : id || value;
	}
	if (search && search.trim().length) {
		return search;
	}
	return null;
}

function DefaultLabelRenderer({ option, placeholder, search }: Props) {
	const content = getContent(option, search);
	if (content) {
		return <span className="selection">{content}</span>;
	}
	return <span className="placeholder">{placeholder}</span>;
}

export default DefaultLabelRenderer;
