"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
  noteId: string;
  initialBookmarked: boolean;
}

export function BookmarkButton({ noteId, initialBookmarked }: BookmarkButtonProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/notes/${noteId}/bookmark`, {
        method: "POST",
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to bookmark note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      size="sm"
      onClick={handleBookmark}
      disabled={isLoading}
      className="gap-2"
    >
      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
      {isBookmarked ? "Saved" : "Save"}
    </Button>
  );
}
