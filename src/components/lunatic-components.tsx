import {
	Fragment,
	useRef,
	type PropsWithChildren,
	type ReactElement,
	type ReactNode,
} from 'react';
import { useAutoFocus } from '../hooks/use-auto-focus';
import { hasComponentType, hasLabel } from '../use-lunatic/commons/component';
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components';
import * as lunaticComponents from './index';

type Props<T extends Record<string, unknown>> = {
	// List of components to display (coming from getComponents)
	components: (
		| (FilledLunaticComponentProps & { colspan?: number; rowspan?: number })
		| { label: ReactElement; colspan?: number; rowspan?: number }
	)[];
	// Key that trigger autofocus when it changes (pageTag)
	autoFocusKey?: string;
	// Returns the list of extra props to add to components
	componentProps?: (
		component: FilledLunaticComponentProps & {
			colspan?: number;
			rowspan?: number;
		}
	) => T;
	// Add additional wrapper around each component
	wrapper?: (
		props: PropsWithChildren<
			FilledLunaticComponentProps &
				T & { index: number } & { colspan?: number; rowspan?: number }
		>
	) => ReactNode;
};

/**
 * Entry point for orchestrators, this component display the list of fields
 */
export function LunaticComponents<T extends Record<string, unknown>>({
	components,
	autoFocusKey,
	componentProps,
	wrapper = ({ children }) => (
		<div className="lunatic lunatic-component">{children}</div>
	),
}: Props<T>) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const hasComponents = components.length > 0;
	const WrapperComponent = autoFocusKey ? 'div' : Fragment;

	useAutoFocus(wrapperRef, hasComponents ? autoFocusKey : undefined);

	return (
		<WrapperComponent
			ref={WrapperComponent === Fragment ? undefined : wrapperRef}
		>
			{components.map((component, k) => {
				if (hasComponentType(component)) {
					const props = {
						...component,
						...componentProps?.(component),
					};
					return (
						<Fragment key={'id' in component ? component.id : `index-${k}`}>
							{wrapper({
								children: <LunaticComponent {...props} />,
								index: k,
								...props,
							})}
						</Fragment>
					);
				}

				if (hasLabel(component)) {
					const { label, ...props } = component;
					return (
						<Fragment key={`index-${k}`}>
							{wrapper({
								children: label,
								index: k,
								...props,
							} as any)}
						</Fragment>
					);
				}
				// In some case (table for instance) we have static component that only have a label (no componentType)
				return (
					<Fragment key={`index-${k}`}>
						{wrapper({
							children: component,
							index: k,
						} as any)}
					</Fragment>
				);
			})}
		</WrapperComponent>
	);
}

type ItemProps = FilledLunaticComponentProps;

function LunaticComponent(props: ItemProps) {
	// Component is too dynamic to be typed
	const Component = lunaticComponents[props.componentType] as any;
	return <Component {...props} />;
}
