// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'hook useLunatic()',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: ['hook/options', 'hook/return', 'hook/navigation', 'hook/personnalisation'],
    },
    'components/lunatic-components',
    {
      type: 'category',
      label: 'Composants',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'components/base',
        {
          type: 'category',
          label: 'Balisage',
          link: {
            description:
              "Ces composants offrent des indication visuels pour aider l'utilisateur à s'orienter dans le formulaire",
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'components/decorations/sequence',
            'components/decorations/question-info',
            'components/decorations/question-context',
            'components/decorations/question-explication',
            'components/decorations/filter-description',
            'components/decorations/table',
            'components/decorations/confirmationModal',
          ],
        },
        {
          type: 'category',
          label: 'Champs',
          link: {
            description: "Ces composants permettent à l'utilisateur d'entrée des informations",
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'components/fields/input',
            'components/fields/input-number',
            'components/fields/textarea',
            'components/fields/datepicker',
            'components/fields/dropdown',
            'components/fields/suggester',
            'components/fields/radio',
            'components/fields/checkboxOne',
            'components/fields/checkboxBoolean',
            'components/fields/checkboxGroup',
          ],
        },
        {
          type: 'category',
          label: 'Agrégateurs',
          link: {
            description: "Ces composants permettent d'agréger des informations complexes",
            type: 'generated-index',
          },
          collapsed: true,
          items: [
              'components/aggregators/loop',
              'components/aggregators/rosterForLoop',
              'components/aggregators/componentSet',
              'components/aggregators/roundabout',
              'components/aggregators/pairwise'
          ],
        },
      ],
    },
      "vtl",
    {
      type: 'category',
      label: 'Fonctionnement interne',
      link: {
        description: "Cette section décrit le fonctionnement interne de Lunatic",
        type: 'generated-index',
      },
      items: ['internal/reducer', 'internal/resizing', 'internal/cleaning', 'internal/missing']
    }
  ],
};

export default sidebars;
