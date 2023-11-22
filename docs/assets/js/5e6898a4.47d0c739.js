"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5291],{13466:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var r=s(85893),o=s(11151);const t=JSON.parse('{"maxPage":"5","suggesters":[{"name":"naf-rev2","fields":[{"name":"label","rules":["[\\\\w]+"],"language":"French","min":2},{"name":"id"}],"queryParser":{"type":"tokenized","params":{"language":"French","pattern":"[\\\\w.]+"}},"version":"1"},{"name":"cog-communes","fields":[{"name":"id","rules":"soft"}],"queryParser":{"type":"soft"},"version":"1"},{"name":"in-error","fields":[{"name":"id","rules":"soft"}],"queryParser":{"type":"soft"},"version":"1"}],"components":[{"id":"suggestions-naf","componentType":"Suggester","mandatory":false,"label":{"value":"\\"Code ou terme des libell\xe9s de la Naf-rev2\\"","type":"VTL|MD"},"description":{"value":"\\"Exemple: 01 ou tabac\\"","type":"VTL|MD"},"storeName":"naf-rev2","conditionFilter":{"value":"true","type":"VTL"},"readOnly":{"value":"true","type":"VTL"},"controls":[{"id":"age-controls","criticality":"ERROR","typeOfControl":"FORMAT","control":{"value":"not(isnull(HELLO))","type":"VTL"},"errorMessage":{"value":"\\"Veuillez selectionner quelquechose\\"","type":"VTL"}}],"response":{"name":"HELLO"},"missingResponse":{"name":"HELLO_MISSING"},"page":"1"},{"id":"suggestions-cog","componentType":"Suggester","mandatory":false,"label":"\\"Hello!\\"","storeName":"cog-communes","conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"HELLO"},"missingResponse":{"name":"HELLO_MISSING"},"page":"2"},{"id":"suggestions-inconnu","componentType":"Suggester","mandatory":false,"label":"\\"Hello!\\"","storeName":"inconnu-au-bataillon","conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"HELLO"},"missingResponse":{"name":"HELLO_MISSING"},"page":"3"},{"id":"suggestions-in-error","componentType":"Suggester","mandatory":false,"label":"\\"Hello!\\"","storeName":"in-error","conditionFilter":{"value":"true","type":"VTL"},"missingResponse":{"name":"HELLO_MISSING"},"response":{"name":"HELLO"},"page":"4"},{"id":"bye!","componentType":"Sequence","page":"5","declarations":[{"id":"kb9hi4j0-krnoclfe","declarationType":"INSTRUCTION","position":"BEFORE_QUESTION_TEXT","label":{"value":"\\"Merci beaucoup.\\"","type":"VTL|MD"}}]}],"variables":[{"variableType":"COLLECTED","name":"HELLO","componentRef":"nn","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTED":null}},{"variableType":"COLLECTED","name":"HELLO_MISSING","componentRef":"nn","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTED":null}}]}');var i=s(55094);const a={},l="Suggester",c={id:"components/fields/suggester",title:"Suggester",description:"Le composant de Suggester permet d'avoir un menu d\xe9roulant avec une option de recherche.",source:"@site/docs/components/fields/suggester.mdx",sourceDirName:"components/fields",slug:"/components/fields/suggester",permalink:"/Lunatic/docs/components/fields/suggester",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/fields/suggester.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Dropdown",permalink:"/Lunatic/docs/components/fields/dropdown"},next:{title:"Radio",permalink:"/Lunatic/docs/components/fields/radio"}},u={},d=[{value:"Indexation",id:"indexation",level:2},{value:"La recherche",id:"la-recherche",level:2}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"suggester",children:"Suggester"}),"\n",(0,r.jsxs)(n.p,{children:["Le composant de ",(0,r.jsx)(n.code,{children:"Suggester"})," permet d'avoir un menu d\xe9roulant avec une option de recherche."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["La liste des options est index\xe9e en amont par un worker (automatiquement via l'option ",(0,r.jsx)(n.code,{children:"autoSuggesterLoading"}),", ou manuellement) afin de ne pas bloquer le thread principal."]}),"\n",(0,r.jsx)(n.li,{children:"De la m\xeame mani\xe8re la recherche utilise le m\xeame syst\xe8me de worker."}),"\n"]}),"\n","\n","\n",(0,r.jsx)(i.U,{source:t}),"\n",(0,r.jsx)(n.h2,{id:"indexation",children:"Indexation"}),"\n",(0,r.jsxs)(n.p,{children:["Dans le fichier source la liste des donn\xe9es \xe0 rendre disponible et d\xe9finit dans la propri\xe9t\xe9 ",(0,r.jsx)(n.code,{children:"suggesters"}),". Vous pouvez retrouver les d\xe9tails sur le format de cette d\xe9finition en regardant le type ",(0,r.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/use-lunatic/type-source.ts#L269",children:"SuggesterType"})," dans le code source."]}),"\n",(0,r.jsx)(n.p,{children:"Lors de l'indexation des donn\xe9es, un fichier JSON est charg\xe9 puis son contenu est sauvegard\xe9 dans IndexDB avec 2 stores :"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"store/info"}),", sauvegarde les informations \xe0 propos de l'index (name, fields, queryParser, version...)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"store/entities"}),", sauvegarde chaque suggestion index\xe9e par l'id"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:'Pour le deuxi\xe8me store, un index est cr\xe9\xe9 en fonction des tokens utilis\xe9s pour chaque suggestion. Par exemple, "Hello world" sera index\xe9 sur "hello" et "world". Cet index sera utilis\xe9 lors de la recherche pour trouver tous les enregistrements correspondant \xe0 une cha\xeene sp\xe9cifique. Afin d\'\xe9viter d\'avoir un index trop volumineux, les jetons sont r\xe9duits \xe0 l\'aide de plusieurs op\xe9rations :'}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Mise en minuscule."}),"\n",(0,r.jsx)(n.li,{children:"Les accents / caract\xe8res sp\xe9ciaux sont supprim\xe9s."}),"\n",(0,r.jsx)(n.li,{children:"Les mots sont simplifi\xe9s \xe0 l'aide d'un algorithme de stemming (snowball, qui supprime les suffix)."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"la-recherche",children:"La recherche"}),"\n",(0,r.jsxs)(n.p,{children:["Lors de la recherche dans un suggester, un message est envoy\xe9 au worker enregistr\xe9 par Lunatic (",(0,r.jsx)(n.code,{children:"lunatic-search-worker-XXX.js"}),") avec les donn\xe9es."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "search": "My Search",\n  "name": "naf-rev2",\n  "version": "1"\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Le worker (via ",(0,r.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/2.7/src/utils/suggester-workers/searching/searching.js#L55-L67",children:"searching.js"}),') va parser la requ\xeate en plusieurs tokens (un token par mot). Pour chaque token, une recherche va se faire dans l\'index "store/entities/index" pour trouver les suggestions qui correspondent au token.']}),"\n",(0,r.jsx)(n.p,{children:"Vous pouvez essayer ce code dans la console pour voir les tokens qui sont renvoy\xe9s."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'indexedDB.open("naf-rev2", 1).onsuccess = (e) => {\n    const search = "32" // Mot recherch\xe9\n    const db = e.target.result\n    console.log(Array.from(db.objectStoreNames))\n    const transaction = db.transaction(\n        "store/entities",\n        "readonly"\n    )\n    const max = String.fromCharCode(65535)\n    const store = transaction.objectStore(\'store/entities\')\n    const index = store.index("store/entities/index")\n    const range = IDBKeyRange.bound(search, search + max)\n    index.getAll(range).onsuccess = (req) => {\n        console.log(req.target.result)\n    }\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Lorsque tous les r\xe9sultats sont r\xe9cup\xe9r\xe9s, ils sont tri\xe9s par score (ou en utilisant une adaptation du syst\xe8me de classement de Melauto) avant d'\xeatre renvoy\xe9s au suggester."})]})}function m(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}}}]);