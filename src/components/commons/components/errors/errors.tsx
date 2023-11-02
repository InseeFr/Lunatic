import './errors.scss';
import type { LunaticError } from '../../../../use-lunatic/type';

type Props = {
	errors?: LunaticError[];
};

/**
 * Display a list of error as simple red text
 */
function Errors({ errors }: Props) {
	if (!errors) {
		return null;
	}
	return (
		<div className="lunatic-errors">
			{errors.map(({ id, errorMessage }) => (
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

export default Errors;
