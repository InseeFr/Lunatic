import{r as b}from"./index-e67e0a49.js";const d="@inseefr/lunatic",u="2.7.4",m="0.3.0",y="Library of questionnaire components",k={type:"git",url:"https://github.com/InseeFr/Lunatic.git"},g="INSEE (http://www.insee.fr)",f=[{name:"Jonathan Boyer",email:"contact@grafikart.fr"},{name:"Laurent Caouissin",email:"laurent.caouissin@insee.fr"},{name:"Dylan Decrulle",email:"dylan.decrulle@insee.fr"},{name:"Renaud Genevois",email:"renaud.genevois@insee.fr"},{name:"Nicolas Laval",email:"nicolas.laval@insee.fr"}],v="MIT",h="lib/index.js",w="lib/src/index.d.ts",j=["lib","workers-release","scripts/build/workers-paths.js","scripts/build/add-workers-to-public.js"],x={test:"vitest run","test:e2e":"playwright test","test:e2e:visual":"playwright test --headed --debug e2e/pairwise.spec.ts","test:e2e:codegen":"playwright codegen http://localhost:9999/iframe.html?viewMode=story&id=","test:storybook":"test-storybook --url http://localhost:9999 --maxWorkers=4 --no-cache","test-watch":"vitest",check:"tsc",lint:"eslint ./src","lint:check":"eslint . --ext .ts,.tsx",_format:"prettier **/*.{ts,tsx,json,md}",format:"npm run _format -- --write","format:check":"npm run _format -- --list-different","test-coverage":"vitest run --coverage","build-workers":"node ./scripts/build/build-workers.js","prepare-workers":"npm run build-workers && node ./scripts/build/add-workers-to-public.js",postinstall:"node ./scripts/build/add-workers-to-public.js",build:'babel src --out-dir lib --extensions ".ts,.js,.tsx,.jsx" --copy-files && tsc --project tsconfig.prod.json && npm run build-workers',storybook:"npm run prepare-workers && storybook dev -p 9999 --no-open","build-storybook":"npm run prepare-workers && storybook build"},_={workers:"./scripts/build/add-workers-to-public.js"},E=["react","component","react-component","library"],R={"@inseefr/trevas":"^0.1.20","@inseefr/vtl-2.0-antlr-tools":"^0.1.0-bundle",antlr4:"4.11.0",classnames:"^2.3.1","date-fns":"^2.25.0","lodash.camelcase":"^4.3.0","lodash.debounce":"^4.0.8","lodash.isequal":"^4.5.0","object-hash":"^2.2.0","prop-types":"^15.7.2","react-keyboard-event-handler":"^1.5.4","react-markdown":"^8.0.3","react-number-format":"^5.1.3","react-tooltip":"^4.2.15","remove-accents":"^0.4.2",sass:"^1.58.3",snowball:"^0.3.1","string-tokenizer":"^0.0.8"},C={"@storybook/react-docgen-typescript-plugin":"1.0.6--canary.9.cd77847.0",jackspeak:"2.1.1"},D={"@babel/cli":"^7.18.6","@babel/core":"^7.18.6","@babel/plugin-proposal-class-properties":"^7.7.4","@babel/plugin-proposal-object-rest-spread":"^7.20.7","@babel/plugin-proposal-private-methods":"^7.18.6","@babel/plugin-proposal-private-property-in-object":"^7.18.6","@babel/plugin-syntax-dynamic-import":"^7.7.4","@babel/plugin-transform-modules-commonjs":"^7.9.0","@babel/plugin-transform-react-jsx":"^7.9.0","@babel/plugin-transform-runtime":"^7.15.0","@babel/preset-env":"^7.9.5","@babel/preset-react":"^7.9.0","@babel/preset-typescript":"^7.18.6","@emotion/react":"^11.9.3","@emotion/styled":"^11.9.3","@mui/material":"^5.8.6","@playwright/test":"^1.30.0","@storybook/addon-a11y":"^7.4.6","@storybook/addon-actions":"^7.4.6","@storybook/addon-essentials":"^7.4.6","@storybook/addon-interactions":"^7.4.6","@storybook/addon-links":"^7.4.6","@storybook/addon-mdx-gfm":"^7.4.6","@storybook/addon-onboarding":"^1.0.8","@storybook/blocks":"^7.4.6","@storybook/jest":"^0.2.3","@storybook/react":"^7.4.6","@storybook/react-vite":"^7.4.6","@storybook/react-webpack5":"^7.4.6","@storybook/test-runner":"^0.13.0","@storybook/testing-library":"^0.2.2","@testing-library/react":"^14.0.0","@testing-library/react-hooks":"^8.0.1","@types/object-hash":"^2.2.0","@types/react":"^18.0.26","@types/react-dom":"^18.0.9","@types/react-keyboard-event-handler":"^1.5.2","@typescript-eslint/eslint-plugin":"^5.57.0","@typescript-eslint/parser":"^5.48.2","@vitejs/plugin-react":"^3.0.0","@vitest/coverage-c8":"^0.27.2","babel-eslint":"^10.0.3","babel-loader":"^8.0.6",concurrently:"^7.6.0","core-js":"^3.17.3","cross-env":"^7.0.2","css-loader":"^5.0.0","damerau-levenshtein":"^1.0.7",eslint:"7.30.0","eslint-config-prettier":"^7.2.0","eslint-config-react-app":"^6.0.0","eslint-plugin-flowtype":"^5.2.0","eslint-plugin-import":"^2.19.1","eslint-plugin-jsx-a11y":"^6.1.1","eslint-plugin-react":"^7.17.0","eslint-plugin-react-hooks":"^4.0.8","eslint-plugin-storybook":"^0.6.15","file-loader":"^6.2.0","http-server":"^14.1.1","identity-obj-proxy":"^3.0.0",jest:"^29.4.3",jsdom:"^21.1.0","jsdom-global":"^3.0.2",postcss:"^8.2.6","postcss-scss":"^3.0.4",prettier:"^2.0.5",react:"^18.0.0","react-dom":"^18.0.0","regenerator-runtime":"^0.13.7","remove-accents":"^0.4.2","rxjs-marbles":"^6.0.1","sass-loader":"^13.2.0","source-map-explorer":"^2.4.2",storybook:"^7.4.6","ts-loader":"^9.4.2",typescript:"^5.1.6",vite:"^4.0.0",vitest:"^0.27.2","vitest-dom":"^0.1.1","wait-on":"^7.0.1",webpack:"^5.75.0","webpack-cli":"^5.0.0"},O={access:"public"},I={singleQuote:!0,semi:!0,useTabs:!0,bracketSpacing:!0,trailingComma:"es5"},L={react:"^18.0.0"},S={extends:["plugin:storybook/recommended"]},M={name:d,version:u,workersVersion:m,description:y,repository:k,author:g,contributor:f,license:v,main:h,types:w,files:j,scripts:x,bin:_,keywords:E,dependencies:R,resolutions:C,devDependencies:D,publishConfig:O,prettier:I,peerDependencies:L,eslintConfig:S};var c={exports:{}},o={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var F=b,N=Symbol.for("react.element"),T=Symbol.for("react.fragment"),P=Object.prototype.hasOwnProperty,q=F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,B={key:!0,ref:!0,__self:!0,__source:!0};function p(s,e,a){var t,r={},n=null,l=null;a!==void 0&&(n=""+a),e.key!==void 0&&(n=""+e.key),e.ref!==void 0&&(l=e.ref);for(t in e)P.call(e,t)&&!B.hasOwnProperty(t)&&(r[t]=e[t]);if(s&&s.defaultProps)for(t in e=s.defaultProps,e)r[t]===void 0&&(r[t]=e[t]);return{$$typeof:N,type:s,key:n,ref:l,props:r,_owner:q.current}}o.Fragment=T;o.jsx=p;o.jsxs=p;c.exports=o;var i=c.exports;const U=i.Fragment,V=i.jsx,W=i.jsxs;export{U as F,W as a,V as j,M as p,u as v};
//# sourceMappingURL=jsx-runtime-6809449a.js.map
