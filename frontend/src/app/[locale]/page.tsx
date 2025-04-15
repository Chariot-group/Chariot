"use client";
import CreateCampaginValidation from "@/components/common/modals/CreateCampaign";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleConfirm = (name: string) => {
    // Action à effectuer après confirmation
    console.log('Action confirmée!', name);
    // Votre logique ici (envoi de formulaire, suppression, etc.)
  };

  return (
    <div className="flex flex-col">
      <LocaleSwitcher />
      <Button onClick={() => setIsPopupOpen(true)}>
        Créer une campagne
      </Button>
      <CreateCampaginValidation 
        isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onConfirm={handleConfirm} />
    </div>
  );
}
