import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function BookingsPage() {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { meetings: { orderBy: { startTime: "desc" } } },
  });

  const meetings = user?.meetings ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Meetings</h1>
      {meetings.length === 0 ? (
        <div className="text-gray-600">No meetings yet.</div>
      ) : (
        <ul className="space-y-4">
          {meetings.map((m) => (
            <li key={m.id} className="rounded border border-black/10 p-4">
              <div className="font-medium">{m.title}</div>
              <div className="text-sm text-gray-600">
                {new Date(m.startTime).toLocaleString()} – {new Date(m.endTime).toLocaleTimeString()}
              </div>
              {m.meetLink && (
                <div className="mt-2">
                  <a className="text-blue-600 underline" href={m.meetLink} target="_blank" rel="noreferrer">
                    Join Google Meet
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
