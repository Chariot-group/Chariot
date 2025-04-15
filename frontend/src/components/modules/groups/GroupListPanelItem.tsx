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

  const isOverlay = currentPanelType === "overlay";
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <Card
      ref={!isOverlay ? setNodeRef : undefined}
      style={isOverlay ? {} : style}
      {...(!isOverlay ? { ...listeners, ...attributes } : {})}
      className={`flex p-2 gap-3 border-ring shadow-md ${
        reverse ? "bg-background" : "bg-card"
      } ${grabbled ? "justify-between cursor-grab" : "cursor-pointer justify-center"} ${
        isOverlay ? "opacity-80 scale-105 pointer-events-none" : ""
      }`}
    >
      <span className="text-foreground font-bold">{group.label}</span>
      {grabbled && <Grip />}
    </Card>
  );
};

export default GroupListPanelItem;
