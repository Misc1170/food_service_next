import GreenButton from "../Buttons/GreenButton";
import RegistrationInput from "../Inputs/RegistrationInput";
import PageTitleName from "../Text/PageTitleName";

export default function DelieveryAddress () {

    return (
        <form action="" method={'post'} onSubmit={alert(123)} className={"space-y-4"}>
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
            </div>
            <div className={"flex justify-center"}>
                <GreenButton>Сохранить адрес доставки</GreenButton>
            </div>
        </form>
    )
}