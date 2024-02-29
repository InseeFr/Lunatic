/**
 * We should remove this export to avoid `import * as lunatic from "@inseefr/lunatic"` in orchestrators
 *  but this is a breaking change
 */
export { library as components } from './components/library';
export { ModalControls } from './components/shared/ModalControls/ModalControls';
export { Button } from './components/shared/Button/Button';

export { LunaticComponents } from './components/LunaticComponents';
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
export type { LunaticCustomizedComponent } from './components/shared/HOC/customizedComponent';
export type { LunaticSource } from './use-lunatic/type-source';
