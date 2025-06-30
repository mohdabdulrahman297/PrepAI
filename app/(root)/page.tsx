import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

import tkImage from "@/public/calendar.svg";
import tk1Image from "@/public/Voice-AI-agent.png";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Updated Navbar with oval corners and better transparency */}
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-sm bg-background/40 border border-border/40 rounded-full px-6">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-6">
                <span className="text-sm text-muted-foreground">
                  Welcome back,{" "}
                  <span className="font-medium text-foreground">
                    {user?.name}
                  </span>
                </span>
                <form action={signOut}>
                  <Button
                    variant="ghost"
                    type="submit"
                    className="hover:bg-destructive/10 hover:text-destructive rounded-full cursor-pointer"
                  >
                    Sign Out
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <Image
            src={tk1Image}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-[1px]" />
        </div>

        {/* Main Content */}
        <main className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            {/* Hero Background */}
            <div className="absolute inset-0 z-0">
              <Image src={tkImage} alt="Background" fill priority />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-between p-8 sm:p-12 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm">
              <div className="flex flex-col gap-6 max-w-lg">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                  Get Interview-Ready with AI-Powered Practice & Feedback
                </h2>
                <p className="text-lg text-white/80">
                  Practice real interview questions & get instant feedback
                </p>

                <Button
                  asChild
                  className="flex items-center justify-center cursor-pointer w-full text-md font-bold bg-orange-300 hover:bg-orange-400 rounded-md"
                >
                  <Link href="/interview">Start an Interview</Link>
                </Button>
              </div>

              <Image
                src="/Voice-ai-agent.png"
                alt="robo-dude"
                width={400}
                height={400}
                className="max-sm:hidden hover:scale-105 transition-transform duration-500"
              />
            </div>
          </section>

          {/* Your Interviews Section */}
          <section className="flex flex-col gap-6 mt-8">
            <h2 className="text-2xl font-semibold text-white">
              Your Interviews
            </h2>

            <div className="interviews-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hasPastInterviews ? (
                userInterviews?.map((interview) => (
                  <div
                    key={interview.id}
                    className="p-6 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <InterviewCard
                      userId={user?.id}
                      interviewId={interview.id}
                      role={interview.role}
                      type={interview.type}
                      techstack={interview.techstack}
                      createdAt={interview.createdAt}
                    />
                  </div>
                ))
              ) : (
                <p className="text-white/60 italic">
                  You haven&apos;t taken any interviews yet
                </p>
              )}
            </div>
          </section>

          {/* Take Interviews Section */}
          <section className="flex flex-col gap-6 mt-8">
            <h2 className="text-2xl font-semibold text-white">
              Take Interviews
            </h2>

            <div className="interviews-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hasUpcomingInterviews ? (
                allInterview?.map((interview) => (
                  <div
                    key={interview.id}
                    className="p-6 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <InterviewCard
                      userId={user?.id}
                      interviewId={interview.id}
                      role={interview.role}
                      type={interview.type}
                      techstack={interview.techstack}
                      createdAt={interview.createdAt}
                    />
                  </div>
                ))
              ) : (
                <p className="text-white/60 italic">
                  There are no new interviews available
                </p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;