import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{g as Re}from"./_commonjsHelpers-BosuxZz1.js";import{r as c,R as Le}from"./index-xW6owYLq.js";var Q={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var n={}.hasOwnProperty;function r(){for(var a="",s=0;s<arguments.length;s++){var l=arguments[s];l&&(a=i(a,o(l)))}return a}function o(a){if(typeof a=="string"||typeof a=="number")return a;if(typeof a!="object")return"";if(Array.isArray(a))return r.apply(null,a);if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]"))return a.toString();var s="";for(var l in a)n.call(a,l)&&a[l]&&(s=i(s,l));return s}function i(a,s){return s?a?a+" "+s:a+s:a}e.exports?(r.default=r,e.exports=r):window.classNames=r})()})(Q);var we=Q.exports;const d=Re(we),F={},Y=c.createContext(F),Se=({slots:e,children:n})=>e?t.jsx(Y.Provider,{value:e??F,children:n}):t.jsx(t.Fragment,{children:n});function g(e,n){const r=o=>{const i=c.useContext(Y)??F;if(i&&e in i){const a=i[e];return t.jsx(a,{...o})}return t.jsx(n,{...o})};return r.displayName=e,r}Se.__docgenInfo={description:"",methods:[],displayName:"SlotsProvider",props:{slots:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
>`,required:!0}},{key:"MarkdownLink",value:{name:"MarkdownLink",required:!0}},{key:"Accordion",value:{name:"Accordion",required:!0}}]}}],raw:"Partial<LunaticSlotComponents>"},description:""}}};function K({errors:e,componentId:n}){const r=Array.isArray(e)?e:De(e,n);return r?t.jsx("div",{className:"lunatic-errors",children:r.map(({id:o,errorMessage:i})=>t.jsx("div",{className:"lunatic-error",children:i},`error-${o}`))}):null}function De(e,n){if(!n||!e)return;const r=Object.entries(e).find(([o])=>n==null?void 0:n.trim().endsWith(o));if(Array.isArray(r)&&Array.isArray(r[1]))return r[1]}K.__docgenInfo={description:"Display a list of error as simple red text",methods:[],displayName:"ComponentErrors"};const z=g("ComboboxContainer",({children:e,className:n,classNamePrefix:r,id:o,classStyle:i="default-style",errors:a})=>t.jsxs("div",{id:`${r??"lunatic"}-combo-box-container-${o}`,className:d(n,`${r??"lunatic"}-combo-box-container`,`${r??"lunatic"}-suggester-${i}`,"lunatic-suggester-default-style",i),children:[e,a&&t.jsx(K,{errors:a})]}));z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContainer",props:{classStyle:{defaultValue:{value:"'default-style'",computed:!1},required:!1}}};const v={ArrowUp:"ArrowUp",ArrowDown:"ArrowDown",Home:"Home",End:"End",Enter:"Enter",Escape:"Escape",Tab:"Tab"},Z=g("ComboboxContentBox",({children:e,classNamePrefix:n,focused:r})=>t.jsx("div",{className:d(`${n??"lunatic"}-combo-box`,{focused:r}),children:e}));Z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContentBox"};function Oe(e){const n=c.useRef(e);return n.current=e,n}function Ae(e,n,r){const o=Oe(n),i=c.useCallback(a=>{o.current(a)},[o]);c.useEffect(()=>(document.addEventListener(e,i,r),()=>{document.removeEventListener(e,i,r)}),[e,r,i])}function J({children:e,focused:n,onFocus:r,onBlur:o,onKeyDown:i,classNamePrefix:a}){const s=c.useRef(null),l=c.useCallback(y=>{var u;!((u=s.current)!=null&&u.contains(y.target))&&o&&o()},[s,o]);Ae("mousedown",l);const p=c.useCallback(function(y){var f;const{key:u}=y;switch(u){case v.Escape:case v.Enter:case v.Tab:(f=s.current)==null||f.focus();break}i(u)},[i]);return t.jsx(Z,{classNamePrefix:a,focused:n,children:t.jsx("div",{className:d(`${a??"lunatic"}-combo-box-content`,{focused:n}),ref:s,tabIndex:0,onFocus:r,onClick:r,onKeyDown:p,children:e})})}J.__docgenInfo={description:"",methods:[],displayName:"ComboboxContent"};function $(e){const{top:n}=e;return n}function X(e){const{top:n,height:r}=e;return n+r}function je(e,n){const r=Math.min($(e),$(n));return Math.max(X(e),X(n))-r<e.height+n.height}function ee({children:e,index:n,selected:r,onSelect:o}){const i=c.useRef(null),a=c.useCallback(s=>{s.stopPropagation(),s.preventDefault(),o(n)},[o,n]);return c.useEffect(()=>{const{current:s}=i;if(s&&r&&s.parentNode){const l=s.getBoundingClientRect(),p=s.parentNode.getBoundingClientRect();je(l,p)||s.scrollIntoView()}},[i,r]),t.jsx("li",{className:d("lunatic-combo-box-option-container",{selected:r}),role:"option","aria-selected":r,onClick:a,ref:i,children:e})}ee.__docgenInfo={description:"",methods:[],displayName:"ComboboxOptionContainer"};const N=g("ComboboxPanelContainer",({children:e,focused:n,expanded:r,id:o})=>t.jsx("ul",{id:`lunatic-combo-box-panel-${o}`,"aria-label":"suggestions",className:d("lunatic-combo-box-panel",{focused:n,expanded:r}),role:"listbox",children:e}));N.__docgenInfo={description:"",methods:[],displayName:"ComboboxPanelContainer"};function O(e,n){return Object.entries(n).reduce((r,[o,i])=>({...r,[o]:i[e]}),{})}const V=["en","fr"],ne=()=>{if(typeof navigator>"u"||!navigator.language)return"fr";const e=navigator.language.split("-")[0],n=V.map(r=>r.toString()).indexOf(e);return n===-1?V[0]:V[n]},re={DEFAULT_BUTTON_ADD:{fr:"Ajouter une ligne",en:"Add row"},DEFAULT_BUTTON_REMOVE:{fr:"Supprimer une ligne",en:"Remove row"},MODAL_IGNORE:{fr:"Poursuivre",en:"Ignore"},MODAL_CORRECT:{fr:"Corriger ma réponse",en:"Correct"},DK:{fr:"Ne sais pas",en:"Don't know"},RF:{fr:"Refus",en:"Refused"},PLACEHOLDER:{fr:"Sélectionnez une modalité",en:"Select a modality"},SUGGESTER_PLACEHOLDER:{fr:"Commencez votre saisie...",en:"Start typing..."},SUGGESTER_LOADING:{fr:"Liste en cours de chargement",en:"List is loading"},SUGGESTER_NO_RESULT:{fr:"Aucun résultat trouvé",en:"No results"},SUGGESTER_ERROR:{fr:"Erreur lors du chargement de la liste",en:"An error has occured while loading the list"},SUGGESTER_ARBITRARY:{fr:"Choisir",en:"Select"}},M={thousandSeparator:{fr:" ",en:","},decimalSeparator:{fr:",",en:"."}},Ie=Object.values(M.decimalSeparator),_e=O("fr",re),Ve=O("en",re),Fe=O("fr",M),Me=O("en",M),nn={...ne()==="fr"?Fe:Me,allDecimalSeparators:Ie},x=ne()==="fr"?_e:Ve,ae=g("ComboboxOption",({option:e,shouldDisplayOptionId:n=!0,selected:r})=>{const{id:o,value:i,label:a}=e;return i==="OTHER"?t.jsx("div",{className:d("lunatic-combo-box-option",{selected:r}),children:t.jsx("span",{className:"label",children:`${x.SUGGESTER_NO_RESULT} : ${x.SUGGESTER_ARBITRARY} "${a}"`})}):a?t.jsxs("div",{className:d("lunatic-combo-box-option",{selected:r}),children:[n&&t.jsxs(t.Fragment,{children:[t.jsx("span",{className:"id",children:o||i}),t.jsx("span",{children:" - "})]}),t.jsx("span",{className:"label",children:a})]}):t.jsx("div",{className:d("lunatic-combo-box-option",{selected:r}),children:t.jsx("span",{className:"id",children:o||i})})});ae.__docgenInfo={description:"",methods:[],displayName:"ComboboxOption",props:{option:{required:!0,tsType:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]}},description:""},shouldDisplayOptionId:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},selected:{required:!1,tsType:{name:"boolean"},description:""}}};function te({optionRenderer:e,options:n=[],shouldDisplayOptionsId:r,focused:o,selectedIndex:i,expanded:a,id:s,search:l,onSelect:p,isLoading:y}){const u=a?n:[],f=e??ae;return u.length===0&&!l?null:y?t.jsx(N,{expanded:a,focused:o,id:`${s}-list`,children:t.jsx("div",{className:"lunatic-combo-box-option",children:t.jsx("span",{className:"label",children:x.SUGGESTER_LOADING})})}):l&&u.length===0?t.jsx(N,{expanded:a,focused:o,id:`${s}-list`,children:t.jsx("div",{className:"lunatic-combo-box-option",children:t.jsx("span",{className:"label",children:x.SUGGESTER_NO_RESULT})})}):u.length===0?t.jsx(N,{expanded:a,focused:o,id:`${s}-list`,children:t.jsx("div",{className:"lunatic-combo-box-option",children:t.jsx("span",{className:"label",children:x.SUGGESTER_NO_RESULT})})}):t.jsx(N,{expanded:a,focused:o,id:`${s}-list`,children:u.map((b,m)=>t.jsx(ee,{index:m.toString(),selected:i===m,onSelect:p,children:t.jsx(f,{option:b,shouldDisplayOptionId:r,selected:i===m,search:l})},b.id??b.value))})}te.__docgenInfo={description:"Floating menu containing selectable options",methods:[],displayName:"ComboboxPanel",props:{options:{defaultValue:{value:"[]",computed:!1},required:!1}}};function ie({className:e,children:n}){return t.jsx("i",{className:d("lunatic-icon",e),children:n})}ie.__docgenInfo={description:"",methods:[],displayName:"LunaticIcon",props:{className:{required:!1,tsType:{name:"string"},description:""}}};function oe({className:e,width:n=32,height:r=32}){return t.jsx(ie,{className:e,children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:r,x:"0",y:"0",enableBackground:"new 0 0 32 32",version:"1.1",viewBox:"0 0 32 32",xmlSpace:"preserve",children:t.jsx("path",{d:"M 7.097006,7.0709627 C 6.4710386,7.6950801 6.0348033,8.5167883 6,9.3333333 l 6.666666,6.6666677 -6.6666655,6.666666 C 6.0406655,24.255963 7.7002437,25.930395 9.3333333,26 L 15.999999,19.333334 22.666665,26 C 24.255962,25.95934 25.930393,24.299755 26,22.666667 L 19.333332,16.000001 26,9.3333334 C 25.959335,7.7440359 24.299754,6.069605 22.666665,6 L 15.999999,12.666666 9.3333333,6 C 8.5386853,6.020332 7.7229758,6.4468492 7.097006,7.0709627 Z"})})})}oe.__docgenInfo={description:"",methods:[],displayName:"CrossIcon",props:{className:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}}}};const W=()=>{};function rn(e,n){let r;return[(...a)=>new Promise((s,l)=>{r&&clearTimeout(r),r=window.setTimeout(async()=>{try{s(await e(...a))}catch(p){l(p)}},n)}),()=>clearTimeout(r)]}function se({className:e,children:n,tabIndex:r,title:o="Fab",onClick:i=W,onKeyDown:a=W,disabled:s}){return t.jsx("button",{className:d("lunatic-fab",e),tabIndex:r,title:o,onClick:i,onKeyDown:a,disabled:s,"aria-label":o,children:n})}se.__docgenInfo={description:"",methods:[],displayName:"IconButton",props:{title:{defaultValue:{value:"'Fab'",computed:!1},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},required:!1},onKeyDown:{defaultValue:{value:"() => {}",computed:!1},required:!1}}};function Be(e){return!e||e.trim().length===0}function Pe(e){if(typeof e=="function")return n=>{n.key==="Enter"&&e()}}function le({className:e,search:n,onClick:r,editable:o}){const i=c.useMemo(()=>Pe(r),[r]);return o?t.jsx(se,{className:d("mini","lunatic-combo-box-fab",e),title:"delete",onClick:r,disabled:Be(n),onKeyDown:i,children:t.jsx(oe,{className:"lunatic-combo-box-icon"})}):null}const Ue=g("ComboboxClearButton",le);le.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxClearButton",props:{className:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:""}}};function Ge(e,n,r){if(e){const{id:o,value:i,label:a}=e;return a?`${o||i} - ${a}`:o||i}return n&&n.trim().length?n:r??""}const ue=({option:e,placeholder:n,search:r,disabled:o=!1,readOnly:i=!1})=>{const a=!e&&(!r||r.length===0);return(e==null?void 0:e.value)==="OTHER"?t.jsx("div",{className:d("lunatic-combo-box-selected",{disabled:o,readOnly:i}),children:t.jsx("span",{className:"selection",children:e.label})}):t.jsx("div",{className:d("lunatic-combo-box-selected",{disabled:o,readOnly:i}),children:t.jsx("span",{className:d({placeholder:a,selection:!a}),children:Ge(e,r,n)})})},$e=g("ComboboxLabelSelection",ue);ue.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBoxLabelSelection",props:{option:{required:!1,tsType:{name:"union",raw:"ComboboxOptionType | null",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]}},{name:"null"}]},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};function de({placeholder:e,disabled:n,onChange:r,value:o,id:i,labelledBy:a,focused:s,className:l,invalid:p,required:y}){const u=c.useRef(null);c.useEffect(()=>{u.current&&s&&u.current.focus()},[u,s]);const f=b=>{const{key:m}=b;(m==="ArrowUp"||m==="ArrowDown")&&b.preventDefault()};return t.jsx("input",{ref:u,id:i,className:d("lunatic-combo-box-input",l),type:"text",onChange:r,value:o,"aria-invalid":p,"aria-required":y,required:y,title:"combo-box",autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",spellCheck:"false",placeholder:e,disabled:n,"aria-labelledby":a,onKeyDown:f})}const Xe=g("ComboboxInput",de);de.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxInput",props:{placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},labelledBy:{required:!1,tsType:{name:"string"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""}}};function ce({labelRenderer:e,placeholder:n,search:r,expanded:o,disabled:i,readOnly:a,focused:s,onChange:l,selectedIndex:p,options:y,editable:u,labelId:f,id:b,classNamePrefix:m,invalid:A,required:h}){const E=!u||!o,R=p===void 0?void 0:y[p],j=e??$e;return t.jsx("div",{id:b,className:d(`${m??"lunatic"}-combo-box-selection`,{focused:s,disabled:i}),role:"combobox","aria-haspopup":"listbox","aria-expanded":o,"aria-autocomplete":"list","aria-owns":b,"aria-labelledby":f,children:E?t.jsx(j,{option:R,placeholder:n,search:r,disabled:i,readOnly:a}):t.jsx(Xe,{invalid:A,id:`combobox-input-${b}`,className:"lunatic-combo-box-input",onChange:L=>l==null?void 0:l(L.target.value??L.target.innerText),value:r,placeholder:n,disabled:i,readOnly:a,focused:s,labelledBy:f,required:h})})}ce.__docgenInfo={description:`Label displayed when a value is selected in the ComboBox
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
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]},required:!1}},{key:"placeholder",value:{name:"string",required:!1}},{key:"search",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:`ComponentType<{
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
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]}}],raw:"Array<ComboboxOptionType>"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""}}};function We(e){if(typeof e=="string"){const n=Number.parseInt(e,10);if(Number.isNaN(n))throw new TypeError(`Cannot cast ${e} to int`);return n}if(typeof e=="number")return e;throw new TypeError(`Cannot cast ${typeof e} to int`)}function He(e,n,r){return e<n?n:e>r?r:e}function an(e){return typeof e=="number"&&Number.isFinite(e)}function me({value:e,className:n}){return typeof e=="string"&&e.length>0||Le.isValidElement(e)?t.jsx("span",{className:d("label-description",n),children:e}):null}me.__docgenInfo={description:"",methods:[],displayName:"LabelDescription",props:{value:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function pe({children:e,id:n,htmlFor:r,className:o,style:i,description:a}){return!e&&!a?null:t.jsxs("label",{htmlFor:r,id:n,className:d("lunatic-label",o),style:i,children:[e,t.jsx(me,{value:a})]})}const Qe=g("Label",pe);pe.__docgenInfo={description:"Label displayed on top of a field",methods:[],displayName:"LunaticLabel"};const be=g("Declaration",({children:e,declarationType:n})=>t.jsx("div",{"data-testid":"declaration",className:d("declaration-lunatic",`declaration-${n.toLowerCase()}`),children:e}));function ye({id:e,type:n="AFTER_QUESTION_TEXT",declarations:r}){const o=(r==null?void 0:r.filter(i=>i.position===n&&i.label))??[];return o.length===0?null:t.jsx("div",{id:`declarations-${e}-${n}`,className:"declarations-lunatic",children:o.map(({id:i,label:a,declarationType:s})=>t.jsx(be,{declarationType:s,children:a},i))})}const Ye=g("Declarations",ye);be.__docgenInfo={description:"",methods:[],displayName:"Declaration"};ye.__docgenInfo={description:"",methods:[],displayName:"LunaticDeclarations",props:{id:{required:!1,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:"'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE'",elements:[{name:"literal",value:"'AFTER_QUESTION_TEXT'"},{name:"literal",value:"'BEFORE_QUESTION_TEXT'"},{name:"literal",value:"'DETACHABLE'"}]},description:"",defaultValue:{value:"'AFTER_QUESTION_TEXT'",computed:!1}},declarations:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}[]`},description:""}}};const H="";function fe({className:e,classNamePrefix:n,classStyle:r="default-style",placeholder:o=x.PLACEHOLDER,editable:i=!1,disabled:a,readOnly:s,id:l,optionRenderer:p,labelRenderer:y,onChange:u,onSelect:f,value:b,options:m,shouldDisplayOptionsId:A=!0,messageError:h,search:E=H,getOptionValue:R=ze,label:j,description:L,declarations:ge,errors:B,onBlur:C,onFocus:I,isLoading:ve,required:Ce}){const[P,T]=c.useState(!1),[w,U]=c.useState(!1),S=Ke(m,b,R),G=`label-${l}`,Te=()=>{a||s||(I==null||I(),T(!0),U(!0))},xe=()=>{a||s||(T(!1),U(!1),C==null||C())},q=(k,D=!0)=>{const _=He(We(k),0,m.length),Ee=m[_];D&&(T(!1),C==null||C()),f(R(Ee))},qe=k=>{u==null||u(k)},ke=()=>{T(!1),u==null||u(H),f(null)},Ne=k=>{const D=m.length;switch(k){case v.Tab:case v.Escape:T(!1);return;case v.ArrowDown:q((S??-1)+1,!1);return;case v.ArrowUp:q((S??D)-1,!1);return;case v.Home:q(0,!1);return;case v.End:q(D-1,!1);return;case v.Enter:T(_=>!_);return}},he=!a||!s;return h?t.jsx("div",{className:"lunatic-combo-box-message-error",children:h}):t.jsxs(z,{id:l,className:e,classStyle:r,classNamePrefix:n,errors:B,children:[t.jsx(Qe,{htmlFor:l,id:G,description:L,children:j}),t.jsx(Ye,{type:"AFTER_QUESTION_TEXT",declarations:ge}),t.jsxs(J,{focused:w,onFocus:Te,onBlur:xe,onKeyDown:Ne,classNamePrefix:n,children:[t.jsx(ce,{labelRenderer:y,placeholder:o,search:E,expanded:P,id:l,labelId:G,disabled:a,readOnly:s,focused:w,editable:i,selectedIndex:S,options:m,onChange:qe,classNamePrefix:n,invalid:!!B,required:Ce}),t.jsx(te,{isLoading:ve,optionRenderer:p,options:m,shouldDisplayOptionsId:A,focused:w,selectedIndex:S,expanded:P,id:l,search:E,onSelect:q})]}),he&&t.jsx(Ue,{className:d({focused:w}),search:b,onClick:ke,editable:i})]})}function Ke(e,n,r){if(Array.isArray(e))return e.map(r).indexOf(n??"")}function ze(e){return(e==null?void 0:e.id)||(e==null?void 0:e.value)||""}const tn=g("Combobox",fe);fe.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBox",props:{expanded:{required:!1,tsType:{name:"boolean"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},labelId:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""},classNamePrefix:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},labelRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
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
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]},required:!1}},{key:"placeholder",value:{name:"string",required:!1}},{key:"search",value:{name:"string",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:`ComponentType<{
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
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]}}],raw:"ComboboxOptionType[]"},description:""},search:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},optionRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
	option: ComboboxOptionType;
	selected?: boolean;
	search?: string;
}`,signature:{properties:[{key:"option",value:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]},required:!0}},{key:"selected",value:{name:"boolean",required:!1}},{key:"search",value:{name:"string",required:!1}}]}}],raw:`ComponentType<{
	option: ComboboxOptionType;
	selected?: boolean;
	search?: string;
}>`},description:"@deprecated use createCustomizableField with ComboboxOptionRenderer as name."},shouldDisplayOptionsId:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},classStyle:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'default-style'",computed:!1}},value:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},messageError:{required:!1,tsType:{name:"string"},description:""},getOptionValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(o: ComboboxOptionType) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
	score?: number;
	melautoScore?: number;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"score",value:{name:"number",required:!1}},{key:"melautoScore",value:{name:"number",required:!1}}]}},name:"o"}],return:{name:"string"}}},description:"",defaultValue:{value:`function getDefaultOptionValue(option?: ComboboxOptionType) {
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
	variablesDependencies?: VariablesDependencies;
	type: 'VTL' | 'VTL|MD' | 'TXT';
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Valid VTL Expression"},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:"Variables used in the expression"},{key:"variablesDependencies",value:{name:"signature",type:"object",raw:`{
	COLLECTED?: string[];
	EXTERNAL?: string[];
	CALCULATED?: string[];
}`,signature:{properties:[{key:"COLLECTED",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"EXTERNAL",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"CALCULATED",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}}]},required:!1}},{key:"type",value:{name:"union",raw:"'VTL' | 'VTL|MD' | 'TXT'",elements:[{name:"literal",value:"'VTL'"},{name:"literal",value:"'VTL|MD'"},{name:"literal",value:"'TXT'"}],required:!0}}]},required:!0}},{key:"errorMessage",value:{name:"signature",type:"object",raw:`{
	/**
	 * Valid VTL Expression
	 */
	value: string;
	/**
	 * Variables used in the expression
	 */
	bindingDependencies?: string[];
	variablesDependencies?: VariablesDependencies;
	type: 'VTL' | 'VTL|MD' | 'TXT';
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Valid VTL Expression"},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:"Variables used in the expression"},{key:"variablesDependencies",value:{name:"signature",type:"object",raw:`{
	COLLECTED?: string[];
	EXTERNAL?: string[];
	CALCULATED?: string[];
}`,signature:{properties:[{key:"COLLECTED",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"EXTERNAL",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"CALCULATED",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}}]},required:!1}},{key:"type",value:{name:"union",raw:"'VTL' | 'VTL|MD' | 'TXT'",elements:[{name:"literal",value:"'VTL'"},{name:"literal",value:"'VTL|MD'"},{name:"literal",value:"'TXT'"}],required:!0}}]},required:!0}},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"type",value:{name:"union",raw:"'roundabout' | 'ROW' | 'simple'",elements:[{name:"literal",value:"'roundabout'"},{name:"literal",value:"'ROW'"},{name:"literal",value:"'simple'"}],required:!1}},{key:"iterations",value:{name:"signature",type:"object",raw:`{
	/**
	 * Valid VTL Expression
	 */
	value: string;
	/**
	 * Variables used in the expression
	 */
	bindingDependencies?: string[];
	variablesDependencies?: VariablesDependencies;
	type: 'VTL';
	shapeFrom?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Valid VTL Expression"},{key:"bindingDependencies",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:"Variables used in the expression"},{key:"variablesDependencies",value:{name:"signature",type:"object",raw:`{
	COLLECTED?: string[];
	EXTERNAL?: string[];
	CALCULATED?: string[];
}`,signature:{properties:[{key:"COLLECTED",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"EXTERNAL",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"CALCULATED",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}}]},required:!1}},{key:"type",value:{name:"literal",value:"'VTL'",required:!0}},{key:"shapeFrom",value:{name:"string",required:!1}}]},required:!1}}]}},{name:"union",raw:"'id' | 'criticality' | 'typeOfControl'",elements:[{name:"literal",value:"'id'"},{name:"literal",value:"'criticality'"},{name:"literal",value:"'typeOfControl'"}]}],raw:`Pick<
	ControlDefinition,
	'id' | 'criticality' | 'typeOfControl'
>`},{name:"signature",type:"object",raw:`{
	errorMessage: ReactNode;
}`,signature:{properties:[{key:"errorMessage",value:{name:"ReactNode",required:!0}}]}}]}],raw:"LunaticError[]"},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{tn as C,x as D,me as L,Se as S,Ye as a,Qe as b,d as c,K as d,an as e,We as f,De as g,rn as h,nn as i,g as s,Oe as u,W as v};
