
// src/App.tsx
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_datetime: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDatetime, setDueDatetime] = useState('');
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks`);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, due_datetime: dueDatetime, status: 'Open' }),
    });
    if (res.ok) {
      setTitle('');
      setDescription('');
      setDueDatetime('');
      fetchTasks();
    }
  };

  const handleUpdateStatus = async (id: string) => {
    await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Complete' }),
    });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${apiUrl}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10 font-sans text-black">
        <h1 className="text-3xl font-bold mb-8">Caseworker Tasks</h1>
        <TaskForm
          title={title}
          description={description}
          dueDatetime={dueDatetime}
          setTitle={setTitle}
          setDescription={setDescription}
          setDueDatetime={setDueDatetime}
          onSubmit={handleCreateTask}
        />
        <hr className="my-6 border-gray-300" />
        {loading ? <p className="text-gray-600">Loading tasks…</p> : <TaskList tasks={tasks} onComplete={handleUpdateStatus} onDelete={handleDelete} />}
      </div>
    </>
  );
}
