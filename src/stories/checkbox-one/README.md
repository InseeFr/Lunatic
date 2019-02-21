# CheckboxOne component

## Props

|     Props      |  Type  |              Default value               | Required | Description                    |
| :------------: | :----: | :--------------------------------------: | :------: | ------------------------------ |
|       id       | string |                    -                     |    ✓     | Id of the checkbox             |
|     label      | string |                    ""                    |          | Fieldset label of the checkbox |
|  selectValue   | string |                    ""                    |          | Value of the checkbox          |
|   options \*   | array  |                    -                     |    ✓     | Options of the checkbox        |
|  handleChange  |  func  |                    -                     |    ✓     | Handler of the checkbox        |
|    disabled    |  bool  |                  false                   |          | Is the checkbox items disabled |
| positioning \* | string |                "DEFAULT"                 |          | Checkbox items positioning     |
|    style \*    | object | { fieldsetStyle: {}, checkboxStyle: {} } |          | Style of the checkbox          |

- `options` props has to be an array made by objects with a shape of `{label: string, value: string}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `style` props has to be composed of `fieldsetStyle` and `checkboxStyle`

## Styles

**CheckboxOne** component has for classes `lunatic-input-number > (.input-lunatic .warning)` and `.lunatic-input-number-errors > error`.
