import type { ErrorObject } from 'ajv';

type Props = {
	errors: ErrorObject<string, Record<string, any>, unknown>[];
};

export function SchemaValidator({ errors }: Readonly<Props>) {
	if (!errors) {
		return null;
	}

	return (
		<div className="alert alert-error alert-outline text-xs">
			<div>
				<h4 className="mb-2">
					<strong>{errors.length}</strong> erreurs
				</h4>
				<ul>
					{errors.map((err, k) => (
						<li key={k}>
							<strong>{err.instancePath}</strong> : {err.message}{' '}
							<small>({err.schemaPath})</small>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
