interface HeaderProps {
  onViewChange: (view: 'all' | 'complete' | 'open') => void;
  onToggleForm: () => void;
  isFormVisible: boolean;
  onSearchChange: (query: string) => void;
}

export default function Header({ onViewChange, onToggleForm, isFormVisible, onSearchChange }: HeaderProps) {

  return (
    <header className="bg-black text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-xl font-bold tracking-tight">HMCTS Caseworker Portal</div>

        <nav className="flex flex-wrap items-center gap-6 text-sm">
          <button onClick={() => onViewChange('open')} className="hover:underline text-gray-100">
            Current Tasks
          </button>
          <button onClick={() => onViewChange('complete')} className="hover:underline text-gray-100">
            Completed Tasks
          </button>
          <button
              onClick={onToggleForm}
              className="hover:underline text-gray-100 flex items-center gap-1"
            >
              Add New Task
              <span className="text-xs">{isFormVisible ? '▲' : '▼'}</span>
            </button>

         <form
          className="flex items-center space-x-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search tasks"
            className="text-black p-1 px-2 rounded border border-gray-400 text-sm"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black px-3 py-1 text-sm font-semibold rounded hover:bg-yellow-500"
          >
            Search
          </button>
        </form>

        </nav>
      </div>
    </header>
  );
}
