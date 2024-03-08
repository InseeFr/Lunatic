import type { LunaticError } from '../../../use-lunatic/type';

type Props =
	| {
			errors?: Record<string, LunaticError[]>;
			componentId: string;
	  }
	| {
			errors?: LunaticError[];
			componentId?: undefined;
	  };

/**
 * Display a list of error as simple red text
 */
export function ComponentErrors({ errors, componentId }: Props) {
	const componentErrors = Array.isArray(errors)
		? errors
		: getComponentErrors(errors, componentId);
	if (!componentErrors) {
		return null;
	}
	return (
		<div className="lunatic-errors">
			{componentErrors.map(({ id, errorMessage }) => (
				<div key={`error-${id}`} className="lunatic-error">
					{errorMessage}
				</div>
			))}
		</div>
	);
}

export function getComponentErrors(
	errors?: Record<string, LunaticError[]>,
	componentId?: string
): LunaticError[] | undefined {
	if (!componentId || !errors) {
		return undefined;
	}
	const activeErrors = Object.entries(errors).find(([k]) =>
		componentId?.trim().endsWith(k)
	);
	if (Array.isArray(activeErrors) && Array.isArray(activeErrors[1])) {
		return activeErrors[1];
	}
	return undefined;
}
