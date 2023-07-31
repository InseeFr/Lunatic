import LabelSelection, { LabelSelectionProps } from './label-selection';
import Input, { InputProps } from './input';

type LabelOrInputType = LabelSelectionProps &
	InputProps & { editable?: boolean; expanded?: boolean };

export function LabelOrInput(props: LabelOrInputType) {
	const { editable, expanded } = props;
	const displayLabel = !editable || !expanded;

	const {
		labelRenderer,
		placeholder,
		selectedIndex,
		options,
		search,
		disabled,
		id,
		focused,
		onChange,
	} = props;

	if (displayLabel) {
		return (
			<LabelSelection
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
			/>
		);
	}
	return (
		<Input
			id={`combobox-input-${id}`}
			className="lunatic-combo-box-input"
			onChange={onChange}
			value={search}
			placeholder={placeholder}
			disabled={disabled}
			focused={focused}
		/>
	);
}

/*
<LabelSelection
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
			/>
			<Input
				id={`combobox-input-${id}`}
				className="lunatic-combo-box-input"
				onChange={onChangeEx}
				value={search}
				placeholder={placeholder}
				disabled={disabled}
				focused={focused}
				editable={editable}
				expanded={expanded}
			/>

			*/
