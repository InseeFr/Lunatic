import React, {
	useCallback,
	useContext,
	useRef,
	useMemo,
	useEffect,
	useState,
} from 'react';
import classnames from 'classnames';
import { actions, SuggesterContext } from '../state-management';
import SuggesterContent from './suggester-content';
import Selection from './selection';
import Panel from './panel';
import createOnKeyDownCallback from './create-on-keydown-callback';
import Delete from './selection/delete';
import * as C from '../../../constants';
import * as U from '../../../utils/lib';
import './suggester.scss';

function Suggester({
	className,
	placeholderList,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	value,
	focused: initFocused,
	response,
	logFunction,
}) {
	const inputEl = useRef();
	const [state, dispatch] = useContext(SuggesterContext);
	const { focused, id, messageError, search, disabled } = state;

	const [init, setInit] = useState(false);

	const createEventFocus = (focusIn = true) =>
		U.createObjectEvent(
			`suggester-${id}`,
			C.INPUT_CATEGORY,
			focusIn ? C.EVENT_FOCUS_IN : C.EVENT_FOCUS_OUT,
			U.getResponseName(response),
			value
		);

	const onFocus = useCallback(
		function () {
			if (!focused && !disabled) {
				if (inputEl.current !== document.activeElement) {
				}
				inputEl.current.focus();
				dispatch(actions.onFocus());
			}
		},
		[disabled, dispatch, focused]
	);

	// Handle focused props of Component
	useEffect(() => {
		if (!init && id) {
			if (initFocused && !focused) onFocus();
			setInit(true);
		}
	}, [focused, init, initFocused, onFocus, id]);

	// log info when focus change
	useEffect(() => {
		if (init && id && focused && U.isFunction(logFunction))
			logFunction(createEventFocus());
		if (init && id && !focused && U.isFunction(logFunction))
			logFunction(createEventFocus(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [focused, id, init]);

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
					placeholderList={placeholderList}
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
