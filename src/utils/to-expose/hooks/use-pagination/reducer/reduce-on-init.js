import checkLoops from '../check-loops';
import createPages from '../create-page';

function reduceOnInit(state, action) {
	const { payload } = action;
	const { questionnaire, bindings, initialPage, features } = payload;

	if (questionnaire && bindings) {
		const { maxPage, components } = questionnaire;
		if (Array.isArray(components) && components.length && maxPage) {
			return {
				...state,
				pages: checkLoops(createPages(components)),
				page: initialPage,
				maxPage,
				bindings,
				features,
			};
		}
	}

	return state;
}

export default reduceOnInit;
