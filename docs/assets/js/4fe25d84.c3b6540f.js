(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3371],{1547:(e,n,o)=>{"use strict";o.r(n),o.d(n,{assets:()=>p,contentTitle:()=>c,default:()=>g,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var r=o(4848),t=o(8453);const s=JSON.parse('{"$schema":"../../../lunatic-schema.json","maxPage":"3","components":[{"id":"seq","componentType":"Sequence","label":{"value":"\\"Description des individus de votre logement\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"1"},{"id":"loop-prenom","componentType":"Loop","label":{"value":"\\"Ajouter un individu\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"bindingDependencies":["PRENOM"],"lines":{"min":{"value":"1","type":"VTL"},"max":{"value":"10","type":"VTL"}},"page":"1","paginatedLoop":false,"components":[{"componentType":"Input","label":{"value":"\\"Pr\xe9nom\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"maxLength":30,"bindingDependencies":["PRENOM"],"id":"prenom","response":{"name":"PRENOM"}},{"componentType":"InputNumber","label":{"value":"\\"Age\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"maxLength":30,"bindingDependencies":["AGE"],"id":"Age","response":{"name":"AGE"}}]},{"id":"seq-end","componentType":"Sequence","label":{"value":"\\"End\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"2"}],"variables":[{"variableType":"COLLECTED","name":"PRENOM","values":{"PREVIOUS":[null],"COLLECTED":[null],"FORCED":[null],"EDITED":[null],"INPUTTED":[null]}},{"variableType":"COLLECTED","name":"AGE","values":{"PREVIOUS":[null],"COLLECTED":[null],"FORCED":[null],"EDITED":[null],"INPUTTED":[null]}}]}');var a=o(1415);const i=JSON.parse('{"$schema":"../../../lunatic-schema.json","maxPage":"3","components":[{"id":"seq","componentType":"Sequence","label":{"value":"\\"Description des individus de votre logement\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"1"},{"id":"loop-prenom","componentType":"Loop","label":{"value":"\\"Ajouter un individu\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"bindingDependencies":["PRENOM"],"lines":{"min":{"value":"1","type":"VTL"},"max":{"value":"10","type":"VTL"}},"page":"1","paginatedLoop":false,"components":[{"componentType":"Input","label":{"value":"\\"Pr\xe9nom\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"maxLength":30,"bindingDependencies":["PRENOM"],"id":"prenom","response":{"name":"PRENOM"}}]},{"id":"loop","componentType":"Loop","loopDependencies":["PRENOM"],"iterations":{"value":"count(PRENOM)","type":"VTL"},"page":"2","maxPage":"1","depth":1,"paginatedLoop":true,"conditionFilter":{"value":"true","type":"VTL"},"components":[{"id":"age","label":{"value":"PRENOM || \\", quel est v\xf4tre \xe2ge ?\\"","type":"VTL"},"conditionFilter":{"value":"true","type":"VTL"},"page":"2.1","componentType":"InputNumber","min":0,"max":120,"decimals":0,"response":{"name":"AGE"}}]},{"id":"seq-end","componentType":"Sequence","label":{"value":"\\"End\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"3"}],"resizing":{"PRENOM":{"size":"count(PRENOM)","variables":["AGE"]}},"variables":[{"variableType":"COLLECTED","name":"PRENOM","values":{"PREVIOUS":null,"COLLECTED":["John","Jane"],"FORCED":null,"EDITED":null,"INPUTTED":null}},{"variableType":"COLLECTED","name":"AGE","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTTED":null}}]}'),l={},c="Loop",u={id:"components/aggregators/loop",title:"Loop",description:"Le composant Loop (parfois appel\xe9 BlockForLoop) permet de cr\xe9er une boucle permettant de poser une s\xe9rie de questions plusieurs fois (exemple: demander des informations sur plusieurs personnes).",source:"@site/docs/components/aggregators/loop.mdx",sourceDirName:"components/aggregators",slug:"/components/aggregators/loop",permalink:"/Lunatic/docs/components/aggregators/loop",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/components/aggregators/loop.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Agr\xe9gateurs",permalink:"/Lunatic/docs/category/agr\xe9gateurs"},next:{title:"RosterForLoop",permalink:"/Lunatic/docs/components/aggregators/rosterForLoop"}},p={},d=[{value:"Boucle non pagin\xe9e",id:"boucle-non-pagin\xe9e",level:2},{value:"Boucle pagin\xe9e",id:"boucle-pagin\xe9e",level:2}];function m(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"loop",children:"Loop"})}),"\n",(0,r.jsxs)(n.p,{children:["Le composant ",(0,r.jsx)(n.strong,{children:"Loop"})," (parfois appel\xe9 BlockForLoop) permet de cr\xe9er une boucle permettant de poser une s\xe9rie de questions plusieurs fois (exemple: demander des informations sur plusieurs personnes)."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"paginatedLoop"}),", indique si la boucle doit \xeatre pagin\xe9e ou non (defaut: false)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"components"}),", tableau contenant les composants enfant \xe0 cette boucle"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"boucle-non-pagin\xe9e",children:"Boucle non pagin\xe9e"}),"\n",(0,r.jsx)(n.p,{children:"Une boucle non pagin\xe9e pr\xe9sentera l'ensemble des champs les uns \xe0 la suite des autres."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"lines"}),", permet le contr\xf4le sur le nombre de lignes (ajouter / supprimer)","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"min"}),", nombre minimal de lignes"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"max"}),", nombre maximal de lignes"]}),"\n"]}),"\n"]}),"\n"]}),"\n","\n",(0,r.jsx)(a.L,{source:s}),"\n",(0,r.jsx)(n.h2,{id:"boucle-pagin\xe9e",children:"Boucle pagin\xe9e"}),"\n",(0,r.jsx)(n.p,{children:"Une boucle pagin\xe9e d\xe9clenchera un syst\xe8me de sous-navigation. Lorsque l'utilisateur arrive sur la page d'une boucle il sera automatiquement redirig\xe9 sur la premi\xe8re sous page."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"iterations"}),", expression VTL permettant de calculer le nombre d'it\xe9rations \xe0 effectuer"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"maxPage"}),", num\xe9ro de la derni\xe8re sous page"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["Les composants dans le tableau ",(0,r.jsx)(n.code,{children:"components"})," devront avoir un num\xe9ro de page pr\xe9fix\xe9 par la ",(0,r.jsx)(n.code,{children:"page"})," de cette boucle, ex: ",(0,r.jsx)(n.code,{children:"3.1"}),")"]})}),"\n","\n",(0,r.jsx)(a.L,{source:i})]})}function g(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},1415:(e,n,o)=>{"use strict";o.d(n,{L:()=>d});const r={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var t=o(9489),s=o(7227),a=o(2250);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\nimport '@inseefr/lunatic/lib/main.css'\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",l="import {\n  type LunaticData,\n  type LunaticSource,\n  type LunaticState,\n  useLunatic,\n  LunaticComponents,\n  ModalControls,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: LunaticState['pageTag']},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1' as LunaticState['pageTag'],\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <ModalControls\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var c=o(9813),u=o(4848);const p={};function d(e){let{source:n,data:d=p,options:m}=e;const g=n.maxPage&&"1"!==n.maxPage;return(0,u.jsxs)("div",{className:r.FormExample,children:[(0,u.jsxs)(t.A,{children:[(0,u.jsx)(s.A,{value:"source",label:"Source",default:!0,children:(0,u.jsx)(a.A,{language:"json",className:r.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,u.jsx)(s.A,{value:"data",label:"Data",children:(0,u.jsx)(a.A,{language:"json",className:r.FormExampleCode,children:JSON.stringify(d,null,2)})})]}),(0,u.jsxs)(t.A,{children:[(0,u.jsx)(s.A,{value:"code",label:"Code",children:(0,u.jsx)(a.A,{language:"tsx",className:r.FormExampleCode,children:g?l:i})}),(0,u.jsx)(s.A,{value:"render",label:"Rendu",default:!0,children:(0,u.jsx)("div",{className:r.FormExampleRender,children:(0,u.jsx)(c.A,{fallback:(0,u.jsx)("div",{children:"Loading..."}),children:()=>{const e=g?o(2937).g:o(7171).S;return(0,u.jsx)(e,{source:n,data:d,options:m})}})})})]})]})}},7171:(e,n,o)=>{"use strict";o.d(n,{S:()=>s});var r=o(3779),t=o(4848);function s(e){let{source:n,data:o}=e;const{getComponents:s,Provider:a}=(0,r.O1)(n,o,{initialPage:"1"});return(0,t.jsx)(a,{children:(0,t.jsx)(r.R2,{components:s()})})}},2937:(e,n,o)=>{"use strict";o.d(n,{g:()=>a});var r=o(3779),t=o(6540),s=o(4848);function a(e){let{source:n,data:o,options:a}=e;const{getComponents:i,isLastPage:l,isFirstPage:c,goPreviousPage:u,goNextPage:p,Provider:d,compileControls:m}=(0,r.O1)(n,o,{initialPage:"1",...a}),[g,x]=(0,t.useState)();return(0,s.jsxs)("div",{children:[(0,s.jsx)(d,{children:(0,s.jsx)(r.R2,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,s.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,s.jsx)("button",{className:"button button--primary",disabled:c,onClick:u,children:"Pr\xe9c\xe9dent"}),(0,s.jsx)("button",{className:"button button--primary",disabled:l,onClick:()=>{const e=m();e.currentErrors?x(e):p()},children:"Suivant"})]}),g&&(0,s.jsx)(r.I1,{errors:g.currentErrors,goNext:()=>{x(void 0),p()},onClose:()=>{x(void 0)},isCritical:g.isCritical})]})}},5843:()=>{}}]);