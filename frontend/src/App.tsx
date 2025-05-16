import { useEffect, useState } from 'react';

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
      body: JSON.stringify({
        title,
        description,
        due_datetime: dueDatetime,
        status: 'Open',
      }),
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
    <div className="max-w-4xl mx-auto px-4 py-10 font-sans text-black">
      <h1 className="text-3xl font-bold mb-8">Caseworker Tasks</h1>

      {/* Form Section */}
      <form onSubmit={handleCreateTask} className="space-y-6 w-full md:w-2/3 mb-12">
        <div>
          <label className="block text-sm font-bold mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            className="w-full border border-black p-2 text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="w-full border border-black p-2 text-base"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1" htmlFor="dueDatetime">Due Date</label>
          <input
            id="dueDatetime"
            type="datetime-local"
            className="w-full border border-black p-2 text-base"
            value={dueDatetime}
            onChange={(e) => setDueDatetime(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold py-2 px-6 hover:bg-yellow-500"
        >
          Create Task
        </button>
      </form>

      <hr className="my-6 border-gray-300" />

      {/* Tasks Section */}
      {loading ? (
        <p className="text-gray-600">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li key={task.id} className="border border-gray-300 p-5 rounded-md bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{task.title}</h2>
                <StatusTag status={task.status} />
              </div>
              {task.description && (
                <p className="text-gray-700 mt-1">{task.description}</p>
              )}
              <p className="text-sm mt-2">
                <strong>Due:</strong> {new Date(task.due_datetime).toLocaleString()}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {task.status.toLowerCase() !== 'complete' && (
                  <button
                    onClick={() => handleUpdateStatus(task.id)}
                    className="bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-600 text-white px-4 py-1 text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 🔧 GOV.UK-inspired status tag
function StatusTag({ status }: { status: string }) {
  const base = "text-xs font-bold px-2 py-1 rounded";
  const variant =
    status.toLowerCase() === 'complete'
      ? 'bg-green-200 text-green-800'
      : 'bg-yellow-200 text-yellow-800';

  return <span className={`${base} ${variant}`}>{status}</span>;
}
