import {
	FunctionComponent,
	PropsWithChildren,
	createContext,
	useContext,
} from 'react';

const LunaticContext = createContext({
	missingStrategy: () => {},
	management: false,
	missing: false,
	shortcut: false,
	custom: {} as Record<string, FunctionComponent<unknown>>,
});
/** Provide `missing` `missingStrategy` and `shortcut` to Missing component
 *  to manage non-response buttons and shortcut */
export const useLunaticMissing = () => {
	const { missing, missingStrategy, shortcut } = useContext(LunaticContext);
	return { missing, missingStrategy, shortcut };
};

/** Return custom element list to override native components */
export const useLunaticCustom = () => {
	return useContext(LunaticContext).custom;
};

/** Provide `management` to display data steps [COLLECTED,EDITED,FORCED] */
export const useLunaticManagement = () => {
	return useContext(LunaticContext).management;
};

export function createLunaticProvider({
	custom,
	management,
	missing,
	missingStrategy,
	shortcut,
}: {
	custom: Record<string, FunctionComponent<unknown>>;
	management: boolean;
	missing: boolean;
	missingStrategy: () => void;
	shortcut: boolean;
}): FunctionComponent<PropsWithChildren> {
	const value = { custom, management, missing, missingStrategy, shortcut };

	return function Provider({ children }: PropsWithChildren) {
		return (
			<LunaticContext.Provider value={value}>
				{children}
			</LunaticContext.Provider>
		);
	};
}
