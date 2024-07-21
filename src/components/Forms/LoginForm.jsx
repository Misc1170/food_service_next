import GreenButton from "@/components/Buttons/GreenButton.jsx";
import PageTitleName from "@/components/Text/PageTitleName.jsx";
import RegistrationInput from "@/components/Inputs/RegistrationInput.jsx";
import {useContext, useState} from "react";
import loginFormValidation from "@/functions/validates/loginFormValidation.jsx";
import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";
import {ModalContext} from "@/contexts/modal.jsx";
import RegistrationForm from "@/components/Forms/RegistrationForm.jsx";
import ForgetPasswordForm from "@/components/Forms/ForgetPasswordForm.jsx";
import axios from "axios";

export default function LoginForm() {

    const {handleModal} = useContext(ModalContext);

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const inputHandleChange = (item) => {
        const name = item.name;
        const value = item.value;
        setFormData({...formData, [name]: value})
    }

    const formHandleSubmit = (form) => {
        form.preventDefault();

        setErrors(loginFormValidation(formData))

        console.log(formData)
        console.log(import.meta.env.REACT_APP_BACKEND_URL + '/api/login')
        if (!errors.isSuccess) {
            axios.post(import.meta.env.REACT_APP_BACKEND_URL + '/api/login', formData)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error.response.data)
                });
            console.log(formData);
        }
    }

    return (
        <form action="" method={'post'} onSubmit={formHandleSubmit} className={"space-y-4"}>
            <PageTitleName>Войдите в систему</PageTitleName>
            <div className={"flex flex-col gap-y-10 items-center"}>
                <RegistrationInput error={errors.email} inputName={"email"}
                                   onChange={inputHandleChange}>E-mail</RegistrationInput>
                <RegistrationInput error={errors.password} inputName={"password"}
                                   onChange={inputHandleChange}>Пароль</RegistrationInput>
            </div>
            <div className={"space-y-2"}>
                <div onClick={() => handleModal(<RegistrationForm/>, false)}>
                    <SpanLg>У Вас нет аккаунта? Нажмите, что бы зарегестрироваться</SpanLg>
                </div>
                <div onClick={() => handleModal(<ForgetPasswordForm/>, false)}>
                    <SpanLg>Вы забыли пароль, нажмите что бы восстановить</SpanLg>
                </div>
            </div>
            <div className={"flex justify-center"}>
                <GreenButton>Войти</GreenButton>
            </div>
        </form>
    )
}
