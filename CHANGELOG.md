# Lunatic

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.13.1](https://github.com/InseeFr/Lunatic/releases/tag/3.13.1) - 2026-04-01

### Fixed

- fixing the cleaning process when no `shapeFrom` is provided and `shouldCheckAllIterations` is set to `true`

## [3.13.0](https://github.com/InseeFr/Lunatic/releases/tag/3.13.0) - 2026-03-19

### Added

- Cleaning : It's now possible to force an expression to be checked on every iteration when being in a loop, by specifying `shouldCheckAllIterations` in cleaning expression.

## [3.12.3](https://github.com/InseeFr/Lunatic/releases/tag/3.12.3) - 2026-03-17

### Changed

- In dropdown selection, the options id is not longer displayed. Only the label is now displayed.

## [3.12.2](https://github.com/InseeFr/Lunatic/releases/tag/3.12.2) - 2026-03-04

### Fixed

- Suggester synonyms now sort correctly the results.

## [3.12.1](https://github.com/InseeFr/Lunatic/releases/tag/3.12.1) - 2026-02-23

### Fixed

- Suggester synonyms now handle uppercase.

## [3.12.0](https://github.com/InseeFr/Lunatic/releases/tag/3.12.0) - 2026-02-23

- Radio, Dropdown and CheckboxOne can now have options based on a variable by specifying `optionSource` and filtered through `optionFilter`.
- Enable PairwiseLinks component to be in Loop

## [3.11.2](https://github.com/InseeFr/Lunatic/releases/tag/3.11.2) - 2026-02-10

- fix: lunaticStore when window is `undefined` (bug since **3.11.0**), only appears in Node env (LunaticPdfApi for example)

## [3.11.1](https://github.com/InseeFr/Lunatic/releases/tag/3.11.1) - 2026-02-09

### Changed

- fix: cleaning pairwise (queue issue), fixing (delay cleaning feature for pairwise)


## [3.11.0](https://github.com/InseeFr/Lunatic/releases/tag/3.11.1) - 2026-02-02

### Changed

- feat: add delay cleaning feature, based on queue. Cleaning is done when the page changes. (for pagination = `question`)
- change separator of `GLOBAL_ENFANTS_PRENOMS` (`;` to `#`), exemple, if your children are `['Verso', 'Alicia']`, then `GLOBAL_ENFANTS_PRENOMS='Verso#Alicia'`

## [3.10.0](https://github.com/InseeFr/Lunatic/releases/tag/3.10.0) - 2026-01-27

### Changed

- Upgrade React to v19

## [3.9.0](https://github.com/InseeFr/Lunatic/releases/tag/3.9.0) - 2026-01-22

### Build

- switch packageManager `yarn` -> `pnpm`

### Added

- **Suggester**: display label after navigation even if label is not stored in COLLECTED variable

### Fixed

- **LunaticVariableStore**: enable init array with `undefined` value (for a given `iteration`)during  `setValue`  methode of `Variable`.
- **Suggester**: fix regression caused in `3.7.7`


## [3.8.0](https://github.com/InseeFr/Lunatic/releases/tag/3.8.0) - 2026-01-16

### Added

- Add global variables for pairwise component. `GLOBAL_PARENT1_PRENOM`, `GLOBAL_PARENT1_SEXE`, `GLOBAL_PARENT2_PRENOM`, `GLOBAL_PARENT2_SEXE`, `GLOBAL_CONJOINT_PRENOM` and `GLOBAL_ENFANTS_PRENOMS` are now available if the corresponding source variables of the pairwise component are filled in.

## [3.7.7](https://github.com/InseeFr/Lunatic/releases/tag/3.7.7) - 2026-01-14

### Fixed

- Not-paginated loops were wrongly displayed when none of their components were visible
- Suggester displayed value was wrong after calling `handleChanges` in management mode. (⚠️ cause side-effect in collecte mode, please use `3.8.1`)

## [3.7.6](https://github.com/InseeFr/Lunatic/releases/tag/3.7.6) - 2025-12-30

### Added

- Handle new external variable property `isDeletedOnReset`.

### Fixed

- Suggesters are correctly sorted alphabetically.
- Suggesters now handle ligatures (e.g. œ, æ).
- Improved combobox and pairwise label.

## [3.7.5](https://github.com/InseeFr/Lunatic/releases/tag/3.7.5) - 2025-12-03

### Added

- A component option allows to disable RosterForLoop delete row button.

## [3.7.4](https://github.com/InseeFr/Lunatic/releases/tag/3.7.4) - 2025-11-27

### Fixed

- Variables cannot clean themselves.

## [3.7.3](https://github.com/InseeFr/Lunatic/releases/tag/3.7.3) - 2025-11-06

### Fixed

- Correctly resize calculated variables.

## [3.7.2](https://github.com/InseeFr/Lunatic/releases/tag/3.7.2) - 2025-10-17

### Added

- Lunatic state now exposes `roundaboutLoopVariables` to allow for custom roundabout recap in orchestrator.

## [3.7.1](https://github.com/InseeFr/Lunatic/releases/tag/3.7.1) - 2025-09-22

### Fixed

- Loops are not entirely skipped when only the first occurence is filtered.

## [3.7.0](https://github.com/InseeFr/Lunatic/releases/tag/3.7.0) - 2025-09-05

### Added

- Handle articulation and multimode.
- Allow import of the `LunaticVariablesStore`.

### Fixed

- Datepicker, Duration and Suggester compoonents are correctly refreshed between pages.
