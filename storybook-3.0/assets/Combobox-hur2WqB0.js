import{j as a}from"./jsx-runtime-BlAj40OV.js";import{s as v,y as c,C as ge,L as ve,D as Te}from"./Declarations-CcAzpTKH.js";import{r as b}from"./index-Cs7sjTYM.js";const z=v("ComboboxContainer",({children:e,className:n,classNamePrefix:r,id:i,classStyle:t="default-style",errors:s})=>a.jsxs("div",{id:`${r??"lunatic"}-combo-box-container-${i}`,className:c(n,`${r??"lunatic"}-combo-box-container`,`${r??"lunatic"}-suggester-${t}`,"lunatic-suggester-default-style",t),children:[e,s&&a.jsx(ge,{errors:s})]}));z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContainer",props:{classStyle:{defaultValue:{value:"'default-style'",computed:!1},required:!1}}};const y={ArrowUp:"ArrowUp",ArrowDown:"ArrowDown",Home:"Home",End:"End",Enter:"Enter",Escape:"Escape",Tab:"Tab"},Y=v("ComboboxContentBox",({children:e,classNamePrefix:n,focused:r})=>a.jsx("div",{className:c(`${n??"lunatic"}-combo-box`,{focused:r}),children:e}));Y.__docgenInfo={description:"",methods:[],displayName:"ComboboxContentBox"};function xe(e){const n=b.useRef(e);return n.current=e,n}function qe(e,n,r){const i=xe(n),t=b.useCallback(s=>{i.current(s)},[i]);b.useEffect(()=>(document.addEventListener(e,t,r),()=>{document.removeEventListener(e,t,r)}),[e,r,t])}function H({children:e,focused:n,onFocus:r,onBlur:i,onKeyDown:t,classNamePrefix:s}){const o=b.useRef(null),l=b.useCallback(u=>{var d;!((d=o.current)!=null&&d.contains(u.target))&&i&&i()},[o,i]);qe("mousedown",l);const m=b.useCallback(function(u){var p;const{key:d}=u;switch(u.stopPropagation(),d){case y.Escape:case y.Enter:case y.Tab:(p=o.current)==null||p.focus();break}t(d)},[t]);return a.jsx(Y,{classNamePrefix:s,focused:n,children:a.jsx("div",{className:c(`${s??"lunatic"}-combo-box-content`,{focused:n}),ref:o,tabIndex:0,onFocus:r,onClick:r,onKeyDown:m,children:e})})}H.__docgenInfo={description:"",methods:[],displayName:"ComboboxContent"};function G(e){const{top:n}=e;return n}function B(e){const{top:n,height:r}=e;return n+r}function he(e,n){const r=Math.min(G(e),G(n));return Math.max(B(e),B(n))-r<e.height+n.height}function X({children:e,index:n,selected:r,onSelect:i}){const t=b.useRef(null),s=b.useCallback(o=>{o.stopPropagation(),o.preventDefault(),i(n)},[i,n]);return b.useEffect(()=>{const{current:o}=t;if(o&&r&&o.parentNode){const l=o.getBoundingClientRect(),m=o.parentNode.getBoundingClientRect();he(l,m)||o.scrollIntoView()}},[t,r]),a.jsx("li",{className:c("lunatic-combo-box-option-container",{selected:r}),role:"option","aria-selected":r,onClick:s,ref:t,children:e})}X.__docgenInfo={description:"",methods:[],displayName:"ComboboxOptionContainer"};const C=v("ComboboxPanelContainer",({children:e,focused:n,expanded:r,id:i})=>a.jsx("ul",{id:`lunatic-combo-box-panel-${i}`,"aria-label":"suggestions",className:c("lunatic-combo-box-panel",{focused:n,expanded:r}),role:"listbox",children:e}));C.__docgenInfo={description:"",methods:[],displayName:"ComboboxPanelContainer"};const W={DEFAULT_BUTTON_ADD:{fr:"Ajouter une ligne",en:"Add row"},DEFAULT_BUTTON_REMOVE:{fr:"Supprimer une ligne",en:"Remove row"},MODAL_IGNORE:{fr:"Poursuivre",en:"Ignore"},MODAL_CORRECT:{fr:"Corriger ma réponse",en:"Correct"},DK:{fr:"Ne sais pas",en:"Don't know"},RF:{fr:"Refus",en:"Refused"},PLACEHOLDER:{fr:"Commencez votre saisie...",en:"Start typing..."},SUGGESTER_LOADING:{fr:"Liste en cours de chargement",en:"List is loading"},SUGGESTER_NO_RESULT:{fr:"Aucun résultat trouvé",en:"No results"},SUGGESTER_ERROR:{fr:"Erreur lors du chargement de la liste",en:"An error has occured while loading the list"},SUGGESTER_ARBITRARY:{fr:"Choisir",en:"Select"}};function _(e,n){return Object.entries(n).reduce((r,[i,t])=>({...r,[i]:t[e]}),{})}const I=["en","fr"],Q=()=>{const e=navigator.language.split("-")[0],n=I.map(r=>r.toString()).indexOf(e);return n===-1?I[0]:I[n]},A={thousandSeparator:{fr:" ",en:","},decimalSeparator:{fr:",",en:"."}},Ce=Object.values(A.decimalSeparator),Ne=_("fr",W),Re=_("en",W),we=_("fr",A),ke=_("en",A),$e={...Q()==="fr"?we:ke,allDecimalSeparators:Ce},N=Q()==="fr"?Ne:Re,Z=v("ComboboxOption",({option:e,selected:n})=>{const{id:r,value:i,label:t}=e;return i==="OTHER"?a.jsx("div",{className:c("lunatic-combo-box-option",{selected:n}),children:a.jsx("span",{className:"label",children:`${N.SUGGESTER_NO_RESULT} : ${N.SUGGESTER_ARBITRARY} "${t}"`})}):t&&typeof t=="string"&&t.length?a.jsxs("div",{className:c("lunatic-combo-box-option",{selected:n}),children:[a.jsx("span",{className:"id",children:r||i}),a.jsx("span",{children:" - "}),a.jsx("span",{className:"label",children:t})]}):a.jsx("div",{className:c("lunatic-combo-box-option",{selected:n}),children:a.jsx("span",{className:"id",children:r})})});Z.__docgenInfo={description:"",methods:[],displayName:"ComboboxOption",props:{option:{required:!0,tsType:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},description:""},selected:{required:!1,tsType:{name:"boolean"},description:""}}};function J({optionRenderer:e,options:n=[],focused:r,selectedIndex:i,expanded:t,id:s,search:o,onSelect:l,isLoading:m}){const u=t?n:[],d=e??Z;return u.length===0&&!o?null:m?a.jsx(C,{expanded:t,focused:r,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:N.SUGGESTER_LOADING})})}):o&&u.length===0?a.jsx(C,{expanded:t,focused:r,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:N.SUGGESTER_NO_RESULT})})}):u.length===0?a.jsx(C,{expanded:t,focused:r,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:N.SUGGESTER_NO_RESULT})})}):a.jsx(C,{expanded:t,focused:r,id:`${s}-list`,children:u.map((p,f)=>a.jsx(X,{index:f.toString(),selected:i===f,onSelect:l,children:a.jsx(d,{option:p,selected:i===f,search:o})},p.id??p.value))})}J.__docgenInfo={description:"Floating menu containing selectable options",methods:[],displayName:"ComboboxPanel",props:{optionRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
	option: ComboboxOptionType;
	selected?: boolean;
	search?: string;
}`,signature:{properties:[{key:"option",value:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]},required:!0}},{key:"selected",value:{name:"boolean",required:!1}},{key:"search",value:{name:"string",required:!1}}]}}],raw:`ComponentType<{
	option: ComboboxOptionType;
	selected?: boolean;
	search?: string;
}>`},description:"@deprecated use createCustomizableField with ComboboxOptionRenderer as name."},options:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"Array<ComboboxOptionType>"},description:"",defaultValue:{value:"[]",computed:!1}},focused:{required:!1,tsType:{name:"boolean"},description:""},selectedIndex:{required:!1,tsType:{name:"union",raw:"number | string | null",elements:[{name:"number"},{name:"string"},{name:"null"}]},description:""},expanded:{required:!1,tsType:{name:"boolean"},description:""},id:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};function ee({className:e,children:n}){return a.jsx("i",{className:c("lunatic-icon",e),children:n})}ee.__docgenInfo={description:"",methods:[],displayName:"LunaticIcon",props:{className:{required:!1,tsType:{name:"string"},description:""}}};function ne({className:e,width:n=32,height:r=32}){return a.jsx(ee,{className:e,children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:r,x:"0",y:"0",enableBackground:"new 0 0 32 32",version:"1.1",viewBox:"0 0 32 32",xmlSpace:"preserve",children:a.jsx("path",{d:"M 7.097006,7.0709627 C 6.4710386,7.6950801 6.0348033,8.5167883 6,9.3333333 l 6.666666,6.6666677 -6.6666655,6.666666 C 6.0406655,24.255963 7.7002437,25.930395 9.3333333,26 L 15.999999,19.333334 22.666665,26 C 24.255962,25.95934 25.930393,24.299755 26,22.666667 L 19.333332,16.000001 26,9.3333334 C 25.959335,7.7440359 24.299754,6.069605 22.666665,6 L 15.999999,12.666666 9.3333333,6 C 8.5386853,6.020332 7.7229758,6.4468492 7.097006,7.0709627 Z"})})})}ne.__docgenInfo={description:"",methods:[],displayName:"CrossIcon",props:{className:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}}}};const P=()=>{};function Ge(e,n){let r;return[(...s)=>new Promise((o,l)=>{r&&clearTimeout(r),r=window.setTimeout(async()=>{try{o(await e(...s))}catch(m){l(m)}},n)}),()=>clearTimeout(r)]}function re({className:e,children:n,tabIndex:r,title:i="Fab",onClick:t=P,onKeyDown:s=P,disabled:o}){return a.jsx("button",{className:c("lunatic-fab",e),tabIndex:r,title:i,onClick:t,onKeyDown:s,disabled:o,"aria-label":i,children:n})}re.__docgenInfo={description:"",methods:[],displayName:"IconButton",props:{title:{defaultValue:{value:"'Fab'",computed:!1},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},required:!1},onKeyDown:{defaultValue:{value:"() => {}",computed:!1},required:!1}}};function Ee(e){return!e||e.trim().length===0}function je(e){if(typeof e=="function")return n=>{n.key==="Enter"&&e()}}function ae({className:e,search:n,onClick:r,editable:i}){const t=b.useMemo(()=>je(r),[r]);return i?a.jsx(re,{className:c("mini","lunatic-combo-box-fab",e),title:"delete",onClick:r,disabled:Ee(n),onKeyDown:t,children:a.jsx(ne,{className:"lunatic-combo-box-icon"})}):null}const Oe=v("ComboboxClearButton",ae);ae.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxClearButton",props:{className:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:""}}};function Le(e,n,r){if(e){const{id:i,value:t,label:s}=e;return s?`${i||t} - ${s}`:i||t}return n&&n.trim().length?n:r??""}const te=({option:e,placeholder:n,search:r,disabled:i=!1,readOnly:t=!1})=>{const s=!e&&(!r||r.length===0);return(e==null?void 0:e.value)==="OTHER"?a.jsx("div",{className:c("lunatic-combo-box-selected",{disabled:i,readOnly:t}),children:a.jsx("span",{className:"selection",children:e.label})}):a.jsx("div",{className:c("lunatic-combo-box-selected",{disabled:i,readOnly:t}),children:a.jsx("span",{className:c({placeholder:s,selection:!s}),children:Le(e,r,n)})})},_e=v("ComboboxLabelSelection",te);te.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBoxLabelSelection",props:{option:{required:!1,tsType:{name:"union",raw:"ComboboxOptionType | null",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};function ie({placeholder:e,disabled:n,onChange:r,value:i,id:t,labelledBy:s,focused:o,className:l,invalid:m}){const u=b.useRef(null);b.useEffect(()=>{u.current&&o&&u.current.focus()},[u,o]);const d=p=>{const{key:f}=p;(f==="ArrowUp"||f==="ArrowDown")&&p.preventDefault()};return a.jsx("input",{ref:u,id:t,className:c("lunatic-combo-box-input",l),type:"text",onChange:r,value:i,"aria-invalid":m,title:"combo-box",autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",spellCheck:"false",placeholder:e,disabled:n,"aria-labelledby":s,onKeyDown:d})}const Se=v("ComboboxInput",ie);ie.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxInput",props:{placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},labelledBy:{required:!1,tsType:{name:"string"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""}}};function se({labelRenderer:e,placeholder:n,search:r,expanded:i,disabled:t,readOnly:s,focused:o,onChange:l,selectedIndex:m,options:u,editable:d,labelId:p,id:f,classNamePrefix:g,invalid:R}){const w=!d||!i,k=m!==void 0?u[m]:void 0,S=e??_e;return a.jsx("div",{id:f,className:c(`${g??"lunatic"}-combo-box-selection`,{focused:o,disabled:t}),role:"combobox","aria-controls":"todo","aria-haspopup":"listbox","aria-expanded":i,"aria-autocomplete":"list","aria-owns":f,"aria-labelledby":p,children:w?a.jsx(S,{option:k,placeholder:n,search:r,disabled:t,readOnly:s}):a.jsx(Se,{invalid:R,id:`combobox-input-${f}`,className:"lunatic-combo-box-input",onChange:E=>l==null?void 0:l(E.target.value??E.target.innerText),value:r,placeholder:n,disabled:t,readOnly:s,focused:o,labelledBy:p})})}se.__docgenInfo={description:`Label displayed when a value is selected in the ComboBox
This label can either be an input (when editable or expanded) or a simple span`,methods:[],displayName:"ComboboxSelection",props:{expanded:{required:!1,tsType:{name:"boolean"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:""},labelId:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""},classNamePrefix:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},labelRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
	option?: ComboboxOptionType;
	placeholder?: string;
	search?: string;
	disabled?: boolean;
}`,signature:{properties:[{key:"option",value:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]},required:!1}},{key:"placeholder",value:{name:"string",required:!1}},{key:"search",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:`ComponentType<{
	option?: ComboboxOptionType;
	placeholder?: string;
	search?: string;
	disabled?: boolean;
}>`},description:"@deprecated use createCustomizableField with ComboboxLabelRenderer as name."},placeholder:{required:!1,tsType:{name:"string"},description:""},selectedIndex:{required:!1,tsType:{name:"number"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"Array<ComboboxOptionType>"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};function Ve(e){if(typeof e=="string"){const n=parseInt(e,10);if(Number.isNaN(n))throw new Error(`Cannot cast ${e} to int`);return n}if(typeof e=="number")return e;throw new Error(`Cannot cast ${typeof e} to int`)}function De(e,n,r){return e<n?n:e>r?r:e}function Be(e){return typeof e=="number"&&Number.isFinite(e)}const K="";function oe({className:e,classNamePrefix:n,classStyle:r="default-style",placeholder:i="Commencez votre saisie...",editable:t=!1,disabled:s,readOnly:o,id:l,optionRenderer:m,labelRenderer:u,onChange:d,onSelect:p,value:f,options:g,messageError:R,search:w=K,getOptionValue:k=Ae,label:S,description:E,declarations:le,errors:M,onBlur:T,onFocus:V,isLoading:ue}){const[F,x]=b.useState(!1),[j,U]=b.useState(!1),O=Ie(g,f,k),$=`label-${l}`,de=()=>{s||o||(V==null||V(),x(!0),U(!0))},ce=()=>{s||o||(x(!1),U(!1),T==null||T())},q=(h,L=!0)=>{const D=De(Ve(h),0,g.length),ye=g[D];L&&(x(!1),T==null||T()),p(k(ye))},pe=h=>{d==null||d(h)},me=()=>{x(!1),d==null||d(K),p(null)},be=h=>{const L=g.length;switch(h){case y.Tab:case y.Escape:x(!1);return;case y.ArrowDown:q((O??-1)+1,!1);return;case y.ArrowUp:q((O??L)-1,!1);return;case y.Home:q(0,!1);return;case y.End:q(L-1,!1);return;case y.Enter:x(D=>!D);return}},fe=!s||!o;return R?a.jsx("div",{className:"lunatic-combo-box-message-error",children:R}):a.jsxs(z,{id:l,className:e,classStyle:r,classNamePrefix:n,errors:M,children:[a.jsx(ve,{htmlFor:l,id:$,description:E,children:S}),a.jsx(Te,{type:"AFTER_QUESTION_TEXT",declarations:le}),a.jsxs(H,{focused:j,onFocus:de,onBlur:ce,onKeyDown:be,classNamePrefix:n,children:[a.jsx(se,{labelRenderer:u,placeholder:i,search:w,expanded:F,id:l,labelId:$,disabled:s,readOnly:o,focused:j,editable:t,selectedIndex:O,options:g,onChange:pe,classNamePrefix:n,invalid:!!M}),a.jsx(J,{isLoading:ue,optionRenderer:m,options:g,focused:j,selectedIndex:O,expanded:F,id:l,search:w,onSelect:q})]}),fe&&a.jsx(Oe,{className:c({focused:j}),search:f,onClick:me,editable:t})]})}function Ie(e,n,r){if(Array.isArray(e))return e.map(r).findIndex(i=>i===n)}function Ae(e={value:""}){const{id:n,value:r}=e;return n||r}const Pe=v("Combobox",oe);oe.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBox",props:{expanded:{required:!1,tsType:{name:"boolean"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},labelId:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""},classNamePrefix:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},labelRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
	option?: ComboboxOptionType;
	placeholder?: string;
	search?: string;
	disabled?: boolean;
}`,signature:{properties:[{key:"option",value:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]},required:!1}},{key:"placeholder",value:{name:"string",required:!1}},{key:"search",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:`ComponentType<{
	option?: ComboboxOptionType;
	placeholder?: string;
	search?: string;
	disabled?: boolean;
}>`},description:"@deprecated use createCustomizableField with ComboboxLabelRenderer as name."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Commencez votre saisie...'",computed:!1}},selectedIndex:{required:!1,tsType:{name:"union",raw:"number | string | null",elements:[{name:"number"},{name:"string"},{name:"null"}]},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"ComboboxOptionType[]"},description:""},search:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},optionRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
	option: ComboboxOptionType;
	selected?: boolean;
	search?: string;
}`,signature:{properties:[{key:"option",value:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]},required:!0}},{key:"selected",value:{name:"boolean",required:!1}},{key:"search",value:{name:"string",required:!1}}]}}],raw:`ComponentType<{
	option: ComboboxOptionType;
	selected?: boolean;
	search?: string;
}>`},description:"@deprecated use createCustomizableField with ComboboxOptionRenderer as name."},isLoading:{required:!1,tsType:{name:"boolean"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},classStyle:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'default-style'",computed:!1}},value:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},messageError:{required:!1,tsType:{name:"string"},description:""},getOptionValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(o: ComboboxOptionType) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},name:"o"}],return:{name:"string"}}},description:"",defaultValue:{value:`function getDefaultOptionValue(option: ComboboxOptionType = { value: '' }) {
	const { id, value } = option;
	return id || value;
}`,computed:!1}},label:{required:!1,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},declarations:{required:!1,tsType:{name:"Array",raw:"LunaticBaseProps['declarations']"},description:""},errors:{required:!1,tsType:{name:"Array",elements:[{name:"intersection",raw:`Pick<
	ControlDefinition,
	'id' | 'criticality' | 'typeOfControl'
