import { useState } from "react";

export default function RegistrationInput({ inputName, onChange, children, type, isRequired = true, error }) {
    const [isKeepFocusState, setIsKeepFocusState] = useState(false);

    const toggleFocusInput = (item) => {
        if (item.target.value.length > 0) {
            setIsKeepFocusState(true);
        } else {
            setIsKeepFocusState(false)
        }

        onChange(item.target)
    }

    return (
        <label className={"registration-input"}>
            <input className={"registration-input__element"}
                type={type}
                required={isRequired}
                name={inputName}
                onChange={(item) => toggleFocusInput(item)}
            />
            <div
                className={isKeepFocusState ? 'registration-input__placeholder_focused' : "registration-input__placeholder"}>{children}</div>
            {/*{error &&*/}
            {/*    <span className="error-message">*/}
            {/*                {error}*/}
            {/*            </span>*/}
            {/*}*/}
        </label>
    )
}
