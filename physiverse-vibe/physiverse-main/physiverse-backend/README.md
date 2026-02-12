# Physiverse Backend

A FastAPI backend for physics simulations in the Physiverse educational platform.

## Features

- **Projectile Motion Simulation**: Parse problem text and compute trajectory
- **CORS Enabled**: Allows frontend access from localhost:3000
- **RESTful API**: Clean endpoints for simulation requests

## API Endpoints

### POST /simulate
Simulate a physics problem.

**Request Body:**
```json
{
  "problem": "A ball is thrown with initial velocity v0 = 20 m/s at an angle of 45 degrees."
}
```

**Response:**
```json
{
  "x": [0.0, 1.0, 2.0, ...],
  "y": [0.0, 1.4, 2.8, ...]
}
```

## Running the Server

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

The server will start on `http://127.0.0.1:8000`

## Problem Parsing

The API currently supports projectile motion problems. It extracts:
- Initial velocity (v0) in m/s
- Launch angle in degrees

Example problem formats:
- "v0 = 10 m/s, angle = 45 degrees"
- "velocity = 20 m/s at 30 degrees"
- "thrown with 15 m/s at 60°"
