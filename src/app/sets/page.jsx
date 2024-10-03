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
import { useContext, useEffect, useState } from "react";
import RegistrationInput from "@/components/Inputs/RegistrationInput";

export default function SetsPage() {
  const [purposes, setPurposes] = useState([]);
  const [formData, setFormData] = useState({ purpose_id: 1, physical_activity_coefficient: 1.2 });
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8000'
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setSets(data);
    localStorage.setItem('sets', JSON.stringify(data));
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

  return (
    <>
      <PageTitleName>Наборы готовых блюд</PageTitleName>

      <form
        action=""
        method={"post"}
        onSubmit={formHandleSubmit}
        className={"space-y-4"}
      >
        <h4>Введите данные для расчета калоража</h4>
        <label htmlFor="purpose_id">
          Выберите цель питания
          <select
            name="purpose_id"
            id="purpose_id"
            onChange={(item) => {
              setFormData({
                ...formData,
                [item.target.name]: item.target.value,
              });
            }}
          >
            {
              purposes.map((purpose, index) => {
                return <option key={index} value={purpose.purpose_id}>{purpose.name}</option>
              })
            }
          </select>
        </label>
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

            <RegistrationInput
              inputName={"count_sets"}
              type={"number"}
              min={0}
              onChange={saveInputValue}
            >
              Количество сетов (дней)
            </RegistrationInput>

            <label htmlFor="physical_activity_coefficient">Коэффициент физической активности
              <select
                id="physical_activity_coefficient"
                name="physical_activity_coefficient"
                onChange={(item) => {
                  setFormData({
                    ...formData,
                    [item.target.name]: item.target.value,
                  });
                }}
              >
                <option value="1.2">Минимальный (сидячая работа, отсутствие физических нагрузок)</option>
                <option value="1.375">низкий (тренировки не менее 20 мин 1-3 раза в неделю)</option>
                <option value="1.55">умеренный (тренировки 30-60 мин 3-4 раза в неделю)</option>
                <option value="1.7">высокий (тренировки 30-60 мин 5-7 раза в неделю; тяжелая физическая работа)</option>
                <option value="1.9">экстремальный (несколько интенсивных тренировок в день 6-7 раз в неделю; очень трудоемкая работа)</option>
              </select>
            </label>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <GreenButton>Подобрать наборы</GreenButton>
        </div>
      </form >

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
          <>Input
            <h1>Примени фильтры</h1>
            {/* <CardSkeletons count={searchParams.get("count_sets")} /> */}
          </>
        )}
      </CardsWrapper>
    </>
  );
}
