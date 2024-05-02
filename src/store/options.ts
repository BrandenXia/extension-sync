import { atomWithStorage } from "jotai/utils";

type OptionsKeyType = "showDisabledExtensions" | "syncService";

type OptionStorageType = {
  [key in OptionsKeyType]: {
    name: string;
    value: boolean | string;
  };
};

const DEFAULT_OPTIONS: OptionStorageType = {
  showDisabledExtensions: {
    name: "Show disabled extensions",
    value: false,
  },
  syncService: {
    name: "Sync service",
    value: "GitHub",
  }
};

const optionsAtom = atomWithStorage<OptionStorageType>(
  "options",
  DEFAULT_OPTIONS,
);

export default optionsAtom;
export type { OptionStorageType };
