import queryParserSoft from './query-parser-soft';

describe('query-parser-soft', function () {
	it('empty query', function () {
		const result = queryParserSoft('');
		expect(result.length).toBe(1);
		expect(result).toContain('');
	});
	it('to lower case', function () {
		const result = queryParserSoft('HELLO');
		expect(result.length).toBe(1);
		expect(result).toContain('hello');
	});
	it('trim accent', function () {
		const result = queryParserSoft('ïéèû');
		expect(result.length).toBe(1);
		expect(result).toContain('ieeu');
	});
	it('white spaces', function () {
		const result = queryParserSoft('HELLO WORLD!');
		expect(result.length).toBe(1);
		expect(result).toContain('hello-world!');
	});
});
