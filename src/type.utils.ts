export type Overwrite<T, U> = Omit<T, keyof U> & U;

type Defined<T> = T extends undefined | infer V ? V : T;

export type ItemOf<ArrayType> = Defined<ArrayType> extends (infer ElementType)[]
	? ElementType
	: never;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
