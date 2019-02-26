# CheckboxBoolean component

## Props

|     Props      |  Type  | Default value | Required | Description                    |
| :------------: | :----: | :-----------: | :------: | ------------------------------ |
|       id       | string |       -       |    ✓     | Id of the checkbox             |
|     label      | string |      ""       |          | Fieldset label of the checkbox |
|    value \*    | number |       0       |          | Value of the checkbox          |
|  handleChange  |  func  |       -       |    ✓     | Handler of the checkbox        |
|    disabled    |  bool  |     false     |          | Is the checkbox items disabled |
| positioning \* | string |   "DEFAULT"   |          | Checkbox items positioning     |
|     style      | object |      { }      |          | Style of the checkbox          |

- `value` props has to be 0 or 1
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`

## Styles

**CheckboxBoolean** component has for classes `checkbox-lunatic`, `checkbox-lunatic-no-margin` and `checkbox-modality`.
