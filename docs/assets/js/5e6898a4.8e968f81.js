(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5291],{54801:(e,n,s)=>{"use strict";s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var r=s(85893),a=s(11151);const t=JSON.parse('{"suggesters":[{"responseNames":["VARIABLE_COMMUNE"],"name":"L_COMMUNEPASSEE-1-2-0","fields":[{"name":"label","rules":["[\\\\w]+"],"language":"French","min":3,"stemmer":false},{"name":"id","rules":["[\\\\w]+"],"language":"French","min":3,"stemmer":false}],"queryParser":{"type":"tokenized","params":{"language":"French","pattern":"[\\\\w.]+","min":3,"stemmer":false}},"version":"1"},{"responseNames":["VARIABLE_PAYS"],"name":"L_PAYS-1-2-0","fields":[{"name":"label","rules":["[\\\\w]+"],"language":"French","min":3,"stemmer":false}],"queryParser":{"type":"tokenized","params":{"language":"French","pattern":"[\\\\w.]+","min":3,"stemmer":false}},"version":"1"},{"responseNames":["VARIABLE_NATIONALITE"],"name":"L_NATIONALITE-1-2-0","fields":[{"name":"label","rules":["[\\\\w]+"],"language":"French","min":3,"stemmer":false}],"queryParser":{"type":"tokenized","params":{"language":"French","pattern":"[\\\\w.]+","min":3,"stemmer":false}},"version":"1"},{"responseNames":["VARIABLE_PCS"],"name":"L_PCS_HOMMES-1-5-0","fields":[{"name":"label","rules":["[\\\\w]+"],"language":"French","min":3,"stemmer":false,"synonyms":{"accueil":["ACCEUIL"],"\xe9chafaudage":["ECHAFFAUDAGE"],"URSSAF":["URSAF","URSAFF"],"ing\xe9nierie":["INGENIEURIE","INGENERIE","INGIENERIE"],"construction":["CONSTRUCTEUR"],"distribution":["DISTRIBUTEUR"],"fabrication":["FABRICANT"],"abattoir":["ABATOIR","ABBATOIR","ABATOIRE","ABATTOIRE"],"ascenseur":["ASCENCEUR"],"ascenseurs":["ASCENCEURS"],"assenseur":["ASSENCEUR"],"joaillerie":["JOAILLIER"],"agroalimentaire":["AGGROALIMANTAIRE","AGROALIMANTAIRE"],"alimentaires":["ALIMANTAIRE"],"agroalimentaires":["AGGROALIMANTAIRES","AGROALIMENTAIRES"]}}],"queryParser":{"type":"tokenized","params":{"language":"French","pattern":"[\\\\w.]+","min":3,"stemmer":false}},"version":"1","meloto":true,"stopWords":["a","au","dans","de","des","du","en","er","la","le","ou","sur","d","l","aux","dans","un","une","pour","avec","chez","par","les"]},{"responseNames":["VARIABLE_BAILLEURS_SOCIAUX"],"name":"bailleurs_sociaux-1-5-0","fields":[{"name":"label","rules":["[\\\\w]+"],"language":"French","min":3,"stemmer":false}],"queryParser":{"type":"tokenized","params":{"language":"French","pattern":"[\\\\w.]+","min":3,"stemmer":false}},"version":"1"}],"components":[{"componentType":"Suggester","response":{"name":"VARIABLECO"},"storeName":"L_COMMUNEPASSEE-1-2-0","hierarchy":{"sequence":{"id":"lt4fhgd6","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"Sequence\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"id":"lt4ezymk","page":"1","label":{"type":"VTL|MD","value":"\\"\u27a1 1. \\" || \\"Variable Commune\\""},"optionLabel":{"type":"VTL","value":"\\"id || \\" - \\" || label\\""},"mandatory":false,"maxLength":249},{"componentType":"Suggester","response":{"name":"VARIABLEPA"},"storeName":"L_PAYS-1-2-0","conditionFilter":{"type":"VTL","value":"true"},"id":"lt4fjoev","page":"2","label":{"type":"VTL|MD","value":"\\"\u27a1 2. \\" || \\"Variable Pays\\""},"mandatory":false,"maxLength":249},{"componentType":"Suggester","storeName":"L_NATIONALITE-1-2-0","response":{"name":"VARIABLENA"},"conditionFilter":{"type":"VTL","value":"true"},"id":"lt4f6i2y","page":"3","label":{"type":"VTL|MD","value":"\\"\u27a1 3. \\" || \\"Variable Nationalit\xe9\\""},"mandatory":false,"maxLength":249},{"componentType":"Suggester","storeName":"L_PCS_HOMMES-1-5-0","response":{"name":"VARIABLE_P"},"conditionFilter":{"type":"VTL","value":"true"},"id":"lt4f9q1o","page":"4","label":{"type":"VTL|MD","value":"\\"\u27a1 4. \\" || \\"VARIABLE_PCS\\""},"mandatory":false,"maxLength":249},{"componentType":"Suggester","storeName":"bailleurs_sociaux-1-5-0","response":{"name":"VARIABLE_B"},"conditionFilter":{"type":"VTL","value":"true"},"id":"lt4f8uba","page":"5","label":{"type":"VTL|MD","value":"\\"\u27a1 5. \\" || \\"VARIABLE_BAILLEURS_SOCIAUX\\""},"mandatory":false,"maxLength":249}],"pagination":"question","resizing":{},"label":{"type":"VTL|MD","value":"Suggester"},"lunaticModelVersion":"2.5.0","modele":"SUGGESTER","enoCoreVersion":"2.7.1","generatingDate":"27-02-2024 13:43:43","missing":false,"id":"lt4f6mib","maxPage":"5","variables":[{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTTED":null,"FORCED":null,"PREVIOUS":null},"name":"COMMENT_QE"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTTED":null,"FORCED":null,"PREVIOUS":null},"name":"VARIABLECO"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTTED":null,"FORCED":null,"PREVIOUS":null},"name":"VARIABLEPA"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTTED":null,"FORCED":null,"PREVIOUS":null},"name":"VARIABLENA"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTTED":null,"FORCED":null,"PREVIOUS":null},"name":"VARIABLE_P"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTTED":null,"FORCED":null,"PREVIOUS":null},"name":"VARIABLE_B"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_VARIABLECO","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_VARIABLEPA","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_VARIABLENA","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_VARIABLE_P","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_VARIABLE_B","inFilter":"false"}]}');var o=s(70036);const i={},l="Suggester",u={id:"components/fields/suggester",title:"Suggester",description:"Le composant de Suggester permet d'avoir un menu d\xe9roulant avec une option de recherche.",source:"@site/docs/components/fields/suggester.mdx",sourceDirName:"components/fields",slug:"/components/fields/suggester",permalink:"/Lunatic/docs/components/fields/suggester",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/fields/suggester.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Dropdown",permalink:"/Lunatic/docs/components/fields/dropdown"},next:{title:"Radio",permalink:"/Lunatic/docs/components/fields/radio"}},c={},d=[{value:"Indexation",id:"indexation",level:2},{value:"La recherche",id:"la-recherche",level:2}];function m(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"suggester",children:"Suggester"}),"\n",(0,r.jsxs)(n.p,{children:["Le composant de ",(0,r.jsx)(n.code,{children:"Suggester"})," permet d'avoir un menu d\xe9roulant avec une option de recherche."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["La liste des options est index\xe9e en amont par un worker (automatiquement via l'option ",(0,r.jsx)(n.code,{children:"autoSuggesterLoading"}),", ou manuellement) afin de ne pas bloquer le thread principal."]}),"\n",(0,r.jsx)(n.li,{children:"De la m\xeame mani\xe8re la recherche utilise le m\xeame syst\xe8me de worker."}),"\n"]}),"\n","\n","\n",(0,r.jsx)(o.U,{source:t}),"\n",(0,r.jsx)(n.h2,{id:"indexation",children:"Indexation"}),"\n",(0,r.jsxs)(n.p,{children:["Dans le fichier source la liste des donn\xe9es \xe0 rendre disponible et d\xe9finit dans la propri\xe9t\xe9 ",(0,r.jsx)(n.code,{children:"suggesters"}),". Vous pouvez retrouver les d\xe9tails sur le format de cette d\xe9finition en regardant le type ",(0,r.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/use-lunatic/type-source.ts#L269",children:"SuggesterType"})," dans le code source."]}),"\n",(0,r.jsx)(n.p,{children:"Lors de l'indexation des donn\xe9es, un fichier JSON est charg\xe9 puis son contenu est sauvegard\xe9 dans IndexDB avec 2 stores :"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"store/info"}),", sauvegarde les informations \xe0 propos de l'index (name, fields, queryParser, version...)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"store/entities"}),", sauvegarde chaque suggestion index\xe9e par l'id"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:'Pour le deuxi\xe8me store, un index est cr\xe9\xe9 en fonction des tokens utilis\xe9s pour chaque suggestion. Par exemple, "Hello world" sera index\xe9 sur "hello" et "world". Cet index sera utilis\xe9 lors de la recherche pour trouver tous les enregistrements correspondant \xe0 une cha\xeene sp\xe9cifique. Afin d\'\xe9viter d\'avoir un index trop volumineux, les jetons sont r\xe9duits \xe0 l\'aide de plusieurs op\xe9rations :'}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Mise en minuscule."}),"\n",(0,r.jsx)(n.li,{children:"Les accents / caract\xe8res sp\xe9ciaux sont supprim\xe9s."}),"\n",(0,r.jsx)(n.li,{children:"Les mots sont simplifi\xe9s \xe0 l'aide d'un algorithme de stemming (snowball, qui supprime les suffix)."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"la-recherche",children:"La recherche"}),"\n",(0,r.jsxs)(n.p,{children:["Lors de la recherche dans un suggester, un message est envoy\xe9 au worker enregistr\xe9 par Lunatic (",(0,r.jsx)(n.code,{children:"lunatic-search-worker-XXX.js"}),") avec les donn\xe9es."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "search": "My Search",\n  "name": "naf-rev2",\n  "version": "1"\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Le worker (via ",(0,r.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/utils/suggester-workers/searching/searching.js#L55-L67",children:"searching.js"}),') va parser la requ\xeate en plusieurs tokens (un token par mot). Pour chaque token, une recherche va se faire dans l\'index "store/entities/index" pour trouver les suggestions qui correspondent au token.']}),"\n",(0,r.jsx)(n.p,{children:"Vous pouvez essayer ce code dans la console pour voir les tokens qui sont renvoy\xe9s."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'indexedDB.open("naf-rev2", 1).onsuccess = (e) => {\n    const search = "32" // Mot recherch\xe9\n    const db = e.target.result\n    console.log(Array.from(db.objectStoreNames))\n    const transaction = db.transaction(\n        "store/entities",\n        "readonly"\n    )\n    const max = String.fromCharCode(65535)\n    const store = transaction.objectStore(\'store/entities\')\n    const index = store.index("store/entities/index")\n    const range = IDBKeyRange.bound(search, search + max)\n    index.getAll(range).onsuccess = (req) => {\n        console.log(req.target.result)\n    }\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Lorsque tous les r\xe9sultats sont r\xe9cup\xe9r\xe9s, ils sont tri\xe9s par score (ou en utilisant une adaptation du syst\xe8me de classement de Melauto) avant d'\xeatre renvoy\xe9s au suggester."})]})}function p(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},70036:(e,n,s)=>{"use strict";s.d(n,{U:()=>m});const r={FormExample:"FormExample_a30K",FormExampleRender:"FormExampleRender_QfqF",FormExampleCode:"FormExampleCode_XePV","margin-top--md":"margin-top--md_TH4F"};var a=s(73992),t=s(18679),o=s(97416);const i="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n} from '@inseefr/lunatic';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n};\n\nexport function FormRenderer({ source, data }: Props) {\n  const { getComponents, Provider } = useLunatic(source, data, {\n    initialPage: '1',\n  });\n  return (\n    <Provider>\n      <LunaticComponents components={getComponents()} />\n    </Provider>\n  );\n}\n",l="import {\n  type LunaticData,\n  type LunaticSource,\n  useLunatic,\n  LunaticComponents,\n  Modal,\n} from '@inseefr/lunatic';\nimport { useState } from 'react';\n\ntype Props = {\n  source: LunaticSource;\n  data: LunaticData;\n  options?: {initialPage?: string},\n};\n\nexport function FormRendererWithNavigation({ source, data, options }: Props) {\n  const {\n    getComponents,\n    isLastPage,\n    isFirstPage,\n    goPreviousPage,\n    goNextPage,\n    Provider,\n    compileControls,\n  } = useLunatic(source, data, {\n    initialPage: '1',\n    autoSuggesterLoading: true,\n    workersBasePath: '/Lunatic/workers',\n    ...options\n  });\n\n  // Les contr\xf4les doivent \xeatre v\xe9rifi\xe9s manuellement\n  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();\n  const handleNext = () => {\n    const currentPageErrors = compileControls();\n    if (currentPageErrors.currentErrors) {\n      setErrors(currentPageErrors);\n    } else {\n      goNextPage();\n    }\n  };\n  const forceNext = () => {\n    setErrors(undefined);\n    goNextPage();\n  };\n  const closeModal = () => {\n    setErrors(undefined);\n  };\n\n  return (\n    <div>\n      <Provider>\n        <LunaticComponents\n          components={getComponents()}\n          componentProps={() => ({\n            errors: errors?.currentErrors,\n          })}\n        />\n      </Provider>\n      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>\n        <button className=\"button button--primary\" disabled={isFirstPage} onClick={goPreviousPage}>\n          Pr\xe9c\xe9dent\n        </button>\n        <button className=\"button button--primary\" disabled={isLastPage} onClick={handleNext}>\n          Suivant\n        </button>\n      </div>\n      {errors && (\n        <Modal\n          errors={errors.currentErrors}\n          goNext={forceNext}\n          onClose={closeModal}\n          isCritical={errors.isCritical}\n        />\n      )}\n    </div>\n  );\n}\n";var u=s(10748),c=s(85893);const d={};function m(e){let{source:n,data:m=d,options:p}=e;const g=n.maxPage&&"1"!==n.maxPage;return(0,c.jsxs)("div",{className:r.FormExample,children:[(0,c.jsxs)(a.Z,{children:[(0,c.jsx)(t.Z,{value:"source",label:"Source",default:!0,children:(0,c.jsx)(o.Z,{language:"json",className:r.FormExampleCode,children:JSON.stringify(n,null,2)})}),(0,c.jsx)(t.Z,{value:"data",label:"Data",children:(0,c.jsx)(o.Z,{language:"json",className:r.FormExampleCode,children:JSON.stringify(m,null,2)})})]}),(0,c.jsxs)(a.Z,{children:[(0,c.jsx)(t.Z,{value:"code",label:"Code",children:(0,c.jsx)(o.Z,{language:"tsx",className:r.FormExampleCode,children:g?l:i})}),(0,c.jsx)(t.Z,{value:"render",label:"Rendu",default:!0,children:(0,c.jsx)("div",{className:r.FormExampleRender,children:(0,c.jsx)(u.Z,{fallback:(0,c.jsx)("div",{children:"Loading..."}),children:()=>{const e=g?s(83485).N:s(9782).l;return(0,c.jsx)(e,{source:n,data:m,options:p})}})})})]})]})}},9782:(e,n,s)=>{"use strict";s.d(n,{l:()=>t});var r=s(41600),a=s(85893);function t(e){let{source:n,data:s}=e;const{getComponents:t,Provider:o}=(0,r.useLunatic)(n,s,{initialPage:"1"});return(0,a.jsx)(o,{children:(0,a.jsx)(r.LunaticComponents,{components:t()})})}},83485:(e,n,s)=>{"use strict";s.d(n,{N:()=>o});var r=s(41600),a=s(67294),t=s(85893);function o(e){let{source:n,data:s,options:o}=e;const{getComponents:i,isLastPage:l,isFirstPage:u,goPreviousPage:c,goNextPage:d,Provider:m,compileControls:p}=(0,r.useLunatic)(n,s,{initialPage:"1",autoSuggesterLoading:!0,workersBasePath:"/Lunatic/workers",...o}),[g,L]=(0,a.useState)();return(0,t.jsxs)("div",{children:[(0,t.jsx)(m,{children:(0,t.jsx)(r.LunaticComponents,{components:i(),componentProps:()=>({errors:g?.currentErrors})})}),(0,t.jsxs)("div",{style:{marginTop:".7rem",display:"flex",gap:".2rem"},children:[(0,t.jsx)("button",{className:"button button--primary",disabled:u,onClick:c,children:"Pr\xe9c\xe9dent"}),(0,t.jsx)("button",{className:"button button--primary",disabled:l,onClick:()=>{const e=p();e.currentErrors?L(e):d()},children:"Suivant"})]}),g&&(0,t.jsx)(r.Modal,{errors:g.currentErrors,goNext:()=>{L(void 0),d()},onClose:()=>{L(void 0)},isCritical:g.isCritical})]})}},13928:()=>{},97816:()=>{}}]);