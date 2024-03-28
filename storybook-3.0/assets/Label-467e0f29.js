import{r as m,R as k}from"./index-76fb7be0.js";import{g as v}from"./_commonjsHelpers-de833af9.js";var d={exports:{}},l={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var q=m,g=Symbol.for("react.element"),R=Symbol.for("react.fragment"),h=Object.prototype.hasOwnProperty,S=q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,T={key:!0,ref:!0,__self:!0,__source:!0};function b(e,n,t){var r,a={},o=null,u=null;t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(u=n.ref);for(r in n)h.call(n,r)&&!T.hasOwnProperty(r)&&(a[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)a[r]===void 0&&(a[r]=n[r]);return{$$typeof:g,type:e,key:o,ref:u,props:a,_owner:S.current}}l.Fragment=R;l.jsx=b;l.jsxs=b;d.exports=l;var i=d.exports,y={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var n={}.hasOwnProperty;function t(){for(var o="",u=0;u<arguments.length;u++){var s=arguments[u];s&&(o=a(o,r(s)))}return o}function r(o){if(typeof o=="string"||typeof o=="number")return o;if(typeof o!="object")return"";if(Array.isArray(o))return t.apply(null,o);if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]"))return o.toString();var u="";for(var s in o)n.call(o,s)&&o[s]&&(u=a(u,s));return u}function a(o,u){return u?o?o+" "+u:o+u:o}e.exports?(t.default=t,e.exports=t):window.classNames=t})()})(y);var L=y.exports;const c=v(L),p={},f=m.createContext(p),P=({slots:e,children:n})=>e?i.jsx(f.Provider,{value:e??p,children:n}):i.jsx(i.Fragment,{children:n});function w(e,n){const t=r=>{const a=m.useContext(f)??p;if(a&&e in a){const o=a[e];return i.jsx(o,{...r})}return i.jsx(n,{...r})};return t.displayName=e,t}P.__docgenInfo={description:"",methods:[],displayName:"SlotsProvider",props:{slots:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
	RoundaboutContainer: typeof RoundaboutContainer;
	RoundaboutLabel: typeof RoundaboutLabel;
	RoundaboutItTitle: typeof RoundaboutItTitle;
	RoundaboutItContainer: typeof RoundaboutItContainer;
	RoundaboutItButton: typeof RoundaboutItButton;
	RoundaboutPending: typeof RoundaboutPending;

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
		PropsWithChildren<FilledLunaticComponentProps & { index: number }>
	>;
}`,signature:{properties:[{key:"Input",value:{name:"CustomInput",required:!0}},{key:"InputNumber",value:{name:"CustomInputNumber",required:!0}},{key:"Sequence",value:{name:"Sequence",required:!0}},{key:"Switch",value:{name:"CustomSwitch",required:!0}},{key:"Subsequence",value:{name:"Subsequence",required:!0}},{key:"Textarea",value:{name:"CustomTextarea",required:!0}},{key:"Datepicker",value:{name:"CustomDatepicker",required:!0}},{key:"Duration",value:{name:"CustomDuration",required:!0}},{key:"Question",value:{name:"CustomQuestion",required:!0}},{key:"Loop",value:{name:"CustomLoop",required:!0}},{key:"Dropdown",value:{name:"CustomDropdown",required:!0}},{key:"Radio",value:{name:"Radio",required:!0}},{key:"Suggester",value:{name:"CustomSuggester",required:!0}},{key:"CheckboxBoolean",value:{name:"CustomCheckboxBoolean",required:!0}},{key:"CheckboxGroup",value:{name:"CustomCheckboxGroup",required:!0}},{key:"CheckboxOption",value:{name:"CheckboxOption",required:!0}},{key:"RadioGroup",value:{name:"RadioGroup",required:!0}},{key:"RadioOption",value:{name:"RadioOption",required:!0}},{key:"Combobox",value:{name:"Combobox",required:!0}},{key:"ComboboxContainer",value:{name:"ComboboxContainer",required:!0}},{key:"ComboboxContentBox",value:{name:"ComboboxContentBox",required:!0}},{key:"ComboboxPanelContainer",value:{name:"ComboboxPanelContainer",required:!0}},{key:"ComboboxOption",value:{name:"ComboboxOption",required:!0}},{key:"ComboboxInput",value:{name:"ComboboxInput",required:!0}},{key:"ComboboxClearButton",value:{name:"ComboboxClearButton",required:!0}},{key:"ComboboxLabelSelection",value:{name:"ComboboxLabelSelection",required:!0}},{key:"Roundabout",value:{name:"CustomRoundabout",required:!0}},{key:"RoundaboutContainer",value:{name:"RoundaboutContainer",required:!0}},{key:"RoundaboutLabel",value:{name:"RoundaboutLabel",required:!0}},{key:"RoundaboutItTitle",value:{name:"RoundaboutItTitle",required:!0}},{key:"RoundaboutItContainer",value:{name:"RoundaboutItContainer",required:!0}},{key:"RoundaboutItButton",value:{name:"RoundaboutItButton",required:!0}},{key:"RoundaboutPending",value:{name:"RoundaboutPending",required:!0}},{key:"SuggesterNotification",value:{name:"SuggesterNotification",required:!0}},{key:"SummaryTitle",value:{name:"SummaryTitle",required:!0}},{key:"SummaryResponses",value:{name:"SummaryResponses",required:!0}},{key:"Button",value:{name:"Button",required:!0}},{key:"Label",value:{name:"Label",required:!0}},{key:"Declarations",value:{name:"Declarations",required:!0}},{key:"Declaration",value:{name:"Declaration",required:!0}},{key:"Tr",value:{name:"Tr",required:!0}},{key:"Td",value:{name:"Td",required:!0}},{key:"Th",value:{name:"Th",required:!0}},{key:"Tbody",value:{name:"Tbody",required:!0}},{key:"Table",value:{name:"Table",required:!0}},{key:"Thead",value:{name:"Thead",required:!0}},{key:"Fieldset",value:{name:"Fieldset",required:!0}},{key:"Notification",value:{name:"Notification",required:!0}},{key:"RouterLink",value:{name:"RouterLink",required:!0}},{key:"ComponentWrapper",value:{name:"ComponentType",elements:[{name:"PropsWithChildren",elements:[{name:"intersection",raw:"FilledLunaticComponentProps & { index: number }",elements:[{name:"intersection",raw:`DeepTranslateExpression<LunaticComponentDefinition & { componentType: T }> &
FilledManagementProps &
FilledValueProps &
FilledMissingResponseProps &
FilledHandlersProps &
FilledPaginationProps & {
	conditionFilter?: boolean;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:"{ management?: boolean }",signature:{properties:[{key:"management",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:"{ management?: boolean }",signature:{properties:[{key:"management",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:"{ management?: boolean }",signature:{properties:[{key:"management",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:"{ management?: boolean }",signature:{properties:[{key:"management",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:"{ management?: boolean }",signature:{properties:[{key:"management",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
	conditionFilter?: boolean;
}`,signature:{properties:[{key:"conditionFilter",value:{name:"boolean",required:!1}}]}}]},{name:"signature",type:"object",raw:"{ index: number }",signature:{properties:[{key:"index",value:{name:"number",required:!0}}]}}]}],raw:"PropsWithChildren<FilledLunaticComponentProps & { index: number }>"}],raw:`ComponentType<
	PropsWithChildren<FilledLunaticComponentProps & { index: number }>
>`,required:!0}}]}}],raw:"Partial<LunaticSlotComponents>"},description:""}}};function D({errors:e,componentId:n}){const t=Array.isArray(e)?e:N(e,n);return t?i.jsx("div",{className:"lunatic-errors",children:t.map(({id:r,errorMessage:a})=>i.jsx("div",{className:"lunatic-error",children:a},`error-${r}`))}):null}function N(e,n){if(!n||!e)return;const t=Object.entries(e).find(([r])=>n==null?void 0:n.trim().endsWith(r));if(Array.isArray(t)&&Array.isArray(t[1]))return t[1]}D.__docgenInfo={description:"Display a list of error as simple red text",methods:[],displayName:"ComponentErrors"};function C({value:e,className:n}){return typeof e=="string"&&e.length>0||k.isValidElement(e)?i.jsx("span",{className:c("label-description",n),children:e}):null}C.__docgenInfo={description:"",methods:[],displayName:"LabelDescription",props:{value:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};function x({children:e,id:n,htmlFor:t,className:r,style:a,description:o}){return e?i.jsxs("label",{htmlFor:t,id:n,className:c("lunatic-label",r),style:a,children:[e,i.jsx(C,{value:o})]}):null}const _=w("Label",x);x.__docgenInfo={description:"Label displayed on top of a field",methods:[],displayName:"LunaticLabel"};export{D as C,_ as L,P as S,C as a,N as g,i as j,w as s,c as y};
