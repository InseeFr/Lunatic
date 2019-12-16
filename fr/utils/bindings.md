# Récupération des variables à binder d'un questionnaire

Afin de valoriser les labels variabilisés, ou d'injecter les valeurs des variables d'un questionnaire dans les `conditionFilter` des composants et de résoudre ces expressions, la fonction `getBindings` permet d'obtenir un objet à plat, contenant sous forme de clés / valeurs, l'ensemble des variables du questionnaire

### `getBindings(questionnaire)`

#### Arguments

`questionnaire` (`object`) : initialement au format Lunatic-Model, transformé en amont par la fonction `mergeQuestionnaireAndData`

#### Retour

(`object`) :

```json
{
    "var1": "value1",
    "var2": "value2",
    ...
}
```

#### Exemple

`questionnaire`

```json
{
	"components": [
		{
			"componentType": "Input",
			"response": {
				"name": "variable1",
				"valueState": [
					{ "valueType": "PREVIOUS", "value": null },
					{ "valueType": "COLLECTED", "value": "Variable 1" },
					{ "valueType": "FORCED", "value": null },
					{ "valueType": "EDITED", "value": null },
					{ "valueType": "INPUTED", "value": null }
				]
			}
		}
	],
	"variables": {
		"EXTERNAL": {
			"ext": "External var"
		},
		"CALCULATED": {
			"VAR_CALCULATED": {
				"expression": "VTL expression",
				"value": null
			}
		}
	}
}
```

`getBindings`

```json
{
	"variable1": "Variable 1",
	"ext": "External var",
	"VAR_CALCULATED": "Vtl expression"
}
```

### `getLabelBindings(questionnaire)`

#### Arguments

`questionnaire` (`object`) : initialement au format Lunatic-Model, transformé en amont par la fonction `mergeQuestionnaireAndData`

#### Retour

(`object`) :

```json
{
    "var1": "value1",
    "var2": "value2",
    ...
}
```

#### Exemple

`questionnaire`

```json
{
	"components": [
		{
			"components": [
				{
					"id": "j3343clt",
					"componentType": "Radio",
					"mandatory": false,
					"label": "➡ 1. In which city do the Simpsons reside?",
					"response": {
						"name": "VAR1",
						"valueState": [
							{ "valueType": "PREVIOUS", "value": null },
							{ "valueType": "COLLECTED", "value": "00002" },
							{ "valueType": "FORCED", "value": null },
							{ "valueType": "EDITED", "value": null },
							{ "valueType": "INPUTED", "value": null }
						]
					},
					"options": [
						{ "value": "00001", "label": "Springfield" },
						{ "value": "00002", "label": "Shelbyville" },
						{ "value": "00003", "label": "Seinfeld" }
					]
				}
			]
		}
	],
	"variables": {
		"EXTERNAL": {
			"ext": "External var"
		},
		"CALCULATED": {
			"VAR_CALCULATED": {
				"expression": "VTL expression",
				"value": null
			}
		}
	}
}
```

`getLabelBindings`

```json
{
	"VAR1": "Shelbyville",
	"ext": "External var",
	"VAR_CALCULATED": "Vtl expression"
}
```
