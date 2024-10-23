import{j as a}from"./jsx-runtime-BlAj40OV.js";import{_ as h}from"./iframe-DcwwBI-z.js";import{e as j,b as u,g as w,s as d,a as R}from"./chunk-OOL6AVF7-7VEs9Qe_.js";import{r as m}from"./index-Cs7sjTYM.js";import{C as S}from"./Combobox-hur2WqB0.js";import"../sb-preview/runtime.js";import"./chunk-H6MOWX77-DTQOW814.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-Cf-03bMR.js";import"./Declarations-CcAzpTKH.js";const{global:C}=__STORYBOOK_MODULE_GLOBAL__;__STORYBOOK_MODULE_PREVIEW_API__;var{window:b}=C;b&&(b.STORYBOOK_ENV="react");({...j});function L(){return typeof jest<"u"&&jest!==null?setTimeout._isMockFunction===!0||Object.prototype.hasOwnProperty.call(setTimeout,"clock"):!1}var _;typeof module<"u"&&((_=module==null?void 0:module.hot)==null||_.decline());const M={title:"Components/Shared/ComboBox",component:S},O=({option:e,placeholder:t})=>a.jsx(a.Fragment,{children:(e==null?void 0:e.label)??t}),P=e=>{const[t,n]=m.useState(e.value),[r,s]=m.useState(""),p=r?e.options.filter(o=>o.value.toLowerCase().includes(r.toLowerCase())):e.options;return a.jsxs("fieldset",{children:[a.jsxs("legend",{children:["Select an option : ",t]}),a.jsx(S,{...e,value:t,onSelect:o=>{var i;n(o),(i=e.onSelect)==null||i.call(e,o)},onChange:o=>{var i;s(o),(i=e.onChange)==null||i.call(e,o)},options:p,labelRenderer:O,optionRenderer:O}),a.jsx("button",{onClick:()=>n("4"),children:"Sélectionner paris"})]})},l={render:e=>a.jsx(P,{...e}),args:{value:"1",options:[{id:"1",value:"Option 1",label:a.jsx("strong",{children:"Option 1"})},{id:"2",value:"Option 2",label:"Option 2"},{id:"3",value:"Option 3",label:"Option 3"},{id:"paris",value:"Paris",label:"Paris"},{id:"toulouse",value:"Toulouse",label:"Toulouse"}]}},c={...l,args:{...l.parameters,editable:!0}};var v,y,f;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(f=(y=l.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var T,E,x;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.parameters,
    editable: true
  }
}`,...(x=(E=c.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};const Y=["Default","Editable"];export{l as Default,c as Editable,Y as __namedExportsOrder,M as default};
