import React from 'react';
import { CheckboxOption } from '../commons';
import './checkbox.scss';
import { CheckboxGroupOption } from './lunatic-checkbox-group';

type Props = {
	id: string;
	options: CheckboxGroupOption[];
};

function CheckboxGroupContent({ options, id }: Props) {
	return (
		<>
			{options.map(function (option) {
				const { label, checked, name, onClick, description } = option;
				const checkboxId = `lunatic-checkbox-${id}-${name}`;

				return (
					<div className="lunatic-checkbox-group-option" key={checkboxId}>
						<CheckboxOption
							id={checkboxId}
							checked={checked}
							onClick={onClick}
							label={label}
							description={description}
						/>
					</div>
				);
			})}
		</>
	);
}

export default CheckboxGroupContent;
