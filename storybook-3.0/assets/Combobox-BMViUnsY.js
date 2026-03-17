import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{g as Re}from"./_commonjsHelpers-BosuxZz1.js";import{r as c,R as Ee}from"./index-xW6owYLq.js";var X={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var n={}.hasOwnProperty;function r(){for(var t="",s=0;s<arguments.length;s++){var l=arguments[s];l&&(t=o(t,i(l)))}return t}function i(t){if(typeof t=="string"||typeof t=="number")return t;if(typeof t!="object")return"";if(Array.isArray(t))return r.apply(null,t);if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]"))return t.toString();var s="";for(var l in t)n.call(t,l)&&t[l]&&(s=o(s,l));return s}function o(t,s){return s?t?t+" "+s:t+s:t}e.exports?(r.default=r,e.exports=r):window.classNames=r})()})(X);var we=X.exports;const d=Re(we),V={},Q=c.createContext(V),Se=({slots:e,children:n})=>e?a.jsx(Q.Provider,{value:e??V,children:n}):a.jsx(a.Fragment,{children:n});function g(e,n){const r=i=>{const o=c.useContext(Q)??V;if(o&&e in o){const t=o[e];return a.jsx(t,{...i})}return a.jsx(n,{...i})};return r.displayName=e,r}Se.__docgenInfo={description:"",methods:[],displayName:"SlotsProvider",props:{slots:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
	// Components
	Input: typeof CustomInput;
	InputNumber: typeof CustomInputNumber;
	Sequence: typeof Sequence;
	Switch: typeof CustomSwitch;
	Subsequence: typeof Subsequence;
	Textarea: typeof CustomTextarea;
	Datepicker: typeof CustomDatepicker;
	Duration: typeof CustomDuration;
	Question: typeof CustomQuestion;
	Loop: typeof CustomLoop;
	Dropdown: typeof CustomDropdown;
	Radio: typeof Radio;
	Suggester: typeof CustomSuggester;
	FilterDescription: typeof CustomFilterDescription;

	// Checkbox
	CheckboxBoolean: typeof CustomCheckboxBoolean;
	CheckboxGroup: typeof CustomCheckboxGroup;
	CheckboxOption: typeof CheckboxOption;
	RadioGroup: typeof RadioGroup;
	RadioOption: typeof RadioOption;

	// ComboBox
	Combobox: typeof Combobox;
	ComboboxContainer: typeof ComboboxContainer; // Top level wrapper
	ComboboxContentBox: typeof ComboboxContentBox; // Wrapper around the field
	ComboboxPanelContainer: typeof ComboboxPanelContainer; // ul element
	ComboboxOption: typeof ComboboxOption; // option (inside the li)
	ComboboxInput: typeof ComboboxInput; // option (inside the li)
	ComboboxClearButton: typeof ComboboxClearButton;
	ComboboxLabelSelection: typeof ComboboxLabelSelection;

	// Datepicker
	DatepickerFields: typeof CustomDatepickerFields;

	// Roundabout
	Roundabout: typeof CustomRoundabout;

	// Suggester
	SuggesterNotification: typeof SuggesterNotification;

	// Summary
	SummaryTitle: typeof SummaryTitle;
	SummaryResponses: typeof SummaryResponses;

	// Shared
	Button: typeof Button;
	Label: typeof Label;
	Declarations: typeof Declarations;
	Declaration: typeof Declaration;
	Tr: typeof Tr;
	Td: typeof Td;
	Th: typeof Th;
	Tbody: typeof Tbody;
	Table: typeof Table;
	Thead: typeof Thead;
	Fieldset: typeof Fieldset;
	Notification: typeof Notification;
	RouterLink: typeof RouterLink;
	ComponentWrapper: ComponentType<
		PropsWithChildren<LunaticComponentProps & { index: number }>
	>;
	MarkdownLink: typeof MarkdownLink;
	Accordion: typeof Accordion;
}`,signature:{properties:[{key:"Input",value:{name:"CustomInput",required:!0}},{key:"InputNumber",value:{name:"CustomInputNumber",required:!0}},{key:"Sequence",value:{name:"Sequence",required:!0}},{key:"Switch",value:{name:"CustomSwitch",required:!0}},{key:"Subsequence",value:{name:"Subsequence",required:!0}},{key:"Textarea",value:{name:"CustomTextarea",required:!0}},{key:"Datepicker",value:{name:"CustomDatepicker",required:!0}},{key:"Duration",value:{name:"CustomDuration",required:!0}},{key:"Question",value:{name:"CustomQuestion",required:!0}},{key:"Loop",value:{name:"CustomLoop",required:!0}},{key:"Dropdown",value:{name:"CustomDropdown",required:!0}},{key:"Radio",value:{name:"Radio",required:!0}},{key:"Suggester",value:{name:"CustomSuggester",required:!0}},{key:"FilterDescription",value:{name:"CustomFilterDescription",required:!0}},{key:"CheckboxBoolean",value:{name:"CustomCheckboxBoolean",required:!0}},{key:"CheckboxGroup",value:{name:"CustomCheckboxGroup",required:!0}},{key:"CheckboxOption",value:{name:"CheckboxOption",required:!0}},{key:"RadioGroup",value:{name:"RadioGroup",required:!0}},{key:"RadioOption",value:{name:"RadioOption",required:!0}},{key:"Combobox",value:{name:"Combobox",required:!0}},{key:"ComboboxContainer",value:{name:"ComboboxContainer",required:!0}},{key:"ComboboxContentBox",value:{name:"ComboboxContentBox",required:!0}},{key:"ComboboxPanelContainer",value:{name:"ComboboxPanelContainer",required:!0}},{key:"ComboboxOption",value:{name:"ComboboxOption",required:!0}},{key:"ComboboxInput",value:{name:"ComboboxInput",required:!0}},{key:"ComboboxClearButton",value:{name:"ComboboxClearButton",required:!0}},{key:"ComboboxLabelSelection",value:{name:"ComboboxLabelSelection",required:!0}},{key:"DatepickerFields",value:{name:"CustomDatepickerFields",required:!0}},{key:"Roundabout",value:{name:"CustomRoundabout",required:!0}},{key:"SuggesterNotification",value:{name:"SuggesterNotification",required:!0}},{key:"SummaryTitle",value:{name:"SummaryTitle",required:!0}},{key:"SummaryResponses",value:{name:"SummaryResponses",required:!0}},{key:"Button",value:{name:"Button",required:!0}},{key:"Label",value:{name:"Label",required:!0}},{key:"Declarations",value:{name:"Declarations",required:!0}},{key:"Declaration",value:{name:"Declaration",required:!0}},{key:"Tr",value:{name:"Tr",required:!0}},{key:"Td",value:{name:"Td",required:!0}},{key:"Th",value:{name:"Th",required:!0}},{key:"Tbody",value:{name:"Tbody",required:!0}},{key:"Table",value:{name:"Table",required:!0}},{key:"Thead",value:{name:"Thead",required:!0}},{key:"Fieldset",value:{name:"Fieldset",required:!0}},{key:"Notification",value:{name:"Notification",required:!0}},{key:"RouterLink",value:{name:"RouterLink",required:!0}},{key:"ComponentWrapper",value:{name:"ComponentType",elements:[{name:"PropsWithChildren",elements:[{name:"intersection",raw:"LunaticComponentProps & { index: number }",elements:[{name:"unknown"},{name:"signature",type:"object",raw:"{ index: number }",signature:{properties:[{key:"index",value:{name:"number",required:!0}}]}}]}],raw:"PropsWithChildren<LunaticComponentProps & { index: number }>"}],raw:`ComponentType<
	PropsWithChildren<LunaticComponentProps & { index: number }>
