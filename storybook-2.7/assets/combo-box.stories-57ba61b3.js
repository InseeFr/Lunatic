import{j as a,a as c,F as R}from"./jsx-runtime-855de6a5.js";import{r as h,a as P}from"./chunk-JWY6Y6NU-21c215cf.js";import{r as u}from"./index-e67e0a49.js";import{C}from"./index-b43b9faa.js";import"./react-18-6861653f.js";import"./_commonjsHelpers-de833af9.js";import"./index-9d475cdf.js";const{global:x}=__STORYBOOK_MODULE_GLOBAL__,{start:B,setProjectAnnotations:y,composeStory:G,composeStories:I}=__STORYBOOK_MODULE_PREVIEW_API__;__STORYBOOK_MODULE_CLIENT_LOGGER__;var{window:p}=x;p&&(p.STORYBOOK_ENV="react");var E=B(h,{render:P});E.forceReRender;E.clientApi.raw;var m;typeof module<"u"&&((m=module==null?void 0:module.hot)==null||m.decline());const M={title:"Components/Commons/ComboBox",component:C},d=({option:e,placeholder:r})=>a(R,{children:(e==null?void 0:e.label)??r}),D=e=>{console.log({args:e});const[r,s]=u.useState(e.value),[i,T]=u.useState(""),L=i?e.options.filter(o=>o.value.toLowerCase().includes(i.toLowerCase())):e.options;return c("fieldset",{children:[c("legend",{children:["Select an option : ",r]}),a(C,{...e,value:r,onSelect:o=>{var t;s(o),(t=e.onSelect)==null||t.call(e,o)},onChange:o=>{var t;T(o),(t=e.onChange)==null||t.call(e,o)},options:L,labelRenderer:d,optionRenderer:d}),a("button",{onClick:()=>s("4"),children:"Sélectionner paris"})]})},n={render:e=>a(D,{...e}),args:{value:"1",options:[{id:"1",value:"Option 1",label:a("strong",{children:"Option 1"})},{id:"2",value:"Option 2",label:"Option 2"},{id:"3",value:"Option 3",label:"Option 3"},{id:"paris",value:"Paris",label:"Paris"},{id:"toulouse",value:"Toulouse",label:"Toulouse"}]}},l={...n,args:{...n.parameters,editable:!0}};var O,_,b;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(b=(_=n.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};var S,v,f;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...Default,
  args: {
    ...Default.parameters,
    editable: true
  }
}`,...(f=(v=l.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const U=["Default","Editable"];export{n as Default,l as Editable,U as __namedExportsOrder,M as default};
//# sourceMappingURL=combo-box.stories-57ba61b3.js.map
