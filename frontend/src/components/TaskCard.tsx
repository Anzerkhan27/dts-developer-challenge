// src/components/TaskCard.tsx
import { StatusTag } from './StatusTag';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    due_datetime: string;
  };
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  return (
    <li className="border border-gray-300 p-5 rounded-md bg-gray-50">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <StatusTag status={task.status} />
      </div>
      {task.description && <p className="text-gray-700 mt-1">{task.description}</p>}
      <p className="text-sm mt-2">
        <strong>Due:</strong> {new Date(task.due_datetime).toLocaleString()}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {task.status.toLowerCase() !== 'complete' && (
          <button
            onClick={() => onComplete(task.id)}
            className="bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700"
          >
            Mark Complete
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-600 text-white px-4 py-1 text-sm rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
