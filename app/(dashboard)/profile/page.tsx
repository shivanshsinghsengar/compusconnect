import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, MessageSquare, Calendar, Mail, GraduationCap, Building2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      notes: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
      placements: {
        take: 3,
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          notes: true,
          placements: true,
          anonymousPosts: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Link href="/settings">
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </div>

      {/* Profile Card */}
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="bg-softPurple text-white text-2xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {user.college && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {user.college}
                  </span>
                )}
                {user.branch && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {user.branch}
                  </span>
                )}
                {user.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Year {user.year}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-mint/10 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-mint/20 rounded-full">
                <BookOpen className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user._count.notes}</p>
                <p className="text-sm text-muted-foreground">Notes Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-peach/10 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-peach/20 rounded-full">
                <Briefcase className="h-6 w-6 text-peach" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user._count.placements}</p>
                <p className="text-sm text-muted-foreground">
                  Experiences Shared
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-softPurple/10 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-softPurple/20 rounded-full">
                <MessageSquare className="h-6 w-6 text-softPurple" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {user._count.anonymousPosts}
                </p>
                <p className="text-sm text-muted-foreground">
                  Anonymous Posts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* My Notes */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">My Recent Notes</CardTitle>
          </CardHeader>
          <CardContent>
            {user.notes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No notes shared yet
              </p>
            ) : (
              <div className="space-y-3">
                {user.notes.map((note) => (
                  <Link key={note.id} href={`/notes/${note.id}`}>
                    <div className="p-3 bg-cream rounded-lg hover:shadow-md transition-shadow">
                      <p className="font-medium text-sm">{note.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {note.subject} • {formatDate(note.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Experiences */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">My Interview Experiences</CardTitle>
          </CardHeader>
          <CardContent>
            {user.placements.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No experiences shared yet
              </p>
            ) : (
              <div className="space-y-3">
                {user.placements.map((placement) => (
                  <Link key={placement.id} href={`/placements/${placement.id}`}>
                    <div className="p-3 bg-cream rounded-lg hover:shadow-md transition-shadow">
                      <p className="font-medium text-sm">
                        {placement.company} - {placement.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {placement.difficulty} • {formatDate(placement.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
