import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../commons';
import { PropsWithChildren } from 'react';
import { LunaticBaseProps } from '../../type';
import { ConditionFilterType } from '../../../use-lunatic/type-source';

type Props = PropsWithChildren<{
	className?: string;
	conditionFilter?: ConditionFilterType;
}> &
	Pick<LunaticBaseProps, 'executeExpression'>;

function ComponentSetComponentContainer({
	children,
	className,
	executeExpression,
	conditionFilter,
}: Props) {
	if (!executeExpression(conditionFilter)) {
		return;
	}
	return (
		<div className={classnames('lunatic-component-set-component', className)}>
			{children}
		</div>
	);
}

export default createCustomizableLunaticField(
	ComponentSetComponentContainer,
	'ComponentSetComponentContainer'
);
