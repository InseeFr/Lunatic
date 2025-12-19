import{a as s}from"./Orchestrator-CxZTTmho.js";import"./jsx-runtime-BlAj40OV.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Combobox-C6KMZboJ.js";import"./index-Cf-03bMR.js";import"./index-Dk74W0Oi.js";const g=[{id:"radio",componentType:"Radio",isMandatory:!1,page:"3",label:{value:'"Label for a Radio component"',type:"VTL|MD"},description:{value:'"Description of a Radio component"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},options:[{value:"1",description:{value:'"Déclaration oui"',type:"VTL|MD"},label:{value:'"oui"',type:"VTL|MD"}},{value:"2",description:{value:'"Déclaration non"',type:"VTL|MD"},label:{value:'"non"',type:"VTL|MD"}}],response:{name:"Q2"}}],V=[{variableType:"COLLECTED",name:"Q2",values:{COLLECTED:null}}],C={components:g,variables:V},M="../../../lunatic-schema.json",O="1",$=[{id:"radio",componentType:"Radio",isMandatory:!1,orientation:"horizontal",page:"1",label:{value:'"Label for a Radio component"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},options:[{value:"1",label:{value:'"oui"',type:"VTL|MD"}},{value:"2",label:{value:'"non"',type:"VTL|MD"}}],response:{name:"Q2"}}],h=[{variableType:"COLLECTED",name:"Q2",values:{COLLECTED:null}}],f={$schema:M,maxPage:O,components:$,variables:h},R="../../../lunatic-schema.json",Q="1",x=[{id:"radio",componentType:"Radio",isMandatory:!1,page:"1",label:{value:'"Label for a Radio component"',type:"VTL|MD"},description:{value:'"Description of a Radio component"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},options:[{value:"1",description:{value:'"Déclaration oui"',type:"VTL|MD"},label:{value:'"oui"',type:"VTL|MD"}},{value:"2",description:{value:'"Déclaration non"',type:"VTL|MD"},label:{value:'"non"',type:"VTL|MD"}},{value:"3",label:{value:"Autre",type:"TXT"},detail:{label:{value:'"Préciser : "',type:"VTL"},response:{name:"Q2_DETAIL"}}}],response:{name:"Q2"}},{id:"end",componentType:"Sequence",page:"2"}],z=[{variableType:"COLLECTED",name:"Q2",values:{COLLECTED:null}},{variableType:"COLLECTED",name:"Q2_DETAIL",values:{COLLECTED:null}}],A={$schema:R,maxPage:Q,components:x,variables:z},P="../../../lunatic-schema.json",S=[{id:"a",componentType:"InputNumber",page:"1",label:{value:"Votre age",type:"TXT"},response:{name:"AGE"}},{id:"b",componentType:"Radio",page:"1",label:{value:"Où sortez vous ?",type:"TXT"},response:{name:"LIEU"},options:[{value:"bar",label:{value:"Bar",type:"TXT"},conditionFilter:{value:"nvl(AGE, 0) > 18",type:"VTL"}},{value:"parc",label:{value:"Parc",type:"TXT"}}]}],I=[{variableType:"COLLECTED",name:"AGE",values:{COLLECTED:null}},{variableType:"COLLECTED",name:"LIEU",values:{COLLECTED:null}}],X={$schema:P,components:S,variables:I},q={title:"Components/Radio",...s,args:{...s.args,shortcut:!0}},e={args:{source:C}},a={args:{source:X}},o={args:{source:f}},n={args:{source:C,readOnly:!0}},r={args:{source:A}};var t,l,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    source
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var i,p,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    source: sourceCondition
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,d,v;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    source: sourceHorizontal
  }
}`,...(v=(d=o.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};var T,L,y;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    source,
    readOnly: true
  }
}`,...(y=(L=n.parameters)==null?void 0:L.docs)==null?void 0:y.source}}};var D,b,E;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    source: sourceDetail
  }
}`,...(E=(b=r.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};const B=["Default","Condition","Horizontal","ReadOnly","WithDetail"];export{a as Condition,e as Default,o as Horizontal,n as ReadOnly,r as WithDetail,B as __namedExportsOrder,q as default};
