import{j as o}from"./jsx-runtime-BlAj40OV.js";import{g as ke}from"./_commonjsHelpers-BosuxZz1.js";import{r as p,R as Re}from"./index-Cs7sjTYM.js";var X={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var n={}.hasOwnProperty;function r(){for(var a="",s=0;s<arguments.length;s++){var l=arguments[s];l&&(a=t(a,i(l)))}return a}function i(a){if(typeof a=="string"||typeof a=="number")return a;if(typeof a!="object")return"";if(Array.isArray(a))return r.apply(null,a);if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]"))return a.toString();var s="";for(var l in a)n.call(a,l)&&a[l]&&(s=t(s,l));return s}function t(a,s){return s?a?a+" "+s:a+s:a}e.exports?(r.default=r,e.exports=r):window.classNames=r})()})(X);var we=X.exports;const u=ke(we),V={},Q=p.createContext(V),Ee=({slots:e,children:n})=>e?o.jsx(Q.Provider,{value:e??V,children:n}):o.jsx(o.Fragment,{children:n});function f(e,n){const r=i=>{const t=p.useContext(Q)??V;if(t&&e in t){const a=t[e];return o.jsx(a,{...i})}return o.jsx(n,{...i})};return r.displayName=e,r}Ee.__docgenInfo={description:"",methods:[],displayName:"SlotsProvider",props:{slots:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
>`,required:!0}},{key:"MarkdownLink",value:{name:"MarkdownLink",required:!0}},{key:"Accordion",value:{name:"Accordion",required:!0}}]}}],raw:"Partial<LunaticSlotComponents>"},description:""}}};function Y({errors:e,componentId:n}){const r=Array.isArray(e)?e:Se(e,n);return r?o.jsx("div",{className:"lunatic-errors",children:r.map(({id:i,errorMessage:t})=>o.jsx("div",{className:"lunatic-error",children:t},`error-${i}`))}):null}function Se(e,n){if(!n||!e)return;const r=Object.entries(e).find(([i])=>n==null?void 0:n.trim().endsWith(i));if(Array.isArray(r)&&Array.isArray(r[1]))return r[1]}Y.__docgenInfo={description:"Display a list of error as simple red text",methods:[],displayName:"ComponentErrors"};const K=f("ComboboxContainer",({children:e,className:n,classNamePrefix:r,id:i,classStyle:t="default-style",errors:a})=>o.jsxs("div",{id:`${r??"lunatic"}-combo-box-container-${i}`,className:u(n,`${r??"lunatic"}-combo-box-container`,`${r??"lunatic"}-suggester-${t}`,"lunatic-suggester-default-style",t),children:[e,a&&o.jsx(Y,{errors:a})]}));K.__docgenInfo={description:"",methods:[],displayName:"ComboboxContainer",props:{classStyle:{defaultValue:{value:"'default-style'",computed:!1},required:!1}}};const g={ArrowUp:"ArrowUp",ArrowDown:"ArrowDown",Home:"Home",End:"End",Enter:"Enter",Escape:"Escape",Tab:"Tab"},z=f("ComboboxContentBox",({children:e,classNamePrefix:n,focused:r})=>o.jsx("div",{className:u(`${n??"lunatic"}-combo-box`,{focused:r}),children:e}));z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContentBox"};function Le(e){const n=p.useRef(e);return n.current=e,n}function Oe(e,n,r){const i=Le(n),t=p.useCallback(a=>{i.current(a)},[i]);p.useEffect(()=>(document.addEventListener(e,t,r),()=>{document.removeEventListener(e,t,r)}),[e,r,t])}function Z({children:e,focused:n,onFocus:r,onBlur:i,onKeyDown:t,classNamePrefix:a}){const s=p.useRef(null),l=p.useCallback(c=>{var d;!((d=s.current)!=null&&d.contains(c.target))&&i&&i()},[s,i]);Oe("mousedown",l);const b=p.useCallback(function(c){var m;const{key:d}=c;switch(d){case g.Escape:case g.Enter:case g.Tab:(m=s.current)==null||m.focus();break}t(d)},[t]);return o.jsx(z,{classNamePrefix:a,focused:n,children:o.jsx("div",{className:u(`${a??"lunatic"}-combo-box-content`,{focused:n}),ref:s,tabIndex:0,onFocus:r,onClick:r,onKeyDown:b,children:e})})}Z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContent"};function U(e){const{top:n}=e;return n}function $(e){const{top:n,height:r}=e;return n+r}function De(e,n){const r=Math.min(U(e),U(n));return Math.max($(e),$(n))-r<e.height+n.height}function J({children:e,index:n,selected:r,onSelect:i}){const t=p.useRef(null),a=p.useCallback(s=>{s.stopPropagation(),s.preventDefault(),i(n)},[i,n]);return p.useEffect(()=>{const{current:s}=t;if(s&&r&&s.parentNode){const l=s.getBoundingClientRect(),b=s.parentNode.getBoundingClientRect();De(l,b)||s.scrollIntoView()}},[t,r]),o.jsx("li",{className:u("lunatic-combo-box-option-container",{selected:r}),role:"option","aria-selected":r,onClick:a,ref:t,children:e})}J.__docgenInfo={description:"",methods:[],displayName:"ComboboxOptionContainer"};const h=f("ComboboxPanelContainer",({children:e,focused:n,expanded:r,id:i})=>o.jsx("ul",{id:`lunatic-combo-box-panel-${i}`,"aria-label":"suggestions",className:u("lunatic-combo-box-panel",{focused:n,expanded:r}),role:"listbox",children:e}));h.__docgenInfo={description:"",methods:[],displayName:"ComboboxPanelContainer"};function D(e,n){return Object.entries(n).reduce((r,[i,t])=>({...r,[i]:t[e]}),{})}const _=["en","fr"],ee=()=>{if(typeof navigator>"u"||!navigator.language)return"fr";const e=navigator.language.split("-")[0],n=_.map(r=>r.toString()).indexOf(e);return n===-1?_[0]:_[n]},ne={DEFAULT_BUTTON_ADD:{fr:"Ajouter une ligne",en:"Add row"},DEFAULT_BUTTON_REMOVE:{fr:"Supprimer une ligne",en:"Remove row"},MODAL_IGNORE:{fr:"Poursuivre",en:"Ignore"},MODAL_CORRECT:{fr:"Corriger ma réponse",en:"Correct"},DK:{fr:"Ne sais pas",en:"Don't know"},RF:{fr:"Refus",en:"Refused"},PLACEHOLDER:{fr:"Commencez votre saisie...",en:"Start typing..."},SUGGESTER_LOADING:{fr:"Liste en cours de chargement",en:"List is loading"},SUGGESTER_NO_RESULT:{fr:"Aucun résultat trouvé",en:"No results"},SUGGESTER_ERROR:{fr:"Erreur lors du chargement de la liste",en:"An error has occured while loading the list"},SUGGESTER_ARBITRARY:{fr:"Choisir",en:"Select"}},F={thousandSeparator:{fr:" ",en:","},decimalSeparator:{fr:",",en:"."}},je=Object.values(F.decimalSeparator),Ae=D("fr",ne),Ie=D("en",ne),_e=D("fr",F),Ve=D("en",F),Je={...ee()==="fr"?_e:Ve,allDecimalSeparators:je},N=ee()==="fr"?Ae:Ie,re=f("ComboboxOption",({option:e,selected:n})=>{const{id:r,value:i,label:t}=e;return i==="OTHER"?o.jsx("div",{className:u("lunatic-combo-box-option",{selected:n}),children:o.jsx("span",{className:"label",children:`${N.SUGGESTER_NO_RESULT} : ${N.SUGGESTER_ARBITRARY} "${t}"`})}):t&&typeof t=="string"&&t.length?o.jsxs("div",{className:u("lunatic-combo-box-option",{selected:n}),children:[o.jsx("span",{className:"id",children:r||i}),o.jsx("span",{children:" - "}),o.jsx("span",{className:"label",children:t})]}):o.jsx("div",{className:u("lunatic-combo-box-option",{selected:n}),children:o.jsx("span",{className:"id",children:r})})});re.__docgenInfo={description:"",methods:[],displayName:"ComboboxOption",props:{option:{required:!0,tsType:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},description:""},selected:{required:!1,tsType:{name:"boolean"},description:""}}};function te({optionRenderer:e,options:n=[],focused:r,selectedIndex:i,expanded:t,id:a,search:s,onSelect:l,isLoading:b}){const c=t?n:[],d=e??re;return c.length===0&&!s?null:b?o.jsx(h,{expanded:t,focused:r,id:`${a}-list`,children:o.jsx("div",{className:"lunatic-combo-box-option",children:o.jsx("span",{className:"label",children:N.SUGGESTER_LOADING})})}):s&&c.length===0?o.jsx(h,{expanded:t,focused:r,id:`${a}-list`,children:o.jsx("div",{className:"lunatic-combo-box-option",children:o.jsx("span",{className:"label",children:N.SUGGESTER_NO_RESULT})})}):c.length===0?o.jsx(h,{expanded:t,focused:r,id:`${a}-list`,children:o.jsx("div",{className:"lunatic-combo-box-option",children:o.jsx("span",{className:"label",children:N.SUGGESTER_NO_RESULT})})}):o.jsx(h,{expanded:t,focused:r,id:`${a}-list`,children:c.map((m,y)=>o.jsx(J,{index:y.toString(),selected:i===y,onSelect:l,children:o.jsx(d,{option:m,selected:i===y,search:s})},m.id??m.value))})}te.__docgenInfo={description:"Floating menu containing selectable options",methods:[],displayName:"ComboboxPanel",props:{optionRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"Array<ComboboxOptionType>"},description:"",defaultValue:{value:"[]",computed:!1}},focused:{required:!1,tsType:{name:"boolean"},description:""},selectedIndex:{required:!1,tsType:{name:"union",raw:"number | string | null",elements:[{name:"number"},{name:"string"},{name:"null"}]},description:""},expanded:{required:!1,tsType:{name:"boolean"},description:""},id:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};function ae({className:e,children:n}){return o.jsx("i",{className:u("lunatic-icon",e),children:n})}ae.__docgenInfo={description:"",methods:[],displayName:"LunaticIcon",props:{className:{required:!1,tsType:{name:"string"},description:""}}};function oe({className:e,width:n=32,height:r=32}){return o.jsx(ae,{className:e,children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:r,x:"0",y:"0",enableBackground:"new 0 0 32 32",version:"1.1",viewBox:"0 0 32 32",xmlSpace:"preserve",children:o.jsx("path",{d:"M 7.097006,7.0709627 C 6.4710386,7.6950801 6.0348033,8.5167883 6,9.3333333 l 6.666666,6.6666677 -6.6666655,6.666666 C 6.0406655,24.255963 7.7002437,25.930395 9.3333333,26 L 15.999999,19.333334 22.666665,26 C 24.255962,25.95934 25.930393,24.299755 26,22.666667 L 19.333332,16.000001 26,9.3333334 C 25.959335,7.7440359 24.299754,6.069605 22.666665,6 L 15.999999,12.666666 9.3333333,6 C 8.5386853,6.020332 7.7229758,6.4468492 7.097006,7.0709627 Z"})})})}oe.__docgenInfo={description:"",methods:[],displayName:"CrossIcon",props:{className:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}}}};const W=()=>{};function en(e,n){let r;return[(...a)=>new Promise((s,l)=>{r&&clearTimeout(r),r=window.setTimeout(async()=>{try{s(await e(...a))}catch(b){l(b)}},n)}),()=>clearTimeout(r)]}function ie({className:e,children:n,tabIndex:r,title:i="Fab",onClick:t=W,onKeyDown:a=W,disabled:s}){return o.jsx("button",{className:u("lunatic-fab",e),tabIndex:r,title:i,onClick:t,onKeyDown:a,disabled:s,"aria-label":i,children:n})}ie.__docgenInfo={description:"",methods:[],displayName:"IconButton",props:{title:{defaultValue:{value:"'Fab'",computed:!1},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},required:!1},onKeyDown:{defaultValue:{value:"() => {}",computed:!1},required:!1}}};function Fe(e){return!e||e.trim().length===0}function Me(e){if(typeof e=="function")return n=>{n.key==="Enter"&&e()}}function se({className:e,search:n,onClick:r,editable:i}){const t=p.useMemo(()=>Me(r),[r]);return i?o.jsx(ie,{className:u("mini","lunatic-combo-box-fab",e),title:"delete",onClick:r,disabled:Fe(n),onKeyDown:t,children:o.jsx(oe,{className:"lunatic-combo-box-icon"})}):null}const Be=f("ComboboxClearButton",se);se.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxClearButton",props:{className:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:""}}};function Pe(e,n,r){if(e){const{id:i,value:t,label:a}=e;return a?`${i||t} - ${a}`:i||t}return n&&n.trim().length?n:r??""}const le=({option:e,placeholder:n,search:r,disabled:i=!1,readOnly:t=!1})=>{const a=!e&&(!r||r.length===0);return(e==null?void 0:e.value)==="OTHER"?o.jsx("div",{className:u("lunatic-combo-box-selected",{disabled:i,readOnly:t}),children:o.jsx("span",{className:"selection",children:e.label})}):o.jsx("div",{className:u("lunatic-combo-box-selected",{disabled:i,readOnly:t}),children:o.jsx("span",{className:u({placeholder:a,selection:!a}),children:Pe(e,r,n)})})},Ge=f("ComboboxLabelSelection",le);le.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBoxLabelSelection",props:{option:{required:!1,tsType:{name:"union",raw:"ComboboxOptionType | null",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};function ue({placeholder:e,disabled:n,onChange:r,value:i,id:t,labelledBy:a,focused:s,className:l,invalid:b}){const c=p.useRef(null);p.useEffect(()=>{c.current&&s&&c.current.focus()},[c,s]);const d=m=>{const{key:y}=m;(y==="ArrowUp"||y==="ArrowDown")&&m.preventDefault()};return o.jsx("input",{ref:c,id:t,className:u("lunatic-combo-box-input",l),type:"text",onChange:r,value:i,"aria-invalid":b,title:"combo-box",autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",spellCheck:"false",placeholder:e,disabled:n,"aria-labelledby":a,onKeyDown:d})}const Ue=f("ComboboxInput",ue);ue.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxInput",props:{placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},labelledBy:{required:!1,tsType:{name:"string"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""}}};function de({labelRenderer:e,placeholder:n,search:r,expanded:i,disabled:t,readOnly:a,focused:s,onChange:l,selectedIndex:b,options:c,editable:d,labelId:m,id:y,classNamePrefix:v,invalid:k}){const R=!d||!i,w=b!==void 0?c[b]:void 0,j=e??Ge;return o.jsx("div",{id:y,className:u(`${v??"lunatic"}-combo-box-selection`,{focused:s,disabled:t}),role:"combobox","aria-controls":"todo","aria-haspopup":"listbox","aria-expanded":i,"aria-autocomplete":"list","aria-owns":y,"aria-labelledby":m,children:R?o.jsx(j,{option:w,placeholder:n,search:r,disabled:t,readOnly:a}):o.jsx(Ue,{invalid:k,id:`combobox-input-${y}`,className:"lunatic-combo-box-input",onChange:E=>l==null?void 0:l(E.target.value??E.target.innerText),value:r,placeholder:n,disabled:t,readOnly:a,focused:s,labelledBy:m})})}de.__docgenInfo={description:`Label displayed when a value is selected in the ComboBox
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"Array<ComboboxOptionType>"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};function $e(e){if(typeof e=="string"){const n=parseInt(e,10);if(Number.isNaN(n))throw new Error(`Cannot cast ${e} to int`);return n}if(typeof e=="number")return e;throw new Error(`Cannot cast ${typeof e} to int`)}function We(e,n,r){return e<n?n:e>r?r:e}function nn(e){return typeof e=="number"&&Number.isFinite(e)}function ce({value:e,className:n}){return typeof e=="string"&&e.length>0||Re.isValidElement(e)?o.jsx("span",{className:u("label-description",n),children:e}):null}ce.__docgenInfo={description:"",methods:[],displayName:"LabelDescription",props:{value:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function pe({children:e,id:n,htmlFor:r,className:i,style:t,description:a}){return!e&&!a?null:o.jsxs("label",{htmlFor:r,id:n,className:u("lunatic-label",i),style:t,children:[e,o.jsx(ce,{value:a})]})}const He=f("Label",pe);pe.__docgenInfo={description:"Label displayed on top of a field",methods:[],displayName:"LunaticLabel"};const me=f("Declaration",({children:e,declarationType:n})=>o.jsx("div",{"data-testid":"declaration",className:u("declaration-lunatic",`declaration-${n.toLowerCase()}`),children:e}));function be({id:e,type:n="AFTER_QUESTION_TEXT",declarations:r}){const i=(r==null?void 0:r.filter(t=>t.position===n&&t.label))??[];return i.length===0?null:o.jsx("div",{id:`declarations-${e}-${n}`,className:"declarations-lunatic",children:i.map(({id:t,label:a,declarationType:s})=>o.jsx(me,{declarationType:s,children:a},t))})}const Xe=f("Declarations",be);me.__docgenInfo={description:"",methods:[],displayName:"Declaration"};be.__docgenInfo={description:"",methods:[],displayName:"LunaticDeclarations",props:{id:{required:!1,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:"'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE'",elements:[{name:"literal",value:"'AFTER_QUESTION_TEXT'"},{name:"literal",value:"'BEFORE_QUESTION_TEXT'"},{name:"literal",value:"'DETACHABLE'"}]},description:"",defaultValue:{value:"'AFTER_QUESTION_TEXT'",computed:!1}},declarations:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}[]`},description:""}}};const H="";function ye({className:e,classNamePrefix:n,classStyle:r="default-style",placeholder:i="Commencez votre saisie...",editable:t=!1,disabled:a,readOnly:s,id:l,optionRenderer:b,labelRenderer:c,onChange:d,onSelect:m,value:y,options:v,messageError:k,search:R=H,getOptionValue:w=Ye,label:j,description:E,declarations:fe,errors:M,onBlur:T,onFocus:A,isLoading:ge}){const[B,C]=p.useState(!1),[S,P]=p.useState(!1),L=Qe(v,y,w),G=`label-${l}`,ve=()=>{a||s||(A==null||A(),C(!0),P(!0))},Te=()=>{a||s||(C(!1),P(!1),T==null||T())},x=(q,O=!0)=>{const I=We($e(q),0,v.length),Ne=v[I];O&&(C(!1),T==null||T()),m(w(Ne))},Ce=q=>{d==null||d(q)},xe=()=>{C(!1),d==null||d(H),m(null)},qe=q=>{const O=v.length;switch(q){case g.Tab:case g.Escape:C(!1);return;case g.ArrowDown:x((L??-1)+1,!1);return;case g.ArrowUp:x((L??O)-1,!1);return;case g.Home:x(0,!1);return;case g.End:x(O-1,!1);return;case g.Enter:C(I=>!I);return}},he=!a||!s;return k?o.jsx("div",{className:"lunatic-combo-box-message-error",children:k}):o.jsxs(K,{id:l,className:e,classStyle:r,classNamePrefix:n,errors:M,children:[o.jsx(He,{htmlFor:l,id:G,description:E,children:j}),o.jsx(Xe,{type:"AFTER_QUESTION_TEXT",declarations:fe}),o.jsxs(Z,{focused:S,onFocus:ve,onBlur:Te,onKeyDown:qe,classNamePrefix:n,children:[o.jsx(de,{labelRenderer:c,placeholder:i,search:R,expanded:B,id:l,labelId:G,disabled:a,readOnly:s,focused:S,editable:t,selectedIndex:L,options:v,onChange:Ce,classNamePrefix:n,invalid:!!M}),o.jsx(te,{isLoading:ge,optionRenderer:b,options:v,focused:S,selectedIndex:L,expanded:B,id:l,search:R,onSelect:x})]}),he&&o.jsx(Be,{className:u({focused:S}),search:y,onClick:xe,editable:t})]})}function Qe(e,n,r){if(Array.isArray(e))return e.map(r).findIndex(i=>i===n)}function Ye(e={value:""}){const{id:n,value:r}=e;return n||r}const rn=f("Combobox",ye);ye.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBox",props:{expanded:{required:!1,tsType:{name:"boolean"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},labelId:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""},classNamePrefix:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},labelRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"errorMessage",value:{name:"ReactNode",required:!0}}]}}]}],raw:"LunaticError[]"},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{rn as C,Xe as D,ce as L,Ee as S,He as a,Y as b,u as c,N as d,nn as e,$e as f,Se as g,en as h,Je as i,f as s,Le as u,W as v};
