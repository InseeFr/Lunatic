import Orchestrator from '../../utils/orchestrator';
import source from './roundabout.json';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useArticulation } from '../../../hooks/useArticulation';

type Source = Parameters<typeof useArticulation>[0];
type Data = Parameters<typeof useArticulation>[1];

type Props = {
	source: Source;
	data: Data;
};

function StoryComponent({ source, data }: Props) {
	const [page, setPage] = useState(null as null | string);
	const gotoNav = () => setPage(null);
	const { items } = useArticulation(source, data);

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
		<div>
			<h2>Articulation</h2>
			<table style={{ borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						{items[0].cells.map((cell, k) => (
							<th
								style={{ border: 'solid 1px #00000024', padding: '.5rem 1rem' }}
								key={k}
							>
								{cell.label}
							</th>
						))}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, k) => (
						<tr key={k}>
							{item.cells.map((cell, kk) => (
								<td
									key={kk}
									style={{
										border: 'solid 1px #00000024',
										padding: '.5rem 1rem',
									}}
								>
									{cell.value}
								</td>
							))}
							<td
								style={{
									border: 'solid 1px #00000024',
									padding: '.5rem 1rem',
								}}
							>
								<button onClick={() => console.log('ToDo')}>
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
