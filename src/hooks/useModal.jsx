import {useState} from "react";

export default () => {
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleModal = (content = false, isNeedCloseModal = true) => {
        setModal(true)

        if (isNeedCloseModal) {
            setModal(!modal);
        }
        if (content) {
            setModalContent(content);
        }
    };

    return {modal, handleModal, modalContent};
};
