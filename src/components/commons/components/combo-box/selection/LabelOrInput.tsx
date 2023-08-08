import LabelSelection, { LabelSelectionProps } from './label-selection';
import Input, { InputProps } from './input';

type LabelOrInputTypeProps = LabelSelectionProps &
	InputProps & { editable?: boolean; expanded?: boolean };

export function LabelOrInput(props: LabelOrInputTypeProps) {
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
