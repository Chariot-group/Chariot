import React, { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { IGroup } from "@/models/groups/IGroup";
import { Grip } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  group: IGroup;
  reverse?: boolean;
  grabbled?: boolean;
  currentPanelType: string;
  setGroupSelected?: (group: IGroup) => void;
  groupSelected?: IGroup | null;
  idCampaign: string;
  disabled?: boolean;
}

const GroupListPanelItem = ({
  group,
  reverse,
  grabbled = false,
  currentPanelType,
  setGroupSelected,
  groupSelected,
  idCampaign,
  disabled = false
}: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: group._id,
    data: {
      group,
      from: currentPanelType,
    },
  });

  const router = useRouter();

  const isOverlay = currentPanelType === "overlay";

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const pointerStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5 && setGroupSelected) {
      setGroupSelected(group);
      router.push(`/campaigns/${idCampaign}/groups?search=${group.label}`);
    }
  };

  return (
    <Card
      ref={!isOverlay ? setNodeRef : undefined}
      style={isOverlay ? {} : style}

      onMouseDown={!isOverlay ? handleMouseDown : undefined}
      onMouseUp={!isOverlay ? handleMouseUp : undefined}
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
      <span className="cursor-pointer text-foreground font-bold">{group.label}</span>

      {grabbled && (
        <span
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing"
        >
          <Grip />
        </span>
      )}
    </Card>
  );
};

export default GroupListPanelItem;
