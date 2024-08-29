import { modelClose } from "@/helper";

const NewModel = ({
  setPreviewSrc = null,
  modalRef,
  modalForm,
  title,
  children,
  setServiceValidation = null,
}) => {
  return (
    <>
      <dialog ref={modalRef} className="modal bg-primary/10 relative">
        <div className="modal-box bg-white w-10/12 max-w-[40rem]">
          <div className="border-b border-gray-500 pb-4">
            <h3 className="font-medium text-20 text-left">{title}</h3>
            <div>
              <button
                onClick={() => {
                  setServiceValidation({});
                  modelClose(modalRef, modalForm);
                  if (setPreviewSrc) {
                    setPreviewSrc(null);
                  }
                }}
                className="absolute right-1 top-2 px-2.5 py-1 rounded-full bg-gray-300"
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

export default NewModel;
