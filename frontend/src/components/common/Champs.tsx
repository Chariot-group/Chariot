import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

interface IChampsProps {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    value: string | null;
    setValue: (value: string) => void;
    onChange: () => void;
    color?: string;
}
export default function Champs({ id, type, label, placeholder, value, setValue, color = "background", onChange }: IChampsProps) {

    const [pending, setPending] = useState(false);

    const handleChange = (e: any) => {
        setPending(true);
        setValue(e.target.value);
    };

    useEffect(() => {
    if (pending) {
        onChange();
        setPending(false);
    }
    }, [value]);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={id} className="text-foreground">{label}</Label>
            <Input id={id} type={type} value={value ?? ""} onChange={handleChange} placeholder={placeholder} className={`bg-${color}`} />
        </div>
    );

}