"use client";

import FullRoundedFrame from "../../components/Frames/FullRoundedFrame.jsx";
import AddToCartButton from "../../components/Buttons/AddToCartButton.jsx";
import PriceWithRubleSymbol from "../../components/Text/PriceWithRubleSymbol.jsx";
import Image from "next/image.js";
import GreenButton from "../Buttons/GreenButton.jsx";

export default function SetInfoComponent({ set }) {
    return <>
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
                    <div className={"border-5 border-D9D9D9 rounded-2xl p-6"}>
                        <h4 className={"mb-3"}>Описание</h4>
                        <span>{set.description}</span>
                    </div>
                </div>

                <div className={"col-span-1 flex flex-col gap-y-6 justify-center"}>
                    <h2>{set.name}</h2>
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
                                <strong>Из чего состоит сет: </strong>
                                {set.dishes?.map((dish, index) => {
                                    return (
                                        <li key={index} className={"lowercase"}>
                                            {dish.meal_type.name}: {dish.name}
                                        </li>
                                    );
                                })}
                                <br />
                                <br />
                            </ul>
                            <strong>Вес: </strong>
                            <span>{set.weight} г.</span>
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
                                    <li className={"relative"}>Ккал {set.kilocalories}</li>
                                </li>
                                <li>Белки {set.proteins}</li>
                                <li>Жиры {set.fats}</li>
                                <li>Углеводы {set.carbons}</li>
                            </ul>
                        </FullRoundedFrame>
                    </div>
                    <div className={"border-5 border-D9D9D9 rounded-2xl p-6"}>
                        <h4 className={"mb-3"}>Полезные элементы</h4>
                        <span>
                            За кого же нам, батюшка, посвататься? А вы возьмите по стреле,
                            натяните свои тугие луки и пустите стрелы в разные стороны. Где
                            стрела упадет — там и сватайтесь.
                        </span>
                    </div>
                    <div className={"flex justify-between"}>
                        <PriceWithRubleSymbol>{set.price_sell}</PriceWithRubleSymbol>
                        <GreenButton clickHandle={() => alert("Уйди")}>Маленькая кнопка замены сета?&#9998;</GreenButton>
                    </div>
                </div>
            </div>
        )
            : <h2>Loading...</h2>}
    </>
}
