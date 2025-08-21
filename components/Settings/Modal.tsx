"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function RouteSettings({ route }: { route: string }) {
  const [formData, setFormData] = useState({
    route: route,
    title: "",
    description: "",
    keywords: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("/api/seo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send as JSON
      });

      if (!response.ok) throw new Error("Failed to save settings");

      toast.success("SEO settings saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save SEO settings.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Route Settings</Button>
      </DialogTrigger>

      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>Meta Settings</DialogTitle>
          <DialogDescription>
            Configure SEO-related metadata for your route{" "}
            <span className="font-extrabold text-black">{`"${route}"`}</span>.
            These fields will be used in search engines and social previews.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Title */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Title</Label>
              <HoverCard openDelay={800}>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <Info className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 text-sm">
                  The title of your page. Appears in search results and browser tabs.
                </HoverCardContent>
              </HoverCard>
            </div>
            <Input
              id="title"
              name="title"
              placeholder="Enter page title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              <HoverCard openDelay={800}>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <Info className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 text-sm">
                  A short summary of your page. Search engines may show this in results.
                </HoverCardContent>
              </HoverCard>
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a brief description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Keywords */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="keywords">Keywords</Label>
              <HoverCard openDelay={800}>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <Info className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 text-sm">
                  A comma-separated list of keywords that describe your page.
                </HoverCardContent>
              </HoverCard>
            </div>
            <Input
              id="keywords"
              name="keywords"
              placeholder="e.g. blog, tech, javascript"
              value={formData.keywords}
              onChange={(e) =>
                setFormData({ ...formData, keywords: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
