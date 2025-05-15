// components/ValidationPopup.jsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

interface CreateCampaginPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (name: string) => void;
}
export default function CreateCampaginValidation({ isOpen, onClose, onConfirm }: CreateCampaginPopupProps) {
  // Pour gérer l'animation
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const t = useTranslations("CampaignModal");
  const global = useTranslations("Global");

  const [name, setName] = useState<string>("");
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    onConfirm(name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}></div>
      
      <Card className={`p-5 w-1/4 relative transform transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Contenu */}
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl">
              {t("title")}
            </h3>
            <div className="flex flex-col">
                <p>
                    {t("subTitles.info")}
                </p>
                <p>
                    {t("subTitles.warning")}
                </p>
            </div>
          </div>
          <div>
            <Input type={"text"} value={name} onChange={(e) => setName(e.target.value)} placeholder={t("placeholder")} className={`bg-background`} />
          </div>
          <div className="flex justify-center gap-3">
            <Button variant={"outline"} onClick={onClose} >
              {global("cancel")}
            </Button>
            <Button onClick={handleClose}>
              {t("actions.create")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}