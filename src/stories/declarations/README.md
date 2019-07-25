# Declarations component

## Props

|      Props      |  Type  |     Default value     | Required | Description                                    |
| :-------------: | :----: | :-------------------: | :------: | ---------------------------------------------- |
|       id        | string |           -           |    ✓     | Id of the declarations                         |
|      type       | string | 'AFTER_QUESTION_TEXT' |          | Type of the selected position for declarations |
| declarations \* | number |          [ ]          |          | Array of declaration                           |

- `declarations` props has to be an array made by objects with a shape of `{id : string, label: string, position: position *, declarationType: declarationType *}`
- `position` props has to be `BEFORE_QUESTION_TEXT`, `AFTER_QUESTION_TEXT` or `DETACHABLE`
- `declarationType` props has to be `INSTRUCTION`, `COMMENT`, `HELP`, `WARNING`, `MESSAGE_FILTER` or `STATEMENT`

## Styles

**Declarations** component has for classes `.declarations-lunatic`, `.declaration-lunatic`, `.declaration-instruction`, `.declaration-comment`, `.declaration-help`, `.declaration-warning` and `.declaration-message-filter`.
