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
  setGroupSelected?: (group: IGroup) => void;
  groupSelected?: IGroup | null;
  disabled?: boolean;
}

const GroupListPanelItem = ({
  group,
  reverse,
  grabbled = false,
  currentPanelType,
  setGroupSelected,
  groupSelected,
  disabled = false,
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
      } ${
        grabbled
          ? "justify-between cursor-grab"
          : "cursor-pointer justify-center"
      } ${isOverlay ? "opacity-80 scale-105 pointer-events-none" : ""} ${
        groupSelected?._id === group._id ? "border-2" : ""
      }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => {
        if (setGroupSelected && !disabled) {
          setGroupSelected(group);
        }
      }}
    >
      <span className="text-foreground font-bold">{group.label}</span>
      {grabbled && <Grip />}
    </Card>
  );
};

export default GroupListPanelItem;
