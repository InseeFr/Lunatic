import { describe, it, expect } from 'vitest';
import getStemmer from './get-stemmer';
describe('common-tokenizer', function () {
	it('getStemmer', function () {
		const stemmer = getStemmer();
		expect(stemmer('bâtiment')).toEqual('bât');
	});
});
