import { Card } from "@/components/ui/card";
import { IGroup } from "@/models/groups/IGroup";
import { Grip } from "lucide-react";
import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface Props {
  group: IGroup;
  reverse?: boolean;
  grabbled?: boolean;
  currentPanelType: string;
}

const GroupListPanelItem = ({
  group,
  reverse,
  grabbled = false,
  currentPanelType,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: group._id,
      data: {
        group,
        from: currentPanelType,
      },
    });
  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...listeners}
      {...attributes}
      className={`flex p-2 gap-3 border-ring shadow-md hover:border-2 ${
        reverse ? "bg-background" : "bg-card"
      } ${grabbled ? "justify-between cursor-grab" : "justify-center"}`}
    >
      <span className="text-foreground font-bold">{group.label}</span>
      {grabbled && <Grip />}
    </Card>
  );
};

export default GroupListPanelItem;
