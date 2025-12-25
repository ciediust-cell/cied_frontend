import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = ["All", "News", "Event", "Announcement"];

export function FilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <section className="py-8 border-b border-border bg-white sticky top-20 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search news & events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-input-background border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
