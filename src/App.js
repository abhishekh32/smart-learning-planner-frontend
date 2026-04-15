import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const getPlans = async () => {
    const res = await fetch("http://localhost:5000/plans");
    const data = await res.json();
    setPlans(data);
  };

  useEffect(() => {
    getPlans();
  }, []);

  const addPlan = async () => {
    await fetch("http://localhost:5000/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, duration }),
    });

    setTitle("");
    setDescription("");
    setDuration("");
    getPlans();
  };

  const deletePlan = async (id) => {
    await fetch(`http://localhost:5000/plans/${id}`, {
      method: "DELETE",
    });
    getPlans();
  };

  const togglePlan = async (id) => {
    await fetch(`http://localhost:5000/plans/${id}`, {
      method: "PUT",
    });
    getPlans();
  };

  return (
    <div className="container">
      <h1>Smart Learning Planner 🚀</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <button className="add-btn" onClick={addPlan}>
        Add Plan
      </button>

      {plans.map((plan) => (
        <div className="card" key={plan._id}>
          <h3 style={{ textDecoration: plan.completed ? "line-through" : "none" }}>
            {plan.title}
          </h3>
          <p>{plan.description}</p>
          <p>Duration: {plan.duration}</p>

          <button onClick={() => togglePlan(plan._id)}>
            {plan.completed ? "Undo" : "Complete"}
          </button>

          <button onClick={() => deletePlan(plan._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;