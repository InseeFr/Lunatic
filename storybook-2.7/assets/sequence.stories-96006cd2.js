import{j as m}from"./combo-box-5c9e147d.js";import"./index-76fb7be0.js";import{O as p}from"./orchestrator-c1f72c3d.js";import{d as u}from"./default-arg-types-a1f723ba.js";import"./_commonjsHelpers-de833af9.js";import"./index-9d475cdf.js";import"./index-d3ea75b5.js";const T="1",d=[{componentType:"Sequence",page:"1",conditionFilter:{value:"true",type:"VTL"},label:{value:'"Sequence example"',type:"VTL|MD"},declarations:[{id:"kb9hi4j0-krnoclfe",declarationType:"INSTRUCTION",position:"BEFORE_QUESTION_TEXT",label:{value:'"Déclaration Before"',type:"VTL|MD"}},{id:"kb9hi4j0-krnoclfe",declarationType:"INSTRUCTION",position:"AFTER_QUESTION_TEXT",label:{value:'"Déclaration AFTER"',type:"VTL|MD"}},{id:"kb9hi4j0-krnoclfe",declarationType:"HELP",position:"DETACHABLE",label:{value:'"Declaration Detachable"',type:"VTL|MD"}}]}],g={maxPages:T,components:d},y="1",D=[{componentType:"Sequence",page:"1",conditionFilter:{value:"true",type:"VTL"},label:{value:'"Sequence example"',type:"VTL|MD"}},{componentType:"Subsequence",page:"1",conditionFilter:{value:"true",type:"VTL"},label:{value:'"Subsequence example"',type:"VTL|MD"}}],b={maxPage:y,components:D},q={title:"Components/Sequence",component:p,argTypes:{...u}},i=l=>m(p,{...l}),e=i.bind({});e.args={id:"sequence-simple",source:b};const a=i.bind({});a.args={id:"sequence-declarations",source:g};var o,t,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};var s,n,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(c=(n=a.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const v=["Default","WithDeclarations"];export{e as Default,a as WithDeclarations,v as __namedExportsOrder,q as default};