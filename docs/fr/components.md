# Composants

Les composants de la librairie `Lunatic` sont directement documentés dans un [Storybook](https://inseefr.github.io/Lunatic/storybook).

## Composants complexes

### Suggester

L'utilisation du composant `Suggester`, composant de recherche sur liste longue, nécessite une configuration particulière :

- Ajout des wokers :

  - télécharger les [workers](https://github.com/InseeFr/Lunatic/tree/master/public/workers)
  - les déposer dans le projet client (idéalement, dans une application CRA, dans le dossier `public`)
  - surcharge des variables d'environnement localisant les workers ([exemple](https://github.com/InseeFr/Lunatic/blob/master/example/orchestrator/.env))

- Compatibilité des versions Lunatic / Lunatic workers :

|       Lunatic        |  Lunatic workers   |
| :------------------: | :----------------: |
|  0.2.1-experimental  | 0.2.0-experimental |
|  0.2.0-experimental  | 0.1.2-experimental |
| < 0.2.0-experimental |       0.1.0        |

- Activation au niveau de `useLunatic` en valorisant les options suivantes :

|       variable       |                           valeur                            | description                                                   |
| :------------------: | :---------------------------------------------------------: | :------------------------------------------------------------ |
| autoSuggesterLoading |                            true                             | Permet d'activer le chargement automatique des ressources     |
|    suggesters \*     | { id: { url: 'url_to_fetch', stopWords: ['str', 'str1'] } } | Définissions des ressources                                   |
|   suggesterFetcher   |                 url => fetch(url, options)                  | Permet de surcharger les options de chargement des ressources |

Les valeurs des objets définis au sein de `suggesters` doivent avoir les attributs suivants :

- url : obligatoire
- stopWords : optionnel - liste de mots à exclure de l'indexation (liste de stop words français par défaut, attention : [] = pas de stop words)