>`,required:!0}},{key:"MarkdownLink",value:{name:"MarkdownLink",required:!0}},{key:"Accordion",value:{name:"Accordion",required:!0}}]}}],raw:"Partial<LunaticSlotComponents>"},description:""}}};function Y({errors:e,componentId:n}){const r=Array.isArray(e)?e:Le(e,n);return r?a.jsx("div",{className:"lunatic-errors",children:r.map(({id:i,errorMessage:o})=>a.jsx("div",{className:"lunatic-error",children:o},`error-${i}`))}):null}function Le(e,n){if(!n||!e)return;const r=Object.entries(e).find(([i])=>n==null?void 0:n.trim().endsWith(i));if(Array.isArray(r)&&Array.isArray(r[1]))return r[1]}Y.__docgenInfo={description:"Display a list of error as simple red text",methods:[],displayName:"ComponentErrors"};const K=g("ComboboxContainer",({children:e,className:n,classNamePrefix:r,id:i,classStyle:o="default-style",errors:t})=>a.jsxs("div",{id:`${r??"lunatic"}-combo-box-container-${i}`,className:d(n,`${r??"lunatic"}-combo-box-container`,`${r??"lunatic"}-suggester-${o}`,"lunatic-suggester-default-style",o),children:[e,t&&a.jsx(Y,{errors:t})]}));K.__docgenInfo={description:"",methods:[],displayName:"ComboboxContainer",props:{classStyle:{defaultValue:{value:"'default-style'",computed:!1},required:!1}}};const v={ArrowUp:"ArrowUp",ArrowDown:"ArrowDown",Home:"Home",End:"End",Enter:"Enter",Escape:"Escape",Tab:"Tab"},z=g("ComboboxContentBox",({children:e,classNamePrefix:n,focused:r})=>a.jsx("div",{className:d(`${n??"lunatic"}-combo-box`,{focused:r}),children:e}));z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContentBox"};function Oe(e){const n=c.useRef(e);return n.current=e,n}function De(e,n,r){const i=Oe(n),o=c.useCallback(t=>{i.current(t)},[i]);c.useEffect(()=>(document.addEventListener(e,o,r),()=>{document.removeEventListener(e,o,r)}),[e,r,o])}function Z({children:e,focused:n,onFocus:r,onBlur:i,onKeyDown:o,classNamePrefix:t}){const s=c.useRef(null),l=c.useCallback(m=>{var u;!((u=s.current)!=null&&u.contains(m.target))&&i&&i()},[s,i]);De("mousedown",l);const p=c.useCallback(function(m){var b;const{key:u}=m;switch(u){case v.Escape:case v.Enter:case v.Tab:(b=s.current)==null||b.focus();break}o(u)},[o]);return a.jsx(z,{classNamePrefix:t,focused:n,children:a.jsx("div",{className:d(`${t??"lunatic"}-combo-box-content`,{focused:n}),ref:s,tabIndex:0,onFocus:r,onClick:r,onKeyDown:p,children:e})})}Z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContent"};function U(e){const{top:n}=e;return n}function $(e){const{top:n,height:r}=e;return n+r}function je(e,n){const r=Math.min(U(e),U(n));return Math.max($(e),$(n))-r<e.height+n.height}function J({children:e,index:n,selected:r,onSelect:i}){const o=c.useRef(null),t=c.useCallback(s=>{s.stopPropagation(),s.preventDefault(),i(n)},[i,n]);return c.useEffect(()=>{const{current:s}=o;if(s&&r&&s.parentNode){const l=s.getBoundingClientRect(),p=s.parentNode.getBoundingClientRect();je(l,p)||s.scrollIntoView()}},[o,r]),a.jsx("li",{className:d("lunatic-combo-box-option-container",{selected:r}),role:"option","aria-selected":r,onClick:t,ref:o,children:e})}J.__docgenInfo={description:"",methods:[],displayName:"ComboboxOptionContainer"};const N=g("ComboboxPanelContainer",({children:e,focused:n,expanded:r,id:i})=>a.jsx("ul",{id:`lunatic-combo-box-panel-${i}`,"aria-label":"suggestions",className:d("lunatic-combo-box-panel",{focused:n,expanded:r}),role:"listbox",children:e}));N.__docgenInfo={description:"",methods:[],displayName:"ComboboxPanelContainer"};function D(e,n){return Object.entries(n).reduce((r,[i,o])=>({...r,[i]:o[e]}),{})}const _=["en","fr"],ee=()=>{if(typeof navigator>"u"||!navigator.language)return"fr";const e=navigator.language.split("-")[0],n=_.map(r=>r.toString()).indexOf(e);return n===-1?_[0]:_[n]},ne={DEFAULT_BUTTON_ADD:{fr:"Ajouter une ligne",en:"Add row"},DEFAULT_BUTTON_REMOVE:{fr:"Supprimer une ligne",en:"Remove row"},MODAL_IGNORE:{fr:"Poursuivre",en:"Ignore"},MODAL_CORRECT:{fr:"Corriger ma réponse",en:"Correct"},DK:{fr:"Ne sais pas",en:"Don't know"},RF:{fr:"Refus",en:"Refused"},PLACEHOLDER:{fr:"Sélectionnez une modalité",en:"Select a modality"},SUGGESTER_PLACEHOLDER:{fr:"Commencez votre saisie...",en:"Start typing..."},SUGGESTER_LOADING:{fr:"Liste en cours de chargement",en:"List is loading"},SUGGESTER_NO_RESULT:{fr:"Aucun résultat trouvé",en:"No results"},SUGGESTER_ERROR:{fr:"Erreur lors du chargement de la liste",en:"An error has occured while loading the list"},SUGGESTER_ARBITRARY:{fr:"Choisir",en:"Select"}},F={thousandSeparator:{fr:" ",en:","},decimalSeparator:{fr:",",en:"."}},Ae=Object.values(F.decimalSeparator),Ie=D("fr",ne),_e=D("en",ne),Ve=D("fr",F),Fe=D("en",F),en={...ee()==="fr"?Ve:Fe,allDecimalSeparators:Ae},x=ee()==="fr"?Ie:_e,re=g("ComboboxOption",({option:e,shouldDisplayOptionId:n=!0,selected:r})=>{const{id:i,value:o,label:t}=e;return o==="OTHER"?a.jsx("div",{className:d("lunatic-combo-box-option",{selected:r}),children:a.jsx("span",{className:"label",children:`${x.SUGGESTER_NO_RESULT} : ${x.SUGGESTER_ARBITRARY} "${t}"`})}):t?a.jsxs("div",{className:d("lunatic-combo-box-option",{selected:r}),children:[n&&a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"id",children:i||o}),a.jsx("span",{children:" - "})]}),a.jsx("span",{className:"label",children:t})]}):a.jsx("div",{className:d("lunatic-combo-box-option",{selected:r}),children:a.jsx("span",{className:"id",children:i||o})})});re.__docgenInfo={description:"",methods:[],displayName:"ComboboxOption",props:{option:{required:!0,tsType:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},description:""},shouldDisplayOptionId:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},selected:{required:!1,tsType:{name:"boolean"},description:""}}};function te({optionRenderer:e,options:n=[],shouldDisplayOptionsId:r,focused:i,selectedIndex:o,expanded:t,id:s,search:l,onSelect:p,isLoading:m}){const u=t?n:[],b=e??re;return u.length===0&&!l?null:m?a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:x.SUGGESTER_LOADING})})}):l&&u.length===0?a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:x.SUGGESTER_NO_RESULT})})}):u.length===0?a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:x.SUGGESTER_NO_RESULT})})}):a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:u.map((f,y)=>a.jsx(J,{index:y.toString(),selected:o===y,onSelect:p,children:a.jsx(b,{option:f,shouldDisplayOptionId:r,selected:o===y,search:l})},f.id??f.value))})}te.__docgenInfo={description:"Floating menu containing selectable options",methods:[],displayName:"ComboboxPanel",props:{options:{defaultValue:{value:"[]",computed:!1},required:!1}}};function ae({className:e,children:n}){return a.jsx("i",{className:d("lunatic-icon",e),children:n})}ae.__docgenInfo={description:"",methods:[],displayName:"LunaticIcon",props:{className:{required:!1,tsType:{name:"string"},description:""}}};function oe({className:e,width:n=32,height:r=32}){return a.jsx(ae,{className:e,children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:r,x:"0",y:"0",enableBackground:"new 0 0 32 32",version:"1.1",viewBox:"0 0 32 32",xmlSpace:"preserve",children:a.jsx("path",{d:"M 7.097006,7.0709627 C 6.4710386,7.6950801 6.0348033,8.5167883 6,9.3333333 l 6.666666,6.6666677 -6.6666655,6.666666 C 6.0406655,24.255963 7.7002437,25.930395 9.3333333,26 L 15.999999,19.333334 22.666665,26 C 24.255962,25.95934 25.930393,24.299755 26,22.666667 L 19.333332,16.000001 26,9.3333334 C 25.959335,7.7440359 24.299754,6.069605 22.666665,6 L 15.999999,12.666666 9.3333333,6 C 8.5386853,6.020332 7.7229758,6.4468492 7.097006,7.0709627 Z"})})})}oe.__docgenInfo={description:"",methods:[],displayName:"CrossIcon",props:{className:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}}}};const W=()=>{};function nn(e,n){let r;return[(...t)=>new Promise((s,l)=>{r&&clearTimeout(r),r=window.setTimeout(async()=>{try{s(await e(...t))}catch(p){l(p)}},n)}),()=>clearTimeout(r)]}function ie({className:e,children:n,tabIndex:r,title:i="Fab",onClick:o=W,onKeyDown:t=W,disabled:s}){return a.jsx("button",{className:d("lunatic-fab",e),tabIndex:r,title:i,onClick:o,onKeyDown:t,disabled:s,"aria-label":i,children:n})}ie.__docgenInfo={description:"",methods:[],displayName:"IconButton",props:{title:{defaultValue:{value:"'Fab'",computed:!1},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},required:!1},onKeyDown:{defaultValue:{value:"() => {}",computed:!1},required:!1}}};function Me(e){return!e||e.trim().length===0}function Be(e){if(typeof e=="function")return n=>{n.key==="Enter"&&e()}}function se({className:e,search:n,onClick:r,editable:i}){const o=c.useMemo(()=>Be(r),[r]);return i?a.jsx(ie,{className:d("mini","lunatic-combo-box-fab",e),title:"delete",onClick:r,disabled:Me(n),onKeyDown:o,children:a.jsx(oe,{className:"lunatic-combo-box-icon"})}):null}const Pe=g("ComboboxClearButton",se);se.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxClearButton",props:{className:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:""}}};function Ge(e,n,r){if(e){const{id:i,value:o,label:t}=e;return t?`${i||o} - ${t}`:i||o}return n&&n.trim().length?n:r??""}const le=({option:e,placeholder:n,search:r,disabled:i=!1,readOnly:o=!1})=>{const t=!e&&(!r||r.length===0);return(e==null?void 0:e.value)==="OTHER"?a.jsx("div",{className:d("lunatic-combo-box-selected",{disabled:i,readOnly:o}),children:a.jsx("span",{className:"selection",children:e.label})}):a.jsx("div",{className:d("lunatic-combo-box-selected",{disabled:i,readOnly:o}),children:a.jsx("span",{className:d({placeholder:t,selection:!t}),children:Ge(e,r,n)})})},Ue=g("ComboboxLabelSelection",le);le.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBoxLabelSelection",props:{option:{required:!1,tsType:{name:"union",raw:"ComboboxOptionType | null",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};function ue({placeholder:e,disabled:n,onChange:r,value:i,id:o,labelledBy:t,focused:s,className:l,invalid:p}){const m=c.useRef(null);c.useEffect(()=>{m.current&&s&&m.current.focus()},[m,s]);const u=b=>{const{key:f}=b;(f==="ArrowUp"||f==="ArrowDown")&&b.preventDefault()};return a.jsx("input",{ref:m,id:o,className:d("lunatic-combo-box-input",l),type:"text",onChange:r,value:i,"aria-invalid":p,title:"combo-box",autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",spellCheck:"false",placeholder:e,disabled:n,"aria-labelledby":t,onKeyDown:u})}const $e=g("ComboboxInput",ue);ue.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxInput",props:{placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},labelledBy:{required:!1,tsType:{name:"string"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""}}};function de({labelRenderer:e,placeholder:n,search:r,expanded:i,disabled:o,readOnly:t,focused:s,onChange:l,selectedIndex:p,options:m,editable:u,labelId:b,id:f,classNamePrefix:y,invalid:j}){const k=!u||!i,R=p!==void 0?m[p]:void 0,E=e??Ue;return a.jsx("div",{id:f,className:d(`${y??"lunatic"}-combo-box-selection`,{focused:s,disabled:o}),role:"combobox","aria-controls":"todo","aria-haspopup":"listbox","aria-expanded":i,"aria-autocomplete":"list","aria-owns":f,"aria-labelledby":b,children:k?a.jsx(E,{option:R,placeholder:n,search:r,disabled:o,readOnly:t}):a.jsx($e,{invalid:j,id:`combobox-input-${f}`,className:"lunatic-combo-box-input",onChange:w=>l==null?void 0:l(w.target.value??w.target.innerText),value:r,placeholder:n,disabled:o,readOnly:t,focused:s,labelledBy:b})})}de.__docgenInfo={description:`Label displayed when a value is selected in the ComboBox
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"Array<ComboboxOptionType>"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};function We(e){if(typeof e=="string"){const n=Number.parseInt(e,10);if(Number.isNaN(n))throw new TypeError(`Cannot cast ${e} to int`);return n}if(typeof e=="number")return e;throw new TypeError(`Cannot cast ${typeof e} to int`)}function He(e,n,r){return e<n?n:e>r?r:e}function rn(e){return typeof e=="number"&&Number.isFinite(e)}function ce({value:e,className:n}){return typeof e=="string"&&e.length>0||Ee.isValidElement(e)?a.jsx("span",{className:d("label-description",n),children:e}):null}ce.__docgenInfo={description:"",methods:[],displayName:"LabelDescription",props:{value:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function pe({children:e,id:n,htmlFor:r,className:i,style:o,description:t}){return!e&&!t?null:a.jsxs("label",{htmlFor:r,id:n,className:d("lunatic-label",i),style:o,children:[e,a.jsx(ce,{value:t})]})}const Xe=g("Label",pe);pe.__docgenInfo={description:"Label displayed on top of a field",methods:[],displayName:"LunaticLabel"};const me=g("Declaration",({children:e,declarationType:n})=>a.jsx("div",{"data-testid":"declaration",className:d("declaration-lunatic",`declaration-${n.toLowerCase()}`),children:e}));function be({id:e,type:n="AFTER_QUESTION_TEXT",declarations:r}){const i=(r==null?void 0:r.filter(o=>o.position===n&&o.label))??[];return i.length===0?null:a.jsx("div",{id:`declarations-${e}-${n}`,className:"declarations-lunatic",children:i.map(({id:o,label:t,declarationType:s})=>a.jsx(me,{declarationType:s,children:t},o))})}const Qe=g("Declarations",be);me.__docgenInfo={description:"",methods:[],displayName:"Declaration"};be.__docgenInfo={description:"",methods:[],displayName:"LunaticDeclarations",props:{id:{required:!1,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:"'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE'",elements:[{name:"literal",value:"'AFTER_QUESTION_TEXT'"},{name:"literal",value:"'BEFORE_QUESTION_TEXT'"},{name:"literal",value:"'DETACHABLE'"}]},description:"",defaultValue:{value:"'AFTER_QUESTION_TEXT'",computed:!1}},declarations:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}[]`},description:""}}};const H="";function fe({className:e,classNamePrefix:n,classStyle:r="default-style",placeholder:i=x.PLACEHOLDER,editable:o=!1,disabled:t,readOnly:s,id:l,optionRenderer:p,labelRenderer:m,onChange:u,onSelect:b,value:f,options:y,shouldDisplayOptionsId:j=!0,messageError:k,search:R=H,getOptionValue:E=Ke,label:w,description:ye,declarations:ge,errors:M,onBlur:T,onFocus:A,isLoading:ve}){const[B,C]=c.useState(!1),[S,P]=c.useState(!1),L=Ye(y,f,E),G=`label-${l}`,Te=()=>{t||s||(A==null||A(),C(!0),P(!0))},Ce=()=>{t||s||(C(!1),P(!1),T==null||T())},q=(h,O=!0)=>{const I=He(We(h),0,y.length),ke=y[I];O&&(C(!1),T==null||T()),b(E(ke))},xe=h=>{u==null||u(h)},qe=()=>{C(!1),u==null||u(H),b(null)},he=h=>{const O=y.length;switch(h){case v.Tab:case v.Escape:C(!1);return;case v.ArrowDown:q((L??-1)+1,!1);return;case v.ArrowUp:q((L??O)-1,!1);return;case v.Home:q(0,!1);return;case v.End:q(O-1,!1);return;case v.Enter:C(I=>!I);return}},Ne=!t||!s;return k?a.jsx("div",{className:"lunatic-combo-box-message-error",children:k}):a.jsxs(K,{id:l,className:e,classStyle:r,classNamePrefix:n,errors:M,children:[a.jsx(Xe,{htmlFor:l,id:G,description:ye,children:w}),a.jsx(Qe,{type:"AFTER_QUESTION_TEXT",declarations:ge}),a.jsxs(Z,{focused:S,onFocus:Te,onBlur:Ce,onKeyDown:he,classNamePrefix:n,children:[a.jsx(de,{labelRenderer:m,placeholder:i,search:R,expanded:B,id:l,labelId:G,disabled:t,readOnly:s,focused:S,editable:o,selectedIndex:L,options:y,onChange:xe,classNamePrefix:n,invalid:!!M}),a.jsx(te,{isLoading:ve,optionRenderer:p,options:y,shouldDisplayOptionsId:j,focused:S,selectedIndex:L,expanded:B,id:l,search:R,onSelect:q})]}),Ne&&a.jsx(Pe,{className:d({focused:S}),search:f,onClick:qe,editable:o})]})}function Ye(e,n,r){if(Array.isArray(e))return e.map(r).indexOf(n??"")}function Ke(e){return(e==null?void 0:e.id)||(e==null?void 0:e.value)||""}const tn=g("Combobox",fe);fe.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBox",props:{expanded:{required:!1,tsType:{name:"boolean"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},labelId:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""},classNamePrefix:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},labelRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:"@deprecated use createCustomizableField with ComboboxLabelRenderer as name."},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"D.PLACEHOLDER",computed:!0}},selectedIndex:{required:!1,tsType:{name:"union",raw:"number | string | null",elements:[{name:"number"},{name:"string"},{name:"null"}]},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:"@deprecated use createCustomizableField with ComboboxOptionRenderer as name."},shouldDisplayOptionsId:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},classStyle:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'default-style'",computed:!1}},value:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},messageError:{required:!1,tsType:{name:"string"},description:""},getOptionValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(o: ComboboxOptionType) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},name:"o"}],return:{name:"string"}}},description:"",defaultValue:{value:`function getDefaultOptionValue(option?: ComboboxOptionType) {
	return option?.id || option?.value || '';
}`,computed:!1}},label:{required:!1,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},declarations:{required:!1,tsType:{name:"Array",raw:"LunaticBaseProps['declarations']"},description:""},errors:{required:!1,tsType:{name:"Array",elements:[{name:"intersection",raw:`Pick<
	ControlDefinition,
	'id' | 'criticality' | 'typeOfControl'
> & {
	errorMessage: ReactNode;
}`,elements:[{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
	id: string;
	criticality: 'INFO' | 'WARN' | 'ERROR';
	typeOfControl?: 'FORMAT' | 'CONSISTENCY' | 'MANDATORY';
	control: VTLExpression;
	errorMessage: VTLExpression;
	bindingDependencies?: string[];
	type?: 'roundabout' | 'ROW' | 'simple';
	iterations?: VTLScalarExpression;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"criticality",value:{name:"union",raw:"'INFO' | 'WARN' | 'ERROR'",elements:[{name:"literal",value:"'INFO'"},{name:"literal",value:"'WARN'"},{name:"literal",value:"'ERROR'"}],required:!0}},{key:"typeOfControl",value:{name:"union",raw:"'FORMAT' | 'CONSISTENCY' | 'MANDATORY'",elements:[{name:"literal",value:"'FORMAT'"},{name:"literal",value:"'CONSISTENCY'"},{name:"literal",value:"'MANDATORY'"}],required:!1}},{key:"control",value:{name:"signature",type:"object",raw:`{
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
	shapeFrom?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Valid VTL Expression"},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:"Variables used in the expression"},{key:"type",value:{name:"literal",value:"'VTL'",required:!0}},{key:"shapeFrom",value:{name:"string",required:!1}}]},required:!1}}]}},{name:"union",raw:"'id' | 'criticality' | 'typeOfControl'",elements:[{name:"literal",value:"'id'"},{name:"literal",value:"'criticality'"},{name:"literal",value:"'typeOfControl'"}]}],raw:`Pick<
	ControlDefinition,
	'id' | 'criticality' | 'typeOfControl'
>`},{name:"signature",type:"object",raw:`{
	errorMessage: ReactNode;
}`,signature:{properties:[{key:"errorMessage",value:{name:"ReactNode",required:!0}}]}}]}],raw:"LunaticError[]"},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{tn as C,Qe as D,ce as L,Se as S,Xe as a,Y as b,d as c,x as d,rn as e,We as f,Le as g,nn as h,en as i,g as s,Oe as u,W as v};
