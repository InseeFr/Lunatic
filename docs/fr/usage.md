# Utilisation

## Prérequis

Pour utiliser la librairie `Lunatic`, la Web application cliente doit supporter React 16.8 +

## Installation de la librairie

`Lunatic` est publiée sur [NPM](https://www.npmjs.com/package/@inseefr/lunatic).

```
# Ajout de la dépendance
yarn add @inseefr/lunatic
```

## Orchestration des composants

Un exemple complet d'orchestration des [composants](./components.md) est proposé dans un [projet exemple](https://github.com/InseeFr/Lunatic/tree/master/example). L'orchestrateur mobilise également des [utilitaires](./utils/index.md) de la librairie pour gérer les données de personnalisation et celles saisies :

```javascript
import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';

const Orchestrator = ({ savingType, preferences, source, data, tooltip }) => {
	const [questionnaire, setQuestionnaire] = useState(
		lunatic.mergeQuestionnaireAndData(source)(data)
	);
	const onChange = updatedValue => {
		setQuestionnaire(
			lunatic.updateQuestionnaire(savingType)(questionnaire)(preferences)(
				updatedValue
			)
		);
	};
	console.log('State : ', lunatic.getState(questionnaire));
	const components = questionnaire.components.map(q => {
		const { id, componentType } = q;
		const Component = lunatic[componentType];
		return (
			<div className="lunatic lunatic-component" key={`component-${id}`}>
				<Component
					{...q}
					handleChange={onChange}
					labelPosition="TOP"
					preferences={preferences}
					tooltip={tooltip}
				/>
			</div>
		);
	});
	return (
		<div className="container">
			<div className="components">{components}</div>
		</div>
	);
};

export default Orchestrator;
```

### Collecte

```javascript
const Collect = () => (
	<Orchestrator
		savingType={'COLLECTED'}
		preferences={['COLLECTED']}
		source={simpsons}
		data={{}}
		tooltip={false}
	/>
);
```

### Gestion de la collecte

```javascript
const Management = () => (
	<Orchestrator
		savingType={'EDITED'}
		preferences={['COLLECTED', 'FORCED', 'EDITED']}
		source={simpsons}
		data={data}
		tooltip={true}
	/>
);
```
