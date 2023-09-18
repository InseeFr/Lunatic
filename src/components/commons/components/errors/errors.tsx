import './errors.scss';
import type { LunaticError } from '../../../../use-lunatic/type';

type Props = {
	errors?: Record<string, LunaticError[]>;
	activeId?: string;
};

function Errors({ errors, activeId }: Props) {
	if (!errors) {
		return null;
	}
	const activeErrors = getActiveErrors(errors, activeId);
	if (!activeErrors) {
		return null;
	}
	return (
		<div className="lunatic-errors">
			{activeErrors.map(({ id, errorMessage }) => (
				<div key={`error-${id}`} className="lunatic-error">
					{errorMessage}
				</div>
			))}
		</div>
	);
}

function getActiveErrors(
	errors: Record<string, LunaticError[]>,
	activeId: Props['activeId']
) {
	const activeErrors = Object.entries(errors).find(([k]) =>
		activeId?.trim().endsWith(k)
	);
	if (Array.isArray(activeErrors) && Array.isArray(activeErrors[1])) {
		return activeErrors[1];
	}
	return null;
}

export default Errors;
