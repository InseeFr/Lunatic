import{j as E}from"./jsx-runtime-855de6a5.js";import"./index-e67e0a49.js";import{O as d,d as D}from"./default-arg-types-1b9d3217.js";import"./_commonjsHelpers-de833af9.js";import"./index-853b9fa5.js";import"./index-9d475cdf.js";const b=[{id:"kze792d8",componentType:"InputNumber",mandatory:!1,page:"2",min:0,max:10,decimals:0,label:{value:'"➡ 1. " || "In put for Number "',type:"VTL|MD"},description:{value:'"Description"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"NB"}}],y=[{variableType:"COLLECTED",name:"NB",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}}],v={components:b,variables:y},g=[{id:"kze792d8",componentType:"InputNumber",mandatory:!1,page:"2",min:0,max:10,decimals:0,label:{value:'"➡ 1. " || "NB "',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{value:"S0",type:"VTL|MD"}}},bindingDependencies:["NB"],response:{name:"NB"}}],L=[{variableType:"COLLECTED",name:"NB",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}}],O={components:g,variables:L},N=[{id:"kze792d8",componentType:"InputNumber",mandatory:!1,page:"2",label:{value:'"➡ 1. " || "Big number "',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{value:"S0",type:"VTL|MD"}}},bindingDependencies:["NB"],response:{name:"NB"}}],C=[{variableType:"COLLECTED",name:"NB",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}}],I={components:N,variables:C},x={title:"Components/InputNumber",component:d,argTypes:D},s=T=>E(d,{...T}),e=s.bind({});e.args={id:"input-number",source:v,min:0,max:10,decimals:0};const a=s.bind({});a.args={id:"input-number-euro",source:O,unit:"€"};const r=s.bind({});r.args={id:"input-number-thousand",source:I,min:10,max:1e6,decimals:0,thousandSeparator:!0};var n,o,t;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(t=(o=e.parameters)==null?void 0:o.docs)==null?void 0:t.source}}};var l,u,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var i,c,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const F=["Default","UnitEuros","ThousandSeparator"];export{e as Default,r as ThousandSeparator,a as UnitEuros,F as __namedExportsOrder,x as default};
//# sourceMappingURL=input-number.stories-86261390.js.map