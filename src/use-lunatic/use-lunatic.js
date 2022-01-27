import { useCallback, useReducer, useEffect } from 'react';
import { reducer, initialState, actions } from './state-management';

function useLunatic({ source }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { pages } = state;

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

	return { getComponents, getNext, getPrevious, handleChange };
}

export default useLunatic;
