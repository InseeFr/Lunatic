const { compileFromFile } = require('json-schema-to-typescript');
const { writeFileSync } = require('node:fs');

/**
 * Compile source type from JSON Schema
 */
const buildTypes = async () => {
	const ts = await compileFromFile('lunatic-schema.json', {
		additionalProperties: false,
	});
	const cleanTs = ts
		.replaceAll('/* eslint-disable */', '')
		.replaceAll(/export interface (\w+) {/gi, 'export type $1 = {');
	await writeFileSync('src/type.source.ts', cleanTs);
};

buildTypes();
