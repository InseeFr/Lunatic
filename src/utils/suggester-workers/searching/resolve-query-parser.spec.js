import { describe, it, expect } from 'vitest';
import resolveQueryParser from './resolve-query-parser';

describe('parser', () => {
	it('should parse french tokens', async () => {
		const parser = await resolveQueryParser({
			params: {
				language: 'French',
				pattern: '[\\w.]+',
			},
			type: 'tokenized',
		});
		expect(parser('Culture français')).toEqual(['cultur', 'franc']);
	});
});
