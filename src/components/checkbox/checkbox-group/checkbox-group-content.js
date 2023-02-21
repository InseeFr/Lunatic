import React from 'react';
import { CheckboxOption } from '../commons';
import './checkbox.scss';

function CheckboxGroupContainer({ children }) {
	return <div className="lunatic-checkbox-group-option">{children}</div>;
}

function CheckboxGroupContent({ options, id }) {
	return options.map(function (option) {
		const { label, checked, name, onClick, description } = option;
		const checkboxId = `lunatic-checkbox-${id}-${name}`;

		return (
			<CheckboxGroupContainer key={checkboxId}>
				<CheckboxOption
					id={checkboxId}
					checked={checked}
					onClick={onClick}
					label={label}
					description={description}
				/>
			</CheckboxGroupContainer>
		);
	});
}

export default CheckboxGroupContent;
