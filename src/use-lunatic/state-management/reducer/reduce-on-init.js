import {
	createPagesMap,
	createValuesMap,
	orderingPagesMap,
	validateInitialPage,
} from '../../init';
import createExecuteExpression from '../../../utils/execute-expression';

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source, initialPage } = payload;

	const pages = orderingPagesMap(createPagesMap(source));
	const values = createValuesMap(source);
	const [executeExpression, updateBindings] = createExecuteExpression(source);

	return validateInitialPage(
		{ ...state, pages, values, executeExpression, updateBindings },
		initialPage
	);
}

export default reduceOnInit;
