# Input component

## Props

|      Props       |  Type  | Default value | Required | Description                          |
| :--------------: | :----: | :-----------: | :------: | ------------------------------------ |
|        id        | string |       -       |    ✓     | Id of the input                      |
|      label       | string |      ""       |          | Label of the input                   |
|  preferences \*  | array  | ["COLLECTED"] |          | Preferences to manage input response |
|   response \*    | object |      {}       |          | Response concerned by the component  |
|   placeholder    | string |      " "      |          | Placeholder of the input             |
|   handleChange   |  func  |       -       |    ✓     | Handler of the input                 |
|     readOnly     |  bool  |     false     |          | Is the input read only               |
|   autoComplete   |  bool  |     false     |          | Is the input autocompletable         |
| labelPosition \* | string |   "DEFAULT"   |          | Position of the input label          |
|     required     |  bool  |     false     |          | Is the input required                |
|     focused      |  bool  |     false     |          | Is the input focused                 |
| declarations \*  | array  |      []       |          | Declarations of the input            |
|     tooltip      |  bool  |     false     |          | Tooltip of the input                 |
|      style       | object |      {}       |          | Style of the input                   |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, valueState: object}`
- `labelPosition` props has to be one of `DEFAULT`, `TOP`, `BOTTOM`, `RIGHT` or `LEFT`
- `declarations` are documented in the `Declarations` component

## Styles

**Input** component has for class `.input-lunatic`.
