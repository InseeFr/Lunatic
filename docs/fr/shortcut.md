# Raccourcis clavier

## Composants

Les modalitées des composants de type `CheckboxGroup`, `CheckboxOne` et `Radio` peuvent être sélectionnées grâce aux raccourcis clavier.

Pour activer cette fonctionnalité, il suffit d'activer la props `shortcut` de ces composants :

```javascript
<Component
    ...
    shortcut
    ...
/>
```

Dans le cas d'une liste de taille inférieure ou égale à 9 la numérotation et les raccourcis clavier d'étendront de 1 à 9, de a à ... sinon.

## Non réponse

Lorsque le [mode non réponse](./missing.md) est activé, les buttons permettant sa gestion peuvent être validés grâce aux raccourcis clavier.

Pour activer cette fonctionnalité, la props `missingShortcut` des composants de l'orchestrateur doit être alimentée par un objet donnant la valeur du raccourci pour le bouton "Ne sais pas" et le bouton "Refus". Par exemple :

```javascript
<Component
    ...
    missingShortcut={{ dontKnow: 'f2', refused: 'f4' }}
    ...
/>
```
