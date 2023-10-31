import{j as L}from"./jsx-runtime-52da5b2b.js";import"./index-e67e0a49.js";import{O as E,d as y}from"./default-arg-types-359c557f.js";import"./_commonjsHelpers-de833af9.js";import"./index-975ff56c.js";import"./index-9d475cdf.js";const v="4",f=[{name:"naf-rev2",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:2},{name:"id"}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+"}},version:"1"},{name:"naf-rev2-stop",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:2},{name:"id"}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+"}},version:"1"},{name:"cog-communes",fields:[{name:"label",rules:"soft"},{name:"nccenr",rules:"soft"},{name:"id",rules:"soft"}],queryParser:{type:"soft"},version:"1"}],O=[{id:"nn",componentType:"InputNumber",mandatory:!1,min:1,max:4,decimals:0,label:{value:'"Number of inhabitants"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},response:{name:"NUM"},page:"1"},{id:"idLoop",label:{value:'"Boucle individu"',type:"VTL|MD"},componentType:"Loop",iterations:{value:"cast(NUM, integer)",type:"VTL"},paginatedLoop:!1,conditionFilter:{value:"true",type:"VTL"},loopDependencies:["NUM"],page:"2",components:[{id:"k3ym6x16",label:{value:'"Prénom :"',type:"VTL|MD"},componentType:"Input",conditionFilter:{value:"true",type:"VTL"},mandatory:!1,response:{name:"PRENOM"},page:"2"}]},{id:"idLoopInd",label:{value:'"Boucle individu"',type:"VTL|MD"},componentType:"Loop",iterations:{value:"count(PRENOM)",type:"VTL"},paginatedLoop:!0,conditionFilter:{value:"true",type:"VTL"},loopDependencies:["PRENOM"],page:"3",maxPage:"3",components:[{id:"k3ym61vfzzzzzzzzzzzz",componentType:"Sequence",label:{value:'"Questionnaire de : " || PRENOM',type:"VTL|MD"},conditionFilter:{value:"not(isnull(PRENOM))",type:"VTL"},page:"3.1"},{id:"sugg1",componentType:"Suggester",mandatory:!1,label:{value:`PRENOM || " what's your favorite NAF code? (default stop words)"`,type:"VTL|MD"},storeName:"naf-rev2",conditionFilter:{value:"not(isnull(PRENOM))",type:"VTL"},response:{name:"NAF"},page:"3.2"},{id:"sugg2",componentType:"Suggester",mandatory:!1,label:`PRENOM || " what's your favorite NAF code? (without stop words)"`,storeName:"naf-rev2-stop",conditionFilter:{value:"not(isnull(PRENOM))",type:"VTL"},response:{name:"NAF_STOP"},page:"3.2",declarations:[{id:"kb9hi4j0-krnoclfe",declarationType:"INSTRUCTION",position:"BEFORE_QUESTION_TEXT",label:{value:'"Test declaration before"',type:"VTL|MD"}},{id:"kb9hi4j0-krnoclfe",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Test description from declaration"',type:"VTL|MD"}}]},{id:"sugg-communes",componentType:"Suggester",mandatory:!1,label:{value:`PRENOM || " what's your favorite city?"`,type:"VTL|MD"},storeName:"cog-communes",conditionFilter:{value:"not(isnull(PRENOM))",type:"VTL"},response:{name:"CITY"},page:"3.3"}]},{id:"kk",componentType:"Sequence",label:{value:'"END"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},page:"4"}],D=[{variableType:"COLLECTED",name:"NUM",componentRef:"nn",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}},{variableType:"COLLECTED",name:"PRENOM",componentRef:"idLoop",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"NAF",componentRef:"idLoopInd",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"NAF_STOP",componentRef:"idLoopInd",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}},{variableType:"COLLECTED",name:"CITY",componentRef:"idLoopInd",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTED:[null]}}],b={maxPage:v,suggesters:f,components:O,variables:D},N="5",C=[{name:"naf-rev2",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:2},{name:"id"}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+"}},version:"1"},{name:"cog-communes",fields:[{name:"id",rules:"soft"}],queryParser:{type:"soft"},version:"1"},{name:"in-error",fields:[{name:"id",rules:"soft"}],queryParser:{type:"soft"},version:"1"}],S=[{id:"suggestions-naf",componentType:"Suggester",mandatory:!1,label:{value:'"Code ou terme des libellés de la Naf-rev2"',type:"VTL|MD"},description:{value:"Exemple: 01 ou tabac",type:"VTL|MD"},storeName:"naf-rev2",conditionFilter:{value:"true",type:"VTL"},readOnly:{value:"true",type:"VTL"},controls:[{id:"age-controls",criticality:"ERROR",typeOfControl:"FORMAT",control:{value:"not(isnull(HELLO))",type:"VTL"},errorMessage:{value:'"Veuillez selectionner quelquechose"',type:"VTL"}}],response:{name:"HELLO"},missingResponse:{name:"HELLO_MISSING"},page:"1"},{id:"suggestions-cog",componentType:"Suggester",mandatory:!1,label:'"Hello!"',storeName:"cog-communes",conditionFilter:{value:"true",type:"VTL"},response:{name:"HELLO"},missingResponse:{name:"HELLO_MISSING"},page:"2"},{id:"suggestions-inconnu",componentType:"Suggester",mandatory:!1,label:'"Hello!"',storeName:"inconnu-au-bataillon",conditionFilter:{value:"true",type:"VTL"},response:{name:"HELLO"},missingResponse:{name:"HELLO_MISSING"},page:"3"},{id:"suggestions-in-error",componentType:"Suggester",mandatory:!1,label:'"Hello!"',storeName:"in-error",conditionFilter:{value:"true",type:"VTL"},missingResponse:{name:"HELLO_MISSING"},response:{name:"HELLO"},page:"4"},{id:"bye!",componentType:"Sequence",page:"5",declarations:[{id:"kb9hi4j0-krnoclfe",declarationType:"INSTRUCTION",position:"BEFORE_QUESTION_TEXT",label:{value:'"Merci beaucoup."',type:"VTL|MD"}}]}],I=[{variableType:"COLLECTED",name:"HELLO",componentRef:"nn",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}},{variableType:"COLLECTED",name:"HELLO_MISSING",componentRef:"nn",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}}],R={maxPage:N,suggesters:C,components:S,variables:I},P="1",V=[{name:"naf-rev2",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:2},{name:"id"}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+"}},version:"1"}],F=[{id:"lfwg2ny2",componentType:"ComponentSet",page:"1",className:"ComponentSet",conditionFilter:{value:"true",type:"VTL"},label:{value:'"Chercher votre activité principale."',type:"VTL"},components:[{id:"communes-2023",componentType:"Suggester",label:{value:'"NAF"',type:"VTL"},description:'"industrie"',storeName:"naf-rev2",conditionFilter:{value:"true",type:"VTL"},response:{name:"ACT"}}]}],M=[{variableType:"COLLECTED",name:"ACT",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}}],h={maxPage:P,suggesters:V,components:F,variables:M},x={title:"Components/Suggester",component:E,argTypes:y},s=o=>L(E,{...o}),e=s.bind({});async function r(o){switch(o){case"naf-rev2-stop":case"naf-rev2":return fetch("https://inseefr.github.io/Lunatic/storybook/naf-rev2.json").then(t=>t.json());case"cog-communes":return fetch("https://inseefr.github.io/Lunatic/storybook/communes-2019.json").then(t=>t.json());default:throw new Error(`Unkonw référentiel ${o}`)}}e.args={id:"suggester",source:b,autoSuggesterLoading:!0,getReferentiel:r,pagination:!0};const n=s.bind({});n.args={source:R,getReferentiel:r,autoSuggesterLoading:!0,missing:{table:{disable:!1},control:"boolean",defaultValue:!0}};const a=s.bind({});a.args={source:h,getReferentiel:r,autoSuggesterLoading:!0};var l,i,u;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(u=(i=e.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var p,c,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(m=(c=n.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var g,d,T;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(T=(d=a.parameters)==null?void 0:d.docs)==null?void 0:T.source}}};const q=["Default","Simple","ComponentSet"];export{a as ComponentSet,e as Default,n as Simple,q as __namedExportsOrder,x as default};
//# sourceMappingURL=suggester.stories-dbea4d29.js.map
