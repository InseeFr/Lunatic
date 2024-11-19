import { describe, it, expect } from 'vitest';
import { tokenizer, tokenizeQuery, tokenizeIndex } from './tokenizer';
import type { SearchInfo } from './SearchInterface';

const mockSearchInfo: SearchInfo = {
	name: 'Products',
	fields: [
		{
			name: 'title',
			min: 3,
			rules: ['[\\w]+'],
			synonyms: {
				car: ['vehicle', 'automobile'],
			},
		},
	],
	queryParser: {
		type: 'tokenized',
		params: {
			language: 'English',
			pattern: '[\\w.]+',
			min: 2,
		},
	},
};

describe('tokenizeQuery', () => {
	it('should tokenize based on soft type', () => {
		const queryParser = { type: 'soft' } as SearchInfo['queryParser'];

		const result = tokenizeQuery('This is a test!', queryParser);
		expect(result).toEqual(['this', 'is', 'a', 'test']);
	});

	it('should tokenize with a custom regex and a min', () => {
		const queryParser = {
			type: 'tokenized',
			params: { pattern: '[\\w.]+', min: 3 },
		} as SearchInfo['queryParser'];

		const result = tokenizeQuery('This is a test !', queryParser);
		expect(result).toEqual(['this', 'test']);
	});

	it('should normalize the input', () => {
		const queryParser = {
			type: 'tokenized',
			params: { pattern: '\\w+', min: 1 },
		} as SearchInfo['queryParser'];

		const result = tokenizeQuery('Élève Étudiant!', queryParser);
		expect(result).toEqual(['eleve', 'etudiant']);
	});

	it('should return an empty array for unmatched patterns', () => {
		const queryParser = {
			type: 'tokenized',
			params: { language: 'French', pattern: '[\\d.]+', min: 1 }, // only digits
		} as SearchInfo['queryParser'];

		const result = tokenizeQuery('No numbers here!', queryParser);
		expect(result).toEqual([]);
	});
});

describe('tokenizeIndex', () => {
	it('should respect minimum token length', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('The bus is so slow', fieldInfo);
		expect(result).toEqual(['the', 'bus', 'slow']);
	});

	it('should tokenize and apply synonyms', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('The car is fast', fieldInfo);
		expect(result).toEqual(['the', 'car', 'vehicle', 'automobile', 'fast']);
	});

	it('should normalize the input', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('Élève Étudiant!', fieldInfo);
		expect(result).toEqual(['eleve', 'etudiant']);
	});

	it('should return an empty array for unmatched patterns', () => {
		const fieldInfo = { ...mockSearchInfo.fields[0], rules: ['\\d+'] }; // Only numbers
		const result = tokenizeIndex('No numbers here', fieldInfo);
		expect(result).toEqual([]);
	});
});

describe('tokenizer', () => {
	it('should tokenize using field rules', () => {
		const tokenize = tokenizer(mockSearchInfo);

		const result = tokenize('The car is fast', 'title');
		expect(result).toEqual(['the', 'car', 'vehicle', 'automobile', 'fast']);
	});

	it('should tokenize using query parser when field is not found', () => {
		const tokenize = tokenizer(mockSearchInfo);

		const result = tokenize('This is a test!');
		expect(result).toEqual(['this', 'is', 'test']);
	});

	it('should normalize the input', () => {
		const tokenize = tokenizer(mockSearchInfo);

		const result = tokenize('Élève Étudiant!');
		expect(result).toEqual(['eleve', 'etudiant']);
	});

	it('should handle empty strings', () => {
		const tokenize = tokenizer(mockSearchInfo);

		expect(tokenize('', 'title')).toEqual([]);
		expect(tokenize('')).toEqual([]);
	});
});
