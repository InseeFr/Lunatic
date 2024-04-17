import type { LunaticState } from './type';

export enum ActionKind {
	GO_PREVIOUS_PAGE = 'use-lunatic/go-previous',
	GO_NEXT_PAGE = 'use-lunatic/go-next',
	GO_TO_PAGE = 'use-lunatic/go-to-page',
	HANDLE_CHANGE = 'use-lunatic/handle-change',
}

export type ActionHandleChange = {
	type: ActionKind.HANDLE_CHANGE;
	payload: {
		name: string;
		value: unknown;
		iteration?: number[];
	};
};

export type ActionGoToPage = {
	type: ActionKind.GO_TO_PAGE;
	payload: Parameters<LunaticState['goToPage']>[0];
};

export type ActionGoNextPage = {
	type: ActionKind.GO_NEXT_PAGE;
	payload: {};
};

export type ActionGoPreviousPage = {
	type: ActionKind.GO_PREVIOUS_PAGE;
	payload: {};
};

export type Action =
	| ActionGoNextPage
	| ActionGoPreviousPage
	| ActionGoToPage
	| ActionHandleChange;

export type PayloadForAction<T extends Action['type']> = (Action & {
	type: T;
})['payload'];

const actionCreator =
	<T extends ActionKind>(type: T) =>
	(payload: (Action & { type: T })['payload']) => {
		return {
			type,
			payload,
		} as Action & { type: T };
	};

export const goPreviousPage = () =>
	({
		type: ActionKind.GO_PREVIOUS_PAGE,
		payload: {},
	}) as const;

export const goNextPage = actionCreator(ActionKind.GO_NEXT_PAGE);
export const goToPage = actionCreator(ActionKind.GO_TO_PAGE);
export const handleChange = (
	name: ActionHandleChange['payload']['name'],
	value: ActionHandleChange['payload']['value'],
	iteration: ActionHandleChange['payload']['iteration']
): Action =>
	({
		type: ActionKind.HANDLE_CHANGE,
		payload: { name, value, iteration },
	}) as const;
