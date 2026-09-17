import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, MessageCircle, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { UpvoteButton } from "@/components/upvote-button";
import { CommentSection } from "@/components/comment-section";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AnonymousPostPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const post = await prisma.anonymousPost.findUnique({
    where: { id: params.id },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const typeColors: Record<string, string> = {
    Doubt: "bg-skyBlue/20 text-skyBlue border-l-skyBlue",
    Confession: "bg-peach/20 text-peach border-l-peach",
    Career: "bg-mint/20 text-mint border-l-mint",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/anonymous">
        <Button variant="ghost" size="sm">
          ← Back to Anonymous Board
        </Button>
      </Link>

      {/* Post Card */}
      <Card
        className={`bg-white border-none shadow-sm border-l-4 ${
          typeColors[post.type] || "border-l-gray-300"
        }`}
      >
        <CardHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-3 py-1 rounded-md font-medium ${
                  typeColors[post.type]?.replace("border-l-", "") ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {post.type}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.createdAt)}
              </span>
            </div>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          <div className="flex items-center gap-4 pt-4 border-t">
            {session?.user?.id && <UpvoteButton postId={post.id} upvotes={post.upvotes} />}
            {!session?.user?.id && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowBigUp className="h-5 w-5" />
                {post.upvotes} upvotes
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              {post.comments.length} comments
            </div>
          </div>

          <div className="bg-cream p-3 rounded-md flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            Posted anonymously
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      {session?.user?.id && (
        <CommentSection postId={post.id} comments={post.comments} />
      )}
      {!session?.user?.id && (
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Sign in to comment and engage with the community
            </p>
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
