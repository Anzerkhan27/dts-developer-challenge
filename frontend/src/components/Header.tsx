interface HeaderProps {
  onViewChange: (view: 'all' | 'complete' | 'open') => void;
  onToggleForm: () => void;
  isFormVisible: boolean;
  onSearchChange: (query: string) => void;
}

export default function Header({
  onViewChange,
  onToggleForm,
  isFormVisible,
  onSearchChange,
}: HeaderProps) {
  return (
    <>
      {/* Top GOV.UK-style black header */}
      <header className="bg-black text-white border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* GOV.UK logo and text */}
          <div className="flex items-center gap-3">
            <img src="/image.png" alt="Crown logo" className="h-6 w-auto" />
            <span className="text-xl font-bold">GOV.UK</span>
          </div>

        </div>
      </header>

      {/* GOV-style white nav bar */}
      <nav className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 text-base font-medium text-black">

                <button onClick={() => onViewChange('open')} className="hover:underline">
            Current tasks
          </button>
          <button onClick={() => onViewChange('complete')} className="hover:underline">
            Completed tasks
          </button>
          <button onClick={onToggleForm} className="hover:underline flex items-center gap-1">
            Add new task
            <span className="text-xs">{isFormVisible ? '▲' : '▼'}</span>
          </button>

          <div className="flex-grow"></div>

          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search tasks"
              className="text-black p-1 px-2 rounded border border-gray-300 text-sm"
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-3 py-1 text-sm font-semibold rounded hover:bg-yellow-500"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
