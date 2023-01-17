import React from 'react';
import { CheckboxOption } from '../../commons';

function CheckboxGroupContainer({ children }) {
	return <div className="lunatic-checkbox-group-option">{children}</div>;
}

function CheckboxGroupContent({ options, id }) {
	return options.map(function (option) {
		const { label, checked, name, onClick, description } = option;

		const checkboxId = `lunatic-checkbox-${id}-${name}`;
		const labelId = `lunatic-checkbox-label-${id}-${name}`;

		return (
			<CheckboxGroupContainer key={checkboxId}>
				<CheckboxOption
					id={checkboxId}
					labelledBy={labelId}
					checked={checked}
					onClick={onClick}
					onKeyDown={onClick}
					label={label}
					description={description}
				/>
			</CheckboxGroupContainer>
		);
	});
}

export default CheckboxGroupContent;
