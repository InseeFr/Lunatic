import{j as p}from"./combo-box-850ed48f.js";import"./index-76fb7be0.js";import{d as L}from"./default-arg-types-a1f723ba.js";import{O as u}from"./orchestrator-1d666ab7.js";import"./_commonjsHelpers-de833af9.js";import"./index-9d475cdf.js";import"./index-d3ea75b5.js";const A=async n=>{try{return fetch(`./${n}.json`).then(r=>r.json())}catch{throw new Error(`Unknown référentiel ${n}`)}},T=[{responseNames:["VARIABLE_COMMUNE"],name:"L_COMMUNEPASSEE-1-2-0",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:3,stemmer:!1}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+",min:3,stemmer:!1}},version:"1"},{responseNames:["VARIABLE_PAYS"],name:"L_PAYS-1-2-0",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:3,stemmer:!1}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+",min:3,stemmer:!1}},version:"1"},{responseNames:["VARIABLE_NATIONALITE"],name:"L_NATIONALITE-1-2-0",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:3,stemmer:!1}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+",min:3,stemmer:!1}},version:"1"},{responseNames:["VARIABLE_PCS"],name:"L_PCS_HOMMES-1-5-0",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:3,stemmer:!1,synonyms:{accueil:["ACCEUIL"],échafaudage:["ECHAFFAUDAGE"],URSSAF:["URSAF","URSAFF"],ingénierie:["INGENIEURIE","INGENERIE","INGIENERIE"],construction:["CONSTRUCTEUR"],distribution:["DISTRIBUTEUR"],fabrication:["FABRICANT"],abattoir:["ABATOIR","ABBATOIR","ABATOIRE","ABATTOIRE"],ascenseur:["ASCENCEUR"],ascenseurs:["ASCENCEURS"],assenseur:["ASSENCEUR"],assenseurs:["ASSENCEURS"],joaillerie:["JOAILLIER"],agroalimentaire:["AGGROALIMANTAIRE","AGROALIMANTAIRE"],alimentaires:["ALIMANTAIRES"],agroalimentaires:["AGGROALIMANTAIRES","AGROALIMENTAIRES"]}}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+",min:3,stemmer:!1}},version:"1",meloto:!0,stopWords:["a","au","dans","de","des","du","en","er","la","le","ou","sur","d","l","aux","dans","un","une","pour","avec","chez","par","les"]},{responseNames:["VARIABLE_BAILLEURS_SOCIAUX"],name:"bailleurs_sociaux-1-5-0",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:3,stemmer:!1}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+",min:3,stemmer:!1}},version:"1"}],I=[{componentType:"Suggester",response:{name:"VARIABLECO"},storeName:"L_COMMUNEPASSEE-1-2-0",hierarchy:{sequence:{id:"lt4fhgd6",page:"1",label:{type:"VTL|MD",value:'"I - " || "Sequence"'}}},conditionFilter:{type:"VTL",value:"true"},id:"lt4ezymk",page:"1",label:{type:"VTL|MD",value:'"➡ 1. " || "Variable Commune"'},mandatory:!1,maxLength:249},{componentType:"Suggester",response:{name:"VARIABLEPA"},storeName:"L_PAYS-1-2-0",conditionFilter:{type:"VTL",value:"true"},id:"lt4fjoev",page:"2",label:{type:"VTL|MD",value:'"➡ 2. " || "Variable Pays"'},mandatory:!1,maxLength:249},{componentType:"Suggester",storeName:"L_NATIONALITE-1-2-0",response:{name:"VARIABLENA"},conditionFilter:{type:"VTL",value:"true"},id:"lt4f6i2y",page:"3",label:{type:"VTL|MD",value:'"➡ 3. " || "Variable Nationalité"'},mandatory:!1,maxLength:249},{componentType:"Suggester",storeName:"L_PCS_HOMMES-1-5-0",response:{name:"VARIABLE_P"},conditionFilter:{type:"VTL",value:"true"},id:"lt4f9q1o",page:"4",label:{type:"VTL|MD",value:'"➡ 4. " || "VARIABLE_PCS"'},allowArbitraryOption:!0,mandatory:!1,maxLength:249},{componentType:"Suggester",storeName:"bailleurs_sociaux-1-5-0",response:{name:"VARIABLE_B"},conditionFilter:{type:"VTL",value:"true"},id:"lt4f8uba",page:"5",label:{type:"VTL|MD",value:'"➡ 5. " || "VARIABLE_BAILLEURS_SOCIAUX"'},mandatory:!1,maxLength:249}],c="question",g={},R={type:"VTL|MD",value:"Suggester"},C="2.5.0",S="SUGGESTER",d="2.7.1",y="27-02-2024 13:43:43",D=!1,O="lt4f6mib",N="5",V=[{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"COMMENT_QE"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"VARIABLECO"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"VARIABLEPA"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"VARIABLENA"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"VARIABLE_P"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"VARIABLE_B"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_VARIABLECO",inFilter:"false"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_VARIABLEPA",inFilter:"false"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_VARIABLENA",inFilter:"false"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_VARIABLE_P",inFilter:"false"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_VARIABLE_B",inFilter:"false"}],U={suggesters:T,components:I,pagination:c,resizing:g,label:R,lunaticModelVersion:C,modele:S,enoCoreVersion:d,generatingDate:y,missing:D,id:O,maxPage:N,variables:V},v="1",F=[{responseNames:["VARIABLE_ACTIVITE"],name:"L_ACTIVITES-1-0-0",fields:[{name:"label",rules:["[\\w]+"],language:"French",min:3,stemmer:!1,synonyms:{EHPAD:["EPHAD","HEPAD","EPAD","EPAHD","EPADH"],plaquisterie:["PLACO","PLACOPLATRE"],pneumatiques:["PNEUS"],prestations:["PRESTATAIRE"],echafaudages:["ECHAFFAUDAGE","ECHAFFAUDEUR"],URSSAF:["URSAF","URSAFF"],ascenseurs:["ASCENCEUR","ASSENCEUR","ACSENCEUR"],briqueterie:["BRIQUETTERIE"],joaillerie:["JOAILLIER"],agroalimentaire:["AGGROALIMANTAIRE","AGROALIMANTAIRE"],alimentaire:["ALIMANTAIRE"],alimentaires:["ALIMANTAIRES"],agroalimentaires:["AGGROALIMANTAIRES","AGROALIMENTAIRES"]}}],queryParser:{type:"tokenized",params:{language:"French",pattern:"[\\w.]+",min:3,stemmer:!1}},version:"1",stopWords:["a","au","dans","de","des","du","en","er","la","le","ou","sur","d","l","aux","dans","un","une","pour","avec","chez","par","les"]}],P=[{id:"lfwg2ny2",componentType:"ComponentSet",page:"1",className:"ComponentSet",conditionFilter:{value:"true",type:"VTL"},label:{value:'"Chercher votre activité principale."',type:"VTL"},components:[{id:"communes-2023",componentType:"Suggester",label:{value:'"Activité"',type:"VTL"},description:'"industrie"',storeName:"L_ACTIVITES-1-0-0",conditionFilter:{value:"true",type:"VTL"},response:{name:"ACT"}}]}],f=[{variableType:"COLLECTED",name:"ACT",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTED:null}}],b={maxPage:v,suggesters:F,components:P,variables:f},q={title:"Components/Suggester",component:u,argTypes:L},m=n=>p(u,{...n}),e=m.bind({});e.args={id:"suggester",source:U,autoSuggesterLoading:!0,getReferentiel:A,pagination:!0};const a=m.bind({});a.args={source:b,getReferentiel:A,autoSuggesterLoading:!0};var s,t,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(l=(t=e.parameters)==null?void 0:t.docs)==null?void 0:l.source}}};var o,i,E;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(E=(i=a.parameters)==null?void 0:i.docs)==null?void 0:E.source}}};const z=["Default","ComponentSet"];export{a as ComponentSet,e as Default,z as __namedExportsOrder,q as default};
