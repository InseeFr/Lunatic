declare module '@inseefr/trevas' {
	export const interpret: (
		expression: string,
		bindings: { [variableName: string]: unknown }
	) => unknown;
}

declare module 'string-tokenizer' {
	class Tokenizer {
		input(s: string): Tokenizer;
		tokens(v: { tokens: RegExp }): Tokenizer;
		resolve(): { tokens: string[] | string };
	}
	export default function (): Tokenizer;
}

declare module '@inseefr/vtl-2.0-antlr-tools' {
	import type { Stream } from 'antlr4';
	export class VtlLexer {
		constructor(stream: Stream);
		getAllTokens(): { start: number; stop: number; type: number }[];
	}
}

declare module 'antlr4' {
	class InputStream {
		constructor(expression: string);
	}
	// eslint-disable-next-line import/no-anonymous-default-export
	export default {
		InputStream: InputStream,
	};
}

declare module '*.png' {
	const url: string;
	export default url;
}
