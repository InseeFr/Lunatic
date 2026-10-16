import classNames from 'classnames';
import {
	Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../../utils/Orchestrator';
import D from '../../../i18n';

import { ComboboxOptionType } from '../../../components/shared/Combobox/ComboboxType';

import { Meta } from '@storybook/react';
import {
	type ComponentProps,
	type FormEventHandler,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { LunaticSource } from '../../../type.source';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

type Props = {
	option: ComboboxOptionType;
	shouldDisplayOptionId?: boolean;
	selected?: boolean;
};
const CustomComboboxOption = ({
	option,
	shouldDisplayOptionId = true,
	selected,
}: Props) => {
	const { id, value, label, score, melautoScore } = option;

	const scoreValues = (
		<span>{` [ Score: ${score} | MelautoScore: ${melautoScore} ] `}</span>
	);

	if (value === 'OTHER') {
		return (
			<div className={classNames('lunatic-combo-box-option', { selected })}>
				<span className="label">
					{`${D.SUGGESTER_NO_RESULT} : ${D.SUGGESTER_ARBITRARY} "${label}"`}
				</span>
			</div>
		);
	}
	if (label) {
		return (
			<div className={classNames('lunatic-combo-box-option', { selected })}>
				{shouldDisplayOptionId && (
					<>
						<span className="id">{id || value}</span>
						<span> - </span>
					</>
				)}
				<span className="label">{label}</span>
				{scoreValues}
			</div>
		);
	}
	return (
		<div className={classNames('lunatic-combo-box-option', { selected })}>
			<span className="id">{id || value}</span>
			{scoreValues}
		</div>
	);
};

const meta: Meta<typeof Orchestrator> = {
	title: 'Behaviour/SearchScore',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		slots: {
			ComboboxOption: CustomComboboxOption,
		},
	},
	render(args) {
		return <PasteOrchestrator {...args} />;
	},
};

type Nomenclature = { name: string; uri: string };

type GetReferentiel = NonNullable<
	ComponentProps<typeof Orchestrator>['getReferentiel']
>;

function PasteOrchestrator(
	props: Readonly<ComponentProps<typeof Orchestrator>>
) {
	const [source, setSource, sourceAsString] =
		useLocalStorage<LunaticSource | null>('story-source-search');
	const [nomenclatures, setNomenclatures] = useLocalStorage<
		Nomenclature[] | null
	>('story-nomenclatures-search');

	const getReferentiel = useCallback<GetReferentiel>(
		async (name: string) => {
			const nomenclature = (nomenclatures ?? []).find((n) => n.name === name);
			if (!nomenclature) {
				throw new Error(`Nomenclature "${name}" introuvable`);
			}
			const response = await fetch(nomenclature.uri);
			if (!response.ok) {
				throw new Error(
					`Impossible de charger "${name}" (${response.status} ${response.statusText})`
				);
			}
			return response.json();
		},
		[nomenclatures]
	);

	const extraTabs = useMemo(() => {
		return [
			{
				label: 'Source & nomenclatures',
				children: (
					<FormForSourceAndNomenclatures
						source={sourceAsString}
						nomenclatures={nomenclatures ?? []}
						onChange={(source: string, nomenclatures: Nomenclature[]) => {
							setNomenclatures(JSON.stringify(nomenclatures));
							setSource(source);
						}}
					/>
				),
			},
		];
	}, [sourceAsString, nomenclatures, setSource, setNomenclatures]);

	if (!source) {
		return <>{extraTabs[0].children}</>;
	}

	const key = `${sourceAsString}-${JSON.stringify(nomenclatures)}`;

	return (
		<div key={key}>
			<Orchestrator
				{...props}
				slots={{
					ComboboxOption: CustomComboboxOption,
				}}
				source={source}
				getReferentiel={getReferentiel}
				extraTabs={extraTabs}
			/>
		</div>
	);
}

function FormForSourceAndNomenclatures(
	props: Readonly<{
		source: string;
		nomenclatures: Nomenclature[];
		onChange: (source: string, nomenclatures: Nomenclature[]) => void;
	}>
) {
	const [items, setItems] = useState<Nomenclature[]>(props.nomenclatures);

	const add = () => setItems((prev) => [...prev, { name: '', uri: '' }]);

	const remove = (index: number) =>
		setItems((prev) => prev.filter((_, i) => i !== index));

	const update = (index: number, field: keyof Nomenclature, value: string) =>
		setItems((prev) =>
			prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
		);

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		if (data.has('source')) {
			props.onChange(
				data.get('source') as string,
				items.filter((item) => item.name.trim() && item.uri.trim())
			);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Paste the source.json</legend>
				<textarea
					required
					name="source"
					defaultValue={props.source}
					className="textarea w-full h-24"
					placeholder="source.json content"
				/>
				<div className="label">
					The content of this textarea will be saved in your local storage to
					persist between refreshes
				</div>
			</fieldset>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Nomenclatures</legend>
				<div className="label">
					Associate the nomenclature name (the one used in the source) with the
					URL that returns a JSON array. The list is saved in local storage.
				</div>

				<ul className="flex flex-col gap-2 mt-2">
					{items.map((item, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: liste éditable sans id stable
						<li key={index} className="flex flex-row items-end gap-2">
							<label className="flex flex-col flex-1">
								<span className="label">Name</span>
								<input
									required
									type="text"
									className="input w-full"
									placeholder="ex: L_COMMUNES"
									value={item.name}
									onChange={(e) => update(index, 'name', e.target.value)}
								/>
							</label>
							<label className="flex flex-col flex-[2]">
								<span className="label">URI</span>
								<input
									required
									type="url"
									className="input w-full"
									placeholder="https://.../nomenclature.json"
									value={item.uri}
									onChange={(e) => update(index, 'uri', e.target.value)}
								/>
							</label>
							<button
								type="button"
								className="btn btn-ghost"
								title="Delete this nomenclature"
								onClick={() => remove(index)}
							>
								✕
							</button>
						</li>
					))}
				</ul>

				<button type="button" className="btn btn-secondary w-fit" onClick={add}>
					Add a nomenclature
				</button>
			</fieldset>
			<button className="btn btn-primary mt-2" type="submit">
				Load
			</button>
		</form>
	);
}
