import GreenButton from "@/components/Buttons/GreenButton.jsx";
import PageTitleName from "@/components/Text/PageTitleName.jsx";
import RegistrationInput from "@/components/Inputs/RegistrationInput.jsx";
import registrationFormValidation from "@/functions/validates/registrationFormValidation.jsx";
import {useContext, useState} from "react";
import sendAxiosPostData from "@/functions/sendAxiosPostData.jsx";
import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";
import LoginForm from "@/components/Forms/LoginForm.jsx";
import {ModalContext} from "@/contexts/modal.jsx";
import AlertReviewModalWindow from "@/components/ModalWindows/AlertReviewModalWindow.jsx";
import AlertPopUp from "@/components/Alerts/AlertPopUp.jsx";
import SuccessRegistration from "@/components/PopUps/SuccessRegistration.jsx";

export default function RegistrationForm() {

    const {handleModal} = useContext(ModalContext);

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    const inputHandleChange = (item) => {
        const name = item.name;
        const value = item.value;
        setFormData({...formData, [name]: value})
    }

    const formHandleSubmit = (form) => {
        form.preventDefault();

        setErrors(registrationFormValidation(formData))

        if (errors.isSuccess) {
            
            axios.post('http://localhost:8000/api/registration', formData)
                .then(response => {
                    console.log(response.data)
                    setIsRegistrationSuccess(true)
                })
                .catch(error => {
                    setIsRegistrationSuccess(false)
                    console.log(error.response.data)
                });
        }
    }

    return (
        <>
            {/*{JSON.stringify(user.error) === '{}' && <AlertPopUp isSuccess={false}>Ошибка на бэке</AlertPopUp>}*/}

            {isRegistrationSuccess ? (<SuccessRegistration/>) :
                <form action="" method={'post'} onSubmit={formHandleSubmit} className={"space-y-4"}>
                    <PageTitleName>Зарегистрируйтесь</PageTitleName>
                    <div className={"flex flex-col gap-y-10 items-center"}>
                        <RegistrationInput error={errors.username} inputName={"username"}
                                           onChange={inputHandleChange}>Ваше имя</RegistrationInput>
                        <RegistrationInput error={errors.email} inputName={"email"}
                                           onChange={inputHandleChange}>E-mail</RegistrationInput>
                        <RegistrationInput error={errors.password} inputName={"password"}
                                           onChange={inputHandleChange}>Пароль</RegistrationInput>
                        <RegistrationInput error={errors.confirmPassword} inputName={"confirmPassword"}
                                           onChange={inputHandleChange}>Повторите пароль</RegistrationInput>
                        <div onClick={() => handleModal(<LoginForm/>, false)}>
                            <SpanLg>У Вас есть аккаунт? Нажмите, что бы войти</SpanLg>
                        </div>
                    </div>
                    <div className={"flex justify-center"}>
                        <GreenButton>Зарегистрироваться</GreenButton>
                    </div>
                </form>
            }
        </>
    )
}
