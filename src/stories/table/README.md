# Table component

## Props

|      Props      |  Type  | Default value | Required | Description                        |
| :-------------: | :----: | :-----------: | :------: | ---------------------------------- |
|       id        | string |       -       |    ✓     | Id of the table                    |
|      label      | string |       -       |    ✓     | Label of the table                 |
|     axis \*     | array  |       -       |    ✓     | Axis options of the table          |
|   columns \*    | array  |       -       |    ✓     | Column specifications of the table |
| positioning \*  | string |   "DEFAULT"   |          | Table options positioning          |
|    readOnly     |  bool  |     false     |          | Is the table options read only     |
|     focused     |  bool  |     false     |          | Is the table options focused       |
| declarations \* | array  |      [ ]      |          | Declarations of the table          |
|      style      | object |      {}       |          | Style of the table                 |

- `columns` props has to be an array made by objects with a shape of `{id: string, title: string, componentType: string, options: {label: string, value: string}}`
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component

## Styles

**Table** component has for class `table-lunatic`.
