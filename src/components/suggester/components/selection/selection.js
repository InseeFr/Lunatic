import React, { useContext } from 'react';
import { SuggesterContext, actions } from '../../state-management';
import classnames from 'classnames';
import Label from './label';

function Selection({ labelRenderer, placeholderList, labelledBy }, inputEl) {
	const [state, dispatch] = useContext(SuggesterContext);
	const { search, expended, id, disabled, focused } = state;

	function onChange(e) {
		dispatch(actions.onChangeSearch(e.target.value));
	}

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
				onChange={onChange}
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
			<Label labelRenderer={labelRenderer} placeholderList={placeholderList} />
		</div>
	);
}

export default React.forwardRef(Selection);
