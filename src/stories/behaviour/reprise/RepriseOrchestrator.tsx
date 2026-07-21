// @ts-nocheck
import type { LunaticSource } from '../../../type.source';
import {
	Button,
	type LunaticComponentProps,
	LunaticComponents,
	useLunatic,
} from '../../../index';
import { objectMap } from '../../../utils/object';
import React, { useEffect, useState } from 'react';

type Props = {
	source: LunaticSource;
	data: Record<string, unknown>;
};

type VariableChange = {
	type: 'COLLECTED' | 'EDITED';
	value: unknown;
	timestamp: number;
};

const slots = {
	ComponentWrapper: ComponentWrapper,
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: 'short',
	timeStyle: 'medium',
});

/**
 * Classe démontrant une première structure pour sauvegarder les changements
 * Dans les faits, pour que le valeur soit réactive, il faudra utiliser un gestionnaire d'état.
 */
class VariableChangeStore {
	public variables: Record<string, VariableChange[]> = {};

	setCollected(data: Record<string, unknown>) {
		this.variables = objectMap(data, (k, v) => [
			k,
			[
				{
					type: 'COLLECTED',
					value: v,
					timestamp: new Date().getTime(),
				},
			],
		]);
	}

	updateVariable(
		name: string,
		value: unknown,
		mode: VariableChange['type'] = 'EDITED'
	) {
		if (!(name in this.variables)) {
			this.variables[name] = [];
		}
		const changes = this.variables[name];
		const change = {
			type: mode,
			value,
			timestamp: new Date().getTime(),
		};
		// The change has the same type has the last change, update it instead
		if (changes.length > 0 && changes[changes.length - 1].type === mode) {
			changes[changes.length - 1] = change;
		} else {
			changes.push(change);
		}
	}

	getCollectedVariable(name: string, iteration?: number) {
		const changes = this.variables[name];
		if (!changes || changes.length === 0) {
			return null;
		}
		const value = changes[0].value;
		if (iteration !== undefined && Array.isArray(value)) {
			return value[iteration];
		}
		return value;
	}
}

const store = new VariableChangeStore();

export function RepriseOrchestrator({ source, data }: Props) {
	const [_, setState] = useState(0); // Use to force render just for the demo
	useEffect(() => {
		store.setCollected(data);
		setState((v) => v + 1);
	}, []);
	const {
		getComponents,
		variables,
		goNextPage,
		goPreviousPage,
		isFirstPage,
		isLastPage,
	} = useLunatic(source, objectToData(data), {
		onChange: (changes) => {
			setTimeout(() => {
				for (const variable of changes) {
					store.updateVariable(
						variable.name,
						variables.get(variable.name),
						variable.mode
					);
				}
				setState((v) => v + 1);
			}, 0);
		},
	});
	const components = getComponents();
	return (
		<div style={{ display: 'grid', gridTemplateColumns: '1fr 200px' }}>
			<div>
				<LunaticComponents components={components} slots={slots} />
			</div>
			<div>
				<div>
					<Button onClick={goPreviousPage} disabled={isFirstPage}>
						Previous
					</Button>
					<Button onClick={goNextPage} disabled={isLastPage}>
						Next
					</Button>
				</div>

				<h2>Changements</h2>

				{Object.keys(store.variables).map((name) => (
					<details key={name} style={{ marginBottom: '1rem' }}>
						<summary style={{ cursor: 'pointer' }}>{name}</summary>
						<div
							style={{
								display: 'grid',
								gap: '1rem',
								padding: '1rem',
								gridTemplateColumns: '1fr',
							}}
						>
							{store.variables[name].map((change, k) => (
								<div key={k}>
									<div>
										{change.type}
										<br />
										{JSON.stringify(change.value)}
										<br />
										{dateFormatter.format(new Date(change.timestamp))}
									</div>
									<hr style={{ width: '100%' }} />
								</div>
							))}
						</div>
					</details>
				))}
			</div>
		</div>
	);
}

/**
 * Entoure les composants de formulaire pour rajouter les boutons de contrôles
 */
function ComponentWrapper(props: LunaticComponentProps<'Input'>) {
	const updateValue =
		'response' in props
			? (v: unknown, mode: string) => {
					props.handleChanges([
						{
							name: props.response.name,
							value: v,
							mode: mode,
						},
					]);
				}
			: null;

	return (
		<div className="lunatic-component">
			<div style={{ display: 'flex', gap: '1rem' }}>
				<div style={{ width: 60 }}>
					{updateValue && (
						<>
							<button onClick={() => updateValue('nombrut', 'BRUT')}>B</button>
							<button
								onClick={() =>
									updateValue(
										store.getCollectedVariable(
											props.response.name,
											props.iteration
										),
										'COLLECTED'
									)
								}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width={12}
									hanging={12}
								>
									<g fill="none">
										<path d="M24 0v24H0V0zM12.6 23.3h-.2v.5h.2v-.5m.3-.2-.2.1v.5l.2.1v-.6m-.8 0v.6h.2v-.5z" />
										<path
											fill="black"
											d="M7.2 11a7 7 0 0 1 12.3 4.5 1.5 1.5 0 1 0 3 0 10 10 0 0 0-10-10 10 10 0 0 0-7.4 3.3l-.4-2a1.5 1.5 0 1 0-3 .6l1.1 5.9c0 .4.3.7.6 1 .4.2 1 .3 1.4.1l5.7-1a1.5 1.5 0 1 0-.6-3l-2.7.6Z"
										/>
									</g>
								</svg>
							</button>
						</>
					)}
				</div>
				<div>{props.children}</div>
			</div>
		</div>
	);
}

function objectToData(obj: Record<string, unknown>) {
	return {
		COLLECTED: Object.fromEntries(
			Object.entries(obj).map(([name, value]) => [
				name,
				{
					EDITED: null,
					FORCED: null,
					INPUTTED: null,
					PREVIOUS: null,
					COLLECTED: value,
				},
			])
		),
	};
}
