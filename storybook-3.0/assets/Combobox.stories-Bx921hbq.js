import{j as n}from"./Label-CI4doyRt.js";import{e as f}from"./entry-preview-DUpxnS0x.js";import{R as C,r as d}from"./index-Cs7sjTYM.js";import{C as x}from"./Combobox-50Odr26U.js";import"./_commonjsHelpers-BosuxZz1.js";import"./react-18-B8QpLNLP.js";import"./index-BU4L-DQy.js";const{global:T}=__STORYBOOK_MODULE_GLOBAL__;__STORYBOOK_MODULE_PREVIEW_API__;const{TestingLibraryMustBeConfiguredError:h}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;var{window:p}=T;p&&(p.STORYBOOK_ENV="react");({...f});var O;typeof module<"u"&&((O=module==null?void 0:module.hot)==null||O.decline());const V={title:"Components/Shared/ComboBox",component:x},m=({option:e,placeholder:r})=>n.jsx(n.Fragment,{children:(e==null?void 0:e.label)??r}),L=e=>{const[r,a]=d.useState(e.value),[s,u]=d.useState(""),c=s?e.options.filter(t=>t.value.toLowerCase().includes(s.toLowerCase())):e.options;return n.jsxs("fieldset",{children:[n.jsxs("legend",{children:["Select an option : ",r]}),n.jsx(x,{...e,value:r,onSelect:t=>{var l;a(t),(l=e.onSelect)==null||l.call(e,t)},onChange:t=>{var l;u(t),(l=e.onChange)==null||l.call(e,t)},options:c,labelRenderer:m,optionRenderer:m}),n.jsx("button",{onClick:()=>a("4"),children:"Sélectionner paris"})]})},o={render:e=>n.jsx(L,{...e}),args:{value:"1",options:[{id:"1",value:"Option 1",label:n.jsx("strong",{children:"Option 1"})},{id:"2",value:"Option 2",label:"Option 2"},{id:"3",value:"Option 3",label:"Option 3"},{id:"paris",value:"Paris",label:"Paris"},{id:"toulouse",value:"Toulouse",label:"Toulouse"}]}},i={...o,args:{...o.parameters,editable:!0}};var b,_,E;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <Template {...args} />,
  args: {
    value: '1',
    options: [{
      id: '1',
      value: 'Option 1',
      label: <strong>Option 1</strong>
    }, {
      id: '2',
      value: 'Option 2',
      label: 'Option 2'
    }, {
      id: '3',
      value: 'Option 3',
      label: 'Option 3'
    }, {
      id: 'paris',
      value: 'Paris',
      label: 'Paris'
    }, {
      id: 'toulouse',
      value: 'Toulouse',
      label: 'Toulouse'
    }]
  }
}`,...(E=(_=o.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var v,R,S;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.parameters,
    editable: true
  }
}`,...(S=(R=i.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};const K=["Default","Editable"];export{o as Default,i as Editable,K as __namedExportsOrder,V as default};
