import { Label } from '../shared/Label/Label';
import { LunaticComponentProps } from '../type';

export const PairwiseMirror = ({
	value,
	options,
	label,
}: LunaticComponentProps<'Dropdown'>) => {
	const selectedOption = options?.find((o) => o.value === value);
	if (!selectedOption) {
		return null;
	}
	return (
		<div className="lunatic lunatic-component lunatic-dropdown lunatic-combo-box-container default-style">
			<Label>{label}</Label>
			<div>{selectedOption?.label}</div>
		</div>
	);
};
