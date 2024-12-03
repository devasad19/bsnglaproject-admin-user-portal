'use client';

import { modelClose } from "@/helper";
import { ModalType } from "@/types/ModalType";

const Modal = ({
  setPreviewSrc = null,
  modalRef,
  modalForm,
  title,
  children,
  arrDataCloseEmty = null,
  setServiceValidation = null,
}: ModalType) => {
  return (
    <>
      <dialog ref={modalRef} className="modal bg-primary/10 relative">
        <div className="modal-box bg-white w-10/12 max-w-[50rem]">
          <div className="border-b border-gray-500 pb-4 flex items-center justify-between">
            <h3 className="font-medium text-20 text-left">{title}</h3>
            <div>
              <button
                onClick={() => {
                  if (arrDataCloseEmty) {
                    arrDataCloseEmty([]);
                  }
                  if (setServiceValidation) {
                    setServiceValidation({});
                  }
                  modelClose(modalRef, modalForm);
                  if (setPreviewSrc) {
                    setPreviewSrc(null);
                  }
                }}
                className="px-3.5 py-2 rounded-full bg-gray-300 hover:bg-slate-600 transition-all hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
