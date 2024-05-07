(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5791],{1999:(e,n,o)=>{"use strict";o.r(n),o.d(n,{assets:()=>p,contentTitle:()=>c,default:()=>g,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var t=o(4848),r=o(8453),s=o(1415),a=o(8094);const i=JSON.parse('{"$schema":"../../../lunatic-schema.json","maxPage":"3","components":[{"id":"seq","componentType":"Sequence","label":{"value":"\\"Description des individus de votre logement\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"1"},{"id":"loop-prenom","componentType":"RosterForLoop","header":[{"headerCell":true,"label":{"value":"Pr\xe9nom","type":"VTL"}},{"headerCell":true,"label":{"value":"Age","type":"VTL"}}],"label":{"value":"\\"Ajouter un individu\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"bindingDependencies":["PRENOM","AGE"],"lines":{"min":{"value":"1","type":"VTL"},"max":{"value":"10","type":"VTL"}},"page":"1","components":[{"componentType":"Input","conditionFilter":{"value":"true","type":"VTL"},"maxLength":30,"bindingDependencies":["PRENOM"],"id":"prenom","response":{"name":"PRENOM"}},{"componentType":"Input","conditionFilter":{"value":"true","type":"VTL"},"maxLength":30,"bindingDependencies":["AGE"],"id":"age","response":{"name":"AGE"}}]},{"id":"loop","componentType":"Loop","loopDependencies":["PRENOM"],"iterations":{"value":"count(PRENOM)","type":"VTL"},"page":"2","maxPage":"1","depth":1,"paginatedLoop":true,"conditionFilter":{"value":"true","type":"VTL"},"components":[{"id":"age","label":{"value":"PRENOM || \\", quel est v\xf4tre \xe2ge ?\\"","type":"VTL"},"conditionFilter":{"value":"true","type":"VTL"},"page":"2.1","componentType":"InputNumber","min":0,"max":120,"decimals":0,"response":{"name":"AGE"}}]},{"id":"seq-end","componentType":"Sequence","label":{"value":"\\"End\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"3"}],"resizing":{"PRENOM":{"size":"count(PRENOM)","variables":["AGE"]}},"variables":[{"variableType":"COLLECTED","name":"PRENOM","values":{"PREVIOUS":[null],"COLLECTED":[null],"FORCED":[null],"EDITED":[null],"INPUTTED":[null]}},{"variableType":"COLLECTED","name":"AGE","values":{"PREVIOUS":[null],"COLLECTED":[null],"FORCED":[null],"EDITED":[null],"INPUTTED":[null]}}]}'),l={},c="RosterForLoop",u={id:"components/aggregators/rosterForLoop",title:"RosterForLoop",description:"Le composant RosterForLoop fonctionne comme une boucle non pagin\xe9e mais pr\xe9sente les diff\xe9rents champs dans un tableau.",source:"@site/docs/components/aggregators/rosterForLoop.mdx",sourceDirName:"components/aggregators",slug:"/components/aggregators/rosterForLoop",permalink:"/Lunatic/docs/components/aggregators/rosterForLoop",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/components/aggregators/rosterForLoop.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Loop",permalink:"/Lunatic/docs/components/aggregators/loop"},next:{title:"Roundabout",permalink:"/Lunatic/docs/components/aggregators/roundabout"}},p={},d=[];function m(e){const n={h1:"h1",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"rosterforloop",children:"RosterForLoop"}),"\n",(0,t.jsxs)(n.p,{children:["Le composant ",(0,t.jsx)(n.strong,{children:"RosterForLoop"})," fonctionne comme une boucle non pagin\xe9e mais pr\xe9sente les diff\xe9rents champs dans un tableau."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"components"}),", tableau contenant les composants enfant \xe0 cette boucle"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"lines"}),", permet le contr\xf4le sur le nombre de lignes (ajouter / supprimer)","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"min"}),", nombre minimal de lignes"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"max"}),", nombre maximal de lignes"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"headers"}),", d\xe9finit l'en-t\xeate du tableau (optionel)"]}),"\n"]}),"\n","\n",(0,t.jsx)(a.e,{type:"ComponentRosterForLoopType"}),"\n","\n",(0,t.jsx)(s.L,{source:i})]})}function g(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(m,{...e})}):m(e)}},1415:(e,n,o)=>{"use strict";o.d(n,{L:()=>d});const t={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var r=o(9489),s=o(7227),a=o(2250);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\nimport '@inseefr/lunatic/lib/main.css'\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",l="import {\n  type LunaticData,\n  type LunaticSource,\n  type LunaticState,\n  useLunatic,\n  LunaticComponents,\n  ModalControls,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: LunaticState['pageTag']},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1' as LunaticState['pageTag'],\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <ModalControls\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var c=o(9813),u=o(4848);const p={};function d(e){let{source:n,data:d=p,options:m}=e;const g=n.maxPage&&"1"!==n.maxPage;return(0,u.jsxs)("div",{className:t.FormExample,children:[(0,u.jsxs)(r.A,{children:[(0,u.jsx)(s.A,{value:"source",label:"Source",default:!0,children:(0,u.jsx)(a.A,{language:"json",className:t.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,u.jsx)(s.A,{value:"data",label:"Data",children:(0,u.jsx)(a.A,{language:"json",className:t.FormExampleCode,children:JSON.stringify(d,null,2)})})]}),(0,u.jsxs)(r.A,{children:[(0,u.jsx)(s.A,{value:"code",label:"Code",children:(0,u.jsx)(a.A,{language:"tsx",className:t.FormExampleCode,children:g?l:i})}),(0,u.jsx)(s.A,{value:"render",label:"Rendu",default:!0,children:(0,u.jsx)("div",{className:t.FormExampleRender,children:(0,u.jsx)(c.A,{fallback:(0,u.jsx)("div",{children:"Loading..."}),children:()=>{const e=g?o(2937).g:o(7171).S;return(0,u.jsx)(e,{source:n,data:d,options:m})}})})})]})]})}},7171:(e,n,o)=>{"use strict";o.d(n,{S:()=>s});var t=o(2612),r=o(4848);function s(e){let{source:n,data:o}=e;const{getComponents:s,Provider:a}=(0,t.O1)(n,o,{initialPage:"1"});return(0,r.jsx)(a,{children:(0,r.jsx)(t.R2,{components:s()})})}},2937:(e,n,o)=>{"use strict";o.d(n,{g:()=>a});var t=o(2612),r=o(6540),s=o(4848);function a(e){let{source:n,data:o,options:a}=e;const{getComponents:i,isLastPage:l,isFirstPage:c,goPreviousPage:u,goNextPage:p,Provider:d,compileControls:m}=(0,t.O1)(n,o,{initialPage:"1",...a}),[g,x]=(0,r.useState)();return(0,s.jsxs)("div",{children:[(0,s.jsx)(d,{children:(0,s.jsx)(t.R2,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,s.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,s.jsx)("button",{className:"button button--primary",disabled:c,onClick:u,children:"Pr\xe9c\xe9dent"}),(0,s.jsx)("button",{className:"button button--primary",disabled:l,onClick:()=>{const e=m();e.currentErrors?x(e):p()},children:"Suivant"})]}),g&&(0,s.jsx)(t.I1,{errors:g.currentErrors,goNext:()=>{x(void 0),p()},onClose:()=>{x(void 0)},isCritical:g.isCritical})]})}},8094:(e,n,o)=>{"use strict";o.d(n,{e:()=>r});var t=o(4848);function r(e){let{type:n}=e;const o=`https://github.com/search?q=repo%3AInseeFr%2FLunatic+%22export+type+${n}%22&type=code`;return(0,t.jsxs)("a",{className:"button button--secondary",style:{display:"inline-flex",alignItems:"center",gap:".3rem"},href:o,target:"_blank",rel:"noopener noreferrer",children:["Voir le type",(0,t.jsx)("svg",{width:"13.5",height:"13.5","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",children:(0,t.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})}},5053:()=>{},5843:()=>{}}]);