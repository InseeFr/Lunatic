# Datepicker component

## Props

|      Props      |  Type  | Default value | Required | Description                         |
| :-------------: | :----: | :-----------: | :------: | ----------------------------------- |
|       id        | string |       -       |    ✓     | Id of the datepicker                |
|      label      | string |       -       |    ✓     | Label of the datepicker             |
|  valueType \*   | string |  "COLLECTED"  |          | Value type of the response value    |
|   response \*   | object |       -       |    ✓     | Response concerned by the component |
|   placeholder   | string |      ""       |          | Placeholder of the datepicker       |
|  handleChange   |  func  |       -       |    ✓     | Handler of the datepicker           |
|    readOnly     |  bool  |     false     |          | Is the datepicker read only         |
|  labelPosition  | string |   "DEFAULT"   |          | Position of the datepicker label    |
|    required     |  bool  |     false     |          | Is the datepicker required          |
|     focused     |  bool  |     false     |          | Is the datepicker focused           |
| declarations \* | array  |      [ ]      |          | Declarations of the datepicker      |
|      style      | object |      {}       |          | Style of the datepicker             |

- `valueType` props has to be `COLLECTED`, `PREVIOUS`, `FORCED` , `EDITED` or `INPUTED`
- `response` props has to be a shape of `{name: string, valueState: object}`
- `declarations` are documented in the `Declarations` component

## Styles

**Datepicker** component has for classes `datepicker-lunatic`.
