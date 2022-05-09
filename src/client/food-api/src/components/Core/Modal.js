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
          <h2 className="m-0 text-lg text-black">{title}</h2>
        </div>
        <div className="p-3 border-t border-[#eee] border-b">{children}</div>
        <div className="p-3">
          <div
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded w-[15%] cursor-pointer"
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
