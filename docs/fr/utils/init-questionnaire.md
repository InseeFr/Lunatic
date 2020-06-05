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

(`object`) : questionnaire

#### Exemple

`questionnaire`

```json
{
	"components": [
		{
			"id": "1",
			"componentType": "Input",
			"response": {
				"name": "variable1",
				"values": {
					"PREVIOUS": null,
					"COLLECTED": null,
					"FORCED": null,
					"EDITED": null,
					"INPUTED": null
				}
			}
		}
	],
	"variables": [
		{ "variableType": "EXTERNAL", "name": "VAR_EXTERNAL", "value": null },
		{
			"variableType": "CALCULATED",
			"name": "VAR_CALCULATED",
			"expression": "VTL expression"
		},
		{
			"variableType": "COLLECTED",
			"componentRef": "1",
			"values": {
				"PREVIOUS": null,
				"COLLECTED": null,
				"FORCED": null,
				"EDITED": null,
				"INPUTED": null
			}
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
				"values": {
					"PREVIOUS": null,
					"COLLECTED": "Variable 1",
					"FORCED": null,
					"EDITED": null,
					"INPUTED": null
				}
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
		},
		"COLLECTED": {
			"componentRef": "1",
			"values": {
				"PREVIOUS": null,
				"COLLECTED": null,
				"FORCED": null,
				"EDITED": null,
				"INPUTED": null
			}
		}
	}
}
```
