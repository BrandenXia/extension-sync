import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  addSyncedAtom,
  extensionsAtom,
  removeSyncedAtom,
  syncAtom,
  syncServiceAtom,
} from "@/store/extensions.ts";
import { useSetAtom, useAtomValue } from "jotai";
import Droppable from "./Droppable.tsx";
import Draggable from "./Draggable.tsx";
import { useCallback, useMemo } from "react";
import Container from "./Container.tsx";
import { debounce } from "perfect-debounce";

const Extensions = () => {
  const extensions = useAtomValue(extensionsAtom);
  const synced = useAtomValue(syncAtom);
  const addSynced = useSetAtom(addSyncedAtom);
  const removeSynced = useSetAtom(removeSyncedAtom);
  const syncService = useSetAtom(syncServiceAtom);

  const syncedExtensions = useMemo(
    () => extensions.filter((extension) => synced.includes(extension.id)),
    [extensions, synced],
  );
  const localExtensions = useMemo(
    () => extensions.filter((extension) => !synced.includes(extension.id)),
    [extensions, synced],
  );
  const syncedUninstalled = useMemo(
    () =>
      synced.filter(
        (id) => !extensions.some((extension) => extension.id === id),
      ),
    [extensions, synced],
  );
  const autoSync = useMemo(() => debounce(syncService, 3000), [syncService]);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { over } = event;

      if (over)
        if (over.id === "synced") addSynced(event.active.id as string);
        else removeSynced(event.active.id as string);

      autoSync();
    },
    [addSynced, removeSynced],
  );

  return (
    <DndContext onDragEnd={onDragEnd}>
      <Droppable name="Synced" id="synced">
        {syncedExtensions.map((extension) => (
          <Draggable key={extension.id} extension={extension} />
        ))}
      </Droppable>
      <Droppable name="Local" id="local">
        {localExtensions.map((extension) => (
          <Draggable key={extension.id} extension={extension} />
        ))}
      </Droppable>
      <Container id="synced_uninstalled" name="Synced but not installed">
        {syncedUninstalled.length > 0 && (
          <ul className="list-disc list-inside">
            {syncedUninstalled.map((id) => (
              <li>
                <a
                  className="text-blue-500 underline"
                  href={`https://chromewebstore.google.com/detail/${id}`}
                  target="_blank"
                >
                  {id}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </DndContext>
  );
};

export default Extensions;
