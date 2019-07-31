# Mise à jour d'un questionnaire

La fonction `updateQuestionnaire` permet de mettre à jour simplement le questionnaire en fonction des évènements transmis par les composants.

### `updateQuestionnaire(savingType)(questionnaire)(preferences)(updatedValue)`

#### Arguments

`savingType` (`string`) : un des cinq valueType du Lunatic-Model, déterminant le champ de sauvegarde des données saisies au sein des composants.

`questionnaire` (`object`) : au format Lunatic-Model.

`preferences` (`array`) : tableau de valueType, permettant de prioriser l'affichage des données.

`updatedValue` (`object`) :

```json
{ "variable": "value" }
```

#### Retour

(`object`) : questionnaire au format Lunatic-Model

#### Exemple

`savingType` : "COLLECTED"

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
	]
}
```

`preferences` : ["COLLECTED"]

`updatedValue` :

```json
{ "variable1": "Variable 1" }
```

`updateQuestionnaire`

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
	]
}
```
