import { type PropsWithChildren, type ReactNode } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';
import { LabelDescription } from '../LabelDescription';
import type { LunaticBaseProps } from '../../type';
import { isElement } from '../../../utils/is-element';

type Props = PropsWithChildren<{
	legend?: ReactNode;
	description?: LunaticBaseProps['description'];
	className?: string;
}>;

function LunaticFieldset({ children, legend, description, className }: Props) {
	return (
		<fieldset className={classnames(className)}>
			<legend>
				{labelToReactNode(legend)}
				<LabelDescription value={description} />
			</legend>
			{children}
		</fieldset>
	);
}

function labelToReactNode(label: unknown): ReactNode {
	if (!label) {
		return '';
	}
	if (
		typeof label === 'string' ||
		typeof label === 'boolean' ||
		typeof label === 'number'
	) {
		return label;
	}
	if (typeof label === 'object') {
		if (isElement(label)) return label;
		if ('value' in label && typeof label.value === 'string') {
			return label.value;
		}
	}

	return ``;
}

export const Fieldset = slottableComponent('Fieldset', LunaticFieldset);
