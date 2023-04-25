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

|        Lunatic        |  Lunatic workers   |
| :-------------------: | :----------------: |
| >= 0.2.1-experimental | 0.2.2-experimental |
|  0.2.0-experimental   | 0.1.2-experimental |
| < 0.2.0-experimental  |       0.1.0        |

- Activation au niveau de `useLunatic` en valorisant les options suivantes :

|       variable       |                           valeur                            | description                                                   |
| :------------------: | :---------------------------------------------------------: | :------------------------------------------------------------ |
| autoSuggesterLoading |                            true                             | Permet d'activer le chargement automatique des ressources     |
|    suggesters \*     | { id: { url: 'url_to_fetch', stopWords: ['str', 'str1'] } } | Définissions des ressources                                   |
|   suggesterFetcher   |                 url => fetch(url, options)                  | Permet de surcharger les options de chargement des ressources |

Les valeurs des objets définis au sein de `suggesters` doivent avoir les attributs suivants :

- url : obligatoire
- stopWords : optionnel - liste de mots à exclure de l'indexation (liste de stop words français par défaut, attention : [] = pas de stop words)

### ComponentSet

Le composant `ComponentSet` peut être utilisé pour les questions ou plusieurs réponse sont incitées.

Un exemple simple serait :

---

#### What is your name?

first name:
<input placeholder="spongebob">

last name:
<input placeholder="squarepants">

---

Dans ce composant, le html est rendu de cette manière:

```
<fieldset>
    <legend><h4>What is your name?</h3></legend>
    <div class="lunatic-component">
        <label>first name:</label>
        <input placeholder="spongebob">
    </div>
    <div class="lunatic-component">
        <label>first name:</label>
        <input placeholder="squarepants">
    </div>
</fieldset>
```

Le composant est enrobé par une balise `<fieldset>`, et la question est porté par la balise `<legend>`. Cela est nécessaire pour l'accessibilité pour que les champs de saisie (ou d'autres composants, type radio, checkbox, etc) ont comme référence la question dans le `<legend>`.

#### Attributs pour `ComponentSet`

Dans un composant `ComponentSet` l'attribut `"label"` porte la question du `<fieldset>`. Les labels dans les sous-composants ne porte plus donc la question, mais plutot le `<label>` _(du sens html)_.

Et l'attribut `"description"` est possible mais facultatif.

Un `ComponentSet` a aussi l'attribut `"components"` qui est un tableau des composants lunatic.

#### Sous-composants pour `ComponentSet`

Le tableau des `"components"` peut contenir `n` composants luntatic ou `n >= 1`. La définition des composants est pareille que s'ils étaient des composants _reguliers_, sauf qu'il n'est pas nécessaire de définir la `"page"` puisque cela est défini au niveau du `ComponentSet`.

#### Controls pour `ComponentSet`

Alors qu'il est possible en théorie d'ajouter des `"controls"` à un `ComponentSet`, c'est une pratique à éviter. Il est recommandé de controller les composants recevant une réponse de l'utilisateur, et donc d'ajouter les controls _inline_ dans les sous-composants.

Un `ComponentSet` peut s'afficher sur une page basique ainsi qu'à l'intérieur d'un `Loop` ou un `Roundabout`.

La fonction `replaceComponentSequence()` a été ajoutée au computation des erreurs afin de computer des controles des sous-composants.
