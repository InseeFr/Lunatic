import { type PropsWithChildren, type ReactNode } from 'react';
import { createCustomizableLunaticField, Errors } from '../../commons';
import Legend from './legend';
import type { LunaticError } from '../../../use-lunatic/type';

type Props = PropsWithChildren<{
	id?: string;
	errors?: Record<string, LunaticError[]>;
	legendText: ReactNode;
}>;

function ComponentSet({ id, errors, legendText, children }: Props) {
	const labelId = `label-${id}`;
	return (
		<fieldset className="lunatic-component-set">
			<Legend id={labelId}>{legendText}</Legend>
			{children}
			<Errors errors={errors} activeId={id} />
		</fieldset>
	);
}

export default createCustomizableLunaticField(ComponentSet, 'ComponentSet');
