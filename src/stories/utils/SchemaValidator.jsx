import Ajv from 'ajv/dist/2020.js';
import { useMemo } from 'react';
import LunaticSchema from '../../../lunatic-schema.json';

export function SchemaValidator({ source }) {
	const errors = useMemo(() => {
		const ajv = new Ajv({
			removeAdditional: true,
			strict: false,
			allErrors: true,
			discriminator: true,
		});
		const validator = ajv.compile(LunaticSchema);
		const isSourceValid = validator(structuredClone(source)); // ajv mutate the object, send a clone
		if (!isSourceValid) {
			console.log(validator.errors, source);
			return validator.errors;
		}
		return null;
	}, [source]);

	if (!errors) {
		return null;
	}

	return (
		<div className="json-errors">
			<p>
				<strong>{errors.length}</strong> erreurs
			</p>
			<ul>
				{errors.map((err, k) => (
					<li key={k}>
						<strong>{err.instancePath}</strong> : {err.message}{' '}
						<small>({err.schemaPath})</small>
					</li>
				))}
			</ul>
		</div>
	);
}
