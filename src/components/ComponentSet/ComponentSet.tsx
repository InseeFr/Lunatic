import type { LunaticComponentProps } from '../type';
import { LunaticComponents } from '../LunaticComponents';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import type { PropsWithChildren, ReactNode } from 'react';
import type { LunaticError } from '../../use-lunatic/type';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';

export function ComponentSet({
	id,
	label,
	description,
	response, // Do not propagate the response (it's undefined)
	components,
	...props // Props to propagate to children
}: LunaticComponentProps<'ComponentSet'>) {
	return (
		<ComponentSetWrapper id={id} legendText={label} errors={props.errors}>
			<LunaticComponents
				components={components}
				// Component props take precedence (we don't want to override value for instance)
				componentProps={(c) => ({ ...props, ...c })}
				wrapper={(p) => <ComponentSetItem {...p} />}
			/>
		</ComponentSetWrapper>
	);
}

type ComponentSetWrapperProps = PropsWithChildren<{
	id: string;
	errors?: Record<string, LunaticError[]>;
	legendText: ReactNode;
}>;

const ComponentSetWrapper = customizedComponent<ComponentSetWrapperProps>(
	'ComponentSet',
	(props) => {
		const { id, errors, legendText, children } = props;
		return (
			<fieldset className="lunatic-component-set">
				{legendText && (
					<legend id={id} className="lunatic-legend">
						{legendText}
					</legend>
				)}
				{children}
				<ComponentErrors errors={errors} componentId={id} />
			</fieldset>
		);
	}
);

export const ComponentSetItem = customizedComponent<PropsWithChildren>(
	'ComponentSetItem',
	({ children }) => {
		return <div className="lunatic-component-set-component">{children}</div>;
	}
);
