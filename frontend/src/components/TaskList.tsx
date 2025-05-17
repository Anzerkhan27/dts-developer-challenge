// src/components/TaskList.tsx
import { TaskCard } from './TaskCard';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_datetime: string;
}

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  if (!tasks.length) return <p className="text-gray-600">No tasks found.</p>;
  return (
    <ul className="space-y-6">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </ul>
  );
}
