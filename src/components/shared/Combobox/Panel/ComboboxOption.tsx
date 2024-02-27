import classnames from 'classnames';
import type { ComboboxOptionType } from '../ComboboxType';
import { customizedComponent } from '../../HOC/customizedComponent';

type Props = {
	option: ComboboxOptionType;
	selected?: boolean;
};

export const ComboboxOption = customizedComponent(
	'ComboboxOption',
	({ option, selected }: Props) => {
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
);
