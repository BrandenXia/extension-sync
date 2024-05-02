import { atomWithStorage } from "jotai/utils";

type OptionsKeyType = "showDisabledExtensions" | "syncService";

type OptionStorageType = {
  showDisabledExtensions: {
    id: "showDisabledExtensions";
    name: string;
    value: boolean;
  };
  syncService: {
    id: "syncService";
    name: string;
    value: "GitHub";
  };
};

const DEFAULT_OPTIONS: OptionStorageType = {
  showDisabledExtensions: {
    id: "showDisabledExtensions",
    name: "Show disabled extensions",
    value: false,
  },
  syncService: {
    id: "syncService",
    name: "Sync service",
    value: "GitHub",
  },
};

const optionsAtom = atomWithStorage<OptionStorageType>(
  "options",
  DEFAULT_OPTIONS,
);

const optionsReducer = <T extends OptionsKeyType>(
  prev: OptionStorageType,
  action: { key: T; value: OptionStorageType[T]["value"] },
) => ({
  ...prev,
  [action.key]: { ...prev[action.key], value: action.value },
});

export { optionsAtom, optionsReducer };
export type { OptionsKeyType, OptionStorageType };
