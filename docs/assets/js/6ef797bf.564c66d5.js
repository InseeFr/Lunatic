"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3861],{2808:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=t(4848),s=t(8453);const r={},a="\xc9tat & Reducer",o={id:"internal/reducer",title:"\xc9tat & Reducer",description:"Cette partie est destin\xe9e aux personnes qui explorent le code de Lunatic. L'objectif est d'offrir une version g\xe9n\xe9raliste du fonctionnement de la biblioth\xe8que.",source:"@site/docs/internal/reducer.mdx",sourceDirName:"internal",slug:"/internal/reducer",permalink:"/Lunatic/docs/internal/reducer",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/3.0/docs/docs/internal/reducer.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Fonctionnement interne",permalink:"/Lunatic/docs/category/fonctionnement-interne"},next:{title:"Resizing",permalink:"/Lunatic/docs/internal/resizing"}},l={},c=[{value:"Le reducer",id:"le-reducer",level:2},{value:"Initialisation",id:"initialisation",level:3},{value:"Navigation",id:"navigation",level:3},{value:"Changement de valeurs",id:"changement-de-valeurs",level:3},{value:"G\xe9n\xe9ration des composants",id:"g\xe9n\xe9ration-des-composants",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"\xe9tat--reducer",children:"\xc9tat & Reducer"}),"\n",(0,i.jsx)(n.p,{children:"Cette partie est destin\xe9e aux personnes qui explorent le code de Lunatic. L'objectif est d'offrir une version g\xe9n\xe9raliste du fonctionnement de la biblioth\xe8que."}),"\n",(0,i.jsx)(n.h2,{id:"le-reducer",children:"Le reducer"}),"\n",(0,i.jsxs)(n.p,{children:["En son c\u0153ur Lunatic repose sur un syst\xe8me de reducer qui peut recevoir plusieurs actions. L'\xe9tat li\xe9 \xe0 ce reducer est ",(0,i.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/3.0/src/use-lunatic/type.ts#L90",children:"document\xe9 via un type TypeScript"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"initialisation",children:"Initialisation"}),"\n",(0,i.jsxs)(n.p,{children:["Cette action (",(0,i.jsx)(n.code,{children:"ActionKind.On_INIT"}),") est lanc\xe9e lorsque le composant utilisant ",(0,i.jsx)(n.code,{children:"useLunatic()"})," est mont\xe9 et permet d'effectuer plusieurs op\xe9rations pour initialiser les donn\xe9es qui vont servir pour la suite."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Boucle sur les variables d\xe9finies dans la source pour les sauvegarder dans un dictionnaire (",(0,i.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/3.0/src/use-lunatic/commons/variables/lunatic-variables-store.ts",children:"LunaticVariableStore"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"Extrait depuis les composants les diff\xe9rentes pages et cr\xe9e un objet contenant la liste des composants group\xe9 par nom de page."}),"\n",(0,i.jsxs)(n.li,{children:["D\xe9compose la valeur d'",(0,i.jsx)(n.strong,{children:"initialPage"})," pour g\xe9n\xe9rer l'objet qui repr\xe9sentera l'\xe9tat de la navigation (pager)."]}),"\n",(0,i.jsxs)(n.li,{children:["G\xe9n\xe8re une fonction ",(0,i.jsx)(n.code,{children:"executeExpression()"})," qui permettra d'ex\xe9cuter les expressions VTL"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"navigation",children:"Navigation"}),"\n",(0,i.jsxs)(n.p,{children:["Ces actions (",(0,i.jsx)(n.code,{children:"ActionKind.GO_PREVIOUS_PAGE"}),", ",(0,i.jsx)(n.code,{children:"ActionKind.GO_NEXT_PAGE"}),", ",(0,i.jsx)(n.code,{children:"ActionKind.GO_TO_PAGE"}),") sont d\xe9clench\xe9es par les ",(0,i.jsx)(n.a,{href:"../hook/navigation",children:"m\xe9thodes de navigation"}),". Lors de cette op\xe9ration un nouveau ",(0,i.jsx)(n.code,{children:"pager"})," va \xeatre calcul\xe9 en fonction de la position dans le formulaire. Cette action est appel\xe9 avec les donn\xe9es suivantes :"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"name"}),", nom de la variable modifi\xe9e"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"value"}),", nouvelle valeur"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"iteration"}),", l'it\xe9ration sur laquelle on se trouve (cette it\xe9ration est repr\xe9sent\xe9e sous forme d'un tableau, car dans le cas du ",(0,i.jsx)(n.a,{href:"../components/aggregators/pairwise",children:"PairWise"})," il y a 2 niveaux de profondeur)"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"changement-de-valeurs",children:"Changement de valeurs"}),"\n",(0,i.jsxs)(n.p,{children:["Cette action (",(0,i.jsx)(n.code,{children:"ActionKind.HANDLE_CHANGES"}),") est d\xe9clench\xe9e lorsque l'utilisateur modifie une ou plusieurs valeurs dans le formulaire. Lors de cette op\xe9ration les valeurs chang\xe9es vont \xeatre enregistr\xe9es par le dictionnaire."]}),"\n",(0,i.jsx)(n.h2,{id:"g\xe9n\xe9ration-des-composants",children:"G\xe9n\xe9ration des composants"}),"\n",(0,i.jsxs)(n.p,{children:["Lorsque l'\xe9tat change Lunatic va r\xe9g\xe9n\xe9rer la liste des composants \xe0 afficher. Cette g\xe9n\xe9ration se fait au travers de la fonction ",(0,i.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/3.0/src/use-lunatic/commons/get-components-from-state.ts#L6",children:(0,i.jsx)(n.code,{children:"getComponentsFromState()"})})," qui prendra l'\xe9tat en param\xe8tre et renverra la liste des composants (de leurs propri\xe9t\xe9s). Pour comprendre comment se passe ce remplissage, vous pouvez regarder le code de la m\xe9thode ",(0,i.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/blob/3.0/src/use-lunatic/commons/fill-components/fill-components.ts#L59-L69",children:"fillComponent"})," qui s\xe9pare la logique."]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);