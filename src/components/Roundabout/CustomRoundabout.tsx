import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import type { ItemOf } from '../../type.utils';
import { Button } from '../shared/Button/Button';
import classnames from 'classnames';
import React from 'react';

type PropsItem = ItemOf<LunaticComponentProps<'Roundabout'>['items']> & {
	onClick: () => void;
	iteration: number;
};

function RoundaboutItem({
	label,
	progress,
	description,
	onClick,
	disabled,
	iteration,
}: PropsItem) {
	return (
		<section className="lunatic-roundabout__item">
			<div>
				{label && (
					<label
						className="lunatic-roundabout__label"
						htmlFor={`action${iteration}`}
					>
						{label}
					</label>
				)}
				{description && (
					<div className="lunatic-roundabout__description">{description}</div>
				)}
			</div>
			{!disabled && (
				<Button
					id={`action${iteration}`}
					className={classnames(
						'lunatic-roundabout__button',
						getButtonClass(progress)
					)}
					onClick={onClick}
				>
					{getButtonLabel(progress)}
				</Button>
			)}
		</section>
	);
}

type Props = Pick<LunaticComponentProps<'Roundabout'>, 'items' | 'label'> & {
	goToIteration: (v: number) => void;
};

export const CustomRoundabout = slottableComponent<Props>(
	'Roundabout',
	({ items, goToIteration, label }) => {
		return (
			<div className="lunatic-roundabout">
				<Label>{label}</Label>
				<div className="lunatic-roundabout__items">
					{items.map((item, k) => (
						<RoundaboutItem
							key={k}
							iteration={k}
							{...item}
							onClick={() => goToIteration(k)}
						/>
					))}
				</div>
			</div>
		);
	}
);

function getButtonLabel(progress: number) {
	if (progress === 1) {
		return 'Complété';
	}
	if (progress === 0) {
		return 'Modifier';
	}
	return 'Commencer';
}

function getButtonClass(progress: number) {
	if (progress === 1) {
		return 'lunatic-roundabout__button-completed';
	}
	if (progress === 0) {
		return 'lunatic-roundabout__button-progress';
	}
	return null;
}
