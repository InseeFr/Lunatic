import {
	Fragment,
	useEffect,
	useRef,
	type PropsWithChildren,
	type ReactNode,
} from 'react';
import * as lunaticComponents from './index';
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components';

type Props<T extends Record<string, unknown>> = {
	// List of components to display (coming from getComponents)
	components: FilledLunaticComponentProps[];
	// Key that trigger autofocus when it changes (pageTag)
	autoFocusKey?: string;
	// Returns the list of extra props to add to components
	componentProps?: (component: FilledLunaticComponentProps) => T;
	// Add additional wrapper around each component
	wrapper?: (
		props: PropsWithChildren<FilledLunaticComponentProps & T>
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
	useEffect(() => {
		if (!autoFocusKey || !hasComponents) {
			return;
		}

		const firstFocusableElement = wrapperRef.current?.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		) as HTMLElement | undefined;
		// The first element can be focusable
		if (firstFocusableElement) {
			return firstFocusableElement.focus();
		}
	}, [autoFocusKey, hasComponents]);

	return (
		<div ref={wrapperRef}>
			{components.map((component, k) => {
				const props = {
					...component,
					...componentProps?.(component),
				};
				return (
					<Fragment key={'id' in component ? component.id : `index-${k}`}>
						{wrapper({
							children: <LunaticComponent {...props} />,
							...props,
						})}
					</Fragment>
				);
			})}
		</div>
	);
}

type ItemProps = FilledLunaticComponentProps;

function LunaticComponent(props: ItemProps) {
	// Component is too dynamic to be typed
	const Component = lunaticComponents[props.componentType] as any;
	return <Component {...props} />;
}
