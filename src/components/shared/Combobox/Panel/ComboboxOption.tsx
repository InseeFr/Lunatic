import classnames from 'classnames';
import type { ComboboxOptionType } from '../ComboboxType';
import { slottableComponent } from '../../HOC/slottableComponent';
import D from '../../../../i18n';

type Props = {
	option: ComboboxOptionType;
	shouldDisplayOptionId?: boolean;
	selected?: boolean;
};

export const ComboboxOption = slottableComponent(
	'ComboboxOption',
	({ option, shouldDisplayOptionId = true, selected }: Props) => {
		const { id, value, label } = option;

		if (value === 'OTHER') {
			return (
				<div className={classnames('lunatic-combo-box-option', { selected })}>
					<span className="label">
						{`${D.SUGGESTER_NO_RESULT} : ${D.SUGGESTER_ARBITRARY} "${label}"`}
					</span>
				</div>
			);
		}
		if (label) {
			return (
				<div className={classnames('lunatic-combo-box-option', { selected })}>
					{shouldDisplayOptionId && (
						<>
							<span className="id">{id || value}</span>
							<span> - </span>
						</>
					)}
					<span className="label">{label}</span>
				</div>
			);
		}
		return (
			<div className={classnames('lunatic-combo-box-option', { selected })}>
				<span className="id">{id || value}</span>
			</div>
		);
	}
);
