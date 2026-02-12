"use client";
import { useState } from "react";
import SimulationCanvas from "@/components/SimulationCanvas";

export default function LessonPage({ params }: any) {
  const [selectedProblem, setSelectedProblem] = useState("");

  // Sample lesson data - in a real app, this would come from an API
  const lessonData: any = {
    "projectile-motion": {
      "1": {
        title: "Introduction to Projectile Motion",
        description: "Learn the basics of projectile motion with interactive simulations.",
        problems: [
          "A ball is thrown horizontally from a cliff 50m high with a speed of 20 m/s. Find the range.",
          "A projectile is launched at 30 degrees with initial velocity 25 m/s. Calculate the maximum height.",
          "Find the time of flight for a ball thrown at 45 degrees with speed 10 m/s."
        ]
      },
      "2": {
        title: "Horizontal and Vertical Components",
        description: "Understand how motion is broken into horizontal and vertical components.",
        problems: [
          "A stone is thrown at 40 degrees with 15 m/s. Find horizontal and vertical components.",
          "Calculate the range when initial speed is 12 m/s at 60 degrees.",
          "A ball reaches maximum height of 10m. Find the initial vertical velocity."
        ]
      },
      "3": {
        title: "Range and Maximum Height",
        description: "Calculate key parameters of projectile motion.",
        problems: [
          "Find range and max height for v0=18 m/s, angle=37 degrees.",
          "A projectile has range 100m at 45 degrees. Find initial speed.",
          "Calculate time to reach max height for 20 m/s at 30 degrees."
        ]
      }
    },
    "laws-of-motion": {
      "1": {
        title: "Newton's First Law",
        description: "Law of inertia and its applications.",
        problems: [
          "A 5kg block on a frictionless surface is pushed with 10N force. Find acceleration.",
          "Calculate the force needed to accelerate a 2kg mass at 3 m/s².",
          "A car of mass 1000kg accelerates from rest to 20 m/s in 10s. Find force."
        ]
      },
      "2": {
        title: "Newton's Second Law",
        description: "F = ma and force analysis.",
        problems: [
          "Find acceleration of 3kg mass with 15N net force.",
          "A 10kg box is pulled with 50N force, friction 20N. Find acceleration.",
          "Calculate force for 4kg mass at 2 m/s² acceleration."
        ]
      },
      "3": {
        title: "Newton's Third Law",
        description: "Action-reaction pairs.",
        problems: [
          "A person pushes wall with 100N. Find wall's push on person.",
          "Rocket thrust 5000N, mass 2000kg. Find acceleration.",
          "Two boxes collide, one exerts 50N on other. Find reaction force."
        ]
      }
    },
    "work-energy": {
      "1": {
        title: "Work Done by Forces",
        description: "Calculate work done by various forces.",
        problems: [
          "Find work done by 10N force over 5m at 30 degrees.",
          "A 20N force moves object 8m. Work done?",
          "Calculate work for constant 15N force over 10m."
        ]
      },
      "2": {
        title: "Kinetic and Potential Energy",
        description: "Energy forms and conservation.",
        problems: [
          "Find KE of 5kg mass at 4 m/s.",
          "Potential energy of 10kg at 20m height.",
          "Total energy of system with KE=100J, PE=200J."
        ]
      },
      "3": {
        title: "Conservation of Energy",
        description: "Energy conservation in systems.",
        problems: [
          "Ball dropped from 25m. Find speed at ground.",
          "Spring compressed 0.2m, k=1000N/m. Find energy.",
          "Pendulum at 10m height. Find speed at bottom."
        ]
      }
    }
  };

  const currentLesson = lessonData[params.id]?.[params.lessonId] || {
    title: "Lesson Not Found",
    description: "This lesson content is not available yet.",
    problems: []
  };

  return (
    <div className="min-h-screen p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{currentLesson.title}</h1>
        <p className="text-xl text-gray-400">{currentLesson.description}</p>
      </div>

      {currentLesson.problems.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Try These Problems</h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {currentLesson.problems.map((problem: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedProblem(problem)}
                className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition text-left"
              >
                <p className="text-gray-300">{problem}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Interactive Simulation</h2>
        <p className="text-gray-400 mb-4">
          Click on a problem above or type your own to see the simulation.
        </p>

        <textarea
          className="w-full p-3 bg-slate-900 rounded mb-4"
          placeholder="Type your physics problem..."
          value={selectedProblem}
          onChange={(e) => setSelectedProblem(e.target.value)}
        />

        <SimulationCanvas problem={selectedProblem} />
      </div>
    </div>
  );
}
