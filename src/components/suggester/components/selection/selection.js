import React, { useContext } from 'react';
import { SuggesterContext, actions } from '../../state-management';
import Label from './label';

function Selection({ labelRenderer, placeholder, labelledBy }, inputEl) {
	const [state, dispatch] = useContext(SuggesterContext);
	const { search, expended, id } = state;

	function onChange(e) {
		dispatch(actions.onChangeSearch(e.target.value));
	}

	return (
		<div className="lunatic-suggester-selection">
			<input
				ref={inputEl}
				id={`${id}-input`}
				tabIndex="0"
				className="lunatic-suggester-input"
				type="text"
				onChange={onChange}
				value={search}
				role="combobox"
				title="suggester"
				aria-expanded={expended}
				aria-autocomplete="list"
				aria-controls={`${id}-list`}
				aria-labelledby={labelledBy}
				aria-label="lunatic-suggester"
				autoComplete="off"
				autoCapitalize="off"
				autoCorrect="off"
				spellCheck="false"
				placeholder={placeholder}
			/>
			<Label labelRenderer={labelRenderer} placeholder={placeholder} />
		</div>
	);
}

export default React.forwardRef(Selection);
