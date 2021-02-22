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
import React from 'react';
import * as lunatic from '@inseefr/lunatic';

const Orchestrator = ({
	savingType,
	preferences,
	source,
	features,
	data,
	management,
}) => {
	const {
		questionnaire,
		components,
		handleChange,
		bindings,
	} = lunatic.useLunatic(source, data, {
		savingType,
		preferences,
		features,
		management,
	});

	console.log(lunatic.getCollectedState(questionnaire));

	return (
		<div className="container">
			<div className="components">
				{components.map((q) => {
					const { id, componentType } = q;
					const Component = lunatic[componentType];
					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								{...q}
								handleChange={handleChange}
								labelPosition="TOP"
								preferences={preferences}
								management={management}
								features={features}
								bindings={bindings}
								writable
								zIndex={1}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Orchestrator;
```

### Collecte

```javascript
const Collect = () => (
	<Orchestrator source={simpsons} data={{}} features={['VTL']} />
);
```

### Gestion de la collecte

```javascript
const Management = () => (
	<Orchestrator
		source={simpsons}
		data={data}
		savingType={'EDITED'}
		preferences={['COLLECTED', 'FORCED', 'EDITED']}
		features={['VTL']}
		management
	/>
);
```

## Interprétation des labels et déclarations

Les labels et déclarations d'un questionnaire peuvent être au format :

- string
- VTL

Dans le cas où ils seraient sous forme de string, aucune configuration particulière n'est requise.
Dans le cas où ils seraient spécifiés en VTL, les props suivantes sont à valoriser :

- features={['VTL']}
- bindings={lunatic.getBindings(questionnaire)}

## Types

En entrée, lors de l'initialisation de l'orchestrateur (via le paramètre `data`), comme en sortie, les données doivent être typées comme suit, en fonction des composants :

- `boolean` : `CheckboxBoolean`
- `string` : Autres composants
