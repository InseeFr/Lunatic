import{r as p,R as k}from"./index-BwDkhjyp.js";import{g as v}from"./_commonjsHelpers-BosuxZz1.js";var d={exports:{}},m={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var q=p,h=Symbol.for("react.element"),S=Symbol.for("react.fragment"),T=Object.prototype.hasOwnProperty,L=q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,R={key:!0,ref:!0,__self:!0,__source:!0};function y(e,t,n){var r,u={},o=null,a=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)T.call(t,r)&&!R.hasOwnProperty(r)&&(u[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)u[r]===void 0&&(u[r]=t[r]);return{$$typeof:h,type:e,key:o,ref:a,props:u,_owner:L.current}}m.Fragment=S;m.jsx=y;m.jsxs=y;d.exports=m;var i=d.exports,b={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var t={}.hasOwnProperty;function n(){for(var o="",a=0;a<arguments.length;a++){var s=arguments[a];s&&(o=u(o,r(s)))}return o}function r(o){if(typeof o=="string"||typeof o=="number")return o;if(typeof o!="object")return"";if(Array.isArray(o))return n.apply(null,o);if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]"))return o.toString();var a="";for(var s in o)t.call(o,s)&&o[s]&&(a=u(a,s));return a}function u(o,a){return a?o?o+" "+a:o+a:o}e.exports?(n.default=n,e.exports=n):window.classNames=n})()})(b);var g=b.exports;const c=v(g),l={},f=p.createContext(l),N=({slots:e,children:t})=>e?i.jsx(f.Provider,{value:e??l,children:t}):i.jsx(i.Fragment,{children:t});function D(e,t){const n=r=>{const u=p.useContext(f)??l;if(u&&e in u){const o=u[e];return i.jsx(o,{...r})}return i.jsx(t,{...r})};return n.displayName=e,n}N.__docgenInfo={description:"",methods:[],displayName:"SlotsProvider",props:{slots:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"Input",value:{name:"CustomInput",required:!0}},{key:"InputNumber",value:{name:"CustomInputNumber",required:!0}},{key:"Sequence",value:{name:"Sequence",required:!0}},{key:"Switch",value:{name:"CustomSwitch",required:!0}},{key:"Subsequence",value:{name:"Subsequence",required:!0}},{key:"Textarea",value:{name:"CustomTextarea",required:!0}},{key:"Datepicker",value:{name:"CustomDatepicker",required:!0}},{key:"Duration",value:{name:"CustomDuration",required:!0}},{key:"Question",value:{name:"CustomQuestion",required:!0}},{key:"Loop",value:{name:"CustomLoop",required:!0}},{key:"Dropdown",value:{name:"CustomDropdown",required:!0}},{key:"Radio",value:{name:"Radio",required:!0}},{key:"Suggester",value:{name:"CustomSuggester",required:!0}},{key:"CheckboxBoolean",value:{name:"CustomCheckboxBoolean",required:!0}},{key:"CheckboxGroup",value:{name:"CustomCheckboxGroup",required:!0}},{key:"CheckboxOption",value:{name:"CheckboxOption",required:!0}},{key:"RadioGroup",value:{name:"RadioGroup",required:!0}},{key:"RadioOption",value:{name:"RadioOption",required:!0}},{key:"Combobox",value:{name:"Combobox",required:!0}},{key:"ComboboxContainer",value:{name:"ComboboxContainer",required:!0}},{key:"ComboboxContentBox",value:{name:"ComboboxContentBox",required:!0}},{key:"ComboboxPanelContainer",value:{name:"ComboboxPanelContainer",required:!0}},{key:"ComboboxOption",value:{name:"ComboboxOption",required:!0}},{key:"ComboboxInput",value:{name:"ComboboxInput",required:!0}},{key:"ComboboxClearButton",value:{name:"ComboboxClearButton",required:!0}},{key:"ComboboxLabelSelection",value:{name:"ComboboxLabelSelection",required:!0}},{key:"Roundabout",value:{name:"CustomRoundabout",required:!0}},{key:"SuggesterNotification",value:{name:"SuggesterNotification",required:!0}},{key:"SummaryTitle",value:{name:"SummaryTitle",required:!0}},{key:"SummaryResponses",value:{name:"SummaryResponses",required:!0}},{key:"Button",value:{name:"Button",required:!0}},{key:"Label",value:{name:"Label",required:!0}},{key:"Declarations",value:{name:"Declarations",required:!0}},{key:"Declaration",value:{name:"Declaration",required:!0}},{key:"Tr",value:{name:"Tr",required:!0}},{key:"Td",value:{name:"Td",required:!0}},{key:"Th",value:{name:"Th",required:!0}},{key:"Tbody",value:{name:"Tbody",required:!0}},{key:"Table",value:{name:"Table",required:!0}},{key:"Thead",value:{name:"Thead",required:!0}},{key:"Fieldset",value:{name:"Fieldset",required:!0}},{key:"Notification",value:{name:"Notification",required:!0}},{key:"RouterLink",value:{name:"RouterLink",required:!0}},{key:"ComponentWrapper",value:{name:"ComponentType",elements:[{name:"PropsWithChildren",elements:[{name:"intersection",raw:"LunaticComponentProps & { index: number }",elements:[{name:"unknown"},{name:"signature",type:"object",raw:"{ index: number }",signature:{properties:[{key:"index",value:{name:"number",required:!0}}]}}]}],raw:"PropsWithChildren<LunaticComponentProps & { index: number }>"}],raw:`ComponentType<
	PropsWithChildren<LunaticComponentProps & { index: number }>
>`,required:!0}},{key:"MarkdownLink",value:{name:"MarkdownLink",required:!0}},{key:"Accordion",value:{name:"Accordion",required:!0}}]}}],raw:"Partial<LunaticSlotComponents>"},description:""}}};function w({errors:e,componentId:t}){const n=Array.isArray(e)?e:_(e,t);return n?i.jsx("div",{className:"lunatic-errors",children:n.map(({id:r,errorMessage:u})=>i.jsx("div",{className:"lunatic-error",children:u},`error-${r}`))}):null}function _(e,t){if(!t||!e)return;const n=Object.entries(e).find(([r])=>t==null?void 0:t.trim().endsWith(r));if(Array.isArray(n)&&Array.isArray(n[1]))return n[1]}w.__docgenInfo={description:"Display a list of error as simple red text",methods:[],displayName:"ComponentErrors"};function C({value:e,className:t}){return typeof e=="string"&&e.length>0||k.isValidElement(e)?i.jsx("span",{className:c("label-description",t),children:e}):null}C.__docgenInfo={description:"",methods:[],displayName:"LabelDescription",props:{value:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function x({children:e,id:t,htmlFor:n,className:r,style:u,description:o}){return e?i.jsxs("label",{htmlFor:n,id:t,className:c("lunatic-label",r),style:u,children:[e,i.jsx(C,{value:o})]}):null}const j=D("Label",x);x.__docgenInfo={description:"Label displayed on top of a field",methods:[],displayName:"LunaticLabel"};export{w as C,j as L,N as S,C as a,_ as g,i as j,D as s,c as y};
