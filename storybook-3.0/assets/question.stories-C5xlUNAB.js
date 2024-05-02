import{O as a}from"./orchestrator-CBj6GsvA.js";import{d as o}from"./default-arg-types-CWvQhed_.js";import"./Label-BfEPv_zd.js";import"./index-CBqU2yxZ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Datepicker-wUakkRJX.js";import"./Combobox-CEcVmRDh.js";import"./index-BtM5VmRH.js";const l="question",r="2",s=[{variableType:"COLLECTED",name:"TESTTEXTE",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"QNUM",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}}],p=[{componentType:"Question",id:"idQuestion",page:"1",label:{type:"VTL|MD",value:'"Question"'},description:{type:"VTL|MD",value:'"Description de la question"'},declarations:[{declarationType:"HELP",id:"idQuestion-help1",label:{type:"VTL|MD",value:'"Contenu de la  première déclaration avant (contexte)"'},position:"BEFORE_QUESTION_TEXT"},{declarationType:"HELP",id:"idQuestion-help2",label:{type:"VTL|MD",value:'"Contenu de la  deuxième déclaration avant (contexte)"'},position:"BEFORE_QUESTION_TEXT"},{declarationType:"HELP",id:"idQuestion-help3",label:{type:"VTL|MD",value:'"Contenu de la première déclaration après (Information)"'},position:"AFTER_QUESTION_TEXT"},{declarationType:"HELP",id:"idQuestion-help4",label:{type:"VTL|MD",value:'"Contenu de la deuxième déclaration après (Information)"'},position:"AFTER_QUESTION_TEXT"}],components:[{componentType:"Input",bindingDependencies:["TESTTEXTE"],controls:[{bindingDependencies:["TESTTEXTE"],criticality:"WARN",errorMessage:{type:"VTL|MD",value:`"L'input ne peut pas valoir BLABLA"`},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:'not(nvl(TESTTEXTE,"") = "BLABLA")'},id:"kfxn6f16-CI-0"},{bindingDependencies:["TESTTEXTE"],criticality:"WARN",errorMessage:{type:"VTL|MD",value:'"Cette phrase un peu longue s’affiche si on a du vide pour la variable sur le texte inférieur à 255 caractères et voilà"'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:"not(isnull(TESTTEXTE))"},id:"kfxn6f16-CI-1"}],response:{name:"TESTTEXTE"},conditionFilter:{type:"VTL",value:"true"},id:"kfxn6f16",page:"1",label:{type:"VTL|MD",value:'"Le label du champ input"'},mandatory:!1,maxLength:15,declarations:[{declarationType:"INSTRUCTION",id:"kfxn6f16-kfxn36ru",label:{type:"VTL|MD",value:'"Tester la saisie de BLABLA"'},position:"AFTER_QUESTION_TEXT"}]}]},{componentType:"Question",id:"idQuestion2",page:"2",label:{type:"VTL|MD",value:'"Question 2"'},description:{type:"VTL|MD",value:'"Description de la question 2"'},components:[{id:"k0dzbfek",componentType:"InputNumber",mandatory:!1,page:"2",min:0,max:100,decimals:0,label:{value:'"➡ 1. " || "Test de supériorité stricte - Saisie d’un nombre compris entre 0 et 100 - Si valeur supérieure à 5 message d’info. si superieur à 6,5 autre message "',type:"VTL|MD"},declarations:[{id:"k0dzbfek-kzgzg0bk",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Tester 2 et 20 (pour vérifier ordre numérique et lexico)"',type:"VTL|MD"}}],conditionFilter:{value:"true",type:"VTL"},controls:[{id:"k0dzbfek-CI-0",criticality:"WARN",control:{value:"not(cast(nvl(QNUM,0),integer) > 5)",type:"VTL"},errorMessage:{value:'"sup à 5"',type:"VTL|MD"},bindingDependencies:["QNUM"]},{id:"k0dzbfek-CI-1",criticality:"WARN",control:{value:"not(cast(nvl(QNUM,0),integer) > 6.5)",type:"VTL"},errorMessage:{value:'"superieur à 6.5"',type:"VTL|MD"},bindingDependencies:["QNUM"]}],bindingDependencies:["QNUM"],response:{name:"QNUM"}}]}],T={pagination:l,maxPage:r,variables:s,components:p},D={title:"Components/Question",component:a,argTypes:{...o}},e={args:{id:"sequence-simple",source:T}};var n,t,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    id: 'sequence-simple',
    source
  }
}`,...(i=(t=e.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,D as default};
