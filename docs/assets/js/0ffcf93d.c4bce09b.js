(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9223],{14469:(e,n,t)=>{"use strict";t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var r=t(85893),o=t(11151);const a=JSON.parse('{"components":[{"id":"j6p29i81","componentType":"Table","mandatory":false,"header":[{"label":{"value":"\\"<=>\\"","type":"VTL|MD"}},{"label":{"value":"\\"Header 1\\"","type":"VTL|MD"}},{"label":{"value":"\\"Header 2\\"","type":"VTL|MD"}}],"body":[[{"label":{"value":"\\"Line 1\\"","type":"VTL|MD"}},{"label":{"value":"\\"Cell 11\\"","type":"VTL|MD"}},{"label":{"value":"\\"Cell 12\\"","type":"VTL|MD"}}],[{"label":{"value":"\\"Line 2\\"","type":"VTL|MD"}},{"label":{"value":"\\"Cell 21\\"","type":"VTL|MD"}},{"label":{"value":"\\"Cell 22\\"","type":"VTL|MD"}}],[{"label":{"value":"\\"Line 3\\"","type":"VTL|MD"}},{"label":{"value":"\\"Cell 31\\"","type":"VTL|MD"}},{"label":{"value":"\\"Cell 32\\"","type":"VTL|MD"}}]]}]}');var s=t(70036);const i={},l="Table",c={id:"components/decorations/table",title:"Table",description:"Le composant Table est un composant non interactif permettant d'afficher un tableau d'information \xe0 l'utilisateur.",source:"@site/docs/components/decorations/table.mdx",sourceDirName:"components/decorations",slug:"/components/decorations/table",permalink:"/Lunatic/docs/components/decorations/table",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/decorations/table.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"FilterDescription",permalink:"/Lunatic/docs/components/decorations/filter-description"},next:{title:"Champs",permalink:"/Lunatic/docs/category/champs"}},u={},d=[];function p(e){const n={h1:"h1",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"table",children:"Table"}),"\n",(0,r.jsxs)(n.p,{children:["Le composant ",(0,r.jsx)(n.strong,{children:"Table"})," est un composant non interactif permettant d'afficher un tableau d'information \xe0 l'utilisateur."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"header"}),", tableau contenant le contenu des cellules en en-t\xeate"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"body"}),", tableau contenant lignes du tableau (sous forme de tableau de cellule)"]}),"\n"]}),"\n","\n","\n",(0,r.jsx)(s.U,{source:a})]})}function m(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},70036:(e,n,t)=>{"use strict";t.d(n,{U:()=>p});const r={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var o=t(73992),a=t(18679),s=t(97416);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",l="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n  Modal,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: string},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1',\n    autoSuggesterLoading: true,\n    workersBasePath: '/Lunatic/workers',\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <Modal\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var c=t(10748),u=t(85893);const d={};function p(e){let{source:n,data:p=d,options:m}=e;const g=n.maxPage&&"1"!==n.maxPage;return(0,u.jsxs)("div",{className:r.FormExample,children:[(0,u.jsxs)(o.Z,{children:[(0,u.jsx)(a.Z,{value:"source",label:"Source",default:!0,children:(0,u.jsx)(s.Z,{language:"json",className:r.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,u.jsx)(a.Z,{value:"data",label:"Data",children:(0,u.jsx)(s.Z,{language:"json",className:r.FormExampleCode,children:JSON.stringify(p,null,2)})})]}),(0,u.jsxs)(o.Z,{children:[(0,u.jsx)(a.Z,{value:"code",label:"Code",children:(0,u.jsx)(s.Z,{language:"tsx",className:r.FormExampleCode,children:g?l:i})}),(0,u.jsx)(a.Z,{value:"render",label:"Rendu",default:!0,children:(0,u.jsx)("div",{className:r.FormExampleRender,children:(0,u.jsx)(c.Z,{fallback:(0,u.jsx)("div",{children:"Loading..."}),children:()=>{const e=g?t(83485).N:t(9782).l;return(0,u.jsx)(e,{source:n,data:p,options:m})}})})})]})]})}},9782:(e,n,t)=>{"use strict";t.d(n,{l:()=>a});var r=t(41600),o=t(85893);function a(e){let{source:n,data:t}=e;const{getComponents:a,Provider:s}=(0,r.useLunatic)(n,t,{initialPage:"1"});return(0,o.jsx)(s,{children:(0,o.jsx)(r.LunaticComponents,{components:a()})})}},83485:(e,n,t)=>{"use strict";t.d(n,{N:()=>s});var r=t(41600),o=t(67294),a=t(85893);function s(e){let{source:n,data:t,options:s}=e;const{getComponents:i,isLastPage:l,isFirstPage:c,goPreviousPage:u,goNextPage:d,Provider:p,compileControls:m}=(0,r.useLunatic)(n,t,{initialPage:"1",autoSuggesterLoading:!0,workersBasePath:"/Lunatic/workers",...s}),[g,x]=(0,o.useState)();return(0,a.jsxs)("div",{children:[(0,a.jsx)(p,{children:(0,a.jsx)(r.LunaticComponents,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,a.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,a.jsx)("button",{className:"button button--primary",disabled:c,onClick:u,children:"Pr\xe9c\xe9dent"}),(0,a.jsx)("button",{className:"button button--primary",disabled:l,onClick:()=>{const e=m();e.currentErrors?x(e):d()},children:"Suivant"})]}),g&&(0,a.jsx)(r.Modal,{errors:g.currentErrors,goNext:()=>{x(void 0),d()},onClose:()=>{x(void 0)},isCritical:g.isCritical})]})}},13928:()=>{},97816:()=>{}}]);