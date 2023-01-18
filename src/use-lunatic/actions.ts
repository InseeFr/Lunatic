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

export type Action =
	| {
			type: ActionKind.GO_NEXT_PAGE;
			payload: { block: unknown };
	  }
	| {
			type: ActionKind.GO_PREVIOUS_PAGE;
			payload: undefined;
	  }
	| {
			type: ActionKind.GO_TO_PAGE;
			payload: { page: unknown };
	  }
	| {
			type: ActionKind.ON_INIT;
			payload: {
				data: LunaticData;
				source: LunaticSource;
				initialPage: string;
				features: LunaticState['features'];
				preferences: LunaticState['preferences'];
				savingType: LunaticState['savingType'];
				management: boolean;
				handleChange: LunaticState['handleChange'];
				activeControls: boolean;
			};
	  }
	| {
			type: ActionKind.HANDLE_CHANGE;
			payload: { response: unknown; value: unknown; args: unknown };
	  }
	| {
			type: ActionKind.ON_SET_WAITING;
			payload: {
				status: unknown;
			};
	  };

export type PayloadForAction<T extends Action['type']> = (Action & {
	type: T;
})['payload'];

const actionCreator =
	<T extends ActionKind>(type: T) =>
	(payload: (Action & { type: T })['payload']) => {
		console.log({ payload, type });
		return {
			type,
			payload,
		};
	};

export const goPreviousPage = () => ({ type: ActionKind.GO_PREVIOUS_PAGE });

export const goNextPage = actionCreator(ActionKind.GO_NEXT_PAGE);
export const goToPage = actionCreator(ActionKind.GO_TO_PAGE);
export const onInit = actionCreator(ActionKind.ON_INIT);
export const handleChange = (
	response: unknown,
	value: unknown,
	args: unknown
): Action => ({
	type: ActionKind.HANDLE_CHANGE,
	payload: { response, value, args },
});

export const onSetWaiting = (status: unknown): Action => ({
	type: ActionKind.ON_SET_WAITING,
	payload: { status },
});
