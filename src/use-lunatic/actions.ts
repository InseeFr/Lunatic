import type { LunaticState } from './type';
import { objectKeys } from '../utils/object';
import type { ItemOf } from '../type.utils';

export enum ActionKind {
	GO_PREVIOUS_PAGE = 'use-lunatic/go-previous',
	GO_NEXT_PAGE = 'use-lunatic/go-next',
	GO_TO_PAGE = 'use-lunatic/go-to-page',
	HANDLE_CHANGES = 'use-lunatic/handle-changes',
}

export type ActionHandleChanges = {
	type: ActionKind.HANDLE_CHANGES;
	payload: {
		responses: {
			name: string;
			value: unknown;
			iteration?: number[];
		}[];
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
	| ActionHandleChanges;

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

export const goPreviousPageAction = () =>
	({
		type: ActionKind.GO_PREVIOUS_PAGE,
		payload: {},
	}) as const;

export const goNextPageAction = actionCreator(ActionKind.GO_NEXT_PAGE);
export const goToPageAction = actionCreator(ActionKind.GO_TO_PAGE);

export const handleChangesAction = (
	responses: ActionHandleChanges['payload']['responses']
): Action => ({
	type: ActionKind.HANDLE_CHANGES,
	payload: {
		responses,
	},
});
