import { compileFromFile } from 'json-schema-to-typescript';
import { writeFileSync } from 'node:fs';

/**
 * Compile source type from JSON Schema
 */
compileFromFile('lunatic-schema.json', {
	additionalProperties: false,
	customName: 'LunaticSource',
	style: {
		singleQuote: true,
		semi: true,
		useTabs: true,
		bracketSpacing: true,
		trailingComma: 'es5',
	},
})
	// Replace interface with types
	.then((ts) =>
		ts.replaceAll(/export interface (\w+) {/gi, 'export type $1 = {')
	)
	.then((ts) => writeFileSync('src/type.source.ts', ts));
