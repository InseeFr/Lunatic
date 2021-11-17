# Gestion de l'état d'un questionnaire

Le hook `useLunatic` permet de simplifier la gestion de l'état d'questionnaire dans un orchestrateur client.

### `useLunatic(source, data, params)`

#### Arguments

`source` (`object`) : questionnaire initial au format Lunatic-Model

`data` (`object`) :

```json
{
	"COLLECTED": {
		"variable1": {
			"PREVIOUS": "Previous",
			"COLLECTED": "Collected",
			"FORCED": "Forced",
			"EDITED": "Edited",
			"INPUTED": "Inputed"
		},
		"variable2": {
			"COLLECTED": "Var 2"
		},
		...
	},
	"EXTERNAL": {
		"ext": "External var",
		...
	}
}
```

`params` (`object`) : L'objet params permet de personnaliser le mode de fonctionnement de la gestion du questionnaire.

Les clés suivantes sont prises en compte :

|         Clé          |             Type              | Valeur par défaut |
| :------------------: | :---------------------------: | :---------------: |
|      savingType      |            string             |    'COLLECTED'    |
|     preferences      |        arrayOf(String)        |   ['COLLECTED']   |
|       features       |        arrayOf(String)        |      ['VTL']      |
|      management      |            boolean            |       false       |
|      pagination      |            boolean            |       false       |
|     initialPage      |            string             |        '1'        |
| autoSuggesterLoading |             bool              |       false       |
|   suggesterFetcher   |             func              |       fetch       |
|      suggesters      | object: {id: {url: 'my_url'}} |        { }        |
|     logFunction      |             func              |         -         |

#### Retour

`questionnaire` (`object`) : questionnaire mis à jour par l'orchestrateur.

`components` (`array`) : tableau des composants filtrés, permettant d'itérer pour alimenter l'UI.

`handleChange` (`function`) : fonction de mise à jour, à passer en props des composants du questionnaire.

`bindings` (`object`) : clés / valeurs des variables du questionnaire, à passer en props du questionnaire.

`pagination` (`object`) :

Attributs de l'objet `pagination`:

|     Clé     |   Type   |
| :---------: | :------: |
|  goNext \*  | function |
| goPrevious  | function |
|    page     |  string  |
|   maxPage   |  string  |
| isFirstPage | boolean  |
| isLastPage  | boolean  |

\* : `goNext` prends jusqu'à 2 arguments : l'event et des bindings (les 2 sont optionnels)

#### Exemples

- Un exemple d'utilisation de `useLunatic` est proposé dans la rubrique [Utilisation](../usage.md) de la documentation.
- Un exemple d'utilisation de `useLunatic` **avec pagination** est proposé dans la rubrique [Utilisation](../pagination.md) de la documentation.
