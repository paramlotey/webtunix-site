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
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

type FaqTable = {
  id: string;
  question: string;
  answer: string;
  status: boolean;
};

export function EditDialog({ data }: { data: FaqTable }) {
  const [formData, setFormData] = useState({
    id: data.id,
    question: data.question,
    answer: data.answer,
  });

  const handleUpdateFaq = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/faq", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save FAQ");
      }

      const result = await response.json();
      toast.success(result.message || "FAQ Updated successfully ✅");
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast.error("Failed to create FAQ ❌");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>Update FAQ</DialogTitle>
          <DialogDescription>
            Fill in the details below and click save to update FAQ.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleUpdateFaq}>
          <div className="grid gap-3">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              name="question"
              placeholder="Enter FAQ question"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              name="answer"
              placeholder="Enter FAQ answer"
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-black">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Update FAQ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
