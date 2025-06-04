import{O as c}from"./Orchestrator-DNzi8DNk.js";import"./jsx-runtime-BlAj40OV.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Combobox-CPxcyoe5.js";import"./index-Cf-03bMR.js";const p=[{id:"kxi788",componentType:"Duration",isMandatory:!1,format:"PnYnM",page:"1",maxPage:"1",label:{value:'"➡ 1. " || "Duration (format: PnYnM) "',type:"VTL|MD"},description:{value:'"Description"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"DUREE"}}],m=[{variableType:"COLLECTED",name:"DUREE",values:{COLLECTED:"P4Y0M"}}],u={components:p,variables:m},l=[{id:"kxi788",componentType:"Duration",isMandatory:!1,format:"PTnHnM",page:"1",maxPage:"1",label:{value:'"➡ 1. " || "Duration (format: PTnHnM) "',type:"VTL|MD"},description:{value:'"Description"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"DUREE"}}],D=[{variableType:"COLLECTED",name:"DUREE",values:{COLLECTED:"PT12H50M"}}],T={components:l,variables:D},g={title:"Components/Duration",...c},e={args:{source:u}},o={args:{source:T}};var a,r,t;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    source: sourceMonths
  }
}`,...(t=(r=e.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    source: sourceTime
  }
}`,...(i=(s=o.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const C=["DateDuration","TimeDuration"];export{e as DateDuration,o as TimeDuration,C as __namedExportsOrder,g as default};
