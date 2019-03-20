# Textarea component

## Props

|      Props      |      Type      | Default value | Required | Description                    |
| :-------------: | :------------: | :-----------: | :------: | ------------------------------ |
|       id        |     string     |       -       |    ✓     | Id of the textarea             |
|      label      |     string     |       -       |    ✓     | Label of the textarea          |
|      value      |     number     |       -       |    ✓     | Value of the textarea          |
|      rows       |     number     |       5       |          | Number of rows of the textarea |
|    maxLength    | number, string |   Unlimited   |          | Maximum length of the textarea |
|   placeholder   |     string     |      ""       |          | Placeholder of the textarea    |
|  handleChange   |      func      |       -       |    ✓     | Handler of the textarea        |
|    readOnly     |      bool      |     false     |          | Is the textarea read only      |
|  labelPosition  |     string     |   "DEFAULT"   |          | Position of the textarea label |
|    required     |      bool      |     false     |          | Is the textarea required       |
| declarations \* |     array      |      [ ]      |          | Declarations of the textarea   |
|      style      |     object     |      {}       |          | Style of the textarea          |

- `declarations` are documented in the `Declarations` component

## Styles

**Textarea** component has for classes `textarea-lunatic`.
