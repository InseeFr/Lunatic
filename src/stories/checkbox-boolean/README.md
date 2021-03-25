# CheckboxBoolean component

## Props

|      Props      |  Type  | Default value | Required | Description                             |
| :-------------: | :----: | :-----------: | :------: | --------------------------------------- |
|       id        | string |       -       |    ✓     | Id of the checkbox                      |
|      label      | string |      ""       |          | Fieldset label of the checkbox          |
| preferences \*  | array  | ["COLLECTED"] |          | Preferences to manage checkbox response |
|   response \*   | object |      { }      |          | Response concerned by the component     |
|  handleChange   |  func  |       -       |    ✓     | Handler of the checkbox                 |
|    disabled     |  bool  |     false     |          | Is the checkbox item disabled           |
| positioning \*  | string |   "DEFAULT"   |          | Checkbox item positioning               |
|     focused     |  bool  |     false     |          | Is the checkbox item focused            |
| declarations \* | array  |      [ ]      |          | Declarations of the checkbox            |
|    features     | array  |      [ ]      |          | Component features for labels           |
|    bindings     | object |      [ ]      |          | Questionnaire bindings                  |
|   management    |  bool  |     false     |          | Management mode of the checkbox         |
|      style      | object |      { }      |          | Style of the checkbox                   |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, values: object}`
- `declarations` are documented in the `Declarations` component

## Styles

**CheckboxBoolean** component has for classes `checkbox-lunatic` and `checkbox-boolean-modality`.
