import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import Container from "./Container.tsx";

const Droppable = ({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children?: ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <Container
      name={name}
      className={`${isOver ? "bg-gray-200" : ""}`}
      ref={setNodeRef}
    >
      {children}
    </Container>
  );
};

export default Droppable;
