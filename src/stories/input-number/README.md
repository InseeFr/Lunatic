# InputNumber component

## Props

|      Props      |  Type  | Default value | Required | Description                          |
| :-------------: | :----: | :-----------: | :------: | ------------------------------------ |
|       id        | string |       -       |    ✓     | Id of the input                      |
|      label      | string |      " "      |          | Label of the input                   |
| preferences \*  | array  | ["COLLECTED"] |          | Preferences to manage input response |
|   response \*   | object |      {}       |          | Response concerned by the component  |
|       min       | number |   undefined   |          | Minimum of the input                 |
|       max       | number |   undefined   |          | Maximum of the input                 |
|    decimals     | number |       0       |          | Number of decimals of the input      |
|   placeholder   | string |      ""       |          | Placeholder of the input             |
|  handleChange   |  func  |       -       |    ✓     | Handler of the input                 |
|    readOnly     |  bool  |     false     |          | Is the input read only               |
|  autoComplete   |  bool  |     false     |          | Is the input autocompletable         |
|     focused     |  bool  |     false     |          | Is the input focused                 |
| declarations \* | array  |      [ ]      |          | Declarations of the input            |
|  labelPosition  | string |   "DEFAULT"   |          | Position of the input label          |
|    required     |  bool  |     false     |          | Is the input required                |
|     tooltip     |  bool  |     false     |          | Tooltip of the input                 |
|      style      | object |      {}       |          | Style of the input                   |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, valueState: object}`
- `declarations` are documented in the `Declarations` component

## Styles

**InputNumber** component has for classes `.input-lunatic`, `.warning` and `.lunatic-input-number-errors > error`.
