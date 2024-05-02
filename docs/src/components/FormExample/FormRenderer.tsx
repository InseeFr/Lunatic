import {
  type LunaticData,
  type LunaticSource,
  useLunatic,
  LunaticComponents,
} from '@inseefr/lunatic';
import '@inseefr/lunatic/lib/main.css'

type Props = {
  source: LunaticSource;
  data: LunaticData;
};

export function FormRenderer({ source, data }: Props) {
  const { getComponents, Provider } = useLunatic(source, data, {
    initialPage: '1',
  });
  return (
    <Provider>
      <LunaticComponents components={getComponents()} />
    </Provider>
  );
}
