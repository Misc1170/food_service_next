"use client";

import GreenButton from "@/components/Buttons/GreenButton.jsx";
import PageTitleName from "@/components/Text/PageTitleName.jsx";
import RegistrationInput from "@/components/Inputs/RegistrationInput.jsx";
import { useContext, useState } from "react";
import loginFormValidation from "@/functions/validates/loginFormValidation.jsx";
import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";
import { ModalContext } from "@/contexts/modal.jsx";
import RegistrationForm from "@/components/Forms/RegistrationForm.jsx";
import ForgetPasswordForm from "@/components/Forms/ForgetPasswordForm.jsx";

export default function LoginForm() {
  const { handleModal } = useContext(ModalContext);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState([]);

  const inputHandleChange = (item) => {
    const name = item.name;
    const value = item.value;
    setFormData({ ...formData, [name]: value });
  };

  const formHandleSubmit = (form) => {
    form.preventDefault();

    setErrors(loginFormValidation(formData));

    console.log("form-data", formData);
    if (!errors.isSuccess) {
      fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setUser(data);
        });
    }

    console.log("user-data", user);
  };

  return (
    <form
      action=""
      method={"post"}
      onSubmit={formHandleSubmit}
      className={"space-y-4"}
    >
      <PageTitleName>Войдите в систему</PageTitleName>
      <div className={"flex flex-col gap-y-10 items-center"}>
        <RegistrationInput
          error={errors.email}
          inputName={"email"}
          onChange={inputHandleChange}
        >
          E-mail
        </RegistrationInput>
        <RegistrationInput
          error={errors.password}
          inputName={"password"}
          onChange={inputHandleChange}
        >
          Пароль
        </RegistrationInput>
      </div>
      <div className={"space-y-2"}>
        <div onClick={() => handleModal(<RegistrationForm />, false)}>
          <SpanLg>
            У Вас нет аккаунта? Нажмите, что бы зарегестрироваться
          </SpanLg>
        </div>
        <div onClick={() => handleModal(<ForgetPasswordForm />, false)}>
          <SpanLg>Вы забыли пароль, нажмите что бы восстановить</SpanLg>
        </div>
      </div>
      <div className={"flex justify-center"}>
        <GreenButton>Войти</GreenButton>
      </div>
    </form>
  );
}
