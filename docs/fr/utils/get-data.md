# Récupération des données d'un questionnaire

Au sein de l'orchestrateur, la donnée est directement stockée dans l'objet questionnaire.
Pour y accéder plus facilement (sauvegarde, exécution de contrôle, ...), trois fonctions sont à disposition.

### `getState(questionnaire)`

#### Arguments

`questionnaire` (`object`) : au format Lunatic-Model

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
			"componentType": "Input",
			"response": {
				"name": "variable1",
				"valueState": [
					{ "valueType": "PREVIOUS", "value": null },
					{ "valueType": "COLLECTED", "value": "value collected" },
					{ "valueType": "FORCED", "value": "value forced" },
					{ "valueType": "EDITED", "value": null },
					{ "valueType": "INPUTED", "value": null }
				]
			}
		}
	],
	"variables": [
		{ "variableType": "EXTERNAL", "name": "ext", "value": "external var" }
	]
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

`questionnaire` (`object`) : au format Lunatic-Model

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
			"componentType": "Input",
			"response": {
				"name": "variable1",
				"valueState": [
					{ "valueType": "PREVIOUS", "value": null },
					{ "valueType": "COLLECTED", "value": "value collected" },
					{ "valueType": "FORCED", "value": "value forced" },
					{ "valueType": "EDITED", "value": null },
					{ "valueType": "INPUTED", "value": null }
				]
			}
		}
	],
	"variables": [
		{ "variableType": "EXTERNAL", "name": "ext", "value": "external var" }
	]
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

`questionnaire` (`object`) : au format Lunatic-Model

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
			"componentType": "Input",
			"response": {
				"name": "variable1",
				"valueState": [
					{ "valueType": "PREVIOUS", "value": null },
					{ "valueType": "COLLECTED", "value": "value collected" },
					{ "valueType": "FORCED", "value": "value forced" },
					{ "valueType": "EDITED", "value": null },
					{ "valueType": "INPUTED", "value": null }
				]
			}
		},
		{
			"componentType": "Input",
			"response": {
				"name": "variable2",
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
		{ "variableType": "EXTERNAL", "name": "ext", "value": "external var" }
	]
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
