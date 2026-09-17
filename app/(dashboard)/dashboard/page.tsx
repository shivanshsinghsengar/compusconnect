import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatDate, getSubjectColor } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: {
          notes: true,
          placements: true,
          anonymousPosts: true,
        },
      },
    },
  });

  // Get recent notes
  const recentNotes = await prisma.note.findMany({
    take: 5,
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
        },
      },
    },
  });

  // Get recent placements
  const recentPlacements = await prisma.placement.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const stats = [
    {
      title: "My Notes",
      value: user?._count.notes || 0,
      icon: BookOpen,
      color: "bg-mint/20 text-mint",
      href: "/notes",
    },
    {
      title: "Placement Posts",
      value: user?._count.placements || 0,
      icon: Briefcase,
      color: "bg-peach/20 text-peach",
      href: "/placements",
    },
    {
      title: "Anonymous Posts",
      value: user?._count.anonymousPosts || 0,
      icon: MessageSquare,
      color: "bg-softPurple/20 text-softPurple",
      href: "/anonymous",
    },
    {
      title: "Total Community Notes",
      value: await prisma.note.count(),
      icon: TrendingUp,
      color: "bg-skyBlue/20 text-skyBlue",
      href: "/notes",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          Welcome back, {user?.name?.split(" ")[0] || "Student"}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s what&apos;s happening in your campus community today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Notes */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-mint" />
              Recent Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentNotes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No notes available yet. Be the first to share!
              </p>
            ) : (
              recentNotes.map((note) => (
                <Link key={note.id} href={`/notes/${note.id}`}>
                  <div
                    className={`p-4 rounded-lg bg-cream hover:shadow-md transition-shadow cursor-pointer border-l-4 ${getSubjectColor(
                      note.subject
                    )}`}
                  >
                    <h3 className="font-semibold text-sm mb-1">{note.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {note.subject} • {note.semester}
                      </span>
                      <span>❤️ {note._count.likes}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      by {note.user.name}
                    </p>
                  </div>
                </Link>
              ))
            )}
            <Link href="/notes">
              <p className="text-sm text-softPurple hover:underline text-center">
                View all notes →
              </p>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Placements */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-peach" />
              Recent Interview Experiences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPlacements.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No placement experiences yet. Share yours!
              </p>
            ) : (
              recentPlacements.map((placement) => (
                <Link key={placement.id} href={`/placements/${placement.id}`}>
                  <div className="p-4 rounded-lg bg-cream hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-semibold text-sm mb-1">
                      {placement.company} - {placement.role}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Difficulty: {placement.difficulty}</span>
                      <span>{formatDate(placement.createdAt)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      by {placement.user.name}
                    </p>
                  </div>
                </Link>
              ))
            )}
            <Link href="/placements">
              <p className="text-sm text-softPurple hover:underline text-center">
                View all experiences →
              </p>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-softPurple/10 to-skyBlue/10 border-none shadow-sm">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/notes/upload">
              <div className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <BookOpen className="h-6 w-6 text-mint mb-2" />
                <h4 className="font-medium text-sm">Upload Notes</h4>
                <p className="text-xs text-muted-foreground">
                  Share your study materials
                </p>
              </div>
            </Link>
            <Link href="/placements/share">
              <div className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <Briefcase className="h-6 w-6 text-peach mb-2" />
                <h4 className="font-medium text-sm">Share Experience</h4>
                <p className="text-xs text-muted-foreground">
                  Help others with your journey
                </p>
              </div>
            </Link>
            <Link href="/anonymous/create">
              <div className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <MessageSquare className="h-6 w-6 text-softPurple mb-2" />
                <h4 className="font-medium text-sm">Post Anonymously</h4>
                <p className="text-xs text-muted-foreground">
                  Ask doubts or share thoughts
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
