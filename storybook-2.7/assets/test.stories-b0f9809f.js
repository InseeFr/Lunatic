import{j as o}from"./jsx-runtime-52da5b2b.js";import"./index-e67e0a49.js";import{O as i,d as s}from"./default-arg-types-359c557f.js";import"./_commonjsHelpers-de833af9.js";import"./index-975ff56c.js";import"./index-9d475cdf.js";const r={IND_MAJEUR:{DIVERS:"(SUM_MAJEUR > 0)"},SUM_MAJEUR:{DIVERS:"(SUM_MAJEUR > 0)"},AGE:{DIVERS:"(SUM_MAJEUR > 0)"}},p=[{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"COMMENT_QE"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"NB"},{variableType:"COLLECTED",values:{COLLECTED:[null],EDITED:[null],INPUTED:[null],FORCED:[null],PREVIOUS:[null]},name:"PRENOM"},{variableType:"COLLECTED",values:{COLLECTED:[null],EDITED:[null],INPUTED:[null],FORCED:[null],PREVIOUS:[null]},name:"AGE"},{variableType:"COLLECTED",values:{COLLECTED:null,EDITED:null,INPUTED:null,FORCED:null,PREVIOUS:null},name:"DIVERS"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_NB",inFilter:"false"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_PRENOM",inFilter:"false",shapeFrom:"PRENOM"},{variableType:"CALCULATED",bindingDependencies:["AGE"],expression:{type:"VTL",value:"if nvl(AGE,0) > 17 then 1 else 0"},name:"IND_MAJEUR",inFilter:"true",shapeFrom:"PRENOM"},{variableType:"CALCULATED",expression:{type:"VTL",value:"true"},name:"FILTER_RESULT_AGE",inFilter:"false",shapeFrom:"AGE"},{variableType:"CALCULATED",bindingDependencies:["SUM_MAJEUR"],expression:{type:"VTL",value:"(SUM_MAJEUR > 0)"},name:"FILTER_RESULT_DIVERS",inFilter:"false"},{variableType:"CALCULATED",bindingDependencies:["IND_MAJEUR","AGE"],expression:{type:"VTL",value:"sum(IND_MAJEUR)"},name:"SUM_MAJEUR",inFilter:"true"},{variableType:"CALCULATED",bindingDependencies:["AGE"],expression:{type:"VTL",value:"sum(AGE)"},name:"SUM_AGE",inFilter:"false"},{variableType:"CALCULATED",bindingDependencies:["AGE"],expression:{type:"VTL",value:"min(AGE)"},name:"MIN_AGE",inFilter:"false"}],u=[{componentType:"Sequence",hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}},{componentType:"InputNumber",controls:[{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'" La valeur doit être comprise entre 0 et 10."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(NB)) and (0>NB or 10<NB))"},id:"kze792d8-format-borne-inf-sup"},{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(NB))  and round(NB,0)<>NB)"},id:"kze792d8-format-decimal"}],max:10,hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}}},conditionFilter:{type:"VTL",value:"true"},label:{type:"VTL|MD",value:'"➡ 1. " || "NB"'},mandatory:!1,bindingDependencies:["NB"],min:0,response:{name:"NB"},decimals:0,id:"kze792d8",page:"2"},{paginatedLoop:!1,componentType:"Loop",loopDependencies:["NB"],components:[{componentType:"Subsequence",bindingDependencies:["NB"],goToPage:"3",hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}},subSequence:{id:"ksynhpl3",page:"3",label:{type:"VTL|MD",value:'"Habitants"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksynhpl3",page:"3",label:{type:"VTL|MD",value:'"Habitants"'}},{componentType:"Input",bindingDependencies:["PRENOM","NB"],controls:[{bindingDependencies:["PRENOM"],criticality:"WARN",errorMessage:{type:"VTL|MD",value:'"Prenom est vide - controle nvl"'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:'not(nvl(PRENOM,"")="")'},id:"ksyjvi40-CI-0"},{bindingDependencies:["PRENOM"],criticality:"WARN",errorMessage:{type:"VTL|MD",value:'"PRénom vaut A"'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:'not(PRENOM = "A")'},id:"ksyjvi40-CI-1"}],response:{name:"PRENOM"},hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}},subSequence:{id:"ksynhpl3",page:"3",label:{type:"VTL|MD",value:'"Habitants"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksyjvi40",page:"3",label:{type:"VTL|MD",value:'"➡ 2. " || "prénom"'},mandatory:!1,maxLength:249,declarations:[{declarationType:"HELP",id:"ksyjvi40-l7uj49ok",label:{type:"VTL|MD",value:'"Tester Prénom vide et Prénom = A"'},position:"AFTER_QUESTION_TEXT"}]}],bindingDependencies:["NB","PRENOM"],depth:1,hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{type:"VTL|MD",value:'"I - " || "S0"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksykfdm9",page:"3",lines:{min:{type:"VTL",value:"cast(NB,integer)"},max:{type:"VTL",value:"cast(NB,integer)"}}},{componentType:"Sequence",hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{type:"VTL|MD",value:'"II - " || "S1"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksyniqzx",page:"4",label:{type:"VTL|MD",value:'"II - " || "S1"'}},{paginatedLoop:!0,componentType:"Loop",loopDependencies:["PRENOM"],components:[{componentType:"Subsequence",bindingDependencies:["PRENOM"],goToPage:"5.1",hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{type:"VTL|MD",value:'"II - " || "S1"'}},subSequence:{id:"ksyjxw3a",page:"5.1",label:{type:"VTL|MD",value:'"Les ages"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksyjxw3a",label:{type:"VTL|MD",value:'"Les ages"'}},{componentType:"InputNumber",controls:[{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'" La valeur doit être comprise entre 0 et 100."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(AGE)) and (0>AGE or 100<AGE))"},id:"ksyke448-format-borne-inf-sup"},{criticality:"ERROR",errorMessage:{type:"VTL|MD",value:'"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."'},typeOfControl:"FORMAT",control:{type:"VTL",value:"not(not(isnull(AGE))  and round(AGE,0)<>AGE)"},id:"ksyke448-format-decimal"},{bindingDependencies:["AGE"],criticality:"WARN",errorMessage:{type:"VTL|MD",value:'"Age est vide"'},typeOfControl:"CONSISTENCY",control:{type:"VTL",value:"not(isnull(AGE))"},id:"ksyke448-CI-0"}],max:100,hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{type:"VTL|MD",value:'"II - " || "S1"'}},subSequence:{id:"ksyjxw3a",page:"5.1",label:{type:"VTL|MD",value:'"Les ages"'}}},conditionFilter:{type:"VTL",value:"true"},label:{type:"VTL|MD",value:'"➡ 3. " || "Age de l’individu : " || PRENOM'},mandatory:!1,declarations:[{declarationType:"HELP",id:"ksyke448-ktwsl4qu",label:{type:"VTL|MD",value:'"AGE vaut : " || cast(AGE,string)'},position:"AFTER_QUESTION_TEXT"},{declarationType:"HELP",id:"ksyke448-l7g2enbf",label:{type:"VTL|MD",value:'"IND_MAJEUR :" || cast(IND_MAJEUR,string)'},position:"AFTER_QUESTION_TEXT"}],bindingDependencies:["AGE","IND_MAJEUR","PRENOM"],min:0,response:{name:"AGE"},decimals:0,id:"ksyke448",page:"5.1"}],bindingDependencies:["AGE","IND_MAJEUR","PRENOM"],depth:1,hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{type:"VTL|MD",value:'"II - " || "S1"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ksynkaoo",page:"5",maxPage:"1",iterations:{type:"VTL",value:"count(PRENOM)"}},{componentType:"Subsequence",bindingDependencies:["SUM_MAJEUR","SUM_AGE","MIN_AGE"],goToPage:"6",hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{type:"VTL|MD",value:'"II - " || "S1"'}},subSequence:{id:"ku2pnlmr",page:"6",label:{type:"VTL|MD",value:'"Affichage de qq var"'}}},conditionFilter:{type:"VTL",value:"true"},id:"ku2pnlmr",page:"6",label:{type:"VTL|MD",value:'"Affichage de qq var"'},declarations:[{declarationType:"HELP",id:"ku2pnlmr-l7t4dzz2",label:{type:"VTL|MD",value:'"Affichage du nb de majeurs : " || cast(SUM_MAJEUR,string)'},position:"AFTER_QUESTION_TEXT"},{declarationType:"HELP",id:"ku2pnlmr-l806u4c8",label:{type:"VTL|MD",value:'"Affichage du somme age : " || cast(SUM_AGE,string)'},position:"AFTER_QUESTION_TEXT"},{declarationType:"HELP",id:"ku2pnlmr-lg6mo14c",label:{type:"VTL|MD",value:'"Affichage du min des ages sans cast: " || cast(MIN_AGE,string)'},position:"AFTER_QUESTION_TEXT"}]},{componentType:"Input",bindingDependencies:["DIVERS"],response:{name:"DIVERS"},hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{type:"VTL|MD",value:'"II - " || "S1"'}},subSequence:{id:"ku2pnlmr",page:"6",label:{type:"VTL|MD",value:'"Affichage de qq var"'}}},conditionFilter:{bindingDependencies:["SUM_MAJEUR","IND_MAJEUR","AGE"],type:"VTL",value:"(SUM_MAJEUR > 0)"},id:"ku2pxugf",page:"7",label:{type:"VTL|MD",value:'"➡ 4. " || "divers"'},mandatory:!1,maxLength:249},{componentType:"Sequence",bindingDependencies:["SUM_AGE","SUM_MAJEUR","MIN_AGE"],hierarchy:{sequence:{id:"l7yz0fe5",page:"8",label:{type:"VTL|MD",value:'"III - " || "S3"'}}},conditionFilter:{type:"VTL",value:"true"},id:"l7yz0fe5",page:"8",label:{type:"VTL|MD",value:'"III - " || "S3"'},declarations:[{declarationType:"HELP",id:"l7yz0fe5-l7yyye9y",label:{type:"VTL|MD",value:'"Affichage de la somme des ages : " || cast(SUM_AGE,string)'},position:"AFTER_QUESTION_TEXT"},{declarationType:"HELP",id:"l7yz0fe5-l7yz5mgk",label:{type:"VTL|MD",value:'"Affichage du nb de majeurs : " || cast(SUM_MAJEUR,string)'},position:"AFTER_QUESTION_TEXT"},{declarationType:"HELP",id:"l7yz0fe5-l7yyrp0q",label:{type:"VTL|MD",value:'"Affichage du min des ages : " || cast(MIN_AGE,string)'},position:"AFTER_QUESTION_TEXT"}]},{componentType:"Sequence",hierarchy:{sequence:{id:"COMMENT-SEQ",page:"9",label:{type:"VTL|MD",value:'"Commentaire"'}}},conditionFilter:{type:"VTL",value:"true"},id:"COMMENT-SEQ",page:"9",label:{type:"VTL|MD",value:'"Commentaire"'}},{componentType:"Textarea",bindingDependencies:["COMMENT_QE"],response:{name:"COMMENT_QE"},hierarchy:{sequence:{id:"COMMENT-SEQ",page:"9",label:{type:"VTL|MD",value:'"Commentaire"'}}},conditionFilter:{type:"VTL",value:"true"},id:"COMMENT-QUESTION",page:"10",label:{type:"VTL|MD",value:`"Avez-vous des remarques concernant l'enquête ou des commentaires ?"`},mandatory:!1,maxLength:2e3}],c="question",T={NB:{variables:["PRENOM","AGE"],size:"cast(NB,integer)"}},E={type:"VTL|MD",value:"QNONREG - sum, min dans une boucle et sur controle prénom et test filtre occurrence"},y="2.3.2-rc4",d="TESTSURSUM",L="2.4.1-pairwise",M="14-04-2023 09:00:09",m=!1,v="lb3ei722",g="10",D={cleaning:r,variables:p,components:u,pagination:c,resizing:T,label:E,lunaticModelVersion:y,modele:d,enoCoreVersion:L,generatingDate:M,missing:m,id:v,maxPage:g},O={title:"Behaviour/Resizing",component:i,argTypes:{...s,missing:{table:{disable:!1},control:"boolean",defaultValue:!0},activeGoNextForMissing:{table:{disable:!1},control:"boolean",defaultValue:!0},management:{table:{disable:!1},control:"boolean",defaultValue:!1},activeControls:{control:"boolean",defaultValue:!0},source:{table:{disable:!1},control:{type:"object"},defaultValue:D},data:{table:{disable:!1},control:{type:"object"},defaultValue:{COLLECTED:{READY:{COLLECTED:!0}}}}}},b=t=>o(i,{...t}),e=b.bind({});e.args={id:"resizing-default",pagination:!0};var a,n,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,O as default};
//# sourceMappingURL=test.stories-b0f9809f.js.map
