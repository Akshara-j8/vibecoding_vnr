from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import math
import re

app = FastAPI(title="Physiverse Backend")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationRequest(BaseModel):
    problem: str


# -----------------------------
# PARSER FUNCTION
# -----------------------------
def parse_problem(text: str):
    text = text.lower()

    velocity = None
    angle = None
    gravity = 9.8  # default Earth gravity

    # Extract velocity (e.g., 20 m/s)
    vel_match = re.search(r'(\d+(\.\d+)?)\s*m/s', text)
    if vel_match:
        velocity = float(vel_match.group(1))

    # Extract angle (e.g., 45 degrees or 45°)
    angle_match = re.search(r'(\d+(\.\d+)?)\s*(degree|degrees|°)', text)
    if angle_match:
        angle = float(angle_match.group(1))

    # Horizontal detection
    if "horizontal" in text:
        angle = 0

    # Extract gravity if mentioned
    grav_match = re.search(r'(\d+(\.\d+)?)\s*m/s\^?2', text)
    if grav_match:
        gravity = float(grav_match.group(1))

    # Defaults if missing
    if velocity is None:
        velocity = 20

    if angle is None:
        angle = 45

    return velocity, angle, gravity


# -----------------------------
# PROJECTILE SIMULATION
# -----------------------------
def simulate_projectile(velocity, angle, gravity):
    angle_rad = math.radians(angle)

    vx_initial = velocity * math.cos(angle_rad)
    vy_initial = velocity * math.sin(angle_rad)

    # Time of flight
    if angle == 0:
        h = 10
        t_flight = math.sqrt((2 * h) / gravity)
    else:
        t_flight = (2 * vy_initial) / gravity

    t_values = np.linspace(0, t_flight, 200)

    x = vx_initial * t_values
    y = vy_initial * t_values - 0.5 * gravity * t_values**2
    y = np.maximum(y, 0)

    # Velocity components at each time
    vx = np.full_like(t_values, vx_initial)
    vy = vy_initial - gravity * t_values

    # Resultant velocity
    v = np.sqrt(vx**2 + vy**2)

    return (
        x.tolist(),
        y.tolist(),
        t_values.tolist(),
        vx.tolist(),
        vy.tolist(),
        v.tolist(),
    )



# -----------------------------
# API ENDPOINT
@app.post("/simulate")
async def simulate(request: SimulationRequest):
    velocity, angle, gravity = parse_problem(request.problem)

    x, y, time, vx, vy, v = simulate_projectile(velocity, angle, gravity)

    return {
        "x": x,
        "y": y,
        "time": time,
        "vx": vx,
        "vy": vy,
        "v": v,
        "type": "projectile",
        "velocity": velocity,
        "angle": angle,
        "gravity": gravity,
        "time_of_flight": round((2 * velocity * math.sin(math.radians(angle))) / gravity, 2)
        if angle != 0 else None
    }
