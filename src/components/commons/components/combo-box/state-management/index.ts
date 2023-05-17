export const INITIAL_STATE = {
	focused: false,
	expanded: false,
	selectedIndex: undefined as undefined | number,
	search: '',
};

export type ComboBoxState = typeof INITIAL_STATE;

export { reducer } from './reducer';
export * as actions from './actions';
