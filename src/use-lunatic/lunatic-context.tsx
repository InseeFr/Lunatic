import { createContext, FunctionComponent, PropsWithChildren } from 'react';

export const LunaticContext = createContext({
	custom: {} as Record<string, FunctionComponent<unknown>>,
});

export function createLunaticProvider(
	custom: Record<string, FunctionComponent<unknown>> = {}
): FunctionComponent<PropsWithChildren> {
	return function Provider({ children }: PropsWithChildren) {
		return (
			<LunaticContext.Provider value={{ custom }}>
				{children}
			</LunaticContext.Provider>
		);
	};
}
