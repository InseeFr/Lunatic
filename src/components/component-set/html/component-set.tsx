import { type PropsWithChildren, type ReactNode } from 'react';
import { createCustomizableLunaticField, Errors } from '../../commons';
import type { LunaticError } from '../../../use-lunatic/type';
import { ComponentSetLegend } from './component-set-legend';
import { getComponentErrors } from '../../commons/components/errors/errors';

type Props = PropsWithChildren<{
	id?: string;
	errors?: Record<string, LunaticError[]>;
	legendText: ReactNode;
}>;

export function ComponentSetBase({ id, errors, legendText, children }: Props) {
	const labelId = `label-${id}`;
	return (
		<fieldset className="lunatic-component-set">
			<ComponentSetLegend id={labelId}>{legendText}</ComponentSetLegend>
			{children}
			<Errors errors={getComponentErrors(errors, id)} />
		</fieldset>
	);
}

export const ComponentSet = createCustomizableLunaticField(
	ComponentSetBase,
	'ComponentSet'
);
