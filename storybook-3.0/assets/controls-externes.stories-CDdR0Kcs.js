import{j as n}from"./Label-BfEPv_zd.js";import"./index-CBqU2yxZ.js";import{O as r}from"./orchestrator-BavYhrt5.js";import{d as s}from"./default-arg-types-CWvQhed_.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Datepicker-wUakkRJX.js";import"./Combobox-CEcVmRDh.js";import"./index-BtM5VmRH.js";const i="2",u=[{componentType:"Input",controls:[{bindingDependencies:["TESTSURBOO"],criticality:"WARN",errorMessage:{type:"VTL",value:'"booleen pas coché et on affiche un message un peu long histoire de tester le truc "'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:"not(nvl(TESTSURBOO,false) = false)"},id:"kfxmjupm-CI-0"},{criticality:"WARN",errorMessage:{type:"VTL",value:'"On a coché le booleen et on met une phrase un peu longue car on veut tester ce qui s’affiche"'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:"not(nvl(VAR,false) = true)"},id:"kfxmjupm-CI-1"}],response:{name:"VAR"},conditionFilter:{type:"VTL",value:"true"},id:"kfxmjupm",page:"1",label:{type:"VTL",value:'"➡ 1. " || "Controle sur booleen"'},mandatory:!1},{componentType:"Sequence",conditionFilter:{type:"VTL",value:"true"},id:"kfxmfvwj",page:"2",label:{type:"VTL",value:'"BYE!"'}}],c=[{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTTED:null,FORCED:null,PREVIOUS:null},name:"VAR"}],p={maxPage:i,components:u,variables:c},O={title:"Questionnaires-Tests/Controls-externes",component:r,argTypes:{...s,missing:{table:{disable:!1},control:"boolean",defaultValue:!0},activeGoNextForMissing:{table:{disable:!1},control:"boolean",defaultValue:!0},management:{table:{disable:!1},control:"boolean",defaultValue:!1},activeControls:{control:"boolean",defaultValue:!0}}},m=l=>n.jsx(r,{...l}),e=m.bind({});e.args={id:"externes",pagination:!0,activeControls:!0,source:p};var t,o,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const E=["BoucleN"];export{e as BoucleN,E as __namedExportsOrder,O as default};