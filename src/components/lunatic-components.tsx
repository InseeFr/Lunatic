import {
	Fragment,
	type PropsWithChildren,
	type ReactElement,
	type ReactNode,
	useRef,
} from 'react';
import * as lunaticComponents from './index';
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components';
import { useAutoFocus } from '../hooks/use-auto-focus';
import { hasComponentType } from '../use-lunatic/commons/component';

type Props<T extends Record<string, unknown>> = {
	// List of components to display (coming from getComponents)
	components: (FilledLunaticComponentProps | ReactElement)[];
	// Key that trigger autofocus when it changes (pageTag)
	autoFocusKey?: string;
	// Returns the list of extra props to add to components
	componentProps?: (component: FilledLunaticComponentProps) => T;
	// Forbidden components
	blocklist?: string[];
	// Add additional wrapper around each component
	wrapper?: (
		props: PropsWithChildren<
			FilledLunaticComponentProps & T & { index: number }
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
	blocklist,
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
					if (blocklist && blocklist.includes(component.componentType)) {
						return (
							<Fragment key={'id' in component ? component.id : `index-${k}`}>
								{wrapper({
									children: (
										<div style={{ color: 'red' }}>
											Component "{component.componentType}" is not allowed here
										</div>
									),
									index: k,
									...component,
								})}
							</Fragment>
						);
					}
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
