import{j as T}from"./Declarations-B9Jou-zL.js";import"./index-Cs7sjTYM.js";import{d as c}from"./default-arg-types-gvmCcWIB.js";import{O as r}from"./orchestrator-vKHRPJxy.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Combobox-DGD2gEg3.js";import"./Datepicker-Bxve3eXL.js";import"./index-BU4L-DQy.js";const d="../../../../lunatic-schema.json",y="lb3ei722",D="TESTSURSUM",m="2.7.1",M="2.5.0",L="31-01-2024 11:22:52",I=!0,S="question",g="10",v={value:"QNONREG - sum, min dans une boucle et sur controle prénom et test filtre occurrence",type:"VTL|MD"},N=[{id:"ksyjs7vy",componentType:"Sequence",page:"1",label:{value:'"I - " || "S0"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{value:'"I - " || "S0"',type:"VTL|MD"}}}},{id:"kze792d8",componentType:"InputNumber",mandatory:!1,page:"2",min:0,max:10,decimals:0,label:{value:'"NB"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},controls:[{id:"kze792d8-format-borne-inf-sup",typeOfControl:"FORMAT",criticality:"ERROR",control:{value:"not(not(isnull(NB)) and (0>NB or 10<NB))",type:"VTL"},errorMessage:{value:'" La valeur doit être comprise entre 0 et 10."',type:"VTL|MD"}},{id:"kze792d8-format-decimal",typeOfControl:"FORMAT",criticality:"ERROR",control:{value:"not(not(isnull(NB))  and round(NB,0)<>NB)",type:"VTL"},errorMessage:{value:'"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."',type:"VTL|MD"}}],hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{value:'"I - " || "S0"',type:"VTL|MD"}}},missingResponse:{name:"NB_MISSING"},bindingDependencies:["NB_MISSING","NB"],response:{name:"NB"}},{id:"ksykfdm9",componentType:"Loop",page:"3",depth:1,paginatedLoop:!1,conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{value:'"I - " || "S0"',type:"VTL|MD"}}},bindingDependencies:["NB","PRENOM_MISSING","PRENOM"],loopDependencies:["NB"],lines:{min:{value:"cast(NB,integer)",type:"VTL"},max:{value:"cast(NB,integer)",type:"VTL"}},components:[{id:"ksynhpl3",componentType:"Subsequence",label:{value:'"Habitants"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyjs7vy",page:"1",label:{value:'"I - " || "S0"',type:"VTL|MD"}},subSequence:{id:"ksynhpl3",page:"3",label:{value:'"Habitants"',type:"VTL|MD"}}},bindingDependencies:["NB"]},{id:"ksyjvi40",componentType:"Input",mandatory:!1,maxLength:249,label:{value:'"prénom"',type:"VTL|MD"},missingResponse:{name:"PRENOM_MISSING"},declarations:[{id:"ksyjvi40-l7uj49ok",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Tester Prénom vide et Prénom = A"',type:"VTL|MD"}}],conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["PRENOM","NB"],response:{name:"PRENOM"}},{id:"nomksyjvi40",componentType:"Input",mandatory:!1,maxLength:249,label:{value:'"Nom"',type:"VTL|MD"},missingResponse:{name:"NOM_MISSING"},declarations:[{id:"ksyjvi40-l7uj49ok",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Tester Prénom vide et Prénom = A"',type:"VTL|MD"}}],conditionFilter:{value:"true",type:"VTL"},bindingDependencies:["NOM","NB"],response:{name:"NOM"}}]},{id:"ksyniqzx",componentType:"Sequence",page:"4",label:{value:'"II - " || "S1"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{value:'"II - " || "S1"',type:"VTL|MD"}}}},{id:"ksynkaoo",componentType:"Loop",page:"5",maxPage:"1",depth:1,paginatedLoop:!0,conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{value:'"II - " || "S1"',type:"VTL|MD"}}},bindingDependencies:["AGE","IND_MAJEUR","PRENOM","AGE_MISSING"],loopDependencies:["PRENOM"],components:[{id:"ksyjxw3a",componentType:"Subsequence",goToPage:"5.1",label:{value:'"Les ages"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{value:'"II - " || "S1"',type:"VTL|MD"}},subSequence:{id:"ksyjxw3a",page:"5.1",label:{value:'"Les ages"',type:"VTL|MD"}}},bindingDependencies:["PRENOM"]},{id:"ksyke448",componentType:"InputNumber",mandatory:!1,page:"5.1",min:0,max:100,decimals:0,label:{value:'"Age de l’individu : " || PRENOM',type:"VTL|MD"},declarations:[{id:"ksyke448-ktwsl4qu",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"AGE vaut : " || cast(AGE,string)',type:"VTL|MD"}},{id:"ksyke448-l7g2enbf",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"IND_MAJEUR :" || cast(IND_MAJEUR,string)',type:"VTL|MD"}}],conditionFilter:{value:"true",type:"VTL"},controls:[{id:"ksyke448-format-borne-inf-sup",typeOfControl:"FORMAT",criticality:"ERROR",control:{value:"not(not(isnull(AGE)) and (0>AGE or 100<AGE))",type:"VTL"},errorMessage:{value:'" La valeur doit être comprise entre 0 et 100."',type:"VTL|MD"}},{id:"ksyke448-format-decimal",typeOfControl:"FORMAT",criticality:"ERROR",control:{value:"not(not(isnull(AGE))  and round(AGE,0)<>AGE)",type:"VTL"},errorMessage:{value:'"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."',type:"VTL|MD"}}],hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{value:'"II - " || "S1"',type:"VTL|MD"}},subSequence:{id:"ksyjxw3a",page:"5.1",label:{value:'"Les ages"',type:"VTL|MD"}}},missingResponse:{name:"AGE_MISSING"},bindingDependencies:["AGE","IND_MAJEUR","PRENOM","AGE_MISSING"],response:{name:"AGE"}}],iterations:{value:"count(PRENOM)",type:"VTL"}},{id:"ku2pnlmr",componentType:"Subsequence",page:"6",label:{value:'"Affichage de qq var"',type:"VTL|MD"},declarations:[{id:"ku2pnlmr-l7t4dzz2",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Affichage du nb de majeurs : " || cast(SUM_MAJEUR,string)',type:"VTL|MD"}},{id:"ku2pnlmr-l806u4c8",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Affichage du somme age : " || cast(SUM_AGE,string)',type:"VTL|MD"}},{id:"ku2pnlmr-lg6mo14c",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Affichage du min des ages sans cast: " || cast(MIN_AGE,string)',type:"VTL|MD"}}],conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{value:'"II - " || "S1"',type:"VTL|MD"}},subSequence:{id:"ku2pnlmr",page:"6",label:{value:'"Affichage de qq var"',type:"VTL|MD"}}},bindingDependencies:["SUM_MAJEUR","SUM_AGE","MIN_AGE"]},{id:"ku2pxugf",componentType:"Input",mandatory:!1,page:"7",maxLength:249,label:{value:"divers",type:"VTL|MD"},conditionFilter:{value:"(SUM_MAJEUR > 0)",type:"VTL",bindingDependencies:["SUM_MAJEUR","IND_MAJEUR","AGE"]},hierarchy:{sequence:{id:"ksyniqzx",page:"4",label:{value:'"II - " || "S1"',type:"VTL|MD"}},subSequence:{id:"ku2pnlmr",page:"6",label:{value:'"Affichage de qq var"',type:"VTL|MD"}}},missingResponse:{name:"DIVERS_MISSING"},bindingDependencies:["DIVERS_MISSING","DIVERS"],response:{name:"DIVERS"}},{id:"l7yz0fe5",componentType:"Sequence",page:"8",label:{value:'"III - " || "S3"',type:"VTL|MD"},declarations:[{id:"l7yz0fe5-l7yyye9y",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Affichage de la somme des ages : " || cast(SUM_AGE,string)',type:"VTL|MD"}},{id:"l7yz0fe5-l7yz5mgk",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Affichage du nb de majeurs : " || cast(SUM_MAJEUR,string)',type:"VTL|MD"}},{id:"l7yz0fe5-l7yyrp0q",declarationType:"HELP",position:"AFTER_QUESTION_TEXT",label:{value:'"Affichage du min des ages : " || cast(MIN_AGE,string)',type:"VTL|MD"}}],conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"l7yz0fe5",page:"8",label:{value:'"III - " || "S3"',type:"VTL|MD"}}},bindingDependencies:["SUM_AGE","SUM_MAJEUR","MIN_AGE"]},{id:"COMMENT-SEQ",componentType:"Sequence",page:"9",label:{value:'"Commentaire"',type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"COMMENT-SEQ",page:"9",label:{value:'"Commentaire"',type:"VTL|MD"}}}},{id:"COMMENT-QUESTION",componentType:"Textarea",mandatory:!1,page:"10",maxLength:2e3,label:{value:`"Avez-vous des remarques concernant l'enquête ou des commentaires ?"`,type:"VTL|MD"},conditionFilter:{value:"true",type:"VTL"},hierarchy:{sequence:{id:"COMMENT-SEQ",page:"9",label:{value:'"Commentaire"',type:"VTL|MD"}}},bindingDependencies:["COMMENT_QE"],response:{name:"COMMENT_QE"}}],b=[{variableType:"COLLECTED",name:"COMMENT_QE",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"COMMENT_QE",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NB",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NB_MISSING",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"PRENOM_MISSING",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NOM_MISSING",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"NOM",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"PRENOM",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}},{variableType:"COLLECTED",name:"AGE",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}},{variableType:"COLLECTED",name:"AGE_MISSING",values:{PREVIOUS:[null],COLLECTED:[null],FORCED:[null],EDITED:[null],INPUTTED:[null]}},{variableType:"COLLECTED",name:"DIVERS",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"COLLECTED",name:"DIVERS_MISSING",values:{PREVIOUS:null,COLLECTED:null,FORCED:null,EDITED:null,INPUTTED:null}},{variableType:"CALCULATED",name:"IND_MAJEUR",expression:{value:"if nvl(AGE,0) > 17 then 1 else 0",type:"VTL"},bindingDependencies:["AGE"],shapeFrom:"PRENOM",inFilter:"true"},{variableType:"CALCULATED",name:"SUM_MAJEUR",expression:{value:"sum(IND_MAJEUR)",type:"VTL"},bindingDependencies:["IND_MAJEUR","AGE"],inFilter:"true"},{variableType:"CALCULATED",name:"SUM_AGE",expression:{value:"sum(AGE)",type:"VTL"},bindingDependencies:["AGE"],inFilter:"false"},{variableType:"CALCULATED",name:"MIN_AGE",expression:{value:"min(AGE)",type:"VTL"},bindingDependencies:["AGE"],inFilter:"false"}],O={SUM_MAJEUR:{DIVERS:"(SUM_MAJEUR > 0)"},IND_MAJEUR:{DIVERS:"(SUM_MAJEUR > 0)"},AGE:{DIVERS:"(SUM_MAJEUR > 0)"}},R={NB_MISSING:["NB"],NB:["NB_MISSING"],PRENOM_MISSING:["PRENOM"],NOM_MISSING:["NOM"],PRENOM:["PRENOM_MISSING"],NOM:["NOM_MISSING"],AGE_MISSING:["AGE"],AGE:["AGE_MISSING"],DIVERS_MISSING:["DIVERS"],DIVERS:["DIVERS_MISSING"]},V={NB:{size:"cast(NB,integer)",variables:["PRENOM","AGE"]}},u={$schema:d,id:y,modele:D,enoCoreVersion:m,lunaticModelVersion:M,generatingDate:L,missing:I,pagination:S,maxPage:g,label:v,components:N,variables:b,cleaning:O,missingBlock:R,resizing:V},k={title:"Behaviour/Missing",component:r,argTypes:{...c,missing:{table:{disable:!1},control:"boolean",defaultValue:!0},activeGoNextForMissing:{table:{disable:!1},control:"boolean",defaultValue:!0},management:{table:{disable:!1},control:"boolean",defaultValue:!1},activeControls:{control:"boolean",defaultValue:!0},source:{table:{disable:!1},control:{type:"object"},defaultValue:u},data:{table:{disable:!1},control:{type:"object"},defaultValue:{COLLECTED:{READY:{COLLECTED:!0}}}}}},p=E=>T.jsx(r,{...E}),e=p.bind({});e.args={pagination:!0,missing:!0,source:u,shortcut:!0,missingShortcut:{dontKnow:"f2",refused:"f4"}};const n=p.bind({});n.args={...e.args,readOnly:!0};var a,l,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var t,s,o;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:"args => <Orchestrator {...args} />",...(o=(s=n.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const F=["Default","ReadOnly"];export{e as Default,n as ReadOnly,F as __namedExportsOrder,k as default};
