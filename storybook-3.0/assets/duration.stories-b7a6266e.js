import{j as u}from"./Label-467e0f29.js";import"./index-76fb7be0.js";import{d as c}from"./default-arg-types-a1f723ba.js";import{O as p}from"./orchestrator-b8468b3a.js";import"./_commonjsHelpers-de833af9.js";import"./Datepicker-b0fca8aa.js";import"./index-9d475cdf.js";import"./Combobox-8969a92a.js";import"./index-d3ea75b5.js";const D=[{id:"kxi788",componentType:"Duration",mandatory:!1,format:"PnYnM",page:"1",maxPage:"1",label:{value:'"➡ 1. " || "Duration (format: PnYnM) "',type:"VTL|MD"},description:{value:'"Description"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"DUREE"}}],E=[{variableType:"COLLECTED",name:"DUREE",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}}],T={components:D,variables:E},d=[{id:"kxi788",componentType:"Duration",mandatory:!1,format:"PTnHnM",page:"1",maxPage:"1",label:{value:'"➡ 1. " || "Duration (format: PTnHnM) "',type:"VTL|MD"},description:{value:'"Description"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"DUREE"}}],g=[{variableType:"COLLECTED",name:"DUREE",values:{PREVIOUS:null,COLLECTED:"PT12H50M",FORCED:null,EDITED:null,INPUTTED:null}}],v={components:d,variables:g},R={title:"Components/Duration",component:p,argTypes:c},m=l=>u.jsx(p,{...l}),e=m.bind({});e.args={id:"durationAnnéesMois",source:T};const r=m.bind({});r.args={id:"durationHeureMinute",source:v};var o,a,t;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(t=(a=e.parameters)==null?void 0:a.docs)==null?void 0:t.source}}};var n,s,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const U=["DateDuration","TimeDuration"];export{e as DateDuration,r as TimeDuration,U as __namedExportsOrder,R as default};
