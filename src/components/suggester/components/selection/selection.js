import React, { useContext } from 'react';
import { SuggesterContext, actions } from '../../state-management';
import classnames from 'classnames';
import { Fab } from '../../../../utils/components/fab';
import CrossIcon from '../../../../utils/icons/cross.icon';
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
				aria-labelledBy={labelledBy}
				aria-label="lunatic-suggester"
				autoComplete="off"
				autoCapitalize="off"
				autoCorrect="off"
				spellCheck="false"
				placeholder={placeholder}
			/>
			<Label labelRenderer={labelRenderer} placeholder={placeholder} />
			<Fab
				className={classnames('mini', 'lunatic-suggester-fab')}
				tabIndex="-1"
				title="delete"
			>
				<CrossIcon className="lunatic-suggester-icon" />
			</Fab>
		</div>
	);
}

export default React.forwardRef(Selection);
