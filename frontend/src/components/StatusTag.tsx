// src/components/StatusTag.tsx
export function StatusTag({ status }: { status: string }) {
  const base = "text-xs font-bold px-2 py-1 rounded";
  const variant =
    status.toLowerCase() === 'complete'
      ? 'bg-green-200 text-green-800'
      : 'bg-yellow-200 text-yellow-800';

  return <span className={`${base} ${variant}`}>{status}</span>;
}