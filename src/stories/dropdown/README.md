# Dropdown component

## Props

|      Props      |  Type  | Default value | Required | Description                    |
| :-------------: | :----: | :-----------: | :------: | ------------------------------ |
|       id        | string |       -       |    ✓     | Id of the dropdown             |
|      label      | string |      ""       |          | Fieldset label of the dropdown |
|   options \*    | array  |       -       |    ✓     | Options of the dropdown        |
|  handleChange   |  func  |       -       |    ✓     | Handler of the dropdown        |
|   placeholder   | string |      ""       |          | Placeholder of the dropdown    |
|    readOnly     |  bool  |     false     |          | Is the dropdown read only      |
|    writable     |  bool  |     false     |          | Is the dropdown writable       |
|    required     |  bool  |     false     |          | Is the dropdown required       |
|  labelPosition  | string |   "DEFAULT"   |          | Position of the dropdown label |
| declarations \* | array  |      [ ]      |          | Declarations of the dropdown   |
|      style      | object |      { }      |          | Style of the dropdown          |

- `options` props has to be an array made by objects with a shape of `{label: string, value: string}`
- `declarations` are documented in the `Declarations` component

## Styles

**Dropdown** component has for classes XXX
