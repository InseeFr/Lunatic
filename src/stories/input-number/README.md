# InputNumber component

## Props

|     Props     |  Type  |      Default value      | Required | Description                     |
| :-----------: | :----: | :---------------------: | :------: | ------------------------------- |
|      id       | string |            -            |    ✓     | Id of the input                 |
|     label     | string |            -            |    ✓     | Label of the input              |
|     value     | number |            -            |    ✓     | Value of the input              |
|      min      | number |            0            |          | Minimum of the input            |
|      max      | number | Number.MAX_SAFE_INTEGER |          | Maximum of the input            |
|   decimals    | number |            0            |          | Number of decimals of the input |
|  placeholder  | string |           ""            |          | Placeholder of the input        |
| handleChange  |  func  |            -            |    ✓     | Handler of the input            |
|   readOnly    |  bool  |          false          |          | Is the input read only          |
| labelPosition | string |        "DEFAULT"        |          | Position of the input label     |
|   required    |  bool  |          false          |          | Is the input required           |
|     style     | object |           {}            |          | Style of the input              |

## Styles

**InputNumber** component has for classes `lunatic-input-number > (.input-lunatic .warning)` and `.lunatic-input-number-errors > error`.
