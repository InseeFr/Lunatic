import{j as r}from"./jsx-runtime-6809449a.js";import"./index-e67e0a49.js";import{O as l,d as s}from"./default-arg-types-a93ee294.js";import"./_commonjsHelpers-de833af9.js";import"./index-f0521425.js";import"./index-9d475cdf.js";const u="2",i=[{componentType:"Input",controls:[{bindingDependencies:["TESTSURBOO"],criticality:"WARN",errorMessage:{type:"VTL",value:'"booleen pas coché et on affiche un message un peu long histoire de tester le truc "'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:"not(nvl(TESTSURBOO,false) = false)"},id:"kfxmjupm-CI-0"},{criticality:"WARN",errorMessage:{type:"VTL",value:'"On a coché le booleen et on met une phrase un peu longue car on veut tester ce qui s’affiche"'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:"not(nvl(VAR,false) = true)"},id:"kfxmjupm-CI-1"}],response:{name:"VAR"},conditionFilter:{type:"VTL",value:"true"},id:"kfxmjupm",page:"1",label:{type:"VTL",value:'"➡ 1. " || "Controle sur booleen"'},mandatory:!1},{componentType:"Sequence",conditionFilter:{type:"VTL",value:"true"},id:"kfxmfvwj",page:"2",label:{type:"VTL",value:'"BYE!"'}}],c=[{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"VAR"}],p={maxPage:u,components:i,variables:c},y={title:"Questionnaires-Tests/Controls-externes",component:l,argTypes:{...s,missing:{table:{disable:!1},control:"boolean",defaultValue:!0},activeGoNextForMissing:{table:{disable:!1},control:"boolean",defaultValue:!0},management:{table:{disable:!1},control:"boolean",defaultValue:!1},activeControls:{control:"boolean",defaultValue:!0}}},m=n=>r(l,{...n}),e=m.bind({});e.args={id:"externes",pagination:!0,activeControls:!0,source:p};var t,o,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const C=["BoucleN"];export{e as BoucleN,C as __namedExportsOrder,y as default};
//# sourceMappingURL=controls-externes.stories-fc42ce5d.js.map
