import{j as t}from"./combo-box-850ed48f.js";import"./index-76fb7be0.js";import{O as n}from"./orchestrator-1d666ab7.js";import{d as r}from"./default-arg-types-a1f723ba.js";import{c as E}from"./index-e3321b55.js";import"./_commonjsHelpers-de833af9.js";import"./index-9d475cdf.js";import"./index-d3ea75b5.js";import"./inheritsLoose-5d86da1e.js";const m=[{id:"1",componentType:"Switch",mandatory:!1,label:{value:'"➡ 1. Are you ready?"',type:"VTL|MD"},statusLabel:{true:"Yes",false:"No"},response:{name:"READY"},missingResponse:{name:"READY_MISSING"}},{id:"2",componentType:"Switch",mandatory:!1,label:{value:'"➡ 2. Are you always ready?"',type:"VTL|MD"},response:{name:"READY2"},missingResponse:{name:"READY2_MISSING"},statusLabel:{true:"Always",false:"Never"}}],u=[{variableType:"COLLECTED",name:"READY",componentRef:"1",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}},{variableType:"COLLECTED",name:"READY_MISSING",componentRef:"1",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}},{variableType:"COLLECTED",name:"READY2",componentRef:"2",values:{PREVIOUS:null,COLLECTED:!0,FORCED:null,EDITED:null,INPUTED:null}},{variableType:"COLLECTED",name:"READY2_MISSING",componentRef:"2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}}],p={components:m,variables:u},d={title:"Components/Switch",component:n,argTypes:r},D=o=>t(n,{...o,custom:E}),e=D.bind({});e.args={id:"switch",source:p};var a,l,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"args => <Orchestrator {...args} custom={custom} />",...(s=(l=e.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,d as default};