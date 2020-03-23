# CheckboxGroup component

## Props

|       Props       |  Type  |              Default value               | Required | Description                               |
| :---------------: | :----: | :--------------------------------------: | :------: | ----------------------------------------- |
|        id         | string |                    -                     |    ✓     | Id of the checkbox                        |
|       label       | string |                    ""                    |          | Fieldset label of the checkbox            |
|  preferences \*   | array  |              ["COLLECTED"]               |          | Preferences to manage checkbox response   |
|   responses \*    | object |                    []                    |          | Responses concerned by the component      |
|   handleChange    |  func  |                    -                     |    ✓     | Handler of the checkbox                   |
|     disabled      |  bool  |                  false                   |          | Is the checkbox responses disabled        |
|      focused      |  bool  |                  false                   |          | Is the checkbox responses focused         |
| keyboardSelection |  bool  |                  false                   |          | Enable keyboard selection of the checkbox |
|  positioning \*   | string |                "DEFAULT"                 |          | CheckboxGroup responses positioning       |
|  declarations \*  | array  |                    []                    |          | Declarations of the checkbox              |
|     features      | array  |                   [ ]                    |          | Component features for labels             |
|     bindings      | object |                   [ ]                    |          | Questionnaire bindings                    |
|      tooltip      |  bool  |                  false                   |          | Tooltip of the input                      |
|     style \*      | object | { fieldsetStyle: {}, modalityStyle: {} } |          | Style of the checkbox                     |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `responses` props has to be an array of shape of `{id: string, label: string, response: {name: string, valueState: object}}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component
- `style` props has to be composed of `fieldsetStyle` and `modalityStyle`

## Styles

**CheckboxGroup** component has for classes `checkbox-group`, `checkbox-modality` and `checkbox-lunatic`.
