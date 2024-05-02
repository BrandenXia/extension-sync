import { browser, Management } from "wxt/browser";
import { atom } from "jotai";
import optionsAtom from "./options.ts";
import { atomWithStorage } from "jotai/utils";
import {getSyncService} from "@/service/sync.ts";

type ExtensionType = Management.ExtensionInfo;

const syncAtom = atomWithStorage<string[]>("extensions", []);

const extensionsAtom = atom<Promise<ExtensionType[]>>(async (get) => {
  const { showDisabledExtensions } = get(optionsAtom);

  const extensions = await browser.management.getAll();

  return extensions
    .filter((extension) => extension.id !== browser.runtime.id)
    .filter((extension) => extension.type === "extension")
    .filter((extension) => showDisabledExtensions || extension.enabled);
});

const addSyncedAtom = atom(null, (get, set, id: string) => {
  const synced = get(syncAtom);

  set(syncAtom, [...synced, id]);
});

const removeSyncedAtom = atom(null, (get, set, id) => {
  const synced = get(syncAtom);

  set(
    syncAtom,
    synced.filter((extensionId) => extensionId !== id),
  );
});

const syncServiceAtom = atom(null, async (get, set) => {
  console.log("syncServiceAtom");

  const syncService = await getSyncService();

  const local = get(syncAtom);
  const remote = await syncService.download();

  const newExt = [...new Set([...local, ...remote])];
  await syncService.upload(newExt);

  set(syncAtom, newExt);
})

export { syncAtom, extensionsAtom, addSyncedAtom, removeSyncedAtom, syncServiceAtom };
export type { ExtensionType };
