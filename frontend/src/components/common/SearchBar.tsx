
// components/common/SearchInput.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  reverse?: boolean;
}

const SearchInput = ({ value, onChange, placeholder, reverse = false }: Props) => (
  <div className="relative">
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`pr-10 w-64 border-ring shadow-md ${reverse ? "bg-background" : "bg-card"}`}
    />
    <Search className="size-5 absolute right-3 top-1/2 -translate-y-1/2" />
  </div>
);

export default SearchInput;
