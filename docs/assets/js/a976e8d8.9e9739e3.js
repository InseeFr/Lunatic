(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2929],{2471:(e,n,t)=>{"use strict";t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>u,default:()=>g,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var o=t(4848),r=t(8453),a=t(1415),s=t(8094);const i=JSON.parse('{"maxPage":"4","components":[{"id":"how","componentType":"InputNumber","mandatory":false,"page":"1","min":1,"max":10,"decimals":0,"label":{"value":"\\"Combien de personnes vivent habituellement \xe0 votre adresse ?\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"NB_HAB"}},{"id":"loop","componentType":"Loop","page":"2","depth":1,"paginatedLoop":false,"conditionFilter":{"value":"true","type":"VTL"},"loopDependencies":["NHAB"],"lines":{"min":{"value":"NB_HAB","type":"VTL"},"max":{"value":"NB_HAB","type":"VTL"}},"components":[{"id":"prenom","componentType":"Input","mandatory":false,"maxLength":20,"label":{"value":"\\"Pr\xe9nom\\"))","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"PRENOMS"}},{"id":"age","componentType":"InputNumber","maxLength":3,"label":{"value":"\\"Age\\"))","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"AGE"}}]},{"id":"roundabout","componentType":"Roundabout","page":"3","conditionFilter":{"value":"true","type":"VTL"},"iterations":{"value":"NB_HAB","type":"VTL"},"label":{"value":"\\"Libell\xe9 du rondpoint\\"","type":"VTL"},"locked":true,"expressions":{"unnecessary":{"value":"AGE < 13","type":"VTL"},"complete":{"value":"COMPLETE","type":"VTL"},"partial":{"value":"PARTIAL","type":"VTL"},"label":{"value":"\\"S\xe9rie de question pour \\" || PRENOMS","type":"VTL"}},"controls":[],"components":[{"id":"radio","componentType":"Radio","mandatory":false,"page":"3.1","label":{"value":"\\"Connaissez-vous le recensement de la population ?\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"options":[{"value":"1","label":{"value":"\\"oui\\"","type":"VTL|MD"}},{"value":"2","label":{"value":"\\"non\\"","type":"VTL|MD"}}],"response":{"name":"KNOWREC"}},{"id":"jsygk7m7","componentType":"Subsequence","page":"3.2","label":{"value":"\\"Deuxi\xe8me page de questions pour \\"|| PRENOMS","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"}},{"id":"sexe","componentType":"Radio","page":"3.2","label":{"value":"\\"Sexe\\"","type":"VTL"},"conditionFilter":{"value":"true","type":"VTL"},"options":[{"value":"1","label":{"value":"\\"Homme\\"","type":"VTL|MD"}},{"value":"2","label":{"value":"\\"Femme\\"","type":"VTL|MD"}}],"response":{"name":"SEXE"}},{"id":"jsygk7m7","componentType":"Subsequence","page":"3.3","label":{"value":"\\"Troisi\xe8me page de questions \\" || PRENOMS","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"}},{"id":"kmno1n7m","componentType":"Input","maxLength":30,"page":"3.3","label":{"value":"\\"Dites quelque chose.\\"))","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"SOMETHING"}}]},{"id":"seq","componentType":"Sequence","label":{"value":"\\"Merci !\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"4"}],"variables":[{"variableType":"COLLECTED","name":"NB_HAB","values":{"PREVIOUS":null,"COLLECTED":2,"FORCED":null,"EDITED":null,"INPUTTED":null}},{"variableType":"COLLECTED","name":"SOMETHING","values":{"PREVIOUS":[null],"COLLECTED":[null],"FORCED":[null],"EDITED":[null],"INPUTTED":[null]}},{"variableType":"COLLECTED","name":"AGE","values":{"PREVIOUS":null,"COLLECTED":[15,15],"FORCED":null,"EDITED":null,"INPUTTED":null}},{"variableType":"COLLECTED","name":"SEXE","values":{"PREVIOUS":[null],"COLLECTED":[null],"FORCED":[null],"EDITED":[null],"INPUTTED":[null]}},{"variableType":"COLLECTED","name":"PRENOMS","values":{"PREVIOUS":null,"COLLECTED":["Fanny","Ines"],"FORCED":null,"EDITED":null,"INPUTTED":null}},{"variableType":"COLLECTED","name":"KNOWREC","values":{"PREVIOUS":[null],"COLLECTED":[null],"FORCED":[null],"EDITED":[null],"INPUTTED":[null]}},{"variableType":"CALCULATED","name":"PRENOMREF","expression":{"value":"first_value(PRENOMS over())","type":"VTL"},"bindingDependencies":["PRENOMS"],"inFilter":"true"},{"variableType":"CALCULATED","name":"COMPLETE","expression":{"value":"not(isnull(KNOWREC)) and not(isnull(SEXE)) and not(isnull(SOMETHING))","type":"VTL"},"bindingDependencies":["KNOWREC","SEXE","SOMETHING"],"shapeFrom":"PRENOMS","inFilter":"true"},{"variableType":"CALCULATED","name":"PARTIAL","expression":{"value":"not(isnull(KNOWREC)) or not(isnull(SEXE)) or not(isnull(SOMETHING))","type":"VTL"},"bindingDependencies":["KNOWREC","SEXE","SOMETHING"],"shapeFrom":"PRENOMS","inFilter":"true"}],"resizing":{"NB_HAB":{"size":"NB_HAB","variables":["PRENOMS","AGE","SEXE","SOMETHING","DATNAIS"]}}}'),l={},u="Roundabout",c={id:"components/aggregators/roundabout",title:"Roundabout",description:"Ce composant se comporte comme une boucle avec une page carrefour qui permet de sauter \xe0 n'importe quelle it\xe9ration.",source:"@site/docs/components/aggregators/roundabout.mdx",sourceDirName:"components/aggregators",slug:"/components/aggregators/roundabout",permalink:"/Lunatic/docs/components/aggregators/roundabout",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/components/aggregators/roundabout.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"RosterForLoop",permalink:"/Lunatic/docs/components/aggregators/rosterForLoop"},next:{title:"PairwiseLinks",permalink:"/Lunatic/docs/components/aggregators/pairwise"}},p={},d=[{value:"Navigation",id:"navigation",level:2}];function m(e){const n={h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"roundabout",children:"Roundabout"}),"\n",(0,o.jsx)(n.p,{children:"Ce composant se comporte comme une boucle avec une page carrefour qui permet de sauter \xe0 n'importe quelle it\xe9ration."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"components"}),", tableau contenant les composants enfant \xe0 cette boucle"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"iterations"}),", expression VTL permettant de calculer le nombre d'it\xe9rations"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"expressions"}),", un objet contenant les diff\xe9rents libell\xe9s \xe0 afficher pour chaque \xe9l\xe9ment du rond point","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"unnecessary"}),', condition d\'affichage du libell\xe9 "Non concern\xe9" sur le bouton (expression VTL)']}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"complete"}),', condition d\'affichage du libell\xe9 "Compl\xe9t\xe9" sur le bouton (expression VTL)']}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"partial"}),', condition d\'affichage du libell\xe9 "Modifier" sur le bouton (expression VTL)']}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"label"}),", libell\xe9 \xe0 afficher au dessus du bouton (expression VTL)"]}),"\n"]}),"\n"]}),"\n"]}),"\n","\n",(0,o.jsx)(s.e,{type:"ComponentRoundaboutType"}),"\n","\n",(0,o.jsx)(a.L,{source:i,options:{initialPage:"3"}}),"\n",(0,o.jsx)(n.h2,{id:"navigation",children:"Navigation"}),"\n",(0,o.jsx)(n.p,{children:"Si le rond-point ne contient qu'un seul \xe9l\xe9ment, il se comporte alors comme une boucle pagin\xe9e. En revanche s'il a plus d'un \xe9l\xe9ment certains comportement changent par rapport \xe0 une boucle pagin\xe9e."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Lors de l'arriv\xe9e sur le rond-point, on n'est pas redirig\xe9 automatiquement sur la premi\xe8re it\xe9ration. On propose \xe0 l'utilisateur de choisir l'it\xe9ration sur laquelle il souhaite aller."}),"\n",(0,o.jsx)(n.li,{children:"\xc0 la fin d'une s\xe9quence, on n'est pas amen\xe9 \xe0 l'it\xe9ration suivante, on revient \xe0 la page d'accueil du rond-point."}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Ce comportement fonctionne dans les 2 sens de navigation."})]})}function g(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},1415:(e,n,t)=>{"use strict";t.d(n,{L:()=>d});const o={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var r=t(9489),a=t(7227),s=t(2250);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\nimport '@inseefr/lunatic/lib/main.css'\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",l="import {\n  type LunaticData,\n  type LunaticSource,\n  type LunaticState,\n  useLunatic,\n  LunaticComponents,\n  ModalControls,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: LunaticState['pageTag']},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1' as LunaticState['pageTag'],\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <ModalControls\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var u=t(9813),c=t(4848);const p={};function d(e){let{source:n,data:d=p,options:m}=e;const g=n.maxPage&&"1"!==n.maxPage;return(0,c.jsxs)("div",{className:o.FormExample,children:[(0,c.jsxs)(r.A,{children:[(0,c.jsx)(a.A,{value:"source",label:"Source",default:!0,children:(0,c.jsx)(s.A,{language:"json",className:o.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,c.jsx)(a.A,{value:"data",label:"Data",children:(0,c.jsx)(s.A,{language:"json",className:o.FormExampleCode,children:JSON.stringify(d,null,2)})})]}),(0,c.jsxs)(r.A,{children:[(0,c.jsx)(a.A,{value:"code",label:"Code",children:(0,c.jsx)(s.A,{language:"tsx",className:o.FormExampleCode,children:g?l:i})}),(0,c.jsx)(a.A,{value:"render",label:"Rendu",default:!0,children:(0,c.jsx)("div",{className:o.FormExampleRender,children:(0,c.jsx)(u.A,{fallback:(0,c.jsx)("div",{children:"Loading..."}),children:()=>{const e=g?t(2937).g:t(7171).S;return(0,c.jsx)(e,{source:n,data:d,options:m})}})})})]})]})}},7171:(e,n,t)=>{"use strict";t.d(n,{S:()=>a});var o=t(2612),r=t(4848);function a(e){let{source:n,data:t}=e;const{getComponents:a,Provider:s}=(0,o.O1)(n,t,{initialPage:"1"});return(0,r.jsx)(s,{children:(0,r.jsx)(o.R2,{components:a()})})}},2937:(e,n,t)=>{"use strict";t.d(n,{g:()=>s});var o=t(2612),r=t(6540),a=t(4848);function s(e){let{source:n,data:t,options:s}=e;const{getComponents:i,isLastPage:l,isFirstPage:u,goPreviousPage:c,goNextPage:p,Provider:d,compileControls:m}=(0,o.O1)(n,t,{initialPage:"1",...s}),[g,E]=(0,r.useState)();return(0,a.jsxs)("div",{children:[(0,a.jsx)(d,{children:(0,a.jsx)(o.R2,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,a.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,a.jsx)("button",{className:"button button--primary",disabled:u,onClick:c,children:"Pr\xe9c\xe9dent"}),(0,a.jsx)("button",{className:"button button--primary",disabled:l,onClick:()=>{const e=m();e.currentErrors?E(e):p()},children:"Suivant"})]}),g&&(0,a.jsx)(o.I1,{errors:g.currentErrors,goNext:()=>{E(void 0),p()},onClose:()=>{E(void 0)},isCritical:g.isCritical})]})}},8094:(e,n,t)=>{"use strict";t.d(n,{e:()=>r});var o=t(4848);function r(e){let{type:n}=e;const t=`https://github.com/search?q=repo%3AInseeFr%2FLunatic+%22export+type+${n}%22&type=code`;return(0,o.jsxs)("a",{className:"button button--secondary",style:{display:"inline-flex",alignItems:"center",gap:".3rem"},href:t,target:"_blank",rel:"noopener noreferrer",children:["Voir le type",(0,o.jsx)("svg",{width:"13.5",height:"13.5","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",children:(0,o.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})}},5053:()=>{},5843:()=>{}}]);