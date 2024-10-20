import {
	Fragment,
	isValidElement,
	memo,
	type PropsWithChildren,
	type ReactNode,
	useRef,
} from 'react';
import { useAutoFocus } from '../hooks/use-auto-focus';
import { hasComponentType } from '../use-lunatic/commons/component';
import { ComponentWrapper } from './shared/ComponentWrapper';
import { library } from './library';
import { ErrorBoundary } from 'react-error-boundary';
import {
	SlotsProvider,
	type LunaticSlotComponents,
	slottableComponent,
} from './shared/HOC/slottableComponent';
import type { LunaticComponentProps } from './type';

type Props<V = unknown> = {
	// List of components to display (coming from getComponents)
	components: LunaticComponentProps[];
	// Should we memoized children
	memo?: boolean;
	// Key that trigger autofocus when it changes (pageTag)
	autoFocusKey?: string;
	// Returns the list of extra props to add to components
	componentProps?: (component: LunaticComponentProps) => V;
	// Forbidden components
	blocklist?: string[];
	// Add additional wrapper around each component
	wrapper?: (
		props: PropsWithChildren<LunaticComponentProps & V & { index: number }>
	) => ReactNode;
	// Customized deep components
	slots?: Partial<LunaticSlotComponents>;
};

const LunaticComponentWrapper = slottableComponent(
	'ComponentWrapper',
	({ children }: PropsWithChildren<LunaticComponentProps>) => {
		return <div className="lunatic lunatic-component">{children}</div>;
	}
);

/**
 * Entry point for orchestrators, this component display the list of fields
 */
export function LunaticComponents<V = unknown>({
	components,
	autoFocusKey,
	componentProps,
	blocklist,
	memo,
	slots,
	wrapper = (args) => <LunaticComponentWrapper {...args} />,
}: Props<V>) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const hasComponents = components.length > 0;
	const WrapperComponent = autoFocusKey ? 'div' : Fragment;

	useAutoFocus(wrapperRef, hasComponents ? autoFocusKey : undefined);

	return (
		<WrapperComponent
			ref={WrapperComponent === Fragment ? undefined : wrapperRef}
		>
			<SlotsProvider slots={slots}>
				{components.map((component, k) => {
					if (hasComponentType(component)) {
						if (blocklist && blocklist.includes(component.componentType)) {
							return (
								<Fragment key={computeId(component, k)}>
									{wrapper({
										children: (
											<div style={{ color: 'red' }}>
												Component "{component.componentType}" is not allowed
												here
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
							propsTransformer: componentProps,
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
			</SlotsProvider>
		</WrapperComponent>
	);
}

function LunaticComponent(props: LunaticComponentProps) {
	// Component is too dynamic to be typed
	const Component = (library as any)[props.componentType!];
	return (
		<ErrorBoundary FallbackComponent={LunaticError}>
			<ComponentWrapper {...(props as any)}>
				<Component {...props} />
			</ComponentWrapper>
		</ErrorBoundary>
	);
}

function LunaticError({ error }: { error: { toString: () => string } }) {
	console.error(error);
	return (
		<p style={{ color: 'red' }}>
			Cannot render this component : {error.toString()}
		</p>
	);
}

const LunaticComponentMemo = memo(LunaticComponent);

function computeId(
	component: unknown,
	fallback: number | string
): number | string {
	if (
		component &&
		typeof component === 'object' &&
		'id' in component &&
		typeof component.id === 'string'
	) {
		return component.id;
	}
	return fallback;
}

export function hasLabel<T>(
	component: T
): component is { label: ReactNode } & T {
	return (
		!!component &&
		typeof component === 'object' &&
		'label' in component &&
		isValidElement(component.label)
	);
}
