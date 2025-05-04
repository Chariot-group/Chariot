"use client";

import Field from "@/components/common/Field";
import DeleteValidation from "@/components/common/modals/DeleteValidation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { IGroup } from "@/models/groups/IGroup";
import GroupService from "@/services/groupService";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface GroupDetailsPanelProps {
  group: IGroup;
  campaign: ICampaign;
  onDelete: (group: IGroup) => void;
}
export default function GroupDetailsPanel({
  group,
  campaign,
  onDelete,
}: GroupDetailsPanelProps) {
  const t = useTranslations("GroupDetailsPanel");
  const { error } = useToast();

  if (!group) return;

  const cancelRef = useRef<boolean>(false);
  const [label, setLabel] = useState<string>(group.label);
  const [description, setDescription] = useState<string>(group.description);

  useEffect(() => {
    if (!group) return;
    cancelRef.current = true;
    setLabel(group.label);
    setDescription(group.description);
    // Attendre que le composant soit monté avant de mettre à jour le state
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      cancelRef.current = false;
    })();
  }, [group]);

  const updateGroup = useCallback(async (updateGroup: Partial<IGroup>) => {
    if (!group) return;
    try {
      let response = await GroupService.updateGroup(group._id, updateGroup);
      group = response.data;
    } catch (err) {
      error(t("error"));
      console.error("Error fetching characters:", error);
    }
  }, []);

  const onChange = () => {
    if (!group) return;
    group.label = label;
    group.description = description;
    updateGroup({ label, description });
  };

  useEffect(() => {
    if (cancelRef.current) return;
    onChange();
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
          color="card"
          id={"label"}
          type={"text"}
          label={t("labels.name")}
          placeholder={"placeholders.name"}
          value={label}
          setValue={setLabel}
          onChange={onChange}
        />
        <div className="flex flex-row gap-3">
          <Link href={`/campaigns?search=${campaign.label}`}>
            <Button>{t("actions.backCampaign")}</Button>
          </Link>
          <Button onClick={() => setDeleteModalOpen(true)} variant={"link"}>
            {t("actions.groupDelete")}
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Label htmlFor={"description"} className="text-foreground">
          {t("labels.description")}
        </Label>
        <Textarea
          className="rounded-xl h-[13vh] resize-none bg-card border-ring"
          placeholder={t("placeholders.description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
