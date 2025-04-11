// components/common/SearchInput.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchInput = ({ value, onChange, placeholder }: Props) => (
  <div className="relative">
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pr-10 w-64"
    />
    <Search className="size-5 absolute right-3 top-1/2 -translate-y-1/2" />
  </div>
);

export default SearchInput;