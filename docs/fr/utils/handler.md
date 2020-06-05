# Mise à jour d'un questionnaire

La fonction `updateQuestionnaire` permet de mettre à jour simplement le questionnaire en fonction des évènements transmis par les composants.

### `updateQuestionnaire(savingType)(questionnaire)(preferences)(updatedValue)`

#### Arguments

`savingType` (`string`) : un des cinq valueType du Lunatic-Model, déterminant le champ de sauvegarde des données saisies au sein des composants.

`questionnaire` (`object`) : initialement au format Lunatic-Model, transformé en amont par la fonction `mergeQuestionnaireAndData`

`preferences` (`array`) : tableau de valueType, permettant de prioriser l'affichage des données.

`updatedValue` (`object`) :

```json
{ "variable": "value" }
```

#### Retour

(`object`) : questionnaire

#### Exemple

`savingType` : "COLLECTED"

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
	]
}
```
