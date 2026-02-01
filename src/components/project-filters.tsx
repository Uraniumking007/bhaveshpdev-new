import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils/cn";
import { Checkbox } from "./ui/checkbox";
import { IconFilter, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFiltersProps {
  categories: string[];
  technologies: string[];
  currentUrl?: string;
  filterParams?: {
    categories?: string;
    tech?: string;
    search?: string;
    completed?: string;
    ongoing?: string;
  };
  onFilterChange?: (params: URLSearchParams) => void;
}

export function ProjectFilters({
  categories,
  technologies,
  filterParams,
  onFilterChange,
}: ProjectFiltersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [showOngoing, setShowOngoing] = useState(true);

  // Initialize filters from URL params passed as props
  useEffect(() => {
    if (!filterParams) return;

    const normalize = (items: string[] = []) =>
      items.map((i) => i.trim()).filter(Boolean);

    const categories = normalize(
      filterParams.categories?.split(",") || []
    );
    const tech = normalize(filterParams.tech?.split(",") || []);
    const search = filterParams.search || "";
    const completed = filterParams.completed !== "false";
    const ongoing = filterParams.ongoing !== "false";

    setSelectedCategories(categories);
    setSelectedTech(tech);
    setSearchQuery(search);
    setShowCompleted(completed);
    setShowOngoing(ongoing);
  }, [filterParams]);

  const updateFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedTech.length > 0) {
      params.set("tech", selectedTech.join(","));
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    if (!showCompleted) {
      params.set("completed", "false");
    }
    if (!showOngoing) {
      params.set("ongoing", "false");
    }

    // Call the callback to update URL
    if (onFilterChange) {
      onFilterChange(params);
    }
    setIsModalOpen(false);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTech([]);
    setSearchQuery("");
    setShowCompleted(true);
    setShowOngoing(true);

    // Clear filters by calling callback with empty params
    if (onFilterChange) {
      onFilterChange(new URLSearchParams());
    }
    setIsModalOpen(false);
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedTech.length +
    (searchQuery ? 1 : 0) +
    (!showCompleted ? 1 : 0) +
    (!showOngoing ? 1 : 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 w-full sm:max-w-md"
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 w-full sm:w-auto"
        >
          <IconFilter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={cn(
                "fixed z-50 bg-black/60 border border-white/20 rounded-lg",
                "w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-2xl",
                "max-h-[85vh] overflow-y-auto",
                "p-4 sm:p-6",
                "left-0 right-0 mx-auto top-16 sm:top-1/2 -translate-y-0 sm:-translate-y-1/2",
                "sm:left-1/2 sm:-translate-x-1/2"
              )}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-black/60 backdrop-blur-sm py-2 -mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-white/20">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Filter Projects
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <IconX className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4 lg:col-span-2">
                    <Label className="text-white">Technologies</Label>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <Button
                          key={tech}
                          variant="outline"
                          size="sm"
                          onClick={() => handleTechToggle(tech)}
                          className={cn(
                            "border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm",
                            selectedTech.includes(tech) && "bg-white/30"
                          )}
                        >
                          {tech}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="completed"
                      checked={showCompleted}
                      onCheckedChange={(checked) =>
                        setShowCompleted(checked as boolean)
                      }
                      className="border-white/20 data-[state=checked]:bg-white/30"
                    />
                    <Label
                      htmlFor="completed"
                      className="text-white text-sm sm:text-base"
                    >
                      Show Completed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ongoing"
                      checked={showOngoing}
                      onCheckedChange={(checked) =>
                        setShowOngoing(checked as boolean)
                      }
                      className="border-white/20 data-[state=checked]:bg-white/30"
                    />
                    <Label
                      htmlFor="ongoing"
                      className="text-white text-sm sm:text-base"
                    >
                      Show Ongoing
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-white/20 sticky bottom-0 bg-black/60 backdrop-blur-sm -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={updateFilters}
                    className="bg-white/20 hover:bg-white/30 text-white w-full sm:w-auto"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
