import type { ComboBoxOptionType } from '../combo-box.type';

export enum ComboActionKind {
	ON_CHANGE = 'combo-box/on-change',
	ON_SELECT = 'combo-box/on-select',
	ON_KEYDOWN = 'combo-box/on-keydown',
	ON_DELETE = 'combo-box/on-delete',
	ON_FOCUS = 'combo-box/on-focus',
	ON_BLUR = 'combo-box/on-blur',
	ON_INIT = 'combo-box/on-init',
}

export const onChange = (search: string | null) =>
	({
		type: ComboActionKind.ON_CHANGE,
		payload: { search },
	} as const);

export const onSelect = (selectedIndex: number) =>
	({
		type: ComboActionKind.ON_SELECT,
		payload: { selectedIndex },
	} as const);

export const onKeydown = (key: string, nbOptions: number) =>
	({
		type: ComboActionKind.ON_KEYDOWN,
		payload: { key, nbOptions },
	} as const);

export const onDelete = () => ({ type: ComboActionKind.ON_DELETE } as const);

export const onFocus = () => ({ type: ComboActionKind.ON_FOCUS } as const);

export const onBlur = () => ({ type: ComboActionKind.ON_BLUR } as const);

export const onInit = ({
	...payload
}: ComboAction<ComboActionKind.ON_INIT>['payload']) =>
	({
		type: ComboActionKind.ON_INIT,
		payload: { ...payload },
	} as const);

export type ComboAction<T extends ComboActionKind = ComboActionKind> = (
	| { type: ComboActionKind.ON_CHANGE; payload: { search: string | null } }
	| { type: ComboActionKind.ON_SELECT; payload: { selectedIndex: number } }
	| {
			type: ComboActionKind.ON_KEYDOWN;
			payload: { nbOptions: number; key: string };
	  }
	| { type: ComboActionKind.ON_DELETE }
	| { type: ComboActionKind.ON_FOCUS }
	| { type: ComboActionKind.ON_BLUR }
	| {
			type: ComboActionKind.ON_INIT;
			payload: {
				options: ComboBoxOptionType[];
				value: string | null;
				getOptionValue: (o: ComboBoxOptionType) => string;
			};
	  }
) & { type: T };
