import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	reducer,
	INITIAL_STATE,
	SuggesterContext,
	actions,
} from './state-management';
import { Suggester } from './components';
import DefaultLabelRenderer from './components/selection/default-label-renderer';
import createOnKeyDownCallback from './create-on-keydown-callback';
import { DefaultOptionRenderer } from './components';
import { usePrevious } from '../commons';
import './default-style.scss';

function getSearch(search, value) {
	if (search && search.length) {
		return search;
	}
	return value;
}

function SuggesterWrapper({
	className,
	version,
	labelledBy,
	placeholderList,
	optionRenderer,
	onSelect,
	searching,
	labelRenderer,
	value,
	custom,
	disabled,
}) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { search, selectedIndex, options, focused, id, messageError } = state;
	const prevSelectedIndex = usePrevious(selectedIndex);

	useEffect(
		function () {
			async function doIt() {
				try {
					const what = getSearch(search, value);
					if (what && typeof searching === 'function') {
						const { results, search: old } = await searching(what);
						dispatch(actions.onUpdateOptions(results, old));
					} else {
						dispatch(actions.onDeleteSearch());
					}
				} catch (e) {
					console.error(e);
					dispatch(
						actions.onError('Une erreur est survenue durant une recherche.')
					);
				}
			}
			doIt();
		},
		[search, searching, value]
	);

	useEffect(
		function () {
			if (selectedIndex !== prevSelectedIndex) {
				if (selectedIndex in options) {
					const { id } = options[selectedIndex];
					onSelect(id);
				} else {
					onSelect(null);
				}
			}
		},
		[selectedIndex, onSelect, options, prevSelectedIndex]
	);

	useEffect(
		function () {
			dispatch(actions.onInit({ id, disabled, value }));
		},
		[id, disabled, value]
	);

	const onFocus = useCallback(
		function () {
			dispatch(actions.onFocus());
		},
		[dispatch]
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
			dispatch(actions.onBlur());
		},
		[dispatch]
	);

	const onKeyDown = useMemo(
		() => createOnKeyDownCallback(dispatch),
		[dispatch]
	);

	const onChange = useCallback(
		function (value) {
			dispatch(actions.onChangeSearch(value));
		},
		[dispatch]
	);

	const onClickOption = useCallback(
		function (index) {
			dispatch(actions.onClickOption(index));
		},
		[dispatch]
	);

	return (
		<SuggesterContext.Provider value={[state, dispatch]}>
			<Suggester
				className={className}
				placeholderList={placeholderList}
				version={version}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
				value={value}
				custom={custom}
				focused={focused}
				messageError={messageError}
				onFocus={onFocus}
				onDelete={onDelete}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				onChange={onChange}
				onClickOption={onClickOption}
				{...state}
			/>
		</SuggesterContext.Provider>
	);
}

SuggesterWrapper.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	placeholderList: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
	]),
	searching: PropTypes.func,
};

SuggesterWrapper.defaultProps = {
	id: undefined,
	className: 'lunatic-suggester-default-style',
	labelledBy: undefined,
	placeholderList: 'Veuillez...',
	optionRenderer: DefaultOptionRenderer,
	labelRenderer: DefaultLabelRenderer,
	language: 'French',
	onSelect: () => null,
	value: undefined,
	searching: undefined,
};

export default SuggesterWrapper;
