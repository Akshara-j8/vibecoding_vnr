"use client";
import { useState } from "react";
import SimulationCanvas from "@/components/SimulationCanvas";
import LessonCard from "@/components/LessonCard";
import ProblemCard from "@/components/ProblemCard";

export default function TopicPage({ params }: any) {
  const [problem, setProblem] = useState("");

  // Sample data - in a real app, this would come from an API
  const topicData: any = {
    "projectile-motion": {
      title: "Projectile Motion",
      description: "Learn about objects launched into the air and their motion under gravity.",
      lessons: [
        { id: "1", title: "Introduction to Projectile Motion", description: "Basic concepts and definitions", topicId: "projectile-motion" },
        { id: "2", title: "Horizontal and Vertical Components", description: "Breaking down motion into components", topicId: "projectile-motion" },
        { id: "3", title: "Range and Maximum Height", description: "Calculating key parameters", topicId: "projectile-motion" },
      ],
      problems: [
        { id: "1", title: "Ball Thrown Horizontally", description: "Calculate the range of a ball thrown from a cliff", difficulty: "Easy", topicId: "projectile-motion" },
        { id: "2", title: "Cannon Ball Trajectory", description: "Find the maximum height and range of a cannon ball", difficulty: "Medium", topicId: "projectile-motion" },
        { id: "3", title: "Projectile with Air Resistance", description: "Advanced problem including drag forces", difficulty: "Hard", topicId: "projectile-motion" },
      ]
    },
    "laws-of-motion": {
      title: "Laws of Motion",
      description: "Newton's three laws and their applications.",
      lessons: [
        { id: "1", title: "Newton's First Law", description: "Law of inertia", topicId: "laws-of-motion" },
        { id: "2", title: "Newton's Second Law", description: "F = ma", topicId: "laws-of-motion" },
        { id: "3", title: "Newton's Third Law", description: "Action-reaction pairs", topicId: "laws-of-motion" },
      ],
      problems: [
        { id: "1", title: "Block on Inclined Plane", description: "Find acceleration of a block sliding down", difficulty: "Medium", topicId: "laws-of-motion" },
        { id: "2", title: "Rocket Propulsion", description: "Calculate thrust and acceleration", difficulty: "Hard", topicId: "laws-of-motion" },
      ]
    },
    "work-energy": {
      title: "Work & Energy",
      description: "Conservation of energy and work principles.",
      lessons: [
        { id: "1", title: "Work Done by Forces", description: "Definition and calculation", topicId: "work-energy" },
        { id: "2", title: "Kinetic and Potential Energy", description: "Types of mechanical energy", topicId: "work-energy" },
        { id: "3", title: "Conservation of Energy", description: "Energy conservation principle", topicId: "work-energy" },
      ],
      problems: [
        { id: "1", title: "Pendulum Motion", description: "Energy conservation in pendulum", difficulty: "Medium", topicId: "work-energy" },
        { id: "2", title: "Spring-Mass System", description: "Oscillations and energy", difficulty: "Hard", topicId: "work-energy" },
      ]
    }
  };

  const currentTopic = topicData[params.id] || {
    title: params.id.replace(/-/g, ' ').toUpperCase(),
    description: "Explore this physics topic",
    lessons: [],
    problems: []
  };

  return (
    <div className="min-h-screen p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{currentTopic.title}</h1>
        <p className="text-xl text-gray-400">{currentTopic.description}</p>
      </div>

      {currentTopic.lessons.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Lessons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTopic.lessons.map((lesson: any) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}

      {currentTopic.problems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Practice Problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTopic.problems.map((problem: any) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Interactive Simulation</h2>
        <p className="text-gray-400 mb-4">
          Type a physics problem related to {currentTopic.title.toLowerCase()} and see it simulated in real-time.
        </p>

        <textarea
          className="w-full p-3 bg-slate-900 rounded mb-4"
          placeholder={`Type your ${currentTopic.title.toLowerCase()} problem...`}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />

        <SimulationCanvas problem={problem} topic={params.id} />
      </div>
    </div>
  );
}
