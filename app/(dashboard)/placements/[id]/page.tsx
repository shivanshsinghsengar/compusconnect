import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Calendar, Lightbulb, CheckCircle2 } from "lucide-react";
import { formatDate, getDifficultyColor } from "@/lib/utils";
import Link from "next/link";

export default async function PlacementPage({
  params,
}: {
  params: { id: string };
}) {
  const placement = await prisma.placement.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          college: true,
          branch: true,
        },
      },
    },
  });

  if (!placement) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/placements">
        <Button variant="ghost" size="sm">
          ← Back to Placements
        </Button>
      </Link>

      {/* Header Card */}
      <Card className="bg-white border-none shadow-sm border-l-4 border-l-peach">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-peach" />
                <CardTitle className="text-3xl">{placement.company}</CardTitle>
              </div>
              <p className="text-xl text-muted-foreground">{placement.role}</p>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-md font-medium ${getDifficultyColor(
                    placement.difficulty
                  )}`}
                >
                  {placement.difficulty}
                </span>
                {placement.ctc && (
                  <span className="text-sm bg-mint/20 text-mint px-3 py-1 rounded-md font-medium">
                    💰 {placement.ctc}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Avatar>
              <AvatarImage src={placement.user.image || undefined} />
              <AvatarFallback className="bg-softPurple text-white">
                {placement.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{placement.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {placement.user.college}{" "}
                {placement.user.branch && `• ${placement.user.branch}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(placement.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Rounds */}
      <Card className="bg-white border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-skyBlue" />
            Interview Rounds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {placement.rounds.map((round, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-cream rounded-lg"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-skyBlue/20 text-skyBlue font-semibold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm flex-1 pt-1">{round}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Experience */}
      <Card className="bg-white border-none shadow-sm">
        <CardHeader>
          <CardTitle>Interview Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {placement.experience}
          </p>
        </CardContent>
      </Card>

      {/* Preparation Tips */}
      <Card className="bg-gradient-to-r from-softPurple/10 to-mint/10 border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-softPurple" />
            Preparation Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {placement.tips}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
