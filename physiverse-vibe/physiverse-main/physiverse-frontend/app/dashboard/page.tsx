"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { useState } from "react";

export default function PhysiverseDashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  // Weekly learning activity
  const weeklyActivity = [
    { day: "Mon", lessonsCompleted: 2, simulationsRun: 8, problemsSolved: 5, timeSpent: 45 },
    { day: "Tue", lessonsCompleted: 3, simulationsRun: 12, problemsSolved: 7, timeSpent: 62 },
    { day: "Wed", lessonsCompleted: 1, simulationsRun: 5, problemsSolved: 3, timeSpent: 30 },
    { day: "Thu", lessonsCompleted: 4, simulationsRun: 15, problemsSolved: 9, timeSpent: 85 },
    { day: "Fri", lessonsCompleted: 2, simulationsRun: 10, problemsSolved: 6, timeSpent: 50 },
    { day: "Sat", lessonsCompleted: 3, simulationsRun: 14, problemsSolved: 8, timeSpent: 70 },
    { day: "Sun", lessonsCompleted: 5, simulationsRun: 18, problemsSolved: 11, timeSpent: 95 },
  ];

  // Chapter/Topic mastery
  const topicMastery = [
    { subject: "Projectile Motion", mastery: 85, lessons: 8, problems: 24, simulations: 45 },
    { subject: "Laws of Motion", mastery: 72, lessons: 6, problems: 18, simulations: 32 },
    { subject: "Work & Energy", mastery: 68, lessons: 5, problems: 15, simulations: 28 },
    { subject: "Circular Motion", mastery: 45, lessons: 3, problems: 9, simulations: 15 },
    { subject: "Gravitation", mastery: 38, lessons: 2, problems: 6, simulations: 10 },
    { subject: "Fluid Mechanics", mastery: 25, lessons: 1, problems: 3, simulations: 5 },
  ];

  // Radar chart for physics skills
  const skillsData = [
    { skill: "Kinematics", value: 85 },
    { skill: "Dynamics", value: 72 },
    { skill: "Energy", value: 68 },
    { skill: "Momentum", value: 75 },
    { skill: "Analysis", value: 80 },
    { skill: "Problem Solving", value: 70 },
  ];

  // Recent simulations
  const recentSimulations = [
    { 
      problem: "Projectile at 20 m/s, 45°",
      topic: "Projectile Motion",
      time: "2h ago",
      accuracy: 95,
      attempts: 1
    },
    { 
      problem: "Ball rolling down incline 30°",
      topic: "Laws of Motion",
      time: "5h ago",
      accuracy: 88,
      attempts: 2
    },
    { 
      problem: "Spring-mass system k=200 N/m",
      topic: "Work & Energy",
      time: "1d ago",
      accuracy: 92,
      attempts: 1
    },
    { 
      problem: "Circular motion r=5m, v=10m/s",
      topic: "Circular Motion",
      time: "1d ago",
      accuracy: 78,
      attempts: 3
    },
  ];

  // Difficulty breakdown
  const difficultyData = [
    { difficulty: "Easy", solved: 28, total: 30, color: "#22c55e" },
    { difficulty: "Medium", solved: 35, total: 45, color: "#eab308" },
    { difficulty: "Hard", solved: 12, total: 25, color: "#ef4444" },
  ];

  // Activity heatmap data
  const generateActivityHeatmap = () => {
    const data = [];
    for (let week = 0; week < 12; week++) {
      for (let day = 0; day < 7; day++) {
        data.push({
          week,
          day,
          count: Math.floor(Math.random() * 6),
        });
      }
    }
    return data;
  };

  const heatmapData = generateActivityHeatmap();

  const getHeatColor = (count: number) => {
    if (count === 0) return "#1e293b";
    if (count === 1) return "#164e63";
    if (count === 2) return "#0e7490";
    if (count === 3) return "#0891b2";
    if (count === 4) return "#06b6d4";
    return "#22d3ee";
  };

  // Achievements
  const achievements = [
    { icon: "🎯", title: "First Simulation", desc: "Ran your first physics simulation", unlocked: true },
    { icon: "🔥", title: "Week Warrior", desc: "7-day learning streak", unlocked: true },
    { icon: "⚡", title: "Speed Solver", desc: "Solved 10 problems in one day", unlocked: true },
    { icon: "🧠", title: "Physics Master", desc: "100% mastery in one topic", unlocked: false },
    { icon: "🚀", title: "Simulation Pro", desc: "Run 100 simulations", unlocked: false },
    { icon: "🏆", title: "Perfect Score", desc: "Get 100% on a hard problem", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Physiverse Dashboard
        </h1>
        <p className="text-slate-300">Master physics through interactive learning and simulations</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-200 text-sm font-medium">Current Streak</span>
            <span className="text-3xl">🔥</span>
          </div>
          <div className="text-4xl font-bold text-cyan-300">14 Days</div>
          <div className="text-xs text-cyan-400/70 mt-2">Longest: 21 days</div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all shadow-lg hover:shadow-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-200 text-sm font-medium">Simulations Run</span>
            <span className="text-3xl">🎯</span>
          </div>
          <div className="text-4xl font-bold text-green-300">156</div>
          <div className="text-xs text-green-400/70 mt-2">+18 this week</div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all shadow-lg hover:shadow-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-200 text-sm font-medium">Problems Solved</span>
            <span className="text-3xl">✓</span>
          </div>
          <div className="text-4xl font-bold text-purple-300">75</div>
          <div className="text-xs text-purple-400/70 mt-2">85% accuracy</div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-sm p-6 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all shadow-lg hover:shadow-amber-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-200 text-sm font-medium">Learning Time</span>
            <span className="text-3xl">⏱️</span>
          </div>
          <div className="text-4xl font-bold text-amber-300">42h</div>
          <div className="text-xs text-amber-400/70 mt-2">This month</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Weekly Activity */}
        <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-100">Weekly Activity</h2>
            <select 
              className="bg-slate-800 text-sm px-3 py-1.5 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyActivity}>
              <defs>
                <linearGradient id="colorSims" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Area type="monotone" dataKey="simulationsRun" stroke="#22d3ee" fillOpacity={1} fill="url(#colorSims)" name="Simulations" />
              <Area type="monotone" dataKey="problemsSolved" stroke="#a78bfa" fillOpacity={1} fill="url(#colorProblems)" name="Problems Solved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar */}
        <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-slate-100">Physics Skills</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="skill" stroke="#94a3b8" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
              <Radar name="Mastery" dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Mastery Progress */}
      <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl mb-10">
        <h2 className="text-xl font-semibold mb-6 text-slate-100">Topic Mastery</h2>
        <div className="space-y-4">
          {topicMastery.map((topic, idx) => (
            <div key={idx} className="bg-slate-800/50 p-4 rounded-lg hover:bg-slate-800/70 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-slate-100">{topic.subject}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {topic.lessons} lessons • {topic.problems} problems • {topic.simulations} simulations
                  </div>
                </div>
                <div className="text-2xl font-bold text-cyan-400">{topic.mastery}%</div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${topic.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Breakdown & Recent Simulations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Difficulty Stats */}
        <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-slate-100">Problem Difficulty</h2>
          <div className="space-y-4">
            {difficultyData.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">{item.difficulty}</span>
                  <span className="text-sm text-slate-400">{item.solved}/{item.total}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(item.solved / item.total) * 100}%`,
                      backgroundColor: item.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
            {difficultyData.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: item.color }}>
                  {item.solved}
                </div>
                <div className="text-xs text-slate-400">{item.difficulty}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Simulations */}
        <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-slate-100">Recent Simulations</h2>
          <div className="space-y-3">
            {recentSimulations.map((sim, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-all border border-slate-700/30 hover:border-cyan-500/30"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-100 mb-1">{sim.problem}</div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-cyan-400">{sim.topic}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{sim.time}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{sim.attempts} attempt{sim.attempts > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className={`text-lg font-bold ${sim.accuracy >= 90 ? 'text-green-400' : sim.accuracy >= 70 ? 'text-yellow-400' : 'text-orange-400'}`}>
                    {sim.accuracy}%
                  </div>
                  <div className="text-xs text-slate-500">accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-100">Learning Activity</h2>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: getHeatColor(i) }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1">
            {Array.from({ length: 12 }, (_, week) => (
              <div key={week} className="flex flex-col gap-1">
                {Array.from({ length: 7 }, (_, day) => {
                  const data = heatmapData.find(d => d.week === week && d.day === day);
                  return (
                    <div
                      key={`${week}-${day}`}
                      className="w-3.5 h-3.5 rounded hover:ring-2 ring-cyan-400 transition-all cursor-pointer"
                      style={{ backgroundColor: getHeatColor(data?.count || 0) }}
                      title={`${data?.count || 0} activities`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-xl">
        <h2 className="text-xl font-semibold mb-6 text-slate-100">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30 hover:border-cyan-400/50'
                  : 'bg-slate-800/30 border-slate-700/30 opacity-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-100 mb-1">{achievement.title}</div>
                  <div className="text-xs text-slate-400">{achievement.desc}</div>
                </div>
                {achievement.unlocked && (
                  <div className="text-green-400">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}