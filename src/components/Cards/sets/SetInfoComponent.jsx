"use client";

import FullRoundedFrame from "../../Frames/FullRoundedFrame.jsx";
import Image from "next/image.js";
import GreenButton from "../../Buttons/GreenButton.jsx";
import DishCardMini from "./DishCardMini.jsx";

export default function SetInfoComponent({ set }) {
  return (
    <>
      {set ? (
        <div className={"grid grid-cols-2 gap-x-12"}>
          <div className={"col-span-1"}>
            <div className={"mb-6 flex justify-center"}>
              <Image
                width={500}
                height={500}
                src={`/images/dishes/${set.img_name}`}
                alt=""
              />
            </div>
            <h2 className="text-center">{set.name}</h2>
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
                  <li className={"relative"}>Ккал {set.kilocalories}</li>
                </li>
                <li>Белки {set.proteins}</li>
                <li>Жиры {set.fats}</li>
                <li>Углеводы {set.carbons}</li>
                <li>
                  <strong>Вес: </strong>
                  <span>{set.weight} г.</span>
                </li>
              </ul>
            </FullRoundedFrame>
          </div>

          <div className={"col-span-1 flex flex-col gap-y-6 bg-amber-300"}>
            <strong>Из чего состоит сет: </strong>
            <ul key={0} role="list" className={"marker:text-sky-400 space-y-1"}>
              {set.dishes?.map((dish, index) => {
                return (
                  <>
                    <DishCardMini key={index} dish={dish} />
                  </>
                );
              })}
            </ul>
            <GreenButton clickHandle={() => alert("Уйди")}>
              Маленькая кнопка замены сета?&#9998;
            </GreenButton>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
