import { ReactNode } from 'react';

export function hasResponse(
	component: unknown
): component is { response: { name?: string } } {
	return (
		!!component && typeof component === 'object' && 'response' in component
	);
}

export function hasResponses(component: unknown): component is {
	responses?: Array<{
		label: ReactNode;
		description?: ReactNode;
		response: { name: string };
	}>;
} {
	return (
		!!component && typeof component === 'object' && 'responses' in component
	);
}
