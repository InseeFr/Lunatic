import{j as D}from"./Label-467e0f29.js";import"./index-76fb7be0.js";import{O as b}from"./orchestrator-1283240d.js";import{d as R}from"./default-arg-types-a1f723ba.js";import{p as P,s as V}from"./e2e-2a3b2c5c.js";import"./_commonjsHelpers-de833af9.js";import"./Datepicker-b0fca8aa.js";import"./index-9d475cdf.js";import"./Combobox-8969a92a.js";import"./index-d3ea75b5.js";import"./index-3bc1f5ac.js";const N="3",x=[{id:"seq",componentType:"Sequence",label:{value:'"Description des individus de votre logement"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"1"},{id:"loop-prenom",componentType:"RosterForLoop",label:{value:'"Ajouter un individu"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["PRENOM"],lines:{min:{value:"1",type:"VTL"},max:{value:"10",type:"VTL"}},page:"1",components:[{componentType:"Input",label:{value:'"Prénom"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["PRENOM"],id:"prenom",response:{name:"PRENOM"}}]},{id:"loop",componentType:"Loop",loopDependencies:["PRENOM"],iterations:{value:"count(PRENOM)",type:"VTL"},page:"2",maxPage:"1",depth:1,paginatedLoop:!0,conditionFilter:{value:"true",type:"VTL"},components:[{id:"age",label:{value:'PRENOM || ", quel est vôtre âge ?"',type:"VTL"},conditionFilter:{value:"true",type:"VTL"},page:"2.1",componentType:"InputNumber",min:0,max:120,decimals:0,response:{name:"AGE"}}]},{id:"seq-end",componentType:"Sequence",label:{value:'"End"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"3"}],M={PRENOM:{size:"count(PRENOM)",variables:["AGE"]}},C=[{variableType:"COLLECTED",name:"PRENOM",values:{PREVIOUS:[],COLLECTED:[],FORCED:[],EDITED:[],INPUTED:[]}},{variableType:"COLLECTED",name:"AGE",values:{PREVIOUS:[],COLLECTED:[],FORCED:[],EDITED:[],INPUTED:[]}}],i={maxPage:N,components:x,resizing:M,variables:C},F="3",h=[{id:"seq",componentType:"Sequence",label:{value:'"Description des individus de votre logement"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"1"},{id:"loop-prenom",componentType:"RosterForLoop",header:[{headerCell:!0,label:"Prénom"},{headerCell:!0,label:"Age"}],label:{value:'"Ajouter un individu"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["PRENOM","AGE"],lines:{min:{value:1,type:"VTL"},max:{value:10,type:"VTL"}},page:"1",components:[{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["PRENOM"],id:"prenom",response:{name:"PRENOM"}},{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["AGE"],id:"age",response:{name:"AGE"}}]},{id:"loop",componentType:"Loop",loopDependencies:["PRENOM"],iterations:{value:"count(PRENOM)",type:"VTL"},page:"2",maxPage:"1",depth:1,paginatedLoop:!0,conditionFilter:{value:"true",type:"VTL"},components:[{id:"age",label:{value:'PRENOM || ", quel est vôtre âge ?"',type:"VTL"},conditionFilter:{value:"true",type:"VTL"},page:"2.1",componentType:"InputNumber",min:0,max:120,decimals:0,response:{name:"AGE"}}]},{id:"seq-end",componentType:"Sequence",label:{value:'"End"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"3"}],f={PRENOM:{size:"count(PRENOM)",variables:["AGE"]}},I=[{variableType:"COLLECTED",name:"PRENOM",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"AGE",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}}],w={maxPage:F,components:h,resizing:f,variables:I},H={title:"Components/RosterForLoop",component:b,argTypes:R},r=l=>D.jsx(b,{...l}),o=r.bind({}),a=r.bind({}),n=r.bind({});o.args={id:"roster-for-loop",source:i};a.args={id:"roster-for-loop-readonly",source:i,readOnly:!0};n.args={id:"roster-for-loop-headers",source:w};const t=r.bind({});t.args={id:"roster-for-loop",source:i};t.play=async({args:l,canvasElement:O})=>{const e=P(O);await V(100),await e.getByRole("button",{name:"Ajouter un individu"}).click(),await e.getByLabel("Prénom",{index:0}).fill("John"),await e.getByLabel("Prénom",{index:1}).fill("Jane"),await e.getByRole("button",{name:"Next"}).click(),await e.getByLabel("John, quel est vôtre âge ?").fill("18"),await e.getByRole("button",{name:"Next"}).click(),await e.getByLabel("Jane, quel est vôtre âge ?").fill("21"),await e.getByLabel(/Page/).fill("2.1#1"),await e.getByRole("button",{name:/Go to page/}).click(),await e.getByRole("button",{name:"Next"}).click(),await e.getByRole("button",{name:"Next"}).click(),await e.getByText("End").shouldBeVisible()};var s,p,c;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(c=(p=o.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,d,m;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,E,y;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(y=(E=n.parameters)==null?void 0:E.docs)==null?void 0:y.source}}};var T,L,v;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(v=(L=t.parameters)==null?void 0:L.docs)==null?void 0:v.source}}};const W=["Default","ReadOnly","WithHeader","Filled"];export{o as Default,t as Filled,a as ReadOnly,n as WithHeader,W as __namedExportsOrder,H as default};
