import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	reducer,
	INITIAL_STATE,
	SuggesterContext,
	actions,
} from './state-management';
import { Suggester } from './components';
import DefaultLabelRenderer from './components/selection/defaul-label-renderer';
import { DefaultOptionRenderer } from './components';
import './default-style.scss';

function LunaticSuggester({
	id,
	className,
	storeName,
	version,
	labelledBy,
	placeholder,
	optionRenderer,
	onSelect,
	onChange,
	searching,
	labelRenderer,
	max,
}) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { search, selectedIndex, options } = state;

	useEffect(
		function () {
			async function doIt() {
				const { results, search: old } = await searching(search, max);
				dispatch(actions.onUpdateOptions(results, old));
				onChange(results, old);
			}
			doIt();
		},
		[search, onChange, searching, max]
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
			dispatch(actions.onInit(id));
		},
		[id]
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
			/>
		</SuggesterContext.Provider>
	);
}

LunaticSuggester.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
	max: PropTypes.number,
};

LunaticSuggester.defaultProps = {
	id: undefined,
	max: 30,
	className: 'lunatic-suggester-default-style',
	labelledBy: undefined,
	placeholder: 'Veuillez...',
	optionRenderer: DefaultOptionRenderer,
	labelRenderer: DefaultLabelRenderer,
	language: 'French',
	onSelect: () => null,
	onChange: () => null,
};

export default LunaticSuggester;
