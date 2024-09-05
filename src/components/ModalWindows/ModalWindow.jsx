import { createPortal } from "react-dom";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modal.jsx";

export default function ModalWindow() {
    const { modalContent, handleModal, modal, displaySide } = useContext(ModalContext);
    console.log('ModalWindow component')

    if (modal) {
        return createPortal(
            <div
                className="fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.8)" }}
            >
                <div className="container mx-auto">
                    <div
                        className="bg-white relative p-5 shadow-lg rounded-3xl flex flex-col items-start text-lg text-gray-800">
                        <button
                            className="absolute top-0 right-0 -mt-12 font-bold self-end rounded-full mb-3 bg-white text-red-700 w-8 h-8"
                            onClick={() => handleModal()}
                        >
                            &times;
                        </button>
                        {modalContent}
                    </div>
                </div>
            </div>,
            document.querySelector('#modal-root')
        );
    } else return null;
};






// import { createPortal } from "react-dom";
// import { useContext } from "react";
// import { ModalContext } from "@/contexts/modal.jsx";

// export default function ModalWindow() {
//     const { modalContent, handleModal, modal, displaySide } = useContext(ModalContext);
//     console.log('ModalWindow component')

//     if (modal) {
//         return createPortal(
//             <div
//                 className="fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center"
//                 style={{ background: "rgba(0,0,0,0.8)" }}
//             >
//                 <div className="container mx-auto">
//                     <div
//                         className="bg-white relative p-5 shadow-lg rounded-3xl flex flex-col items-start text-lg text-gray-800">
//                         <button
//                             className="absolute top-0 right-0 -mt-12 font-bold self-end rounded-full mb-3 bg-white text-red-700 w-8 h-8"
//                             onClick={() => handleModal()}
//                         >
//                             &times;
//                         </button>
//                         {modalContent}
//                     </div>
//                 </div>
//             </div>,
//             document.querySelector('#modal-root')
//         );
//     } else return null;
// };

