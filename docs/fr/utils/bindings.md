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
			"id": "1",
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
		"COLLECTED": {
			"variable1": {
				"componentRef": "1",
				"values": {
					"PREVIOUS": null,
					"COLLECTED": "Variable 1",
					"FORCED": null,
					"EDITED": null,
					"INPUTED": null
				}
			}
		},
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
