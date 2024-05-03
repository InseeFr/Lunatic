import{O as i}from"./orchestrator-D4lbKcwW.js";import{d as L}from"./default-arg-types-CWvQhed_.js";import"./Label-BfEPv_zd.js";import"./index-CBqU2yxZ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Datepicker-CuiWDR1f.js";import"./Combobox-bycPWp_-.js";import"./index-BtM5VmRH.js";const m=[{componentType:"Text",label:{value:"Mon texte",type:"TXT"},conditionFilter:{value:"true",type:"VTL"},id:"id"}],c=[],R={components:m,variables:c},D=[{variableType:"EXTERNAL",name:"VARIABLE_EXT"},{variableType:"COLLECTED",values:{COLLECTED:[],EDITED:[],FORCED:[],INPUTTED:[],PREVIOUS:[]},name:"PREMIERTAB2"},{variableType:"COLLECTED",values:{COLLECTED:[],EDITED:[],FORCED:[],INPUTTED:[],PREVIOUS:[]},name:"PREMIERTAB3"},{variableType:"COLLECTED",values:{COLLECTED:[],EDITED:[],FORCED:[],INPUTTED:[],PREVIOUS:[]},name:"PREMIERTAB4"}],A=[{componentType:"RosterForLoop",components:[{componentType:"Text",label:{type:"VTL",value:"VARIABLE_EXT"},id:"lvp6l8rw-RDOP-lvp7mld9",maxLength:249},{componentType:"Input",response:{name:"PREMIERTAB2"},id:"lvp6l8rw-RDOP-lvp75ug8",maxLength:5},{componentType:"InputNumber",min:0,max:1e4,response:{name:"PREMIERTAB3"},decimals:0,id:"lvp6l8rw-RDOP-lvp7i2ub"},{componentType:"InputNumber",min:0,max:1e4,response:{name:"PREMIERTAB4"},decimals:0,id:"lvp6l8rw-RDOP-lvp74mc4"}],controls:[{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'" La valeur doit être comprise entre 0 et 10000."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(PREMIERTAB3)) and (0>PREMIERTAB3 or 10000<PREMIERTAB3))"},id:"lvp6l8rw-RDOP-lvp7i2ub-format-borne-inf-sup"},{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(PREMIERTAB3))  and round(PREMIERTAB3,0)<>PREMIERTAB3)"},id:"lvp6l8rw-RDOP-lvp7i2ub-format-decimal"},{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'" La valeur doit être comprise entre 0 et 10000."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(PREMIERTAB4)) and (0>PREMIERTAB4 or 10000<PREMIERTAB4))"},id:"lvp6l8rw-RDOP-lvp74mc4-format-borne-inf-sup"},{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(PREMIERTAB4))  and round(PREMIERTAB4,0)<>PREMIERTAB4)"},id:"lvp6l8rw-RDOP-lvp74mc4-format-decimal"}],positioning:"HORIZONTAL",header:[{label:{type:"VTL|MD",value:'"Nom (LS)"'}},{label:{type:"VTL|MD",value:'"Code postal (LS)"'}},{label:{type:"VTL|MD",value:'"Capacité 2023 (LS)"'}},{label:{type:"VTL|MD",value:'"Capacité 2024"'}}],conditionFilter:{type:"VTL",value:"true"},id:"lvp6l8rw",page:"1",lines:{min:{type:"VTL",value:"2"},max:{type:"VTL",value:"5"}},mandatory:!1}],C="question",v="3.8.0",O="3.21.0-SNAPSHOT",y={},d="1",I={variables:D,components:A,pagination:C,lunaticModelVersion:v,enoCoreVersion:O,resizing:y,maxPage:d},b={VARIABLE_EXT:["TRUC","BIDULE","CHOSE"]},P={EXTERNAL:b},U="Questionnaire",V=[{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA11"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA21"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA31"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA12"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA22"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA32"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA13"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA23"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,FORCED:null,INPUTTED:null,PREVIOUS:null},name:"TABLEAUCLA33"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_LIBELLEDUT"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_TABLEAUCLA"}],x=[{componentType:"Table",positioning:"HORIZONTAL",header:[{label:{type:"VTL|MD",value:""}},{label:{type:"VTL|MD",value:'"Domaines"'}},{label:{type:"VTL|MD",value:'"Activité"'}},{label:{type:"VTL|MD",value:`"Chiffre d'affaire"`}}],conditionFilter:{type:"VTL",value:"true"},id:"luwhnbxk",page:"1",label:{type:"VTL|MD",value:'"Tableau classique"'},body:[[{componentType:"Text",conditionFilter:{value:"true",type:"VTL"},id:"id-text-1",label:{type:"TXT",value:"Libelle 1"}},{componentType:"Input",response:{name:"TABLEAUCLA11"},id:"luwhnbxk-RDOP-luwhcrpg",maxLength:249,controls:[{criticality:"ERROR",errorMessage:{type:"VTL",value:'"Le domaine ne doit pas être vide"'},typeOfControl:"",control:{type:"VTL",value:"not(isnull(TABLEAUCLA11))"}}]},{componentType:"Input",response:{name:"TABLEAUCLA12"},id:"luwhnbxk-RDOP-luwhnkls",maxLength:249},{componentType:"InputNumber",unit:"€",min:0,max:9999,response:{name:"TABLEAUCLA13"},decimals:0,id:"luwhnbxk-RDOP-luwh7btb"}],[{componentType:"Text",conditionFilter:{value:"true",type:"VTL"},id:"id-text-2",label:{type:"TXT",value:"Libelle 2"}},{componentType:"Input",response:{name:"TABLEAUCLA21"},id:"luwhnbxk-RDOP-luwhmbp1",maxLength:249},{componentType:"Input",response:{name:"TABLEAUCLA22"},id:"luwhnbxk-RDOP-luwhlejc",maxLength:249},{componentType:"InputNumber",unit:"€",min:0,max:9999,response:{name:"TABLEAUCLA23"},decimals:0,id:"luwhnbxk-RDOP-luwh4tva"}],[{componentType:"Text",conditionFilter:{value:"true",type:"VTL"},id:"id-text-3",label:{type:"TXT",value:"Libelle 3"}},{componentType:"Input",response:{name:"TABLEAUCLA31"},id:"luwhnbxk-RDOP-luwhalhn",maxLength:249},{componentType:"Input",response:{name:"TABLEAUCLA32"},id:"luwhnbxk-RDOP-luwhd3mk",maxLength:249},{componentType:"InputNumber",unit:"€",min:0,max:9999,response:{name:"TABLEAUCLA33"},decimals:0,id:"luwhnbxk-RDOP-luwhcilc"}]],mandatory:!1}],B="1",M={componentType:U,variables:V,components:x,maxPage:B},X={title:"Components/Text",component:i,argTypes:L},e={args:{id:"table",source:R}},l={args:{source:I,data:P}},n={args:{source:M}};var a,t,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    id: 'table',
    source: source
  }
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var r,T,p;l.parameters={...l.parameters,docs:{...(r=l.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    source: sourceRoster,
    data: dataRoster
  }
}`,...(p=(T=l.parameters)==null?void 0:T.docs)==null?void 0:p.source}}};var E,u,s;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    source: sourceTable
  }
}`,...(s=(u=n.parameters)==null?void 0:u.docs)==null?void 0:s.source}}};const _=["Text","Roster","Table"];export{l as Roster,n as Table,e as Text,_ as __namedExportsOrder,X as default};
