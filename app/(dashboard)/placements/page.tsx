import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Plus, Building2, Calendar } from "lucide-react";
import { formatDate, getDifficultyColor } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function PlacementsPage() {
  const session = await getServerSession(authOptions);

  // Get all placement experiences
  const experiences = await prisma.placement.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          college: true,
        },
      },
    },
  });

  // Get user's applications if logged in
  const applications = session?.user?.id
    ? await prisma.application.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Placement Tracker</h1>
          <p className="text-muted-foreground">
            Track your applications and learn from interview experiences
          </p>
        </div>
        <Link href="/placements/share">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Share Experience
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="experiences" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="experiences">Interview Experiences</TabsTrigger>
          <TabsTrigger value="my-tracker">My Applications</TabsTrigger>
        </TabsList>

        {/* Interview Experiences Tab */}
        <TabsContent value="experiences" className="space-y-4">
          {experiences.length === 0 ? (
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No interview experiences yet. Be the first to share!
                </p>
                <Link href="/placements/share">
                  <Button>Share Your Experience</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {experiences.map((exp) => (
                <Link key={exp.id} href={`/placements/${exp.id}`}>
                  <Card className="bg-white hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-peach">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                              <Building2 className="h-5 w-5 text-peach" />
                              {exp.company}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {exp.role}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-md font-medium ${getDifficultyColor(
                              exp.difficulty
                            )}`}
                          >
                            {exp.difficulty}
                          </span>
                        </div>

                        {exp.ctc && (
                          <div className="bg-mint/10 px-3 py-2 rounded-md">
                            <p className="text-xs font-medium text-mint">
                              💰 CTC: {exp.ctc}
                            </p>
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground">
                          <p>
                            <span className="font-medium">Rounds:</span>{" "}
                            {exp.rounds.length}
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {exp.experience}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                          <span>by {exp.user.name}</span>
                          <span>{formatDate(exp.createdAt)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        {/* My Applications Tab */}
        <TabsContent value="my-tracker" className="space-y-4">
          <div className="flex justify-end">
            <Link href="/placements/tracker/add">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Application
              </Button>
            </Link>
          </div>

          {applications.length === 0 ? (
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No applications tracked yet. Start tracking your journey!
                </p>
                <Link href="/placements/tracker/add">
                  <Button>Add Your First Application</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <Card
                  key={app.id}
                  className="bg-white border-none shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-peach" />
                          {app.company}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {app.role}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${getDifficultyColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(app.appliedDate)}
                        </p>
                      </div>
                    </div>
                    {app.notes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {app.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
