import { LunaticComponentDefinition } from '../use-lunatic/type';
import { LunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components';

export type LunaticProps<
	T extends LunaticComponentDefinition['componentType']
> = {
	id: string;
	componentType: T;
} & LunaticComponentProps<T>;
