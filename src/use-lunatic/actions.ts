import { LunaticData, LunaticState } from './type';

import { LunaticSource } from './type-source';

export enum ActionKind {
	GO_PREVIOUS_PAGE = 'use-lunatic/go-previous',
	GO_NEXT_PAGE = 'use-lunatic/go-next',
	GO_TO_PAGE = 'use-lunatic/go-to-page',
	ON_INIT = 'use-lunatic/on-init',
	HANDLE_CHANGE = 'use-lunatic/handle-change',
	ON_SET_WAITING = 'use-lunatic/on-set-waiting',
}

export type ActionHandleChange = {
	type: ActionKind.HANDLE_CHANGE;
	payload: {
		response: { name: string };
		value: unknown;
		args: {
			loop?: boolean;
			length?: number;
			index?: number;
			linksIterations?: number[];
			symLinks?: { [variableName: string]: Record<string, string> };
			paginatedLoop?: unknown;
			shallowIteration?: unknown;
			lengths?: number[];
		};
	};
};

export type ActionGoToPage = {
	type: ActionKind.GO_TO_PAGE;
	payload: Parameters<LunaticState['goToPage']>[0];
};

export type ActionInit = {
	type: ActionKind.ON_INIT;
	payload: {
		data: LunaticData;
		source: LunaticSource;
		initialPage: string;
		features: LunaticState['features'];
		preferences: LunaticState['preferences'];
		savingType: LunaticState['savingType'];
		shortcut: boolean;
		management: boolean;
		handleChange: LunaticState['handleChange'];
		activeControls: boolean;
		goToPage: (params: ActionGoToPage['payload']) => ActionGoToPage;
		withOverview?: boolean;
	};
};

export type ActionOnSetWaiting = {
	type: ActionKind.ON_SET_WAITING;
	payload: {
		status: boolean;
	};
};

export type Action =
	| {
			type: ActionKind.GO_NEXT_PAGE;
			payload: { block?: unknown };
	  }
	| {
			type: ActionKind.GO_PREVIOUS_PAGE;
			payload: {};
	  }
	| ActionGoToPage
	| ActionInit
	| ActionHandleChange
	| ActionOnSetWaiting;

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
	} as const);

export const goNextPage = actionCreator(ActionKind.GO_NEXT_PAGE);
export const goToPage = actionCreator(ActionKind.GO_TO_PAGE);
export const onInit = actionCreator(ActionKind.ON_INIT);
export const handleChange = (
	response: ActionHandleChange['payload']['response'],
	value: ActionHandleChange['payload']['value'],
	args: ActionHandleChange['payload']['args']
): Action =>
	({
		type: ActionKind.HANDLE_CHANGE,
		payload: { response, value, args },
	} as const);

export const onSetWaiting = (status: boolean): Action =>
	({
		type: ActionKind.ON_SET_WAITING,
		payload: { status },
	} as const);
