import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Download, Heart, Eye } from "lucide-react";
import { formatDate, getSubjectColor } from "@/lib/utils";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: { subject?: string; semester?: string };
}) {
  const where: any = {};
  
  if (searchParams.subject) {
    where.subject = searchParams.subject;
  }
  
  if (searchParams.semester) {
    where.semester = searchParams.semester;
  }

  const notes = await prisma.note.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
          bookmarks: true,
        },
      },
    },
  });

  const subjects = await prisma.note.findMany({
    distinct: ["subject"],
    select: { subject: true },
  });

  const semesters = await prisma.note.findMany({
    distinct: ["semester"],
    select: { semester: true },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-muted-foreground">
            Share and discover study materials with AI summaries
          </p>
        </div>
        <Link href="/notes/upload">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Upload Notes
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Subject</p>
              <div className="flex flex-wrap gap-2">
                <Link href="/notes">
                  <Button
                    variant={!searchParams.subject ? "default" : "outline"}
                    size="sm"
                  >
                    All
                  </Button>
                </Link>
                {subjects.map((s) => (
                  <Link
                    key={s.subject}
                    href={`/notes?subject=${s.subject}${
                      searchParams.semester
                        ? `&semester=${searchParams.semester}`
                        : ""
                    }`}
                  >
                    <Button
                      variant={
                        searchParams.subject === s.subject
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                    >
                      {s.subject}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Semester</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/notes${
                    searchParams.subject ? `?subject=${searchParams.subject}` : ""
                  }`}
                >
                  <Button
                    variant={!searchParams.semester ? "default" : "outline"}
                    size="sm"
                  >
                    All
                  </Button>
                </Link>
                {semesters.map((s) => (
                  <Link
                    key={s.semester}
                    href={`/notes?semester=${s.semester}${
                      searchParams.subject
                        ? `&subject=${searchParams.subject}`
                        : ""
                    }`}
                  >
                    <Button
                      variant={
                        searchParams.semester === s.semester
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                    >
                      {s.semester}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No notes found. Be the first to share!
            </p>
            <Link href="/notes/upload">
              <Button>Upload Your First Note</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`}>
              <Card
                className={`bg-white hover:shadow-lg transition-all cursor-pointer border-l-4 ${getSubjectColor(
                  note.subject
                )}`}
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {note.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {note.subject} • {note.semester}
                      </p>
                    </div>

                    {note.aiSummary && (
                      <div className="bg-softPurple/10 p-3 rounded-md">
                        <p className="text-xs font-medium text-softPurple mb-1">
                          ✨ AI Summary
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {note.aiSummary}
                        </p>
                      </div>
                    )}

                    {note.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {note.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>by {note.user.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {note._count.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {note.views}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
