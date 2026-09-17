import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, ArrowBigUp, MessageCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AnonymousPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const where: any = {};

  if (searchParams.type) {
    where.type = searchParams.type;
  }

  const posts = await prisma.anonymousPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const types = ["Doubt", "Confession", "Career"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Anonymous Board</h1>
          <p className="text-muted-foreground">
            Share doubts, confessions, and career thoughts anonymously
          </p>
        </div>
        <Link href="/anonymous/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Link href="/anonymous">
              <Button
                variant={!searchParams.type ? "default" : "outline"}
                size="sm"
              >
                All Posts
              </Button>
            </Link>
            {types.map((type) => (
              <Link key={type} href={`/anonymous?type=${type}`}>
                <Button
                  variant={searchParams.type === type ? "default" : "outline"}
                  size="sm"
                >
                  {type}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.length === 0 ? (
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No posts yet. Be the first to share!
            </p>
            <Link href="/anonymous/create">
              <Button>Create Your First Post</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const typeColors: Record<string, string> = {
              Doubt: "bg-skyBlue/20 text-skyBlue",
              Confession: "bg-peach/20 text-peach",
              Career: "bg-mint/20 text-mint",
            };

            return (
              <Link key={post.id} href={`/anonymous/${post.id}`}>
                <Card className="bg-white hover:shadow-lg transition-all cursor-pointer border-none">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-md font-medium ${
                                typeColors[post.type] ||
                                "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {post.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                        <span className="flex items-center gap-1">
                          <ArrowBigUp className="h-4 w-4" />
                          {post.upvotes} upvotes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post._count.comments} comments
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
