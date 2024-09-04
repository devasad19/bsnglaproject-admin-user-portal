export type ModalType = {
    setPreviewSrc?:any | null ,
    id?: string,
    trigger?: string,
    triggerSize?: string,
    title: string,
    children: JSX.Element,
    subFunc?: () => void,
    subFuncTitle?: string,
    arrDataCloseEmty?: any | null,
    setServiceValidation?: any | null
    modalRef: React.RefObject<HTMLDialogElement>
    modalForm: React.RefObject<HTMLFormElement>
}