# Utilisation

## Prérequis

Pour utiliser la librairie `Lunatic`, la Web application cliente doit supporter React 18+

Pour commencer il faut installer lunatic

```bash
yarn add @inseefr/lunatic@2.0.7-v2
```

## Le hook useLunatic

Ensuite, à l'endroit où vous souhaiter afficher le formulaire il faudra utiliser le hook `useLunatic`.

```js
import {useLunatic} from '@inseefr/lunatic'

const obj = useLunatic(source, data, options)
```

Ce hook prend 3 paramètres :

- La **source**, qui est une représentation JSON du [Lunatic-Model](https://github.com/InseeFr/Lunatic-Model).
- Les **données**, qui contient les données initiales du questionnaires (peut être un objet vide)
- Un objet d'option pour paramétrer le fonctionnement
    - **features** (défaut `['VTL', 'MD']`), permet de définir les fonctionnalité supportées
    - **preferences** (défaut `['COLLECTED']`)
    - **onChange** (défaut `() => {}`), permet d'ajouter une logique à appliquer lorsqu'une réponse est modifiée (doit être mémoïsé car est utilisé comme dépendance d'un useCallback en interne)
    - **management** (défaut `false`)
    - **initialPage** (défaut `'1'`), permet de définir la page de départ
    - **autoSuggesterLoading** (défaut `false`)
    - **suggesters**
    - **suggesterFetcher** (défaut `fetch`), méthode utilisée pour récupérer les données du suggester
    - **activeControls** (défaut `false`), active les contrôles de données

Et retourne un objet permettant de piloter le questionnaire :

- `getComponents()`, renvoie les composants à afficher pour la page courante
- `goPreviousPage()`, permet d'aller à la page précédente
- `goNextPage()`, permet d'aller à la page suivante
- `goToPage(page: string)`, permet d'aller à une page arbitraire
- `getErrors()`, renvoie les erreurs
- `getModalErrors()`, renvoie les erreurs dans les modales
- `getCurrentErrors()`, renvoie les erreurs de la page courante
- `pageTag`, une chaine de caractère contenant le numéro de page (ex: 8.1)
- `isFirstPage`
- `isLastPage`
- `pager`, un objet contenant les informations liées à la page
- `waiting`, indique une attente d'information de la part d'un suggester
- `getData()`, renvoie les données collectées dans le questionnaire

Pour plus d'informations sur les types de ce retour vous pouvez vous référer aux types disponibles dans le [code source](https://github.com/InseeFr/Lunatic/blob/v2-typescript/src/use-lunatic/type.ts#L64-L200). Vous pouvez aussi trouver un exemple d'utilisation du hook dans la partie [Storybook](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/stories/utils/orchestrator.js#L69-L93).

## Les composants

Pour afficher le questionnaire on commencera par récupérer la liste des composants à afficher à l'aide de la méthode `getComponents()` renvoyée par le hook.

Lunatic offre une librairie de composant préconçu pour répondre aux différents types de champs disponible dans les questionnaires.

```jsx
import * as lunatic from '@inseefr/lunatic';

function App ({source, data}) {
  const {
    getComponents,
    getCurrentErrors,
    getModalErrors
  } = lunatic.useLunatic(source, data, {})
  const components = getComponents();
  const currentErrors = getCurrentErrors();
  const modalErrors = getModalErrors();

  return (
    <div className="container">
      {components.map(function (component) {
        const Component = lunatic[component.componentType];
        return (
          <Component
            key={component.id}
            {...component}
            errors={currentErrors}
          />
        );
      })}
      <lunatic.Modal errors={modalErrors} goNext={goNextPage}/>
    </div>
  );
}
```

L'ensemble des composants offerts par Lunatic sont disponibles dans le dossier [src/components](https://github.com/InseeFr/Lunatic/blob/v2-develop/src/components/components.js)

## Interprétation des labels et déclarations

Les labels et déclarations d'un questionnaire peuvent être au format :

- string
- VTL

Dans le cas où ils seraient sous forme de string, aucune configuration particulière n'est requise.
Dans le cas où ils seraient spécifiés en VTL, les props suivantes sont à valoriser :

- features={['VTL']}
- bindings={lunatic.getBindings(questionnaire)}
