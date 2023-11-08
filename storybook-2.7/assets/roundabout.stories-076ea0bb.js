import{j as T}from"./jsx-runtime-37c7fa45.js";import{O as E,d as D}from"./default-arg-types-4d214947.js";import"./index-e67e0a49.js";import"./_commonjsHelpers-de833af9.js";import"./index-3b783ea6.js";import"./index-9d475cdf.js";const L="5",m=[{id:"seq",componentType:"Sequence",label:{value:'"Description des individus de votre logement"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"1"},{id:"how",componentType:"InputNumber",mandatory:!1,page:"2",min:1,max:10,decimals:0,label:{value:'"Combien de personnes vivent habituellement à votre adresse ?"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"NB_HAB"}},{id:"loop",componentType:"Loop",page:"3",depth:1,paginatedLoop:!1,conditionFilter:{value:"true",type:"VTL"},loopDependencies:["NHAB"],lines:{min:{value:"NB_HAB",type:"VTL"},max:{value:"NB_HAB",type:"VTL"}},components:[{id:"prenom",componentType:"Input",mandatory:!1,maxLength:20,label:{value:'"Prénom"))',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"PRENOMS"}},{id:"age",componentType:"InputNumber",maxLength:3,label:{value:'"Age"))',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"AGE"}}]},{id:"roundabout",componentType:"Roundabout",page:"4",conditionFilter:{value:"true",type:"VTL"},iterations:{value:"NB_HAB",type:"VTL"},label:{value:'"Libellé du rondpoint"',type:"VTL"},locked:!0,expressions:{unnecessary:{value:"AGE < 13",type:"VTL"},complete:{value:"not(isnull(KNOWREC)) and not(isnull(SEXE)) and not(isnull(SOMETHING))",type:"VTL"},partial:{value:"not(isnull(KNOWREC)) or not(isnull(SEXE)) or not(isnull(SOMETHING))",type:"VTL"},label:{value:'"Série de question pour " || PRENOMS',type:"VTL"}},controls:[{id:"roundabout-Carefull",criticality:"WARN",control:{value:"not(isnull(KNOWREC)) and not(isnull(SEXE)) and not(isnull(SOMETHING))",type:"VTL"},type:"roundabout",iterations:{value:"NB_HAB",type:"VTL"},errorMessage:{value:`"Le formulaire n'est pas complet pour " || PRENOMS`,type:"VTL|MD"}}],components:[{id:"radio",componentType:"Radio",mandatory:!1,page:"4.1",label:{value:'"Connaissez-vous le recensement de la population ?"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},options:[{value:"1",label:{value:'"oui"',type:"VTL|MD"}},{value:"2",label:{value:'"non"',type:"VTL|MD"}}],response:{name:"KNOWREC"}},{id:"jsygk7m7",componentType:"Subsequence",page:"4.2",label:{value:'"Deuxième page de questions pour "|| PRENOMS',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"}},{id:"sexe",componentType:"Radio",page:"4.2",label:{value:'"Sexe"',type:"VTL"},conditionFilter:{value:"true",type:"VTL"},options:[{value:"1",label:{value:'"Homme"',type:"VTL|MD"}},{value:"2",label:{value:'"Femme"',type:"VTL|MD"}}],response:{name:"SEXE"}},{id:"jsygk7m7",componentType:"Subsequence",page:"4.3",label:{value:'"Troisième page de questions " || PRENOMS',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"}},{id:"kmno1n7m",componentType:"Input",maxLength:30,page:"4.3",label:{value:'"Dites quelque chose."))',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"SOMETHING"}}]},{id:"seq",componentType:"Sequence",label:{value:'"Merci !"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"5"}],d=[{variableType:"COLLECTED",name:"NB_HAB",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}},{variableType:"COLLECTED",name:"SOMETHING",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"AGE",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"SEXE",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"PRENOMS",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"KNOWREC",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"CALCULATED",name:"PRENOMREF",expression:{value:"first_value(PRENOMS over())",type:"VTL"},bindingDependencies:["PRENOMS"],inFilter:"true"}],c={NB_HAB:{size:"NB_HAB",variables:["PRENOMS","AGE","SEXE","SOMETHING","DATNAIS"]}},i={maxPage:L,components:m,variables:d,resizing:c},O={NB_HAB:{EDITED:null,FORCED:null,INPUTED:null,PREVIOUS:null,COLLECTED:1},PRENOMS:{EDITED:[null],FORCED:[null],INPUTED:[null],PREVIOUS:[null],COLLECTED:["Fanny"]},AGE:{EDITED:[null],FORCED:[null],INPUTED:[null],PREVIOUS:[null],COLLECTED:[15]}},y={COLLECTED:O},C={NB_HAB:{EDITED:null,FORCED:null,INPUTED:null,PREVIOUS:null,COLLECTED:2},PRENOMS:{EDITED:[null],FORCED:[null],INPUTED:[null],PREVIOUS:[null],COLLECTED:["Fanny","Ines"]},AGE:{EDITED:[null],FORCED:[null],INPUTED:[null],PREVIOUS:[null],COLLECTED:[15,15]}},v={COLLECTED:C},g={title:"Components/Roundabout",component:E,argTypes:D},p=s=>T(E,{...s}),e=p.bind({});e.args={id:"roundabout",source:i,pagination:!0,data:v};const l=p.bind({});l.args={id:"roundabout-one-iteration",source:i,pagination:!0,data:y};var n,a,t;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(t=(a=e.parameters)==null?void 0:a.docs)==null?void 0:t.source}}};var o,u,r;l.parameters={...l.parameters,docs:{...(o=l.parameters)==null?void 0:o.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(r=(u=l.parameters)==null?void 0:u.docs)==null?void 0:r.source}}};const P=["Default","OneIteration"];export{e as Default,l as OneIteration,P as __namedExportsOrder,g as default};
//# sourceMappingURL=roundabout.stories-076ea0bb.js.map