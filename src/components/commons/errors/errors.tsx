import './errors.scss';

type Props = {
	errors: Record<string, { id: string; errorMessage: string }[]>;
	activeId?: string;
};

export function Errors({ errors, activeId }: Props) {
	if (!errors) {
		return null;
	}
	const activeErrors = Object.entries(errors).find(
		([k]) => activeId && activeId.trim().endsWith(k)
	);
	if (!Array.isArray(activeErrors) || !Array.isArray(activeErrors[1])) {
		return null;
	}

	return (
		<div className="lunatic-errors">
			{activeErrors[1].map((error) => {
				return (
					<div key={`error-${error.id}`} className="lunatic-error">
						{error.errorMessage}
					</div>
				);
			})}
		</div>
	);
}
