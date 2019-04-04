# CheckboxBoolean component

## Props

|      Props      |  Type   | Default value | Required | Description                    |
| :-------------: | :-----: | :-----------: | :------: | ------------------------------ |
|       id        | string  |       -       |    ✓     | Id of the checkbox             |
|      label      | string  |      ""       |          | Fieldset label of the checkbox |
|      value      | boolean |     false     |          | Value of the checkbox          |
|  handleChange   |  func   |       -       |    ✓     | Handler of the checkbox        |
|    disabled     |  bool   |     false     |          | Is the checkbox item disabled  |
|     focused     |  bool   |     false     |          | Is the checkbox item focused   |
| positioning \*  | string  |   "DEFAULT"   |          | Checkbox item positioning      |
| declarations \* |  array  |      [ ]      |          | Declarations of the checkbox   |
|      style      | object  |      { }      |          | Style of the checkbox          |

- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component

## Styles

**CheckboxBoolean** component has for classes `checkbox-lunatic`, `checkbox-lunatic-no-margin` and `checkbox-modality`.
