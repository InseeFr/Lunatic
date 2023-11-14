import {
	type LunaticData,
	type LunaticSource,
	useLunatic,
	LunaticComponents,
} from '@inseefr/lunatic';

type Props = {
	source: LunaticSource;
	data: LunaticData;
};

export function FormRenderer({ source, data }: Props) {
	const { getComponents } = useLunatic(source, data, { initialPage: '1' });
	return <LunaticComponents components={getComponents()} />;
}

Object.entries();
