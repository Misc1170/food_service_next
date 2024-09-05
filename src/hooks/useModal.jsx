import {useState} from "react";

export default () => {
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalDisplaySide, setModalDisplaySide] = useState('center');

    const handleModal = (content = false, displaySideProp, isNeedCloseModal = true) => {
    console.log('useModal handleModal')

        setModal(true)

        if (isNeedCloseModal) {
            setModal(!modal);
        }

        if (content) {
            setModalContent(content);
        }

        if (displaySideProp) {
            setModalDisplaySide(displaySideProp)
        }
    };

    return {modal, handleModal, modalContent, modalDisplaySide};
};
