# Dropdown component

## Props

|      Props       |  Type  | Default value | Required | Description                                          |
| :--------------: | :----: | :-----------: | :------: | ---------------------------------------------------- |
|        id        | string |       -       |    ✓     | Id of the dropdown                                   |
|      label       | string |      ""       |          | Label of the dropdown                                |
|  preferences \*  | array  | ["COLLECTED"] |          | Preferences to manage dropdown response              |
|   response \*    | object |      {}       |          | Response concerned by the component                  |
|    options \*    | array  |       -       |    ✓     | Options of the dropdown                              |
|   handleChange   |  func  |       -       |    ✓     | Handler of the dropdown                              |
| placeholderList  | string |      ""       |          | Placeholder of the dropdown                          |
|     disabled     |  bool  |     false     |          | Is the dropdown disabled                             |
|     writable     |  bool  |     false     |          | Is the dropdown writable                             |
|    mandatory     |  bool  |     false     |          | Is the dropdown mandatory                            |
|    widthAuto     |  bool  |     false     |          | Add the width-auto props for options of the Dropdown |
| labelPosition \* | string |   "DEFAULT"   |          | Position of the dropdown label                       |
| declarations \*  | array  |      []       |          | Declarations of the dropdown                         |
|     features     | array  |      [ ]      |          | Component features for labels                        |
|     bindings     | object |      [ ]      |          | Questionnaire bindings                               |
|    management    |  bool  |     false     |          | Management mode of the dropdown                      |
|      zIndex      | number |       0       |          | z-index of the dropdown                              |
|      style       | object |      {}       |          | Style of the dropdown                                |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, values: object}`
- `options` props has to be an array made by objects with a shape of `{label: string, value: string}`
- `labelPosition` props has to be one of `DEFAULT`, `TOP`, `BOTTOM`, `RIGHT` or `LEFT`
- `declarations` are documented in the `Declarations` component

## Styles

**Dropdown** component has cascade classes:

- `lunatic-dropdown`
- `lunatic-dropdown-container`
- `lunatic-dropdown-content`
- `lunatic-dropdown-input`
- `lunatic-icon`
- `lunatic-transition`
- `lunatic-dropdown-panel`
- `lunatic-dropdown-option`
- `lunatic-prefix`
