"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilePlus } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/Faq/Table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function AdminFaq() {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [faq, setFaq] = useState([]);
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await (await fetch("/api/faq")).json();

        setFaq(response.allFaq);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFAQ();
  }, []);

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save FAQ");
      }

      const result = await response.json();
      toast.success(result.message || "FAQ created successfully ✅");
      setFormData({ question: "", answer: "" });

      // ✅ Refresh FAQs immediately
      const updated = await (await fetch("/api/faq")).json();
      setFaq(updated.allFaq);
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast.error("Failed to create FAQ ❌");
    }
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-black text-center">
        FAQ Dashboard
      </h1>
      <p className="text-gray-600 mb-10 text-center">
        Manage, create, and update your FAQ content from a central dashboard.
      </p>

      <div className="flex flex-wrap justify-evenly gap-6">
        {/* Add FAQ */}
        <Card className="w-full max-w-sm hover:shadow-md transition">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2 text-teal-600">
              <FilePlus className="w-6 h-6" />
              <CardTitle>Add FAQ</CardTitle>
            </div>
            <CardDescription>
              Publish new FAQ’s to share insights, tutorials, or updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Create FAQ</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] text-black">
                <DialogHeader>
                  <DialogTitle>Create FAQ</DialogTitle>
                  <DialogDescription>
                    Fill in the details below and click save to add a new FAQ.
                  </DialogDescription>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={handleAddFaq}>
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
                    <Button type="submit">Save FAQ</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
      <DataTableDemo data={faq} />
    </div>
  );
}
