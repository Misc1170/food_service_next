import {useState} from "react";

export default function RegistrationInput(props) {
    const [isKeepFocusState, setIsKeepFocusState] = useState(false);

    const toggleFocusInput = (item) => {
        if (item.target.value.length > 0) {
            setIsKeepFocusState(true);
        } else {
            setIsKeepFocusState(false)
        }

        props.onChange(item.target)
    }

    return (
            <label className={"registration-input"}>
                <input name={props.inputName} onChange={(item) => toggleFocusInput(item)} type="text"
                       className={"registration-input__element"}/>
                <div
                    className={isKeepFocusState ? 'registration-input__placeholder_focused' : "registration-input__placeholder"}>{props.children}</div>
            {/*{props.error &&*/}
            {/*    <span className="error-message">*/}
            {/*                {props.error}*/}
            {/*            </span>*/}
            {/*}*/}
            </label>
    )
}
