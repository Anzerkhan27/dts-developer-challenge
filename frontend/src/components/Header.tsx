// src/components/Header.tsx
export default function Header() {
  return (
    <header className="bg-black text-white py-3 px-4 flex items-center justify-between">
      <div className="text-lg font-bold tracking-tight">HMCTS Caseworker Portal</div>
      <div className="text-sm text-gray-300 hidden md:block">
        Signed in as <span className="text-white font-semibold">caseworker@hmcts.gov.uk</span>
      </div>
    </header>
  );
}
