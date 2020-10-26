# LoopConstructor component

`RosterForLoop` is a LoopConstructor component.

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
|    features     | array  |      [ ]      |          | Component features for labels         |
|    bindings     | object |      [ ]      |          | Questionnaire bindings                |
| positioning \*  | string |   "DEFAULT"   |          | Cell options positioning              |
|   addBtnLabel   | string | "Add a line"  |          | Label of the button to add lines      |
|     hideBtn     |  bool  |     false     |          | Hide the add button                   |
|   management    |  bool  |     false     |          | Management mode of the table          |
|      style      | object |      {}       |          | Style of the table                    |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `cells` props has to be an array of array's components
- `positioning` props has to be one of `DEFAULT`, `HORIZONTAL` or `VERTICAL`
- `declarations` are documented in the `Declarations` component
