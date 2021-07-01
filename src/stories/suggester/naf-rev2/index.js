import { default as store } from "./store";
import { default as fetch } from "./fetch";
import { default as OptionRenderer } from "./option-renderer";

const DEFAULT = {
  store,
  optionRenderer: OptionRenderer,
  labelRenderer: undefined,
  fetch,
};
export { store, fetch, OptionRenderer };
export default DEFAULT;
