import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5012/api/notes"; // adjust port if needed

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // GET all notes
  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then(setNotes)
      .catch((err) => console.error("Failed to fetch notes", err));
  }, []);

  // POST new note
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      console.error("Failed to create note");
      return;
    }

    const created = await response.json();
    setNotes((prev) => [created, ...prev]);
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "0.5rem", padding: "0.5rem 1rem" }}>
          Add note
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((n) => (
          <li key={n.id} style={{ border: "1px solid #ccc", padding: "0.75rem", marginBottom: "0.5rem" }}>
            <strong>{n.title}</strong>
            <div>{n.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;