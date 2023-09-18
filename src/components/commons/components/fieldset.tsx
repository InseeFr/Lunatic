import { type PropsWithChildren, type ReactNode } from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../create-customizable-field';
import safetyLabel from '../safety-label';
import Description from './description';
import './fieldset.scss';
import type { LunaticBaseProps } from '../../type';

type Props = PropsWithChildren<{
	legend?: ReactNode;
	description?:
		| LunaticBaseProps['description']
		| { label: string; declarationType: string }[];
	className?: string;
}>;

function Fieldset({ children, legend, description, className }: Props) {
	return (
		<fieldset className={classnames(className)}>
			<legend>
				{safetyLabel(legend)}
				<Description value={description} />
			</legend>
			{children}
		</fieldset>
	);
}

export default createCustomizableLunaticField(Fieldset, 'Fieldset');
