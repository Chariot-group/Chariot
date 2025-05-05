"use client";

import Field from "@/components/common/Field";
import DeleteValidation from "@/components/common/modals/DeleteValidation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { IGroup } from "@/models/groups/IGroup";
import GroupService from "@/services/groupService";
import { PenBoxIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface GroupDetailsPanelProps {
  group: IGroup;
  setGroup: (group: IGroup) => void;
  campaign: ICampaign;
  onDelete: (group: IGroup) => void;
  isUpdating: boolean;
  startUpdate: () => void;
}
export default function GroupDetailsPanel({
  group,
  setGroup,
  campaign,
  onDelete,
  isUpdating,
  startUpdate,
}: GroupDetailsPanelProps) {
  const t = useTranslations("GroupDetailsPanel");
  const { error } = useToast();

  if (!group) return;

  const [label, setLabel] = useState<string>(group.label);
  const [description, setDescription] = useState<string>(group.description);

  useEffect(() => {
    setLabel(group.label);
    setDescription(group.description);
  }, [group]);

  useEffect(() => {
    setGroup({ ...group, label: label, description: description });
  }, [label, description]);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full w-full gap-3 p-5">
      <DeleteValidation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={t("actions.modal.title")}
        message={t("actions.modal.description")}
        confirmMessage={t("actions.modal.confirm")}
        onConfirm={() => onDelete(group)}
      />
      <div className="flex flex-row gap-3 justify-between">
        <Field
          isActive={isUpdating}
          color="card"
          id={"label"}
          type={"text"}
          label={t("labels.name")}
          placeholder={t("placeholders.name")}
          value={label}
          setValue={setLabel}
        />
        <div className="flex flex-row gap-3 items-center">
          <Link href={`/campaigns?search=${campaign.label}`}>
            <Button>{t("actions.backCampaign")}</Button>
          </Link>
          {!isUpdating && group && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" onClick={() => startUpdate()}>
                  <PenBoxIcon className="text-forground cursor-pointer" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("actions.update")}</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <TrashIcon
                onClick={() => setDeleteModalOpen(true)}
                className="text-primary cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("actions.groupDelete")}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="w-full">
        <Label htmlFor={"description"} className="text-foreground">
          {t("labels.description")}
        </Label>
        <Textarea
          readOnly={!isUpdating}
          className="rounded-xl h-[13vh] resize-none bg-card border-ring"
          placeholder={t("placeholders.description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
