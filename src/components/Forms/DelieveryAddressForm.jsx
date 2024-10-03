import { useContext, useState } from "react";
import GreenButton from "../Buttons/GreenButton";
import RegistrationInput from "../Inputs/RegistrationInput";
import PageTitleName from "../Text/PageTitleName";
import { DelieveryAddressContext } from "@/contexts/delievery";
import { useMask } from "@react-input/mask";

export default function DelieveryAddressForm({delieveryAddress}) {
    const { getDelieveryAddress, set } = useContext(DelieveryAddressContext);
    const [formData, setFormData] = useState({ 'city': 'Пермь' });

    const inputRef = useMask({ mask: '+7 ___-___-__-__', replacement: { _: /\d/ }, showMask: true });

    const inputHandleChange = (item) => {
        const name = item.name;
        const value = item.value;
        setFormData({ ...formData, [name]: value })
    }

    const formHandleSubmit = (form) => {
        form.preventDefault();
        set(formData);

        // form.close();
    }
    return (
        <form action="" method={'post'} onSubmit={formHandleSubmit} className={"space-y-4"}>
            <PageTitleName>Выберите адрес доставки</PageTitleName>
            <div className={"flex flex-col gap-y-10 items-center"}>
                <label className={"registration-input"}>
                    <input className={"registration-input__element"} name={'city'} value={'Пермь'} disabled />
                    <div className={'registration-input__placeholder_focused'}>Город</div>
                </label>
                <RegistrationInput inputName={"street"} type={'text'}
                    onChange={inputHandleChange}>Улица</RegistrationInput>
                <RegistrationInput inputName={"home"} type={'text'}
                    onChange={inputHandleChange}>Дом</RegistrationInput>
                <RegistrationInput inputName={"entrance"} type={'number'} min={0}
                    onChange={inputHandleChange}>Подъезд</RegistrationInput>
                <RegistrationInput inputName={"floor"} type={'number'}
                    onChange={inputHandleChange}>Этаж</RegistrationInput>
                <RegistrationInput inputName={"flat"} type={'number'}
                    onChange={inputHandleChange}>Квартира</RegistrationInput>
                <label className={"registration-input"}>
                    <input className={"registration-input__element"}
                        name={'phone'}
                        type="tel"
                        pattern="\+7 [0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                        ref={inputRef}
                        onChange={(item) => inputHandleChange(item.target)}
                        required
                    />
                    <div className={'registration-input__placeholder_focused'}>Телефон</div>
                </label>
            </div>
            <div className={"flex justify-center"}>
                <GreenButton>Сохранить адрес доставки</GreenButton>
            </div>
        </form>
    )
}