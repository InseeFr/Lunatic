import React, { useCallback } from 'react';
import classnames from 'classnames';
import Label from './label';

function Selection(
	{
		labelRenderer,
		placeholderList,
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
	},
	inputEl
) {
	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<div
			id={id}
			className={classnames('lunatic-suggester-selection', {
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
			<input
				ref={inputEl}
				id={`${id}-input`}
				tabIndex="0"
				className="lunatic-suggester-input"
				type="text"
				onChange={onChangeEx}
				value={search}
				aria-label="lunatic-suggester"
				title="suggester"
				autoComplete="off"
				autoCapitalize="off"
				autoCorrect="off"
				spellCheck="false"
				placeholderlist={placeholderList}
				disabled={disabled}
			/>
			<Label
				labelRenderer={labelRenderer}
				placeholderList={placeholderList}
				displayLabel={displayLabel}
				expended={expended}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
			/>
		</div>
	);
}

export default React.forwardRef(Selection);
