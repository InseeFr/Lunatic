"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4459],{3226:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>T,frontMatter:()=>r,metadata:()=>u,toc:()=>p});var i=t(4848),o=t(8453);const a=JSON.parse('{"$schema":"../../../lunatic-schema.json","pagination":"question","maxPage":"2","variables":[{"variableType":"COLLECTED","name":"TESTTEXTE","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTTED":null}},{"variableType":"COLLECTED","name":"QNUM","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTTED":null}}],"components":[{"componentType":"Question","id":"idQuestion","page":"1","label":{"type":"VTL|MD","value":"\\"Question\\""},"description":{"type":"VTL|MD","value":"\\"Description de la question\\""},"declarations":[{"declarationType":"HELP","id":"idQuestion-help1","label":{"type":"VTL|MD","value":"\\"Contenu de la  premi\xe8re d\xe9claration avant (contexte)\\""},"position":"BEFORE_QUESTION_TEXT"},{"declarationType":"HELP","id":"idQuestion-help2","label":{"type":"VTL|MD","value":"\\"Contenu de la  deuxi\xe8me d\xe9claration avant (contexte)\\""},"position":"BEFORE_QUESTION_TEXT"},{"declarationType":"HELP","id":"idQuestion-help3","label":{"type":"VTL|MD","value":"\\"Contenu de la premi\xe8re d\xe9claration apr\xe8s (Information)\\""},"position":"AFTER_QUESTION_TEXT"},{"declarationType":"HELP","id":"idQuestion-help4","label":{"type":"VTL|MD","value":"\\"Contenu de la deuxi\xe8me d\xe9claration apr\xe8s (Information)\\""},"position":"AFTER_QUESTION_TEXT"}],"components":[{"componentType":"Input","bindingDependencies":["TESTTEXTE"],"controls":[{"bindingDependencies":["TESTTEXTE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"L\'input ne peut pas valoir BLABLA\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(nvl(TESTTEXTE,\\"\\") = \\"BLABLA\\")"},"id":"kfxn6f16-CI-0"},{"bindingDependencies":["TESTTEXTE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"Cette phrase un peu longue s\u2019affiche si on a du vide pour la variable sur le texte inf\xe9rieur \xe0 255 caract\xe8res et voil\xe0\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(isnull(TESTTEXTE))"},"id":"kfxn6f16-CI-1"}],"response":{"name":"TESTTEXTE"},"conditionFilter":{"type":"VTL","value":"true"},"id":"kfxn6f16","page":"1","label":{"type":"VTL|MD","value":"\\"Le label du champ input\\""},"mandatory":false,"maxLength":15,"declarations":[{"declarationType":"INSTRUCTION","id":"kfxn6f16-kfxn36ru","label":{"type":"VTL|MD","value":"\\"Tester la saisie de BLABLA\\""},"position":"AFTER_QUESTION_TEXT"}]}]},{"componentType":"Question","id":"idQuestion2","page":"2","label":{"type":"VTL|MD","value":"\\"Question 2\\""},"description":{"type":"VTL|MD","value":"\\"Description de la question 2\\""},"components":[{"id":"k0dzbfek","componentType":"InputNumber","mandatory":false,"page":"2","min":0,"max":100,"decimals":0,"label":{"value":"\\"\u27a1 1. \\" || \\"Test de sup\xe9riorit\xe9 stricte - Saisie d\u2019un nombre compris entre 0 et 100 - Si valeur sup\xe9rieure \xe0 5 message d\u2019info. si superieur \xe0 6,5 autre message \\"","type":"VTL|MD"},"declarations":[{"id":"k0dzbfek-kzgzg0bk","declarationType":"HELP","position":"AFTER_QUESTION_TEXT","label":{"value":"\\"Tester 2 et 20 (pour v\xe9rifier ordre num\xe9rique et lexico)\\"","type":"VTL|MD"}}],"conditionFilter":{"value":"true","type":"VTL"},"controls":[{"id":"k0dzbfek-CI-0","criticality":"WARN","control":{"value":"not(cast(nvl(QNUM,0),integer) > 5)","type":"VTL"},"errorMessage":{"value":"\\"sup \xe0 5\\"","type":"VTL|MD"},"bindingDependencies":["QNUM"],"typeOfControl":"CONSISTENCY"},{"id":"k0dzbfek-CI-1","criticality":"WARN","control":{"value":"not(cast(nvl(QNUM,0),integer) > 6.5)","type":"VTL"},"errorMessage":{"value":"\\"superieur \xe0 6.5\\"","type":"VTL|MD"},"bindingDependencies":["QNUM"],"typeOfControl":"CONSISTENCY"}],"bindingDependencies":["QNUM"],"response":{"name":"QNUM"}}]}]}');var s=t(4186);const r={},l="Question",u={id:"components/decorations/question",title:"Question",description:"Le composant Question entoure une question en lui donnant un contexte suppl\xe9mentaire avec un titre une description et des d\xe9clarations.",source:"@site/docs/components/decorations/question.mdx",sourceDirName:"components/decorations",slug:"/components/decorations/question",permalink:"/Lunatic/docs/components/decorations/question",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/components/decorations/question.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Sequence & SubSequence",permalink:"/Lunatic/docs/components/decorations/sequence"},next:{title:"FilterDescription",permalink:"/Lunatic/docs/components/decorations/filter-description"}},c={},p=[];function d(e){const n={h1:"h1",header:"header",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"question",children:"Question"})}),"\n",(0,i.jsxs)(n.p,{children:["Le composant ",(0,i.jsx)(n.strong,{children:"Question"})," entoure une question en lui donnant un contexte suppl\xe9mentaire avec un titre une description et des d\xe9clarations."]}),"\n","\n",(0,i.jsx)(s.L,{source:a})]})}function T(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);