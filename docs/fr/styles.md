# Styles

Les composants de la librairie sont exposés avec un style par défaut.

La variabilisation du thème de base et la surcharge des classes css permettent de personnaliser les composants.

## Custom properties

Liste des `custom properties` personnalisables (avec leur valeur par défaut) :

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

## Classes CSS

Les éléments html générés par les composants de la librairie possèdent des classes css surchargeables.

La liste de ces classes est accessible dans l'onglet `Readme` de chacun des composants exposés dans [Storybook](https://inseefr.github.io/Lunatic/storybook/?path=/story/input--default).
