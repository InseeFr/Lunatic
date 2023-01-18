declare module '@inseefr/trevas' {
	export function interpret(
		expression: string,
		bindings: { [variableName: string]: unknown }
	): unknown {}
}

declare module '@inseefr/vtl-2.0-antlr-tools' {
	import type { Stream } from 'antlr4';
	export class VtlLexer {
		constructor(stream: Stream);
		getAllTokens(): { start: number; stop: number; type: number }[];
	}
}

declare module 'antlr4' {
	type Stream = {};
	export default class antlr4 {
		constructor();

		InputStream(v: string): InputStream;
	}
}
