# Radio component

## Props

|     Props      |  Type  |             Default value             | Required | Description                 |
| :------------: | :----: | :-----------------------------------: | :------: | --------------------------- |
|       id       | string |                   -                   |    ✓     | Id of the radio             |
|     label      | string |                  ""                   |          | Fieldset label of the radio |
|  selectValue   | string |                  ""                   |          | Value of the radio          |
|   options \*   | array  |                   -                   |    ✓     | Options of the radio        |
|  handleChange  |  func  |                   -                   |    ✓     | Handler of the radio        |
|    disabled    |  bool  |                 false                 |          | Is the radio items disabled |
| positioning \* | string |               "DEFAULT"               |          | Checkbox items positioning  |
|    style \*    | object | { fieldsetStyle: {}, radioStyle: {} } |          | Style of the radio          |

- `options` props has to be an array made by objects with a shape of `{label: string, value: string}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `style` props has to be composed of `fieldsetStyle` and `radioStyle`

## Styles

**CheckboxOne** component has for classes `radio-group`, `radio-modality` and `radio-lunatic`.
