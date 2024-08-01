import{j as c}from"./Label-B671VB1p.js";import"./index-BwDkhjyp.js";import{O as m}from"./orchestrator-DEMAqZks.js";import{d as b}from"./default-arg-types-gvmCcWIB.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Datepicker-CaUjcyee.js";import"./Combobox-BIHx2q7j.js";import"./index-B8XB3FuZ.js";const S="../../../lunatic-schema.json",y=[{id:"checkboxbooleanGroupNumeric",componentType:"CheckboxGroup",page:"1",label:{value:"Situation matrimoniale",type:"TXT"},orientation:"horizontal",hierarchy:{sequence:{id:"kmnnjaf1",page:"1",label:{value:"Situation matrimoniale",type:"Text"}},subSequence:{id:"kmw3dz2a",page:"2",label:{value:"Mois préférés de l'année",type:"Text"}}},missingResponse:{name:"SITUMATRI_MISSING"},responses:[{id:"kmort6x9-QOP-kmosa98y",label:{value:"Française de naissance ou par réintégration",type:"Text"},response:{name:"NATIO1N1"}},{id:"kmort6x9-QOP-kmos360k",label:{value:'"Française par déclaration, naturalisation, option à la majorité"',type:"VTL"},response:{name:"NATIO1N2"}},{id:"kmort6x9-QOP-kmos37e1",label:{value:"Étrangère",type:"Text"},response:{name:"NATIO1N3"}},{id:"kmort6x9-QOP-kmorue9c",label:{value:"Apatride (pas de nationalité)",type:"Text"},response:{name:"NATIO1N4"}}]},{id:"checkboxbooleanGroupAlpha",componentType:"CheckboxGroup",page:"2",label:{value:"Mois préférés de l'année",type:"TXT"},orientation:"vertical",hierarchy:{sequence:{id:"kmnnjaf1",page:"1",label:{value:"Situation matrimoniale",type:"Text"}},subSequence:{id:"kmw3dz2a",page:"2",label:{value:"Mois préférés de l'année",type:"Text"}}},missingResponse:{name:"SITUMATRI_MISSING"},bindingDependencies:["MOIS1","MOIS2","MOIS3","MOIS4","MOIS5","MOIS6","MOIS7","MOIS8","MOIS9","MOIS10","MOIS11","MOIS12"],responses:[{id:"mois1",label:{value:"Janvier",type:"Text"},response:{name:"MOIS1"}},{id:"mois2",label:{value:"Février",type:"Text"},response:{name:"MOIS2"}},{id:"mois3",label:{value:"Mars",type:"Text"},response:{name:"MOIS3"}},{id:"mois4",label:{value:"Avril",type:"Text"},response:{name:"MOIS4"}},{id:"mois5",label:{value:"Mai",type:"Text"},response:{name:"MOIS5"}},{id:"mois6",label:{value:"Juin",type:"Text"},response:{name:"MOIS6"}},{id:"mois7",label:{value:"Juillet",type:"Text"},response:{name:"MOIS7"}},{id:"mois8",label:{value:"Août",type:"Text"},response:{name:"MOIS8"}},{id:"mois9",label:{value:"Septembre",type:"Text"},response:{name:"MOIS9"}},{id:"mois10",label:{value:"Octobre",type:"Text"},response:{name:"MOIS10"}},{id:"mois11",label:{value:"Novembre",type:"Text"},response:{name:"MOIS11"}},{id:"mois12",label:{value:"Décembre",type:"Text"},response:{name:"MOIS12"}}]}],N=[{variableType:"COLLECTED",name:"NATIO1N1",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N3",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N4",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS1",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS3",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS4",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS5",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS6",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS7",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS8",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS9",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS10",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS11",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS12",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}}],L={$schema:S,components:y,variables:N},P="5",d=[{id:"loop",componentType:"Loop",page:"1",maxPage:"1.1",conditionFilter:{value:"true",type:"VTL"},iterations:{value:"2",type:"VTL"},label:{value:'"## Who are you?"',type:"VTL|MD"},description:{value:'"This is your opportunity to tell me about yourself!"',type:"VTL|MD"},components:[{id:"checkboxbooleanGroupNumeric",componentType:"CheckboxGroup",label:{value:"Est-ce que vous travaillez à l'Insee ?",type:"VTL|MD"},missingResponse:{name:"SITUMATRI_MISSING"},responses:[{id:"kmort6x9-QOP-kmosa98y",label:{value:"non",type:"VTL"},response:{name:"NON"}},{id:"kmort6x9-QOP-kmos360k",label:{value:'"oui"',type:"VTL"},response:{name:"OUI"}}]}],paginatedLoop:!1},{id:"seq",componentType:"Sequence",label:{value:'"Merci !"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"2"}],R=[{variableType:"COLLECTED",name:"OUI",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}},{variableType:"COLLECTED",name:"NON",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}}],U={maxPage:P,components:d,variables:R},M=[{id:"checkboxbooleanGroupNumeric",componentType:"CheckboxGroup",page:"1",label:{value:"Situation matrimoniale",type:"TXT"},hierarchy:{sequence:{id:"kmnnjaf1",page:"1",label:{value:"Situation matrimoniale",type:"TXT"}},subSequence:{id:"kmw3dz2a",page:"2",label:{value:"Mois préférés de l'année",type:"TXT"}}},missingResponse:{name:"SITUMATRI_MISSING"},responses:[{id:"kmort6x9-QOP-kmosa98y",label:{value:"Française de naissance ou par réintégration",type:"TXT"},response:{name:"NATIO1N1"}},{id:"kmort6x9-QOP-kmos360k",label:{value:'"Française par déclaration, naturalisation, option à la majorité"',type:"VTL"},response:{name:"NATIO1N2"}},{id:"kmort6x9-QOP-kmos37e1",label:{value:"Étrangère",type:"TXT"},response:{name:"NATIO1N3"}},{id:"kmort6x9-QOP-kmorue9c",label:{value:"Apatride (pas de nationalité)",type:"TXT"},response:{name:"NATIO1N4"}},{id:"kmort6x9-QOP-kmorue9d",label:{value:"Autre préciser",type:"TXT"},response:{name:"NATIO1N_OTHER"},detail:{label:{value:'"Préciser : "',type:"VTL"},response:{name:"NATIO1N_DETAIL"}}}]},{id:"end",componentType:"Sequence",page:"2",label:{value:"FIN",type:"TXT"}}],x="2",V=[{variableType:"COLLECTED",name:"NATIO1N1",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N3",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N4",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS1",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS2",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS3",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS4",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS5",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS6",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS7",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS8",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS9",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS10",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS11",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"MOIS12",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N_OTHER",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NATIO1N_DETAIL",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}}],g={components:M,maxPage:x,variables:V},X={title:"Components/CheckboxGroup",component:m,argTypes:{...b,shortcut:{table:{disable:!1},control:"boolean",defaultValue:!0}}},u=v=>c.jsx(m,{...v}),e=u.bind({});e.args={id:"checkboxGroup",source:L,shortcut:!0};const l=u.bind({});l.args={source:L,readOnly:!0,shortcut:!0};const a=u.bind({});a.args={source:g,shortcut:!0};const n=u.bind({});n.args={...e.args,source:U};var E,T,r;e.parameters={...e.parameters,docs:{...(E=e.parameters)==null?void 0:E.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(r=(T=e.parameters)==null?void 0:T.docs)==null?void 0:r.source}}};var s,o,O;l.parameters={...l.parameters,docs:{...(s=l.parameters)==null?void 0:s.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(O=(o=l.parameters)==null?void 0:o.docs)==null?void 0:O.source}}};var t,D,i;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(i=(D=a.parameters)==null?void 0:D.docs)==null?void 0:i.source}}};var p,I,C;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(C=(I=n.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};const _=["Default","ReadOnly","Arbitrary","Loop"];export{a as Arbitrary,e as Default,n as Loop,l as ReadOnly,_ as __namedExportsOrder,X as default};