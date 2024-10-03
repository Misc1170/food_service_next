"use client";

import FullRoundedFrame from "@components/Frames/FullRoundedFrame.jsx";
import AddToCartButton from "@components/Buttons/AddToCartButton.jsx";
import PriceWithRubleSymbol from "@components/Text/PriceWithRubleSymbol.jsx";
import Image from "next/image.js";
import GreenButton from "@/components/Buttons/GreenButton";
import InBasketGreenButton from "@/components/Buttons/InBasketGreenButton";
import { useEffect } from "react";

export default function DishInfoComponent({ dish, isInBasketExists = false }) {
  console.log('isInBasketExists DishInfoComponent', isInBasketExists)
  useEffect(() => {
  }, [])

  return (
    <>
      {dish ? (
        <div className={"grid grid-cols-2 gap-x-12"}>
          <div className={"col-span-1"}>
            <div className={"mb-6 flex justify-center"}>
              <Image
                width={500}
                height={500}
                src={`/images/dishes/${dish.img_name}`}
                alt=""
              />
            </div>
            <div className={"border-5 border-D9D9D9 rounded-2xl p-6"}>
              <h4 className={"mb-3"}>Описание</h4>
              <span>{dish.description}</span>
            </div>
          </div>

          <div className={"col-span-1 flex flex-col gap-y-6 justify-between"}>
            <h2>{dish.name}</h2>
            <div className={"grid grid-cols-2 gap-x-10"}>
              <FullRoundedFrame
                key={0}
                bg_color={"D9D9D9"}
                className={"col-span-1"}
              >
                <ul
                  role="list"
                  className={"marker:text-sky-400 list-disc pl-5 space-y-1"}
                >
                  <strong>Состав: </strong>
                  {dish.products?.map((product, index) => {
                    return (
                      <li key={index} className={"lowercase"}>
                        {product.name}
                      </li>
                    );
                  })}
                  <br />
                  <br />
                </ul>
                <strong>Вес: </strong>
                <span>{dish.weight} г.</span>
              </FullRoundedFrame>
              <FullRoundedFrame
                bg_color={"D9D9D9"}
                className={"col-span-1 space-y-3"}
              >
                <ul className={"space-y-3"}>
                  <li
                    className={
                      "h-1 after:block after:absolute after:-inset-1 after:bg-4A914C relative inline-block"
                    }
                  >
                    <li className={"relative"}>Ккал {dish.kilocalories}</li>
                  </li>
                  <li>Белки {dish.proteins}</li>
                  <li>Жиры {dish.fats}</li>
                  <li>Углеводы {dish.carbons}</li>
                </ul>
              </FullRoundedFrame>
            </div>
            <div className={"flex justify-between"}>
              <PriceWithRubleSymbol>{dish.price_sell}</PriceWithRubleSymbol>
              {isInBasketExists
                ? <InBasketGreenButton />
                : <AddToCartButton propItem={dish} />
              }
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
