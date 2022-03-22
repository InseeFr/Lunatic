import React, { useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import Label from './label';

function Selection({
	labelRenderer,
	placeholder,
	labelledBy,
	search,
	expended,
	id,
	disabled,
	focused,
	onChange,
	displayLabel,
	selectedIndex,
	options,
	editable,
}) {
	const inputEl = useRef();

	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	useEffect(
		function () {
			if (inputEl.current && focused) {
				inputEl.current.focus();
			}
		},
		[inputEl, focused]
	);

	const labelSelection = !editable || !expended;
	return (
		<div
			id={id}
			className={classnames('lunatic-dropdown-selection', {
				focused,
				disabled,
			})}
			role="combobox"
			aria-controls={'todo'}
			aria-haspopup="listbox"
			aria-labelledby={labelledBy}
			aria-expanded={expended}
			aria-autocomplete="list"
			aria-owns={`${id}-list`}
		>
			{labelSelection ? (
				<Label
					labelRenderer={labelRenderer}
					placeholder={placeholder}
					displayLabel={displayLabel}
					expended={expended}
					selectedIndex={selectedIndex}
					options={options}
					search={search}
					disabled={disabled}
				/>
			) : (
				<input
					ref={inputEl}
					id={`${id}-input`}
					tabIndex="0"
					className="lunatic-dropdown-input"
					type="text"
					onChange={onChangeEx}
					value={search}
					aria-label="lunatic-suggester"
					title="suggester"
					autoComplete="off"
					autoCapitalize="off"
					autoCorrect="off"
					spellCheck="false"
					placeholder={placeholder}
					disabled={disabled}
				/>
			)}
		</div>
	);
}

export default Selection;
