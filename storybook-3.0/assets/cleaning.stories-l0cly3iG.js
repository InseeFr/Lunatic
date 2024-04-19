import{j as d}from"./Label-BfEPv_zd.js";import"./index-CBqU2yxZ.js";import{O as r}from"./orchestrator-DrFteGPq.js";import{d as E}from"./default-arg-types-CWvQhed_.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Datepicker-wUakkRJX.js";import"./Combobox-CEcVmRDh.js";import"./index-BtM5VmRH.js";const T={ORIGIN:{CITY:'ORIGIN = "FR"'}},g=[{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTTED:null,FORCED:null,PREVIOUS:null},name:"ORIGIN"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTTED:null,FORCED:null,PREVIOUS:null},name:"CITY"}],m=[{componentType:"Sequence",hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "Test du cleaning"'}},{componentType:"Radio",id:"radio",controls:[],hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}}},options:[{value:"US",label:{value:'"Etats unis"',type:"VTL|MD"}},{value:"FR",label:{value:'"France"',type:"VTL|MD"}}],conditionFilter:{type:"VTL",value:"true"},label:{type:"VTL|MD",value:'"➡ 1. " || "Origine"'},mandatory:!1,bindingDependencies:["ORIGIN"],response:{name:"ORIGIN"},page:"2"},{componentType:"Input",id:"input",controls:[],hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}}},conditionFilter:{type:"VTL",value:'ORIGIN = "FR"'},label:{type:"VTL|MD",value:'"➡ 2. " || "Ville de france"'},mandatory:!1,bindingDependencies:["CITY"],response:{name:"CITY"},page:"3"},{componentType:"Sequence",conditionFilter:{type:"VTL",value:"true"},id:"ksyjs7vy",page:"4",label:{type:"VTL|MD",value:'"END"'}}],D="question",y="2.3.2-rc4",b="TESTSURSUM",L="2.4.1-pairwise",v="14-04-2023 09:00:09",O=!1,I="lb3ei722",C="4",p={cleaning:T,variables:g,components:m,pagination:D,lunaticModelVersion:y,modele:b,enoCoreVersion:L,generatingDate:v,missing:O,id:I,maxPage:C},V={PRENOM:{variables:["AGE","HIDE_AGE"],size:"count(PRENOM)"}},R={HIDE_AGE:{AGE:"false"}},M=[{variableType:"COLLECTED",values:{COLLECTED:["John","Jane"],EDITED:null,INPUTTED:null,FORCED:null,PREVIOUS:null},name:"PRENOM"},{variableType:"COLLECTED",values:{COLLECTED:[null],EDITED:null,INPUTTED:null,FORCED:null,PREVIOUS:null},name:"AGE"},{variableType:"COLLECTED",values:{COLLECTED:[null],EDITED:null,INPUTTED:null,FORCED:null,PREVIOUS:null},name:"HIDE_AGE"}],f=[{componentType:"Loop",id:"loop",label:"Ajouter",bindingDependencies:["PRENOM"],lines:{min:{value:1,type:"VTL"},max:{value:10,type:"VTL"}},page:"1",components:[{componentType:"Input",label:"Prénom",bindingDependencies:["PRENOM"],id:"prenom",response:{name:"PRENOM"}}]},{componentType:"Loop",id:"loop2",paginatedLoop:!0,bindingDependencies:["PRENOM"],iterations:{value:"count(PRENOM)",type:"VTL"},page:"2",maxPage:"2",components:[{componentType:"Input",label:{value:'"Age de " || PRENOM',type:"VTL"},bindingDependencies:["AGE"],id:"age",page:"2.1",response:{name:"AGE"}},{componentType:"CheckboxBoolean",label:{value:`"Masquer l'age de " || PRENOM || " ?"`,type:"VTL"},bindingDependencies:["HIDE_AGE"],id:"hideage",page:"2.2",response:{name:"HIDE_AGE"}}]},{componentType:"Sequence",conditionFilter:{type:"VTL",value:"true"},id:"ksyjs7vy",page:"3",label:{type:"VTL|MD",value:'"END"'}}],P="question",N="2.3.2-rc4",S="TESTSURSUM",G="2.4.1-pairwise",F="14-04-2023 09:00:09",U=!1,A="lb3ei722",h="3",x={resizing:V,cleaning:R,variables:M,components:f,pagination:P,lunaticModelVersion:N,modele:S,enoCoreVersion:G,generatingDate:F,missing:U,id:A,maxPage:h},w={title:"Behaviour/Cleaning",component:r,argTypes:{...E,missing:{table:{disable:!1},control:"boolean",defaultValue:!0},activeGoNextForMissing:{table:{disable:!1},control:"boolean",defaultValue:!0},management:{table:{disable:!1},control:"boolean",defaultValue:!1},activeControls:{control:"boolean",defaultValue:!0},source:{table:{disable:!1},control:{type:"object"},defaultValue:p},data:{table:{disable:!1},control:{type:"object"},defaultValue:{COLLECTED:{READY:{COLLECTED:!0}}}}}},c=u=>d.jsx(r,{...u}),e=c.bind({});e.args={id:"cleaning-default",pagination:!0,source:p};const n=c.bind({});n.args={id:"cleaning-loop",pagination:!0,source:x};var a,o,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(l=(o=e.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var t,s,i;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(i=(s=n.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const B=["Default","Loop"];export{e as Default,n as Loop,B as __namedExportsOrder,w as default};