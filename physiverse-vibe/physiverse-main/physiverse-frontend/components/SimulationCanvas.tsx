"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function SimulationCanvas({ problem }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const [velocity, setVelocity] = useState(20);
  const [angle, setAngle] = useState(45);
  const gravity = 9.8;

  const [data, setData] = useState<any>(null);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [error, setError] = useState("");

  // ----------------------------
  // FETCH INITIAL DATA FROM BACKEND
  // ----------------------------
  useEffect(() => {
    if (!problem) return;

    axios
      .post("http://127.0.0.1:8001/simulate", { problem })
      .then((res) => {
        setVelocity(res.data.velocity);
        setAngle(res.data.angle);
        setData(res.data);
        setSelectedPoint(null);
        setError("");
      })
      .catch(() => setError("Simulation failed"));
  }, [problem]);

  // ----------------------------
  // RECOMPUTE WHEN SLIDERS CHANGE
  // ----------------------------
  useEffect(() => {
    if (!data) return;
    recomputeSimulation();
  }, [velocity, angle]);

  const recomputeSimulation = () => {
    const angleRad = (angle * Math.PI) / 180;

    const vxInitial = velocity * Math.cos(angleRad);
    const vyInitial = velocity * Math.sin(angleRad);

    const tFlight = (2 * vyInitial) / gravity;

    const steps = 200;
    const time = Array.from({ length: steps }, (_, i) =>
      (i / (steps - 1)) * tFlight
    );

    const x = time.map((t) => vxInitial * t);
    const y = time.map((t) =>
      Math.max(vyInitial * t - 0.5 * gravity * t * t, 0)
    );
    const vx = time.map(() => vxInitial);
    const vy = time.map((t) => vyInitial - gravity * t);
    const v = time.map((_, i) => Math.sqrt(vx[i] ** 2 + vy[i] ** 2));

    startAnimation({ x, y, time, vx, vy, v });
  };

  // ----------------------------
  // ANIMATION FUNCTION
  // ----------------------------
  const startAnimation = (simData: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const { x, y, time, vx, vy, v } = simData;

    const margin = 60;
    const maxX = Math.max(...x);
    const maxY = Math.max(...y);

    const scaleX = (canvas.width - margin * 2) / maxX;
    const scaleY = (canvas.height - margin * 2) / maxY;
    const scale = Math.min(scaleX, scaleY);

    const originX = margin;
    const originY = canvas.height - margin;

    let frame = 0;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Axes
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(canvas.width - margin, originY);
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, margin);
      ctx.stroke();

      // Trajectory
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      for (let i = 0; i < frame; i++) {
        ctx.lineTo(originX + x[i] * scale, originY - y[i] * scale);
      }
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ball
      if (frame < x.length) {
        ctx.beginPath();
        ctx.arc(
          originX + x[frame] * scale,
          originY - y[frame] * scale,
          6,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#ffcc00";
        ctx.fill();
      }

      // Angle arc
      ctx.beginPath();
      ctx.arc(originX, originY, 40, 0, (-angle * Math.PI) / 180, true);
      ctx.strokeStyle = "#ff00ff";
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`θ = ${angle}°`, originX + 35, originY - 10);

      // Selected point highlight
      if (selectedPoint) {
        ctx.beginPath();
        ctx.arc(
          originX + selectedPoint.x * scale,
          originY - selectedPoint.y * scale,
          8,
          0,
          2 * Math.PI
        );
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 15;
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frame++;
      if (frame < x.length) {
        animationRef.current = requestAnimationFrame(drawFrame);
      }
    };

    // CLICK DETECTION
    canvas.onclick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      let closestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < x.length; i++) {
        const px = originX + x[i] * scale;
        const py = originY - y[i] * scale;
        const dist = Math.sqrt((px - clickX) ** 2 + (py - clickY) ** 2);

        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = i;
        }
      }

      setSelectedPoint({
        time: time[closestIndex],
        x: x[closestIndex],
        y: y[closestIndex],
        vx: vx[closestIndex],
        vy: vy[closestIndex],
        v: v[closestIndex],
      });
    };

    drawFrame();
  };

  return (
    <div className="mt-6">
      {error && <p className="text-red-400">{error}</p>}

      {/* SLIDERS */}
      <div className="mb-4 flex gap-6">
        <div>
          <label>Velocity: {velocity} m/s</label>
          <input
            type="range"
            min="5"
            max="100"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Angle: {angle}°</label>
          <input
            type="range"
            min="5"
            max="85"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </div>
      </div>

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="bg-black rounded-xl border border-gray-600"
      />

      {/* DATA PANEL */}
      {selectedPoint && (
        <div className="mt-4 p-4 bg-gray-900 text-white rounded-xl">
          <p><strong>Time:</strong> {selectedPoint.time.toFixed(2)} s</p>
          <p><strong>X:</strong> {selectedPoint.x.toFixed(2)} m</p>
          <p><strong>Height (Y):</strong> {selectedPoint.y.toFixed(2)} m</p>
          <p><strong>Vx:</strong> {selectedPoint.vx.toFixed(2)} m/s</p>
          <p><strong>Vy:</strong> {selectedPoint.vy.toFixed(2)} m/s</p>
          <p><strong>Resultant Velocity:</strong> {selectedPoint.v.toFixed(2)} m/s</p>
        </div>
      )}
    </div>
  );
}
