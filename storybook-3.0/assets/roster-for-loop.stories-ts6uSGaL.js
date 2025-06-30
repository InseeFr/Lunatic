import{O as E}from"./Orchestrator-CV_zPD9i.js";import{w as L,u as t}from"./index-R3fZrLBo.js";import"./jsx-runtime-BlAj40OV.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Combobox-DScIyG9J.js";import"./index-Cf-03bMR.js";function s(i){return new Promise(e=>setTimeout(e,i))}const b="../../../lunatic-schema.json",x="3",R=[{id:"seq",componentType:"Sequence",label:{value:'"Description des individus de votre logement"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"1"},{id:"loop-prenom",componentType:"RosterForLoop",header:[{headerCell:!0,label:{value:"",type:"TXT"}},{headerCell:!0,label:{value:"Prénom",type:"TXT"}},{headerCell:!0,label:{value:"Age",type:"TXT"}},{headerCell:!0,label:{value:"Buvez vous de l'alcool ?",type:"TXT"}},{headerCell:!0,label:{value:"Nom",type:"TXT"}}],label:{value:'"Ajouter un individu"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["PRENOM","AGE"],lines:{min:{value:"1",type:"VTL"},max:{value:"10",type:"VTL"}},page:"1",components:[{componentType:"Text",label:{value:'"Individu " || cast(GLOBAL_ITERATION_INDEX, string)',type:"VTL"}},{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["PRENOM"],id:"prenom",response:{name:"PRENOM"}},{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["AGE"],id:"age",response:{name:"AGE"}},{componentType:"CheckboxBoolean",conditionFilter:{value:"cast(AGE, integer) > 18",type:"VTL"},maxLength:30,bindingDependencies:["DRINK"],id:"drink",response:{name:"DRINK"}},{componentType:"Input",conditionFilter:{value:"true",type:"VTL"},maxLength:30,bindingDependencies:["NOM"],id:"nom",response:{name:"NOM"}}]},{id:"loop",componentType:"Loop",loopDependencies:["PRENOM"],iterations:{value:"count(PRENOM)",type:"VTL"},page:"2",maxPage:"1",depth:1,paginatedLoop:!0,conditionFilter:{value:"true",type:"VTL"},components:[{id:"age",label:{value:'PRENOM || ", quel est vôtre âge ?"',type:"VTL"},conditionFilter:{value:"true",type:"VTL"},page:"2.1",componentType:"InputNumber",min:0,max:120,decimals:0,response:{name:"AGE"}}]},{id:"seq-end",componentType:"Sequence",label:{value:'"End"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"3"}],O={PRENOM:{size:"count(PRENOM)",variables:["AGE"]}},D=[{variableType:"COLLECTED",name:"PRENOM",values:{COLLECTED:[null]}},{variableType:"COLLECTED",name:"NOM",values:{COLLECTED:[null]}},{variableType:"COLLECTED",name:"DRINK",values:{COLLECTED:[null]}},{variableType:"COLLECTED",name:"AGE",values:{COLLECTED:[null]}}],g={$schema:b,maxPage:x,components:R,resizing:O,variables:D},A={title:"Components/Loop/Roster",...E},n={args:{source:g}},a={args:{source:g,readOnly:!0}},o={args:n.args,play:async({canvasElement:i})=>{await s(1e3);const e=L(i);e.getByRole("button",{name:"Ajouter une ligne"}).click(),await s(10);const l=e.getAllByRole("textbox");await t.type(l[0],"John",{delay:10}),await t.type(l[3],"Jane",{delay:10}),e.getByRole("button",{name:"Next"}).click(),await t.type(await e.findByRole("textbox",{name:/John/i}),"18"),e.getByRole("button",{name:"Next"}).click(),await t.type(await e.findByRole("textbox",{name:/Jane/i}),"20"),e.getByRole("button",{name:"Next"}).click(),await e.findByText("End")}};var r,p,c;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    source
  }
}`,...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,m,d;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    source,
    readOnly: true
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var y,v,T;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: Default.args,
  play: async ({
    canvasElement
  }) => {
    await sleep(1000);
    const canvas = within(canvasElement);
    canvas.getByRole('button', {
      name: 'Ajouter une ligne'
    }).click();
    await sleep(10);
    const inputs = canvas.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'John', {
      delay: 10
    });
    await userEvent.type(inputs[3], 'Jane', {
      delay: 10
    });
    canvas.getByRole('button', {
      name: 'Next'
    }).click();
    await userEvent.type(await canvas.findByRole('textbox', {
      name: /John/i
    }), '18');
    canvas.getByRole('button', {
      name: 'Next'
    }).click();
    await userEvent.type(await canvas.findByRole('textbox', {
      name: /Jane/i
    }), '20');
    canvas.getByRole('button', {
      name: 'Next'
    }).click();
    await canvas.findByText('End');
  }
}`,...(T=(v=o.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};const P=["Default","ReadOnly","Filled"];export{n as Default,o as Filled,a as ReadOnly,P as __namedExportsOrder,A as default};
