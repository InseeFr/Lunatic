/**
 * We should remove this export to avoid `import * as lunatic from "@inseefr/lunatic"` in orchestrators
 *  but this is a breaking change
 */
export * from './components';
export * as components from './components';

export { LunaticComponents } from './components/lunatic-components';
export { default as useLunatic } from './use-lunatic';

export type {
	LunaticComponentDefinition,
	LunaticControl,
	LunaticData,
	LunaticValues,
	LunaticError,
	LunaticExpression,
	LunaticVariable,
	LunaticCollectedValue,
	LunaticStateVariable,
	LunaticState,
} from './use-lunatic/type';

export type { LunaticComponentProps } from './components/type';
export type { LunaticSource } from './use-lunatic/type-source';
