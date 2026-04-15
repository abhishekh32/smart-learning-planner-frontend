import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://smart-learning-planner-backend.vercel.app";

  const getPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/plans`);
      if (!res.ok) throw new Error("Failed to fetch plans");
      const data = await res.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      alert("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const addPlan = async () => {
    if (!title || !description || !duration) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, duration }),
      });

      if (!res.ok) throw new Error("Failed to add plan");

      setTitle("");
      setDescription("");
      setDuration("");
      getPlans();
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding plan");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id) => {
    try {
      const res = await fetch(`${API_URL}/plans/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete plan");
      getPlans();
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting plan");
    }
  };

  const togglePlan = async (id) => {
    try {
      const res = await fetch(`${API_URL}/plans/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to update plan");
      getPlans();
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating plan");
    }
  };

  return (
    <div className="container">
      <h1>Smart Learning Planner 🚀</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />

      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        disabled={loading}
      />

      <button className="add-btn" onClick={addPlan} disabled={loading}>
        {loading ? "Adding..." : "Add Plan"}
      </button>

      {plans.map((plan) => (
        <div className="card" key={plan._id}>
          <h3 style={{ textDecoration: plan.completed ? "line-through" : "none" }}>
            {plan.title}
          </h3>
          <p>{plan.description}</p>
          <p>Duration: {plan.duration}</p>

          <button onClick={() => togglePlan(plan._id)} disabled={loading}>
            {plan.completed ? "Undo" : "Complete"}
          </button>

          <button onClick={() => deletePlan(plan._id)} disabled={loading}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;