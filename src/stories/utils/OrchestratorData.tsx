import { useMemo, useState } from 'react';
import type { LunaticSource, LunaticState } from '../../use-lunatic/type';
import { isObject, objectFilter, objectKeys } from '../../utils/object';

type Props = {
	getData: LunaticState['getData'];
	source: LunaticSource;
};

export function OrchestratorData({ getData, source }: Props) {
	const data = useMemo(() => getData(true), [getData]);
	const [search, setSearch] = useState('');
	const [tab, setTab] = useState(0);

	const tabs = [
		{
			label: 'Collected',
			variables: objectFilter(data.COLLECTED ?? {}, (k) =>
				search ? k.toLowerCase().includes(search.toLowerCase()) : true
			),
		},
		{
			label: 'Calculated',
			variables: objectFilter(data.CALCULATED ?? {}, (k) =>
				search ? k.startsWith(search) : true
			),
		},
	];

	const variables = tabs[tab].variables;
	return (
		<div>
			<div className="flex justify-between">
				<div role="tablist" className="tabs tabs-border mb-4">
					{tabs.map((t, k) => (
						<button
							key={k}
							role="tab"
							onClick={() => setTab(k)}
							className={`tab gap-2 ${tab === k ? 'tab-active' : ''}`}
						>
							{t.label}
						</button>
					))}
				</div>
				<input
					type="text"
					className="input"
					placeholder="Rechercher"
					onInput={(e) => setSearch(e.currentTarget.value)}
					value={search}
				/>
			</div>
			<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Variable</th>
							<th>Infos</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(variables!).map(([key, value]) => (
							<tr key={key}>
								<td>{key}</td>
								<td>
									<div className="flex gap-2 flex-wrap">
										{source.resizing &&
										key in source.resizing &&
										'variables' in source.resizing[key] ? (
											<ResizeInfo resizing={source.resizing[key]} />
										) : null}
										{source.cleaning && key in source.cleaning ? (
											<CleaningInfo cleaning={source.cleaning[key]} />
										) : null}
									</div>
								</td>
								<td>
									{JSON.stringify(
										isObject(value) && 'COLLECTED' in value
											? value.COLLECTED
											: value
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

const ResizeInfo = ({
	resizing,
}: {
	resizing: {
		size: string;
		variables: string[];
	};
}) => {
	const [expanded, setExpanded] = useState(false);
	const toggle = () => setExpanded((v) => !v);
	return (
		<div className="space-y-2">
			<button
				className="flex gap-1 btn btn-primary rounded-full badge-sm whitespace-nowrap"
				onClick={toggle}
			>
				{resizing.variables.length} resize(s)
				<svg
					className="size-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
				</svg>
			</button>
			{expanded && (
				<div className="flex flex-wrap gap-2">
					{resizing.variables.map((variable) => (
						<div key={variable} className="kbd">
							{variable}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const CleaningInfo = ({
	cleaning,
}: {
	cleaning: {
		[p: string]:
			| string
			| {
					expression: string;
					shapeFrom?: string;
					isAggregatorUsed: boolean;
			  }[];
	};
}) => {
	const [expanded, setExpanded] = useState(false);
	const toggle = () => setExpanded((v) => !v);
	return (
		<div className="space-y-2">
			<button
				className="flex gap-1 btn btn-secondary rounded-full badge-sm whitespace-nowrap"
				onClick={toggle}
			>
				{Object.keys(cleaning).length} cleaning(s)
				<svg
					className="size-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
				</svg>
			</button>
			{expanded && (
				<div className="flex flex-wrap gap-2">
					{objectKeys(cleaning).map((k) => (
						<div key={k} className="kbd">
							{k}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
