# Styles

Les composants de la librairie sont exposés avec un style par défaut. La variabilisation du thème de base et la surcharge des classes css permettent de personnaliser les composants.

Afin de bénéficier du style par défaut, les composants Lunatic doivent avoir une classe parente : `lunatic-component`

## Variables CSS

Liste des `variables CSS` personnalisables (avec leur valeur par défaut) :

```css
* {
	--color-primary-dark: #2a5885;
	--color-primary-light: #5181b8;
	--color-primary-main: #4a73a4;
	--color-primary-contrast-text: #ffffff;

	--color-secondary-dark: #14202d;
	--color-secondary-light: #f7f8fa;
	--color-secondary-main: #1a293b;
	--color-secondary-contrast-text: #ffffff;

	--color-very-light: #dbe4ef;
	--color-very-very-light: #e6eaee;
	--color-current-item: #0d823e;

	--color-error: #f50c0c;
	--color-disabled: rgb(235, 235, 228);
	--color-prefix: cornflowerblue;
	--color-dropdown-active: rgba(0, 0, 0, 0.04);
	--color-dropdown-selected: rgba(0, 0, 0, 0.08);

	--dropdown-transition-time: 0.5s;
}
```

## Structure HTML

Par défaut les composants offerts par Lunatic sont plutôt simples avec un style minimal. Il est possible de personnaliser les champs avec votre propre CSS, mais pour des cas plus complexes vous pouvez aussi remplacer les composants de bases à l'aide de la propriété `custom` que vous pouvez passer au composant.

```jsx
const custom = {
  Input: MyCustomInput,
  InputNumber: MyCustomInputNumber
}

function App ({source, data}) {
  
  // ...

  return (
    <div className="container">
      {components.map(function (component) {
        const Component = lunatic[component.componentType];
        return (
          <Component
            key={component.id}
            {...component}
            custom={custom}
            errors={currentErrors}
          />
        );
      })}
    </div>
  );
}
```

