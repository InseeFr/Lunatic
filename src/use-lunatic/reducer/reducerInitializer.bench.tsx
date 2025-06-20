import { bench, describe } from 'vitest';

import { executeExpression } from './reducerInitializer';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';

describe('reducer initializer', () => {
	const store = new LunaticVariablesStore();
	store.set('CONFHAB', '2');

	bench('true', () => {
		executeExpression({ value: 'true', type: 'VTL' }, {}, store);
	});
	bench('static expression', () => {
		executeExpression({ value: '1 + 3', type: 'VTL' }, {}, store);
	});
	bench('costly expression', () => {
		executeExpression({ value: '(CONFHAB ="2")', type: 'VTL' }, {}, store);
	});
	bench('costly expression x2', () => {
		executeExpression({ value: '(CONFHAB ="2")', type: 'VTL' }, {}, store);
		executeExpression({ value: '(CONFHAB ="2")', type: 'VTL' }, {}, store);
	});
});
