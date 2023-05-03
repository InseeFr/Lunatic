import { describe, it, expect } from 'vitest';
import prepare from './prepare-string-indexation';
describe('String indexation', function () {
	it('bâtiment', function () {
		expect(prepare('bâtiment')).toEqual('batiment');
	});
});
