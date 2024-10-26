import Loading from "./Loading";

interface ConfirmDelete {
  resourceName: string;
  onClose: () => void;
  disabled: boolean;
  onConfirm: () => void;
  ispending?: boolean;
}
function ConfirmDelete({
  resourceName,
  onClose,
  disabled,
  onConfirm,
  ispending = false,
}: ConfirmDelete) {
  return (
    <div>
      <h2 className="font-bold text-base mb-8 text-secondary-700">
        آیا از حذف {resourceName} مطمین هستید؟
      </h2>
      <div className="flex justify-between items-center gap-x-16">
        <button
          className="btn btn--primary flex-1"
          onClick={onClose}
          disabled={disabled}
        >
          لغو
        </button>
        {ispending ? (
          <Loading />
        ) : (
          <button
            onClick={onConfirm}
            disabled={disabled}
            className="btn btn--danger flex-1 py-3"
          >
            تایید
          </button>
        )}
      </div>
    </div>
  );
}

export default ConfirmDelete;
