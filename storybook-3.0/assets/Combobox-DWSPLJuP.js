import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{g as Ee}from"./_commonjsHelpers-BosuxZz1.js";import{r as c,R as we}from"./index-xW6owYLq.js";var Q={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var n={}.hasOwnProperty;function r(){for(var t="",s=0;s<arguments.length;s++){var l=arguments[s];l&&(t=o(t,i(l)))}return t}function i(t){if(typeof t=="string"||typeof t=="number")return t;if(typeof t!="object")return"";if(Array.isArray(t))return r.apply(null,t);if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]"))return t.toString();var s="";for(var l in t)n.call(t,l)&&t[l]&&(s=o(s,l));return s}function o(t,s){return s?t?t+" "+s:t+s:t}e.exports?(r.default=r,e.exports=r):window.classNames=r})()})(Q);var Se=Q.exports;const d=Ee(Se),F={},Y=c.createContext(F),Le=({slots:e,children:n})=>e?a.jsx(Y.Provider,{value:e??F,children:n}):a.jsx(a.Fragment,{children:n});function g(e,n){const r=i=>{const o=c.useContext(Y)??F;if(o&&e in o){const t=o[e];return a.jsx(t,{...i})}return a.jsx(n,{...i})};return r.displayName=e,r}Le.__docgenInfo={description:"",methods:[],displayName:"SlotsProvider",props:{slots:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
>`,required:!0}},{key:"MarkdownLink",value:{name:"MarkdownLink",required:!0}},{key:"Accordion",value:{name:"Accordion",required:!0}}]}}],raw:"Partial<LunaticSlotComponents>"},description:""}}};function K({errors:e,componentId:n}){const r=Array.isArray(e)?e:Oe(e,n);return r?a.jsx("div",{className:"lunatic-errors",children:r.map(({id:i,errorMessage:o})=>a.jsx("div",{className:"lunatic-error",children:o},`error-${i}`))}):null}function Oe(e,n){if(!n||!e)return;const r=Object.entries(e).find(([i])=>n==null?void 0:n.trim().endsWith(i));if(Array.isArray(r)&&Array.isArray(r[1]))return r[1]}K.__docgenInfo={description:"Display a list of error as simple red text",methods:[],displayName:"ComponentErrors"};const z=g("ComboboxContainer",({children:e,className:n,classNamePrefix:r,id:i,classStyle:o="default-style",errors:t})=>a.jsxs("div",{id:`${r??"lunatic"}-combo-box-container-${i}`,className:d(n,`${r??"lunatic"}-combo-box-container`,`${r??"lunatic"}-suggester-${o}`,"lunatic-suggester-default-style",o),children:[e,t&&a.jsx(K,{errors:t})]}));z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContainer",props:{classStyle:{defaultValue:{value:"'default-style'",computed:!1},required:!1}}};const v={ArrowUp:"ArrowUp",ArrowDown:"ArrowDown",Home:"Home",End:"End",Enter:"Enter",Escape:"Escape",Tab:"Tab"},Z=g("ComboboxContentBox",({children:e,classNamePrefix:n,focused:r})=>a.jsx("div",{className:d(`${n??"lunatic"}-combo-box`,{focused:r}),children:e}));Z.__docgenInfo={description:"",methods:[],displayName:"ComboboxContentBox"};function De(e){const n=c.useRef(e);return n.current=e,n}function je(e,n,r){const i=De(n),o=c.useCallback(t=>{i.current(t)},[i]);c.useEffect(()=>(document.addEventListener(e,o,r),()=>{document.removeEventListener(e,o,r)}),[e,r,o])}function J({children:e,focused:n,onFocus:r,onBlur:i,onKeyDown:o,classNamePrefix:t}){const s=c.useRef(null),l=c.useCallback(f=>{var u;!((u=s.current)!=null&&u.contains(f.target))&&i&&i()},[s,i]);je("mousedown",l);const m=c.useCallback(function(f){var y;const{key:u}=f;switch(u){case v.Escape:case v.Enter:case v.Tab:(y=s.current)==null||y.focus();break}o(u)},[o]);return a.jsx(Z,{classNamePrefix:t,focused:n,children:a.jsx("div",{className:d(`${t??"lunatic"}-combo-box-content`,{focused:n}),ref:s,tabIndex:0,onFocus:r,onClick:r,onKeyDown:m,children:e})})}J.__docgenInfo={description:"",methods:[],displayName:"ComboboxContent"};function $(e){const{top:n}=e;return n}function W(e){const{top:n,height:r}=e;return n+r}function Ae(e,n){const r=Math.min($(e),$(n));return Math.max(W(e),W(n))-r<e.height+n.height}function ee({children:e,index:n,selected:r,onSelect:i}){const o=c.useRef(null),t=c.useCallback(s=>{s.stopPropagation(),s.preventDefault(),i(n)},[i,n]);return c.useEffect(()=>{const{current:s}=o;if(s&&r&&s.parentNode){const l=s.getBoundingClientRect(),m=s.parentNode.getBoundingClientRect();Ae(l,m)||s.scrollIntoView()}},[o,r]),a.jsx("li",{className:d("lunatic-combo-box-option-container",{selected:r}),role:"option","aria-selected":r,onClick:t,ref:o,children:e})}ee.__docgenInfo={description:"",methods:[],displayName:"ComboboxOptionContainer"};const N=g("ComboboxPanelContainer",({children:e,focused:n,expanded:r,id:i})=>a.jsx("ul",{id:`lunatic-combo-box-panel-${i}`,"aria-label":"suggestions",className:d("lunatic-combo-box-panel",{focused:n,expanded:r}),role:"listbox",children:e}));N.__docgenInfo={description:"",methods:[],displayName:"ComboboxPanelContainer"};function D(e,n){return Object.entries(n).reduce((r,[i,o])=>({...r,[i]:o[e]}),{})}const V=["en","fr"],ne=()=>{if(typeof navigator>"u"||!navigator.language)return"fr";const e=navigator.language.split("-")[0],n=V.map(r=>r.toString()).indexOf(e);return n===-1?V[0]:V[n]},re={DEFAULT_BUTTON_ADD:{fr:"Ajouter une ligne",en:"Add row"},DEFAULT_BUTTON_REMOVE:{fr:"Supprimer une ligne",en:"Remove row"},MODAL_IGNORE:{fr:"Poursuivre",en:"Ignore"},MODAL_CORRECT:{fr:"Corriger ma réponse",en:"Correct"},DK:{fr:"Ne sais pas",en:"Don't know"},RF:{fr:"Refus",en:"Refused"},PLACEHOLDER:{fr:"Sélectionnez une modalité",en:"Select a modality"},SUGGESTER_PLACEHOLDER:{fr:"Commencez votre saisie...",en:"Start typing..."},SUGGESTER_LOADING:{fr:"Liste en cours de chargement",en:"List is loading"},SUGGESTER_NO_RESULT:{fr:"Aucun résultat trouvé",en:"No results"},SUGGESTER_ERROR:{fr:"Erreur lors du chargement de la liste",en:"An error has occured while loading the list"},SUGGESTER_ARBITRARY:{fr:"Choisir",en:"Select"}},M={thousandSeparator:{fr:" ",en:","},decimalSeparator:{fr:",",en:"."}},Ie=Object.values(M.decimalSeparator),_e=D("fr",re),Ve=D("en",re),Fe=D("fr",M),Me=D("en",M),nn={...ne()==="fr"?Fe:Me,allDecimalSeparators:Ie},x=ne()==="fr"?_e:Ve,te=g("ComboboxOption",({option:e,shouldDisplayOptionId:n=!0,selected:r})=>{const{id:i,value:o,label:t}=e;return o==="OTHER"?a.jsx("div",{className:d("lunatic-combo-box-option",{selected:r}),children:a.jsx("span",{className:"label",children:`${x.SUGGESTER_NO_RESULT} : ${x.SUGGESTER_ARBITRARY} "${t}"`})}):t?a.jsxs("div",{className:d("lunatic-combo-box-option",{selected:r}),children:[n&&a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"id",children:i||o}),a.jsx("span",{children:" - "})]}),a.jsx("span",{className:"label",children:t})]}):a.jsx("div",{className:d("lunatic-combo-box-option",{selected:r}),children:a.jsx("span",{className:"id",children:i||o})})});te.__docgenInfo={description:"",methods:[],displayName:"ComboboxOption",props:{option:{required:!0,tsType:{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},description:""},shouldDisplayOptionId:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},selected:{required:!1,tsType:{name:"boolean"},description:""}}};function ae({optionRenderer:e,options:n=[],shouldDisplayOptionsId:r,focused:i,selectedIndex:o,expanded:t,id:s,search:l,onSelect:m,isLoading:f}){const u=t?n:[],y=e??te;return u.length===0&&!l?null:f?a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:x.SUGGESTER_LOADING})})}):l&&u.length===0?a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:x.SUGGESTER_NO_RESULT})})}):u.length===0?a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:a.jsx("div",{className:"lunatic-combo-box-option",children:a.jsx("span",{className:"label",children:x.SUGGESTER_NO_RESULT})})}):a.jsx(N,{expanded:t,focused:i,id:`${s}-list`,children:u.map((b,p)=>a.jsx(ee,{index:p.toString(),selected:o===p,onSelect:m,children:a.jsx(y,{option:b,shouldDisplayOptionId:r,selected:o===p,search:l})},b.id??b.value))})}ae.__docgenInfo={description:"Floating menu containing selectable options",methods:[],displayName:"ComboboxPanel",props:{options:{defaultValue:{value:"[]",computed:!1},required:!1}}};function oe({className:e,children:n}){return a.jsx("i",{className:d("lunatic-icon",e),children:n})}oe.__docgenInfo={description:"",methods:[],displayName:"LunaticIcon",props:{className:{required:!1,tsType:{name:"string"},description:""}}};function ie({className:e,width:n=32,height:r=32}){return a.jsx(oe,{className:e,children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:r,x:"0",y:"0",enableBackground:"new 0 0 32 32",version:"1.1",viewBox:"0 0 32 32",xmlSpace:"preserve",children:a.jsx("path",{d:"M 7.097006,7.0709627 C 6.4710386,7.6950801 6.0348033,8.5167883 6,9.3333333 l 6.666666,6.6666677 -6.6666655,6.666666 C 6.0406655,24.255963 7.7002437,25.930395 9.3333333,26 L 15.999999,19.333334 22.666665,26 C 24.255962,25.95934 25.930393,24.299755 26,22.666667 L 19.333332,16.000001 26,9.3333334 C 25.959335,7.7440359 24.299754,6.069605 22.666665,6 L 15.999999,12.666666 9.3333333,6 C 8.5386853,6.020332 7.7229758,6.4468492 7.097006,7.0709627 Z"})})})}ie.__docgenInfo={description:"",methods:[],displayName:"CrossIcon",props:{className:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"32",computed:!1}}}};const H=()=>{};function rn(e,n){let r;return[(...t)=>new Promise((s,l)=>{r&&clearTimeout(r),r=window.setTimeout(async()=>{try{s(await e(...t))}catch(m){l(m)}},n)}),()=>clearTimeout(r)]}function se({className:e,children:n,tabIndex:r,title:i="Fab",onClick:o=H,onKeyDown:t=H,disabled:s}){return a.jsx("button",{className:d("lunatic-fab",e),tabIndex:r,title:i,onClick:o,onKeyDown:t,disabled:s,"aria-label":i,children:n})}se.__docgenInfo={description:"",methods:[],displayName:"IconButton",props:{title:{defaultValue:{value:"'Fab'",computed:!1},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},required:!1},onKeyDown:{defaultValue:{value:"() => {}",computed:!1},required:!1}}};function Be(e){return!e||e.trim().length===0}function Pe(e){if(typeof e=="function")return n=>{n.key==="Enter"&&e()}}function le({className:e,search:n,onClick:r,editable:i}){const o=c.useMemo(()=>Pe(r),[r]);return i?a.jsx(se,{className:d("mini","lunatic-combo-box-fab",e),title:"delete",onClick:r,disabled:Be(n),onKeyDown:o,children:a.jsx(ie,{className:"lunatic-combo-box-icon"})}):null}const Ge=g("ComboboxClearButton",le);le.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxClearButton",props:{className:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:""}}};function Ue(e,n,r){if(e){const{id:i,value:o,label:t}=e;return t?`${i||o} - ${t}`:i||o}return n&&n.trim().length?n:r??""}const ue=({option:e,placeholder:n,search:r,disabled:i=!1,readOnly:o=!1})=>{const t=!e&&(!r||r.length===0);return(e==null?void 0:e.value)==="OTHER"?a.jsx("div",{className:d("lunatic-combo-box-selected",{disabled:i,readOnly:o}),children:a.jsx("span",{className:"selection",children:e.label})}):a.jsx("div",{className:d("lunatic-combo-box-selected",{disabled:i,readOnly:o}),children:a.jsx("span",{className:d({placeholder:t,selection:!t}),children:Ue(e,r,n)})})},$e=g("ComboboxLabelSelection",ue);ue.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBoxLabelSelection",props:{option:{required:!1,tsType:{name:"union",raw:"ComboboxOptionType | null",elements:[{name:"signature",type:"object",raw:`{
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}},{name:"null"}]},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};function de({placeholder:e,disabled:n,onChange:r,value:i,id:o,labelledBy:t,focused:s,className:l,invalid:m,required:f}){const u=c.useRef(null);c.useEffect(()=>{u.current&&s&&u.current.focus()},[u,s]);const y=b=>{const{key:p}=b;(p==="ArrowUp"||p==="ArrowDown")&&b.preventDefault()};return a.jsx("input",{ref:u,id:o,className:d("lunatic-combo-box-input",l),type:"text",onChange:r,value:i,"aria-invalid":m,"aria-required":f,required:f,title:"combo-box",autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",spellCheck:"false",placeholder:e,disabled:n,"aria-labelledby":t,onKeyDown:y})}const We=g("ComboboxInput",de);de.__docgenInfo={description:"",methods:[],displayName:"LunaticComboboxInput",props:{placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},labelledBy:{required:!1,tsType:{name:"string"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""}}};function ce({labelRenderer:e,placeholder:n,search:r,expanded:i,disabled:o,readOnly:t,focused:s,onChange:l,selectedIndex:m,options:f,editable:u,labelId:y,id:b,classNamePrefix:p,invalid:j,required:k}){const R=!u||!i,E=m===void 0?void 0:f[m],A=e??$e;return a.jsx("div",{id:b,className:d(`${p??"lunatic"}-combo-box-selection`,{focused:s,disabled:o}),role:"combobox","aria-haspopup":"listbox","aria-expanded":i,"aria-autocomplete":"list","aria-owns":b,"aria-labelledby":y,children:R?a.jsx(A,{option:E,placeholder:n,search:r,disabled:o,readOnly:t}):a.jsx(We,{invalid:j,id:`combobox-input-${b}`,className:"lunatic-combo-box-input",onChange:w=>l==null?void 0:l(w.target.value??w.target.innerText),value:r,placeholder:n,disabled:o,readOnly:t,focused:s,labelledBy:y,required:k})})}ce.__docgenInfo={description:`Label displayed when a value is selected in the ComboBox
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"Array<ComboboxOptionType>"},description:""},search:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""}}};function He(e){if(typeof e=="string"){const n=Number.parseInt(e,10);if(Number.isNaN(n))throw new TypeError(`Cannot cast ${e} to int`);return n}if(typeof e=="number")return e;throw new TypeError(`Cannot cast ${typeof e} to int`)}function Xe(e,n,r){return e<n?n:e>r?r:e}function tn(e){return typeof e=="number"&&Number.isFinite(e)}function pe({value:e,className:n}){return typeof e=="string"&&e.length>0||we.isValidElement(e)?a.jsx("span",{className:d("label-description",n),children:e}):null}pe.__docgenInfo={description:"",methods:[],displayName:"LabelDescription",props:{value:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function me({children:e,id:n,htmlFor:r,className:i,style:o,description:t}){return!e&&!t?null:a.jsxs("label",{htmlFor:r,id:n,className:d("lunatic-label",i),style:o,children:[e,a.jsx(pe,{value:t})]})}const Qe=g("Label",me);me.__docgenInfo={description:"Label displayed on top of a field",methods:[],displayName:"LunaticLabel"};const be=g("Declaration",({children:e,declarationType:n})=>a.jsx("div",{"data-testid":"declaration",className:d("declaration-lunatic",`declaration-${n.toLowerCase()}`),children:e}));function fe({id:e,type:n="AFTER_QUESTION_TEXT",declarations:r}){const i=(r==null?void 0:r.filter(o=>o.position===n&&o.label))??[];return i.length===0?null:a.jsx("div",{id:`declarations-${e}-${n}`,className:"declarations-lunatic",children:i.map(({id:o,label:t,declarationType:s})=>a.jsx(be,{declarationType:s,children:t},o))})}const Ye=g("Declarations",fe);be.__docgenInfo={description:"",methods:[],displayName:"Declaration"};fe.__docgenInfo={description:"",methods:[],displayName:"LunaticDeclarations",props:{id:{required:!1,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:"'AFTER_QUESTION_TEXT' | 'BEFORE_QUESTION_TEXT' | 'DETACHABLE'",elements:[{name:"literal",value:"'AFTER_QUESTION_TEXT'"},{name:"literal",value:"'BEFORE_QUESTION_TEXT'"},{name:"literal",value:"'DETACHABLE'"}]},description:"",defaultValue:{value:"'AFTER_QUESTION_TEXT'",computed:!1}},declarations:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}[]`},description:""}}};const X="";function ye({className:e,classNamePrefix:n,classStyle:r="default-style",placeholder:i=x.PLACEHOLDER,editable:o=!1,disabled:t,readOnly:s,id:l,optionRenderer:m,labelRenderer:f,onChange:u,onSelect:y,value:b,options:p,shouldDisplayOptionsId:j=!0,messageError:k,search:R=X,getOptionValue:E=ze,label:A,description:w,declarations:ge,errors:B,onBlur:T,onFocus:I,isLoading:ve,required:Te}){const[P,C]=c.useState(!1),[S,G]=c.useState(!1),L=Ke(p,b,E),U=`label-${l}`,Ce=()=>{t||s||(I==null||I(),C(!0),G(!0))},xe=()=>{t||s||(C(!1),G(!1),T==null||T())},q=(h,O=!0)=>{const _=Xe(He(h),0,p.length),Re=p[_];O&&(C(!1),T==null||T()),y(E(Re))},qe=h=>{u==null||u(h)},he=()=>{C(!1),u==null||u(X),y(null)},Ne=h=>{const O=p.length;switch(h){case v.Tab:case v.Escape:C(!1);return;case v.ArrowDown:q((L??-1)+1,!1);return;case v.ArrowUp:q((L??O)-1,!1);return;case v.Home:q(0,!1);return;case v.End:q(O-1,!1);return;case v.Enter:C(_=>!_);return}},ke=!t||!s;return k?a.jsx("div",{className:"lunatic-combo-box-message-error",children:k}):a.jsxs(z,{id:l,className:e,classStyle:r,classNamePrefix:n,errors:B,children:[a.jsx(Qe,{htmlFor:l,id:U,description:w,children:A}),a.jsx(Ye,{type:"AFTER_QUESTION_TEXT",declarations:ge}),a.jsxs(J,{focused:S,onFocus:Ce,onBlur:xe,onKeyDown:Ne,classNamePrefix:n,children:[a.jsx(ce,{labelRenderer:f,placeholder:i,search:R,expanded:P,id:l,labelId:U,disabled:t,readOnly:s,focused:S,editable:o,selectedIndex:L,options:p,onChange:qe,classNamePrefix:n,invalid:!!B,required:Te}),a.jsx(ae,{isLoading:ve,optionRenderer:m,options:p,shouldDisplayOptionsId:j,focused:S,selectedIndex:L,expanded:P,id:l,search:R,onSelect:q})]}),ke&&a.jsx(Ge,{className:d({focused:S}),search:b,onClick:he,editable:o})]})}function Ke(e,n,r){if(Array.isArray(e))return e.map(r).indexOf(n??"")}function ze(e){return(e==null?void 0:e.id)||(e==null?void 0:e.value)||""}const an=g("Combobox",ye);ye.__docgenInfo={description:"",methods:[],displayName:"LunaticComboBox",props:{expanded:{required:!1,tsType:{name:"boolean"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(s: string | null) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"s"}],return:{name:"void"}}},description:""},editable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},labelId:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:""},classNamePrefix:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},labelRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"description",value:{name:"ReactNode",required:!1}},{key:"label",value:{name:"ReactNode",required:!1}},{key:"value",value:{name:"string",required:!0}},{key:"search",value:{name:"string",required:!1}}]}}],raw:"ComboboxOptionType[]"},description:""},search:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},optionRenderer:{required:!1,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"errorMessage",value:{name:"ReactNode",required:!0}}]}}]}],raw:"LunaticError[]"},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{an as C,Ye as D,pe as L,Le as S,Qe as a,K as b,d as c,x as d,tn as e,He as f,Oe as g,rn as h,nn as i,g as s,De as u,H as v};
