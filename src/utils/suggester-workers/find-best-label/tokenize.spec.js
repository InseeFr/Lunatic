import tokenize from './tokenize';

describe('tokenize', function () {
	it('simple', function () {
		const results = tokenize({ hello: 'hello world!' });
		const { hello } = results;
		expect(Array.isArray(hello)).toEqual(true);
		expect(hello.length).toEqual(2);
		expect(hello[0]).toEqual('hello');
		expect(hello[1]).toEqual('world');
	});

	it('undefined', function () {
		const results = tokenize({ hello: '' });
		const { hello } = results;
		expect(Array.isArray(hello)).toEqual(true);
		expect(hello.length).toEqual(0);
	});
});
