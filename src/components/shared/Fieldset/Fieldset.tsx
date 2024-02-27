import { type PropsWithChildren, type ReactNode } from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../HOC/customizedComponent';
import safetyLabel from '../../commons/safety-label';
import { LabelDescription } from '../LabelDescription';
import './Fieldset.scss';
import type { LunaticBaseProps } from '../../type';

type Props = PropsWithChildren<{
	legend?: ReactNode;
	description?: LunaticBaseProps['description'];
	className?: string;
}>;

function LunaticFieldset({ children, legend, description, className }: Props) {
	return (
		<fieldset className={classnames(className)}>
			<legend>
				{safetyLabel(legend)}
				<LabelDescription value={description} />
			</legend>
			{children}
		</fieldset>
	);
}

export const Fieldset = customizedComponent('Fieldset', LunaticFieldset);
