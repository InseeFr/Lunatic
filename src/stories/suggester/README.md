# Suggester component

## Props

|      Props       |  Type  |              Default value               | Required | Description                              |
| :--------------: | :----: | :--------------------------------------: | :------: | ---------------------------------------- |
|        id        | string |                    -                     |    ✓     | Id of the suggester                      |
|      label       | string |                    ""                    |          | Fieldset label of the suggester          |
|  preferences \*  | array  |              ["COLLECTED"]               |          | Preferences to manage suggester response |
|   response \*    | object |                    {}                    |          | Response concerned by the component      |
|   handleChange   |  func  |                    -                     |    ✓     | Handler of the suggester                 |
|     disabled     |  bool  |                  false                   |          | Is the suggester options disabled        |
|     focused      |  bool  |                  false                   |          | Is the suggester options focused         |
| declarations \*  | array  |                    []                    |          | Declarations of the suggester            |
|     features     | array  |                   [ ]                    |          | Component features for labels            |
|     bindings     | object |                   [ ]                    |          | Questionnaire bindings                   |
|    management    |  bool  |                  false                   |          | Management mode of the suggester         |
| labelPosition \* | string |                "DEFAULT"                 |          | Position of the input label              |
|       path       | string |                    -                     |    ✓     | Path to data into indexdb                |
|     style \*     | object | { fieldsetStyle: {}, modalityStyle: {} } |          | Style of the suggester                   |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, values: object}`
- `labelPosition` props has to be one of `DEFAULT`, `TOP`, `BOTTOM`, `RIGHT` or `LEFT`
- `declarations` are documented in the `Declarations` component

## Styles

**Suggester** component has for classes XXX.
