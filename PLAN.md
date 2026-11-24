# Plan d'Intégration de CEL dans le Moteur de Variables Lunatic

> **Objectif** : Étendre le moteur de variables Lunatic pour supporter **CEL (Common Expression Language)** en plus de **VTL**, en utilisant le champ `type` des expressions.

> **Contexte** : Le système actuel utilise **VTL** pour les expressions calculées. Chaque variable calculée a une **expression** avec un champ `type` (ex: `'VTL'`, `'CEL'`, `'TXT'`).

> **Public Cible** : Développeurs Lunatic, IA, et contributeurs futurs.

---


> **Note sur `CEL|MD` et `VTL|MD`** : 
> Ces types permettent d'utiliser des expressions **CEL** ou **VTL** avec un **post-traitement markdown**. 
> Le markdown est géré côté React (ex: avec `react-markdown`), donc les évaluateurs `CEL|MD` et `VTL|MD` retournent simplement le résultat brut de l'expression. 
> Les composants React doivent détecter ces types et appliquer le rendu markdown.

## 📌 Sommaire
1. [Contexte et Objectifs](#-contexte-et-objectifs)
2. [Architecture Proposée](#-architecture-proposée)
3. [Étapes de Mise en Œuvre](#-étapes-de-mise-en-œuvre)
4. [Détails Techniques](#-détails-techniques)
5. [Gestion des Risques](#-gestion-des-risques)
6. [Tests et Validation](#-tests-et-validation)
7. [Documentation et Exemples](#-documentation-et-exemples)
8. [Annexes](#-annexes)

---

## 🎯 Contexte et Objectifs

### **Problématique**
Le moteur de variables Lunatic utilise actuellement **uniquement VTL** pour les expressions calculées. L'objectif est d'étendre ce moteur pour supporter **CEL** et potentiellement d'autres langages.

### **Contraintes**
1. **Typage des expressions** : Le type `Expression` inclut un champ `type` pour spécifier le langage (`'VTL'`, `'CEL'`, `'TXT'`, etc.).
2. **Coexistence des langages** : Une variable calculée en **VTL** peut dépendre d'une variable calculée en **CEL**, et vice versa.

### **Objectifs Principaux**
- **Support de CEL** : Permettre l'utilisation de CEL pour les expressions calculées.

- **Support de `CEL|MD` et `VTL|MD`** : Permettre l'utilisation d'expressions CEL/VTL avec un post-traitement markdown (géré côté React).

- **Compatibilité VTL** : Conserver le support de VTL sans rupture.
- **Extensibilité** : Architecture modulaire pour ajouter de nouveaux langages.

---

## 🏗️ Architecture Proposée

### **Diagramme Global**
```
LunaticVariablesStore
│
├── LunaticVariable
│   │
│   ├── expression: Expression (avec type: 'VTL' | 'CEL' | 'TXT')
│   │
│   ├── getValue() → ExpressionEvaluator.evaluate()
│   └── getDependencies() → ExpressionEvaluator.getDependencies()
│
└── ExpressionEvaluator (Singleton)
    │
    ├── evaluators: Map<ExpressionType, ExpressionLanguage>
    │

---

### **Phase 1 : Préparation (1 jour)**
| **Étape** | **Tâche** | **Fichiers** | **Durée** |
|-----------|-----------|--------------|-----------|
| 1.1 | Définir `ExpressionType` et `Expression` | `src/use-lunatic/commons/variables/expression-types.ts` | 0.5j |
| 1.2 | Créer `ExpressionLanguage` et `ExpressionEvaluationError` | `src/use-lunatic/commons/variables/expression-languages/expression-language.ts` | 0.5j |

### **Phase 2 : Implémentation des Évaluateurs (3 jours)**
| **Étape** | **Tâche** | **Fichiers** | **Durée** |
|-----------|-----------|--------------|-----------|
| 2.1 | Implémenter `VTLEvaluator` | `vtl-evaluator.ts` | 0.5j |
| 2.2 | Implémenter `CELEvaluator` | `cel-evaluator.ts` | 1.5j |
| 2.3 | Implémenter `TXTEvaluator` | `txt-evaluator.ts` | 0.5j |
| 2.4 | Créer `ExpressionEvaluator` | `expression-evaluator.ts` | 0.5j |

### **Phase 3 : Intégration avec `LunaticVariable` (3 jours)**
| **Étape** | **Tâche** | **Fichiers** | **Durée** |
|-----------|-----------|--------------|-----------|
| 3.1 | Modifier le constructeur pour accepter `Expression` | `lunatic-variables-store.ts` | 1j |
| 3.2 | Mettre à jour `getDependencies()` et `getValue()` | `lunatic-variables-store.ts` | 1.5j |
| 3.3 | Mettre à jour `getDependenciesValues()` | `lunatic-variables-store.ts` | 0.5j |

### **Phase 4 : Intégration avec `LunaticVariablesStore` (2 jours)**
| **Étape** | **Tâche** | **Fichiers** | **Durée** |
|-----------|-----------|--------------|-----------|
| 4.1 | Modifier `setCalculated` pour accepter `Expression` | `lunatic-variables-store.ts` | 1j |
| 4.2 | Mettre à jour `makeFromSource` | `lunatic-variables-store.ts` | 1j |

### **Phase 5 : Gestion des Erreurs (1 jour)**
| **Étape** | **Tâche** | **Fichiers** | **Durée** |
|-----------|-----------|--------------|-----------|
| 5.1 | Mettre à jour les erreurs pour `ExpressionEvaluationError` | `errors.ts` | 0.5j |
| 5.2 | Conserver la compatibilité avec `VTLInterpretationError` | `errors.ts` | 0.5j |

| 2.5 | Implémenter `VTLMDEvaluator` et `CELMDEvaluator` | `md-evaluator.ts` | 1j |


### **Phase 6 : Optimisations (2 jours)**
| **Étape** | **Tâche** | **Fichiers** | **Durée** | **Priorité** |
|-----------|-----------|--------------|-----------|--------------|
| 6.1 | Implémenter un parser CEL pour `getDependencies` | `cel-evaluator.ts` | 1j | ⭐⭐ |
| 6.2 | Optimiser CEL (cache des AST) | `cel-evaluator.ts` | 1j | ⭐⭐ |

### **Phase 7 : Tests (4 jours)**
| **Étape** | **Tâche** | **Fichiers** | **Durée** |
|-----------|-----------|--------------|-----------|
| 7.1 | Tests unitaires pour `ExpressionEvaluator` | `*.test.ts` | 1j |
| 7.2 | Tests unitaires pour `LunaticVariable` | `lunatic-variables-store.test.ts` | 1j |
| 7.3 | Tests d'intégration (dépendances trans-langages) | `integration.test.ts` | 1j |
| 7.4 | Valider la compatibilité ascendante | Tests existants | 1j |

### **Phase 8 : Documentation (2 jours)**

---

## 🔧 Détails Techniques

### **1. Types et Interfaces**

#### **`ExpressionType` et `Expression`**
**Fichier** : `src/use-lunatic/commons/variables/expression-types.ts`
```typescript
export type ExpressionType = 'VTL' | 'CEL' | 'TXT' | 'VTL|MD';
export type VariablesDependencies = Record<string, unknown>;
export type Expression = {
  value: string;
  bindingDependencies?: string[];
  variablesDependencies?: VariablesDependencies;
  type: ExpressionType;
};
```

#### **`ExpressionLanguage`**
**Fichier** : `src/use-lunatic/commons/variables/expression-languages/expression-language.ts`
```typescript
import type { Expression, ExpressionType } from '../expression-types';

export interface ExpressionLanguage {
  readonly type: ExpressionType;
  evaluate(expression: string, bindings: Record<string, unknown>): unknown;
  getDependencies(expression: string): string[];
}

export class ExpressionEvaluationError extends Error {
  constructor(
    public readonly expression: string,
    public readonly type: ExpressionType,
    public readonly bindings: Record<string, unknown>,
    public readonly cause?: Error
  ) {
    super(`Failed to evaluate ${type} expression: "${expression}". Cause: ${cause?.message}`);
    this.name = 'ExpressionEvaluationError';
  }
}
```

### **2. Implémentation des Évaluateurs**

#### **`VTLEvaluator`**
**Fichier** : `src/use-lunatic/commons/variables/expression-languages/vtl-evaluator.ts`
```typescript
import { ExpressionLanguage, ExpressionEvaluationError } from './expression-language';
import { interpretVTL, parseVTLVariables } from '../../../../utils/vtl';

export class VTLEvaluator implements ExpressionLanguage {
  readonly type = 'VTL' as const;
  evaluate(expression: string, bindings: Record<string, unknown>): unknown {
    try {
      return interpretVTL(expression, bindings);
    } catch (error) {
      throw new ExpressionEvaluationError(expression, this.type, bindings, error as Error);
    }
  }
  getDependencies(expression: string): string[] {
    return parseVTLVariables(expression);
  }
}
```

#### **`CELEvaluator`**
**Fichier** : `src/use-lunatic/commons/variables/expression-languages/cel-evaluator.ts`
```typescript
import { ExpressionLanguage, ExpressionEvaluationError } from './expression-language';
import { CEL } from '@google/cel-spec';

export class CELEvaluator implements ExpressionLanguage {
  readonly type = 'CEL' as const;
  private celEnv: any;
  private astCache: Map<string, any> = new Map();

  constructor() {
    this.celEnv = new CEL.Environment();
  }

  evaluate(expression: string, bindings: Record<string, unknown>): unknown {
    try {
      let ast = this.astCache.get(expression);
      if (!ast) {

#### **`VTLMDEvaluator` et `CELMDEvaluator`**
**Fichier** : `src/use-lunatic/commons/variables/expression-languages/md-evaluator.ts`
```typescript
import { ExpressionLanguage } from './expression-language';
import { CELEvaluator } from './cel-evaluator';
import { VTLEvaluator } from './vtl-evaluator';

/**
 * Évaluateur pour les expressions CEL avec markdown (CEL|MD)
 * Note : Le markdown est géré côté React, donc on retourne simplement le résultat brut.
 */
export class CELMDEvaluator implements ExpressionLanguage {
  readonly type = 'CEL|MD' as const;
  private celEvaluator: CELEvaluator;

  constructor() {
    this.celEvaluator = new CELEvaluator();
  }

  evaluate(expression: string, bindings: Record<string, unknown>): unknown {
    // Évaluer l'expression CEL et retourner le résultat brut
    return this.celEvaluator.evaluate(expression, bindings);
  }

  getDependencies(expression: string): string[] {
    return this.celEvaluator.getDependencies(expression);
  }
}

/**
 * Évaluateur pour les expressions VTL avec markdown (VTL|MD)
 * Note : Le markdown est géré côté React, donc on retourne simplement le résultat brut.
 */
export class VTLMDEvaluator implements ExpressionLanguage {

### **3. Gestion du Markdown Côté React**
Si le markdown est géré **côté React** (recommandé), les évaluateurs `CEL|MD` et `VTL|MD` retournent simplement le résultat brut de l'expression. 
Le composant React qui affiche la valeur doit alors détecter le type et appliquer le rendu markdown.

**Exemple de Composant React** :
```tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLunatic } from './use-lunatic';

function VariableDisplay({ name }: { name: string }) {
  const { getVariable } = useLunatic();
  const variable = getVariable(name);

  if (!variable) return null;

  // Si le type est CEL|MD ou VTL|MD, appliquer le markdown
  if (variable.expression?.type === 'CEL|MD' || variable.expression?.type === 'VTL|MD') {
    return <ReactMarkdown>{String(variable.value)}</ReactMarkdown>;
  }

  // Sinon, afficher la valeur brute
  return <span>{String(variable.value)}</span>;
}
```

> **Note** : 
> - Utiliser une bibliothèque comme [`react-markdown`](https://www.npmjs.com/package/react-markdown) pour rendre le markdown en React.
> - Si le markdown doit être rendu **côté moteur**, utiliser une bibliothèque comme [`marked`](https://www.npmjs.com/package/marked) dans `md-evaluator.ts`.

  readonly type = 'VTL|MD' as const;
  private vtlEvaluator: VTLEvaluator;

  constructor() {
    this.vtlEvaluator = new VTLEvaluator();
  }

  evaluate(expression: string, bindings: Record<string, unknown>): unknown {
    // Évaluer l'expression VTL et retourner le résultat brut
    return this.vtlEvaluator.evaluate(expression, bindings);
  }

  getDependencies(expression: string): string[] {
    return this.vtlEvaluator.getDependencies(expression);
  }
}
```

#### **Mise à jour de `ExpressionEvaluator`**
**Fichier** : `src/use-lunatic/commons/variables/expression-languages/expression-evaluator.ts`
```typescript
import { CELMDEvaluator } from './md-evaluator';
import { VTLMDEvaluator } from './md-evaluator';

// Dans le constructeur de ExpressionEvaluator :
private constructor() {
  this.register(new VTLEvaluator());
  this.register(new CELEvaluator());
  this.register(new TXTEvaluator());
  this.register(new VTLMDEvaluator()); // Nouveau
  this.register(new CELMDEvaluator()); // Nouveau
}
```

        ast = this.celEnv.parse(expression);
        this.astCache.set(expression, ast);
      }
      const program = this.celEnv.createProgram(ast);
      const result = program.evaluate(bindings);
      return result.value;
    } catch (error) {

### **4. Modifications de `LunaticVariable`**
**Fichier** : `src/use-lunatic/commons/variables/lunatic-variables-store.ts`

#### **Constructeur**
```typescript
export class LunaticVariable {
  private readonly expression?: Expression;

  constructor(args: {
    expression?: Expression;
    dependencies?: string[];
    dictionary?: Map<string, LunaticVariable>;

### **4. Risque : Gestion de `CEL|MD` et `VTL|MD`**
**Problème** : Le markdown doit être géré de manière cohérente entre le moteur et React.

**Solutions** :
- **Gérer le markdown côté React** (recommandé) : Les évaluateurs `CEL|MD` et `VTL|MD` retournent le résultat brut, et React applique le rendu markdown.
- **Gérer le markdown côté moteur** : Utiliser une bibliothèque comme `marked` dans `md-evaluator.ts` pour retourner du HTML.

**Recommandation** :
- **Privilégier le rendu côté React** pour une meilleure séparation des responsabilités.
- **Documenter clairement** que `CEL|MD` et `VTL|MD` nécessitent un traitement markdown côté React.

    // ... autres champs existants ...
  }) {
    this.expression = args.expression;
    this.dependencies = args.dependencies;
  }
}
```

#### **`getDependencies()`**
```typescript
private getDependencies(): string[] {
  if (this.dependencies) {
    return this.dependencies;
  }
  if (!this.expression || !this.dictionary) {
    return [];
  }
  return expressionEvaluator.getDependencies(this.expression);
}
```

#### **`getValue()` (Partie Calcul)**
```typescript
if (this.expression) {
  try {
    const bindings = this.getDependenciesValues(iteration);
    const result = expressionEvaluator.evaluate(this.expression, bindings);
    this.setValue(result, { iteration });
  } catch (error) {
    if (error instanceof ExpressionEvaluationError) {
      throw error;
    }
    throw new ExpressionEvaluationError(
      this.expression.value,
      this.expression.type,
      {},
      error as Error
    );
  }
}
```

#### **`getDependenciesValues()`**

### **3. Tests pour `CEL|MD` et `VTL|MD`**
```typescript
describe('Markdown Expressions', () => {
  it('should evaluate VTL|MD expression and return raw result', () => {
    const store = LunaticVariablesStore.makeFromObject({ VAR1: 10, VAR2: 20 });
    store.setCalculated('SUM_MD', {
      value: 'VAR1 + VAR2',
      type: 'VTL|MD',
      bindingDependencies: ['VAR1', 'VAR2'],
    });
    // Le résultat est brut (le markdown est géré côté React)
    expect(store.get('SUM_MD')).toBe(30);
  });

  it('should evaluate CEL|MD expression and return raw result', () => {
    const store = LunaticVariablesStore.makeFromObject({ VAR1: 10, VAR2: 20 });
    store.setCalculated('SUM_MD', {
      value: 'VAR1 + VAR2',
      type: 'CEL|MD',
      bindingDependencies: ['VAR1', 'VAR2'],
    });
    expect(store.get('SUM_MD')).toBe(30);
  });

  it('should handle markdown in expression result (raw string)', () => {
    const store = LunaticVariablesStore.makeFromObject({ NAME: 'World' });
    store.setCalculated('GREETING_MD', {
      value: '`Hello **' + NAME + '**`',
      type: 'VTL|MD',
      bindingDependencies: ['NAME'],
    });
    // Le résultat est une chaîne avec du markdown brut
    expect(store.get('GREETING_MD')).toBe('`Hello **World**`');
  });
});
```

```typescript
private getDependenciesValues(iteration?: IterationLevel): Record<string, unknown> {
  try {
    return Object.fromEntries(
      this.getDependencies().map((dep) => {
        if (dep === GLOBAL_ITERATION_INDEX && iteration) {
          return computeGlobalIterationIndexValue(iteration);
        }
        const dependencyIteration =
          isNumber(this.iterationDepth) && Array.isArray(iteration)
            ? [iteration[this.iterationDepth]]
            : iteration;

### **3. Exemple de Questionnaire avec `CEL|MD` et `VTL|MD`**
```json
{
  "variables": [
    {
      "name": "NAME",
      "variableType": "COLLECTED",
      "values": ["Alice", "Bob"]
    },
    {
      "name": "WELCOME_VTL_MD",
      "variableType": "CALCULATED",
      "expression": {
        "value": "'`Hello **' + NAME + '**!`'",
        "type": "VTL|MD",
        "bindingDependencies": ["NAME"]
      }
    },
    {
      "name": "WELCOME_CEL_MD",
      "variableType": "CALCULATED",
      "expression": {
        "value": "'`Hello **' + NAME + '**!`'",
        "type": "CEL|MD",
        "bindingDependencies": ["NAME"]
      }
    }
  ]
}
```

**Rendu côté React** :
```tsx
<VariableDisplay name="WELCOME_VTL_MD" />
// Affiche : Hello **Alice**! (avec le markdown rendu)
```

        if (!this.dictionary?.has(dep)) {
          throw new MissingDependencyError(
            this.expression!.value,
            this.expression!.type,
            dep
          );
        }
        return [dep, this.dictionary.get(dep)?.getValue(dependencyIteration)];
      })
    );
  } catch (e) {
    if (e instanceof RangeError) {
      throw new MissingDependencyError(
        this.expression!.value,
        this.expression!.type,
        'Unknown dependency'
      );
    }
    throw e;
  }
}
```

### **5. Modifications de `LunaticVariablesStore`**
**Fichier** : `src/use-lunatic/commons/variables/lunatic-variables-store.ts`

#### **`setCalculated`**
```typescript
public setCalculated(
  name: string,
  expression: Expression,
  {

---

## ⚠️ Gestion des Risques

### **1. Parsing des Dépendances pour CEL**
**Problème** : CEL n'a pas de parser natif pour extraire les dépendances.

**Solutions** :
- **Prioriser `bindingDependencies`** si disponible dans la source.
- **Sinon, implémenter un parser CEL** (ex: avec un visitor AST).

### **2. Performances de CEL**
**Problème** : CEL peut être plus lent que VTL.

**Solutions** :
- **Cache des AST** dans `CELEvaluator`.
- **Benchmark CEL vs VTL** avant la mise en production.

### **3. Sécurité de CEL**
**Problème** : CEL permet des expressions puissantes.

**Solutions** :
- **Désactiver les fonctions dangereuses** dans CEL.
- **Limiter les variables disponibles** dans les bindings.

---

## 🧪 Tests et Validation

### **1. Tests Unitaires pour `ExpressionEvaluator`**
```typescript
import { expressionEvaluator } from './expression-evaluator';

describe('ExpressionEvaluator', () => {
  it('should evaluate VTL expressions', () => {
    const result = expressionEvaluator.evaluate(
      { value: '1 + 2', type: 'VTL' },
      {}
    );
    expect(result).toBe(3);
  });

  it('should evaluate CEL expressions', () => {
    const result = expressionEvaluator.evaluate(
      { value: '1 + 2', type: 'CEL' },
      {}
    );
    expect(result).toBe(3);
  });

  it('should return raw value for TXT expressions', () => {
    const result = expressionEvaluator.evaluate(
      { value: 'Hello {name}', type: 'TXT' },
      { name: 'World' }
    );
    expect(result).toBe('Hello {name}');
  });
});
```

### **2. Tests pour `LunaticVariable`**
```typescript
import { LunaticVariablesStore } from './lunatic-variables-store';

describe('LunaticVariable with ExpressionEvaluator', () => {
  it('should evaluate VTL expression', () => {
    const store = LunaticVariablesStore.makeFromObject({ VAR1: 10, VAR2: 20 });
    store.setCalculated('SUM', {
      value: 'VAR1 + VAR2',
      type: 'VTL',
      bindingDependencies: ['VAR1', 'VAR2'],
    });
    expect(store.get('SUM')).toBe(30);
  });

  it('should evaluate CEL expression', () => {
    const store = LunaticVariablesStore.makeFromObject({ VAR1: 10, VAR2: 20 });
    store.setCalculated('SUM', {
      value: 'VAR1 + VAR2',

---

## 📚 Documentation et Exemples

### **1. Documentation de l'API**
**Fichier** : `docs/expression-evaluator.md`

Le service `ExpressionEvaluator` permet d'évaluer des expressions dans différents langages (VTL, CEL, TXT).

#### Utilisation

```typescript
import { expressionEvaluator } from './expression-evaluator';

const result = expressionEvaluator.evaluate(
  { value: 'VAR1 + VAR2', type: 'VTL' },
  { VAR1: 10, VAR2: 20 }
);
```

#### Ajouter un Nouveau Langage

```typescript
import { ExpressionLanguage } from './expression-language';

class JSEvaluator implements ExpressionLanguage {
  readonly type = 'JS' as const;
  evaluate(expression: string, bindings: Record<string, unknown>): unknown {
    const fn = new Function(...Object.keys(bindings), `return ${expression};`);
    return fn(...Object.values(bindings));
  }
  getDependencies(expression: string): string[] {
    const regex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
    return [...new Set(expression.match(regex) || [])];
  }
}

expressionEvaluator.register(new JSEvaluator());
```

### **2. Exemple de Questionnaire avec VTL et CEL**

```json
{
  "variables": [
    {
      "name": "PRICE",
      "variableType": "COLLECTED",
      "values": [10, 20, 30]

---

## 📦 Annexes

### **1. Dépendances Requises**
Ajouter dans `package.json` :
```json
{
  "dependencies": {
    "@google/cel-spec": "^0.10.0"
  }
}
```

### **2. Glossaire**
| **Terme** | **Définition** |
|-----------|---------------|
| **Expression** | Chaîne de caractères représentant une opération (ex: `"VAR1 + VAR2"`). |
| **ExpressionType** | Type de l'expression (`'VTL'`, `'CEL'`, `'TXT'`, etc.). |
| **ExpressionLanguage** | Interface pour un langage d'expression. |
| **ExpressionEvaluator** | Service singleton pour évaluer les expressions. |
| **Binding** | Objet clé-valeur contenant les variables disponibles. |
| **AST** | Abstract Syntax Tree pour les expressions CEL. |

### **3. Références**
- [VTL (Validation and Transformation Language)](https://sdmx.org/?page_id=5096)
- [CEL (Common Expression Language)](https://github.com/google/cel-spec)
- [@google/cel-spec (npm)](https://www.npmjs.com/package/@google/cel-spec)

---

## 🎯 Conclusion

Ce plan détaille une **stratégie robuste et extensible** pour intégrer CEL dans le moteur de variables Lunatic, tout en conservant la compatibilité avec VTL.

**Prochaines étapes** :
1. Valider le plan avec l'équipe.
2. Implémenter les étapes 1 à 4 (types, interfaces, évaluateurs, `ExpressionEvaluator`).
3. Tester avec une PoC (Proof of Concept).

---

> **Note pour les IA** : 
> - Ce document est **auto-suffisant** : il contient toutes les informations nécessaires pour implémenter la fonctionnalité.
> - Les chemins de fichiers sont **relatifs à la racine du projet Lunatic** (`c:/INSEE/CodeSource/GitHub/Lunatic`).
> - Les exemples de code sont **prêts à être copiés** dans les fichiers correspondants.
> - Les dépendances (ex: `@google/cel-spec`) doivent être installées via `npm install`.

    },
    {
      "name": "QUANTITY",
      "variableType": "COLLECTED",
      "values": [2, 3, 1]
    },
    {
      "name": "TOTAL_VTL",
      "variableType": "CALCULATED",
      "expression": {
        "value": "PRICE * QUANTITY",
        "type": "VTL",
        "bindingDependencies": ["PRICE", "QUANTITY"]
      }
    },
    {
      "name": "TOTAL_CEL",
      "variableType": "CALCULATED",
      "expression": {
        "value": "PRICE * QUANTITY",
        "type": "CEL",
        "bindingDependencies": ["PRICE", "QUANTITY"]
      }
    }
  ]
}
```

      type: 'CEL',
      bindingDependencies: ['VAR1', 'VAR2'],
    });
    expect(store.get('SUM')).toBe(30);
  });

  it('should handle dependencies between VTL and CEL', () => {
    const store = LunaticVariablesStore.makeFromObject({ PRICE: 10, QUANTITY: 2 });
    store.setCalculated('TOTAL_VTL', {
      value: 'PRICE * QUANTITY',
      type: 'VTL',
      bindingDependencies: ['PRICE', 'QUANTITY'],
    });
    store.setCalculated('TOTAL_CEL', {
      value: 'TOTAL_VTL * 2',
      type: 'CEL',
      bindingDependencies: ['TOTAL_VTL'],
    });
    expect(store.get('TOTAL_VTL')).toBe(20);
    expect(store.get('TOTAL_CEL')).toBe(40);
  });
});
```

### **3. Tests de Compatibilité**
```typescript
describe('Compatibility: Existing VTL', () => {
  it('should work with existing VTL expressions', () => {
    const store = LunaticVariablesStore.makeFromObject({ VAR1: 10, VAR2: 20 });
    store.setCalculated('SUM', 'VAR1 + VAR2', { dependencies: ['VAR1', 'VAR2'] });
    expect(store.get('SUM')).toBe(30);
  });
});
```


### **4. Compatibilité avec `VTL|MD`**
**Problème** : Le type `'VTL|MD'` est ambigu.

**Solutions** :
- **Traiter `'VTL|MD'` comme `'VTL'`** dans `ExpressionEvaluator`.
- **Documenter** ce comportement.

    dependencies,
    iterationDepth,
    shapeFrom,
    dimension,
  }: {
    dependencies?: string[];
    iterationDepth?: number;
    shapeFrom?: string | string[];
    dimension?: number;
  } = {}
): LunaticVariable {
  if (this.dictionary.has(name)) {
    return this.dictionary.get(name)!;
  }
  const variable = new LunaticVariable({
    expression,
    dictionary: this.dictionary,
    shapeFrom,
    dependencies,
    iterationDepth,
    name,
    dimension,
    storeUpdatedAt: this.updatedAt,
  });
  this.dictionary.set(name, variable);
  this.updatedAt.touch();
  return variable;
}
```

#### **`makeFromSource`**
```typescript
// Remplacer :
store.setCalculated(variable.name, variable.expression.value, { ... });
// Par :
store.setCalculated(variable.name, variable.expression, { ... });
```

### **6. Gestion des Erreurs**
**Fichier** : `src/use-lunatic/commons/variables/errors.ts`
```typescript
export { ExpressionEvaluationError } from './expression-languages/expression-language';

export class MissingDependencyError extends Error {
  constructor(
    public readonly expression: string,
    public readonly type: ExpressionType,
    public readonly missingDependency: string
  ) {
    super(`Missing dependency "${missingDependency}" for ${type} expression: "${expression}"`);
    this.name = 'MissingDependencyError';
  }
}

export class VTLInterpretationError extends ExpressionEvaluationError {
  constructor(expression: string, bindings: Record<string, unknown>) {
    super(expression, 'VTL', bindings);
  }
}
```

      throw new ExpressionEvaluationError(expression, this.type, bindings, error as Error);
    }
  }

  getDependencies(expression: string): string[] {
    const regex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
    return [...new Set(expression.match(regex) || [])];
  }
}
```

#### **`TXTEvaluator`**
**Fichier** : `src/use-lunatic/commons/variables/expression-languages/txt-evaluator.ts`
```typescript
import { ExpressionLanguage } from './expression-language';

export class TXTEvaluator implements ExpressionLanguage {
  readonly type = 'TXT' as const;
  evaluate(expression: string, _bindings: Record<string, unknown>): unknown {
    return expression;
  }
  getDependencies(_expression: string): string[] {
    return [];
  }
}
```

### **3. Service `ExpressionEvaluator`**
**Fichier** : `src/use-lunatic/commons/variables/expression-languages/expression-evaluator.ts`
```typescript
import type { Expression, ExpressionType } from '../expression-types';
import { ExpressionLanguage, ExpressionEvaluationError } from './expression-language';
import { VTLEvaluator } from './vtl-evaluator';
import { CELEvaluator } from './cel-evaluator';
import { TXTEvaluator } from './txt-evaluator';

export class ExpressionEvaluator {
  private static instance: ExpressionEvaluator;
  private evaluators: Map<ExpressionType, ExpressionLanguage> = new Map();

  private constructor() {
    this.register(new VTLEvaluator());
    this.register(new CELEvaluator());
    this.register(new TXTEvaluator());
  }

  public static getInstance(): ExpressionEvaluator {
    if (!ExpressionEvaluator.instance) {
      ExpressionEvaluator.instance = new ExpressionEvaluator();
    }
    return ExpressionEvaluator.instance;
  }

  public register(evaluator: ExpressionLanguage): void {
    this.evaluators.set(evaluator.type, evaluator);
  }

  public evaluate(expression: Expression, bindings: Record<string, unknown>): unknown {
    const evaluator = this.getEvaluator(expression.type);
    return evaluator.evaluate(expression.value, bindings);
  }

  public getDependencies(expression: Expression): string[] {
    const evaluator = this.getEvaluator(expression.type);
    return evaluator.getDependencies(expression.value);
  }

  private getEvaluator(type: ExpressionType): ExpressionLanguage {
    const evaluator = this.evaluators.get(type);
    if (!evaluator) {
      throw new Error(`No evaluator registered for expression type: "${type}"`);
    }
    return evaluator;
  }
}

export const expressionEvaluator = ExpressionEvaluator.getInstance();
```

| **Étape** | **Tâche** | **Fichiers** | **Durée** |
|-----------|-----------|--------------|-----------|
| 8.1 | Documenter l'API | `docs/expression-evaluator.md` | 0.5j |
| 8.2 | Ajouter des exemples | `docs/examples.md` | 0.5j |
| 8.3 | Mettre à jour le README | `README.md` | 0.5j |

    ├── evaluate(expression: Expression, bindings)
    ├── getDependencies(expression: Expression)
    └── registerEvaluator(type, evaluator)
        │
        ├── VTLEvaluator (type: 'VTL')
        ├── CELEvaluator (type: 'CEL')
        └── TXTEvaluator (type: 'TXT')
```

### **Composants Clés**
1. **`ExpressionEvaluator`** : Service singleton qui centralise l'évaluation des expressions.
2. **`ExpressionLanguage`** : Interface commune pour tous les langages d'expression.
3. **Évaluateurs Concrets** : `VTLEvaluator`, `CELEvaluator`, `TXTEvaluator`.

---

## 📋 Étapes de Mise en Œuvre