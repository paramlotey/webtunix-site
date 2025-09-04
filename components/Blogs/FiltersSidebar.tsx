import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FunnelPlus } from "lucide-react";

function FiltersSidebar({
  search,
  setSearch,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
  onReset,
  categories,
}: {
  search: string;
  setSearch: (v: string) => void;
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  onReset: () => void;
  categories: string[];
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filtersContent = (
    <div className="bg-[#1B1B1B33] backdrop-blur-md rounded-2xl p-6 flex flex-col gap-6 border border-white/10 shadow-md">
      <h2 className="text-white text-lg font-semibold border-b border-white/10 pb-2">
        Filter Blogs
      </h2>

      <div>
        <label className="text-gray-400 text-sm mb-2 block">Search</label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search..."
          className="bg-[#00000033] text-white placeholder-gray-500"
        />
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="bg-[#00000033] text-white w-full capitalize">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="h-80 overflow-auto capitalize">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-2 block">Sort By</label>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="bg-[#00000033] text-white w-full">
            <SelectValue placeholder="Latest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onReset}
        className="bg-[#e30613] hover:bg-[#ff1c2a] text-white"
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block lg:w-1/4 sticky top-32 self-start">
        <ScrollArea>{filtersContent}</ScrollArea>
      </aside>

      <div className="lg:hidden relative">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-[#e30613] text-white rounded-full h-10 w-10 fixed bottom-20 right-6"
        >
          <FunnelPlus />
        </Button>

        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          direction="left"
        >
          <DrawerContent className="bg-[#000000]">
            <DrawerHeader>
              <DrawerTitle className="text-white">Filters</DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="p-4">{filtersContent}</ScrollArea>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline" className="w-full text-black">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default FiltersSidebar;
