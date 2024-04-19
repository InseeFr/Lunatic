import{j as u}from"./Label-BfEPv_zd.js";import"./index-CBqU2yxZ.js";import{O as r,t}from"./orchestrator-DrFteGPq.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Datepicker-wUakkRJX.js";import"./Combobox-CEcVmRDh.js";import"./index-BtM5VmRH.js";const s="3",E=[{id:"seq",componentType:"Sequence",label:{value:'"Description des individus de votre logement"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"1"},{id:"loop-prenom",componentType:"RosterForLoop",header:[{headerCell:!0,label:"Prénom"},{headerCell:!0,label:"Nom"},{headerCell:!0,label:"Date de naissance"},{headerCell:!0,label:"Age"}],label:{value:'"Ajouter un individu"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["PRENOM","AGE"],lines:{min:{value:1,type:"VTL"},max:{value:250,type:"VTL"}},page:"1",components:[{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["PRENOM"],id:"prenom",response:{name:"PRENOM"}},{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["NOM"],id:"nom",response:{name:"NOM"}},{componentType:"Datepicker",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["BIRTHDAY"],id:"birthday",dateFormat:"YYYY-MM-DD",response:{name:"BIRTHDAY"}},{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["AGE"],id:"age",response:{name:"AGE"}}]},{id:"loop",componentType:"Loop",loopDependencies:["PRENOM"],iterations:{value:"count(PRENOM)",type:"VTL"},page:"2",maxPage:"1",depth:1,paginatedLoop:!0,conditionFilter:{value:"true",type:"VTL"},components:[{id:"age",label:{value:'PRENOM || ", quel est vôtre âge ?"',type:"VTL"},conditionFilter:{value:"true",type:"VTL"},page:"2.1",componentType:"InputNumber",min:0,max:120,decimals:0,response:{name:"AGE"}}]},{id:"seq-end",componentType:"Sequence",label:{value:'"End"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"3"}],m={PRENOM:{size:"count(PRENOM)",variables:["AGE"]}},c=[{variableType:"COLLECTED",name:"PRENOM",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}},{variableType:"COLLECTED",name:"NOM",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}},{variableType:"COLLECTED",name:"BIRTHDAY",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}},{variableType:"COLLECTED",name:"AGE",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}}],T={maxPage:s,components:E,resizing:m,variables:c};function d(e){return{COLLECTED:Object.fromEntries(Object.entries(e).map(([i,p])=>[i,{CALCULATED:null,EXTERNAL:null,COLLECTED:p}])),CALCULATED:{},EXTERNAL:{}}}const b={title:"Behaviour/Performance",component:r},D=e=>u.jsx(r,{...e}),n=D.bind({});n.args={id:"performance-default",pagination:!0,source:T,data:d({PRENOM:t(200,e=>`John${e}`),NOM:t(200,e=>`Doe${e}`),AGE:t(200,e=>e+1),BIRTHDAY:t(200,e=>`2${e.toString().padStart(3,"0")}-01-01`)})};var a,o,l;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(l=(o=n.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const P=["Default"];export{n as Default,P as __namedExportsOrder,b as default};