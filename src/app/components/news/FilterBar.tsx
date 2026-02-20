import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories?: string[];
  searchPlaceholder?: string;
}

const defaultCategories = ["All", "News", "Event", "Announcement"];

export function FilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categories = defaultCategories,
  searchPlaceholder = "Search news & events...",
}: FilterBarProps) {
  return (
    <section className="py-4 sm:py-6 border-b border-border bg-white sticky top-16 sm:top-20 z-40">
      {/* reduced height & fixed sticky offset for mobile */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* CATEGORY FILTER */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {/* horizontal scroll instead of wrapping on mobile */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-input-background border-border text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
