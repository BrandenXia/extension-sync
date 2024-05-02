import { useDraggable } from "@dnd-kit/core";
import { ExtensionType } from "@/store/extensions.ts";
import Extension from "./Extension.tsx";

const Draggable = ({ extension }: { extension: ExtensionType }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: extension.id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <Extension
      extension={extension}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

export default Draggable;
