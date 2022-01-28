import { useCallback, useReducer, useEffect } from 'react';
import { reducer, initialState, actions } from './state-management';
import { getPageTag } from './commons';

function useLunatic({ source, initialPage }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { pages, pager } = state;
	const pageTag = getPageTag(pager);
	console.log({ pages });
	useEffect(
		function () {
			if (source) {
				dispatch(actions.onInit({ source }));
			}
		},
		[source]
	);

	const getComponents = useCallback(function () {
		return [];
	}, []);

	const getNext = useCallback(
		function () {
			dispatch(actions.goNext());
		},
		[dispatch]
	);

	const getPrevious = useCallback(
		function () {
			dispatch(actions.goPrevious());
		},
		[dispatch]
	);

	const handleChange = useCallback(
		function (respons, value, args) {
			dispatch(actions.handleChange(respons, value, args));
		},
		[dispatch]
	);

	return { getComponents, getNext, getPrevious, handleChange, pageTag };
}

export default useLunatic;
