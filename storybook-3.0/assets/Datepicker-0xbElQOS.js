import{s as h,j as t,y as b,g as Y,L as j,C as F}from"./Label-CI4doyRt.js";import{r as S}from"./index-Cs7sjTYM.js";const f=h("Declaration",({children:r,declarationType:n})=>t.jsx("div",{"data-testid":"declaration",className:b("declaration-lunatic",`declaration-${n.toLowerCase()}`),children:r}));function v({id:r,type:n="AFTER_QUESTION_TEXT",declarations:i}){const s=(i==null?void 0:i.filter(e=>e.position===n&&e.label))??[];return s.length===0?null:t.jsx("div",{id:`declarations-${r}-${n}`,className:"declarations-lunatic",children:s.map(({id:e,label:a,declarationType:d})=>t.jsx(f,{declarationType:d,children:a},e))})}const k=h("Declarations",v);f.__docgenInfo={description:"",methods:[],displayName:"Declaration"};v.__docgenInfo={description:"",methods:[],displayName:"LunaticDeclarations",props:{id:{required:!1,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:"'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE'",elements:[{name:"literal",value:"'AFTER_QUESTION_TEXT'"},{name:"literal",value:"'BEFORE_QUESTION_TEXT'"},{name:"literal",value:"'DETACHABLE'"}]},description:"",defaultValue:{value:"'AFTER_QUESTION_TEXT'",computed:!1}},declarations:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	id: string;
	declarationType:
		| 'INSTRUCTION'
		| 'COMMENT'
		| 'HELP'
		| 'CODECARD'
		| 'WARNING'
		| 'STATEMENT';
	position: string;
	label: ReactNode;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"declarationType",value:{name:"union",raw:`| 'INSTRUCTION'
| 'COMMENT'
| 'HELP'
| 'CODECARD'
| 'WARNING'
| 'STATEMENT'`,elements:[{name:"literal",value:"'INSTRUCTION'"},{name:"literal",value:"'COMMENT'"},{name:"literal",value:"'HELP'"},{name:"literal",value:"'CODECARD'"},{name:"literal",value:"'WARNING'"},{name:"literal",value:"'STATEMENT'"}],required:!0}},{key:"position",value:{name:"string",required:!0}},{key:"label",value:{name:"ReactNode",required:!0}}]}}],raw:`{
	id: string;
	declarationType:
		| 'INSTRUCTION'
		| 'COMMENT'
		| 'HELP'
		| 'CODECARD'
		| 'WARNING'
		| 'STATEMENT';
	position: string;
	label: ReactNode;
}[]`},description:""}}};function p({label:r,id:n,description:i,onChange:s,value:e,max:a,readOnly:d,disabled:N}){const T=l=>{!Number.isNaN(l.target.valueAsNumber)&&(a&&l.target.valueAsNumber>a||l.target.valueAsNumber<1)||s(l.target.valueAsNumber)};return t.jsxs("div",{className:b("lunaticDatepickerField",(!a||a>999)&&"lunaticDatepickerFieldLarge"),children:[t.jsxs("label",{htmlFor:n,children:[r,t.jsx("span",{className:"lunaticDatepickerHint",children:i})]}),t.jsx("input",{id:n,type:"number",min:1,max:a,readOnly:d,disabled:N,value:Number.isNaN(e)?"":e,onChange:T,onFocus:l=>l.target.select()})]})}p.__docgenInfo={description:"",methods:[],displayName:"DatepickerField",props:{id:{required:!0,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"string"},description:""},max:{required:!1,tsType:{name:"number"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: number) => void",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"void"}}},description:""},value:{required:!1,tsType:{name:"number"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};function q({dateFormat:r="YYYY-MM-DD",response:n,handleChanges:i,errors:s,...e}){return t.jsx(C,{...e,dateFormat:r??"YYYY-MM-DD",onChange:a=>i([{name:n.name,value:a}]),errors:Y(s,e.id)})}const C=h("Datepicker",r=>{const{disabled:n,readOnly:i,value:s="",dateFormat:e="YYYY-MM-DD",id:a,label:d,errors:N,description:T,declarations:l,onChange:E}=r,I=`lunatic-datepicker-${a}`,A=e.includes("DD"),M=e.includes("MM"),[c,x]=S.useState(()=>L(s??void 0)),D=u=>m=>{const o=[...c];o[u]=m,x(o),_(o)},_=u=>{const m=e.split("-"),o=u.findIndex(y=>Number.isNaN(y));if(o>-1&&o<=m.length-1){E(null);return}if(e==="YYYY-MM-DD"&&!U(u)){E(null);return}const O=m.map((y,R)=>u[R].toString().padStart(y.length,"0")).join("-");E(O)},g={readOnly:i,disabled:n};return t.jsxs("div",{className:"lunatic-input",children:[t.jsx(j,{htmlFor:a,id:I,description:T,children:d}),t.jsx(k,{type:"AFTER_QUESTION_TEXT",declarations:l,id:a}),t.jsxs("div",{className:"lunaticDatepickerFields",children:[A&&t.jsx(p,{id:a+"day",label:"Jour",description:"Exemple: 14",max:31,value:c[2],onChange:D(2),...g}),M&&t.jsx(p,{id:a+"month",label:"Mois",description:"Exemple: 07",max:12,value:c[1],onChange:D(1),...g}),t.jsx(p,{id:a+"year",label:"Année",description:"Exemple: 2023",value:c[0],max:9999,onChange:D(0),...g})]}),t.jsx(F,{errors:N})]})});function L(r){if(!r)return[NaN,NaN,NaN];const n=r.split("-");return[parseInt(n[0],10),parseInt(n[1],10),parseInt(n[2],10)]}function U(r){const[n,i,s]=r,e=new Date(n,i-1,s);return e.getFullYear()===n&&e.getMonth()===i-1&&e.getDate()===s}q.__docgenInfo={description:"",methods:[],displayName:"Datepicker",props:{dateFormat:{defaultValue:{value:"'YYYY-MM-DD'",computed:!1},required:!1}}};C.__docgenInfo={description:"",methods:[],displayName:"CustomDatepicker"};export{q as D,k as a};
