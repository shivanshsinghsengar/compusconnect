"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  noteId: string;
  initialLiked: boolean;
}

export function LikeButton({ noteId, initialLiked }: LikeButtonProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/notes/${noteId}/like`, {
        method: "POST",
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to like note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className="gap-2"
    >
      <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
}
