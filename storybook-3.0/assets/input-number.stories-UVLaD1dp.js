import{a as l}from"./Orchestrator-BiKbeVtG.js";import"./jsx-runtime-BlAj40OV.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Combobox-BCuRxKsy.js";import"./index-Cf-03bMR.js";import"./index-Dk74W0Oi.js";const d="../../../lunatic-schema.json",b=[{id:"kze792d8",componentType:"InputNumber",page:"1",min:0,max:1e5,decimals:2,label:{value:'"➡ 1. " || "Input number (between 0 and 100 000)"',type:"VTL|MD"},description:{value:'"Description"',type:"VTL|MD"},response:{name:"NB"}}],T=[{variableType:"COLLECTED",name:"NB",values:{COLLECTED:null}}],v={$schema:d,components:b,variables:T},y="../../../lunatic-schema.json",L=[{id:"kze792d8",componentType:"InputNumber",isMandatory:!1,page:"1",min:0,decimals:0,unit:{value:'"€"',type:"VTL"},label:{value:'"➡ 1. " || "NB "',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["NB"],response:{name:"NB"}}],N=[{variableType:"COLLECTED",name:"NB",values:{COLLECTED:null}}],g={$schema:y,components:L,variables:N},D="../../../lunatic-schema.json",B=[{id:"kze792d8",componentType:"InputNumber",isMandatory:!1,page:"1",min:0,max:10,decimals:0,unit:{value:'"€"',type:"VTL"},label:{value:'"➡ 1. " || "NB "',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["NB"],response:{name:"NB"}},{id:"kze792d8",componentType:"InputNumber",isMandatory:!1,page:"1",min:0,max:10,decimals:0,unit:"$",label:{value:'"➡ 1. " || "NB "',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["NB"],response:{name:"NB"}}],E=[{variableType:"COLLECTED",name:"NB",values:{COLLECTED:null}}],C={$schema:D,components:B,variables:E},x={title:"Components/InputNumber",...l},e={args:{source:v}},a={args:{source:C}},n={args:{source:g}};var s,r,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    source
  }
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var t,c,i;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    source: sourceEuro
  }
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var m,p,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    source: sourceBigNumber
  }
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const k=["Default","DynamicUnit","BigNumber"];export{n as BigNumber,e as Default,a as DynamicUnit,k as __namedExportsOrder,x as default};
