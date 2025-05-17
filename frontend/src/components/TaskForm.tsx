// src/components/TaskForm.tsx
interface TaskFormProps {
  title: string;
  description: string;
  dueDatetime: string;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  setDueDatetime: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TaskForm({ title, description, dueDatetime, setTitle, setDescription, setDueDatetime, onSubmit }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full md:w-2/3 mb-12">
      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="title">Title</label>
        <input id="title" className="w-full border border-black p-2 text-base" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="description">Description</label>
        <textarea id="description" className="w-full border border-black p-2 text-base" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="dueDatetime">Due Date</label>
        <input id="dueDatetime" type="datetime-local" className="w-full border border-black p-2 text-base" value={dueDatetime} onChange={e => setDueDatetime(e.target.value)} required />
      </div>

      <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 hover:bg-yellow-500">Create Task</button>
    </form>
  );
}

