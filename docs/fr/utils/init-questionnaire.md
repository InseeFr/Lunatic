# Initialisation d'un questionnaire

En présence de données de personnalisation, la fonction `mergeQuestionnaireAndData` permet d'insérer les données de personnalisation dans le questionnaire.

### `mergeQuestionnaireAndData(questionnaire)(data)`

#### Arguments

`questionnaire` (`object`) : au format Lunatic-Model

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

#### Retour

(`object`) : questionnaire au format Lunatic-Model

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
					{ "valueType": "COLLECTED", "value": null },
					{ "valueType": "FORCED", "value": null },
					{ "valueType": "EDITED", "value": null },
					{ "valueType": "INPUTED", "value": null }
				]
			}
		}
	],
	"variables": [
		{ "variableType": "EXTERNAL", "name": "VAR_EXTERNAL", "value": null },
		{
			"variableType": "CALCULATED",
			"name": "VAR_CALCULATED",
			"expression": "VTL expression"
		}
	]
}
```

`data`

```json
{
	"COLLECTED": {
		"variable1": {
			"COLLECTED": "Variable 1"
		}
	},
	"EXTERNAL": {
		"ext": "External var"
	}
}
```

`mergeQuestionnaireAndData`

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
