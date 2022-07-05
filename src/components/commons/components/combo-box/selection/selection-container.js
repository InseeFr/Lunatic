import React from 'react';
import classnames from 'classnames';

function SelectionContainer({
	children,

	id,
	expended,
	focused,
	disabled,
}) {
	const comboBoxId = `lunatic-combo-box-selection-${id}`;
	return (
		<div
			id={comboBoxId}
			className={classnames('lunatic-combo-box-selection', {
				focused,
				disabled,
			})}
			role="combobox"
			aria-controls={'todo'}
			aria-haspopup="listbox"
			aria-expanded={expended}
			aria-autocomplete="list"
			aria-owns={comboBoxId}
		>
			{children}
		</div>
	);
}

export default SelectionContainer;

SelectionContainer.defaultProps = { id: 'idUndefined' };
