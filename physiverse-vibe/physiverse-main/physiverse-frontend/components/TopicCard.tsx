import Link from "next/link";

export default function TopicCard({ topic }: any) {
  return (
    <Link href={`/topic/${topic.id}`}>
      <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition cursor-pointer">
        <h2 className="text-xl font-semibold">{topic.title}</h2>
        <p className="text-gray-400 mt-2">Start Learning →</p>
      </div>
    </Link>
  );
}
