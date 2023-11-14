import { type LunaticData, type LunaticSource } from '@inseefr/lunatic';
import styles from './FormExample.module.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { FormRenderer } from '@site/src/components/FormExample/FormRenderer';
import FormRendererSource from '!!raw-loader!@site/src/components/FormExample/FormRenderer';

const empty = {} as LunaticData;

type Props = {
	source: LunaticSource;
	data: LunaticData;
};

export function FormExample({ source, data = empty }: Props) {
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
						{FormRendererSource}
					</CodeBlock>
				</TabItem>
				<TabItem value="render" label="Rendu" default>
					<div className={styles.FormExampleRender}>
						<FormRenderer source={source} data={data} />
					</div>
				</TabItem>
			</Tabs>
		</div>
	);
}
