interface ConfirmDeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  visible,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-lg font-bold mb-4">
          Confirm Delete
        </h2>
        <p className="mb-6 text-sm text-gray-700">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
