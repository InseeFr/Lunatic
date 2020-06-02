# CheckboxOne component

## Props

|      Props      |  Type  |              Default value               | Required | Description                             |
| :-------------: | :----: | :--------------------------------------: | :------: | --------------------------------------- |
|       id        | string |                    -                     |    ✓     | Id of the checkbox                      |
|      label      | string |                    ""                    |          | Fieldset label of the checkbox          |
| preferences \*  | array  |              ["COLLECTED"]               |          | Preferences to manage checkbox response |
|   response \*   | object |                    {}                    |          | Response concerned by the component     |
|   options \*    | array  |                    -                     |    ✓     | Options of the checkbox                 |
|  handleChange   |  func  |                    -                     |    ✓     | Handler of the checkbox                 |
|    disabled     |  bool  |                  false                   |          | Is the checkbox options disabled        |
|     focused     |  bool  |                  false                   |          | Is the checkbox options focused         |
| positioning \*  | string |                "DEFAULT"                 |          | Checkbox options positioning            |
| declarations \* | array  |                    []                    |          | Declarations of the checkbox            |
|    features     | array  |                   [ ]                    |          | Component features for labels           |
|    bindings     | object |                   [ ]                    |          | Questionnaire bindings                  |
|   management    |  bool  |                  false                   |          | Management mode of the checkbox         |
|    style \*     | object | { fieldsetStyle: {}, modalityStyle: {} } |          | Style of the checkbox                   |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, values: object}`
- `options` props has to be an array made by objects with a shape of `{label: string, value: string}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component
- `style` props has to be composed of `fieldsetStyle` and `modalityStyle`

## Styles

**CheckboxOne** component has for classes `checkbox-group`, `checkbox-modality` and `checkbox-lunatic`.
