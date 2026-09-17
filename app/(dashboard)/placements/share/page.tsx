"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, X } from "lucide-react";

const difficulties = ["Easy", "Medium", "Hard"];

export default function ShareExperiencePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rounds, setRounds] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    difficulty: "",
    ctc: "",
    tips: "",
    experience: "",
  });

  const addRound = () => {
    setRounds([...rounds, ""]);
  };

  const removeRound = (index: number) => {
    setRounds(rounds.filter((_, i) => i !== index));
  };

  const updateRound = (index: number, value: string) => {
    const newRounds = [...rounds];
    newRounds[index] = value;
    setRounds(newRounds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Filter out empty rounds
    const validRounds = rounds.filter((r) => r.trim() !== "");

    if (validRounds.length === 0) {
      setError("Please add at least one interview round");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/placements/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rounds: validRounds,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to share experience");
        return;
      }

      router.push(`/placements/${data.placement.id}`);
      router.refresh();
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Share Interview Experience</h1>
        <p className="text-muted-foreground">
          Help others by sharing your placement journey
        </p>
      </div>

      <Card className="bg-white border-none shadow-sm">
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Google"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  placeholder="e.g., Software Engineer"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    setFormData({ ...formData, difficulty: value })
                  }
                  disabled={isLoading}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctc">CTC (Optional)</Label>
                <Input
                  id="ctc"
                  placeholder="e.g., 12 LPA"
                  value={formData.ctc}
                  onChange={(e) =>
                    setFormData({ ...formData, ctc: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Interview Rounds *</Label>
              {rounds.map((round, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Round ${index + 1} (e.g., Online Assessment, Technical Interview)`}
                    value={round}
                    onChange={(e) => updateRound(index, e.target.value)}
                    disabled={isLoading}
                  />
                  {rounds.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeRound(index)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRound}
                disabled={isLoading}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Round
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Interview Experience *</Label>
              <Textarea
                id="experience"
                placeholder="Describe your interview process, questions asked, atmosphere, etc."
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                required
                disabled={isLoading}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tips">Preparation Tips *</Label>
              <Textarea
                id="tips"
                placeholder="Share tips and advice for future candidates..."
                value={formData.tips}
                onChange={(e) =>
                  setFormData({ ...formData, tips: e.target.value })
                }
                required
                disabled={isLoading}
                rows={3}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  "Share Experience"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
