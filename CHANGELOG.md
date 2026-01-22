# Lunatic

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
