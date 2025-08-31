import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RecipeSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export function RecipeSearch({ searchTerm, onSearchChange, placeholder = "Search recipes..." }: RecipeSearchProps) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 border-primary/20 focus:border-primary transition-colors"
      />
    </div>
  );
}