import Link from "next/link";

export default function ProblemCard({ problem }: any) {
  return (
    <Link href={`/topic/${problem.topicId}/problem/${problem.id}`}>
      <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition cursor-pointer">
        <h3 className="text-xl font-semibold">{problem.title}</h3>
        <p className="text-gray-400 mt-2">{problem.description}</p>
        <div className="mt-4 flex items-center">
          <span className="text-cyan-400">🧮</span>
          <span className="ml-2 text-sm text-gray-400">Problem</span>
          <span className="ml-auto text-sm text-gray-400">Difficulty: {problem.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}
