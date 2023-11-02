import { CheckboxOption } from '../../commons';
import { getShortcutKey } from '../../commons/getShortcutKey';
import { type CheckboxGroupOption } from '../lunatic-checkbox-group';

type Props = {
	options: CheckboxGroupOption[];
	id: string;
	shortcut?: boolean;
	invalid?: boolean;
};

function CheckboxGroupContent({ options, id, shortcut, invalid }: Props) {
	const maxIndex = options.length;
	return (
		<>
			{options.map(function (option, index) {
				const { label, checked, name, onClick, description } = option;
				const codeModality = getShortcutKey(index, maxIndex);

				const checkboxId = `lunatic-checkbox-${id}-${name}`;

				return (
					<div className="lunatic-checkbox-group-option" key={checkboxId}>
						<CheckboxOption
							id={checkboxId}
							checked={checked}
							onClick={onClick}
							label={label}
							description={description}
							shortcut={shortcut}
							codeModality={shortcut ? codeModality : undefined}
							invalid={invalid}
						/>
					</div>
				);
			})}
		</>
	);
}

export default CheckboxGroupContent;
