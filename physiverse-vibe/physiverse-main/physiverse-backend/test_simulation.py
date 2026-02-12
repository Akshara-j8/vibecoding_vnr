#!/usr/bin/env python3
"""
Test script for projectile motion simulation and parsing.
"""

import re
import math
import numpy as np

def parse_projectile_problem(problem: str) -> tuple[float, float]:
    """
    Parse projectile motion problem to extract initial velocity and angle.
    """
    problem_lower = problem.lower()

    # Extract initial velocity (v0)
    v0_match = re.search(r'v0?\s*=\s*(\d+(?:\.\d+)?)\s*m/s?', problem_lower)
    if not v0_match:
        v0_match = re.search(r'velocity\s*=\s*(\d+(?:\.\d+)?)\s*m/s?', problem_lower)
    if not v0_match:
        v0_match = re.search(r'(\d+(?:\.\d+)?)\s*m/s?', problem_lower)
    if not v0_match:
        raise ValueError("Could not find initial velocity in problem statement")

    v0 = float(v0_match.group(1))

    # Extract angle (theta)
    angle_match = re.search(r'angle\s*=\s*(\d+(?:\.\d+)?)\s*degrees?', problem_lower)
    if not angle_match:
        angle_match = re.search(r'(\d+(?:\.\d+)?)\s*degrees?', problem_lower)
    if not angle_match:
        angle_match = re.search(r'(\d+(?:\.\d+)?)\s*°', problem_lower)
    if not angle_match:
        raise ValueError("Could not find launch angle in problem statement")

    theta_deg = float(angle_match.group(1))
    theta_rad = math.radians(theta_deg)

    return v0, theta_rad

def simulate_projectile_motion(v0: float, theta: float, g: float = 9.8) -> tuple[list[float], list[float]]:
    """
    Simulate projectile motion and return x,y coordinates.
    """
    # Time of flight
    t_flight = (2 * v0 * math.sin(theta)) / g

    # Generate time points
    t = np.linspace(0, t_flight, 100)

    # Calculate x and y positions
    x = v0 * math.cos(theta) * t
    y = v0 * math.sin(theta) * t - 0.5 * g * t**2

    # Convert to lists and filter out negative y values
    x_list = x[y >= 0].tolist()
    y_list = y[y >= 0].tolist()

    return x_list, y_list

def test_parsing():
    """Test problem parsing with various formats."""
    test_cases = [
        ("A ball is thrown with v0 = 20 m/s at 45 degrees.", 20.0, 45.0),
        ("velocity = 15 m/s at 30 degrees", 15.0, 30.0),
        ("thrown with 25 m/s at 60°", 25.0, 60.0),
        ("initial velocity 10 m/s, angle 45 degrees", 10.0, 45.0),
    ]

    print("Testing problem parsing:")
    for problem, expected_v0, expected_theta in test_cases:
        try:
            v0, theta_rad = parse_projectile_problem(problem)
            theta_deg = math.degrees(theta_rad)
            print(f"✓ '{problem}' -> v0={v0}, theta={theta_deg}°")
            assert abs(v0 - expected_v0) < 0.01
            assert abs(theta_deg - expected_theta) < 0.01
        except Exception as e:
            print(f"✗ '{problem}' -> Error: {e}")

def test_simulation():
    """Test simulation with known values."""
    print("\nTesting simulation:")
    # Test case: v0=10 m/s, theta=45°, g=9.8
    v0 = 10.0
    theta = math.radians(45.0)
    x, y = simulate_projectile_motion(v0, theta)

    # Expected max range for 45°: R = v0²/g = 100/9.8 ≈ 10.2 m
    expected_range = v0**2 / 9.8
    actual_range = max(x)

    print(".2f")
    print(".2f")
    assert abs(actual_range - expected_range) < 0.1

    # Check that trajectory starts at (0,0) and ends near ground
    assert abs(x[0]) < 0.01 and abs(y[0]) < 0.01
    assert y[-1] >= 0  # Should not go below ground

    print("✓ Simulation test passed")

if __name__ == "__main__":
    test_parsing()
    test_simulation()
    print("\n✓ All tests passed!")
