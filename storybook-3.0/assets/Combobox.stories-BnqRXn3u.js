import{j as n}from"./jsx-runtime-BlAj40OV.js";import{r as u}from"./index-Cs7sjTYM.js";import{C as O}from"./Combobox-D2nJ847f.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Declarations-CAf2Yl5K.js";const L={title:"Components/Shared/ComboBox",component:O},p=({option:e,placeholder:l})=>n.jsx(n.Fragment,{children:(e==null?void 0:e.label)??l}),S=e=>{const[l,s]=u.useState(e.value),[i,f]=u.useState(""),h=i?e.options.filter(o=>o.value.toLowerCase().includes(i.toLowerCase())):e.options;return n.jsxs("fieldset",{children:[n.jsxs("legend",{children:["Select an option : ",l]}),n.jsx(O,{...e,value:l,onSelect:o=>{var a;s(o),(a=e.onSelect)==null||a.call(e,o)},onChange:o=>{var a;f(o),(a=e.onChange)==null||a.call(e,o)},options:h,labelRenderer:p,optionRenderer:p}),n.jsx("button",{onClick:()=>s("4"),children:"Sélectionner paris"})]})},t={render:e=>n.jsx(S,{...e}),args:{value:"1",options:[{id:"1",value:"Option 1",label:n.jsx("strong",{children:"Option 1"})},{id:"2",value:"Option 2",label:"Option 2"},{id:"3",value:"Option 3",label:"Option 3"},{id:"paris",value:"Paris",label:"Paris"},{id:"toulouse",value:"Toulouse",label:"Toulouse"}]}},r={...t,args:{...t.parameters,editable:!0}};var c,d,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var b,x,v;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.parameters,
    editable: true
  }
}`,...(v=(x=r.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const P=["Default","Editable"];export{t as Default,r as Editable,P as __namedExportsOrder,L as default};
