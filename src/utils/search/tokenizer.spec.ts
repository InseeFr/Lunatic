import { describe, it, expect } from 'vitest';
import {
	tokenizer,
	tokenizeQuery,
	tokenizeIndex,
	filterStopWords,
} from './tokenizer';
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

describe('filterStopWords', () => {
	it('should remove only stopwords from the input string', () => {
		const input = 'This is a test.';
		const stopWords = ['is', 'a'];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe('This test.');
	});

	it('should not alter words that are substrings of stopwords', () => {
		const input = 'this is a testing example';
		const stopWords = ['test'];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe('this is a testing example');
	});

	it('should be case-insensitive', () => {
		const input = 'This Is A Test.';
		const stopWords = ['is', 'a'];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe('This Test.');
	});

	it('should return the input string unchanged if stopWords is undefined', () => {
		const input = 'This is a test.';
		const result = filterStopWords(input);
		expect(result).toBe(input);
	});

	it('should return the input string unchanged if stopWords is a empty array', () => {
		const input = 'This is a test.';
		const stopWords: string[] = [];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe(input);
	});

	it('should return an empty string if all words are stopwords', () => {
		const input = 'this is a test';
		const stopWords = ['this', 'is', 'a', 'test'];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe('');
	});

	it('should handle strings with multiple spaces correctly', () => {
		const input = 'This    is  a test.';
		const stopWords = ['is', 'a'];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe('This test.');
	});

	it('should handle empty input string', () => {
		const input = '';
		const stopWords = ['is', 'a'];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe('');
	});

	it('should handle punctuation correctly', () => {
		const input = 'Hello, world! This is a test.';
		const stopWords = ['is', 'a'];
		const result = filterStopWords(input, stopWords);
		expect(result).toBe('Hello, world! This test.');
	});
});

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

	it('should normalize ligatures like œ and æ', () => {
		const queryParser = { type: 'soft' } as SearchInfo['queryParser'];

		const result = tokenizeQuery('œuvre Œuvre æternam Æternam', queryParser);
		expect(result).toEqual(['oeuvre', 'oeuvre', 'aeternam', 'aeternam']);
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
	it('should filter out words shorter than the required minimum length', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('The bus is so slow', fieldInfo);
		expect(result).toEqual(['the', 'bus', 'slow']);
	});

	it('should tokenize and apply synonyms', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('The car is fast', fieldInfo);
		expect(result).toEqual(['the', 'car', 'vehicle', 'automobile', 'fast']);
	});

	it('should tokenize and apply synonyms regardless of case', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('The Car is fast', fieldInfo);
		expect(result).toEqual(['the', 'car', 'vehicle', 'automobile', 'fast']);
	});

	it('should normalize the input', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('Élève Étudiant!', fieldInfo);
		expect(result).toEqual(['eleve', 'etudiant']);
	});

	it('should normalize ligatures like œ and æ', () => {
		const fieldInfo = mockSearchInfo.fields[0];

		const result = tokenizeIndex('œuvre Œuvre æternam Æternam', fieldInfo);
		expect(result).toEqual(['oeuvre', 'oeuvre', 'aeternam', 'aeternam']);
	});

	it('should filter out stopWords', () => {
		const fieldInfo = { ...mockSearchInfo.fields[0], min: 1 };
		const stopWords = ['is', 'the', 'of', 'this', 'a'];

		const result = tokenizeIndex(
			'This is a test of stopWords !',
			fieldInfo,
			stopWords
		);
		expect(result).toEqual(['test', 'stopwords']);
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
