import React from "react";

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-125 bg-white">
        <div className="p-3">
          <h2 className="m-0 text-lg">{title}</h2>
        </div>
        <div className="p-3 border-t border-[#eee] border-b">{children}</div>
        <div className="p-3">
          <button onClick={onClose} className="bg-grey text-black">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
