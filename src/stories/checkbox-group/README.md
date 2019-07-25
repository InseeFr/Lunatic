# CheckboxGroup component

## Props

|       Props       |  Type  |              Default value               | Required | Description                               |
| :---------------: | :----: | :--------------------------------------: | :------: | ----------------------------------------- |
|        id         | string |                    -                     |    ✓     | Id of the checkbox                        |
|       label       | string |                    ""                    |          | Fieldset label of the checkbox            |
|   responses \*    | array  |                    -                     |    ✓     | Options of the checkbox                   |
|   handleChange    |  func  |                    -                     |    ✓     | Handler of the checkbox                   |
|     disabled      |  bool  |                  false                   |          | Is the checkbox responses disabled        |
|      focused      |  bool  |                  false                   |          | Is the checkbox responses focused         |
| keyboardSelection |  bool  |                  false                   |          | Enable keyboard selection of the checkbox |
|  positioning \*   | string |                "DEFAULT"                 |          | CheckboxGroup responses positioning       |
|  declarations \*  | array  |                   [ ]                    |          | Declarations of the checkbox              |
|     style \*      | object | { fieldsetStyle: {}, checkboxStyle: {} } |          | Style of the checkbox                     |

- `responses` props has to be an array made by objects with a shape of `{id: string, label: string, value: bool}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component
- `style` props has to be composed of `fieldsetStyle` and `checkboxStyle`

## Styles

**CheckboxGroup** component has for classes `checkbox-group`, `checkbox-modality` and `checkbox-lunatic`.
