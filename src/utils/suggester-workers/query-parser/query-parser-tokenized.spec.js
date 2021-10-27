import parse from './query-parser-tokenized';
describe('query-parser-tokenized', function () {
	it('tokenized', function () {
		const result = parse('bonjour monde!');
		expect(result.length).toBe(2);
		expect(result).toContain('bonjour');
		expect(result).toContain('mond');
	});

	it('remove double', function () {
		const result = parse('industrielle industriel');
		expect(result.length).toBe(1);
		expect(result).toContain('industriel');
	});

	it('language', function () {
		const result = parse('unlimited expression', {
			language: 'French',
		});
		expect(result.length).toBe(2);
		expect(result).toContain('unlimited');
		expect(result).toContain('express');
	});

	it('no stemmer', function () {
		const result = parse('habi', {
			stemmer: false,
		});
		expect(result.length).toBe(1);
		expect(result).toContain('habi');
	});
});
