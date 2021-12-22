import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	reducer,
	INITIAL_STATE,
	SuggesterContext,
	actions,
} from './state-management';
import { Suggester } from './components';
import DefaultLabelRenderer from './components/selection/default-label-renderer';
import { DefaultOptionRenderer } from './components';
import './default-style.scss';

function getSearch(search, value) {
	if (search && search.length) {
		return search;
	}
	return value;
}

function SuggesterWrapper({
	id,
	className,
	version,
	labelledBy,
	placeholderList,
	optionRenderer,
	onSelect,
	searching,
	labelRenderer,
	disabled,
	value,
	focused,
	response,
	logFunction,
}) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { search, selectedIndex, options, expended } = state;

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
					dispatch(actions.onError('Une erreur est survenue.'));
				}
			}
			doIt();
		},
		[search, searching, value]
	);

	useEffect(
		function () {
			if (selectedIndex !== undefined && !expended) {
				onSelect(options[selectedIndex], selectedIndex);
			}
		},
		[selectedIndex, onSelect, options, expended]
	);

	useEffect(
		function () {
			dispatch(actions.onInit({ id, disabled, value }));
		},
		[id, disabled, value]
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
				focused={focused}
				response={response}
				logFunction={logFunction}
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
	storeInfo: PropTypes.object,
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
