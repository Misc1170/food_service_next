'use client'

import {createContext} from "react";
import useModal from "@/hooks/useModal.jsx";
import ModalWindow from "@/components/ModalWindows/ModalWindow.jsx";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const {modal, handleModal, modalContent} = useModal();

    return (
        <ModalContext.Provider
            value={{modal, handleModal, modalContent}}>
            <ModalWindow />
            {children}
        </ModalContext.Provider>
    )
}
