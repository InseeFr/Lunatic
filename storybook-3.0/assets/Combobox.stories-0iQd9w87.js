import{j as t}from"./jsx-runtime-BlAj40OV.js";import{r as c}from"./index-Cs7sjTYM.js";import{C as g}from"./Combobox-Hay0JXBO.js";import{f as u}from"./index-R3fZrLBo.js";import"./_commonjsHelpers-BosuxZz1.js";const j={title:"Components/ComboBox",component:g},a={render(o){const[n,s]=c.useState(o.value),[r,S]=c.useState(""),f=r?o.options.filter(e=>e.value.toLowerCase().includes(r.toLowerCase())):o.options;return t.jsxs("fieldset",{children:[t.jsxs("legend",{children:["Select an option : ",n]}),t.jsx(g,{...o,value:n,onSelect:e=>{console.log("onSelect",e),s(e),o.onSelect(e)},onChange:e=>{var i;console.log("onChange",e),S(e),(i=o.onChange)==null||i.call(o,e)},options:f}),t.jsx("button",{className:"btn btn-primary",onClick:()=>s("paris"),children:"Sélectionner paris"})]})},args:{value:"1",onSelect:u(),onChange:u(),options:[{id:"1",value:"Option 1",label:"Option 1"},{id:"2",value:"Option 2",label:"Option 2"},{id:"3",value:"Option 3",label:"Option 3"},{id:"paris",value:"Paris",label:"Paris"},{id:"toulouse",value:"Toulouse",label:"Toulouse"}]}},l={render:a.render,args:{...a.args,editable:!0}};var p,d,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render(args) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [localValue, setLocalValue] = useState(args.value);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [search, setSearch] = useState<string | null>('');
    // Simulate a search
    const options = search ? args.options.filter(v => v.value.toLowerCase().includes(search.toLowerCase())) : args.options;
    return <fieldset>
                <legend>Select an option : {localValue}</legend>
                <Combobox {...args} value={localValue} onSelect={v => {
        console.log('onSelect', v);
        setLocalValue(v);
        args.onSelect(v);
      }} onChange={v => {
        console.log('onChange', v);
        setSearch(v);
        args.onChange?.(v);
      }} options={options} />
                <button className="btn btn-primary" onClick={() => setLocalValue('paris')}>
                    Sélectionner paris
                </button>
            </fieldset>;
  },
  args: {
    value: '1',
    onSelect: fn(),
    onChange: fn(),
    options: [{
      id: '1',
      value: 'Option 1',
      label: 'Option 1'
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
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var b,v,h;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: Default.render,
  args: {
    ...Default.args,
    editable: true
  }
}`,...(h=(v=l.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};const k=["Default","Editable"];export{a as Default,l as Editable,k as __namedExportsOrder,j as default};
