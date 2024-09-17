"use client";

import GreenButton from "@/components/Buttons/GreenButton";
import SetCard from "@/components/Cards/sets/SetCard";
import OrderContents from "@/components/OrderContents";
import SetsFiltersComponent from "@/components/Filters/SetsFiltersComponent";
import CardSkeletons from "@/components/Skeletons/CardSkeletons";
import PageTitleName from "@/components/Text/PageTitleName";
import CardsWrapper from "@/components/Wrappers/CardsWrapper";
import { ModalContext } from "@/contexts/modal";
import isEmpty from "@/functions/isEmpty";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import RegistrationInput from "@/components/Inputs/RegistrationInput";
import { Select, SelectItem } from "@nextui-org/react";

export default function SetsPage() {
  const [purposes, setPurposes] = useState([]);
  const [formData, setFormData] = useState({});
  const searchParams = useSearchParams();
  const [sets, setSets] = useState();
  const { handleModal } = useContext(ModalContext);

  const formHandleSubmit = (item) => {
    item.preventDefault();
    console.log(formData);
    getSets();
  };

  const saveInputValue = (input) => {
    const inputName = input.name;
    const inputValue = input.value;

    setFormData({ ...formData, [inputName]: inputValue });
  };

  const getSets = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/sets`, {
      method: 'post',
      body: formData,
    });
    const data = await response.json();
    setSets(data);
  };

  const getPurposes = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/purposes");
    const data = await response.json();
    setPurposes(data.result);
  };

  useEffect(() => {
    getPurposes();
    console.log("getPurposes");
  }, []);

  useEffect(() => {
    getSets();
    console.log("main use effect");
  }, [sets]);

  return (
    <>
      <PageTitleName>Наборы готовых блюд</PageTitleName>

      <form
        action=""
        method={"post"}
        onSubmit={formHandleSubmit}
        className={"space-y-4"}
      >
        <PageTitleName>Введите данные для расчета калоража</PageTitleName>
        <Select
          label="Набор для какой цели"
          labelPlacement="outside"
          className="max-w-xs"
          name="purpose_id"
          color="warning"
          onChange={(item) => onChangeOthers(item)}
        >
          {purposes.map((purpose) => {
            return (
              <SelectItem key={purpose.purpose_id}>{purpose.name}</SelectItem>
            );
          })}
        </Select>
        <div className={"flex flex-col gap-y-10 items-center"}>
          <RegistrationInput
            inputName={"age"}
            type={"number"}
            onChange={saveInputValue}
          >
            Возраст, лет
          </RegistrationInput>
          <RegistrationInput
            inputName={"height"}
            type={"number"}
            onChange={saveInputValue}
          >
            Рост, в см.
          </RegistrationInput>
          <RegistrationInput
            inputName={"weight"}
            type={"number"}
            min={0}
            onChange={saveInputValue}
          >
            Вес, в кг.
          </RegistrationInput>
          <div className="space-x-2">
            <h5>Пол</h5>
            <label>
              Мужской
              <input
                type="checkbox"
                name="gender"
                value={"male"}
                checked={formData.gender === "male"}
                onChange={(item) => {
                  setFormData({
                    ...formData,
                    [item.target.name]: item.target.value,
                  });
                }}
              />
            </label>
            <label>
              Женский
              <input
                type="checkbox"
                name="gender"
                value={"female"}
                checked={formData.gender === "female"}
                onChange={(item) => {
                  setFormData({
                    ...formData,
                    [item.target.name]: item.target.value,
                  });
                }}
              />
            </label>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <GreenButton>Подобрать наборы</GreenButton>
        </div>
      </form>

      {/* <SetsFiltersComponent /> */}

      <CardsWrapper>
        {sets ? (
          <>
            <GreenButton
              clickHandle={() =>
                handleModal(
                  <OrderContents
                    orderItems={sets}
                    titleName={"Наборы сетов"}
                    isChangeQuantityItem={false}
                    isClearOrder={false}
                  />,
                  "right"
                )
              }
            >
              Подтвердить заказ
            </GreenButton>
            {sets.map((set) => {
              return <SetCard key={set.set_id} set={set} />;
            })}
          </>
        ) : (
          <>
            <h1>Примени фильтры</h1>
            <CardSkeletons count={searchParams.get("count_sets")} />
          </>
        )}
      </CardsWrapper>
    </>
  );
}
