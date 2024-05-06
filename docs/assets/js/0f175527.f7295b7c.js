"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6298],{4441:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>u,frontMatter:()=>r,metadata:()=>t,toc:()=>a});var s=i(4848),l=i(8453);const r={},d=void 0,t={type:"mdx",permalink:"/Lunatic/docs/changelog",source:"@site/src/pages/changelog.mdx",description:"3.0.0",frontMatter:{},unlisted:!1},o={},a=[{value:"3.0.0",id:"300",level:3},{value:"Nouvelles fonctionnalit\xe9s",id:"nouvelles-fonctionnalit\xe9s",level:4},{value:"Correction de bugs",id:"correction-de-bugs",level:4},{value:"Refactorisation",id:"refactorisation",level:4},{value:"Build",id:"build",level:4},{value:"2.7.23",id:"2723",level:3},{value:"2.7.22",id:"2722",level:3},{value:"2.7.4",id:"274",level:3},{value:"2.7.3",id:"273",level:3},{value:"2.7.2",id:"272",level:3},{value:"2.7.0",id:"270",level:3}];function c(e){const n={a:"a",code:"code",del:"del",h3:"h3",h4:"h4",li:"li",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h3,{id:"300",children:"3.0.0"}),"\n",(0,s.jsx)(n.h4,{id:"nouvelles-fonctionnalit\xe9s",children:"Nouvelles fonctionnalit\xe9s"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Pairwise : Les liens sym\xe9triques sont d\xe9duits et seulement affich\xe9s."}),"\n",(0,s.jsx)(n.li,{children:"Overview : R\xe9organisation du syst\xe8me d'overview avec prise en charge des boucles et ajout d'une propri\xe9t\xe9 current."}),"\n",(0,s.jsxs)(n.li,{children:["Suggester","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Changement du moteur d'indexation et de recherche en utilisant la librairie ",(0,s.jsx)(n.a,{href:"https://lucaong.github.io/minisearch/",children:"minisearch"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Il est maintenant possible d'ajouter une option arbitraire."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:'Checkbox : Ajout de l\'option "autre" dans les questions \xe0 choix unique/multiple'}),"\n",(0,s.jsx)(n.li,{children:"Ajout du support du type TXT pour les labels (sans expression VTL)."}),"\n",(0,s.jsxs)(n.li,{children:["Cr\xe9ation d'un composant ",(0,s.jsx)(n.code,{children:"Question"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Cr\xe9ation d'un composant ",(0,s.jsx)(n.code,{children:"Text"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"La feuille de style CSS de la librairie n'est plus import\xe9e par d\xe9faut."}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"correction-de-bugs",children:"Correction de bugs"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"RosterForLoop : Il \xe9tait possible de supprimer plus de lignes que le minimum sp\xe9cifi\xe9."}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"refactorisation",children:"Refactorisation"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Nettoyage de tous les composants et simplification de la personnalisation."}),"\n",(0,s.jsxs)(n.li,{children:["Correction de la faute d'orthographe sur l'\xe9tat INPUTTED (",(0,s.jsx)(n.del,{children:"INPUTED"}),") des variables."]}),"\n",(0,s.jsx)(n.li,{children:"Typage plus pr\xe9cis du num\xe9ro de page (pager & pageTag)."}),"\n",(0,s.jsxs)(n.li,{children:["Refactorisation des diff\xe9rents reducers, changement de handleChange pour handleChange",(0,s.jsx)(n.strong,{children:"s"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"build",children:"Build"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Suppression de Babel et Webpack pour le build, publication en ESM seulement (le build en CJS posait des probl\xe8mes \xe0 cause de l'utilisation d'ANTLR4 publi\xe9 en ESM seulement)."}),"\n",(0,s.jsx)(n.li,{children:"Mise \xe0 jour globale des d\xe9pendances."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"2723",children:"2.7.23"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"hasPageResponse retourne false lorsque toutes les r\xe9ponses d'une checkbox sont d\xe9coch\xe9es."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"2722",children:"2.7.22"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"duration: le nombre d'heure max est 99"}),"\n",(0,s.jsx)(n.li,{children:"Correction de la dimension de variable calcul\xe9es"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"274",children:"2.7.4"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Capture les erreurs en cas d'expression VTL invalide"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"273",children:"2.7.3"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Changement de la r\xe9solution des chemins des workers"}),"\n",(0,s.jsxs)(n.li,{children:["Ajout de la commande ",(0,s.jsx)(n.code,{children:"npx @inseefr/lunatic workers"})," pour copier les fichiers li\xe9s aux workers"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"272",children:"2.7.2"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Datepicker utilise maintenant 3 champs au lieu du champ natif"}),"\n",(0,s.jsx)(n.li,{children:"Limite les valeurs dans le champ dur\xe9e"}),"\n",(0,s.jsx)(n.li,{children:"Mise \xe0 jour storybook (version 7)"}),"\n",(0,s.jsx)(n.li,{children:"GLOBAL_ITERATION_INDEX est maintenant un entier"}),"\n",(0,s.jsx)(n.li,{children:"fix: Propri\xe9t\xe9s d\xe9bordant sur les composants enfant d'un RosterForLoop"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"270",children:"2.7.0"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Changement interne du syst\xe8me de stockage de variable et d'\xe9x\xe9cution d'expression VTL."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}}}]);