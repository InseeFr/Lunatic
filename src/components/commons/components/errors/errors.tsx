import './errors.scss';
import { LunaticError } from '../../../../use-lunatic/type';

type Props = {
	errors?: Record<string, LunaticError[]>;
	activeId?: string;
};

function Errors({ errors, activeId }: Props) {
	const activeErrors = getActiveError(errors, activeId);
	if (Array.isArray(activeErrors) && Array.isArray(activeErrors[1])) {
		const content = activeErrors[1].map(({ id, errorMessage }) => {
			return (
				<div key={`error-${id}`} className="lunatic-error">
					{errorMessage}
				</div>
			);
		});
		return <div className="lunatic-errors">{content}</div>;
	}
	return null;
}

function getActiveError(
	errors?: Record<string, LunaticError[]>,
	activeId?: string
): LunaticError[] {
	if (!errors || !activeId) {
		return [];
	}
	const error = Object.entries(errors).find(([k]) =>
		activeId.trim().endsWith(k)
	)?.[1];
	if (!Array.isArray(error)) {
		return [];
	}
	return error;
}

export default Errors;
