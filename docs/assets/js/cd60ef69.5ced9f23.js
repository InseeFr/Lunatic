"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3061],{49374:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>p,metadata:()=>u,toc:()=>m});var o=n(85893),r=n(11151),s=n(55094),a=n(86436);const l=JSON.parse('{"maxPage":"5","components":[{"id":"component-set","componentType":"ComponentSet","page":"1","conditionFilter":{"value":"true","type":"VTL"},"label":{"value":"\\"## Who are you?\\"","type":"VTL|MD"},"description":{"value":"\\"This is your opportunity to tell me about yourself!\\"","type":"VTL|MD"},"components":[{"id":"prenom","componentType":"Input","mandatory":false,"maxLength":20,"label":{"value":"\\"Pr\xe9nom\\"))","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"PRENOM"},"controls":[{"criticality":"WARN","errorMessage":{"type":"VTL","value":"\\"booleen pas coch\xe9 et on affiche un message un peu long histoire de tester le truc \\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"false"},"id":"kfxmjupm-CI-0"}]},{"id":"age","componentType":"InputNumber","maxLength":3,"label":{"value":"\\"Age\\"))","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"response":{"name":"AGE"}},{"id":"conditionfilter","componentType":"Sequence","mandatory":false,"label":{"value":"\\"ConditionFilter\\"))","type":"VTL|MD"},"conditionFilter":{"value":"not(nvl(PRENOM, \\"\\") = \\"\\")","type":"VTL"},"response":{"name":"PRENOM"}}]},{"id":"seq","componentType":"Sequence","label":{"value":"\\"Merci !\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"page":"2"}],"variables":[{"variableType":"COLLECTED","name":"AGE","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTED":null}},{"variableType":"COLLECTED","name":"PRENOM","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTED":null}}]}'),p={},i="ComponentSet",u={id:"components/aggregators/componentSet",title:"ComponentSet",description:"Le composant ComponentSet permet de regrouper plusieurs composants ensemble. Permet d'am\xe9liorer la s\xe9mantique d'un formulaire et peut ensuite \xeatre stylis\xe9 pour mieux mettre en avant un groupement de champs.",source:"@site/docs/components/aggregators/componentSet.mdx",sourceDirName:"components/aggregators",slug:"/components/aggregators/componentSet",permalink:"/Lunatic/docs/components/aggregators/componentSet",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/aggregators/componentSet.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"RosterForLoop",permalink:"/Lunatic/docs/components/aggregators/rosterForLoop"},next:{title:"Roundabout",permalink:"/Lunatic/docs/components/aggregators/roundabout"}},c={},m=[];function d(e){const t={h1:"h1",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"componentset",children:"ComponentSet"}),"\n",(0,o.jsxs)(t.p,{children:["Le composant ",(0,o.jsx)(t.strong,{children:"ComponentSet"})," permet de regrouper plusieurs composants ensemble. Permet d'am\xe9liorer la s\xe9mantique d'un formulaire et peut ensuite \xeatre stylis\xe9 pour mieux mettre en avant un groupement de champs."]}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:"components"}),", tableau contenant les composants enfant"]}),"\n"]}),"\n","\n",(0,o.jsx)(a.t,{type:"ComponentComponentSetType"}),"\n","\n","\n",(0,o.jsx)(s.U,{source:l})]})}function g(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},86436:(e,t,n)=>{n.d(t,{t:()=>r});var o=n(85893);function r(e){let{type:t}=e;const n=`https://github.com/search?q=repo%3AInseeFr%2FLunatic+%22export+type+${t}%22&type=code`;return(0,o.jsxs)("a",{className:"button button--secondary",style:{display:"inline-flex",alignItems:"center",gap:".3rem"},href:n,target:"_blank",rel:"noopener noreferrer",children:["Voir le type",(0,o.jsx)("svg",{width:"13.5",height:"13.5","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",children:(0,o.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})}}}]);