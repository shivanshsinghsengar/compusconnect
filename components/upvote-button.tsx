"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface UpvoteButtonProps {
  postId: string;
  upvotes: number;
}

export function UpvoteButton({ postId, upvotes: initialUpvotes }: UpvoteButtonProps) {
  const router = useRouter();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/anonymous/${postId}/upvote`, {
        method: "POST",
      });

      if (response.ok) {
        setUpvotes(upvotes + 1);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUpvote}
      disabled={isLoading}
      className="gap-2"
    >
      <ArrowBigUp className="h-4 w-4" />
      {upvotes} Upvotes
    </Button>
  );
}
