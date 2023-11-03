const n=async t=>{switch(t){case"naf-rev2-stop":case"naf-rev2":return fetch("https://inseefr.github.io/Lunatic/storybook/naf-rev2.json").then(e=>e.json());case"cog-communes":return fetch("https://inseefr.github.io/Lunatic/storybook/communes-2019.json").then(e=>e.json());default:throw new Error(`Unkonw référentiel ${t}`)}};export{n as g};
//# sourceMappingURL=referentiel-844c1130.js.map
