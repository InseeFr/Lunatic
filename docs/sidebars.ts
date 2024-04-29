import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'hook useLunatic()',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: ['hook/parameters', 'hook/return', 'hook/navigation', "hook/controls"],
    },
    'components/lunatic-components',
    "components/personnalisation",
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
            'components/decorations/question',
            'components/decorations/filter-description',
            'components/decorations/table',
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
