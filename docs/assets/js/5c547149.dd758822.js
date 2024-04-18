"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9731],{37037:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>u});var r=t(85893),o=t(11151);const s={},c="Afficher le formulaire",i={id:"components/lunatic-components",title:"Afficher le formulaire",description:"Le hook useLunatic() renvoie une m\xe9thode getComponents() qui permet de r\xe9cup\xe9rer les composants \xe0 afficher dans l'application. Cette m\xe9thode renvoie un tableau contenant les propri\xe9t\xe9s des diff\xe9rents composants et c'est \xe0 l'orchestrateur de g\xe9rer leur affichage en utilisant la propri\xe9t\xe9 componentType pour s\xe9lectionner le bon composant.",source:"@site/docs/components/lunatic-components.mdx",sourceDirName:"components",slug:"/components/lunatic-components",permalink:"/Lunatic/docs/components/lunatic-components",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/lunatic-components.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Personnalisation",permalink:"/Lunatic/docs/hook/personnalisation"},next:{title:"Composants",permalink:"/Lunatic/docs/category/composants"}},a={},u=[];function l(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"afficher-le-formulaire",children:"Afficher le formulaire"}),"\n",(0,r.jsxs)(n.p,{children:["Le hook ",(0,r.jsx)(n.code,{children:"useLunatic()"})," renvoie une m\xe9thode ",(0,r.jsx)(n.code,{children:"getComponents()"})," qui permet de r\xe9cup\xe9rer les composants \xe0 afficher dans l'application. Cette m\xe9thode renvoie un tableau contenant les propri\xe9t\xe9s des diff\xe9rents composants et c'est \xe0 l'orchestrateur de g\xe9rer leur affichage en utilisant la propri\xe9t\xe9 ",(0,r.jsx)(n.code,{children:"componentType"})," pour s\xe9lectionner le bon composant."]}),"\n",(0,r.jsxs)(n.p,{children:["En plus du hook ",(0,r.jsx)(n.code,{children:"useLunatic()"}),", ",(0,r.jsx)(n.code,{children:"@inseefr/lunatic"})," offre une librairie de composant qui peut \xeatre utilis\xe9 pour le rendu. Pour ne pas avoir \xe0 boucler manuellement sur chaque \xe9l\xe9ment un composant ",(0,r.jsx)(n.a,{href:"https://github.com/InseeFr/Lunatic/pull/664",children:"LunaticComponents"})," est fourni et permet de se charger de l'affichage."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import {LunaticComponents, useLunatic} from \"@inseefr/lunatic\";\n\nfunction App () {\n  const {getComponents, Provider} = useLunatic(source, data, {initialPage: '1'})\n\n  return <Provider>\n    <LunaticComponents components={getComponents()}/>\n  </Provider>\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"Ce composant peut aussi recevoir des propri\xe9t\xe9s suppl\xe9mentaires afin d'ajouter des comportements plus pouss\xe9s :"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"componentProps"}),", est une fonction qui permet de passer des propri\xe9t\xe9s suppl\xe9mentaires \xe0 chaque composant"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"autoFocusKey"}),", est une chaine de caract\xe8re qui d\xe9clenche un focus du premier champ lorsque sa valeur change"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"wrapper"}),", permet de d\xe9finir un \xe9l\xe9ment qui va venir entourer chaque \xe9l\xe9ment du formulaire"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<LunaticComponents\n  autoFocusKey={pageTag}\n  components={components}\n  componentProps={({ storeName }) => ({\n\t  errors: currentErrors,\n\t  disabled: true,\n  })}\n  wrapper={({ children, id }) => (\n\t<div className="lunatic lunatic-component">{children}</div>\n  )}\n/>\n'})}),"\n",(0,r.jsx)(n.p,{children:"Le reste de l'interface (navigation, affichage des erreurs) est \xe0 la charge de l'orchestrateur."})]})}function p(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}}}]);