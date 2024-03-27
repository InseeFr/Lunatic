(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1288],{90714:(n,e,r)=>{"use strict";r.r(e),r.d(e,{assets:()=>l,contentTitle:()=>u,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var t=r(85893),s=r(11151);const o=JSON.parse('{"components":[{"id":"kze792d8","componentType":"InputNumber","page":"1","min":0,"max":100000,"decimals":2,"label":{"value":"\\"\u27a1 1. \\" || \\"Input number (between 0 and 100 000)\\"","type":"VTL|MD"},"description":{"value":"\\"Description\\"","type":"VTL|MD"},"response":{"name":"NB"}}],"variables":[{"variableType":"COLLECTED","name":"NB","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTED":null}}]}');var a=r(70036);const i={},u="InputNumber",c={id:"components/fields/input-number",title:"InputNumber",description:"Le composant InputNumber permet d'afficher un champ num\xe9rique.",source:"@site/docs/components/fields/input-number.mdx",sourceDirName:"components/fields",slug:"/components/fields/input-number",permalink:"/Lunatic/docs/components/fields/input-number",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/fields/input-number.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Input",permalink:"/Lunatic/docs/components/fields/input"},next:{title:"Textarea",permalink:"/Lunatic/docs/components/fields/textarea"}},l={},d=[];function m(n){const e={h1:"h1",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"inputnumber",children:"InputNumber"}),"\n",(0,t.jsxs)(e.p,{children:["Le composant ",(0,t.jsx)(e.strong,{children:"InputNumber"})," permet d'afficher un champ num\xe9rique."]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"min"}),", valeur minimale (au niveau HTML seulement, un contr\xf4le est n\xe9cessaire si on souhaite valider la longueur)"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"max"}),", valeur maximale (au niveau HTML seulement, un contr\xf4le est n\xe9cessaire si on souhaite valider la longueur)"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"decimals"}),", nombre de d\xe9cimales autoris\xe9es (au niveau HTML seulement, un contr\xf4le est n\xe9cessaire si on souhaite valider la longueur)"]}),"\n"]}),"\n","\n","\n",(0,t.jsx)(a.U,{source:o})]})}function p(n={}){const{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(m,{...n})}):m(n)}},70036:(n,e,r)=>{"use strict";r.d(e,{U:()=>m});const t={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var s=r(73992),o=r(18679),a=r(97416);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",u="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n  Modal,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: string},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1',\n    autoSuggesterLoading: true,\n    workersBasePath: '/Lunatic/workers',\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <Modal\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var c=r(10748),l=r(85893);const d={};function m(n){let{source:e,data:m=d,options:p}=n;const g=e.maxPage&&"1"!==e.maxPage;return(0,l.jsxs)("div",{className:t.FormExample,children:[(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(o.Z,{value:"source",label:"Source",default:!0,children:(0,l.jsx)(a.Z,{language:"json",className:t.FormExampleCode,children:JSON.stringify(e,null,2)})}),(0,l.jsx)(o.Z,{value:"data",label:"Data",children:(0,l.jsx)(a.Z,{language:"json",className:t.FormExampleCode,children:JSON.stringify(m,null,2)})})]}),(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(o.Z,{value:"code",label:"Code",children:(0,l.jsx)(a.Z,{language:"tsx",className:t.FormExampleCode,children:g?u:i})}),(0,l.jsx)(o.Z,{value:"render",label:"Rendu",default:!0,children:(0,l.jsx)("div",{className:t.FormExampleRender,children:(0,l.jsx)(c.Z,{fallback:(0,l.jsx)("div",{children:"Loading..."}),children:()=>{const n=g?r(83485).N:r(9782).l;return(0,l.jsx)(n,{source:e,data:m,options:p})}})})})]})]})}},9782:(n,e,r)=>{"use strict";r.d(e,{l:()=>o});var t=r(41600),s=r(85893);function o(n){let{source:e,data:r}=n;const{getComponents:o,Provider:a}=(0,t.useLunatic)(e,r,{initialPage:"1"});return(0,s.jsx)(a,{children:(0,s.jsx)(t.LunaticComponents,{components:o()})})}},83485:(n,e,r)=>{"use strict";r.d(e,{N:()=>a});var t=r(41600),s=r(67294),o=r(85893);function a(n){let{source:e,data:r,options:a}=n;const{getComponents:i,isLastPage:u,isFirstPage:c,goPreviousPage:l,goNextPage:d,Provider:m,compileControls:p}=(0,t.useLunatic)(e,r,{initialPage:"1",autoSuggesterLoading:!0,workersBasePath:"/Lunatic/workers",...a}),[g,x]=(0,s.useState)();return(0,o.jsxs)("div",{children:[(0,o.jsx)(m,{children:(0,o.jsx)(t.LunaticComponents,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,o.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,o.jsx)("button",{className:"button button--primary",disabled:c,onClick:l,children:"Pr\xe9c\xe9dent"}),(0,o.jsx)("button",{className:"button button--primary",disabled:u,onClick:()=>{const n=p();n.currentErrors?x(n):d()},children:"Suivant"})]}),g&&(0,o.jsx)(t.Modal,{errors:g.currentErrors,goNext:()=>{x(void 0),d()},onClose:()=>{x(void 0)},isCritical:g.isCritical})]})}},13928:()=>{},97816:()=>{}}]);