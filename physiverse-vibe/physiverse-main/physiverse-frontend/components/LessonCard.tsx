import Link from "next/link";

export default function LessonCard({ lesson }: any) {
  return (
    <Link href={`/topic/${lesson.topicId}/lesson/${lesson.id}`}>
      <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition cursor-pointer">
        <h3 className="text-xl font-semibold">{lesson.title}</h3>
        <p className="text-gray-400 mt-2">{lesson.description}</p>
        <div className="mt-4 flex items-center">
          <span className="text-cyan-400">📚</span>
          <span className="ml-2 text-sm text-gray-400">Lesson</span>
        </div>
      </div>
    </Link>
  );
}
