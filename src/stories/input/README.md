# Input component

## Props

|      Props       |      Type      | Default value | Required | Description                          |
| :--------------: | :------------: | :-----------: | :------: | ------------------------------------ |
|        id        |     string     |       -       |    ✓     | Id of the input                      |
|      label       |     string     |      ""       |          | Label of the input                   |
|  preferences \*  |     array      | ["COLLECTED"] |          | Preferences to manage input response |
|   response \*    |     object     |      {}       |          | Response concerned by the component  |
|   placeholder    |     string     |      " "      |          | Placeholder of the input             |
|   handleChange   |      func      |       -       |    ✓     | Handler of the input                 |
|     readOnly     |      bool      |     false     |          | Is the input read only               |
|     disabled     |      bool      |     false     |          | Is the input disabled                |
|    maxLength     | number, string |    524 288    |          | Maximum length of the input          |
|   autoComplete   |      bool      |     false     |          | Is the input autocompletable         |
| labelPosition \* |     string     |   "DEFAULT"   |          | Position of the input label          |
|    mandatory     |      bool      |     false     |          | Is the input mandatory               |
|     focused      |      bool      |     false     |          | Is the input focused                 |
| declarations \*  |     array      |      []       |          | Declarations of the input            |
|     features     |     array      |      [ ]      |          | Component features for labels        |
|     bindings     |     object     |      [ ]      |          | Questionnaire bindings               |
|     tooltip      |      bool      |     false     |          | Tooltip of the input                 |
|      style       |     object     |      {}       |          | Style of the input                   |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, valueState: object}`
- `labelPosition` props has to be one of `DEFAULT`, `TOP`, `BOTTOM`, `RIGHT` or `LEFT`
- `declarations` are documented in the `Declarations` component

## Styles

**Input** component has for class `.input-lunatic`.
