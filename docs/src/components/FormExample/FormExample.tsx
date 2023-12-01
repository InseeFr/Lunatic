import {type LunaticData, type LunaticSource, useLunatic} from '@inseefr/lunatic';
import styles from './FormExample.module.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
// @ts-ignore
import FormRendererSource from '!!raw-loader!@site/src/components/FormExample/FormRenderer';
// @ts-ignore
import FormRendererWithNavigationSource from '!!raw-loader!@site/src/components/FormExample/FormRendererWithNavigation';
import BrowserOnly from '@docusaurus/BrowserOnly';

const empty = {} as LunaticData;

type Props = {
  source: LunaticSource;
  data: LunaticData;
  options: Parameters<typeof useLunatic>[2]
};

export function FormExample({ source, data = empty, options }: Props) {
  const hasNavigation = source.maxPage && source.maxPage !== '1';
  return (
    <div className={styles.FormExample}>
      <Tabs>
        <TabItem value="source" label="Source" default>
          <CodeBlock language="json" className={styles.FormExampleCode}>
            {JSON.stringify(source, null, 2)}
          </CodeBlock>
        </TabItem>
        <TabItem value="data" label="Data">
          <CodeBlock language="json" className={styles.FormExampleCode}>
            {JSON.stringify(data, null, 2)}
          </CodeBlock>
        </TabItem>
      </Tabs>
      <Tabs>
        <TabItem value="code" label="Code">
          <CodeBlock language="tsx" className={styles.FormExampleCode}>
            {hasNavigation ? FormRendererWithNavigationSource : FormRendererSource}
          </CodeBlock>
        </TabItem>
        <TabItem value="render" label="Rendu" default>
          <div className={styles.FormExampleRender}>
            <BrowserOnly fallback={<div>Loading...</div>}>
              {() => {
                const Component = hasNavigation ?
                    require('@site/src/components/FormExample/FormRendererWithNavigation').FormRendererWithNavigation : require('@site/src/components/FormExample/FormRenderer').FormRenderer;
                 return <Component source={source} data={data} options={options} />
              }}
            </BrowserOnly>

          </div>
        </TabItem>
      </Tabs>
    </div>
  );
}
