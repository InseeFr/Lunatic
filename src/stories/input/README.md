# Input component

## Props

|      Props      |  Type  | Default value | Required | Description                 |
| :-------------: | :----: | :-----------: | :------: | --------------------------- |
|       id        | string |       -       |    ✓     | Id of the input             |
|      label      | string |       -       |    ✓     | Label of the input          |
|      value      | string |      " "      |          | Value of the input          |
|   placeholder   | string |      " "      |          | Placeholder of the input    |
|  handleChange   |  func  |       -       |    ✓     | Handler of the input        |
|    readOnly     |  bool  |     false     |          | Is the input read only      |
|  labelPosition  | string |   "DEFAULT"   |          | Position of the input label |
|    required     |  bool  |     false     |          | Is the input required       |
|     focused     |  bool  |     false     |          | Is the input focused        |
| declarations \* | array  |      [ ]      |          | Declarations of the input   |
|      style      | object |      {}       |          | Style of the input          |

- `declarations` are documented in the `Declarations` component

## Styles

**Input** component has for class `.input-lunatic`.
