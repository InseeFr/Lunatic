import source from './roundabout.json';
import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { getArticulation } from '../../../utils/getArticulation';
import { Orchestrator } from '../../utils/Orchestrator';

type Source = Parameters<typeof getArticulation>[0];
type Data = Parameters<typeof getArticulation>[1];

type Props = {
	source: Source;
	data: Data;
};

function StoryComponent({ source, data }: Props) {
	const [page, setPage] = useState(null as null | string);
	const gotoNav = () => setPage(null);
	const { items } = useMemo(
		() => getArticulation(source, data),
		[source, data]
	);

	if (page) {
		return (
			<div>
				{page}
				<button onClick={gotoNav}>&lt; Revenir à l'articulation</button>
				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
				{/*/ @ts-ignore */}
				<Orchestrator source={source} data={data} initialPage={page} />
			</div>
		);
	}

	const progressLabel = (n: number) => {
		if (n === -1) {
			return 'Commencer';
		}
		if (n === 0) {
			return 'Continuer';
		}
		return 'Complété';
	};

	return (
		<div className="space-y-4">
			<h2 className="font-bold text-2xl">Articulation</h2>
			<table className="table">
				<thead>
					<tr>
						{items[0].cells.map((cell, k) => (
							<th key={k}>{cell.label}</th>
						))}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, k) => (
						<tr key={k}>
							{item.cells.map((cell, kk) => (
								<td key={kk}>{cell.value}</td>
							))}
							<td>
								<button onClick={() => console.log('ToDo')} className="btn">
									{progressLabel(item.progress)}
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const meta: Meta<typeof StoryComponent> = {
	title: 'Behaviour/Articulation',
	component: StoryComponent,
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Basic: Story = {
	args: {
		source: source as Source,
		data: {},
	},
};
