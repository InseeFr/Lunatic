const { compileFromFile } = require('json-schema-to-typescript');
const { writeFileSync } = require('node:fs');

/**
 * Compile source type from JSON Schema
 */
compileFromFile('lunatic-schema.json', {
	additionalProperties: false,
})
	// Replace interface with types
	.then((ts) =>
		ts.replaceAll(/export interface (\w+) {/gi, 'export type $1 = {')
	)
	.then((ts) => writeFileSync('src/type.source.ts', ts));
