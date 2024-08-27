'use client'

import PageTitleName from "@components/Text/PageTitleName.jsx";
import FullRoundedFrame from "@components/Frames/FullRoundedFrame.jsx";
import CardTitle from "@components/Text/CardTitle.jsx";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/contexts/modal";
import DishInfoPage from "@/pages/dishesPages/DishInfoPage";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol";
import AddToCartButton from "@/components/Buttons/AddToCartButton";
import GreenButton from "@/components/Buttons/GreenButton";

export default function DishesByMealType() {
    const { handleModal } = useContext(ModalContext);
    const [dishes, setDishes] = useState([]);

    const getDishes = async () => {
        const initialMealTypes = 'breakfast,lunch,dinner'
        const response = await fetch(`http://127.0.0.1:8000/api/dishes/${initialMealTypes}`)
        const data = await response.json();
        setDishes(data);
    };
    useEffect(() => {
        getDishes()
    }, [])

    return (
        <div className="grid grid-cols-4 gap-3">
            {dishes.data
                ? (dishes.data.map((dish, index) => {
                    return (
                        <FullRoundedFrame
                            key={index}
                            bg_color={"D9D9D9"}
                            className={"col-span-1 space-y-3"}
                            clickHandle={() => handleModal(<DishInfoPage dishId={dish.dish_id} />)}>
                            <CardTitle>{dish.name} - id {dish.dish_id}</CardTitle> {/* Удалить dish_id */}
                            <Image
                                width={200}
                                height={200}
                                src={`/images/dishes/${dish.img_name}`}
                                alt=""
                            />
                            <PriceWithRubleSymbol>{dish.price_sell}</PriceWithRubleSymbol>
                            <AddToCartButton propItem={dish} />
                            <GreenButton clickHandle={() => handleModal(<DishInfoPage dishId={dish.dish_id} />)}>Подробнее</GreenButton>
                        </FullRoundedFrame>
                    )
                }))
                : (<h2>Loading...</h2>)}
        </div>
    );
}
