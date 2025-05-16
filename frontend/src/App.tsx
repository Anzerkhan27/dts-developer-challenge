import { useEffect, useState } from 'react';
import './index.css';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_datetime: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("API base URL:", import.meta.env.VITE_API_URL);


  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/tasks`)
      .then(res => res.json())
      .then((data: Task[]) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tasks', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading tasks…</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Caseworker Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              {task.description && <p className="text-gray-600">{task.description}</p>}
              <p className="mt-2">
                <span className="font-medium">Status:</span> {task.status}
              </p>
              <p>
                <span className="font-medium">Due:</span>{" "}
                {new Date(task.due_datetime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
