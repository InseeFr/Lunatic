import { useCallback, useEffect, useReducer } from 'react';
import reducer from './reducer';
import INITIAL_STATE from './initial-state';
import * as actions from './actions';

function isOnSubPage(pager) {
	const { subPage } = pager;
	return subPage !== undefined;
}

function useQuestionnaire({ source, data }) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { questionnaire, bindings } = state;

	useEffect(
		function () {
			if (source && data) {
				dispatch(actions.onInit({ source, data }));
			}
		},
		[source, data]
	);

	const handleChange = useCallback(
		// Effets de bord sur bindings (ou/et questionnaire, à voir avec Nico)
		function (todo, args) {
			const { pager } = args;
			const { nbIterations } = pager;

			if (isOnSubPage(pager)) {
				Object.entries(todo).forEach(function ([name, value]) {
					if (name in bindings) {
						if (name in bindings) {
							const target = target[name];
							if (!Array.isArray(target) || target.length !== nbIterations) {
								target[name] = new Array(nbIterations);
							}
							target[name][iteration] = value;
						}
					}
				});
			} else {
				Object.entries(todo).forEach(function ([name, value]) {
					if (name in bindings) {
						bindings[name] = value;
					}
				});
			}
		},
		[bindings]
	);
	return { questionnaire, handleChange, bindings };
}

export default useQuestionnaire;
