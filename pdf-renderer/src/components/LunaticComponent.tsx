import type { ComponentDefinition } from '../../../src/type.source.ts';
import { Sequence } from './Sequence.tsx';
import { Question } from './Question.tsx';
import { Input } from './Input.tsx';
import { CheckboxBoolean } from './CheckboxBoolean.tsx';
import { Duration } from './Duration.tsx';
import { Radio } from './Radio.tsx';
import { CheckboxGroup } from './CheckboxGroup.tsx';
import { Table } from './Table.tsx';
import { RosterForLoop } from './RosterForLoop.tsx';
import { Loop } from './Loop.tsx';
import type { Interpreter } from '../utils/vtl.ts';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Text, View } from '@react-pdf/renderer';
import { depth, styles } from '../styles.ts';
import { Empty } from './Empty.tsx';
import type { ReactNode } from 'react';

const componentTypes = {
	Sequence: Sequence,
	Question: Question,
	Textarea: Input,
	Input: Input,
	InputNumber: Input,
	Datepicker: Input,
	Duration: Duration,
	CheckboxBoolean: CheckboxBoolean,
	Radio: Radio,
	CheckboxOne: Radio,
	Dropdown: Radio,
	CheckboxGroup: CheckboxGroup,
	Table: Table,
	Subsequence: Sequence,
	RosterForLoop: RosterForLoop,
	Loop: Loop,
	FilterDescription: Empty,
};

/**
 * Renders a single component
 */
export const LunaticComponent = ({
	component,
	interpret,
}: {
	component: ComponentDefinition;
	interpret: Interpreter;
}) => {
	if (component.componentType === 'Sequence') {
		depth.current = 1;
	}
	if (component.componentType === 'Subsequence') {
		depth.current = 2;
	}
	const visible =
		'conditionFilter' in component
			? interpret(component.conditionFilter)
			: true;

	if (!visible) {
		return null;
	}

	if (!(component.componentType in componentTypes)) {
		return <Text style={styles.error}>{component.componentType}</Text>;
	}
	const Component =
		componentTypes[component.componentType as keyof typeof componentTypes];
	return (
		<View>
			{/* @ts-expect-error Component is too dynamic here*/}
			<Component interpret={interpret} {...component} />
		</View>
	);
};

/**
 * Renders a list of component using grouping them using sequence
 */
export const LunaticComponents = ({
	components,
	interpret,
}: {
	components: ComponentDefinition[];
	interpret: Interpreter;
}) => {
	// We need to group components per sequence.
	const items: ReactNode[] = [];
	const sequenceType = ['Subsequence', 'Sequence'];
	let previousParent = null as ComponentDefinition | null;
	let children: ComponentDefinition[] | null = null;

	for (const component of components) {
		// The component is not a sequence, or is a different type from the current grouping
		if (
			!sequenceType.includes(component.componentType) ||
			(previousParent &&
				previousParent.componentType !== component.componentType)
		) {
			if (children) {
				children.push(component);
			} else {
				items.push(
					<ErrorBoundary key={component.id} fallbackRender={fallbackRenderer}>
						<LunaticComponent
							component={component}
							interpret={interpret}
							key={component.id}
						/>
					</ErrorBoundary>
				);
			}
			continue;
		}

		// We encountered a Sequence or subsequence
		// If we have collected children, create a new component
		if (children && children.length > 0) {
			items.push(
				<Sequence
					interpret={interpret}
					{...previousParent}
					key={previousParent.id}
				>
					<LunaticComponents components={children} interpret={interpret} />
				</Sequence>
			);
		}

		children = [];
		previousParent = component;
	}

	if (children && children.length > 0) {
		items.push(
			<Sequence
				interpret={interpret}
				{...previousParent}
				key={previousParent.id}
			>
				<LunaticComponents components={children} interpret={interpret} />
			</Sequence>
		);
	}

	return <>{items}</>;
};

const fallbackRenderer = ({ error }: FallbackProps) => {
	return (
		<Text style={styles.error}>
			Error rendering {component.componentType} : {error.toString()} #
			{component.id}
		</Text>
	);
};
