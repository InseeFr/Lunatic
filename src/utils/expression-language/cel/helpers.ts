import { Environment } from '@marcbachmann/cel-js';

// ---------- Helpers ----------

/** Normalise les nombres pour comparer 1 == 1.0 == 1u (bigint vs number) */
const norm = (v: unknown): unknown => (typeof v === 'bigint' ? Number(v) : v);

/** Égalité CEL simplifiée (numérique hétérogène + listes/maps récursives) */
function celEquals(a: unknown, b: unknown): boolean {
	const x = norm(a);
	const y = norm(b);
	if (Array.isArray(x) && Array.isArray(y)) {
		return x.length === y.length && x.every((v, i) => celEquals(v, y[i]));
	}
	return x === y;
}

const containsCel = (list: unknown[], item: unknown) =>
	list.some((e) => celEquals(e, item));

// ---------- Fonctions ----------

const distinct = (list: unknown[]) => {
	const out: unknown[] = [];
	for (const item of list) if (!containsCel(out, item)) out.push(item);
	return out;
};

const reverse = (list: unknown[]) => [...list].reverse();

const slice = (list: unknown[], start: bigint, end: bigint) => {
	const s = Number(start);
	const e = Number(end);
	if (s < 0 || e < 0) throw new Error(`slice: negative index (${s}, ${e})`);
	if (s > e) throw new Error(`slice: start (${s}) > end (${e})`);
	if (e > list.length)
		throw new Error(`slice: index ${e} out of range (size ${list.length})`);
	return list.slice(s, e);
};

const flattenDepth = (list: unknown[], depth: number): unknown[] => {
	if (depth < 0) throw new Error('flatten: depth must not be negative');
	const out: unknown[] = [];
	for (const item of list) {
		if (Array.isArray(item) && depth > 0)
			out.push(...flattenDepth(item, depth - 1));
		else out.push(item);
	}
	return out;
};
// Spec cel-go : flatten() sans argument aplatit d'un seul niveau
// (cf. [1,[2,[3,4]]].flatten() -> [1,2,[3,4]])
const flatten = (list: unknown[]) => flattenDepth(list, 1);
const flattenN = (list: unknown[], depth: bigint) =>
	flattenDepth(list, Number(depth));

const sort = (list: unknown[]) => {
	if (list.length === 0) return [];
	const t = typeof list[0];
	const sameType = list.every((v) => typeof v === t);
	if (!sameType) throw new Error('sort: elements must have the same type');
	if (list.some((v) => Array.isArray(v) || v instanceof Map)) {
		throw new Error('sort: elements are not comparable');
	}
	return [...list].sort((a: any, b: any) => {
		return a < b ? -1 : a > b ? 1 : 0;
	});
};

const first = (list: unknown[]) => list[0] ?? null;
const last = (list: unknown[]) => list.at(-1) ?? null;

type CelNumber = number | bigint;

const isCelNumber = (value: unknown): value is CelNumber =>
	typeof value === 'number' || typeof value === 'bigint';

/** Somme d'une liste de nombres (int/bigint, double/number). */
const sumList = (list: unknown[]): number => {
	if (list.length === 0) return 0;
	const numbers = assertNumericList(list, 'sum');
	// Sinon : somme en double (les bigint sont convertis)
	return numbers.reduce<number>((acc, item) => acc + Number(item), 0);
};

const assertNumericList = (list: unknown[], fnName: string): CelNumber[] => {
	for (const item of list) {
		if (!isCelNumber(item)) {
			throw new Error(
				`${fnName}() only supports numeric lists, received: ${typeof item}`
			);
		}
	}
	return list as CelNumber[];
};

const minList = (list: unknown[]): number | null => {
	if (list.length === 0) return null;
	const numbers = assertNumericList(list, 'min');
	return Math.min(...numbers.map(Number));
};

const maxList = (list: unknown[]): number | null => {
	if (list.length === 0) return null;
	const numbers = assertNumericList(list, 'max');
	return Math.max(...numbers.map(Number));
};

// ---------- Enregistrement ----------

export function registerListsLibrary(env: Environment): Environment {
	return (
		env
			.registerFunction('list.distinct(): list', distinct)
			.registerFunction('list.flatten(): list', flatten)
			.registerFunction('list.flatten(int): list', flattenN)
			.registerFunction('list.reverse(): list', reverse)
			.registerFunction('list.slice(int, int): list', slice)
			.registerFunction('list.sort(): list', sort)
			.registerFunction('list.first(): dyn', first)
			.registerFunction('list.last(): dyn', last)
			// aggregation sum, min & max
			.registerFunction('list.sum(): dyn', sumList)
			.registerFunction('list.min(): dyn', minList)
			.registerFunction('list.max(): dyn', maxList)
			// aggregation sum, min & max
			.registerFunction('sum(list): dyn', sumList)
			.registerFunction('min(list): dyn', minList)
			.registerFunction('max(list): dyn', maxList)
	);
}

export function registerDateLibrary(env: Environment): Environment {
	const getNowUTC = (): string => new Date().toISOString();
	return env.registerFunction('now(): string', getNowUTC);
}
