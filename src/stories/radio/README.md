# Radio component

## Props

|       Props       |  Type  |             Default value             | Required | Description                            |
| :---------------: | :----: | :-----------------------------------: | :------: | -------------------------------------- |
|        id         | string |                   -                   |    ✓     | Id of the radio                        |
|       label       | string |                  ""                   |          | Fieldset label of the radio            |
|  preferences \*   | array  |             ["COLLECTED"]             |          | Preferences to manage radio response   |
|    response \*    | object |                  {}                   |          | Response concerned by the component    |
|    options \*     | array  |                  []                   |          | Options of the radio                   |
|   handleChange    |  func  |                   -                   |    ✓     | Handler of the radio                   |
|     disabled      |  bool  |                 false                 |          | Is the radio options disabled          |
|      focused      |  bool  |                 false                 |          | Is the radio options focused           |
| keyboardSelection |  bool  |                 false                 |          | Enable keyboard selection of the radio |
|  positioning \*   | string |               "DEFAULT"               |          | Checkbox options positioning           |
|  declarations \*  | array  |                  []                   |          | Declarations of the radio              |
|     features      | array  |                  [ ]                  |          | Component features for labels          |
|     bindings      | object |                  [ ]                  |          | Questionnaire bindings                 |
|      tooltip      |  bool  |                 false                 |          | Tooltip of the radio                   |
|     style \*      | object | { fieldsetStyle: {}, radioStyle: {} } |          | Style of the radio                     |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, valueState: object}`
- `options` props has to be an array made by objects with a shape of `{label: string, value: string}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component
- `style` props has to be composed of `fieldsetStyle` and `radioStyle`

## Styles

**CheckboxOne** component has for classes `radio-group`, `radio-modality` and `radio-lunatic`.
