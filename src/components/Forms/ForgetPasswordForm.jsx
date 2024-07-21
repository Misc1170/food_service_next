import GreenButton from "@/components/Buttons/GreenButton.jsx";
import PageTitleName from "@/components/Text/PageTitleName.jsx";
import RegistrationInput from "@/components/Inputs/RegistrationInput.jsx";
import {useContext, useState} from "react";
import sendAxiosPostData from "@/functions/sendAxiosPostData.jsx";
import {ModalContext} from "@/contexts/modal.jsx";
import RegistrationForm from "@/components/Forms/RegistrationForm.jsx";
import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";
import LoginForm from "@/components/Forms/LoginForm.jsx";
import forgetPasswordFormValidation from "@/functions/validates/forgetPasswordFormValidation.jsx";

export default function ForgetPasswordForm() {

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

        setErrors(forgetPasswordFormValidation(formData))

        if (!errors.isSuccess) {
        sendAxiosPostData('/api/forget-password', formData);
            console.log(formData);
        } else {
            console.log(`hui`);
        }

    }

    return (
        <div className={""}>
            <form action="" method={'post'} onSubmit={formHandleSubmit} className={"space-y-4"}>
                <PageTitleName>Восстановить пароль</PageTitleName>
                <div className={"flex flex-col gap-y-10 items-center"}>
                    <RegistrationInput error={errors.email} inputName={"email"}
                                       onChange={inputHandleChange}>E-mail</RegistrationInput>
                    <RegistrationInput error={errors.password} inputName={"password"}
                                       onChange={inputHandleChange}>Новый пароль</RegistrationInput>
                    <RegistrationInput error={errors.confirmPassword} inputName={"confirmPassword"}
                                       onChange={inputHandleChange}>Повторите новый пароль</RegistrationInput>
                </div>
                <div className={"space-y-2"}>
                    <div onClick={() => handleModal(<RegistrationForm/>, false)}>
                        <SpanLg>У Вас нет аккаунта? Нажмите, что бы зарегестрироваться</SpanLg>
                    </div>
                    <div onClick={() => handleModal(<LoginForm/>, false)}>
                        <SpanLg>У Вас есть аккаунт? Нажмите, что бы войти</SpanLg>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <GreenButton>Восстановить пароль</GreenButton>
                </div>
            </form>
        </div>
    )
}
