<img align="right" src="docs/img/lunatic-logo.png" alt="Lunatic logo"/>

# Lunatic

[![Lunatic CI](https://github.com/InseeFr/Lunatic/actions/workflows/quality.yml/badge.svg)](https://github.com/InseeFr/Lunatic/actions/workflows/quality.yml)
[![npm version](https://badge.fury.io/js/%40inseefr%2Flunatic.svg)](https://badge.fury.io/js/%40inseefr%2Flunatic)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Lunatic&metric=coverage)](https://sonarcloud.io/dashboard?id=InseeFr_Lunatic)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Lunatic&metric=alert_status)](https://sonarcloud.io/dashboard?id=InseeFr_Lunatic)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Lunatic est une librairie front-end sous forme de hook react et de librairies de composants pour générer un questionnaire à partir du format de données [Lunatic-Model](https://github.com/InseeFr/Lunatic-Model).

- [Storybook](https://inseefr.github.io/Lunatic/storybook), branche `main`
- [Storybook v1](https://inseefr.github.io/Lunatic/storybook-v1), branche `v1-main`
- [Storybook Beta](https://inseefr.github.io/Lunatic/storybook-beta), branche `develop`
- [Documentation](https://inseefr.github.io/Lunatic/fr/)

## Sommaire

- [Lunatic](#lunatic)
  - [Sommaire](#sommaire)
  - [Utilisation](#utilisation)
    - [Le hook useLunatic](#le-hook-uselunatic)
    - [Les composants](#les-composants)
  - [Personnalisation](#personnalisation)
  - [Fonctionnement interne](#fonctionnement-interne)
    - [Fonctionnement général](#fonctionnement-général)
    - [pages et pager](#pages-et-pager)
    - [Exécution du VTL](#exécution-du-vtl)
  - [Convention et Bonnes Pratiques](#convention-et-bonnes-pratiques)

## Utilisation

Pour commencer il faut installer lunatic

```bash
yarn add @inseefr/lunatic
```

### Le hook useLunatic

Ensuite, à l'endroit où vous souhaitez afficher le formulaire il faudra utiliser le hook `useLunatic`.

```js
import { useLunatic } from '@inseefr/lunatic';

const obj = useLunatic(source, data, options);
```

Ce hook prend 3 paramètres :

- La **source**, qui est une représentation JSON du [Lunatic-Model](https://github.com/InseeFr/Lunatic-Model).
- Les **données**, qui contient les données initiales du questionnaires (peut être un objet vide)
- Un objet d'option pour paramétrer le fonctionnement
  - **features** (défaut `['VTL', 'MD']`), permet de définir les fonctionnalité supportées
  - **preferences** (défaut `['COLLECTED']`)
  - **onChange** (défaut `() => {}`), permet d'ajouter une logique à appliquer lorsqu'une réponse est modifiée (doit être mémoïsé car est utilisé comme dépendance d'un useCallback en interne)
  - **management** (défaut `false`) : Non implémenté encore, permettra de gérer plusieurs état d'une même variable (utilisation par des postes de reprise)
  - **initialPage** (défaut `'1'`), permet de définir la page de départ
  - **lastReachedPage** (défaut `undefined`) permet de définir quelle est la page la plus lointaine déjà atteinte
  - **autoSuggesterLoading** (défaut `false`)
  - **suggesters**
  - **suggesterFetcher** (défaut `fetch`), méthode utilisée pour récupérer les données du suggester
  - **activeControls** (défaut `false`), active les contrôles de données

Et retourne un objet permettant de piloter le questionnaire :

- `getComponents()`, renvoie les composants à afficher pour la page courante
- `goPreviousPage()`, permet d'aller à la page précédente
- `goNextPage()`, permet d'aller à la page suivante
- `goToPage({ page: string })`, permet d'aller à une page arbitraire
- `getErrors()`, renvoie les erreurs
- `getModalErrors()`, renvoie les erreurs dans les modales
- `getCurrentErrors()`, renvoie les erreurs de la page courante
- `pageTag`, une chaine de caractère contenant le numéro de page (ex: 8.1)
- `isFirstPage`
- `isLastPage`
- `pager`, un objet contenant les informations liées à la page
- `waiting`, indique une attente d'information de la part d'un suggester
- `getData()`, renvoie les données collectées dans le questionnaire
- `loopVariables`, est un tableau contenant la liste des variables utilisées pour la boucle courante

Pour plus d'informations sur les types de ce retour vous pouvez vous référer aux types disponibles dans le [code source](https://github.com/InseeFr/Lunatic/blob/v2-typescript/src/use-lunatic/type.ts#L64-L200). Vous pouvez aussi trouver un exemple d'utilisation du hook dans la partie [Storybook](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/stories/utils/orchestrator.js#L69-L93).

### Les composants

Pour afficher le questionnaire on commencera par récupérer la liste des composants à afficher à l'aide de la méthode `getComponents()` renvoyée par le hook.

Ensuite, on pourra utiliser le composant `<LunaticComponents />` pour gérer l'affichage des composants

```jsx
import { LunaticComponents } from '@inseefr/lunatic';

function App({source, data}) {
  const { getComponents, getCurrentErrors, getModalErrors } =
          lunatic.useLunatic(source, data, {});
  const components = getComponents();
  const currentErrors = getCurrentErrors();
  const modalErrors = getModalErrors();

  return (
          <div className="container">
            <LunaticComponents components={components} />
            <lunatic.Modal errors={modalErrors} goNext={goNextPage}/>
          </div>
  );
}
```

Ce composant se charge de récupérer le bon composant à afficher en fonction des champs demandés. Il est possible de personnaliser les propriétés passées aux composants grâce à la propriété `componentProps` mais aussi de rajouter un élément autour de chaque composant grâce à la méthode `wrapper`. Vous pouvez regarder [l'orchestrateur du storybook](./src/stories/utils/orchestrator.jsx) pour avoir un exemple d'utilisation.

## Personnalisation

Par défaut les composants offerts par Lunatic sont plutôt simples avec un style minimal. Il est possible de personnaliser les champs avec votre propre CSS, mais pour des cas plus complexes, vous pouvez aussi remplacer les composants de bases à l'aide de la propriété `custom` que vous pouvez passer lors de l'appel à useLunatic.

```jsx
const custom = {
	Input: MyCustomInput,
	InputNumber: MyCustomInputNumber,
};

function App({ source, data }) {
	const {} = useLunatic(source, data, { custom });

	// ...
}
```

## Fonctionnement interne

Cette partie concerne le fonctionnement interne du hook `useLunatic()`. L'objectif est d'aider à la compréhension de son fonctionnement.

### Fonctionnement général

Le hook se base sur un [état interne](https://github.com/InseeFr/Lunatic/blob/v2-typescript/src/use-lunatic/type.ts#L64-L200) qui est mis à jour au travers d'un système de [reducer](https://reactjs.org/docs/hooks-reference.html#usereducer). Les [actions](https://github.com/InseeFr/Lunatic/blob/v2-typescript/src/use-lunatic/actions.ts) qui affectent cet état sont limitées

- Une action `'use-lunatic/on-init'` permet l'initialisation de l'état à partir des données reçu en paramètre du hook.
- Les actions `'use-lunatic/go-previous'`, `'use-lunatic/go-next'` et `'use-lunatic/go-to-page'` sont appelées lors de la navigation à l'aide des méthodes renvoyées par le hook
- L'action `use-lunatic/handle-change` est l'action la plus importante qui est appelée dès lors qu'une donnée est changée dans le questionnaire.

L'ensemble des [reducers correspondants à ces actions sont disponibles ici](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/use-lunatic/reducer/reducer.js). En général, ils sont décomposés en plusieurs méthodes en fonction de la partie de l'état qu'ils modifient.

### pages et pager

À l'initialisation le scénario du questionnaire est modélisé sous forme d'un objet qui est stocké dans l'état (dans la propriété `pages`). Cet objet est indexé par numéro de page et contient la liste des composants à afficher pour chaque page. Combiné au `pager` qui contient l'état de la navigation, c'est cette propriété qui permet de résoudre les composants à afficher.

### Exécution du VTL

L'autre point important de lunatic est l'exécution des expressions VTL qui permettent de rendre certaines propriétés dynamiques (libellés, erreurs...). Ce remplissage se fait [lorsque l'état change](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/use-lunatic/commons/use-components-from-state.js).

Afin de faciliter l'exécution des expressions une méthode `executeExpression()` est exposée dans l'état de Lunatic. Cette méthode est accompagnée d'une méthode `updateBindings()` qui permet la mise à jour des valeurs internes. Ce système d'exécution d'expression utilise un système de mémorisation pour ne pas re-exécuter une même expression plusieurs fois. Lorsque l'action `use-lunatic/handle-change` est exécuté, les valeurs ("bindings") sont mis à jour pour mémoriser les valeurs associées aux différentes variables VTL. De la même manière les valeurs des variables calculées dont dépend la variable modifié sont oubliées afin de rafraichir la valeur lors de la prochaine exécution.

## Convention et Bonnes Pratiques

- On évite les exports "défaut" car cela nuit à la lisibilité lors de l'import.
- Les commentaires dans le code sont en anglais.
- Les fichiers contenant du JSX doivent utiliser l'extension .jsx (ou .tsx).
- Les commits suivent la spécification [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Les Pull Requests doivent être préfixées comme les commits avec la même convention :
   - `test(XXX?)` : XXX pour de l'ajout de tests.
   - `feat(XXX?)` : XXX pour de l'ajout de fonctionnalités.
   - `fix(XXX?)` : XXX pour de la correction de bug.
   - `docs(XXX?)` : XXX pour de l'ajout de documentation.
   - `refactor(XXX?)` : XXX pour du refactoring qui ne change pas de fonctionnalités.
   - `build(XXX?)` : XXX pour des changements liés au processus de build, aux scripts de compilation, etc.
   - `style(XXX?)` : XXX pour de la modification de style.
   - `ci(XXX?)` : XXX pour de la modification de CI.
   - `perf(XXX?)` : XXX pour de l'amélioration de performance.
   - `revert(XXX?)` : XXX pour annuler une précédente PR. 
   - `chore(XXX?)` : XXX pour des tâches de maintenance ou des tâches qui ne rentrent pas dans les autres catégories.

- Les branches doivent être préfixées (on suivra les mêmes préfixes que pour le Conventional Commits) :
   - `test/XXX` : pour de l'ajout de tests.
   - `feat/XXX` : pour de l'ajout de fonctionnalités.
   - `fix/XXX` : pour de la correction de bug.
   - `docs/XXX` : pour de l'ajout de documentation.
   - `refactor/XXX` : pour du refactoring qui ne change pas de fonctionnalités.
   - `build/XXX` : pour des changements liés au processus de build, aux scripts de compilation, etc.
   - `style/XXX` : pour des changements liés au style du code.
   - `ci/XXX` : pour des changements liés à l'intégration continue (CI).
   - `perf/XXX` : pour des améliorations de performance.
   - `revert/XXX` : pour annuler une précédente PR.
   - `chore/XXX` : pour des tâches de maintenance ou des tâches qui ne rentrent pas dans les autres catégories.
