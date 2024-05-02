(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4459],{7372:(e,n,t)=>{"use strict";t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var o=t(4848),r=t(8453);const i=JSON.parse('{"pagination":"question","maxPage":"2","variables":[{"variableType":"COLLECTED","name":"TESTTEXTE","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTTED":null}},{"variableType":"COLLECTED","name":"QNUM","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTTED":null}}],"components":[{"componentType":"Question","id":"idQuestion","page":"1","label":{"type":"VTL|MD","value":"\\"Question\\""},"description":{"type":"VTL|MD","value":"\\"Description de la question\\""},"declarations":[{"declarationType":"HELP","id":"idQuestion-help1","label":{"type":"VTL|MD","value":"\\"Contenu de la  premi\xe8re d\xe9claration avant (contexte)\\""},"position":"BEFORE_QUESTION_TEXT"},{"declarationType":"HELP","id":"idQuestion-help2","label":{"type":"VTL|MD","value":"\\"Contenu de la  deuxi\xe8me d\xe9claration avant (contexte)\\""},"position":"BEFORE_QUESTION_TEXT"},{"declarationType":"HELP","id":"idQuestion-help3","label":{"type":"VTL|MD","value":"\\"Contenu de la premi\xe8re d\xe9claration apr\xe8s (Information)\\""},"position":"AFTER_QUESTION_TEXT"},{"declarationType":"HELP","id":"idQuestion-help4","label":{"type":"VTL|MD","value":"\\"Contenu de la deuxi\xe8me d\xe9claration apr\xe8s (Information)\\""},"position":"AFTER_QUESTION_TEXT"}],"components":[{"componentType":"Input","bindingDependencies":["TESTTEXTE"],"controls":[{"bindingDependencies":["TESTTEXTE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"L\'input ne peut pas valoir BLABLA\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(nvl(TESTTEXTE,\\"\\") = \\"BLABLA\\")"},"id":"kfxn6f16-CI-0"},{"bindingDependencies":["TESTTEXTE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"Cette phrase un peu longue s\u2019affiche si on a du vide pour la variable sur le texte inf\xe9rieur \xe0 255 caract\xe8res et voil\xe0\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(isnull(TESTTEXTE))"},"id":"kfxn6f16-CI-1"}],"response":{"name":"TESTTEXTE"},"conditionFilter":{"type":"VTL","value":"true"},"id":"kfxn6f16","page":"1","label":{"type":"VTL|MD","value":"\\"Le label du champ input\\""},"mandatory":false,"maxLength":15,"declarations":[{"declarationType":"INSTRUCTION","id":"kfxn6f16-kfxn36ru","label":{"type":"VTL|MD","value":"\\"Tester la saisie de BLABLA\\""},"position":"AFTER_QUESTION_TEXT"}]}]},{"componentType":"Question","id":"idQuestion2","page":"2","label":{"type":"VTL|MD","value":"\\"Question 2\\""},"description":{"type":"VTL|MD","value":"\\"Description de la question 2\\""},"components":[{"id":"k0dzbfek","componentType":"InputNumber","mandatory":false,"page":"2","min":0,"max":100,"decimals":0,"label":{"value":"\\"\u27a1 1. \\" || \\"Test de sup\xe9riorit\xe9 stricte - Saisie d\u2019un nombre compris entre 0 et 100 - Si valeur sup\xe9rieure \xe0 5 message d\u2019info. si superieur \xe0 6,5 autre message \\"","type":"VTL|MD"},"declarations":[{"id":"k0dzbfek-kzgzg0bk","declarationType":"HELP","position":"AFTER_QUESTION_TEXT","label":{"value":"\\"Tester 2 et 20 (pour v\xe9rifier ordre num\xe9rique et lexico)\\"","type":"VTL|MD"}}],"conditionFilter":{"value":"true","type":"VTL"},"controls":[{"id":"k0dzbfek-CI-0","criticality":"WARN","control":{"value":"not(cast(nvl(QNUM,0),integer) > 5)","type":"VTL"},"errorMessage":{"value":"\\"sup \xe0 5\\"","type":"VTL|MD"},"bindingDependencies":["QNUM"]},{"id":"k0dzbfek-CI-1","criticality":"WARN","control":{"value":"not(cast(nvl(QNUM,0),integer) > 6.5)","type":"VTL"},"errorMessage":{"value":"\\"superieur \xe0 6.5\\"","type":"VTL|MD"},"bindingDependencies":["QNUM"]}],"bindingDependencies":["QNUM"],"response":{"name":"QNUM"}}]}]}');var s=t(1415);const a={},l="Question",c={id:"components/decorations/question",title:"Question",description:"Le composant Question entoure une question en lui donnant un contexte suppl\xe9mentaire avec un titre une description et des d\xe9clarations.",source:"@site/docs/components/decorations/question.mdx",sourceDirName:"components/decorations",slug:"/components/decorations/question",permalink:"/Lunatic/docs/components/decorations/question",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/components/decorations/question.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Sequence & SubSequence",permalink:"/Lunatic/docs/components/decorations/sequence"},next:{title:"FilterDescription",permalink:"/Lunatic/docs/components/decorations/filter-description"}},u={},d=[];function p(e){const n={h1:"h1",p:"p",strong:"strong",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"question",children:"Question"}),"\n",(0,o.jsxs)(n.p,{children:["Le composant ",(0,o.jsx)(n.strong,{children:"Question"})," entoure une question en lui donnant un contexte suppl\xe9mentaire avec un titre une description et des d\xe9clarations."]}),"\n","\n",(0,o.jsx)(s.L,{source:i})]})}function m(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},1415:(e,n,t)=>{"use strict";t.d(n,{L:()=>p});const o={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var r=t(9489),i=t(7227),s=t(2250);const a="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\nimport '@inseefr/lunatic/lib/main.css'\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",l="import {\n  type LunaticData,\n  type LunaticSource,\n  type LunaticState,\n  useLunatic,\n  LunaticComponents,\n  ModalControls,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: LunaticState['pageTag']},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1' as LunaticState['pageTag'],\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <ModalControls\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var c=t(9813),u=t(4848);const d={};function p(e){let{source:n,data:p=d,options:m}=e;const T=n.maxPage&&"1"!==n.maxPage;return(0,u.jsxs)("div",{className:o.FormExample,children:[(0,u.jsxs)(r.A,{children:[(0,u.jsx)(i.A,{value:"source",label:"Source",default:!0,children:(0,u.jsx)(s.A,{language:"json",className:o.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,u.jsx)(i.A,{value:"data",label:"Data",children:(0,u.jsx)(s.A,{language:"json",className:o.FormExampleCode,children:JSON.stringify(p,null,2)})})]}),(0,u.jsxs)(r.A,{children:[(0,u.jsx)(i.A,{value:"code",label:"Code",children:(0,u.jsx)(s.A,{language:"tsx",className:o.FormExampleCode,children:T?l:a})}),(0,u.jsx)(i.A,{value:"render",label:"Rendu",default:!0,children:(0,u.jsx)("div",{className:o.FormExampleRender,children:(0,u.jsx)(c.A,{fallback:(0,u.jsx)("div",{children:"Loading..."}),children:()=>{const e=T?t(2937).g:t(7171).S;return(0,u.jsx)(e,{source:n,data:p,options:m})}})})})]})]})}},7171:(e,n,t)=>{"use strict";t.d(n,{S:()=>i});var o=t(1508),r=t(4848);function i(e){let{source:n,data:t}=e;const{getComponents:i,Provider:s}=(0,o.O1)(n,t,{initialPage:"1"});return(0,r.jsx)(s,{children:(0,r.jsx)(o.R2,{components:i()})})}},2937:(e,n,t)=>{"use strict";t.d(n,{g:()=>s});var o=t(1508),r=t(6540),i=t(4848);function s(e){let{source:n,data:t,options:s}=e;const{getComponents:a,isLastPage:l,isFirstPage:c,goPreviousPage:u,goNextPage:d,Provider:p,compileControls:m}=(0,o.O1)(n,t,{initialPage:"1",...s}),[T,g]=(0,r.useState)();return(0,i.jsxs)("div",{children:[(0,i.jsx)(p,{children:(0,i.jsx)(o.R2,{components:a(),componentProps:()=>({errors:T?.currentErrors})})}),(0,i.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,i.jsx)("button",{className:"button button--primary",disabled:c,onClick:u,children:"Pr\xe9c\xe9dent"}),(0,i.jsx)("button",{className:"button button--primary",disabled:l,onClick:()=>{const e=m();e.currentErrors?g(e):d()},children:"Suivant"})]}),T&&(0,i.jsx)(o.I1,{errors:T.currentErrors,goNext:()=>{g(void 0),d()},onClose:()=>{g(void 0)},isCritical:T.isCritical})]})}},5053:()=>{},5843:()=>{}}]);