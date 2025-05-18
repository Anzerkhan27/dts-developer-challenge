import { useEffect, useState } from 'react';
import Header from './components/Header';
import { TaskForm } from './components/TaskForm';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import NotificationBanner from './components/NotificationBanner';
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
  const [activeView, setActiveView] = useState<'all' | 'complete' | 'open'>('all');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerType, setBannerType] = useState<'success' | 'error'>('success');

  const apiUrl = import.meta.env.VITE_API_URL;

  console.log("API base URL:", import.meta.env.VITE_API_URL);


  useEffect(() => {
    fetchTasks();
  }, []);

  const showBanner = (message: string, type: 'success' | 'error' = 'success') => {
    setBannerMessage(message);
    setBannerType(type);
    setTimeout(() => setBannerMessage(''), 5000);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks`);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      showBanner('Failed to load tasks', 'error');
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
      setShowForm(false);
      showBanner('Task created successfully');
      setTimeout(() => {
        document.getElementById('task-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      showBanner('Failed to create task', 'error');
    }
  };

  const handleUpdateStatus = async (id: string) => {
    await fetch(`${apiUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Complete' }),
    });
    fetchTasks();
    showBanner('Task marked as complete');
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await fetch(`${apiUrl}/tasks/${taskToDelete}`, { method: 'DELETE' });
      setShowDeleteModal(false);
      setTaskToDelete(null);
      fetchTasks();
      showBanner('Task deleted');
    } catch (error) {
      console.error('Failed to delete task:', error);
      showBanner('Failed to delete task', 'error');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesView =
      activeView === 'complete'
        ? task.status.toLowerCase() === 'complete'
        : activeView === 'open'
        ? task.status.toLowerCase() !== 'complete'
        : true;

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    return matchesView && matchesSearch;
  });

  return (
    <>
      <Header
        onViewChange={setActiveView}
        onToggleForm={() => setShowForm((prev) => !prev)}
        isFormVisible={showForm}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4 font-sans text-black">
        {bannerMessage && (
          <NotificationBanner
            message={bannerMessage}
            type={bannerType}
            onClose={() => setBannerMessage('')}
          />
        )}

        <h1 className="text-2xl font-bold mb-4">
          {showForm
            ? 'Add New Task'
            : activeView === 'complete'
            ? 'Completed Tasks'
            : activeView === 'open'
            ? 'Current Tasks'
            : 'All Tasks'}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 font-sans text-black">
        {showForm && (
          <div id="task-form-section">
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
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading tasks…</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onComplete={handleUpdateStatus}
            onDelete={(id) => {
              setTaskToDelete(id);
              setShowDeleteModal(true);
            }}
          />
        )}
      </div>

      <ConfirmDeleteModal
        visible={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
      />
    </>
  );
}
