(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8937],{3475:(n,e,r)=>{"use strict";r.r(e),r.d(e,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var t=r(4848),s=r(8453);const o=JSON.parse('{"$schema":"../../../lunatic-schema.json","components":[{"id":"kze792d8","componentType":"InputNumber","page":"1","min":0,"max":100000,"decimals":2,"label":{"value":"\\"\u27a1 1. \\" || \\"Input number (between 0 and 100 000)\\"","type":"VTL|MD"},"description":{"value":"\\"Description\\"","type":"VTL|MD"},"response":{"name":"NB"}}],"variables":[{"variableType":"COLLECTED","name":"NB","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTTED":null}}]}');var a=r(1415);const i={},c="InputNumber",l={id:"components/fields/input-number",title:"InputNumber",description:"Le composant InputNumber permet d'afficher un champ num\xe9rique.",source:"@site/docs/components/fields/input-number.mdx",sourceDirName:"components/fields",slug:"/components/fields/input-number",permalink:"/Lunatic/docs/components/fields/input-number",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/components/fields/input-number.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Input",permalink:"/Lunatic/docs/components/fields/input"},next:{title:"Textarea",permalink:"/Lunatic/docs/components/fields/textarea"}},u={},d=[];function m(n){const e={h1:"h1",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"inputnumber",children:"InputNumber"}),"\n",(0,t.jsxs)(e.p,{children:["Le composant ",(0,t.jsx)(e.strong,{children:"InputNumber"})," permet d'afficher un champ num\xe9rique."]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"min"}),", valeur minimale (au niveau HTML seulement, un contr\xf4le est n\xe9cessaire si on souhaite valider la longueur)"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"max"}),", valeur maximale (au niveau HTML seulement, un contr\xf4le est n\xe9cessaire si on souhaite valider la longueur)"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"decimals"}),", nombre de d\xe9cimales autoris\xe9es (au niveau HTML seulement, un contr\xf4le est n\xe9cessaire si on souhaite valider la longueur)"]}),"\n"]}),"\n","\n",(0,t.jsx)(a.L,{source:o})]})}function p(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(m,{...n})}):m(n)}},1415:(n,e,r)=>{"use strict";r.d(e,{L:()=>m});const t={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var s=r(9489),o=r(7227),a=r(2250);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\nimport '@inseefr/lunatic/lib/main.css'\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",c="import {\n  type LunaticData,\n  type LunaticSource,\n  type LunaticState,\n  useLunatic,\n  LunaticComponents,\n  ModalControls,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: LunaticState['pageTag']},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1' as LunaticState['pageTag'],\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <ModalControls\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var l=r(9813),u=r(4848);const d={};function m(n){let{source:e,data:m=d,options:p}=n;const g=e.maxPage&&"1"!==e.maxPage;return(0,u.jsxs)("div",{className:t.FormExample,children:[(0,u.jsxs)(s.A,{children:[(0,u.jsx)(o.A,{value:"source",label:"Source",default:!0,children:(0,u.jsx)(a.A,{language:"json",className:t.FormExampleCode,children:JSON.stringify(e,null,2)})}),(0,u.jsx)(o.A,{value:"data",label:"Data",children:(0,u.jsx)(a.A,{language:"json",className:t.FormExampleCode,children:JSON.stringify(m,null,2)})})]}),(0,u.jsxs)(s.A,{children:[(0,u.jsx)(o.A,{value:"code",label:"Code",children:(0,u.jsx)(a.A,{language:"tsx",className:t.FormExampleCode,children:g?c:i})}),(0,u.jsx)(o.A,{value:"render",label:"Rendu",default:!0,children:(0,u.jsx)("div",{className:t.FormExampleRender,children:(0,u.jsx)(l.A,{fallback:(0,u.jsx)("div",{children:"Loading..."}),children:()=>{const n=g?r(2937).g:r(7171).S;return(0,u.jsx)(n,{source:e,data:m,options:p})}})})})]})]})}},7171:(n,e,r)=>{"use strict";r.d(e,{S:()=>o});var t=r(2612),s=r(4848);function o(n){let{source:e,data:r}=n;const{getComponents:o,Provider:a}=(0,t.O1)(e,r,{initialPage:"1"});return(0,s.jsx)(a,{children:(0,s.jsx)(t.R2,{components:o()})})}},2937:(n,e,r)=>{"use strict";r.d(e,{g:()=>a});var t=r(2612),s=r(6540),o=r(4848);function a(n){let{source:e,data:r,options:a}=n;const{getComponents:i,isLastPage:c,isFirstPage:l,goPreviousPage:u,goNextPage:d,Provider:m,compileControls:p}=(0,t.O1)(e,r,{initialPage:"1",...a}),[g,x]=(0,s.useState)();return(0,o.jsxs)("div",{children:[(0,o.jsx)(m,{children:(0,o.jsx)(t.R2,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,o.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,o.jsx)("button",{className:"button button--primary",disabled:l,onClick:u,children:"Pr\xe9c\xe9dent"}),(0,o.jsx)("button",{className:"button button--primary",disabled:c,onClick:()=>{const n=p();n.currentErrors?x(n):d()},children:"Suivant"})]}),g&&(0,o.jsx)(t.I1,{errors:g.currentErrors,goNext:()=>{x(void 0),d()},onClose:()=>{x(void 0)},isCritical:g.isCritical})]})}},5053:()=>{},5843:()=>{}}]);