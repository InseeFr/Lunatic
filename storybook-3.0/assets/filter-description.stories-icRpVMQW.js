import{j as u}from"./Declarations-B9Jou-zL.js";import"./index-Cs7sjTYM.js";import{O as i}from"./orchestrator-vKHRPJxy.js";import{d as m}from"./default-arg-types-gvmCcWIB.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Combobox-DGD2gEg3.js";import"./Datepicker-Bxve3eXL.js";import"./index-BU4L-DQy.js";const T="1",d=[{componentType:"FilterDescription",label:{value:"I'm a filter description",type:"VTL|MD"},id:"desc",page:"1"}],D=[],E={maxPage:T,components:d,variables:D},y="3",L=[{componentType:"InputNumber",label:{value:'"How old are you?"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},max:"120",id:"q1",response:{name:"Q1"},page:"1"},{componentType:"FilterDescription",label:{value:`"If you are minor, you'll be redirected to page 3"`,type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},id:"desc",page:"1"},{componentType:"Input",label:{value:'"Fake Q2"',type:"VTL|MD"},conditionFilter:{value:"cast(Q1, number) < 18",type:"VTL"},id:"q2",response:{name:"Q2"},page:"2"},{componentType:"Input",label:{value:'"Fake Q3"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},id:"q3",response:{name:"Q3"},page:"3"}],b=[{variableType:"COLLECTED",name:"Q1",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"Q2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"Q3",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}}],g={maxPage:y,components:L,variables:b},P={title:"Components/FilterDescription",component:i,argTypes:{...m,filterDescription:{table:{disable:!1},control:"boolean",defaultValue:!0}}},p=c=>u.jsx(i,{...c}),e=p.bind({});e.args={id:"filter-description",source:E};const t=p.bind({});t.args={id:"filter-description-options",source:g,filterDescription:!0};var o,r,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var n,s,l;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const Q=["Default","Options"];export{e as Default,t as Options,Q as __namedExportsOrder,P as default};