> & {
	errorMessage: ReactNode;
}`,elements:[{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
	id: string;
	criticality: 'INFO' | 'WARN' | 'ERROR';
	typeOfControl?: 'FORMAT' | 'CONSISTENCY';
	control: VTLExpression;
	errorMessage: VTLExpression;
	bindingDependencies?: string[];
	type?: 'roundabout' | 'ROW' | 'simple';
	iterations?: VTLScalarExpression;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"criticality",value:{name:"union",raw:"'INFO' | 'WARN' | 'ERROR'",elements:[{name:"literal",value:"'INFO'"},{name:"literal",value:"'WARN'"},{name:"literal",value:"'ERROR'"}],required:!0}},{key:"typeOfControl",value:{name:"union",raw:"'FORMAT' | 'CONSISTENCY'",elements:[{name:"literal",value:"'FORMAT'"},{name:"literal",value:"'CONSISTENCY'"}],required:!1}},{key:"control",value:{name:"signature",type:"object",raw:`{
	/**
	 * Valid VTL Expression
	 */
	value: string;
	/**
	 * Variables used in the expression
	 */
	bindingDependencies?: string[];
	type: 'VTL' | 'VTL|MD' | 'TXT';
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Valid VTL Expression"},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:"Variables used in the expression"},{key:"type",value:{name:"union",raw:"'VTL' | 'VTL|MD' | 'TXT'",elements:[{name:"literal",value:"'VTL'"},{name:"literal",value:"'VTL|MD'"},{name:"literal",value:"'TXT'"}],required:!0}}]},required:!0}},{key:"errorMessage",value:{name:"signature",type:"object",raw:`{
	/**
	 * Valid VTL Expression
	 */
	value: string;
	/**
	 * Variables used in the expression
	 */
	bindingDependencies?: string[];
	type: 'VTL' | 'VTL|MD' | 'TXT';
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Valid VTL Expression"},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:"Variables used in the expression"},{key:"type",value:{name:"union",raw:"'VTL' | 'VTL|MD' | 'TXT'",elements:[{name:"literal",value:"'VTL'"},{name:"literal",value:"'VTL|MD'"},{name:"literal",value:"'TXT'"}],required:!0}}]},required:!0}},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"type",value:{name:"union",raw:"'roundabout' | 'ROW' | 'simple'",elements:[{name:"literal",value:"'roundabout'"},{name:"literal",value:"'ROW'"},{name:"literal",value:"'simple'"}],required:!1}},{key:"iterations",value:{name:"signature",type:"object",raw:`{
	/**
	 * Valid VTL Expression
	 */
	value: string;
	/**
	 * Variables used in the expression
	 */
	bindingDependencies?: string[];
	type: 'VTL';
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Valid VTL Expression"},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:"Variables used in the expression"},{key:"type",value:{name:"literal",value:"'VTL'",required:!0}}]},required:!1}}]}},{name:"union",raw:"'id' | 'criticality' | 'typeOfControl'",elements:[{name:"literal",value:"'id'"},{name:"literal",value:"'criticality'"},{name:"literal",value:"'typeOfControl'"}]}],raw:`Pick<
	ControlDefinition,
	'id' | 'criticality' | 'typeOfControl'
>`},{name:"signature",type:"object",raw:`{
	errorMessage: ReactNode;
}`,signature:{properties:[{key:"errorMessage",value:{name:"ReactNode",required:!0}}]}}]}],raw:"LunaticError[]"},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{Pe as C,N as D,Be as a,Ge as d,Ve as f,$e as i,xe as u,P as v};
