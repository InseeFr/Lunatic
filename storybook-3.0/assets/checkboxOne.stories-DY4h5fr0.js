import{j as i}from"./Label-B671VB1p.js";import"./index-BwDkhjyp.js";import{O as c}from"./orchestrator-Csps1SwC.js";import{d as m}from"./default-arg-types-gvmCcWIB.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Datepicker-CaUjcyee.js";import"./Combobox-BIHx2q7j.js";import"./index-B8XB3FuZ.js";const D="../../../lunatic-schema.json",T="1",v=[{id:"checkboxone",componentType:"CheckboxOne",mandatory:!1,page:"1",label:{value:'"checkboxone ONE component"',type:"VTL|MD"},description:{value:'"true or false"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},options:[{value:"1",description:{value:'"Déclaration oui"',type:"VTL|MD"},label:{value:'"oui"',type:"VTL|MD"}},{value:"2",description:{value:'"Déclaration non"',type:"VTL|MD"},label:{value:'"non"',type:"VTL|MD"}}],response:{name:"Q2"}}],E=[{variableType:"COLLECTED",name:"Q2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}}],d={$schema:D,maxPage:T,components:v,variables:E},L="../../../lunatic-schema.json",b=[{id:"checkboxone",componentType:"CheckboxOne",mandatory:!1,page:"3",label:{value:'"checkboxone ONE component"',type:"VTL|MD"},description:{value:'"true or false"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},options:[{value:"1",description:{value:'"Déclaration oui"',type:"VTL|MD"},label:{value:'"oui"',type:"VTL|MD"}},{value:"2",description:{value:'"Déclaration non"',type:"VTL|MD"},label:{value:'"non"',type:"VTL|MD"}},{value:"3",label:{value:'"Autre"',type:"VTL|MD"},detail:{label:{value:'"Préciser : "',type:"VTL"},response:{name:"Q3"}}}],response:{name:"Q2"}}],y=[{variableType:"COLLECTED",name:"Q2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"Q3",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}}],h={$schema:L,components:b,variables:y},P={title:"Components/CheckboxOne",component:c,argTypes:{...m,shortcut:{table:{disable:!1},control:"boolean",defaultValue:!0}}},u=p=>i.jsx(c,{...p}),e=u.bind({});e.args={source:d,shortcut:!1};const a=u.bind({});a.args={source:h,shortcut:!1};var o,t,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(l=(t=e.parameters)==null?void 0:t.docs)==null?void 0:l.source}}};var n,s,r;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(r=(s=a.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const k=["Default","WithDetail"];export{e as Default,a as WithDetail,k as __namedExportsOrder,P as default};