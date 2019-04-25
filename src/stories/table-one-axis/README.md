# TableOneAxis component

## Props

|      Props      |  Type  | Default value | Required | Description                        |
| :-------------: | :----: | :-----------: | :------: | ---------------------------------- |
|       id        | string |       -       |    ✓     | Id of the table                    |
|      label      | string |       -       |    ✓     | Label of the table                 |
|     axis \*     | array  |       -       |    ✓     | Axis options of the table          |
|   columns \*    | array  |       -       |    ✓     | Column specifications of the table |
| positioning \*  | string |   "DEFAULT"   |          | Table items positioning            |
|    readOnly     |  bool  |     false     |          | Is the table items read only       |
|     focused     |  bool  |     false     |          | Is the table items focused         |
| declarations \* | array  |      [ ]      |          | Declarations of the table          |
|      style      | object |      {}       |          | Style of the table                 |

- `axis` props has to be an array made by objects with a shape of `{label: string, value: string}`
- `columns` props has to be an array made by objects with a shape of `{id: string, title: string, componentType: string, options: {label: string, value: string}}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component

## Styles

**TableOneAxis** component has for class `table-lunatic`.
