import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Heart, Bookmark, Eye, Calendar, User } from "lucide-react";
import { formatDate, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LikeButton } from "@/components/like-button";
import { BookmarkButton } from "@/components/bookmark-button";

export default async function NotePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const note = await prisma.note.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          college: true,
          branch: true,
        },
      },
      _count: {
        select: {
          likes: true,
          bookmarks: true,
        },
      },
      likes: session?.user?.id
        ? {
            where: {
              userId: session.user.id,
            },
          }
        : false,
      bookmarks: session?.user?.id
        ? {
            where: {
              userId: session.user.id,
            },
          }
        : false,
    },
  });

  if (!note) {
    notFound();
  }

  // Increment view count
  await prisma.note.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
  });

  const isLiked = note.likes && note.likes.length > 0;
  const isBookmarked = note.bookmarks && note.bookmarks.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/notes">
        <Button variant="ghost" size="sm">
          ← Back to Notes
        </Button>
      </Link>

      {/* Note Header */}
      <Card className={`bg-white border-none shadow-sm border-l-4 ${getSubjectColor(note.subject)}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="bg-mint/20 text-mint px-2 py-1 rounded-md font-medium">
                  {note.subject}
                </span>
                <span className="bg-skyBlue/20 text-skyBlue px-2 py-1 rounded-md font-medium">
                  {note.semester}
                </span>
              </div>
              <CardTitle className="text-3xl">{note.title}</CardTitle>
              {note.description && (
                <p className="text-muted-foreground">{note.description}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Summary */}
          {note.aiSummary && (
            <div className="bg-softPurple/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-softPurple">
                  ✨ AI Summary
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {note.aiSummary}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {note.views} views
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {note._count.likes} likes
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              {note._count.bookmarks} bookmarks
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(note.createdAt)}
            </span>
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={note.user.image || undefined} />
                <AvatarFallback className="bg-softPurple text-white">
                  {note.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{note.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {note.user.college} {note.user.branch && `• ${note.user.branch}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {session?.user?.id && (
                <>
                  <LikeButton noteId={note.id} initialLiked={isLiked} />
                  <BookmarkButton noteId={note.id} initialBookmarked={isBookmarked} />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Preview/Download */}
      <Card className="bg-white border-none shadow-sm">
        <CardHeader>
          <CardTitle>File Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>File Type: {note.fileType}</span>
            </div>
            <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download File
              </Button>
            </a>
          </div>

          {note.fileType === "IMAGE" ? (
            <div className="rounded-lg overflow-hidden">
              <img
                src={note.fileUrl}
                alt={note.title}
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                PDF preview not available. Click the download button to view the file.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
