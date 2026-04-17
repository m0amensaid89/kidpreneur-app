import { createClient } from "@/lib/supabase/server";
import { WORLDS } from "@/lib/data/lessons";
import { QuizClient } from "./QuizClient";

export default async function QuizPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const unwrappedParams = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  let currentLesson = null;
  let worldId: string | undefined;
  let lessonTitle: string | undefined;

  for (const world of WORLDS) {
    const lesson = world.lessons.find(l => l.id === unwrappedParams.lessonId);
    if (lesson) {
      currentLesson = lesson;
      worldId = world.id;
      lessonTitle = lesson.title;
      break;
    }
  }

  if (!currentLesson) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-muted-foreground">Lesson not found.</p>
      </div>
    );
  }

  return (
    <QuizClient
      lessonId={currentLesson.id}
      worldId={worldId}
      lessonTitle={lessonTitle}
      quizData={currentLesson.quiz}
      userId={session?.user?.id}
    />
  );
}
