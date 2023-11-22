"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6173],{19414:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>c,metadata:()=>i,toc:()=>a});var o=s(85893),t=s(11151);const c={},r="Personnalisation",i={id:"hook/personnalisation",title:"Personnalisation",description:"Par d\xe9faut, les composants propos\xe9s par @inseefr/lunatic sont assez simples avec un style minimal. Vous pouvez personnaliser les champs avec votre propre CSS, mais pour des cas plus complexes, vous pouvez remplacer les composants de bases par vos propres composants \xe0 l'aide de l'option custom.",source:"@site/docs/hook/personnalisation.mdx",sourceDirName:"hook",slug:"/hook/personnalisation",permalink:"/Lunatic/docs/hook/personnalisation",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/hook/personnalisation.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Navigation",permalink:"/Lunatic/docs/hook/navigation"},next:{title:"Afficher le formulaire",permalink:"/Lunatic/docs/components/lunatic-components"}},l={},a=[{value:"Liste des composants personnalisables",id:"liste-des-composants-personnalisables",level:2},{value:"Base",id:"base",level:3},{value:"\xc9l\xe9ment de formulaire",id:"\xe9l\xe9ment-de-formulaire",level:3},{value:"Cases \xe0 cocher",id:"cases-\xe0-cocher",level:3},{value:"Menu d\xe9roulant",id:"menu-d\xe9roulant",level:3},{value:"Suggester",id:"suggester",level:3},{value:"Tableau",id:"tableau",level:3},{value:"Sequence",id:"sequence",level:3},{value:"Rond point",id:"rond-point",level:3},{value:"Sommaire",id:"sommaire",level:3},{value:"Autres",id:"autres",level:3},{value:"Composants racines",id:"composants-racines",level:3}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"personnalisation",children:"Personnalisation"}),"\n",(0,o.jsxs)(n.p,{children:["Par d\xe9faut, les composants propos\xe9s par ",(0,o.jsx)(n.code,{children:"@inseefr/lunatic"})," sont assez simples avec un style minimal. Vous pouvez personnaliser les champs avec votre propre CSS, mais pour des cas plus complexes, vous pouvez remplacer les composants de bases par vos propres composants \xe0 l'aide de l'option ",(0,o.jsx)(n.code,{children:"custom"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"const custom = {\n  Input: MyCustomInput,\n  InputNumber: MyCustomInputNumber,\n};\n\nfunction App({ source, data }) {\n  const {} = useLunatic(source, data, { custom });\n  // ...\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"liste-des-composants-personnalisables",children:"Liste des composants personnalisables"}),"\n",(0,o.jsx)(n.p,{children:"N'h\xe9sitez pas \xe0 regarder le type des propri\xe9t\xe9s des composants originaux."}),"\n",(0,o.jsx)(n.h3,{id:"base",children:"Base"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/button/lunatic-button.tsx",children:"Button"}),", Composant bouton."]}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/fieldset.tsx",children:"Fieldset"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/label/label.tsx",children:"Label"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/declarations/declaration.tsx",children:"Declaration"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/declarations/declarations.tsx",children:"Declarations"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"\xe9l\xe9ment-de-formulaire",children:"\xc9l\xe9ment de formulaire"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/component-set/html/component-set.tsx",children:"ComponentSet"})}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/input/html/input.tsx",children:"Input"}),", Champs texte avec label."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/textarea/html/textarea.tsx",children:"Textarea"}),", Champs texte multiligne avec label."]}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/datepicker/html/datepicker.tsx",children:"Datepicker"})}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/dropdown/html/dropdown.tsx",children:"Dropdown"}),", Menu d\xe9roulant simple."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/input-number/html/input-number.tsx",children:"InputNumber"}),", Champs num\xe9rique."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/modal/html/modal.tsx",children:"Modal"}),", Bo\xeete modale."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/switch/html/switch.tsx",children:"Switch"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"cases-\xe0-cocher",children:"Cases \xe0 cocher"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/checkbox/checkbox-boolean/html/checkbox-boolean.tsx",children:"CheckboxBoolean"}),", Case \xe0 cocher unique."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/checkbox/checkbox-group/html/checkbox-group.tsx",children:"CheckboxGroup"}),", Cases \xe0 cocher (chaque case correspondant \xe0 une r\xe9ponse)."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/checkbox/checkbox-one/html/checkbox-one.tsx",children:"CheckboxOne"}),", Cases \xe0 cocher (simule un radio d\xe9cochable)."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/checkbox/commons/checkbox-option.tsx",children:"CheckboxOption"}),", Sous composant repr\xe9sentant une case \xe0 cocher."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/radio/html/radio-group.tsx",children:"Radio"}),", Boutons radios."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/radio/html/radio-option.tsx",children:"RadioOption"}),", Boutons radios."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"menu-d\xe9roulant",children:"Menu d\xe9roulant"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/combo-box.tsx",children:"Combobox"}),", \xe9l\xe9ment contenant le champ et le label."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/combo-box-container.tsx",children:"ComboboxContainer"}),", \xe9l\xe9ment entourant le champ."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/combo-box-content-box.tsx",children:"ComboboxContentBox"}),", \xe9l\xe9ment entourant le champ."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/panel/combo-box-option.tsx",children:"ComboBoxOption"}),", \xe9l\xe9ment dans la liste d\xe9roulante"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/panel/panel-container.tsx",children:"ComboboxPanelContainer"}),", \xe9l\xe9ment repr\xe9sentant le menu d\xe9roulant."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/selection/clear-button.tsx",children:"ComboxClearButton"}),", bouton permettant de vider la s\xe9lection (croix par d\xe9faut)."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/selection/combo-box-label-selection.tsx",children:"ComboboxLabelSelection"}),", label repr\xe9sentant la valeur s\xe9lectionn\xe9e."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/combo-box/selection/input.tsx",children:"ComboboxInput"}),", champs permettant la recherche dans le menu d\xe9roulant."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"suggester",children:"Suggester"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/suggester/html/suggester.tsx",children:"Suggester"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/suggester/idb-suggester/suggester-notification.tsx",children:"SuggesterNotifcation"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/suggester/html/notification.tsx",children:"Notification"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"tableau",children:"Tableau"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/html-table/table.tsx",children:"Table"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/html-table/tbody.tsx",children:"Tbody"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/html-table/td.tsx",children:"Td"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/html-table/th.tsx",children:"Th"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/html-table/thead.tsx",children:"Thead"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/commons/components/html-table/tr.tsx",children:"Tr"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"sequence",children:"Sequence"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/sequence/html/sequence.tsx",children:"Sequence"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/subsequence/subsequence.tsx",children:"Subsequence"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"rond-point",children:"Rond point"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/roundabout",children:"Roundabout"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/roundabout/components/roundabout-it-title.tsx",children:"RoundaboutItTitle"})}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/roundabout/components/roundabout-container.tsx",children:"RoundaboutContainer"}),", \xe9l\xe9ment entourant le rond-point."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/roundabout/components/roundabout-it-button.tsx",children:"RoundaboutItButton"}),", bouton associ\xe9 \xe0 un \xe9l\xe9ment du rond-point."]}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/roundabout/components/roundabout-it-container.tsx",children:"RoundaboutItContainer"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/roundabout/components/roundabout-label.tsx",children:"RoundaboutLabel"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/roundabout/components/roundabout-pending.tsx",children:"RoundaboutPending"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"sommaire",children:"Sommaire"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/summary/html/summary-responses.tsx",children:"SummaryResponses"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/summary/html/summary-title.tsx",children:"SummaryTitle"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"autres",children:"Autres"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/filter-description/component.tsx",children:"FilterDescription"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/questions/question-context.tsx",children:"QuestionContext"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/questions/question-information.tsx",children:"QuestionInformation"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"composants-racines",children:"Composants racines"}),"\n",(0,o.jsx)(n.p,{children:"Ces composants sont assez haut niveau et contiennent souvent beaucoup de logique que vous devrez dupliquer. Aussi, ne les personnalisez qu'en dernier recours."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/radio/lunatic-radio-group.tsx",children:"LunaticRadioGroup"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/components/datepicker/lunatic-datepicker.tsx",children:"LunaticDatepicker"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}}}]);