(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[856],{1937:(e,n,o)=>{"use strict";o.r(n),o.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var t=o(4848),r=o(8453);const s=JSON.parse('{"$schema":"../../../lunatic-schema.json","maxPage":"1","components":[{"id":"checkboxone","componentType":"CheckboxOne","mandatory":false,"page":"1","label":{"value":"\\"checkboxone ONE component\\"","type":"VTL|MD"},"description":{"value":"\\"true or false\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"options":[{"value":"1","description":{"value":"\\"D\xe9claration oui\\"","type":"VTL|MD"},"label":{"value":"\\"oui\\"","type":"VTL|MD"}},{"value":"2","description":{"value":"\\"D\xe9claration non\\"","type":"VTL|MD"},"label":{"value":"\\"non\\"","type":"VTL|MD"}}],"response":{"name":"Q2"}}],"variables":[{"variableType":"COLLECTED","name":"Q2","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTTED":null}}]}');var a=o(1415);const i={},c="CheckboxOne",l={id:"components/fields/checkboxOne",title:"CheckboxOne",description:"Permet de s\xe9lectionner une valeur parmi une liste d'option. Le fonctionnement est similaire \xe0 celui des radios si ce n'est que la case peut \xeatre d\xe9cochable.",source:"@site/docs/components/fields/checkboxOne.mdx",sourceDirName:"components/fields",slug:"/components/fields/checkboxOne",permalink:"/Lunatic/docs/components/fields/checkboxOne",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/components/fields/checkboxOne.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Radio",permalink:"/Lunatic/docs/components/fields/radio"},next:{title:"CheckboxBoolean",permalink:"/Lunatic/docs/components/fields/checkboxBoolean"}},u={},d=[];function p(e){const n={a:"a",h1:"h1",header:"header",p:"p",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"checkboxone",children:"CheckboxOne"})}),"\n",(0,t.jsxs)(n.p,{children:["Permet de s\xe9lectionner une valeur parmi une liste d'option. Le fonctionnement est similaire \xe0 celui ",(0,t.jsx)(n.a,{href:"./radio",children:"des radios"})," si ce n'est que la case peut \xeatre d\xe9cochable."]}),"\n","\n",(0,t.jsx)(a.L,{source:s})]})}function m(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},1415:(e,n,o)=>{"use strict";o.d(n,{L:()=>p});const t={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var r=o(9489),s=o(7227),a=o(2250);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\nimport '@inseefr/lunatic/lib/main.css'\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",c="import {\n  type LunaticData,\n  type LunaticSource,\n  type LunaticState,\n  useLunatic,\n  LunaticComponents,\n  ModalControls,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: LunaticState['pageTag']},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1' as LunaticState['pageTag'],\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <ModalControls\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var l=o(9813),u=o(4848);const d={};function p(e){let{source:n,data:p=d,options:m}=e;const x=n.maxPage&&"1"!==n.maxPage;return(0,u.jsxs)("div",{className:t.FormExample,children:[(0,u.jsxs)(r.A,{children:[(0,u.jsx)(s.A,{value:"source",label:"Source",default:!0,children:(0,u.jsx)(a.A,{language:"json",className:t.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,u.jsx)(s.A,{value:"data",label:"Data",children:(0,u.jsx)(a.A,{language:"json",className:t.FormExampleCode,children:JSON.stringify(p,null,2)})})]}),(0,u.jsxs)(r.A,{children:[(0,u.jsx)(s.A,{value:"code",label:"Code",children:(0,u.jsx)(a.A,{language:"tsx",className:t.FormExampleCode,children:x?c:i})}),(0,u.jsx)(s.A,{value:"render",label:"Rendu",default:!0,children:(0,u.jsx)("div",{className:t.FormExampleRender,children:(0,u.jsx)(l.A,{fallback:(0,u.jsx)("div",{children:"Loading..."}),children:()=>{const e=x?o(2937).g:o(7171).S;return(0,u.jsx)(e,{source:n,data:p,options:m})}})})})]})]})}},7171:(e,n,o)=>{"use strict";o.d(n,{S:()=>s});var t=o(3779),r=o(4848);function s(e){let{source:n,data:o}=e;const{getComponents:s,Provider:a}=(0,t.O1)(n,o,{initialPage:"1"});return(0,r.jsx)(a,{children:(0,r.jsx)(t.R2,{components:s()})})}},2937:(e,n,o)=>{"use strict";o.d(n,{g:()=>a});var t=o(3779),r=o(6540),s=o(4848);function a(e){let{source:n,data:o,options:a}=e;const{getComponents:i,isLastPage:c,isFirstPage:l,goPreviousPage:u,goNextPage:d,Provider:p,compileControls:m}=(0,t.O1)(n,o,{initialPage:"1",...a}),[x,g]=(0,r.useState)();return(0,s.jsxs)("div",{children:[(0,s.jsx)(p,{children:(0,s.jsx)(t.R2,{components:i(),componentProps:()=>({errors:x?.currentErrors})})}),(0,s.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,s.jsx)("button",{className:"button button--primary",disabled:l,onClick:u,children:"Pr\xe9c\xe9dent"}),(0,s.jsx)("button",{className:"button button--primary",disabled:c,onClick:()=>{const e=m();e.currentErrors?g(e):d()},children:"Suivant"})]}),x&&(0,s.jsx)(t.I1,{errors:x.currentErrors,goNext:()=>{g(void 0),d()},onClose:()=>{g(void 0)},isCritical:x.isCritical})]})}},5843:()=>{}}]);