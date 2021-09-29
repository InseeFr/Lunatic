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

function SuggesterWrapper({
	id,
	className,
	storeName,
	version,
	labelledBy,
	placeholder,
	optionRenderer,
	onSelect,
	searching,
	labelRenderer,
	disabled,
}) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { search, selectedIndex, options } = state;

	useEffect(
		function () {
			async function doIt() {
				try {
					const { results, search: old } = await searching(search);
					dispatch(actions.onUpdateOptions(results, old));
				} catch (e) {
					dispatch(actions.onError('Une erreur est survenue.'));
				}
			}
			doIt();
		},
		[search, searching]
	);

	useEffect(
		function () {
			if (selectedIndex !== undefined) {
				onSelect(options[selectedIndex], selectedIndex);
			}
		},
		[selectedIndex, onSelect, options]
	);

	useEffect(
		function () {
			dispatch(actions.onInit({ id, disabled }));
		},
		[id, disabled]
	);
	return (
		<SuggesterContext.Provider value={[state, dispatch]}>
			<Suggester
				className={className}
				placeholder={placeholder}
				storeName={storeName}
				version={version}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
			/>
		</SuggesterContext.Provider>
	);
}

SuggesterWrapper.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	storeInfo: PropTypes.object,
};

SuggesterWrapper.defaultProps = {
	id: undefined,
	className: 'lunatic-suggester-default-style',
	labelledBy: undefined,
	placeholder: 'Veuillez...',
	optionRenderer: DefaultOptionRenderer,
	labelRenderer: DefaultLabelRenderer,
	language: 'French',
	onSelect: () => null,
};

export default SuggesterWrapper;
