"use client";

import { useContext, useEffect, useState } from "react";
import PageTitleName from "@/components/Text/PageTitleName.jsx";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol.jsx";
import { ModalContext } from "@/contexts/modal.jsx";
import DishInfoPage from "../../../pages/dishesPages/DishInfoPage.jsx";
import GreenButton from "@/components/Buttons/GreenButton.jsx";
import Image from "next/image.js";
import AddToCartButton from "@/components/Buttons/AddToCartButton.jsx";

export default function DishesListPage({ params }) {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/purpose/${params.purposeId}`)
      .then((res) => res.json())
      .then((data) => {
        setDishes(Object.values(data)[0]);
      });
  }, [params.purposeId]);

  const { handleModal } = useContext(ModalContext);

  return (
    <>
      <PageTitleName titleName={"Блюда"} />
      <div className={"grid grid-cols-4 gap-10"}>
        {dishes.map((dish, index) => {
          return (
            <div
              key={index}
              className={
                "flex flex-col items-center gap-y-6 border-4 border-D9D9D9 p-6 bg-D9D9D9 rounded-2xl hover:border-white"
              }
            >
              <Image
                width={200}
                height={200}
                src={`/images/dishes/${dish.img_name}`}
                alt=""
              />
              <h4 className={"text-center"}>{dish.name}</h4>
              <div className={"flex justify-between"}>
                <PriceWithRubleSymbol priceSell={dish.price_sell} />
                <AddToCartButton propItem={dish} />
                <GreenButton
                  clickHandle={() =>
                    handleModal(<DishInfoPage dishId={dish.dish_id} />)
                  }
                >
                  Подробнееqwe
                </GreenButton>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

DishesListPage.getL
