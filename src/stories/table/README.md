# Table component

## Props

|      Props      |  Type  | Default value | Required | Description                           |
| :-------------: | :----: | :-----------: | :------: | ------------------------------------- |
|       id        | string |       -       |    ✓     | Id of the table                       |
|      label      | string |      ""       |          | Label of the table                    |
| preferences \*  | array  | ["COLLECTED"] |          | Preferences to manage table response  |
|    cells \*     | array  |      []       |          | Table cells                           |
|  handleChange   |  func  |       -       |    ✓     | Handler of the table                  |
|      lines      | object |      {}       |          | Min and max lines for evolutive table |
| declarations \* | array  |      []       |          | Declarations of the table             |
|     tooltip     |  bool  |     false     |          | Tooltip of the table                  |
|      style      | object |      {}       |          | Style of the table                    |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `cells` props has to be an array of array's components
- `declarations` are documented in the `Declarations` component

## Styles

**Table** component has for class `table-lunatic`.
