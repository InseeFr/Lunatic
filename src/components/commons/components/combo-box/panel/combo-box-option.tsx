import classnames from 'classnames';
import type { ComboBoxOptionType } from '../combo-box.type';
import createCustomizableLunaticField from '../../../create-customizable-field';

type Props = {
	option: ComboBoxOptionType;
	selected?: boolean;
};

function ComboBoxOption({ option, selected }: Props) {
	const { id, value, label } = option;

	if (label && typeof label === 'string' && label.length) {
		return (
			<div className={classnames('lunatic-combo-box-option', { selected })}>
				<span className="id">{id || value}</span>
				<span> - </span>
				<span className="label">{label}</span>
			</div>
		);
	}
	return (
		<div className={classnames('lunatic-combo-box-option', { selected })}>
			<span className="id">{id}</span>
		</div>
	);
}

export default createCustomizableLunaticField(ComboBoxOption, 'ComboboxOption');
