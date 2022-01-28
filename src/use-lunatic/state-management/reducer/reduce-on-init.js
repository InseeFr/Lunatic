import { createPagesMap, createValuesMap, orderingPagesMap } from '../../init';
import createExecuteExpression from '../../../utils/execute-expression';

function reduceOnInit(state, action) {
	const { payload } = action;
	const { source } = payload;
	const pages = orderingPagesMap(createPagesMap(source));
	const values = createValuesMap(source);
	const [executeExpression, updateBindings] = createExecuteExpression(source);

	return { ...state, pages, values, executeExpression, updateBindings };
}

export default reduceOnInit;
