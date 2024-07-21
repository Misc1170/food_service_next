import {useRef} from "react";

export default function AlertPopUp({children, isSuccess}) {
    const alertPopup = useRef();

    const eventHandle = () => {
    alertPopup.current.className = 'hidden';
        console.log(alertPopup)
    }

    return (
        <div ref={alertPopup}
             className={"fixed top-0 left-2/4 p-14 rounded-br-2xl rounded-bl-2xl slowly-hide " + (isSuccess ? "bg-light-green" : "bg-light-red")}>
            <div className={"absolute right-0 top-0 w-10 h-10 cursor-pointer"}
                 onClick={() => eventHandle()}>&times;</div>
            <span className="text-white text-lg font-bold">{children}</span>
        </div>
    )
}
