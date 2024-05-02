import { getDefaultStore } from "jotai";
import optionsAtom from "@/store/options.ts";

interface Sync {
  upload(extension: string[]): Promise<void>;
  download(): Promise<string[]>;
}

async function getSyncService(): Promise<Sync> {
  const store = getDefaultStore();
  const { syncService } = store.get(optionsAtom);
  const { default: impl } = await import(`./impl/${syncService.value}Sync.ts`);
  return new impl();
}

export { getSyncService, Sync };
