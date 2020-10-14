# Récupération des données d'un questionnaire

Au sein de l'orchestrateur, la donnée est directement stockée dans l'objet questionnaire.
Pour y accéder plus facilement (sauvegarde, exécution de contrôle, ...), trois fonctions sont à disposition.

### `getState(questionnaire)`

#### Arguments

`questionnaire` (`object`) : initialement au format Lunatic-Model, transformé en amont par la fonction `mergeQuestionnaireAndData`

#### Retour

(`object`) :

```json
{
	"COLLECTED": {
        "var": {
            "COLLECTED": "var value",
            ...
        },
        ...
    },
	"EXTERNAL": {},
	"CALCULATED": {}
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
					"COLLECTED": "value collected",
					"FORCED": "value forced",
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
					"COLLECTED": "value collected",
					"FORCED": "value forced",
					"EDITED": null,
					"INPUTED": null
				}
			}
		},
		"EXTERNAL": { "ext": "external var" }
	}
}
```

`getState`

```json
{
	"COLLECTED": {
		"variable1": { "COLLECTED": "value collected", "FORCED": "value forced" }
	},
	"EXTERNAL": { "ext": "external var" },
	"CALCULATED": {}
}
```

### `getCollectedState(questionnaire)`

#### Arguments

`questionnaire` (`object`) : initialement au format Lunatic-Model, transformé en amont par la fonction `mergeQuestionnaireAndData`

#### Retour

(`object`) :

```json
{
    "var": { "FORCED": "var value", ... },
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
					"COLLECTED": "value collected",
					"FORCED": "value forced",
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
					"COLLECTED": "value collected",
					"FORCED": "value forced",
					"EDITED": null,
					"INPUTED": null
				}
			}
		},
		"EXTERNAL": { "ext": "external var" }
	}
}
```

`getCollectedState`

```json
{
	"variable1": { "COLLECTED": "value collected", "FORCED": "value forced" }
}
```

### `getCollectedStateByValueType(questionnaire)(valueType)`

#### Arguments

`questionnaire` (`object`) : initialement au format Lunatic-Model, transformé en amont par la fonction `mergeQuestionnaireAndData`

(`valueType` (`string`), `displayNull` (`boolean`)) : un des cinq valueType du Lunatic-Model et un boolean pour retourner - ou non - les variables dont la valeur est nulle

#### Retour

(`object`) :

```json
{
	"var": "value"
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
					"COLLECTED": "value collected",
					"FORCED": "value forced",
					"EDITED": null,
					"INPUTED": null
				}
			}
		}
		{
			"id": "2",
			"componentType": "Input",
			"response": {
				"name": "variable2",
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
	"variables": {
		"COLLECTED": {
			"variable1": {
				"componentRef": "1",
				"values": {
					"PREVIOUS": null,
					"COLLECTED": "value collected",
					"FORCED": "value forced",
					"EDITED": null,
					"INPUTED": null
				}
			},
			"variable2": {
				"componentRef": "2",
				"values": {
					"PREVIOUS": null,
					"COLLECTED": null,
					"FORCED": null,
					"EDITED": null,
					"INPUTED": null
				}
			}
		},
		"EXTERNAL": { "ext": "external var" }
	}
}
```

`valueType`

'FORCED'

`getCollectedStateByValueType` (displayNull : false or undefined)

```json
{
	"variable1": "value forced"
}
```

`getCollectedStateByValueType` (displayNull : true)

```json
{
	"variable1": "value forced",
	"variable2": null
}
```
