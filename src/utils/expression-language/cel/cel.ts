import { ASTNode, Environment } from '@marcbachmann/cel-js';
import { registerDateLibrary, registerListsLibrary } from './helpers';

/** init CEL environnement */
const celEnv = new Environment({
	unlistedVariablesAreDyn: true,
	homogeneousAggregateLiterals: false,
	enableOptionalTypes: true,
});
// first

registerListsLibrary(celEnv);
registerDateLibrary(celEnv);

export function evaluateCEL<T>(
	expression: string,
	bindings: Record<string, unknown>
): T {
	const result = celEnv.evaluate(expression, bindings);
	return normalizeCELValue(result) as T;
}

/**
 * Convertit récursivement les bigint en number
 * (CEL retourne des bigint pour les entiers, ce qui pose problème avec JSON, React, etc.)
 */
function normalizeCELValue(value: unknown): unknown {
	if (typeof value === 'bigint') {
		// Évite la perte de précision silencieuse
		if (
			value > BigInt(Number.MAX_SAFE_INTEGER) ||
			value < BigInt(Number.MIN_SAFE_INTEGER)
		) {
			console.warn(
				`[CEL] Perte de précision lors de la conversion de ${value} en number`
			);
		}
		return Number(value);
	}

	if (Array.isArray(value)) {
		return value.map(normalizeCELValue);
	}

	if (value instanceof Map) {
		return new Map(
			Array.from(value, ([k, v]) => [
				normalizeCELValue(k),
				normalizeCELValue(v),
			])
		);
	}

	if (value !== null && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([k, v]) => [k, normalizeCELValue(v)])
		);
	}

	return value;
}

/**
 * CEL comprehension macros (spec section 1: "Core macros" -> https://cel.dev/reference/api-reference).
 * Shape: receiver.macro(iterVar, ...body)
 * The first argument declares a bound variable, visible in the following arguments.
 * `has` is not part of this set: it does not bind any variable.
 */
export const CEL_COMPREHENSION_MACROS: ReadonlySet<string> = new Set([
	'all',
	'exists',
	'exists_one',
	'filter',
	'map',
]);

export interface ExtractOptions {
	/** Macros that declare a bound variable as their first argument. */
	macros?: ReadonlySet<string>;
}

/** Immutable linked scope: O(1) creation, lookup is O(nesting depth). */
interface Scope {
	readonly name: string;
	readonly parent: Scope | null;
}

const isBound = (scope: Scope | null, name: string): boolean => {
	for (let s = scope; s !== null; s = s.parent) {
		if (s.name === name) return true;
	}
	return false;
};

interface Collector {
	readonly found: Set<string>; // insertion order = order of first appearance
	readonly macros: ReadonlySet<string>;
}

function visitList(
	nodes: readonly ASTNode[],
	scope: Scope | null,
	ctx: Collector,
	start = 0
): void {
	for (let i = start; i < nodes.length; i++) visit(nodes[i], scope, ctx);
}

function visit(node: ASTNode, scope: Scope | null, ctx: Collector): void {
	switch (node.op) {
		case 'value':
			return;

		case 'id':
			if (!isBound(scope, node.args)) ctx.found.add(node.args);
			return;

		// args = [target, fieldName]: only the target is a node
		case '.':
		case '.?':
			visit(node.args[0], scope, ctx);
			return;

		// args = [functionName, args[]]
		case 'call':
			visitList(node.args[1], scope, ctx);
			return;

		// args = [methodName, receiver, callArgs[]]
		case 'rcall': {
			const [method, receiver, callArgs] = node.args;
			visit(receiver, scope, ctx); // receiver lives in the outer scope

			const iterVar = callArgs[0];
			if (ctx.macros.has(method) && iterVar?.op === 'id') {
				// callArgs[0] declares the variable; the rest is the macro body
				const inner: Scope = { name: iterVar.args, parent: scope };
				visitList(callArgs, inner, ctx, 1);
			} else {
				visitList(callArgs, scope, ctx);
			}
			return;
		}

		// map literal: [key, value][]
		case 'map':
			for (const [key, value] of node.args) {
				visit(key, scope, ctx);
				visit(value, scope, ctx);
			}
			return;

		// unary operators: args = ASTNode
		case '!_':
		case '-_':
			visit(node.args, scope, ctx);
			return;

		// list, ternary and binary operators: args = ASTNode[]
		default:
			visitList(node.args, scope, ctx);
	}
}

function extractVariables(
	ast: ASTNode,
	{ macros = CEL_COMPREHENSION_MACROS }: ExtractOptions = {}
): string[] {
	const ctx: Collector = { found: new Set(), macros };
	visit(ast, null, ctx);
	return [...ctx.found];
}

export function getExpressionVariables(
	expression: string,
	options?: ExtractOptions
): string[] {
	return extractVariables(celEnv.parse(expression).ast, options);
}
