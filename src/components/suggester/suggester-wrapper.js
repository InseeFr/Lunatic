import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
	usePrevious,
	ComboBox,
	DefaultOptionRenderer,
	DefaultLabelRenderer,
} from '../commons';
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
	placeholder,
	optionRenderer,
	onSelect,
	searching,
	labelRenderer,
	value,
	custom,
	disabled,
	id,
}) {
	const htmlFor = `lunatic-suggester-${id}`;

	const [search, setSearch] = useState(value || '');
	const [options, setOptions] = useState([]);

	const onChange = useCallback(
		function (what) {
			setSearch(what);
			if (!what) {
				setOptions([]);
				onSelect(null);
			}
		},
		[onSelect]
	);

	const handleSelect = useCallback(
		function (id) {
			if (id) {
				onSelect(id);
			} else {
				onSelect(null);
			}
		},
		[onSelect]
	);

	useEffect(
		function () {
			async function doIt() {
				if (search && typeof searching === 'function') {
					const { results, search: old } = await searching(search);
					setOptions(results);
				}
			}

			doIt();
		},
		[search, searching]
	);

	return (
		<ComboBox
			id={id}
			htmlFor={htmlFor}
			labelledBy={labelledBy}
			onChange={onChange}
			disabled={disabled}
			options={options}
			editable={true}
			onSelect={handleSelect}
			value={value}
			search={search}
			custom={custom}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
		/>
	);
}

SuggesterWrapper.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	placeholder: PropTypes.string,
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
	className: 'lunatic-suggester-default-style',
	labelledBy: undefined,
	placeholder: 'Veuillez...',
	optionRenderer: DefaultOptionRenderer,
	labelRenderer: DefaultLabelRenderer,
	language: 'French',
	onSelect: () => null,
	value: undefined,
	searching: undefined,
};

export default SuggesterWrapper;

// <Suggester
// 				className={className}
// 				placeholderList={placeholderList}
// 				version={version}
// 				labelledBy={labelledBy}
// 				optionRenderer={optionRenderer}
// 				labelRenderer={labelRenderer}
// 				onSelect={onSelect}
// 				value={value}
// 				custom={custom}
// 				focused={focused}
// 				messageError={messageError}
// 				onFocus={onFocus}
// 				onDelete={onDelete}
// 				onBlur={onBlur}
// 				onKeyDown={onKeyDown}
// 				onChange={onChange}
// 				onClickOption={onClickOption}
// 				{...state}
// 			/>

// const prevSelectedIndex = usePrevious(selectedIndex);

// useEffect(
// 	function () {
// 		async function doIt() {
// 			try {
// 				const what = getSearch(search, value);
// 				if (what && typeof searching === 'function') {
// 					const { results, search: old } = await searching(what);
// 					dispatch(actions.onUpdateOptions(results, old));
// 				} else {
// 					dispatch(actions.onDeleteSearch());
// 				}
// 			} catch (e) {
// 				console.error(e);
// 				dispatch(
// 					actions.onError('Une erreur est survenue durant une recherche.')
// 				);
// 			}
// 		}
// 		doIt();
// 	},
// 	[search, searching, value]
// );

// useEffect(
// 	function () {
// 		if (selectedIndex !== prevSelectedIndex) {
// 			if (selectedIndex in options) {
// 				const { id } = options[selectedIndex];
// 				onSelect(id);
// 			} else {
// 				onSelect(null);
// 			}
// 		}
// 	},
// 	[selectedIndex, onSelect, options, prevSelectedIndex]
// );

// useEffect(
// 	function () {
// 		dispatch(actions.onInit({ id, disabled, value }));
// 	},
// 	[id, disabled, value]
// );

// const onFocus = useCallback(
// 	function () {
// 		dispatch(actions.onFocus());
// 	},
// 	[dispatch]
// );

// const onDelete = useCallback(
// 	function () {
// 		dispatch(actions.onDeleteSearch());
// 		onSelect(undefined);
// 	},
// 	[dispatch, onSelect]
// );

// const onBlur = useCallback(
// 	function () {
// 		dispatch(actions.onBlur());
// 	},
// 	[dispatch]
// );

// const onKeyDown = useMemo(
// 	() => createOnKeyDownCallback(dispatch),
// 	[dispatch]
// );

// const onChange = useCallback(
// 	function (value) {
// 		dispatch(actions.onChangeSearch(value));
// 	},
// 	[dispatch]
// );

// const onClickOption = useCallback(
// 	function (index) {
// 		dispatch(actions.onClickOption(index));
// 	},
// 	[dispatch]
// );
