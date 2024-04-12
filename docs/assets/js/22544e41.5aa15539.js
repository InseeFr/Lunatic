(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1137],{5278:(e,n,t)=>{"use strict";t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var r=t(85893),o=t(11151);const s=JSON.parse('{"components":[{"componentType":"Datepicker","max":"2100-01-01","dateFormat":"YYYY-MM-DD","conditionFilter":{"type":"VTL","value":"true"},"label":{"type":"VTL|MD","value":"\\"\u27a1 1. \\" || \\"Birth day\\""},"mandatory":false,"min":"1900-01-01","response":{"name":"Q1"},"id":"l7ovm2rv","page":"1","controls":[{"criticality":"ERROR","errorMessage":{"type":"VTL|MD","value":"\\"Le format de la date YYYY-MM-DD n\'est pas respect\xe9.\\""},"control":{"type":"VTL","value":"cast(Q1, date,  \\"YYYY-MM-DD\\")"},"id":"l7ovm2rv-format"},{"criticality":"ERROR","errorMessage":{"type":"VTL|MD","value":"\\"La date saisie doit \xeatre comprise entre 1900-01-01 et 2100-01-01.\\""},"control":{"type":"VTL","value":"not(cast(Q1, date, \\"YYYY-MM-DD\\")>cast(\\"2100-01-01\\", date, \\"YYYY-MM-DD\\") or cast(Q1, date,\\"YYYY-MM-DD\\")<cast(\\"1900-01-01\\", date, \\"YYYY-MM-DD\\"))"},"id":"l7ovm2rv-formatborne"}]}],"variables":[{"variableType":"COLLECTED","values":{"COLLECTED":"1974-03-15","EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"Q1"}],"pagination":"question","resizing":{},"label":{"type":"VTL|MD","value":"\\"Example DatePicker\\""},"lunaticModelVersion":"2.2.13","modele":"DATEPICKER","enoCoreVersion":"2.3.10","generatingDate":"05-09-2022 14:37:43","missing":false,"id":"l7ovbqou","maxPage":"1"}');var a=t(70036);const i={},c="Datepicker",l={id:"components/fields/datepicker",title:"Datepicker",description:"Le composant Datepicker permet \xe0 l'utilisateur de s\xe9lectionner une date.",source:"@site/docs/components/fields/datepicker.mdx",sourceDirName:"components/fields",slug:"/components/fields/datepicker",permalink:"/Lunatic/docs/components/fields/datepicker",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/fields/datepicker.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Textarea",permalink:"/Lunatic/docs/components/fields/textarea"},next:{title:"Dropdown",permalink:"/Lunatic/docs/components/fields/dropdown"}},d={},u=[];function p(e){const n={code:"code",h1:"h1",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"datepicker",children:"Datepicker"}),"\n",(0,r.jsxs)(n.p,{children:["Le composant ",(0,r.jsx)(n.strong,{children:"Datepicker"})," permet \xe0 l'utilisateur de s\xe9lectionner une date."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"dateFormat"}),", format d'entr\xe9e de la date (",(0,r.jsx)(n.code,{children:"YYYY-MM-DD"})," | ",(0,r.jsx)(n.code,{children:"YYYY"})," | ",(0,r.jsx)(n.code,{children:"YYYY-MM"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"min"}),", date minimale"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"max"}),", date maximale"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Le choix a \xe9t\xe9 fait pour ce composant de ne plus utiliser un datepicker natif, car le comportement \xe9tait trop diff\xe9rent en fonction des navigateurs et frein\xe9 l'entr\xe9e des informations par les enqu\xeateurs. Aussi, cela permet le support de format qui n'\xe9tait pas forc\xe9ment pris en charge par les navigateurs \xe0 l'heure actuelle."}),"\n","\n","\n",(0,r.jsx)(a.U,{source:s})]})}function m(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},70036:(e,n,t)=>{"use strict";t.d(n,{U:()=>p});const r={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var o=t(73992),s=t(18679),a=t(97416);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",c="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n  Modal,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: string},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1',\n    autoSuggesterLoading: true,\n    workersBasePath: '/Lunatic/workers',\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <Modal\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var l=t(10748),d=t(85893);const u={};function p(e){let{source:n,data:p=u,options:m}=e;const g=n.maxPage&&"1"!==n.maxPage;return(0,d.jsxs)("div",{className:r.FormExample,children:[(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(s.Z,{value:"source",label:"Source",default:!0,children:(0,d.jsx)(a.Z,{language:"json",className:r.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,d.jsx)(s.Z,{value:"data",label:"Data",children:(0,d.jsx)(a.Z,{language:"json",className:r.FormExampleCode,children:JSON.stringify(p,null,2)})})]}),(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(s.Z,{value:"code",label:"Code",children:(0,d.jsx)(a.Z,{language:"tsx",className:r.FormExampleCode,children:g?c:i})}),(0,d.jsx)(s.Z,{value:"render",label:"Rendu",default:!0,children:(0,d.jsx)("div",{className:r.FormExampleRender,children:(0,d.jsx)(l.Z,{fallback:(0,d.jsx)("div",{children:"Loading..."}),children:()=>{const e=g?t(83485).N:t(9782).l;return(0,d.jsx)(e,{source:n,data:p,options:m})}})})})]})]})}},9782:(e,n,t)=>{"use strict";t.d(n,{l:()=>s});var r=t(41600),o=t(85893);function s(e){let{source:n,data:t}=e;const{getComponents:s,Provider:a}=(0,r.useLunatic)(n,t,{initialPage:"1"});return(0,o.jsx)(a,{children:(0,o.jsx)(r.LunaticComponents,{components:s()})})}},83485:(e,n,t)=>{"use strict";t.d(n,{N:()=>a});var r=t(41600),o=t(67294),s=t(85893);function a(e){let{source:n,data:t,options:a}=e;const{getComponents:i,isLastPage:c,isFirstPage:l,goPreviousPage:d,goNextPage:u,Provider:p,compileControls:m}=(0,r.useLunatic)(n,t,{initialPage:"1",autoSuggesterLoading:!0,workersBasePath:"/Lunatic/workers",...a}),[g,x]=(0,o.useState)();return(0,s.jsxs)("div",{children:[(0,s.jsx)(p,{children:(0,s.jsx)(r.LunaticComponents,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,s.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,s.jsx)("button",{className:"button button--primary",disabled:l,onClick:d,children:"Pr\xe9c\xe9dent"}),(0,s.jsx)("button",{className:"button button--primary",disabled:c,onClick:()=>{const e=m();e.currentErrors?x(e):u()},children:"Suivant"})]}),g&&(0,s.jsx)(r.Modal,{errors:g.currentErrors,goNext:()=>{x(void 0),u()},onClose:()=>{x(void 0)},isCritical:g.isCritical})]})}},13928:()=>{},97816:()=>{}}]);