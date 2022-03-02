import { useCallback, useReducer, useEffect } from 'react';
import { reducer, initialState, actions } from './state-management';
import { mergePageTagIterations } from './commons';

function useLunatic({ source, initialPage }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { pages, pager } = state;
	const { pageTag, iterations, isFirst, isLast } = pager;
	console.log({ pager });
	useEffect(
		function () {
			if (source) {
				dispatch(actions.onInit({ source, initialPage }));
			}
		},
		[source, initialPage]
	);

	const getComponents = useCallback(function () {
		return [];
	}, []);

	const goNext = useCallback(
		function () {
			dispatch(actions.goNext());
		},
		[dispatch]
	);

	const goPrevious = useCallback(
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
	return {
		getComponents,
		goNext,
		goPrevious,
		handleChange,
		pageTag: mergePageTagIterations(pageTag, iterations),
		isFirst,
		isLast,
	};
}

export default useLunatic;
