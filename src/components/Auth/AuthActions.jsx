import SpanXl from "@/components/Text/SpanTags/SpanXl.jsx";
import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modal.jsx";
import LoginForm from "@/components/Forms/LoginForm.jsx";

export default function AuthActions() {
  const { handleModal } = useContext(ModalContext);

  return (
    <>
      <div className={"flex flex-col gap-y-6 text-white"}>
        <SpanXl className={"text-nowrap"}>Личный кабинет в разработке</SpanXl>
        {/* <SpanXl className={"text-nowrap"}>Вы неавторизованный гость</SpanXl> */}
        {/* <button onClick={() => handleModal(<LoginForm />)}>
          <SpanLg>Войти</SpanLg>
        </button> */}
      </div>
    </>
  );
}
