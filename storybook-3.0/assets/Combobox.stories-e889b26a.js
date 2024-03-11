import{j as a,a as c,F as L}from"./Label-9445101a.js";import{a as R,r as P}from"./chunk-JWY6Y6NU-5756f1a1.js";import{r as u}from"./index-76fb7be0.js";import{C as E}from"./Combobox-701a568d.js";import"./_commonjsHelpers-de833af9.js";import"./react-18-988a5df2.js";import"./index-d3ea75b5.js";const{global:x}=__STORYBOOK_MODULE_GLOBAL__,{start:D,setProjectAnnotations:y,composeStory:G,composeStories:I}=__STORYBOOK_MODULE_PREVIEW_API__;__STORYBOOK_MODULE_CLIENT_LOGGER__;var{window:p}=x;p&&(p.STORYBOOK_ENV="react");var T=D(R,{render:P});T.forceReRender;T.clientApi.raw;var m;typeof module<"u"&&((m=module==null?void 0:module.hot)==null||m.decline());const M={title:"Components/Shared/ComboBox",component:E},d=({option:e,placeholder:r})=>a(L,{children:(e==null?void 0:e.label)??r}),w=e=>{const[r,s]=u.useState(e.value),[i,h]=u.useState(""),C=i?e.options.filter(o=>o.value.toLowerCase().includes(i.toLowerCase())):e.options;return c("fieldset",{children:[c("legend",{children:["Select an option : ",r]}),a(E,{...e,value:r,onSelect:o=>{var t;s(o),(t=e.onSelect)==null||t.call(e,o)},onChange:o=>{var t;h(o),(t=e.onChange)==null||t.call(e,o)},options:C,labelRenderer:d,optionRenderer:d}),a("button",{onClick:()=>s("4"),children:"Sélectionner paris"})]})},n={render:e=>a(w,{...e}),args:{value:"1",options:[{id:"1",value:"Option 1",label:a("strong",{children:"Option 1"})},{id:"2",value:"Option 2",label:"Option 2"},{id:"3",value:"Option 3",label:"Option 3"},{id:"paris",value:"Paris",label:"Paris"},{id:"toulouse",value:"Toulouse",label:"Toulouse"}]}},l={...n,args:{...n.parameters,editable:!0}};var O,b,_;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(_=(b=n.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};var S,v,f;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.parameters,
    editable: true
  }
}`,...(f=(v=l.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const U=["Default","Editable"];export{n as Default,l as Editable,U as __namedExportsOrder,M as default};
