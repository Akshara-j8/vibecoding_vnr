# 🚀 Physiverse — Interactive Physics Learning Platform

Physiverse is an interactive physics learning platform built during a vibe coding hackathon. It combines structured lessons, practice problems, and real-time physics simulations to help students understand concepts visually instead of just memorizing formulas.

The goal of this project is to make physics intuitive, visual, and interactive.

---

## 🌟 What Physiverse Does

Physiverse allows users to:

* 📘 Explore physics topics through organized lessons
* 🧠 Practice problems with different difficulty levels
* 🎯 Enter custom physics problems in natural language
* 📊 See real-time projectile motion simulations
* 🖱 Click on any point in the graph to view:

  * Time
  * X position
  * Height (Y position)
  * Horizontal velocity (Vx)
  * Vertical velocity (Vy)
  * Resultant velocity

Instead of solving physics only on paper, users can **see motion happening live**.

---

## 🧩 How It Works

### 1️⃣ User Input

A user types a problem like:

```
20 m/s at 45 degrees
```

---

### 2️⃣ Backend Processing (FastAPI)

The backend:

* Extracts velocity and angle using regex
* Applies projectile motion equations:

  * Vx = V cosθ
  * Vy = V sinθ
  * x = Vx · t
  * y = Vy · t − ½ g t²
* Generates time steps using numerical simulation
* Returns structured trajectory data as JSON

---

### 3️⃣ Frontend Visualization (Next.js + Canvas)

The frontend:

* Calls the backend using Axios
* Receives position and velocity arrays
* Uses the HTML Canvas API to:

  * Draw axes
  * Animate the projectile
  * Show angle arc
  * Highlight clicked points
* Recomputes trajectory instantly when sliders change

This separation keeps the architecture clean:

* 🧠 Backend → Physics engine
* 🎥 Frontend → Visualization engine

---

## 🛠 Tech Stack

### Frontend

* Next.js (React + TypeScript)
* Tailwind CSS
* HTML Canvas API
* Axios

### Backend

* FastAPI
* Python
* NumPy
* Pydantic

---

## 🏗 Project Structure

```
frontend/
  app/
  components/
  package.json

backend/
  main.py
  requirements.txt

README.md
.gitignore
```

---

## ⚙️ How to Run the Project

### 🔹 Backend

1. Navigate to backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run server:

   ```bash
   uvicorn main:app --reload --port 8001
   ```

Backend runs on:

```
http://127.0.0.1:8001
```

---

### 🔹 Frontend

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

Frontend runs on:

```
http://localhost:3000
```

---

## 🎯 Why We Built This

Many students struggle with physics because they cannot visualize motion. Physiverse transforms textbook equations into interactive motion, helping learners:

* Understand concepts visually
* Experiment with velocity and angle
* See how physics behaves in real time

This project demonstrates how modern web technologies can make education more engaging.

---

## 🚀 Future Improvements

* Add air resistance simulation
* Add more physics topics (SHM, circular motion, collisions)
* Add graph plotting for velocity vs time
* Add user accounts and progress tracking
* Deploy online for public access

---

## 🏁 Hackathon Context

This project was built during a vibe coding hackathon, focusing on rapid prototyping, clean architecture, and interactive user experience.

AI tools were used as development assistants to accelerate coding, while design decisions, integration, and logic implementation were handled manually.

---
## Demo video
https://drive.google.com/file/d/1Gfl8h_9NsqDuXUCIRYWEf7XDM6TLJeZN/view?usp=drive_link
## 👩‍💻 Team Members

M. Akshara
K. Vennela
T. Keerthi
G. Kalyani
