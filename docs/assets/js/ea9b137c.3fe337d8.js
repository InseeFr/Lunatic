"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8188],{6099:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>E,default:()=>D,frontMatter:()=>T,metadata:()=>c,toc:()=>u});var a=t(85893),l=t(11151),i=t(86436);const r=JSON.parse('{"components":[{"componentType":"Input","label":{"value":"\\"Pr\xe9nom de l\'occupant principal.\\"","type":"VTL|MD"},"conditionFilter":{"value":"true","type":"VTL"},"maxLength":30,"id":"name","response":{"name":"PRENOM"},"declarations":[{"id":"kb9hi4j0-krnoclfe","declarationType":"INSTRUCTION","position":"BEFORE_QUESTION_TEXT","label":{"value":"\\"BEFORE_QUESTION_TEXT\\"","type":"VTL|MD"}},{"id":"jruq5os5-kqhuxnyt","declarationType":"COMMENT","position":"AFTER_QUESTION_TEXT","label":{"value":"\\"AFTER_QUESTION_TEXT\\"","type":"VTL|MD"}},{"id":"jruq5os5-kqhuxnyt","declarationType":"HELP","position":"AFTER_RESPONSE","label":{"value":"\\"AFTER_RESPONSE\\"","type":"VTL|MD"}},{"id":"jruq5os5-kqhuxnyt","declarationType":"CODECARD","position":"DETACHABLE","label":{"value":"\\"DETACHABLE\\"","type":"VTL|MD"}}]}],"variables":[{"variableType":"COLLECTED","name":"NOM","componentRef":"name","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTED":null}},{"variableType":"COLLECTED","name":"PRENOM","componentRef":"name","values":{"PREVIOUS":null,"COLLECTED":null,"FORCED":null,"EDITED":null,"INPUTED":null}}]}');var s=t(55094);const o=JSON.parse('{"variables":[{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"COMMENT_QE"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"TESTSURBOO"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"TESTTEXTE"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"TESTCODE"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"TESTDATEA"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"TESTDATEB"},{"variableType":"COLLECTED","values":{"COLLECTED":null,"EDITED":null,"INPUTED":null,"FORCED":null,"PREVIOUS":null},"name":"TESTDATEC"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_TESTSURBOO","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_TESTTEXTE","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_TESTCODE","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_TESTDATEA","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_TESTDATEB","inFilter":"false"},{"variableType":"CALCULATED","expression":{"type":"VTL","value":"true"},"name":"FILTER_RESULT_TESTDATEC","inFilter":"false"}],"components":[{"componentType":"Sequence","hierarchy":{"sequence":{"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}},{"componentType":"CheckboxBoolean","bindingDependencies":["TESTSURBOO"],"controls":[{"bindingDependencies":["TESTSURBOO"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"booleen pas coch\xe9 et on affiche un message un peu long histoire de tester le truc \\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(nvl(TESTSURBOO,false) = false)"},"id":"kfxmjupm-CI-0"},{"bindingDependencies":["TESTSURBOO"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"On a coch\xe9 le booleen et on met une phrase un peu longue car on veut tester ce qui s\u2019affiche\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(nvl(TESTSURBOO,false) = true)"},"id":"kfxmjupm-CI-1"}],"response":{"name":"TESTSURBOO"},"hierarchy":{"sequence":{"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"id":"kfxmjupm","page":"2","label":{"type":"VTL|MD","value":"\\"\u27a1 1. \\" || \\"Controle sur booleen\\""},"mandatory":false},{"componentType":"Input","bindingDependencies":["TESTTEXTE"],"controls":[{"bindingDependencies":["TESTTEXTE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"a ne peut pas valoir BLABLA\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(nvl(TESTTEXTE,\\"\\") = \\"BLABLA\\")"},"id":"kfxn6f16-CI-0"},{"bindingDependencies":["TESTTEXTE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"Cette phrase un peu longue s\u2019affiche si on a du vide pour la variable sur le texte inf\xe9rieur \xe0 255 caract\xe8res et voil\xe0\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(isnull(TESTTEXTE))"},"id":"kfxn6f16-CI-1"}],"response":{"name":"TESTTEXTE"},"hierarchy":{"sequence":{"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"id":"kfxn6f16","page":"3","label":{"type":"VTL|MD","value":"\\"\u27a1 2. \\" || \\"Controle sur du texte < 255\\""},"mandatory":false,"maxLength":15,"declarations":[{"declarationType":"INSTRUCTION","id":"kfxn6f16-kfxn36ru","label":{"type":"VTL|MD","value":"\\"Tester la saisie de BLABLA\\""},"position":"AFTER_QUESTION_TEXT"}]},{"componentType":"CheckboxOne","bindingDependencies":["TESTCODE"],"controls":[{"bindingDependencies":["TESTCODE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"La variable vaut 1\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(nvl(TESTCODE,\\"\\") = \\"1\\")"},"id":"kfxn91jl-CI-0"},{"bindingDependencies":["TESTCODE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"La variable ne vaut pas 1  et n\u2019est  pas vide\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(nvl(TESTCODE,\\"\\") <> \\"1\\" and not(isnull(TESTCODE)))"},"id":"kfxn91jl-CI-1"},{"bindingDependencies":["TESTCODE"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"La variable est vide\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(isnull(TESTCODE))"},"id":"kfxn91jl-CI-2"}],"response":{"name":"TESTCODE"},"hierarchy":{"sequence":{"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}}},"options":[{"label":{"type":"VTL|MD","value":"Code 1"},"value":"1"},{"label":{"type":"VTL|MD","value":"Code 2"},"value":"2"},{"label":{"type":"VTL|MD","value":"Code 3"},"value":"3"}],"conditionFilter":{"type":"VTL","value":"true"},"id":"kfxn91jl","page":"4","label":{"type":"VTL|MD","value":"\\"\u27a1 3. \\" || \\"Controle sur code\\""},"mandatory":false,"declarations":[{"declarationType":"INSTRUCTION","id":"kfxn91jl-kfxn7ugm","label":{"type":"VTL|MD","value":"\\"Tester cocher 1, ne rien cocher, cocher 2\\""},"position":"AFTER_QUESTION_TEXT"}]},{"componentType":"Datepicker","controls":[{"criticality":"ERROR","errorMessage":{"type":"VTL|MD","value":"\\"La date saisie doit \xeatre comprise entre 1990-12-31 et 2040-12-31.\\""},"typeOfControl":"FORMAT","control":{"type":"VTL","value":"not(not(isnull(TESTDATEA)) and (cast(TESTDATEA, date, \\"YYYY-MM-DD\\")>cast(\\"2040-12-31\\", date, \\"YYYY-MM-DD\\") or cast(TESTDATEA, date, \\"YYYY-MM-DD\\")<cast(\\"1990-12-31\\", date, \\"YYYY-MM-DD\\")))"},"id":"kfxnfv4l-formatborne"},{"bindingDependencies":["TESTDATEA"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"Date sup\xe9rieure \xe0 date du jour\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(cast(TESTDATEA,date,\\"YYYY-MM-DD\\") > cast(current_date(), date, \\"YYYY-MM-DD\\"))"},"id":"kfxnfv4l-CI-0"}],"max":"2040-12-31","dateFormat":"YYYY-MM-DD","hierarchy":{"sequence":{"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"label":{"type":"VTL|MD","value":"\\"\u27a1 4. \\" || \\"Controle sur date AAAA-MM-JJ (saisie entre 31/12/1990 et 31/12/2040)\\""},"mandatory":false,"declarations":[{"declarationType":"INSTRUCTION","id":"kfxnfv4l-kfxnywlg","label":{"type":"VTL|MD","value":"saisir une date > date du jour"},"position":"AFTER_QUESTION_TEXT"},{"declarationType":"HELP","id":"kfxnfv4l-kzgvf7oe","label":{"type":"VTL|MD","value":"cast(TESTDATEA,string)"},"position":"AFTER_QUESTION_TEXT"}],"bindingDependencies":["TESTDATEA"],"min":"1990-12-31","response":{"name":"TESTDATEA"},"id":"kfxnfv4l","page":"5"},{"componentType":"Datepicker","controls":[{"criticality":"ERROR","errorMessage":{"type":"VTL|MD","value":"\\"La date saisie doit \xeatre comprise entre 2010-01 et 2030-12.\\""},"typeOfControl":"FORMAT","control":{"type":"VTL","value":"not(not(isnull(TESTDATEB)) and (cast(TESTDATEB, date, \\"YYYY-MM\\")>cast(\\"2030-12\\", date, \\"YYYY-MM\\") or cast(TESTDATEB, date, \\"YYYY-MM\\")<cast(\\"2010-01\\", date, \\"YYYY-MM\\")))"},"id":"kfxnqc6m-formatborne"},{"bindingDependencies":["TESTDATEB"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"La date est sup\xe9rieure au 12 2010\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(TESTDATEB != \'\' and TESTDATEB > \'2010-12\')"},"id":"kfxnqc6m-CI-0"}],"max":"2030-12","dateFormat":"YYYY-MM","hierarchy":{"sequence":{"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"label":{"type":"VTL|MD","value":"\\"\u27a1 5. \\" || \\"Controle sur date AAAA-MM (manque lunatic)\\""},"mandatory":false,"declarations":[{"declarationType":"INSTRUCTION","id":"kfxnqc6m-kfxni8ox","label":{"type":"VTL|MD","value":"Date entre 01-2010 et 12-2030"},"position":"AFTER_QUESTION_TEXT"}],"bindingDependencies":["TESTDATEB"],"min":"2010-01","response":{"name":"TESTDATEB"},"id":"kfxnqc6m","page":"6"},{"componentType":"Datepicker","controls":[{"criticality":"ERROR","errorMessage":{"type":"VTL|MD","value":"\\"La date saisie doit \xeatre comprise entre 2010 et 2030.\\""},"typeOfControl":"FORMAT","control":{"type":"VTL","value":"not(not(isnull(TESTDATEC)) and (cast(TESTDATEC, date, \\"YYYY\\")>cast(\\"2030\\", date, \\"YYYY\\") or cast(TESTDATEC, date, \\"YYYY\\")<cast(\\"2010\\", date, \\"YYYY\\")))"},"id":"kfxnk34d-formatborne"},{"bindingDependencies":["TESTDATEC"],"criticality":"WARN","errorMessage":{"type":"VTL|MD","value":"\\"La date est sup\xe9rieure a 2020\\""},"typeOfControl":"CONSISTENCY","control":{"type":"VTL","value":"not(TESTDATEC > \'2020\' and TESTDATEC != \'\')"},"id":"kfxnk34d-CI-0"}],"max":"2030","dateFormat":"YYYY","hierarchy":{"sequence":{"id":"kfxmfvwj","page":"1","label":{"type":"VTL|MD","value":"\\"I - \\" || \\"TEST SUR BOOLEEN CODE DATE ET TEXTE\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"label":{"type":"VTL|MD","value":"\\"\u27a1 6. \\" || \\"Controle sur date AAAA (si sup\xe9rieur \xe0 2020) manque lunatic\\""},"mandatory":false,"declarations":[{"declarationType":"INSTRUCTION","id":"kfxnk34d-kfxnk172","label":{"type":"VTL|MD","value":"saisir une date > 2020"},"position":"AFTER_QUESTION_TEXT"}],"bindingDependencies":["TESTDATEC"],"min":"2010","response":{"name":"TESTDATEC"},"id":"kfxnk34d","page":"7"},{"componentType":"Sequence","hierarchy":{"sequence":{"id":"COMMENT-SEQ","page":"8","label":{"type":"VTL|MD","value":"\\"Commentaire\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"id":"COMMENT-SEQ","page":"8","label":{"type":"VTL|MD","value":"\\"Commentaire\\""}},{"componentType":"Textarea","bindingDependencies":["COMMENT_QE"],"response":{"name":"COMMENT_QE"},"hierarchy":{"sequence":{"id":"COMMENT-SEQ","page":"8","label":{"type":"VTL|MD","value":"\\"Commentaire\\""}}},"conditionFilter":{"type":"VTL","value":"true"},"id":"COMMENT-QUESTION","page":"9","label":{"type":"VTL|MD","value":"\\"Avez-vous des remarques concernant l\'enqu\xeate ou des commentaires ?\\""},"mandatory":false,"maxLength":2000}],"pagination":"question","lunaticModelVersion":"2.2.14-rc","modele":"QTESTCONTNONNUM","enoCoreVersion":"2.3.10-controls-type","generatingDate":"06-09-2022 13:01:32","missing":false,"id":"kzguw1v7","label":{"type":"VTL|MD","value":"QNONREG Controles Non Num\xe9riques VTL"},"maxPage":"9"}'),T={},E="Propri\xe9t\xe9s de base",c={id:"components/base",title:"Propri\xe9t\xe9s de base",description:"Les champs qui composent un formulaire Lunatic sont d\xe9finis dans la propri\xe9t\xe9 components du fichier source JSON. Certaines propri\xe9t\xe9s sont communes \xe0 tous les composants :",source:"@site/docs/components/base.mdx",sourceDirName:"components",slug:"/components/base",permalink:"/Lunatic/docs/components/base",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Lunatic/tree/2.7/docs/docs/components/base.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Composants",permalink:"/Lunatic/docs/category/composants"},next:{title:"Balisage",permalink:"/Lunatic/docs/category/balisage"}},p={},u=[{value:"D\xe9clarations <GoToType></GoToType>",id:"d\xe9clarations-",level:2},{value:"Contr\xf4les <GoToType></GoToType>",id:"contr\xf4les-",level:2}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"propri\xe9t\xe9s-de-base",children:"Propri\xe9t\xe9s de base"}),"\n","\n",(0,a.jsxs)(n.p,{children:["Les champs qui composent un formulaire Lunatic sont d\xe9finis dans la propri\xe9t\xe9 ",(0,a.jsx)(n.code,{children:"components"})," du fichier source JSON. Certaines propri\xe9t\xe9s sont communes \xe0 tous les composants :"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"label"}),", permet de d\xe9finir le libell\xe9 affich\xe9 au-dessus du champ"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"description"}),", permet de d\xe9finir un texte \xe0 afficher sous le libell\xe9"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"conditionFilter"}),", permet de d\xe9finir une condition d'affichage (sous forme d'expression VTL) qui devra renvoyer ",(0,a.jsx)(n.code,{children:"true"})," pour que le composant soit affich\xe9 lorsque l'on navigue sur la bonne page."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"id"}),", clef unique permettant d'identifier le champ"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"bindingDependencies"}),", liste des variables qui affectent la pr\xe9sentation des champs"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"mandatory"}),", pr\xe9cise si le champ doit \xeatre rempli par l'utilisateur (optionnel, se traduit par l'attribut ",(0,a.jsx)(n.code,{children:"required"})," au niveau HTML)"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"page"}),", page dans lequel le champ doit \xeatre pr\xe9sent\xe9"]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Pour les composants qui permettent une entr\xe9e utilisateur des propri\xe9t\xe9s suppl\xe9mentaires sont disponibles :"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"response"}),", objet avec une propri\xe9t\xe9 ",(0,a.jsx)(n.code,{children:"name"})," permettant de d\xe9finir dans quelle variable sera sauvegard\xe9e la valeur associ\xe9e (exemple ",(0,a.jsx)(n.code,{children:'{"name": "PRENOM"}'}),")"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"readOnly"}),", permet de mettre le champ en lecture seul (optionnel, expression VTL)."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"disabled"}),", permet de d\xe9sactiver le champ (il n'est plus focusable) (optionnel, expression VTL)."]}),"\n"]}),"\n",(0,a.jsx)(i.t,{type:"ComponentTypeBase"}),"\n",(0,a.jsxs)(n.h2,{id:"d\xe9clarations-",children:["D\xe9clarations ",(0,a.jsx)(i.t,{type:"DeclarationType"})]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"declarations"}),", permettent d'ajouter du texte autour des composants."]}),"\n"]}),"\n",(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsx)(n.p,{children:'La d\xe9claration AFTER_QUESTION_TEXT est d\xe9pr\xe9ci\xe9e au profit du champs "description"'})}),"\n","\n",(0,a.jsx)(s.U,{source:r}),"\n",(0,a.jsxs)(n.h2,{id:"contr\xf4les-",children:["Contr\xf4les ",(0,a.jsx)(i.t,{type:"ControlType"})]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"controls"}),", d\xe9finit les contr\xf4les de validation \xe0 effectuer sur la valeur des champs."]}),"\n"]}),"\n",(0,a.jsx)(n.admonition,{type:"info",children:(0,a.jsxs)(n.p,{children:["Les contr\xf4les n'ont aucun effet dans Lunatic directement, c'est \xe0 l'orchestrateur d'agir comme il le souhaite en utilisant la m\xe9thode ",(0,a.jsx)(n.code,{children:"compileControls()"}),"."]})}),"\n","\n","\n",(0,a.jsx)(s.U,{source:o})]})}function D(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},86436:(e,n,t)=>{t.d(n,{t:()=>l});var a=t(85893);function l(e){let{type:n}=e;const t=`https://github.com/search?q=repo%3AInseeFr%2FLunatic+%22export+type+${n}%22&type=code`;return(0,a.jsxs)("a",{className:"button button--secondary",style:{display:"inline-flex",alignItems:"center",gap:".3rem"},href:t,target:"_blank",rel:"noopener noreferrer",children:["Voir le type",(0,a.jsx)("svg",{width:"13.5",height:"13.5","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",children:(0,a.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})}}}]);