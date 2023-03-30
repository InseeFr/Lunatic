import React from 'react';
import { CheckboxOption } from '../../commons';
import { getShortcutKey } from '../../commons/getShortcutKey';

function CheckboxGroupContainer({ children }) {
	return <div className="lunatic-checkbox-group-option">{children}</div>;
}

function CheckboxGroupContent({ options, id, shortcut }) {
	const maxIndex = options.length;
	return options.map(function (option, index) {
		const { label, checked, name, onClick, description } = option;
		const codeModality = getShortcutKey(index, maxIndex);

		const checkboxId = `lunatic-checkbox-${id}-${name}`;
		const labelId = `lunatic-checkbox-label-${id}-${name}`;

		return (
			<>
				<CheckboxGroupContainer key={checkboxId}>
					<CheckboxOption
						id={checkboxId}
						labelledBy={labelId}
						checked={checked}
						onClick={onClick}
						onKeyDown={onClick}
						label={label}
						description={description}
						shortcut={shortcut}
						codeModality={shortcut && codeModality}
						index={index}
					/>
				</CheckboxGroupContainer>
			</>
		);
	});
}

export default CheckboxGroupContent;
