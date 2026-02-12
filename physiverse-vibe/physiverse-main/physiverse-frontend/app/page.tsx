import TopicCard from "@/components/TopicCard";

export default function Home() {
  const topics = [
    { id: "projectile-motion", title: "Projectile Motion" },
    { id: "laws-of-motion", title: "Laws of Motion" },
    { id: "work-energy", title: "Work & Energy" },
    { id: "thermodynamics", title: "Thermodynamics" },
    { id: "electromagnetic", title: "Electromagnetic" },
    { id: "quantum-physics", title: "Quantum Physics" },
    { id: "optics", title: "Optics" },
    { id: "fluid-mechanics", title: "Fluid Mechanics" },
    { id: "waves-sound", title: "Waves & Sound" },
  ];

  return (
    <div className="min-h-screen p-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-cyan-400">Physiverse</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore the fascinating world of physics through interactive lessons, challenging problems, and real-time simulations.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Choose a Topic to Explore
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl text-center">
        <h3 className="text-2xl font-semibold mb-4">Ready to Start Learning?</h3>
        <p className="text-gray-400 mb-6">
          Each topic includes comprehensive lessons, practice problems, and interactive simulations to help you master physics concepts.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="text-cyan-400">📚 Lessons</div>
          <div className="text-cyan-400">🧮 Problems</div>
          <div className="text-cyan-400">🎮 Simulations</div>
        </div>
      </div>
    </div>
  );
}