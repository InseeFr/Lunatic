import {
	Fragment,
	isValidElement,
	memo,
	type PropsWithChildren,
	type ReactElement,
	type ReactNode,
	useRef,
} from 'react';
import * as lunaticComponents from './index';
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components';
import { useAutoFocus } from '../hooks/use-auto-focus';
import { hasComponentType } from '../use-lunatic/commons/component';
import { useWhyRender } from '../hooks/use-why-render';

type Props<T extends FilledLunaticComponentProps, V = undefined> = {
	// List of components to display (coming from getComponents)
	components: (
		| FilledLunaticComponentProps
		| ReactElement
		| { label: string; [key: string]: unknown }
	)[];
	// Should we memoized children
	memo?: boolean;
	// Key that trigger autofocus when it changes (pageTag)
	autoFocusKey?: string;
	// Returns the list of extra props to add to components
	componentProps?: (component: FilledLunaticComponentProps) => V;
	// Forbidden components
	blocklist?: string[];
	// Add additional wrapper around each component
	wrapper?: (
		props: PropsWithChildren<
			FilledLunaticComponentProps & T & V & { index: number }
		>
	) => ReactNode;
};

/**
 * Entry point for orchestrators, this component display the list of fields
 */
export function LunaticComponents<
	T extends FilledLunaticComponentProps,
	V = undefined
>({
	components,
	autoFocusKey,
	componentProps,
	blocklist,
	memo,
	wrapper = ({ children }) => (
		<div className="lunatic lunatic-component">{children}</div>
	),
}: Props<T, V>) {
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
							<Fragment key={computeId(component, k)}>
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
						<Fragment key={computeId(component, k)}>
							{wrapper({
								children: memo ? (
									<LunaticComponentMemo {...props} />
								) : (
									<LunaticComponent {...props} />
								),
								index: k,
								...props,
							})}
						</Fragment>
					);
				}

				// In some case (table for instance) we have static component that only have a label (no componentType)
				if (hasLabel(component)) {
					return (
						<Fragment key={k}>
							{wrapper({
								...component,
								children: component.label,
								index: k,
							} as any)}
						</Fragment>
					);
				}

				// Component is a ReactNode
				if (isValidElement(component)) {
					return (
						<Fragment key={k}>
							{wrapper({
								children: component,
								index: k,
							} as any)}
						</Fragment>
					);
				}

				return null;
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

const LunaticComponentMemo = memo(LunaticComponent);

function computeId(
	component: Record<string, unknown>,
	fallback: number | string
): number | string {
	if ('id' in component && typeof component.id === 'string') {
		return component.id;
	}
	return fallback;
}

export function hasLabel(
	component: unknown
): component is { label: ReactNode } & FilledLunaticComponentProps {
	return (
		!!component &&
		typeof component === 'object' &&
		'label' in component &&
		isValidElement(component.label)
	);
}
