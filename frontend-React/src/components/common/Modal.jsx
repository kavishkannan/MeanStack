function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      className="
                fixed
                inset-0
                bg-black/40
                flex
                justify-center
                items-center
                z-50
            "
    >
      <div
        className="
                    bg-white
                    rounded-lg
                    shadow-xl
                    w-[700px]
                    max-w-[95%]
                "
      >
        {/* Header */}

        <div
          className="
                        flex
                        justify-between
                        items-center
                        border-b
                        px-6
                        py-4
                    "
        >
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="
                            text-2xl
                            text-gray-500
                            hover:text-red-500
                        "
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
