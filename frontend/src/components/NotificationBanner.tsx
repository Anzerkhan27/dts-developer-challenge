interface NotificationBannerProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function NotificationBanner({
  message,
  type,
  onClose,
}: NotificationBannerProps) {
  const bgColor = type === 'success' ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800';

  return (
    <div
      className={`border-l-4 p-4 mb-6 ${bgColor}`}
      role="alert"
    >
      <div className="flex justify-between items-start gap-4">
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="text-sm text-black hover:underline">Dismiss</button>
      </div>
    </div>
  );
}
