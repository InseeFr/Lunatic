import{j as o}from"./Label-BfEPv_zd.js";import"./entry-preview-DAq4ziin.js";import{r as u}from"./index-CBqU2yxZ.js";import{C as S}from"./Combobox-CEcVmRDh.js";import"./_commonjsHelpers-BosuxZz1.js";import"./react-18-D8cruF67.js";import"./index-BtM5VmRH.js";const{global:E}=__STORYBOOK_MODULE_GLOBAL__;__STORYBOOK_MODULE_PREVIEW_API__;var{window:p}=E;p&&(p.STORYBOOK_ENV="react");var c;typeof module<"u"&&((c=module==null?void 0:module.hot)==null||c.decline());const B={title:"Components/Shared/ComboBox",component:S},d=({option:e,placeholder:l})=>o.jsx(o.Fragment,{children:(e==null?void 0:e.label)??l}),j=e=>{const[l,s]=u.useState(e.value),[i,f]=u.useState(""),h=i?e.options.filter(n=>n.value.toLowerCase().includes(i.toLowerCase())):e.options;return o.jsxs("fieldset",{children:[o.jsxs("legend",{children:["Select an option : ",l]}),o.jsx(S,{...e,value:l,onSelect:n=>{var a;s(n),(a=e.onSelect)==null||a.call(e,n)},onChange:n=>{var a;f(n),(a=e.onChange)==null||a.call(e,n)},options:h,labelRenderer:d,optionRenderer:d}),o.jsx("button",{onClick:()=>s("4"),children:"Sélectionner paris"})]})},t={render:e=>o.jsx(j,{...e}),args:{value:"1",options:[{id:"1",value:"Option 1",label:o.jsx("strong",{children:"Option 1"})},{id:"2",value:"Option 2",label:"Option 2"},{id:"3",value:"Option 3",label:"Option 3"},{id:"paris",value:"Paris",label:"Paris"},{id:"toulouse",value:"Toulouse",label:"Toulouse"}]}},r={...t,args:{...t.parameters,editable:!0}};var m,O,b;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(b=(O=t.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};var _,v,x;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.parameters,
    editable: true
  }
}`,...(x=(v=r.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const g=["Default","Editable"];export{t as Default,r as Editable,g as __namedExportsOrder,B as default};
