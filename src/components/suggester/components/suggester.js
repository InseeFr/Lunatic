import React, { useCallback, useContext, useRef, useMemo } from 'react';
import classnames from 'classnames';
import { actions, SuggesterContext } from '../state-management';
import SuggesterContent from './suggester-content';
import Selection from './selection';
import Panel from './panel';
import createOnKeyDownCallback from './create-on-keydown-callback';
import Delete from './selection/delete';
import './suggester.scss';

function Suggester({
	className,
	placeholder,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	value,
}) {
	const inputEl = useRef();
	const [state, dispatch] = useContext(SuggesterContext);
	const { focused, id, messageError, search, disabled } = state;

	const onFocus = useCallback(
		function () {
			if (!disabled) {
				if (inputEl.current !== document.activeElement) {
				}
				inputEl.current.focus();
				dispatch(actions.onFocus());
			}
		},
		[dispatch, disabled]
	);

	const onDelete = useCallback(
		function () {
			dispatch(actions.onDeleteSearch());
			onSelect(undefined);
		},
		[dispatch, onSelect]
	);

	const onBlur = useCallback(
		function () {
			if (focused) {
				dispatch(actions.onBlur());
			}
		},
		[dispatch, focused]
	);
	const onKeyDown = useMemo(
		() => createOnKeyDownCallback(dispatch),
		[dispatch]
	);

	if (messageError) {
		return (
			<div className="lunatic-suggester-message-error">{messageError}</div>
		);
	}
	return (
		<div className={classnames('lunatic-suggester-container', className)}>
			<SuggesterContent
				id={id}
				focused={focused}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			>
				<Selection
					labelRenderer={labelRenderer}
					placeholder={placeholder}
					labelledBy={labelledBy}
					ref={inputEl}
				/>
				<Panel optionRenderer={optionRenderer} value={value} />
			</SuggesterContent>
			<Delete
				className={classnames({ focused })}
				search={search}
				onClick={onDelete}
			/>
		</div>
	);
}

export default Suggester;
