import type { LunaticComponentDefinition } from '../../src';
import type { VTLExpression } from '../../src/type.source.ts';
import type { ReactNode } from 'react';

export type LunaticComponentProps<T extends string> = {
	interpret: (expr: VTLExpression | string | undefined) => ReactNode;
} & LunaticComponentDefinition<T>;
